# COAI capture and follow-up — local review draft

Based on remote main `49d927fef983e4c6ee242e1e4e4d272d5114663a`, cloned on 2026-11-01. Branch: `feat/coai-capture-followup-local`. No push, PR, deployment, live migration, credentials, profile changes, messages, or real form submissions are part of this work. COAI remains separate from Harbison.

## Result and scope

The existing website, pricing, content, and CRM remain in place. The public form layouts are unchanged. The website's Facebook `sameAs` now points to `https://www.facebook.com/profile.php?id=61584775744622`.

Intake and contact attach sanitized first-landing context when a visitor voluntarily submits their existing form. HQ adds full-inbox queues for due/overdue/upcoming/unscheduled/closed inquiries, explicit completion notes, and an optional notification journal. This is not visitor identification, a new CRM, an AI intake agent, or an outreach service.

## Attribution

`lib/crm/attribution.ts` uses fixed vocabularies, not arbitrary slug validation. It retains approved UTM source/medium/campaign/content values, an allowlisted public landing path, and a coarse allowlisted referrer source. It drops full referrer URLs, URL queries/fragments, ad click IDs, free-text search terms, arbitrary campaigns, emails, and tokens. Host suffix matching requires a domain boundary. The browser stores only the sanitized first touch in tab session storage, with no identifier or network request; DNT/GPC suppress and clear this context. Blocked browser storage does not block submission.

The server sanitizes independently before CRM capture and provider delivery. Legacy contact `from` and `intent` query-derived values are restricted too; the contact notification subject is rebuilt from safe context. Existing owner detail rendering shows these fields. Attribution remains unverified browser-supplied context and grants no additional consent. No historical attribution is fabricated.

Allowed campaign values are `coai-contact` and `coai-intake`; add future campaigns by reviewing the code allowlist. Example links to copy into social profiles/posts **after approval**, without editing the social accounts in this task:

- `https://www.chaoticallyorganizedai.com/contact?utm_source=facebook&utm_medium=social&utm_campaign=coai-contact&utm_content=profile`
- `https://www.chaoticallyorganizedai.com/intake?utm_source=facebook&utm_medium=social&utm_campaign=coai-intake&utm_content=post`

First-touch context lasts for the tab session. Unknown public landing paths are omitted. Privacy signals can remove attribution without affecting an inquiry. Review the site's storage/privacy disclosures before rollout.

## Owner follow-up

Queue predicates run **before pagination** in Neon SQL, Supabase queries, and the existing Redis in-memory adapter. Due includes today and overdue; overdue excludes today. Open queues exclude won/lost/archived opportunities. Dates use UTC consistently and the interface says so. Due/upcoming entries sort by date, with deterministic tie-breaking; totals count the full matching result. Existing page-local statistics retain their page-local labels.

“Record follow-up completion” appends a dated line to existing notes and clears the date in the editor. The owner must explicitly Save lead; the prompt makes this clear. A next date may be entered before saving. Existing timestamp concurrency protects saved notes from stale updates. Completion notes are editable owner notes, **not an immutable audit log**. Closed opportunities are visible through their own queue. This remains the existing single-owner workspace: no new assignment model, calendar event, scheduled reminder, or customer message.

## Backend health

Neon and Redis retain their current checks. Supabase now checks the actual lead table rather than reporting a Redis-selection error. A successful read explicitly does not verify writes. Supabase POST returns 501 with a clear explanation instead of attempting a Redis probe. All health checks still require HQ authorization and return private/no-store responses.

## Durable notification design

The optional journal is **Neon-only** because that is the current provider documented in the repository; live configuration was not inspected. `COAI_NOTIFICATION_JOURNAL_ENABLED` defaults off and also requires Neon plus CRM capture enabled. Redis/Supabase continue existing synchronous delivery without this journal.

