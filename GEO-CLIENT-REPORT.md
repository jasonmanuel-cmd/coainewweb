# GEO Client Report — Chaotically Organized AI (coaibakersfield.com)

**Date:** 2026-07-14
**Business type:** Local service / agency — AI lead systems for Bakersfield trades
**Stack:** Next.js (SSR) on Vercel • 14 pages analyzed • 5 schema types detected
**Prepared for:** Jason Robert Manuel, Founder

---

## Executive Summary

Chaotically Organized AI serves a clear, defensible niche—AI lead systems for Bakersfield trades—with a technically well-built site (Next.js SSR, comprehensive JSON-LD, named founder, clean mobile experience). The composite GEO Readiness Score of **60/100 (Moderate)** reflects a site that *renders well for AI crawlers* but is held back by two structural gaps: a near-zero off-site brand footprint that gives AI platforms no cross-referencing authority signals, and stale schema data that still quotes the old three-package pricing after the TradeCall System consolidation. Addressing these gaps is primarily a content-and-presence investment, not a rebuild. The highest-leverage actions—creating a verified Google Business Profile with reviews, standing up a LinkedIn company page, fixing the `priceRange` and `llms.txt` staleness, and adding a self-referencing canonical—can be completed within days and could move the GEO score from 60 to an estimated 72, placing the site firmly in the "Good" tier.

---

## GEO Readiness Score: 60/100 — Moderate

| Component | Score | Weight | Weighted Score |
|---|---|---|---|
| AI Platform Readiness | 64/100 | 25% | 16.0 |
| Content Quality & E-E-A-T | 53/100 | 25% | 13.3 |
| Technical Foundation | 78/100 | 20% | 15.6 |
| Schema & Structured Data | 63/100 | 15% | 9.5 |
| Brand Authority | 35/100 | 15% | 5.3 |
| **Overall** | | | **60/100** |

### Score Interpretation

| Range | Label | Current Status |
|---|---|---|
| 85-100 | Excellent | — |
| 70-84 | Good | **Target** — achievable with 1-2 weeks of focused work |
| **55-69** | **Moderate ←** | **You are here** |
| 40-54 | Below Average | — |
| 0-39 | Needs Attention | — |

Your site has a solid technical foundation but is invisible to AI citation engines off-site. The score sits at "Moderate" because the on-site signals (schema, SSR, clean URLs) are strong enough to keep the floor from dropping, but the ceiling is capped by weak brand authority scores.

---

## AI Visibility Dashboard

| AI Platform | Readiness Score | Key Gap | Priority Action |
|---|---|---|---|
| Google AI Overviews | 78/100 | Missing explicit canonical link | Add self-referencing `<link rel="canonical">` to every page |
| ChatGPT Web Search | 66/100 | FAQ answers client-side rendered | Server-render FAQ `<dd>` text; currently hidden behind `{isOpen && ...}` |
| Google Gemini | 61/100 | No YouTube presence | Publish 2-3 short explainers ("What is the TradeCall System?") |
| Bing Copilot | 60/100 | No IndexNow, no `msvalidate.01` | Register Bing Webmaster Tools, implement IndexNow |
| Perplexity AI | 52/100 | Weakest—no community signals, FAQ invisible | Fix FAQ rendering + seed local-subreddit participation |

These scores reflect how likely your content is to be cited by each AI search platform. A score below 50 indicates significant barriers to citation on that platform. The FAQPage JSON-LD partially compensates for Perplexity, but the client-side rendering of FAQ answers remains a concrete extraction gap.

---

## AI Crawler Access Status

| AI Crawler | Platform | Status | Impact | Recommendation |
|---|---|---|---|---|
| Googlebot | Google Search + AIO | Allowed | Critical | Already allowed—maintain |
| GPTBot | ChatGPT / OpenAI | Allowed | High | Already allowed—maintain |
| OAI-SearchBot | ChatGPT Search | Allowed | High | Already allowed—maintain |
| ChatGPT-User | ChatGPT (browsing) | Allowed | High | Already allowed—maintain |
| ClaudeBot | Anthropic Claude | Allowed | Medium | Already allowed—maintain |
| PerplexityBot | Perplexity AI | Allowed | Medium | Already allowed—maintain |
| Google-Extended | Gemini Training | Allowed | Medium | Already allowed—maintain |
| Bingbot | Bing + Copilot | Allowed | High | Already allowed—maintain |
| Applebot-Extended | Apple Intelligence | Not explicitly allowed | Low | Add to robots.ts if desired |

