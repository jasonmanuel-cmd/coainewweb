# COAI local reliability fixes

Prepared from production commit `0574025917736cb1ecb95814914f503a9b2d0e86`. No production deployment, migration, configuration change or live submission is part of this work.

## Changes ready without a schema change

HQ warns before discarding unsaved notes, stage/date changes or completion records on selection, filters, search, paging, refresh, logout and the home link. Save-in-progress blocks navigation and duplicate saves. Failed saves retain edits. Browser unload warns where supported; a browser crash cannot preserve an in-memory draft. No lead data is added to browser storage.

Contact, intake and waitlist clients retain a random submission UUID in tab session storage across retries/reloads. Only an opaque ID is stored by the new helper, never contact details. Blocked storage falls back to memory for the current page; cross-reload identity then cannot be guaranteed. An accepted response clears the ID for a later inquiry. The server hashes the ID with validated contact/scope content, separately scoped by inquiry source. Changing contact details creates a distinct key; attribution and recovery metadata cannot create duplicate capture on retry. IDs are not copied into CRM details or sent to the notification provider.

Older clients without an ID remain accepted while the delivery gate is OFF, retaining the old time-bucket behavior. This rolling-upgrade compatibility path is not a cross-bucket dedupe guarantee. With the gate ON, routes reject missing IDs before capture, directing visitors to refresh.

Waitlist provider delivery now uses the common 12-second server deadline and a 25-second browser deadline. Failure retains the retry identity and refreshes CAPTCHA. A timeout does not claim provider nonacceptance.

## Separately gated durable delivery

`COAI_IDEMPOTENT_DELIVERY_ENABLED` defaults OFF and is independent of `COAI_NOTIFICATION_JOURNAL_ENABLED`, which must remain OFF. Migration 003 requires only existing migration 001. It creates private receipt storage; it does not install a worker or apply migration 002.

With the new gate ON, only a Neon-backed captured inquiry can send. A unique receipt atomically claims the send. Accepted replays return success without another send. Database claim failures stop sending. Pending/unknown outcomes never automatically resend, including network timeout, process crash, HTTP rejection, or failure to save the acceptance. Visitor errors distinguish a saved inquiry from unconfirmed delivery. Receipt finalization is fenced to the claimed attempt number.

One further explicit visitor retry can be armed only by a separately authorized operator after independently proving nonacceptance and that the prior sender has stopped. It requires a non-PII incident reference and an atomic state comparison; the app caps attempts at two. See [delivery recovery procedure](../neon/DELIVERY-RECOVERY.md). No public reset/retry endpoint exists. Exact-once provider delivery is not guaranteed. Different IDs, deliberate altered submissions and provider-side behavior remain outside deduplication guarantees.

Receipt state is not exposed by the old notification-journal panel. An operator needs separately authorized private receipt inspection and reconciliation before activation. Without activating the gate, stable capture IDs and UI/timeouts work, but the existing delivery path can still send again on retries. Do not describe this default-off draft as live duplicate-send protection.

## Deployment prerequisites and rollback

Review local test evidence and migration 003/rollback. Approve production schema changes and rollout separately. Confirm Neon/CRM configuration, deploy compatible clients and server, verify schema/access and assign a reconciliation owner before enabling the new gate. No credentials are supplied or changed by this draft. Do not run a real submission unless separately authorized.

Once receipts exist, disabling the gate or rolling back to old sender code can resume duplicate sends. Retain receipt history and use compatible gated code or pause submissions under an approved operational plan. The prepared rollback refuses to drop a populated receipt table.

## Conditional findings evaluated

Supabase email-login UI and Redis full-inbox scaling are alternate-configuration issues, not demonstrated production failures in the verified Neon installation. They are deferred rather than changing owner access or adding unrelated backend architecture. Password sessions still expire after one hour; logout does not revoke a copied token. Emergency session-secret rotation invalidates all such sessions and requires separately authorized credential handling. No authentication or access policy changes are included.

The legacy `/api/register` audit workflow remains separate: repository search found no current app/component caller. It runs audits, optionally writes separate Supabase lead/audit tables and uses a different notification helper. Its legacy capture/retry behavior is unchanged and is not protected by the new delivery gate. No production usage or authenticated external consumer check was performed; do not claim it is inaccessible. Changing that workflow needs its own reviewed persistence/response contract rather than silently folding it into contact/intake/waitlist delivery.

The previously withdrawn journal-atomicity finding remains withdrawn: migration 002 already has a transactional lead-insert trigger. Migration 003 solves send-claim/replay state independently and does not claim that trigger was defective.