Prepared migration `neon/002_notification_journal.sql` creates a private journal keyed by lead ID and separate attempt records, with RLS, revoked PUBLIC access, and cascading deletion. No duplicated contact payload, credentials, endpoint URL, CAPTCHA token, or upstream error body is stored. An invoker trigger inserts notification intent in the **same transaction as a new intake/contact lead**. A process crash before sending therefore leaves a pending intent. There is no historical backfill. The migration itself starts intent recording even if the application journal flag is off; leave the migration unapplied until this behavior is approved.

When recording is activated, each existing synchronous provider send has its own UUID attempt. The start query reuses the journal entry by captured submission key. Accepted and unconfirmed attempts are retained separately; a later failure cannot downgrade an earlier acceptance. A process interrupted before finalization remains pending. HQ shows up to 50 journal entries, prioritizing those without a recorded acceptance. This is a bounded review list, not a complete reporting/export UI.

The existing visitor contract is preserved: save the CRM inquiry first (when capture is enabled), then require provider acceptance before returning success. Provider/network failures still return the existing delivery error. The inquiry remains saved after a delivery failure. Journal errors are sanitized and do not change the provider result. Each journal SQL request has a 2-second timeout; enabled recording can add up to approximately 4 seconds around the existing send. If tracking fails or acceptance cannot be recorded, the intent may remain pending even though delivery occurred. Provider acceptance is **not proof of inbox receipt**.

Exact same normalized leads within the existing 10-minute epoch bucket are deduplicated without overwriting owner edits. A different payload, changed attribution, or crossing a bucket boundary can create a second lead. Existing visitor retries still attempt provider delivery again. This draft deliberately does not silently change those response or resend semantics.

### Retry activation is not implemented

`notificationDispatchEnabled` is a constant false. There is no worker, cron, retry POST endpoint, queue consumer, external reminder, or environment switch that can turn automatic dispatch on. The migration and journal are a durable foundation for **review before retry**, not a claim that automatic recovery is already built.

Before adding a dispatcher, a separate reviewed change must provide: atomic claim/lease and expired-lease handling; unique retry-attempt IDs and a bounded attempt limit; backoff and terminal/manual-review states; suppression after any confirmed acceptance; source-to-provider mapping from server configuration; minimal reconstruction from the existing lead; retention/deletion propagation; authorization and same-origin controls for owner actions; and an inbox verification run. Ambiguous timeouts require owner review because Formspree acceptance may have occurred; an idempotent provider contract must be verified before promising duplicate-free retry. Do not replay historical entries merely because they are pending.

## Rollout and rollback gates

1. Review the branch and verify the actual production backend, capture flag, owner access, privacy disclosures, and notification destination using approved access. No production settings were inferred from the source docs.
2. Validate on an approved staging environment with synthetic data and mocked provider delivery. Verify full HTTP-to-database flow for the selected provider, concurrent owner writes, duplicate requests, and interrupted delivery. Local PostgreSQL schema tests do not verify Neon's hosted HTTP driver, production RLS/roles, or real Supabase/Redis connectivity.
3. Review/apply the prepared migration only to the approved Neon target, taking an appropriate backup. Confirm the private grants and trigger, then enable the journal flag only after testing. Existing capture activation is a separate gate. Do not add a scheduler or dispatch flag.
4. Any live test inquiry, notification, inbox receipt check, deployment, profile-link change, or new service requires its specific authorization. No paid service is required by this draft.
5. Application rollback: revert this commit and disable the journal flag. Existing lead details and notes remain compatible. The trigger continues creating pending intents until the SQL rollback is applied.
6. Schema rollback: securely export journal history if needed, disable recording and roll back application code first, then review/run `neon/002_notification_journal.rollback.sql`. It removes only the journal trigger/function/tables and migration marker; it does not drop or rewrite CRM leads. Do not run it while journal-enabled application instances are active.

## Local evidence

See `coai-capture-followup-verification.md` for final commands, results, environment limitations, and unrun production checks. Synthetic PostgreSQL checks are retained in `neon/tests/notification_journal.sql` and `neon/tests/notification_rollback.sql` for reproducibility on a disposable database only.
