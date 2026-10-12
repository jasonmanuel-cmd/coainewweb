# COAI website — project record

**As of:** 2026-10-12 · **Repo:** `jasonmanuel-cmd/coainewweb` · **Production base:** `main` @ `57d66ee`
**Working branch (agreed):** `claude/sleepy-dijkstra-rh9grl` — carries open PR #21 plus the follow-up commits listed in §1.

This file is the running record of the remediation work started from `SITE-GOD-MODE-AUDIT-2026-10-10.md`.
Everything below was measured or observed in this session unless it is explicitly listed as **not verified**.

---

## 1. Changes made and files affected

Workflow used for every change: draft PR → preview build → explicit "merge it" from the owner → squash merge.

| PR | State | Commit | Change | Files |
|---|---|---|---|---|
| #8 | merged | `a039bbd` | Simple Analytics script (Do Not Track) + CSP entries | `app/layout.tsx`, `next.config.ts` |
| #9 | merged | `7edd61c` | CSP/permissions for the Vapi chat (jsDelivr, vapi/daily hosts, workers, microphone) | `next.config.ts` |
| #10 | merged (not mine) | `a442c82` / `9ce15d2` | Full site rebuild from the `arena/f81a4c57` branch. **Overwrote #8 and #9** (found later). | whole app |
| #11 | merged | `c2f5a65` | Retheme to the logo's neon green (`#7dff9d`) and place the logo (nav, footer, hero watermark, 404, loading, favicon/apple icon, OG card, schema logo) | `app/tokens.css`, `app/cinematic.css`, `app/revamp.css`, `app/globals.css`, `components/ui/ui.css`, `components/revamp/home.css`, `components/revamp/RevampNavbar.tsx`, `components/revamp/RevampFooter.tsx`, `app/layout.tsx`, `app/page.tsx`, `app/not-found.tsx`, `app/loading.tsx`, `lib/schema.ts`, `app/icon.png`, `app/apple-icon.png`, `public/{coai-logo.webp,coai-mark.webp,coai-logo-square.png,og-default.png,coai-command-grid.jpg}`; deleted `app/icon.svg`, `public/coai-mark.svg` |
| #12 | merged | `b47ac36` | Canonical domain locked to `https://www.chaoticallyorganizedai.com` (env var ignored except localhost); 308 redirects from alias hosts; Dependabot config | `lib/site.ts`, `next.config.ts`, `.env.example`, `README_SETUP.md`, `.github/dependabot.yml`, `__tests__/canonical-domain.test.ts` |
| #18 | merged | `05958c0` | Portfolio counts derived from `PORTFOLIO_CASES`; labels no longer say "live" for temporary hosting; business-facts guard tests | `lib/portfolio-stats.ts`, `app/page.tsx`, `app/portfolio/page.tsx`, `components/about/AboutMarketingContent.tsx`, `__tests__/business-facts.test.ts` |
| #19 | merged | `b395ffe` | Restored Vapi chat (`CipherChat`, fallback launcher + dialog, nav entry) and Simple Analytics; CSP/mic permission; regression tests | `components/revamp/CipherChat.tsx`, `app/layout.tsx`, `components/revamp/RevampNavbar.tsx`, `app/cinematic.css`, `next.config.ts`, `__tests__/chat-and-analytics.test.ts` |
| #15 | merged | `917f1a7` | happy-dom 20.8.9 → 20.14.5 (dev) | `package.json`, `package-lock.json` |
| #16 | merged | `d7565f2` | @marsidev/react-turnstile 1.5.0 → 1.6.1 | `package.json`, `package-lock.json` |
| #13 | merged | `b23f995` | react + react-dom 19.2.4 → 19.3.0 | `package.json`, `package-lock.json` |
| #17 | merged | `9120e08` | zod 3.25.76 → 4.6.5 | `package.json`, `package-lock.json` |
| #20 | merged | `57d66ee` | @sentry/nextjs 10.76.2 → 11.6.0; `enableLogs` removed; `sendDefaultPii:false` replaced by an explicit `dataCollection` opt-out; privacy test | `package.json`, `package-lock.json`, `instrumentation-client.ts`, `sentry.server.config.ts`, `sentry.edge.config.ts`, `__tests__/sentry-privacy.test.ts` |
| #21 | **OPEN (draft)** | `b4abcbe` | API routes no longer return internal error text: shared `apiErrorResponse`, `PublicError`, Google/Supabase/network errors stay server-side; `runAudit` rejects private hosts up front and keeps upstream bodies out of responses | `lib/api-errors.ts`, `lib/public-error.ts`, `lib/audit/run-audit.ts`, `lib/utils/safe-fetch-url.ts`, `lib/utils/normalize-website-url.ts`, `app/api/{contact,intake,jax-waitlist,register,audit,lighthouse}/route.ts`, `__tests__/api-errors.test.ts`, `__tests__/run-audit.test.ts` |
| — | on branch, unmerged | `84c8c2c` | Fix for a regression I introduced in #19: legacy `.cipher-*` styles in `home.css` overrode the launcher on `/pricing` | `components/revamp/home.css` (−78 lines), `__tests__/chat-and-analytics.test.ts` |
| — | on branch, unmerged | (this commit) | This record + status banner in the audit document | `docs/PROJECT-RECORD.md`, `SITE-GOD-MODE-AUDIT-2026-10-10.md` |

