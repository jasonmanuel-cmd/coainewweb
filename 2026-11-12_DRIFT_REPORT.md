## README_SETUP.md

- **Resolved — obsolete public workflow.** Instructions named a homepage RedScreen form, `/api/messages` and Twilio sender variables. `app/page.tsx` now points website inquiries to `/intake?pkg=website`; the current API route inventory has no messages route and source has no Twilio sender. Setup now describes contact/intake and marks `/api/register` as legacy. No SMS implementation was added.
- **Resolved — database conflation and unsupported receipt evidence.** Supabase setup was presented as the whole site's required database, and the legacy audit checklist required a `messages` row. `app/api/register/route.ts` writes only leads/audits/audit_results and separately calls `captureCrmLead` when enabled. It calls `notifyLead` without waiting for accepted delivery. Setup now separates legacy audit tables from optional HQ backends and distinguishes page availability, capture, provider acceptance and inbox receipt. `lib/forms.ts` supplies the shared form endpoint.
- **Resolved — stale origin/security description.** The guide said `NEXT_PUBLIC_SITE_URL` controlled the origin guard and that scripts used per-request CSP nonces. `lib/security/request-guards.ts:isSameSiteRequest` compares the actual request origin; `next.config.ts:headers` builds a static policy. Documentation now describes these mechanisms and conditions database RLS claims on applied-schema verification.

## docs/hq-setup.md

- **Resolved — conflicting current-provider instructions.** Neon and Redis were both labeled current, followed by an unqualified Supabase restore/setup sequence. Source selects storage using `CRM_STORAGE` in `lib/crm/neon-store.ts` and `lib/crm/redis-store.ts`, with Supabase fallback in `lib/crm/capture.ts`. The guide now separates backend alternatives and labels historical Supabase billing observations. No backend, migration, owner access or production flag was changed.
- **Resolved — conflicting authentication/sample claims.** The guide described Supabase allowlisting as the only login path and said a fictional HQ workspace was public, despite also stating that the sample was removed. `lib/crm/auth.ts:requireHqOwner` and `app/api/hq/session/route.ts` choose configured password sessions before Supabase Auth. `components/hq/HqWorkspace.tsx` shows real stored records or the capture-disabled banner. The alternative authentication path and distinction from the separate public `/demo` are now explicit.
- **Resolved — obsolete capture/retry contract.** The guide described only ten-minute bucket identity, incorrectly generalized synchronous delivery to legacy registration, and linked the homepage to `pkg=2`. `lib/crm/capture.ts` binds current submission IDs to content; contact/intake/waitlist call `deliverCapturedForm`; legacy registration uses `notifyLead`. `app/page.tsx` links `pkg=website`. The guide now explains current-client identity, older-client fallback, default-off delivery receipts and their separate rollout requirements. The original test counts are labeled historical rather than presented as current verification.

## .env.example

- **Resolved — stale origin-guard comment.** The comment claimed the API origin guard compared `NEXT_PUBLIC_SITE_URL`. Source uses the request URL's origin. Only the comment changed; example values, credentials and feature defaults were not modified.

## docs/PROJECT-RECORD.md

- **Resolved — historical next actions looked actionable.** October PR states, installed versions and instructions to merge PR #21 were still discoverable as a running project record. Current main contains later error-handling and redirect validation code (`lib/api-errors.ts`, `lib/audit/run-audit.ts`), plus subsequent releases. An explicit historical-snapshot banner now points readers to current setup documents while retaining the dated evidence.

## Unresolved verification boundary

- **Open — production delivery is not established by code agreement.** This bounded EGM drift pass inspected the three operational documents above and their cited source, plus `.env.example`; it is not an all-file audit or a five-phase fresh-context Goldfish review. Live form submission, selected production backend, database writes and actual inbox receipt were not exercised. Optional journal/receipt migrations and flags remain outside this documentation change. The existing reliability and follow-up verification records remain dated local-test evidence, not a production receipt.
