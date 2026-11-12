# Contact form false-success investigation — November 12, 2026

## Observed

A human test of `/contact` received a success message. The production request log confirms POST `/api/contact` returned 200 at 11:26 UTC. A subsequent authenticated HQ read returned zero inquiries with capture enabled and storage health passing. A scoped Gmail search including spam/trash found no matching notification.

The request body is not retained in operational logs, so the test's hidden-field values cannot be reconstructed. Do not state that browser autofill was conclusively observed.

## Confirmed code defect and repair

Both contact and intake returned `{ok:true}` before capture/delivery when the `company` honeypot was nonempty. That is a confirmed path to a false receipt and is consistent with the observed result. Browser autofill of a company-shaped hidden field is a possible trigger, not established history.

Filled honeypots now return 400 with a visible recovery message, before any CRM or provider call. The old `company` field remains checked for cached/older clients. Updated clients use a neutral `contact_reference` trap and password-manager ignore hints; visible business-name inputs declare `autocomplete=organization`. These hints reduce the opportunity for autofill mistakes but cannot guarantee every browser's behavior. Neither honeypot field is copied into CRM or provider payloads. Rejection logs contain a fixed event label, not submitted values or personal data.

CAPTCHA, origin checks, rate limits, field validation, storage-before-delivery and provider acceptance checks remain required. The fix does not recover a submission that was discarded before persistence, send an automatic reply, or establish successful inbox delivery.

## Verification

Regression cases exercise both routes, both legacy/current traps, clean submissions, exclusion of trap/token fields from capture, and failed CAPTCHA. Filled traps must never return a success body or invoke capture/delivery. The existing intake test now checks rejection rather than silent acceptance.

After production rollout, verify the rejection boundary with synthetic blocked data, then use one refreshed human browser form to confirm capture and actual notification receipt. Do not replay a previously accepted or ambiguous inquiry automatically.

## Follow-up: error hidden by CAPTCHA refresh

After the first fix, browser requests at 11:39–11:40 UTC reached `/api/contact` and returned 400. The only recorded spam-check warning in that interval belonged to the controlled synthetic rejection test; there is no evidence identifying the browser requests' exact rejection reason. They must not be labeled spam or bad Cloudflare configuration without further evidence.

The contact component set the server error, reset CAPTCHA, then cleared the error whenever a fresh CAPTCHA token arrived. This explains how a rejected request could appear to do nothing while the widget showed success again. The token callback now updates verification state only. Server errors remain until a new submission starts, and focus moves to the error message. Form details remain in place; no automatic resubmission occurs.

Fixed-label validation logs and allowlisted Cloudflare rejection codes distinguish the boundaries without storing contact fields, tokens, secrets, IPs or provider response bodies. A new UI regression exercises rejected submission, automatic widget remount/success, persistent/focused error, retained form value, and a later successful explicit retry. End-to-end acceptance and inbox receipt still require a human browser submission.