**Closed without merging:** #14 (Dependabot Sentry 11 — failed build; superseded by #20), #1 and #2 (April "Install Vercel Web Analytics" drafts — no shared history with `main`).

---

## 2. Checks performed and actual results

### Latest full run (branch head, code identical to PR #21 plus the CSS fix)
| Check | Result |
|---|---|
| `tsc --noEmit` | exit 0 |
| `vitest run` | 20 files, **199/199 passed** (198 before the CSS fix) |
| `npm audit` | **0** vulnerabilities (info/low/moderate/high/critical all 0) |
| `next build` | exit 0 |
| Installed versions | next 16.4.0 · react/react-dom 19.3.0 · zod 4.6.5 · @sentry/nextjs 11.6.0 · react-turnstile 1.6.1 · happy-dom 20.14.5 |
| Chromium smoke test of the production build, 1440×1000 and 390×844, 12 routes + 404 | all routes 200 (404 intentional), no horizontal overflow, no unexpected console/page errors* |
| Text-contrast scan (every a/button/p/h/span/li/label/td, WCAG AA thresholds), 13 routes | **0 failures** after the CSS fix; **1 failure on `/pricing` before it** (chat button) |
| Chat launcher | 190×48, label fits, dark text on both `/` and `/pricing`; dialog opens, links are tel/mailto/intake, Escape closes; nav Explore → "Chat with Cipher" opens it |
| Simple Analytics tag in the live DOM | `src=https://scripts.simpleanalyticscdn.com/latest.js`, `data-collect-dnt="true"`, async |

\* Console errors excluded as environmental: hosts the sandbox cannot reach (`ERR_TUNNEL_CONNECTION_FAILED`), Sentry's `/monitoring` tunnel returning 500 because Sentry is unreachable, and `/_vercel/speed-insights/script.js` returning 404 (route exists only on Vercel).

### Earlier checks, still relevant
- **Dependabot PRs, each installed from scratch (`npm ci`) on its own branch:** #15, #16, #13, #17 passed typecheck, 176 tests and build. **#14 failed** typecheck (2 errors) and build (`enableLogs`, then `sendDefaultPii` not in the v11 options type). Deleting `sendDefaultPii` alone built, but v11's `dataCollection` defaults collect cookies/headers/bodies, so the explicit opt-out was written instead and verified to typecheck and build.
- **Combined `main` at `9120e08`** (all four Dependabot merges): `npm ci` ok, typecheck ok, 187 tests, audit 0, build ok. Lockfiles had been merged independently, so this was checked rather than assumed.
- **zod 4 behavior** (live requests to a production build): bad email → 400; empty body → 400; valid payload passes validation. Error text changed wording ("Invalid input: expected string, received undefined").
- **Canonical/redirects** (production build, spoofed `Host`): `coaibakersfield.com`, `www.coaibakersfield.com`, `chaoticallyorganizedai.com` → 308 to the `www` canonical with path and query preserved; canonical host → 200 (no loop); canonical, `og:url`, JSON-LD logo, robots sitemap line, every sitemap `<loc>` and `llms.txt` links all use one origin.
- **API error handling** (production build): bad email → "Please check your email and try again." (400); empty body → readable field list (400); network failure → fixed message (500) with detail only in the server log; malformed JSON → 400; `localhost` / `169.254.169.254` audit targets → 400 "Host not allowed". The 7 tests in `api-errors.test.ts` were run against the **old** routes and all 7 failed, then pass on the new code.
- **Hero/theme render** (12 routes × 2 viewports): all 200, no overflow.

