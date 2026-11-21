# ZENTRO WhatsApp inquiry notifications

The public contact form continues to save inquiries directly to Supabase. A database trigger
creates one private notification-queue row only after an inquiry insert succeeds. A scheduled
Supabase Edge Function sends an approved WhatsApp template asynchronously, so a Meta outage does
not undo or block the inquiry.

The integration is **not active** until the migration, Edge Function, Meta credentials, recipient
opt-in, and Vault scheduler secrets have all been configured.

## 1. Apply the database migration

Apply `migrations/20261122100000_whatsapp_notifications.sql` to the existing Supabase project.
It adds the private notification outbox, a unique inquiry constraint for duplicate prevention,
admin-only read access, a worker claim function, and a once-per-minute `pg_cron` job. The job
does nothing until both named secrets have been stored in Supabase Vault.

Use the Supabase CLI only after confirming that its migration history matches the existing
project. If this repository's earlier migrations were applied manually and are not recorded in
Supabase migration history, run this migration file in the Supabase SQL Editor instead of pushing
all pending migrations blindly.

## 2. Create and approve the Meta template

In Meta Business Manager / WhatsApp Manager:

1. Set up a Meta developer app with the WhatsApp product and connect the WhatsApp Business
   Account and sending phone number.
2. Record the **Phone Number ID** (not the displayed phone number).
3. Create and wait for approval of a template. Use the same variable order and message body below.
   Record the exact approved template name and language/locale.
4. Create a securely managed system-user access token with the WhatsApp messaging permission.
   Do not use a temporary getting-started token for production.
5. In **App settings → Basic**, copy the Meta App Secret for server-side webhook-signature
   validation.
6. Add and verify the recipient as required for the app's current development/production mode.
   Confirm the recipient explicitly opted in to receive these business-initiated notifications.

Suggested template body (eight body variables, in order):

```text
🚀 NEW CLIENT INQUIRY – ZENTRO

👤 Client Name: {{1}}
📧 Email: {{2}}
📞 Phone: {{3}}
🏢 Company: {{4}}
💼 Service: {{5}}
💰 Budget: {{6}}

📝 Project Details:
{{7}}

📅 Received: {{8}}

Status: NEW

Please check your Zentro Admin Dashboard for complete client information.
```

Meta decides the template category and approval. Use the exact locale returned for the approved
template when configuring the function.

## 3. Deploy the Edge Function

From the repository root, deploy `whatsapp-notifier` using the Supabase CLI:

```sh
supabase functions deploy whatsapp-notifier
```

The function is configured with JWT verification disabled at the gateway because it has two
separate authentication paths: an unguessable worker secret for the scheduled worker, and
Supabase Auth plus the database admin allowlist for dashboard actions. Do not remove those checks
or expose the service-role key.

## 4. Set Edge Function secrets

Set these in **Supabase Dashboard → Edge Functions → Secrets** (or with `supabase secrets set`).
Never put these in `.env`, a `VITE_` variable, the browser, or Git:

| Secret | Value |
| --- | --- |
| `WHATSAPP_PHONE_NUMBER_ID` | Phone Number ID from Meta |
| `WHATSAPP_ACCESS_TOKEN` | Securely managed Meta system-user token |
| `WHATSAPP_RECIPIENT` | `+923085005383` |
| `WHATSAPP_RECIPIENT_OPT_IN` | `true` only after confirming the recipient's opt-in |
| `WHATSAPP_TEMPLATE_NAME` | Exact approved template name |
| `WHATSAPP_TEMPLATE_LANGUAGE` | Exact approved template locale |
| `WHATSAPP_GRAPH_API_VERSION` | A currently supported Meta Graph API version, in `vNN.N` format |
| `ZENTRO_WHATSAPP_WORKER_SECRET` | A unique random secret; use the same value in Vault below |
| `META_APP_SECRET` | Meta App Secret, used only to validate webhook signatures |
| `WHATSAPP_WEBHOOK_VERIFY_TOKEN` | A unique random token used for Meta's webhook handshake |

Supabase provides the function's project URL and service-role key in the Edge Function runtime.
Do not copy the service-role key into the website.

## 5. Configure Meta delivery webhooks

In the Meta developer app's WhatsApp Business Account webhook settings:

1. Set the callback URL to
   `https://krzyqqwberlmqzthtcwk.supabase.co/functions/v1/whatsapp-notifier`.
2. Set the verify token to the exact `WHATSAPP_WEBHOOK_VERIFY_TOKEN` Edge Function secret.
3. Subscribe the app to the WhatsApp Business Account's `messages` webhook field.

The function validates Meta's `X-Hub-Signature-256` on every webhook POST using `META_APP_SECRET`.
It stores provider delivery events and reconciles events that arrive before the send response has
been written to the queue. The dashboard distinguishes Meta API acceptance from a webhook-confirmed
delivery/read status.

## 6. Configure the Vault scheduler secrets

In **Supabase Dashboard → Database → Vault**, create these two secrets:

| Vault name | Value |
| --- | --- |
| `zentro_whatsapp_function_url` | `https://krzyqqwberlmqzthtcwk.supabase.co/functions/v1/whatsapp-notifier` |
| `zentro_whatsapp_worker_secret` | The exact same random value as `ZENTRO_WHATSAPP_WORKER_SECRET` |

Generate the worker secret with a password manager or a cryptographically secure random generator.
Do not paste it into chat or commit it. The migration's `pg_cron` job checks for these Vault
entries and calls the Edge Function once a minute when both exist.

## 7. Verify setup and test

1. Sign in with an account already authorized in `public.zentro_admins`.
2. Open `/admin/notifications`. The status is enabled only when the function configuration,
   opt-in flag, and Vault scheduler configuration are all present.
3. Submit one clearly identified test inquiry through the website. Confirm it appears in the
   inquiry dashboard and a matching outbox record appears on the Notifications page.
4. Allow up to one minute for the worker. Confirm the status changes from **accepted** to
   **delivered** (or **read**) after Meta's webhook arrives, and check the recipient's WhatsApp.
5. If delivery fails, inspect the private error shown on the admin page and correct the Meta
   configuration before retrying.

No test inquiry or WhatsApp message is generated by deploying this code. Do not retry a failure
until you have checked whether Meta accepted the original request: an ambiguous timeout can mean
Meta delivered the message even though the app did not receive its response.

## Delivery and privacy behavior

- Failed database inserts do not create a queue item or trigger a notification.
- A unique constraint allows at most one queue row per inquiry.
- The public `anon` role cannot read, update, or delete notification records.
- Only authorized administrators can read delivery logs; the server-side worker sends messages.
- Failures are recorded without deleting the saved inquiry. Automatic retries are not performed;
  admins may manually retry failed rows.
- A Meta API success response means **accepted**, not confirmed delivered. Actual delivered/read
  counts come from signed Meta webhooks.
- The WhatsApp Cloud API does not provide an end-to-end exactly-once guarantee for a request
  whose response times out. Verify delivery before manually retrying an ambiguous failure.
