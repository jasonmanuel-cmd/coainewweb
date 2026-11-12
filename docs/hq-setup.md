# COAI HQ

## Select and verify one storage backend

The source supports Neon, Redis and Supabase. `.env.example` selects Neon; that is an example, not evidence of a live setting. Verify the intended deployment's `CRM_STORAGE`, capture flag, owner-access mode and actual storage health before following a backend's activation steps. Never apply the Supabase setup merely because it appears later in this file.

## Neon setup

Use `CRM_STORAGE=neon` and the existing Vercel-managed server-only `DATABASE_URL` from `neon-byzantine-lamp`. Migration `neon/001_hq.sql` creates a private `coai_hq` schema, lead records, aggregate daily counters and a technical health-probe table. It does not seed sample data. Public schema privileges are revoked; RLS is enabled. The server uses the database owner connection only after HQ authorization checks. Database credentials never enter client code.

The existing private password, signed HttpOnly sessions, required CTA name/phone/email fields and no-sample-data rule remain. Neon handles filtering and pagination in SQL; values are bound parameters. Lead retry suppression does not overwrite owner notes. Updates check the original timestamp to prevent stale writes. The health write check is an atomic insert/read/delete transaction in a separate technical table, never the lead inbox.

Apply the migration and verify schema permissions, health checks and the empty inbox before setting `COAI_CRM_ENABLED=true`. Deploy again after changing flags, then verify the authenticated production health endpoint and lead API. Keep the capture flag false if those checks fail. No real email receipt is claimed solely from database health checks.

The Redis and Supabase sections below document previous alternatives; neither is required for Neon mode. Supabase billing and Upstash terms are unrelated to this active connection. No new database plan was purchased for the Neon switch.

## Alternative: Redis and private owner password

The current release supports `CRM_STORAGE=redis`, using the project's existing server-only Upstash credentials. This avoids depending on the paused Supabase project. Owner login uses `HQ_PASSWORD_HASH` (salted scrypt) plus `HQ_SESSION_SECRET` (random session-signing key). These belong only in server environment variables; never commit a password or hash into client code. Signed, HttpOnly sessions expire within one hour. Rotate the signing key to revoke all sessions. The Supabase configuration below remains an alternative, not a prerequisite for Redis mode.

The fictional sample workspace has been removed entirely. The inbox displays stored inquiries only. The main homepage website CTA leads to `/intake?pkg=website`; intake and contact require name, phone digits and a valid email on the server as well as the form.

Redis uses private `coai:hq:v1:` keys and atomic scripts for retry suppression and concurrent edit checks. No lead TTL is applied automatically. Daily counters expire after 90 days. The initial single-owner inbox reads the lead hash to filter/search; move to an indexed store if volume makes that costly. Configure backups and periodic retention review in the owner account. `/api/hq/health` requires login; POST performs a short-lived write/read/delete probe outside the lead collection. No fixture/test lead is required for that probe.

Enable `COAI_CRM_ENABLED=true` only after authenticated storage checks pass. This flag does not require Supabase when Redis mode is selected. Verify the public CTA path and server-side required fields. A storage health check is separate from confirming an actual new lead and email receipt; do not claim receipt unless observed.

Private owner CRM at `/hq`. `coaibakersfield.com/hq` follows the existing path-preserving redirect to `www.chaoticallyorganizedai.com/hq`.

## Shared HQ behavior and alternative Supabase Auth

Password login takes precedence whenever both `HQ_PASSWORD_HASH` and `HQ_SESSION_SECRET` are configured, independently of storage selection (`lib/crm/password.ts`, `lib/crm/auth.ts`, `app/api/hq/session/route.ts`). Otherwise the routes use the Supabase Auth path below. Do not replace an existing owner's access method during a storage or documentation cleanup.

- Server-validated Supabase Auth login. Access requires a Supabase user UUID explicitly listed in `HQ_ADMIN_USER_IDS`. Registration is not exposed. A self-edited admin claim or merely being signed in never grants access.
- An HttpOnly, SameSite Strict session cookie, scoped to `/api/hq`, secure in production, with at most one hour lifetime. Tokens and passwords are not stored in browser storage. Reauthenticate after expiry. Sign-out clears the cookie; a previously copied access token expires on its original schedule. Removing the UUID from the allowlist denies subsequent requests immediately.
- Search across all submitted names, businesses, email and phone; stage filter; 50-row pagination; notes and follow-up dates. Optimistic concurrency rejects stale edits.
- Capture paths exist for intake, contact, legacy audit registration and JAX waitlist when `COAI_CRM_ENABLED=true`. Code and mock tests do not prove production receipt. No CAPTCHA token, honeypot or IP is copied to HQ records. Legacy registration separately writes its legacy Supabase tables when configured; it does not import their history into HQ.
- Aggregate page-view totals for `/`, `/demo`, `/pricing`, `/intake`, `/contact`. No cookie, session ID, query string or visitor contact identity is saved by this counter. DNT and GPC suppress counting. Counts are views, not unique visitors, and are not bot-proof. Rate limiting uses the existing security layer; infrastructure providers retain their normal operational logs.
- HQ omits public chat/marketing components and has a restrictive same-origin CSP, no-index and no-store responses. The login shell is public; there is no fictional HQ sample workspace. Every real-data endpoint checks owner authorization. The separate `/demo` page uses sample data.