**Status: Good.** Your `app/robots.ts` affirmatively allows all major AI crawlers with `Allow: /` and only blocks `/home`, `/sentry-example-page`, and `/api/`. This is better practice than relying on the wildcard alone. No changes needed here.

---

## Brand Authority Analysis

| Platform | Presence | Status | Impact on AI Visibility |
|---|---|---|---|
| LinkedIn | Listed in `sameAs` | URL exists but no evidence of active company page with followers/citations | High — Bing Copilot and ChatGPT signal |
| Wikipedia | Not present | No entry | Very High — 47.9% of ChatGPT citations reference Wikipedia |
| Google Knowledge Panel | Not detected | No Knowledge Panel found in search | High — Gemini entity recognition |
| YouTube | Not present | 0 videos detected | High — Gemini and Perplexity signal |
| Reddit | Not present | 0 mentions found | Very High — 46.7% of Perplexity citations reference Reddit |
| Google Business Profile | Linked in `sameAs` | Profile exists but no reviews surfaced in crawl | High — local entity validation |
| Facebook | Listed in `sameAs` | Page created ~Dec 2025, limited engagement | Low-Medium — minimal AI citation weight |
| X/Twitter | Listed in `sameAs` | Account exists (@COAIBakersfield) | Medium — tech brand signal |
| GitHub | Not detected | No repositories or org found | Medium — tech brand signal |

**Impact:** AI platforms build trust by cross-referencing your brand across multiple authoritative sources. Each platform where your brand has an accurate, consistent presence increases citation probability. COAI's near-zero off-site footprint is the single largest drag on the GEO score. A Wikipedia page is unlikely (local agency), but LinkedIn, YouTube, and Reddit are all achievable within weeks.

---

## Citability Analysis

### Top Citable Pages

| Page | Why It Is Citable | Improvement |
|---|---|---|
| `/` (Homepage) | Strong intro, named founder, fixed price point, clear target audience | Add 1-2 proprietary statistics (e.g., missed-call recovery rate for trades) |
| `/pricing` | Single clear offer ($1,997), process breakdown, fixed scope | Add a spec table or comparison (COAI vs DIY vs agency) with hard numbers |
| `/intake` | Direct CTA, low friction | Add a Q&A section with common pre-sale questions |
| `/services` | Service descriptions, TradeCall System overview | Convert top H2s to question-based headings for AI answer extraction |
| `/website-design/bakersfield` | Geo-targeted, local schema, city-specific | Add one real case study with named client and lift numbers |

### Least Citable Pages

| Page | Why Unlikely to Be Cited | Recommendation |
|---|---|---|
| `/website-design/delano` | Thin content — serves same template as Bakersfield with city swapped | Add city-specific content (local landmarks, trade stats, unique challenges) |
| `/website-design/shafter` | Same thin template issue | Same—differentiate with local context |
| `/website-design/kern-county` | Better than the sub-city pages but still generic | Add county-specific data (population, trade density, local economy context) |
| `/faq` | Questions visible, answers gated behind JS click | Server-render all answer text; use CSS `max-height` for visual collapse |
| `/portfolio` | No client case studies with named results | Add 2-3 real case studies with measurable outcomes |

Your most citable pages are your best candidates for appearing in AI-generated answers. Improving the service area pages and fixing the FAQ rendering represents the highest-ROI content investment for AI visibility.

---

## Technical Health Summary

| Area | Status | Business Impact |
|---|---|---|
| Server-Side Rendering | **Good** — Next.js SSR | AI crawlers see full HTML immediately. This is a major advantage over client-rendered sites. |
| Core Web Vitals | Presumed **Good** (Vercel + SSR + optimized fonts) | Google uses CWV as a ranking signal; AI platforms are likely to follow. |
| Mobile Optimization | **Good** — responsive design | Mobile-first indexing requirement met. |
| Security (HTTPS + Headers) | **Needs Work** — missing HSTS, CSP, X-Frame-Options | Limited impact on AI visibility, but affects trust signals. |
| Page Speed | **Fast** — Next.js on Vercel edge | Good crawl budget efficiency. |
| IndexNow Protocol | **Not implemented** | Bing/Copilot indexing speed is slower than necessary. |
| Canonical URLs | **Missing** — no `<link rel="canonical">` on any page | **This is a P1 technical gap.** Every authority signal should self-reference. |
| `og:url` | **Good** — uses `SITE_URL` = `https://coaibakersfield.com` | Consistent with metadataBase. |

