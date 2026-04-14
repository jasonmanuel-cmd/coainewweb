# COAI Launch Setup

## 1) Install and run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## 2) Environment variables

Copy `.env.example` to `.env.local` and set:

- `NEXT_PUBLIC_SITE_URL` — exact public canonical origin (`https://chaoticallyorganizedai.com` OR `https://www.chaoticallyorganizedai.com`, choose one)
- `NEXT_PUBLIC_SUPABASE_URL` — full URL including `https://` (e.g. `https://xxxx.supabase.co`; a malformed value is ignored so the audit form still works without DB writes)
- `SUPABASE_SERVICE_ROLE_KEY`
- `PAGESPEED_API_KEY`
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` (GA4, e.g. `G-XXXXXXXXXX`)
- `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` — optional; enables **distributed** rate limits across Vercel instances (create a Redis database in [Upstash](https://upstash.com/) and paste REST credentials)
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY` — optional; **Cloudflare Turnstile** for contact, intake, RedScreen audit, JAX waitlist, and `/api/messages`. If `TURNSTILE_SECRET_KEY` is set, the server rejects requests without a valid token; set both keys from the Cloudflare Turnstile dashboard
- `SMS_PROVIDER` (`console` or `twilio`)
- `TWILIO_ACCOUNT_SID` (if Twilio)
- `TWILIO_AUTH_TOKEN` (if Twilio)
- `TWILIO_FROM_NUMBER` (if Twilio)

## 3) Database setup (Supabase SQL Editor)

Run files in this order:

1. `supabase/schema.sql`
2. `supabase/rls.sql`
3. `supabase/seed.sql`

## 4) Verify the pipeline

1. Submit the homepage RedScreen audit (or use `/intake` for the Formspree diagnostic wizard).
2. For `/api/register` audits, confirm rows exist in:
   - `leads`
   - `audits`
   - `audit_results`
   - `messages`
3. Follow-up is by email / contact — there is no public `/report/<id>` page.

## 5) Security and anti-spam included

- API rate limits per IP (`/api/register`, `/api/messages`, `/api/lighthouse`, `/api/audit`, `/api/contact`, `/api/jax-waitlist`) — **in-memory fallback** when Upstash env is unset; **distributed** limits when `UPSTASH_REDIS_*` is set
- Honeypot field check (RedScreen audit form)
- Minimum fill-time check to reject bots (`/api/register`)
- Optional Cloudflare Turnstile on marketing forms and SMS trigger
- Content-Security-Policy with per-request **nonce** (middleware) for scripts and JSON-LD
- RLS enabled on all tables

## 6) Production (Vercel)

This app is built for **Vercel**: Next.js API routes (`/api/lighthouse`, `/api/register`, etc.) run as serverless functions there. Add **`PAGESPEED_API_KEY`** and other secrets under **Project → Settings → Environment Variables**, then redeploy.

The `netlify/` folder is **optional legacy** only; Vercel does not use it.

**Lighthouse / PageSpeed:** The API route allows up to **60s** (`maxDuration`). On Vercel **Hobby**, the platform may still cap at **10s** — heavy URLs can time out; **Pro** aligns with long PageSpeed runs.

## 7) Before production deploy

- Rotate any secrets exposed in chat or screenshots.
- Set all env vars in Vercel project settings.
- Verify Google file on deployed domain:
  - `/google910114b2ba5a69fb.html`
- If using Twilio, set `SMS_PROVIDER=twilio`.
- If using GA4, verify Realtime shows:
  - `diagnostic_submit_started`
  - `diagnostic_submit_success`
  - `pricing_cta_click`
  - `case_studies_view`
