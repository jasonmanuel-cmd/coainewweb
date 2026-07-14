# GEO Technical SEO Audit — coaibakersfield.com
Date: 2026-07-14

## Technical Score: 73/100

## Score Breakdown
| Category | Score | Status |
|---|---|---|
| Crawlability | 8/15 | Warn |
| Indexability | 5/12 | Fail |
| Security | 10/10 | Pass |
| URL Structure | 6/8 | Pass |
| Mobile Optimization | 10/10 | Pass |
| Core Web Vitals | 10/15 | Warn |
| Server-Side Rendering | 12/15 | Warn |
| Page Speed & Server | 12/15 | Warn |

Status: Pass = 80%+ of category points, Warn = 50-79%, Fail = <50%

## AI Crawler Access
| Crawler | User-Agent | Status | Recommendation |
|---|---|---|---|
| GPTBot | GPTBot | Allowed | — |
| OAI-SearchBot | OAI-SearchBot | Allowed | — |
| ChatGPT-User | ChatGPT-User | Allowed | — |
| Googlebot | Googlebot | Allowed (via wildcard) | — |
| Google-Extended | Google-Extended | Allowed | — |
| ClaudeBot | ClaudeBot | Allowed | — |
| PerplexityBot | PerplexityBot | Allowed | — |
| Bingbot | bingbot | Allowed (via wildcard) | Add explicit rule |
| CCBot | CCBot | Allowed (via wildcard) | Add explicit rule |
| Amazonbot | Amazonbot | Allowed (via wildcard) | Add explicit rule |
| Applebot-Extended | Applebot-Extended | Not specified | Add explicit rule |
| Bytespider | Bytespider | Allowed (via wildcard) | Add explicit rule |
| FacebookExternalHit | FacebookExternalHit | Allowed (via wildcard) | Add explicit rule |

## Critical Issues (fix immediately)

### 1. 301 Redirects Destroy 7+ Pages of Content (Indexability + SSR)
**Severity:** Critical
**Location:** `next.config.ts` lines 53–59
**Problem:** Seven routes — `/services`, `/portfolio`, `/about`, `/faq`, `/contact`, `/website-design`, `/website-design/*` — all 301 redirect to `/`. These pages have fully built server components with unique metadata, JSON-LD schemas, and content, but the redirects fire first so none of it is ever served.
**Impact on GEO:** AI crawlers cannot access unique content on these URLs. The sitemap lists 5 of these as indexable pages (about, faq, contact, website-design/bakersfield, website-design/kern-county) but they redirect, wasting crawl budget.
**Fix:** Remove the redirects in `next.config.ts` so these pages serve their actual content. If a unified marketing page is desired, merge the content into the homepage and 301 only after content migration.

### 2. www vs. Non-www Duplicate Content
**Severity:** Critical
**Location:** DNS/domain config
**Problem:** Both `https://www.coaibakersfield.com/` and `https://coaibakersfield.com/` serve identical content. Neither redirects to the other.
**Impact on GEO:** Search engines and AI crawlers treat these as two separate sites, splitting authority signals, diluting backlinks, and creating duplicate content. The sitemap in robots.txt points to non-www (`https://coaibakersfield.com/sitemap.xml`) while the live site canonical is www.
**Fix:** Choose a preferred domain (recommend www) and 301 redirect non-www → www at the DNS/Vercel level. Update `NEXT_PUBLIC_SITE_URL` to match the chosen canonical.

### 3. Sitemap Contains Redirecting URLs
**Severity:** High
**Location:** Generated sitemap.xml
**Problem:** 5 of 15 sitemap URLs 301 redirect to `/`: `/about`, `/faq`, `/contact`, `/website-design/delano`, `/website-design/shafter`. These waste crawl budget and tell search engines the sitemap is unreliable.
**Fix:** Remove redirecting URLs from the sitemap. Only include pages that serve unique 200-status content. Use a dynamic sitemap generator that checks route accessibility.

## Warnings (fix this month)

