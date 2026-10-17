# COAI HQ

Private owner CRM at `/hq`. `coaibakersfield.com/hq` follows the existing path-preserving redirect to `www.chaoticallyorganizedai.com/hq`.

## What is included

- Server-validated Supabase Auth login. Access requires a Supabase user UUID explicitly listed in `HQ_ADMIN_USER_IDS`. Registration is not exposed. A self-edited admin claim or merely being signed in never grants access.
- An HttpOnly, SameSite Strict session cookie, scoped to `/api/hq`, secure in production, with at most one hour lifetime. Tokens and passwords are not stored in browser storage. Reauthenticate after expiry. Sign-out clears the cookie; a previously copied access token expires on its original schedule. Removing the UUID from the allowlist denies subsequent requests immediately.
- Search across all submitted names, businesses, email and phone; stage filter; 50-row pagination; notes and follow-up dates. Optimistic concurrency rejects stale edits.
- Verified intake, contact, legacy audit registration and JAX waitlist captures. No CAPTCHA token, honeypot or IP is copied to CRM records. Existing legacy tables and records are not modified or imported.
- Aggregate page-view totals for `/`, `/demo`, `/pricing`, `/intake`, `/contact`. No cookie, session ID, query string or visitor contact identity is saved by this counter. DNT and GPC suppress counting. Counts are views, not unique visitors, and are not bot-proof. Rate limiting uses the existing security layer; infrastructure providers retain their normal operational logs.
- HQ omits public chat/marketing components and has a restrictive same-origin CSP, no-index and no-store responses. The login shell and fictional sample are public; every real-data endpoint checks owner authorization.

## Activation order

1. Resolve the Supabase organization's unpaid invoices and restore the existing `coaiwebsite` project (`mdhzbhgksbltfwgikvxy`). The restore attempt was rejected with `PaymentRequiredException`; SQL connectivity timed out. No schema changes were applied remotely.
2. Review and apply `supabase/hq.sql` to this project. It creates separate CRM tables and functions, enables RLS, revokes anonymous/authenticated grants, and permits only server service-role access. It uses no security-definer functions. Generate/record the applied migration using the project's normal Supabase migration workflow once the database is available; the SQL file is a setup script, not a fabricated migration history entry.
3. Verify both tables and functions exist, anonymous and ordinary authenticated roles cannot select/update/execute, and service role can insert/read/update. Run Supabase security advisors. These checks remain blocked while the database is paused.
4. Use an existing confirmed Supabase owner account, or create one through the owner's normal account setup. Do not paste passwords or secret keys into chat. Put its immutable Auth UUID in server-only `HQ_ADMIN_USER_IDS`. Confirm no unrelated account is allowlisted.
5. Configure the matching `NEXT_PUBLIC_SUPABASE_URL` and server-only `SUPABASE_SERVICE_ROLE_KEY` in Vercel. Existing values must be checked against the restored project rather than assumed to match its name. Never expose the service key with a `NEXT_PUBLIC_` prefix.
6. With `COAI_CRM_ENABLED=false`, deploy and validate owner login, unauthorized denial and database connectivity. Inspect the HQ capture-disabled banner. Existing forms continue email-only in this state.
7. Set `COAI_CRM_ENABLED=true` only after storage and owner access are verified, then redeploy. Submit one approved synthetic inquiry. Confirm exactly one row, consent=no, matching form details, owner edit persistence, an accepted email notification and the inbox receipt. Inspect the browser's effective HQ CSP and absence of executed third-party marketing scripts.
8. Confirm `https://coaibakersfield.com/hq` preserves `/hq` when redirecting. Historical Formspree/email records are not automatically backfilled.

## Acceptance and retry behavior

When capture is enabled, a verified lead must save before its existing email notification is attempted. A storage failure returns an error and does not claim success. An email failure after storage leaves the lead saved; the visitor still sees a delivery error. An exact same normalized payload in the same ten-minute UTC epoch bucket is deduplicated without overwriting owner edits. A repeat across a bucket boundary can create a second record. This is retry suppression, not exactly-once delivery or person-level identity merging.

Lead source means the submitted form channel. Optional source/intent fields are supplied by the browser and are not verified attribution. The activity summary is separate from contact records. A view does not create a lead or reveal a visitor's email.

Notes do not trigger messages, calls, calendar events or reminders. Follow-up dates are a review list. SMS consent only relates to the original request and is not permission for campaigns. No automatic outreach or payment feature is present. Review and purge inquiry records on the site's stated retention schedule; the CRM has archive, not a deletion job. Privacy deletion requests require a controlled database operation.

## Validation

228 tests across 28 files passed using one worker after parallel runs hit Windows worker timeouts. Tests cover anonymous/nonowner/expired denial, owner allowlisting, no metadata escalation, cross-site edit denial, stale-write conflict, capture enablement/deduplication/error behavior, and aggregate-counter privacy. TypeScript/build and browser/HTTP results are recorded with the release. A mock passing does not verify the paused production database.

The branch includes the prior CRO changes from PR #32; do not merge that same work independently if this combined branch is released.
