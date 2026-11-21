CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA net;
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS supabase_vault WITH SCHEMA vault;

CREATE TABLE IF NOT EXISTS public.whatsapp_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  inquiry_id UUID NOT NULL UNIQUE REFERENCES public.inquiries(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'processing', 'sent', 'failed')),
  delivery_status TEXT NOT NULL DEFAULT 'pending'
    CHECK (delivery_status IN ('pending', 'accepted', 'sent', 'delivered', 'read', 'failed')),
  attempt_count INTEGER NOT NULL DEFAULT 0 CHECK (attempt_count >= 0),
  provider_message_id TEXT,
  last_error TEXT,
  processing_started_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  delivery_status_updated_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS whatsapp_notifications_status_created_at_idx
  ON public.whatsapp_notifications (status, created_at);
CREATE UNIQUE INDEX IF NOT EXISTS whatsapp_notifications_provider_message_id_idx
  ON public.whatsapp_notifications (provider_message_id)
  WHERE provider_message_id IS NOT NULL;

CREATE TABLE IF NOT EXISTS public.whatsapp_delivery_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_message_id TEXT NOT NULL,
  delivery_status TEXT NOT NULL
    CHECK (delivery_status IN ('sent', 'delivered', 'read', 'failed')),
  occurred_at TIMESTAMPTZ NOT NULL,
  error_details TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (provider_message_id, delivery_status, occurred_at)
);

ALTER TABLE public.whatsapp_delivery_events ENABLE ROW LEVEL SECURITY;
REVOKE ALL PRIVILEGES ON TABLE public.whatsapp_delivery_events FROM PUBLIC, anon, authenticated;
GRANT ALL PRIVILEGES ON TABLE public.whatsapp_delivery_events TO service_role;

ALTER TABLE public.whatsapp_notifications ENABLE ROW LEVEL SECURITY;
REVOKE ALL PRIVILEGES ON TABLE public.whatsapp_notifications FROM PUBLIC, anon, authenticated;
GRANT SELECT ON TABLE public.whatsapp_notifications TO authenticated;
GRANT ALL PRIVILEGES ON TABLE public.whatsapp_notifications TO service_role;

DROP POLICY IF EXISTS "Zentro admins can read WhatsApp notifications"
  ON public.whatsapp_notifications;
CREATE POLICY "Zentro admins can read WhatsApp notifications"
  ON public.whatsapp_notifications
  FOR SELECT
  TO authenticated
  USING (public.is_zentro_admin());

CREATE OR REPLACE FUNCTION public.enqueue_zentro_whatsapp_notification()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.whatsapp_notifications (inquiry_id)
  VALUES (NEW.id)
  ON CONFLICT (inquiry_id) DO NOTHING;
  RETURN NEW;
END;
$$;

REVOKE ALL PRIVILEGES
  ON FUNCTION public.enqueue_zentro_whatsapp_notification()
  FROM PUBLIC, anon, authenticated;

DROP TRIGGER IF EXISTS enqueue_zentro_whatsapp_notification ON public.inquiries;
CREATE TRIGGER enqueue_zentro_whatsapp_notification
  AFTER INSERT ON public.inquiries
  FOR EACH ROW
  EXECUTE FUNCTION public.enqueue_zentro_whatsapp_notification();

CREATE OR REPLACE FUNCTION public.claim_zentro_whatsapp_notifications(
  batch_size INTEGER DEFAULT 10
)
RETURNS TABLE (
  notification_id UUID,
  inquiry_id UUID,
  attempt_count INTEGER
)
LANGUAGE SQL
SECURITY DEFINER
SET search_path = ''
AS $$
  WITH candidates AS (
    SELECT notification.id
    FROM public.whatsapp_notifications AS notification
    WHERE notification.status = 'pending'
       OR (
         notification.status = 'processing'
         AND notification.processing_started_at < now() - INTERVAL '10 minutes'
       )
    ORDER BY notification.created_at
    FOR UPDATE SKIP LOCKED
    LIMIT LEAST(GREATEST(COALESCE(batch_size, 10), 1), 10)
  ),
  claimed AS (
    UPDATE public.whatsapp_notifications AS notification
    SET status = 'processing',
        attempt_count = notification.attempt_count + 1,
        processing_started_at = now(),
        last_error = NULL,
        updated_at = now()
    FROM candidates
    WHERE notification.id = candidates.id
    RETURNING notification.id, notification.inquiry_id, notification.attempt_count
  )
  SELECT claimed.id, claimed.inquiry_id, claimed.attempt_count
  FROM claimed;
$$;

REVOKE ALL PRIVILEGES
  ON FUNCTION public.claim_zentro_whatsapp_notifications(INTEGER)
  FROM PUBLIC, anon, authenticated;