## Alternative Supabase activation order (not required for Neon or Redis)

The billing/restore observation in step 1 is historical. Check the selected project's current state before acting; do not infer a present outage or unpaid invoice from this record.

1. Resolve the Supabase organization's unpaid invoices and restore the existing `coaiwebsite` project (`mdhzbhgksbltfwgikvxy`). The restore attempt was rejected with `PaymentRequiredException`; SQL connectivity timed out. No schema changes were applied remotely.
2. Review and apply `supabase/hq.sql` to this project. It creates separate CRM tables and functions, enables RLS, revokes anonymous/authenticated grants, and permits only server service-role access. It uses no security-definer functions. Generate/record the applied migration using the project's normal Supabase migration workflow once the database is available; the SQL file is a setup script, not a fabricated migration history entry.
3. Verify both tables and functions exist, anonymous and ordinary authenticated roles cannot select/update/execute, and service role can insert/read/update. Run Supabase security advisors. These checks remain blocked while the database is paused.
4. Use an existing confirmed Supabase owner account, or create one through the owner's normal account setup. Do not paste passwords or secret keys into chat. Put its immutable Auth UUID in server-only `HQ_ADMIN_USER_IDS`. Confirm no unrelated account is allowlisted.
5. Configure the matching `NEXT_PUBLIC_SUPABASE_URL` and server-only `SUPABASE_SERVICE_ROLE_KEY` in Vercel. Existing values must be checked against the restored project rather than assumed to match its name. Never expose the service key with a `NEXT_PUBLIC_` prefix.
6. With `COAI_CRM_ENABLED=false`, deploy and validate owner login, unauthorized denial and database connectivity. Inspect the HQ capture-disabled banner. Existing forms continue email-only in this state.
7. Set `COAI_CRM_ENABLED=true` only after storage and owner access are verified, then redeploy. Submit one approved synthetic inquiry. Confirm exactly one row, consent=no, matching form details, owner edit persistence, an accepted email notification and the inbox receipt. Inspect the browser's effective HQ CSP and absence of executed third-party marketing scripts.
8. Confirm `https://coaibakersfield.com/hq` preserves `/hq` when redirecting. Historical Formspree/email records are not automatically backfilled.

## Acceptance and retry behavior

For contact, intake and waitlist, enabled capture saves before the synchronous provider send. A storage failure returns an error; an email failure after storage leaves the lead saved while the visitor sees a delivery error. Legacy `/api/register` instead uses a separate best-effort notification helper; its response does not confirm delivery.

Current clients retain an opaque submission ID across retries/reloads. `lib/crm/capture.ts` binds that ID to contact/scope content; retry capture does not overwrite owner edits. Older clients without IDs retain ten-minute UTC bucket suppression while the delivery gate is off. With the idempotent delivery gate on, missing IDs are rejected. See [reliability fixes](coai-egm-reliability-fixes.md) for migration 003, independent flags, replay claims, ambiguous outcomes and rollback limits. Default-off capture suppression does not prevent repeated provider sends and is not exactly-once delivery.

Lead source means the submitted form channel. Optional source/intent fields are supplied by the browser and are not verified attribution. The activity summary is separate from contact records. A view does not create a lead or reveal a visitor's email.

Notes do not trigger messages, calls, calendar events or reminders. Follow-up dates are a review list. SMS consent only relates to the original request and is not permission for campaigns. No automatic outreach or payment feature is present. Review and purge inquiry records on the site's stated retention schedule; the CRM has archive, not a deletion job. Privacy deletion requests require a controlled database operation.

## Historical validation

The counts and branch notes below describe an earlier verification run, not today's installed version or deployed backend. Later evidence is in [reliability verification](coai-egm-reliability-verification.md) and the dated [drift report](../2026-11-12_DRIFT_REPORT.md).

228 tests across 28 files passed using one worker after parallel runs hit Windows worker timeouts. Tests cover anonymous/nonowner/expired denial, owner allowlisting, no metadata escalation, cross-site edit denial, stale-write conflict, capture enablement/deduplication/error behavior, and aggregate-counter privacy. TypeScript/build and browser/HTTP results are recorded with the release. A mock passing does not verify the paused production database.

The branch includes the prior CRO changes from PR #32; do not merge that same work independently if this combined branch is released.