### Not verified (could not be, from the sandbox)
- The live site, Vercel previews or production visuals (sandbox cannot reach them; only the Vercel bot's "Ready" status was seen).
- The Vapi widget actually loading and starting a call, and its button colors (theme/idle options set from the old config shape and my understanding of the widget).
- Simple Analytics receiving a pageview; Sentry receiving an event after the v11 upgrade (and that no cookies/headers/bodies are attached).
- Contact/intake form submission end to end after zod 4 and react-turnstile 1.6.1 (Turnstile widget rendering, Formspree delivery).
- Vercel project settings (project/domain/env APIs return 404/403 to this connection): `NEXT_PUBLIC_SITE_URL`, attached domains, which host is primary.
- A real-browser run on React 19.3.0 against Vapi/Turnstile third-party scripts.

---

## 3. Remaining problems

| # | Problem | Owner / next step |
|---|---|---|
| 1 | **PR #21 is not merged** (draft, preview build Ready, mergeable). Until it merges, production still returns raw error text. | Owner: say "merge it" |
| 2 | `NEXT_PUBLIC_VAPI_API_KEY` must be set in Vercel (Preview + Production) and redeployed, otherwise only the fallback dialog appears. The Vapi script loads from jsDelivr as `@latest` (third-party code that can change under the site); pin a release tag. | Owner (Vercel); tag choice |
| 3 | Live verification still owed: chat button/CSP console, Simple Analytics dashboard, a Sentry test event (use `/sentry-example-page`), one real contact-form submission. | Owner |
| 4 | `NEXT_PUBLIC_SITE_URL` in Vercel must be unset or exactly `https://www.chaoticallyorganizedai.com` (the API origin guard compares against it; if unset the guard is off). All four hostnames must be attached with `www` primary. Search Console: add both domains, resubmit the sitemap. | Owner |
| 5 | `runAudit` follows redirects with the host check applied to the first hop only (SSRF via redirect). Not fixed. | Follow-up PR: follow redirects manually and validate each hop |
| 6 | `/api/audit`, `/api/register`, `/api/lighthouse` have no UI in this repo. `PAGESPEED_API_KEY` must be set or Google's shared quota returns 429. | Decide: remove or harden |
| 7 | Portfolio stat "**661+ Local + National Reach**" is not a verifiable metric. | Owner: remove or replace |
| 8 | Audit items not addressed: privacy copy vs actual tracking (§7), accessibility beyond text contrast (landmarks, link names), performance/shared JS and tracker load, ~5k lines of CSS drift, proof visuals and photography, city pages. Mojibake is only covered by the existing integrity test, which I did not re-audit. | Prioritize next |
| 9 | `@vercel/analytics` was dropped by the rebuild; Speed Insights remains. Decide whether to reinstate. | Owner |
| 10 | Sentry DSN is hard-coded as a fallback in three config files (a DSN is public by design, but better in env). | Low priority |
| 11 | Hero brain watermark opacity (0.22–0.36) is a taste call; adjust `.cinematic-hero-mark` in `app/cinematic.css`. | Owner preference |

---

## 4. Next concrete action

**Merge PR #21** (squash) after a glance at its preview, which lands the error-message fix and the `/pricing` chat-button fix together (both are on this branch). Then, in order:
1. Set `NEXT_PUBLIC_VAPI_API_KEY` in Vercel (Preview + Production) and redeploy.
2. On the live site: click the chat button with the console open, confirm a visit appears in Simple Analytics, trigger `/sentry-example-page` and confirm the event reaches Sentry with no cookies/headers/body, and submit the contact form once.
3. Check Vercel env/domains per problem #4.

---

## 5. Decisions and corrections

### Decisions
- **Canonical origin is code, not config.** `lib/site.ts` hard-codes `https://www.chaoticallyorganizedai.com`; `NEXT_PUBLIC_SITE_URL` is honored only for `localhost`. Alias hosts 308 to it.
- **Brand palette = the logo's green.** Legacy token names (`--signal-orange`, `--steel-blue`, `--inspection-yellow`) are kept and now resolve to the green family; caution stays amber, errors red. Button text on accent backgrounds is dark (`--cta-text`).
- **Dependabot:** weekly, grouped (Next/React, Sentry, test tooling). Never push to a bot's branch; replace it with a normal PR when changes are needed (#14 → #20).
- **zod 4 accepted** after combined-main verification; error wording changed, which the new error handler now makes irrelevant to visitors.
- **Sentry v11:** privacy is an explicit opt-out via `dataCollection`, locked by a test.
- **API errors:** internal errors are logged + sent to Sentry and answered with a fixed message (500). Only `PublicError` messages and validation hints reach the client. The `error` string field is preserved because the forms render it.
- **CSS ownership:** `.cipher-*` classes live only in `app/cinematic.css` (test-enforced).
- **Process:** every change is a draft PR; the owner says "merge it"; squash merge. Ambiguous requests ("do all of that") are clarified before irreversible actions.

### Corrections to earlier statements or assumptions
1. The audit said production used Next 15.5.19 with critical advisories. `main` already had Next 16.4.0 (the current release) and `npm audit` reported 0; no upgrade was needed.
2. Most of the audit's "contradictory claims" table was already fixed by the rebuild; only portfolio counts and "live" vs temporary hosting remained (fixed in #18).
3. I said Dependabot's first run would be "next Monday". It opened #13–#17 within minutes of the config merging.
4. The rebuild (#10) silently overwrote #8 and #9 (analytics, Vapi chat, CSP). Found during the Dependabot review; restored in #19.
5. Deleting `sendDefaultPii` to fix the Sentry 11 build would have silently enabled collection of cookies, headers and request bodies; replaced with an explicit opt-out.
6. My own #19 introduced a style collision with legacy `.cipher-*` rules in `home.css` (visible only on `/pricing`). Found in a verification pass on 2026-10-12 and fixed in `84c8c2c`.
7. The stop-hook warning about "1 unpushed commit" was a stale tracking ref for a branch GitHub had deleted after merge, not unpushed work.
8. After the dependency merges I had verified build and API behavior but not re-rendered the site in a browser; this record's smoke test closes that gap.

### How to reproduce the checks
```
npm ci && npx tsc --noEmit && npx vitest run && npm audit && npx next build
```
