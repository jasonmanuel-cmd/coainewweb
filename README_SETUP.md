# COAI Launch Setup

## 1) Install and run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## 2) Environment variables

Copy `.env.example` to `.env.local` and set:

- `NEXT_PUBLIC_SITE_URL` — local dev only (`http://localhost:3000`). Deployed canonical metadata uses `https://www.chaoticallyorganizedai.com` from `lib/site.ts`. Request-origin checks compare against the actual request URL, not this environment variable.
- `NEXT_PUBLIC_SUPABASE_URL` — full URL including `https://` (e.g. `https://xxxx.supabase.co`; a malformed value is ignored so the audit form still works without DB writes)
- `SUPABASE_SERVICE_ROLE_KEY`
- `PAGESPEED_API_KEY`
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` (GA4, e.g. `G-XXXXXXXXXX`)
- `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` — optional; enables **distributed** rate limits across Vercel instances (create a Redis database in [Upstash](https://upstash.com/) and paste REST credentials)
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY` — Cloudflare Turnstile for contact, intake, legacy audit registration and JAX waitlist. If `TURNSTILE_SECRET_KEY` is set, these server routes reject requests without a valid token; configure the matching public and server keys.
- For optional HQ capture, select and verify one backend using [HQ setup](docs/hq-setup.md). The example selects `CRM_STORAGE=neon`, but source defaults do not establish production configuration. Keep `COAI_CRM_ENABLED=false` until storage and owner access pass verification. Keep notification-journal and idempotent-delivery flags off until their separate migration/rollout requirements are met.

There is no `/api/messages` route or Twilio sender in this repository. SMS consent fields do not send messages, and `/demo` uses sample data without contacting anyone.

## 3) Legacy audit database (optional Supabase setup)

These tables support the legacy `/api/register` workflow, not the optional Neon/Redis HQ setup. Review SQL against the intended database before applying it; a repository setup file is not evidence that a production migration was applied.

Run files in this order:

1. `supabase/schema.sql`
2. `supabase/rls.sql`
3. `supabase/seed.sql`

## 4) Verify the pipeline

1. Use `/contact` or `/intake`; the homepage website CTA goes to `/intake?pkg=website`. There is no current public RedScreen form. Use an approved synthetic inquiry for any live test.
2. Confirm the intended Formspree destination in `lib/forms.ts`, provider acceptance and the actual notification inbox. The current endpoint is `https://formspree.io/f/xqpqkejd`; endpoint configuration and HTTP 200 page loads do not prove delivery.
3. If HQ capture is enabled, independently confirm the inquiry is saved in the selected backend and visible to the authorized owner. No live receipt or CRM persistence is established by unit tests.
4. Only for a separately exercised legacy `/api/register` audit with Supabase configured, confirm rows exist in:
   - `leads`
   - `audits`
   - `audit_results`
5. Follow-up is by email / contact — there is no public `/report/<id>` page. `/api/register` returns before its best-effort notification helper confirms delivery; do not use its response as proof of an email receipt.

## 5) Security and anti-spam included

- API rate limits per IP (`/api/register`, `/api/lighthouse`, `/api/audit`, `/api/contact`, `/api/intake`, `/api/jax-waitlist`) — **in-memory fallback** when Upstash env is unset; **distributed** limits when `UPSTASH_REDIS_*` is set
- Honeypot checks on marketing submission routes and legacy audit registration
- Minimum fill-time check to reject bots (`/api/register`)
- Configurable Cloudflare Turnstile on marketing submission routes
- Static Content-Security-Policy in `next.config.ts`; it does not issue a per-request nonce. HQ receives a separate restrictive policy.
- Reviewed schema scripts configure RLS; verify the applied database's permissions rather than inferring them from source files.

## 6) Production (Vercel)

This app is built for **Vercel**: Next.js API routes (`/api/lighthouse`, `/api/register`, etc.) run as serverless functions there. Add **`PAGESPEED_API_KEY`** and other secrets under **Project → Settings → Environment Variables**, then redeploy.

The `netlify/` folder is **optional legacy** only; Vercel does not use it.

**Lighthouse / PageSpeed:** The API route allows up to **60s** (`maxDuration`). On Vercel **Hobby**, the platform may still cap at **10s** — heavy URLs can time out; **Pro** aligns with long PageSpeed runs.

## 7) Before production deploy

- Rotate any secrets exposed in chat or screenshots.
- Set all env vars in Vercel project settings.
- Verify Google file on deployed domain:
  - `/google910114b2ba5a69fb.html`
- If using GA4, verify Realtime shows:
  - `diagnostic_submit_started`
  - `diagnostic_submit_success`
  - `pricing_cta_click`
  - `case_studies_view`