**Critical finding:** While `metadataBase` and `og:url` are correctly set to `coaibakersfield.com`, there is no explicit `<link rel="canonical">` tag in the HTML head. Next.js's built-in `metadataBase` handles this at the metadata level, but explicit canonicals per page are best practice for AI crawler certainty.

---

## Schema & Structured Data

### Current Implementation

| Schema Type | Present | Status | AI Impact |
|---|---|---|---|
| Organization + LocalBusiness | Yes | **Stale priceRange** — shows "$1,200-$2,000+" instead of TradeCall System $1,997 | High — incorrect pricing confuses entity understanding |
| Person (Founder) | Yes | Valid — Jason Robert Manuel, worksFor COAI | High — E-E-A-T signal |
| WebSite + SearchAction | Yes | Valid | Medium — sitelinks |
| Article | Yes | Valid with author + dates | High — content credibility |
| FAQPage | Yes | Questions and answers in JSON-LD | High — powers AIO featured snippets |
| AggregateRating | Yes | 5.0 rating, 5 reviews — **self-serving risk** | High — verify reviews match GBP |
| Review | Yes | 5 named client reviews | Medium — same self-serving risk |
| BreadcrumbList | **Available** in `schema.ts` but **not deployed** on pages | Low — navigation context |
| Service | **Available** in `schema.ts` but **not deployed** on homepage | Medium — service categorization |
| sameAs | Yes | Links to LinkedIn, X, Facebook, GBP | Critical — cross-platform entity graph |

### Issues Found

1. **`priceRange: "$1,200-$2,000+"`** — This is stale after the TradeCall System consolidation. Should be `"$1,997"` (single fixed price). File: `lib/schema.ts:80`.

2. **Service schema has old prices** — `serviceJsonLd()` in `lib/schema.ts:133-134` still references `minPrice: 1200, maxPrice: 2000`.

3. **Self-serving reviews risk** — `AggregateRating` and `Review` markup on the business's own site violates Google's guidelines unless the reviews are independently verifiable. Google may issue a manual structured data action. Recommended: sync review count with Google Business Profile review count, and ensure all reviews are visible on-page.

4. **`Review` microdata in `organizationJsonLd`** — Each review is marked up inline with a `Rating` of 5. If these don't match real, independently-posted reviews, this is a policy violation.

5. **`BreadcrumbList` not deployed** — The function exists in `lib/schema.ts` (line 93) but is not called from any page layout. Breadcrumb schema helps AI crawlers understand site structure.

6. **`Service` schema not deployed on homepage** — The `serviceJsonLd()` function exists but is not used on the root layout.

---

## llms.txt Status

| File | Status | Recommendation |
|---|---|---|
| `/llms.txt` | **Present but stale** | References "Signal Foundation ($1,200)" and "Sentinel Automation ($2,000+)" — both discontinued. Must be updated to reflect the single TradeCall System ($1,997). |
| `/llms-full.txt` | Not present | Optional — not critical for a site of this size. |

**Business impact:** llms.txt is an emerging standard that tells AI systems what your site is about and which pages are most important. A stale llms.txt is worse than none—it tells AI crawlers about services you no longer offer, creating entity confusion. Update this file this week.

---

## Prioritized Action Plan

### Quick Wins (This Week)
*High impact, low effort — can be implemented immediately, mostly in-repo*

| # | Action | Impact | Effort | Platforms Affected |
|---|---|---|---|---|
| 1 | Fix `priceRange` in `lib/schema.ts` from `"$1,200-$2,000+"` to `"$1,997"` | High | 5 min | All platforms |
| 2 | Update `public/llms.txt` — replace Signal Foundation/Sentinel Automation with TradeCall System | High | 10 min | ChatGPT, Gemini, Perplexity |
| 3 | Server-render FAQ answers — move answer text into HTML, use CSS `max-height` for collapse | High | 30 min | Perplexity, ChatGPT |
| 4 | Update `serviceJsonLd()` prices in `lib/schema.ts` to reflect single $1,997 TradeCall offer | Medium | 5 min | Google AIO, Gemini |
| 5 | Deploy `BreadcrumbList` schema on main pages (home, pricing, services, contact) | Medium | 1 hour | All platforms |
| 6 | Add self-referencing `<link rel="canonical">` to page-level metadata | High | 30 min | All platforms |

### Medium-Term Improvements (This Month)
*Significant impact, moderate effort — requires content or off-site work*