### 4. Missing Explicit AI Crawler Rules for 7 Crawlers
**Severity:** Medium
**Location:** `app/robots.ts`
**Problem:** The robots.txt explicitly allows only 6 AI crawlers (GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, PerplexityBot, Google-Extended). Bingbot, CCBot, Amazonbot, Applebot-Extended, Bytespider, and FacebookExternalHit fall through to the wildcard `User-Agent: *` rule (which is permissive), but explicit rules are stronger signals and protect against default-block policies on some crawlers.
**Impact on GEO:** Bingbot drives Bing Copilot and ChatGPT's Bing integration. Applebot-Extended powers Apple Intelligence. Missing explicit allow rules risks these crawlers being blocked if a future policy change affects the wildcard.
**Fix:** Add explicit `Allow: /` rules for Bingbot, CCBot, Amazonbot, Applebot-Extended, Bytespider, and FacebookExternalHit in `app/robots.ts`.

### 5. Sitemap lastmod Dates Are Stale / Bulk Default
**Severity:** Medium
**Location:** Sitemap.xml
**Problem:** Most pages show `2026-04-01` as lastmod. Only `/` and `/intake` show `2026-05-01`. The dates don't reflect actual content updates.
**Impact on GEO:** Search engines use lastmod to prioritize re-crawling. Stale dates signal "no new content" and reduce crawl frequency for AI index inclusion.
**Fix:** Implement a dynamic sitemap that checks actual file modification dates or contentful update timestamps, rather than hardcoded lastmod values.

### 6. Phone Number Still Inconsistent in Header
**Severity:** Medium
**Location:** Raw HTML response shows `(661) 659-1376` in header text but `(661) 331-1767` in link text on some pages
**Problem:** The server-rendered HTML still contains the old number in one format. The header displays two different numbers depending on where you look.
**Fix:** Run a full grep for both `659-1376` and `331-1767` to ensure all components reference the same canonical number. Verify `lib/site.ts` CONTACT object is the single source of truth.

## Recommendations (optimize this quarter)

### 7. Core Web Vitals — LCP Optimization
**Severity:** Low-Medium
**Location:** Homepage hero section
**Problem:** The homepage loads multiple components (NeuralMesh, Scene3DLoader, CipherChat, Google Analytics, Clarity, Sentry) that increase TTFB and LCP. Hero images/text may take >2.5s to render if these scripts block.
**Impact on GEO:** Poor LCP reduces Google ranking signal. AI Overviews are less likely to cite pages with poor loading performance.
**Fix:** Preload critical hero assets. Defer non-critical third-party scripts. Consider static generation for the homepage if content doesn't change per-request.

