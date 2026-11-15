# Local verification — COAI reliability fixes

Base: `0574025917736cb1ecb95814914f503a9b2d0e86`. Branch: `fix/coai-egm-reliability`.

- Final-code regression suite: **318 tests passed in 44 files**. This includes stable identity across time boundaries, changed-content separation, missing/malformed identity validation, accepted replay, concurrent send claims, ambiguous outcomes, receipt-storage failures, stale-attempt fencing, bounded waitlist delivery, and HQ unsaved/delayed/failed-save navigation behavior.
- TypeScript `npm run lint`: **passed**. Independent review of the full change and a second review of the attempt-fencing delta found no concrete issues. Reviewers did not execute production requests.
- Isolated PostgreSQL 16 checks: migrations 001 and 003 applied; synthetic SQL regression assertions passed; separate competing claims granted one receipt; recovery claims granted only the second allowed attempt; stale attempt finalization failed; RLS enabled and no PUBLIC table grants; populated rollback refused; unused rollback removed receipt schema while preserving leads. The named disposable container was removed. No production database or secrets were used.
- `git diff --check`: passed (Git noted routine LF/CRLF normalization).
- Build: **`npm run build -- --webpack` passed with exit code 0** after reconciling the lost session and confirming no build process remained. It compiled, checked TypeScript, generated all 42 static pages, and completed optimization/build traces. Output and exit code are saved outside the repository as `../coai-final-build.log` and `../coai-final-build-exit.txt`. The initial sandbox attempt failed with Windows EPERM creating generated output; the first permitted rerun lost its terminal session. The successful final rerun resolves that uncertainty. Default Turbopack was not rerun in this Windows environment.

## Scope of evidence

UI regression tests use synthetic React/happy-dom fixtures; they do not prove native browser unload dialogs on every browser. HTTP/provider behavior is mocked. Database tests use disposable local PostgreSQL, not the deployed Neon service. No real inquiry, notification, authenticated live CRM action, migration, deployment, push, credential change or feature activation occurred.

Both delivery-related flags remain default OFF in the draft. Durable delivery requires migration 003 and separate rollout approval; the existing journal remains OFF. The legacy audit-registration path and alternate backend/authentication limitations are described in `coai-egm-reliability-fixes.md`.