| # | Action | Impact | Effort | Platforms Affected |
|---|---|---|---|---|
| 7 | Create/verify LinkedIn company page with full profile, services, and link to site | Very High | 2 hours | Bing Copilot, ChatGPT |
| 8 | Claim Google Business Profile, add real client reviews (minimum 5) | Very High | 1 day | Google AIO, Gemini, Local Search |
| 9 | Register Bing Webmaster Tools and add `msvalidate.01` meta tag | Medium | 30 min | Bing Copilot |
| 10 | Add security headers (HSTS, CSP, X-Frame-Options) via `next.config.js` or Vercel `vercel.json` | Low | 1 hour | Minor trust signal |
| 11 | Publish 2-3 YouTube explainers ("What is the TradeCall System?", "AI phone answering for trades") | High | 1-2 days | Gemini, Perplexity, Google AIO |
| 12 | Convert top H2s to question/answer-target headings with 40-60 word lead answers | Medium | 2-3 hours | ChatGPT, Perplexity |

### Strategic Initiatives (This Quarter)
*Long-term competitive advantage, requires ongoing investment*

| # | Action | Impact | Effort | Platforms Affected |
|---|---|---|---|---|
| 13 | Build 2-3 detailed case studies with named clients and specific metrics (call volume increase, conversion rate lift) | High | 1-2 weeks | All platforms — E-E-A-T |
| 14 | Seed authentic Reddit participation in r/Bakersfield, r/smallbusiness, r/Contractor | High | Ongoing (2 hrs/week) | Perplexity (46.7% of citations are Reddit) |
| 15 | Fix service area pages (Delano, Shafter) to have unique content, not Bakersfield template | Medium | 1-2 days | Google AIO, local search |
| 16 | Eliminate self-serving review markup — sync review count with real GBP reviews | High | 1 day | Google (manual action risk) |
| 17 | Add `Organization`, `Service`, and `speakable` schema to homepage | Medium | 2 hours | All platforms |

---

## Estimated Impact

Based on industry benchmarks and the specific gaps identified in this audit:

| Phase | GEO Score Improvement | Timeline |
|---|---|---|
| Current | 60/100 | — |
| After Quick Wins (#1-6) | 60 → 68 | This week |
| After Medium-Term (#7-12) | 68 → 76 | This month |
| After Strategic (#13-17) | 76 → 82+ | This quarter |

**Revenue context:** COAI's TradeCall System is priced at $1,997. Each additional qualified lead from AI search represents a potential close. If improved AI visibility drives just 2-3 additional qualified inquiries per month (conservative for a niche local service), that represents $4,000-$6,000/month in potential pipeline at current close rates—directly attributable to appearing in AI-generated answers when Bakersfield trades ask "best website builder for contractors" or "AI phone answering for trades."

---

## Appendix

### Methodology

This GEO audit was conducted using the following methodology:
- **Pages analyzed**: `/`, `/pricing`, `/services`, `/faq`, `/about`, `/contact`, `/intake`, `/portfolio`, `/website-design/bakersfield`, `/website-design/delano`, `/website-design/shafter`, `/website-design/kern-county`, `/privacy`, `/terms`
- **Platforms assessed**: Google AI Overviews, ChatGPT Web Search, Perplexity AI, Google Gemini, Bing Copilot
- **Technical checks**: HTTP headers, robots.txt, HTML source analysis, structured data validation, SSR verification
- **Content assessment**: E-E-A-T framework (Experience, Expertise, Authoritativeness, Trustworthiness) per Google's Quality Rater Guidelines
- **Schema validation**: JSON-LD parsing and Schema.org specification compliance
- **Date of analysis**: 2026-07-14

### Data Sources

- Google Search Quality Rater Guidelines
- Schema.org full type hierarchy
- Industry citation studies (Zyppy, Authoritas, Semrush AI search research)
- Core Web Vitals thresholds (web.dev)
- AI crawler user-agent documentation (per-platform official docs)

### Glossary

| Term | Definition |
|---|---|
| GEO | Generative Engine Optimization — optimizing content to be cited by AI search platforms |
| AIO | AI Overviews — Google's AI-generated answer boxes at the top of search results |
| E-E-A-T | Experience, Expertise, Authoritativeness, Trustworthiness — Google's content quality framework |
| SSR | Server-Side Rendering — generating HTML on the server so crawlers can read content without JavaScript |
| CWV | Core Web Vitals — Google's page experience metrics (LCP, INP, CLS) |
| JSON-LD | JavaScript Object Notation for Linked Data — preferred structured data format |
| sameAs | Schema.org property linking an entity to its profiles on other platforms |
| IndexNow | Protocol for instantly notifying search engines of content changes |
| llms.txt | Proposed standard file for guiding AI systems about a site's content |
| GBP | Google Business Profile |
