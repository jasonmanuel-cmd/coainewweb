# Local verification record — 2026-11-01

Environment: Windows, Node v24.20.0, locked dependencies via `npm ci --ignore-scripts --no-audit --no-fund`. No dependency or lockfile changes. No production `.env` files were loaded; production database/service credentials were absent from the checked process environment.

## Completed checks

- First full run: 267 tests / 37 files passed. Added flow/UI tests afterward; the initial UI test had a punctuation-only expectation mismatch (`-` versus `—`) and passed after the assertion was corrected.
- Final `npm test -- --maxWorkers=1`: **273 tests / 39 files passed**, 123.95 seconds, including legacy query-source privacy hardening.
- Final `npm run build -- --webpack`: **passed**, compile, TypeScript, page-data collection, all 42 static generation steps, and build traces completed.
- Final `npm run lint` (`tsc --noEmit`): **passed** after all code changes. The production build also type-checked the final source.
- `git diff --check`: passed.
- PostgreSQL 16-alpine existing local image, temporary container `coai-journal-qa-20261101`, networking disabled, no published ports or host mounts, tmpfs database. Base migration, journal migration, synthetic SQL assertions, journal rollback, and rollback assertions all passed with `psql -v ON_ERROR_STOP=1`. Container removed after testing. No shared/Harbison container was modified.
- SQL assertions cover duplicate suppression, atomic lead/intent rollback, intake/contact-only intent creation, pending work without invented attempts, multiple visitor attempts on one journal, acceptance not downgraded by a later failed attempt, RLS and denied public grants, due inquiries beyond 50 newer records, cascaded metadata deletion, and schema rollback preserving a synthetic inquiry and owner note.
- React/happy-dom interaction checks cover selecting a full-inbox queue, source/consent visibility, recording completion without prematurely saving, clearing the date, appending existing notes, timestamp concurrency payload, and disabled automatic retries.
- Browser visual inspection: isolated static HTML exported from the React test fixture using actual HQ CSS; desktop and a 390px iframe (375px content plus scrollbar) rendered legibly. Mobile body width and scroll width both 375px: no horizontal overflow. Completion notes and Save lead controls inspected. This was **synthetic static rendering, not an authenticated live-database browser session**. No user tabs/global settings changed.
- Built application smoke checks on loopback-only port 4320: `/hq` 200/private no-store; `/api/hq/leads`, `/api/hq/notifications`, `/api/hq/health` each 401/private no-store without authentication; notification POST 405 (no dispatch route); homepage 200, new Facebook ID present and old ID absent. These ran after the first successful Webpack build, before the final legacy attribution hardening; that later change does not affect those routes' protection.

## Build/toolchain observations

Default `npm run build` (Turbopack) failed in the sandbox because it could not create Sentry's required junction. Repeating outside the sandbox cleared that error but Turbopack's instrumentation loader worker exited before connecting. `npm run build -- --webpack` then passed: compile, TypeScript, and all 42 static generation steps. No repository build-script/config change was made to hide the Turbopack issue. The default Turbopack path remains unverified on a clean deployment environment; the supported Webpack build is the verified local path.

## Not performed / remaining gates

No production database access, hosted Neon driver integration, actual Supabase/Redis integration, owner login with real credentials, real form/CAPTCHA submission, Formspree send or inbox receipt verification, delivery dispatcher execution, push/PR, deployment, paid service, social profile edit, or customer outreach. These are not implied by passing mock tests, schema tests, or a local build. The retry worker is intentionally absent; see the draft design document.

Both temporary loopback servers were stopped and agent-created QA tabs closed. The disposable database was removed. A static synthetic visual fixture remains outside the repository at `../coai-hq-visual.html`; it is not a production page or a functioning CRM.