GRANT EXECUTE
  ON FUNCTION public.claim_zentro_whatsapp_notifications(INTEGER)
  TO service_role;

CREATE OR REPLACE FUNCTION public.apply_zentro_whatsapp_delivery_event(
  p_provider_message_id TEXT,
  p_delivery_status TEXT,
  p_event_at TIMESTAMPTZ,
  p_error_details TEXT DEFAULT NULL
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  IF p_delivery_status NOT IN ('sent', 'delivered', 'read', 'failed') THEN
    RAISE EXCEPTION 'Unsupported WhatsApp delivery status'
      USING ERRCODE = '22023';
  END IF;

  UPDATE public.whatsapp_notifications AS notification
  SET delivery_status = p_delivery_status,
      delivery_status_updated_at = p_event_at,
      status = CASE WHEN p_delivery_status = 'failed' THEN 'failed' ELSE 'sent' END,
      delivered_at = CASE
        WHEN p_delivery_status IN ('delivered', 'read')
          THEN COALESCE(notification.delivered_at, p_event_at)
        ELSE notification.delivered_at
      END,
      last_error = CASE
        WHEN p_delivery_status = 'failed'
          THEN COALESCE(NULLIF(p_error_details, ''), 'WhatsApp delivery failed.')
        ELSE NULL
      END,
      updated_at = now()
  WHERE notification.provider_message_id = p_provider_message_id
    AND (
      notification.delivery_status_updated_at IS NULL
      OR notification.delivery_status_updated_at < p_event_at
      OR (
        notification.delivery_status_updated_at = p_event_at
        AND CASE notification.delivery_status
          WHEN 'pending' THEN 0
          WHEN 'accepted' THEN 0
          WHEN 'sent' THEN 1
          WHEN 'delivered' THEN 2
          WHEN 'read' THEN 3
          WHEN 'failed' THEN 4
        END <= CASE p_delivery_status
          WHEN 'sent' THEN 1
          WHEN 'delivered' THEN 2
          WHEN 'read' THEN 3
          WHEN 'failed' THEN 4
        END
      )
    );
END;
$$;

REVOKE ALL PRIVILEGES
  ON FUNCTION public.apply_zentro_whatsapp_delivery_event(TEXT, TEXT, TIMESTAMPTZ, TEXT)
  FROM PUBLIC, anon, authenticated;
GRANT EXECUTE
  ON FUNCTION public.apply_zentro_whatsapp_delivery_event(TEXT, TEXT, TIMESTAMPTZ, TEXT)
  TO service_role;

SELECT cron.unschedule(jobid)
FROM cron.job
WHERE jobname = 'zentro-whatsapp-notifier';

SELECT cron.schedule(
  'zentro-whatsapp-notifier',
  '* * * * *',
  $cron$
    SELECT CASE
      WHEN EXISTS (
        SELECT 1 FROM vault.decrypted_secrets
        WHERE name = 'zentro_whatsapp_function_url'
      )
      AND EXISTS (
        SELECT 1 FROM vault.decrypted_secrets
        WHERE name = 'zentro_whatsapp_worker_secret'
      )
      THEN net.http_post(
        url := (
          SELECT decrypted_secret
          FROM vault.decrypted_secrets
          WHERE name = 'zentro_whatsapp_function_url'
          LIMIT 1
        ),
        headers := jsonb_build_object(
          'Content-Type', 'application/json',
          'x-zentro-worker-secret', (
            SELECT decrypted_secret
            FROM vault.decrypted_secrets
            WHERE name = 'zentro_whatsapp_worker_secret'
            LIMIT 1
          )
        ),
        body := '{"action":"process"}'::JSONB,
        timeout_milliseconds := 5000
      )
      ELSE NULL
    END;
  $cron$
);

CREATE OR REPLACE FUNCTION public.get_zentro_whatsapp_scheduler_status()
RETURNS BOOLEAN
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  IF NOT public.is_zentro_admin() THEN
    RAISE EXCEPTION 'Administrator access required' USING ERRCODE = '42501';
  END IF;

  RETURN EXISTS (
    SELECT 1
    FROM vault.decrypted_secrets
    WHERE name = 'zentro_whatsapp_function_url'
  )
  AND EXISTS (
    SELECT 1
    FROM vault.decrypted_secrets
    WHERE name = 'zentro_whatsapp_worker_secret'
  )
  AND EXISTS (
    SELECT 1
    FROM cron.job
    WHERE jobname = 'zentro-whatsapp-notifier'
  );
END;
$$;

REVOKE ALL PRIVILEGES
  ON FUNCTION public.get_zentro_whatsapp_scheduler_status()
  FROM PUBLIC, anon;
GRANT EXECUTE
  ON FUNCTION public.get_zentro_whatsapp_scheduler_status()
  TO authenticated;
