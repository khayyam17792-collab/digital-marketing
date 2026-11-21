# ZENTRO Digital Marketing Agency

The public website is a Vite + React single-page application. Vercel serves the app
with the SPA rewrite in `vercel.json`.

## Local development

```sh
npm install
cp .env.example .env
npm run dev
```

Set `VITE_SUPABASE_URL` and either `VITE_SUPABASE_PUBLISHABLE_KEY` or the supported
legacy `VITE_SUPABASE_ANON_KEY` in `.env` and in the Vercel project environment.
These are public client credentials protected by Supabase Row Level Security. Never
put a service-role key or WhatsApp/Meta secret in a `VITE_` variable.

Run the project checks with:

```sh
npm run lint
npm run build
```

## Supabase and admin access

The public contact form inserts inquiries into `public.inquiries`. RLS permits public
submissions but restricts inquiry reads and management to authorized administrators.
Create admin accounts in Supabase Auth, keep public sign-ups disabled, and authorize
each account by adding its Auth user UUID to `public.zentro_admins`.

## WhatsApp notifications

WhatsApp notifications require separate Meta and Supabase setup and are not enabled
by the frontend configuration. Follow [the WhatsApp setup guide](./supabase/WHATSAPP_SETUP.md);
keep all Meta tokens and worker secrets in Supabase Edge Function Secrets and Vault.