### 8. IndexNow Not Implemented
**Severity:** Low
**Problem:** No IndexNow key file found at `/.well-known/` path. No IndexNow implementation detected.
**Impact on GEO:** Bing (which powers Bing Copilot and ChatGPT's real-time search) uses IndexNow for instant re-crawl notifications. Without it, new/updated content can take days to appear in Bing's index and thus in Copilot responses.
**Fix:** Generate an IndexNow API key, create `/.well-known/` endpoint, and configure the app to ping IndexNow on content updates.

### 9. Markdown Content Negotiation (Forward-Looking)
**Severity:** Informational
**Problem:** The site does not serve Markdown when AI agents request `Accept: text/markdown`. This is a cutting-edge feature, not yet standard.
**Recommendation:** If deploying on Cloudflare, consider enabling their Markdown for Agents feature. For Vercel, monitor for native support. This will become more important as AI crawler traffic grows.

### 10. Breadcrumb Schema on Inner Pages
**Severity:** Low
**Problem:** The homepage has BreadcrumbList schema, and pricing/contact/intake have it, but most redirecting pages never serve their schemas. Once redirects are removed, verify every page has at minimum: BreadcrumbList + the relevant page-type schema (AboutPage, ContactPage, FAQPage, etc.).

## Detailed Findings

### Category 1: Crawlability (8/15)

| Check | Score | Notes |
|---|---|---|
| robots.txt valid and complete | 2/3 | Valid syntax, but missing explicit allow for Bingbot, CCBot, Applebot-Extended, Amazonbot, Bytespider, FacebookExternalHit. Sitemap URL uses non-www while canonical is www. |
| AI crawlers allowed | 4/5 | 6 major AI crawlers explicitly allowed. Bingbot (Copilot/ChatGPT) only via wildcard — should be explicit. |
| XML sitemap present and valid | 1/3 | Valid XML, 15 URLs. But 5 URLs (33%) 301 redirect. lastmod dates are stale (all 2026-04-01). |
| Crawl depth within 3 clicks | 1/2 | Homepage links directly to pricing/intake. But inner pages redirect to / — not crawlable. |
| No erroneous noindex directives | 0/2 | Cannot verify — redirecting pages can't be checked for noindex. Those page.tsx files don't set noindex, but the redirect itself prevents indexing. |

### Category 2: Indexability (5/12)

| Check | Score | Notes |
|---|---|---|
| Canonical tags correct | 1/3 | Homepage ✓ (via alternates.canonical). Pricing ✓ (via pageMetadata). Inner pages redirect — no canonical served. |
| No duplicate content | 0/3 | **CRITICAL:** www and non-www both serve content, no redirect. 7+ pages redirect to homepage creating mass duplicate content. |
| Pagination handled | 2/2 | No paginated content. N/A. |
| Hreflang correct | 2/2 | Single-language site (English). N/A. |
| No index bloat | 0/2 | 15 URLs in sitemap but only 3-4 serve unique 200 content. Sitemap:index ratio is poor. |

### Category 3: Security (10/10)

| Check | Score | Notes |
|---|---|---|
| HTTPS enforced | 4/4 | Valid SSL via Vercel. HTTP→HTTPS enforced by default. |
| HSTS header | 2/2 | `max-age=63072000; includeSubDomains; preload` ✓ |
| X-Content-Type-Options | 1/1 | `nosniff` ✓ |
| X-Frame-Options | 1/1 | `SAMEORIGIN` ✓ |
| Referrer-Policy | 1/1 | `strict-origin-when-cross-origin` ✓ |
| Content-Security-Policy | 1/1 | Static CSP configured, no nonce (intentional for CDN caching) ✓ |

### Category 4: URL Structure (6/8)

| Check | Score | Notes |
|---|---|---|
| Clean, readable URLs | 2/2 | `/pricing`, `/intake`, `/faq`, `/about`, `/contact` — all clean, lowercase, hyphen-separated ✓ |
| Logical hierarchy | 2/2 | `/website-design/bakersfield` follows logical path structure ✓ |
| No redirect chains | 2/2 | All redirects are single-hop 301 → / ✓ |
| Parameter handling | 0/2 | Non-www vs www is a missing redirect, effectively a parameter handling failure. |

### Category 5: Mobile Optimization (10/10)

| Check | Score | Notes |
|---|---|---|
| Viewport meta tag | 3/3 | Next.js responsive meta tag present ✓ |
| Responsive layout | 3/3 | Tailwind responsive grid, mobile nav, no fixed widths ✓ |
| Tap targets sized | 2/2 | Navigation and CTAs use appropriate touch targets ✓ |
| Font sizes legible | 2/2 | 16px+ base font, sufficient contrast ✓ |

### Category 6: Core Web Vitals (10/15 — Estimated)

| Check | Score | Notes |
|---|---|---|
| LCP < 2.5s | 3/5 | **Estimated.** Multiple scripts (NeuralMesh, Scene3D, GA, Clarity, Sentry) may push LCP >2.5s. Verify with CrUX data. |
| INP < 200ms | 4/5 | **Estimated.** Minimal client JS. Only third-party tags (GA, Clarity) are potential blockers. Likely within threshold. |
| CLS < 0.1 | 3/5 | **Estimated.** Font-display: swap configured ✓. Images should have explicit dimensions. Verify with field data. |

### Category 7: Server-Side Rendering (12/15)

| Check | Score | Notes |
|---|---|---|
| Main content in raw HTML | 6/8 | Homepage ✓, Pricing ✓ — full content visible in curl output. All content is Next.js server-rendered. |
| Meta tags + JSON-LD in raw HTML | 4/4 | Homepage has all JSON-LD in HTML. Pricing has breadcrumb + service + article. |
| Internal links in raw HTML | 2/3 | Nav links present. But redirecting pages never serve their links or content. |

**Key finding:** Next.js App Router provides excellent SSR — raw HTML contains all content, meta tags, and JSON-LD. The redirects are the only thing preventing these pages from scoring 15/15.

### Category 8: Page Speed & Server Performance (12/15)

| Check | Score | Notes |
|---|---|---|
| TTFB < 800ms | 2/3 | Vercel Edge — likely <200ms TTFB for cached pages, but dynamic SSR may be higher |
| Page weight < 2MB | 2/2 | Next.js with code splitting keeps bundle small |
| Images optimized | 3/3 | AVIF/WebP formats ✓, next/image for optimization ✓ |
| JS bundles reasonable | 1/2 | Sentry + GA + Clarity + NeuralMesh + Scene3D + CipherChat adds overhead. Estimate ~200-400KB compressed |
| Compression enabled | 2/2 | Vercel handles brotli/gzip automatically ✓ |
| Cache headers on static | 2/2 | Vercel CDN cache with content-hashed filenames ✓ |
| CDN in use | 1/1 | Vercel Edge Network (global) ✓ |

## Agent-Readiness Signals (non-scoring)

### RFC 8288 Link Headers (Service Discovery)
**Status:** Not Present — Not Applicable
This is a standard business site with no public API catalog or MCP server. Absence of Link: headers is expected and not noteworthy.

### Markdown Content Negotiation
**Status:** Not Supported
**Test:** GET / with `Accept: text/markdown`
**Forward-Looking Recommendation:** This site is deployed on Vercel, which does not yet support automatic Markdown content negotiation. As AI agent traffic grows, serving clean Markdown to AI crawlers improves content extraction accuracy. Consider monitoring Vercel's feature roadmap or adding a custom middleware that responds with Markdown when the Accept header requests it.

## Appendix: Page Inventory

| URL | Status | Content | JSON-LD | In Sitemap |
|---|---|---|---|---|
| / | 200 ✓ | Homepage | Org, Website, Article, FAQPage, BreadcrumbList, Service, Product | ✓ |
| /pricing | 200 ✓ | Pricing | BreadcrumbList, Service, Article | ✓ |
| /intake | 200 ✓ | Intake form | — | ✓ |
| /intake/confirmation | 200 ✓ | Confirmation | — | ✗ |
| /privacy | 200 ✓ | Privacy policy | — | ✓ |
| /terms | 200 ✓ | Terms | — | ✓ |
| /faq | 301 → / | **Not served** | **Not served** | ✓ |
| /about | 301 → / | **Not served** | **Not served** | ✓ |
| /contact | 301 → / | **Not served** | **Not served** | ✓ |
| /services | 301 → / | **Not served** | **Not served** | ✓ |
| /portfolio | 301 → / | **Not served** | **Not served** | ✓ |
| /website-design | 301 → / | **Not served** | **Not served** | ✓ |
| /website-design/bakersfield | 301 → / | **Not served** | **Not served** | ✓ |
| /website-design/kern-county | 301 → / | **Not served** | **Not served** | ✓ |
| /website-design/delano | 301 → / | **Not served** | **Not served** | ✓ |
| /website-design/shafter | 301 → / | **Not served** | **Not served** | ✓ |
| /home | Disallowed | Robot-restricted | — | ✗ |

**Total 200-status pages:** 6 (/, /pricing, /intake, /intake/confirmation, /privacy, /terms)
**Total redirecting pages in sitemap:** 5
**Sitemap accuracy:** 67% (10 of 15 URLs serve unique 200 content)
