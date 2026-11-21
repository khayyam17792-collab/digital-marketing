ALTER TABLE public.inquiries
  ADD COLUMN IF NOT EXISTS admin_notes TEXT,
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT now();

ALTER TABLE public.inquiries
  DROP CONSTRAINT IF EXISTS inquiries_status_check;

UPDATE public.inquiries
SET status = 'in_discussion'
WHERE status = 'in_progress';

ALTER TABLE public.inquiries
  ADD CONSTRAINT inquiries_status_check
  CHECK (status IN ('new', 'contacted', 'in_discussion', 'converted', 'rejected'));

CREATE INDEX IF NOT EXISTS inquiries_status_created_at_idx
  ON public.inquiries (status, created_at DESC);

CREATE TABLE IF NOT EXISTS public.zentro_admins (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.zentro_admins ENABLE ROW LEVEL SECURITY;
REVOKE ALL PRIVILEGES ON TABLE public.zentro_admins FROM PUBLIC, anon, authenticated;
GRANT ALL PRIVILEGES ON TABLE public.zentro_admins TO service_role;

CREATE OR REPLACE FUNCTION public.is_zentro_admin()
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.zentro_admins AS admin
    WHERE admin.user_id = auth.uid()
  );
$$;

REVOKE ALL PRIVILEGES ON FUNCTION public.is_zentro_admin() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_zentro_admin() TO authenticated;

CREATE OR REPLACE FUNCTION public.set_inquiries_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  NEW.updated_at := now();
  RETURN NEW;
END;
$$;

REVOKE ALL PRIVILEGES ON FUNCTION public.set_inquiries_updated_at() FROM PUBLIC, anon, authenticated;

DROP TRIGGER IF EXISTS set_inquiries_updated_at ON public.inquiries;
CREATE TRIGGER set_inquiries_updated_at
  BEFORE UPDATE ON public.inquiries
  FOR EACH ROW
  EXECUTE FUNCTION public.set_inquiries_updated_at();

ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow anonymous website submissions" ON public.inquiries;
DROP POLICY IF EXISTS "Enable insert for everyone" ON public.inquiries;
DROP POLICY IF EXISTS "Allow website submissions" ON public.inquiries;
DROP POLICY IF EXISTS "Allow authenticated staff to view inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Allow admin staff to view inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Allow authenticated staff to update inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Public can submit inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Zentro admins can read inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Zentro admins can update inquiries" ON public.inquiries;
DROP POLICY IF EXISTS "Zentro admins can delete inquiries" ON public.inquiries;

REVOKE ALL PRIVILEGES ON TABLE public.inquiries FROM PUBLIC, anon, authenticated;
GRANT INSERT (
  full_name,
  email,
  phone,
  company_name,
  service_required,
  project_budget,
  project_details,
  status
) ON TABLE public.inquiries TO anon, authenticated;
GRANT SELECT, DELETE ON TABLE public.inquiries TO authenticated;
GRANT UPDATE (status, admin_notes) ON TABLE public.inquiries TO authenticated;

CREATE POLICY "Public can submit inquiries"
  ON public.inquiries
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (status = 'new' AND admin_notes IS NULL);

CREATE POLICY "Zentro admins can read inquiries"
  ON public.inquiries
  FOR SELECT
  TO authenticated
  USING (public.is_zentro_admin());

CREATE POLICY "Zentro admins can update inquiries"
  ON public.inquiries
  FOR UPDATE
  TO authenticated
  USING (public.is_zentro_admin())
  WITH CHECK (public.is_zentro_admin());

CREATE POLICY "Zentro admins can delete inquiries"
  ON public.inquiries
  FOR DELETE
  TO authenticated
  USING (public.is_zentro_admin());

CREATE OR REPLACE FUNCTION public.get_zentro_inquiry_stats()
RETURNS TABLE (
  total_inquiries BIGINT,
  new_inquiries BIGINT,
  contacted_clients BIGINT,
  in_discussion BIGINT,
  converted_clients BIGINT,
  rejected_inquiries BIGINT,
  monthly_inquiries JSONB,
  service_stats JSONB
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  IF NOT public.is_zentro_admin() THEN
    RAISE EXCEPTION 'Administrator access required' USING ERRCODE = '42501';
  END IF;

  RETURN QUERY
  SELECT
    count(*)::BIGINT,
    count(*) FILTER (WHERE inquiry.status = 'new')::BIGINT,
    count(*) FILTER (WHERE inquiry.status = 'contacted')::BIGINT,
    count(*) FILTER (WHERE inquiry.status = 'in_discussion')::BIGINT,
    count(*) FILTER (WHERE inquiry.status = 'converted')::BIGINT,
    count(*) FILTER (WHERE inquiry.status = 'rejected')::BIGINT,
    (
      SELECT COALESCE(
        jsonb_agg(
          jsonb_build_object('month', monthly.month_label, 'count', monthly.inquiry_count)
          ORDER BY monthly.month_start
        ),
        '[]'::JSONB
      )
      FROM (
        SELECT
          calendar.month_start,
          to_char(calendar.month_start, 'Mon') AS month_label,
          count(inquiry.id)::INTEGER AS inquiry_count
        FROM generate_series(
          date_trunc('month', CURRENT_DATE::TIMESTAMP) - INTERVAL '11 months',
          date_trunc('month', CURRENT_DATE::TIMESTAMP),
          INTERVAL '1 month'
        ) AS calendar(month_start)
        LEFT JOIN public.inquiries AS inquiry
          ON date_trunc('month', inquiry.created_at) = calendar.month_start
        GROUP BY calendar.month_start
      ) AS monthly
    ),
    (
      SELECT COALESCE(
        jsonb_agg(
          jsonb_build_object('service', services.service_name, 'count', services.inquiry_count)
          ORDER BY services.inquiry_count DESC, services.service_name
        ),
        '[]'::JSONB
      )
      FROM (
        SELECT
          inquiry.service_required AS service_name,
          count(*)::INTEGER AS inquiry_count
        FROM public.inquiries AS inquiry
        GROUP BY inquiry.service_required
      ) AS services
    )
  FROM public.inquiries AS inquiry;
END;
$$;

REVOKE ALL PRIVILEGES ON FUNCTION public.get_zentro_inquiry_stats() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_zentro_inquiry_stats() TO authenticated;
