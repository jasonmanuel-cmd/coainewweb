# Prepared delivery receipt rollout and recovery

Nothing here has been applied to production. `COAI_IDEMPOTENT_DELIVERY_ENABLED` defaults OFF. Production `COAI_NOTIFICATION_JOURNAL_ENABLED` must remain OFF. Migration 003 requires 001, not 002; the optional journal is bypassed by gated delivery. There is no worker, cron, lease expiry, or automatic recovery.

Before enabling: review and execute 003 and its SQL tests on an isolated database; run a real two-session unique-claim contention test there; verify private owner access/RLS, stable submission IDs from all clients, retained capture, provider response behavior, and operational reconciliation ownership. Deploy compatible code before a separately approved flag change. Receipt state is not displayed by the legacy notification journal UI. Query receipts using authorized private database access.

The ungated legacy path still sends on every visitor retry and its optional journal is best effort. Missing submission IDs use legacy time buckets only while ungated; gated public routes reject missing IDs before capture/send. Do not advertise durable replay safety before coordinated client/server rollout. Switching the gate OFF after use resumes legacy sending and can duplicate notifications: retain receipt history, pause submissions or roll back to compatible gated code instead.

The gate atomically claims one receipt per captured lead. Accepted replay returns success without sending. Pending and unknown are non-retryable by the app until separately authorized operator reconciliation, including network errors, timeouts, HTTP rejection, process crash, and failure to persist an acceptance. Storage unavailability fails closed. Receipt rows store hashes and references, not contact payloads. A retained lead remains in HQ even when delivery is unconfirmed.

This is not provider exactly-once delivery and does not guarantee no duplicates: users may create new submission IDs, legacy clients may cross buckets, and the provider may perform its own retries. A pending receipt could mean either no request was sent or that a send succeeded before a crash. HTTP errors are also conservatively unknown because they do not prove absence of side effects. Do not delete receipts, reset pending, or blindly resend.

Manual reconciliation: preserve the receipt ID/state/timestamps and inspect the retained lead and provider dashboard using authorized operator access. Check contact/time/content without transmitting the internal submission key to the provider. If acceptance is independently verified, record evidence in the operational incident log and perform a reviewed compare-and-set update (parameters must be bound):

```sql
update coai_hq.delivery_receipts set state='accepted',finished_at=clock_timestamp(),reconciliation_ref=$3
where id=$1::uuid and state=$2 and state in ('pending','unknown') and attempts=$4
returning id;
```

Require exactly one returned row; zero means stop and inspect concurrent state. Use a non-PII incident reference in `$3` and the observed attempt count in `$4`, with evidence in the authorized operational incident log. Runtime finalization also checks the claimed attempt count so a delayed first sender cannot finalize a second attempt. If non-delivery is independently established AND the prior sender is conclusively stopped (no in-flight request or process can still send), a separately authorized operator may arm one additional attempt using this compare-and-set:

```sql
update coai_hq.delivery_receipts set state='ready',reconciliation_ref=$3
where id=$1::uuid and state=$2 and state in ('pending','unknown') and attempts=1
returning id;
```

The next explicit submission with the same ID and content atomically claims ready -> pending and increments attempts to 2. No scheduler sends it. The application never arms a retry itself; a second failure cannot be rearmed. Do not use this procedure based on a timeout or an empty dashboard alone. There is no public retry/reset endpoint. If the outcome cannot be established, leave the receipt unresolved and follow up directly with the retained contact; never claim a resend is duplicate-free. Reconciliation must have one assigned operator. The rollback SQL refuses populated receipt tables to preserve this history.
