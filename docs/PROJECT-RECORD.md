# COAI website — project record

**As of:** 2026-10-15 · **Repo:** `jasonmanuel-cmd/coainewweb` · **Production base:** `main` @ `1e8a9c4`
**Working branch (agreed):** `perf/lighthouse-critical-path` — PR #28, Lighthouse critical-path work (§7).
Earlier work below was carried on `claude/sleepy-dijkstra-rh9grl` (PR #21) and later design-system/SSRF changes (§6).

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

---

## 7. 2026-10-15 — Lighthouse critical-path remediation (branch `perf/lighthouse-critical-path`, PR #28)

Scope: raise Lighthouse to >90 on mobile and desktop (desktop was already 92; the field Speed Insights dashboard showed Real Experience Score 23 with FCP 4.99s / LCP 5.85s / CLS 0.25 on `/`).

### 1. Changes made and files affected

| File | Change |
|---|---|
| `app/cinematic.css` | Hero layers re-indexed from negative to positive z-index; entrance animations no longer start at `opacity:0`; 60px drop-shadow removed from the LCP element; infinite blur animation made compositor-only opacity; `backdrop-filter` disabled on touch devices |
| `components/SentryLazyInit.tsx` | **New.** Loads the Sentry browser SDK on first interaction (60s backstop) instead of in the critical bundle |
| `instrumentation-client.ts` | Client Sentry init removed (moved to the above); `onRouterTransitionStart` export dropped |
| `app/layout.tsx` | Mounts `SentryLazyInit`; GTM + Simple Analytics + knocket moved to `lazyOnload` |
| `components/revamp/CipherChat.tsx` | Vapi widget script deferred from mount to `requestIdleCallback` |
| `app/page.tsx` | Explicit `fetchPriority="high"` on the hero image |
| `app/icon.png` | 165KB → 56KB 512×512 PNG |
| `__tests__/sentry-privacy.test.ts` | Guard repointed at `components/SentryLazyInit.tsx` |

**Root cause of the bad LCP:** the hero background sat at `z-index: -4` inside an `isolation: isolate` container. Chrome does not treat negative-z-index layers as LCP candidates, so Lighthouse was scoring a decorative watermark instead of the hero. Second cause: entrance animations started at `opacity: 0` with a 2.25s cumulative stagger, which gated the hero's paint — measured LCP render delay was **2321ms**, matching that stagger almost exactly.

### 2. Checks performed and actual results

| Check | Result |
|---|---|
| `tsc --noEmit` | exit 0 |
| `vitest run` | 21 files, **202/202 passed** |
| `next build` | exit 0, all routes |
| Lighthouse desktop | **97, 98** (from 92) |
| Lighthouse mobile | **66, 72, 66, 58** → ~66 (from 62). **Not >90.** |
| LCP element after fix | `img.cinematic-hero-art` (was `img.cinematic-hero-mark`) |
| LCP render delay | 2321ms → ~900ms |
| Sentry chunk in initial HTML | absent; confirmed never fetched during the Lighthouse trace |
| Privacy guard bites | Flipping `cookies: false`→`true` in the new file fails `sentry-privacy.test.ts` (verified deliberately) |
| `git diff main...HEAD` secret scan | No new secrets. The Sentry DSN is a **relocation** of the string already on `main`; a DSN is public by design (see §3 #10) |

**Measurement caveat — earlier numbers in this session are unreliable.** 35 leaked Chrome processes accumulated (~4GB RAM), and mobile TBT climbed monotonically 374→558→680→794ms across consecutive runs. After killing them, runs were repeated 3–4× per configuration. Treat mobile as **~66 ±7**; do not read the exact value.

**Three things I got wrong and corrected mid-session:**
1. I moved the watermark to a CSS `background-image` believing it would remove it from LCP candidacy. It did not — CSS backgrounds *are* LCP candidates, and a background can only be discovered *after* the render-blocking CSS parses, so it lengthened the critical path. Reverted to `<img>`.
2. `experimental.inlineCss` was tried and **reverted**: it scored worse (56/62/62 vs 65/66/64) because parsing 135KB of inline CSS raised TBT, and it bloats every route's HTML with no caching.
3. `vercel.json` was deleted by an overly broad `Remove-Item v*.json` cleanup glob, restored via `git checkout`. Flagged because it shows cleanup globs are unsafe in this repo (several `*.json` files live at root).

### 3. Remaining problems

| # | Problem | Next step |
|---|---|---|
| 1 | **Mobile is ~66, not >90.** Remaining cost is ~650ms render-blocking CSS (two global stylesheets, 27KB gzipped, imported from the root layout) and ~2s of hydration on the document. | Critical-CSS delivery + reducing client component count. See §4. |
| 2 | **Sentry no longer reports early errors.** Errors thrown in the first moments after load are not captured (init waits for first interaction or 60s). | Owner decision — see §5. |
| 3 | **19–20 console errors on the homepage** were observed via Playwright during this work and **not diagnosed**. | Investigate before deploy; may be a real bug. |
| 4 | The hero watermark glow (60px drop-shadow) was removed rather than moved to a pseudo-element. Visual change. | Owner taste call. |
| 5 | The Speed Insights field score is a **28-day rolling window**; it will not reflect these fixes for ~4 weeks after deploy. | None — expected. |
| 6 | `onRouterTransitionStart` export removed with the Sentry client init. Route-transition spans are no longer sent. | Accepted alongside #2. |

### 4. Next concrete action

1. **Diagnose the 19–20 homepage console errors** — cheap, and possibly a real bug.
2. **Reduce hydration on the homepage.** ~2s of document JS execution is the single largest untouched cost. The homepage ships four client components (`RevenueCalculator`, `CipherChat`, `RevampNavbar`, `SentryLazyInit`); converting `RevenueCalculator` to a server component with a small client island is the natural start and has no visual cost.
3. Only then consider critical-CSS delivery for render-blocking CSS (problem #1). Note that full `inlineCss` was already tried and made things worse — this needs selective above-the-fold inlining, not a global switch.

### 5. Decisions and corrections

**Decisions**
- **Sentry client SDK is lazy-loaded, not removed.** Approved by the owner after being shown the measured cost. Loaded on first interaction with a 60s backstop so bounce traffic never pays for it. Reversible by deleting `components/SentryLazyInit.tsx` and restoring `Sentry.init()` in `instrumentation-client.ts`.
- **The privacy guard was repointed, not relaxed.** `sentry-privacy.test.ts` still asserts all five `dataCollection` opt-outs; only the file under test changed. Deliberately verified by breaking the new file and confirming the test fails.
- **Decorative effects were removed rather than optimised** on the LCP element (drop-shadow, infinite blur). Rationale: filters on an LCP candidate must be rasterised before paint counts.
- **Work was pushed to a branch and PR'd, not to `main`.** PR #28; the owner merges.

**Corrections to my own earlier reasoning this session**
1. Believed negative-z-index layers were invisible — they are painted; Chrome simply will not score them as LCP. The visual site was never broken, only the metric.
2. Believed a CSS `background-image` would remove the watermark from LCP candidacy — it does not, and it serialised image discovery behind the render-blocking CSS.
3. Believed a single Lighthouse run was a reliable measurement — it is not on this machine. All conclusions above come from 3–4 repeated runs after cleaning leaked processes.
4. Reported mobile "75, 75, 75" at one point against a stale server; that number did not survive a clean restart.

---

## 6. 2026-10-14 — design-system completion + SSRF hardening (local branch, not yet PR'd)

Scope decided with the owner: full upgrade pass — dependencies, UI/design-system completion, and the remaining in-repo audit fixes (God Mode §"P0/Phase 1–2" + PROJECT-RECORD §3 items that are code-side).

**Changes:**

1. **Design-system coverage completed.** A class-coverage scan (className tokens referenced by components vs. CSS selectors) found 8 real gaps left after the rebuild; all are now styled:
   - `app/globals.css` — `.btn-secondary` (thank-you page; mirrors `.ui-btn--secondary`) and `.reveal`/`.reveal-visible` (the Reveal scroll-animation component had **no CSS at all** — it was a silent no-op; now a 24px fade/slide, gated on `html.js` so non-JS clients always see content, with a `prefers-reduced-motion` override).
   - `app/layout.tsx` — inline script adding `js` to `<html>` before content parses (pairs with the `.reveal` gating; no flash, no hidden content without JS).
   - `components/ui/ui.css` — `.ui-stat` base class (children existed, container didn't).
   - `app/cinematic.css` — `.breadcrumb-sep` (pricing breadcrumb separator) and `.cinematic-home` (homepage `<main>` overflow guard).
   - `app/revamp.css` — `.section-title`/`.section-sub` (thank-you page heading pair).
   - Scan now reports **0 uncovered tokens** (previous run: 407 tokens, 8 uncovered).
2. **New CI guard:** `__tests__/css-coverage.test.ts` — fails the suite if any className token referenced by a component has no CSS selector (God Mode audit, Phase 2: "Fail CI if a page uses an unrecognized design-system class"). Extraction covers plain strings, ternary branches (`cond ? "cls-a" : "cls-b"`), and template-literal static parts; ternary comparison literals (e.g. `cat === "all"`) are deliberately excluded.
3. **SSRF via redirect closed** (PROJECT-RECORD §3 #5): `lib/audit/run-audit.ts` HTML fetch now follows redirects manually (`redirect: "manual"`) and validates **every hop** with `assertUrlSafeForServerFetch` (≤4 hops, 15s timeout). A public site can no longer 302 the server at `169.254.169.254` or a LAN host. Regression tests added in `__tests__/run-audit.test.ts` (redirect-to-private-host is never fetched; public→public redirects still work).
4. **Unverifiable "661+" portfolio stat replaced** (§3 #7): now `661 · Bakersfield Home Area Code` — a fact checkable against the published phone number, not an invented reach metric.
5. **404 recovery links** (God Mode audit): `app/not-found.tsx` now offers Go Home / Services / Work / Pricing / Call — the "hasn't built it yet" personality line stays.
6. **WebSite `SearchAction` removed from schema** (`lib/schema.ts`): `/?s=` was advertised in JSON-LD but no site search exists (God Mode SEO fix #2).

**Checked while scoping (no change needed):** FAQ accordion already SSR + `aria-expanded`/`aria-controls` (rebuild fixed the old client-gated FAQ); `LegalShell`/`MarketingLayout`/`PricingShell` all render `<main id="main-content">` (landmark finding was pre-rebuild); homepage is already a server component; `serviceJsonLd` already takes an optional price (the "$1,997 everywhere" schema issue was fixed in the rebuild); no three-column mobile conversion bar remains in the tree.

**Not done (owner decisions, unchanged):** Vercel env vars/domains (§3 #2–#4), privacy-page copy vs. remaining trackers (§8), Sentry DSN-to-env (#10), hero watermark opacity (#11), city-page unique content and photography (Phase 3/4 work).

**Validation (2026-10-14, this branch):**

| Check | Result |
|---|---|
| `tsc --noEmit` | exit 0 |
| `vitest run` | 21 files, **202/202 passed** (199 before: +2 SSRF-redirect tests, +1 css-coverage guard) |
| `next build` | exit 0 — all 34 routes, TypeScript clean |
| Dependency set | unchanged from #12–#21 (Next 16.4.0, React 19.3.0, zod 4.6.5, @sentry/nextjs 11.6.0); no lockfile edits |

**Install note (this machine):** this sandbox's egress stalls large registry downloads (`EIDLETIMEOUT` on `npm ci`). Fixed locally by curl-resuming the two uncached tarballs (`next@16.4.0`, `@next/swc-win32-x64-msvc@16.4.0`) into `npm cache add`, then `npm ci --offline`; the SWC binary was additionally extracted into `node_modules\@next\swc-win32-x64-msvc` (silently skipped as an optional dep offline). If `node_modules` ever needs a clean rebuild on a network-healthy machine, plain `npm ci` works.
