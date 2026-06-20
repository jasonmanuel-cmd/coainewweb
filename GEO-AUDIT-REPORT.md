# GEO Audit Report — coaibakersfield.com

**Date:** 2026-06-19
**Business type:** Local service / agency (AI lead systems for Bakersfield trades)
**Stack:** Next.js on Vercel (SSR) · repo: `MASTER-COAI/COAI-WEBSITE`

---

## Composite GEO Score: **48 / 100** — Fair (fixable)

| Category | Weight | Score | Weighted |
|---|---|---|---|
| AI Citability & Visibility | 25% | 44 | 11.0 |
| Brand Authority Signals | 20% | 17 | 3.4 |
| Content Quality & E-E-A-T | 20% | 60 | 12.0 |
| Technical Foundations | 15% | 62 | 9.3 |
| Structured Data | 10% | 62 | 6.2 |
| Platform Optimization | 10% | 64 | 6.4 |
| **Total** | | | **≈48** |

**One-line read:** The *site* is well-built (strong schema, clean SSR, real comparison content). The score is dragged down by two things, not bad engineering: (1) a **split domain identity** that hands your authority to a different domain, and (2) a **near-zero off-site footprint** (no LinkedIn/Reddit/YouTube/GBP reviews). Both are fixable; neither requires a rebuild.

---

## The 3 issues that actually move the score

### 1. CRITICAL — Domain identity split
Page is served on **coaibakersfield.com**, but:
- No `<link rel="canonical">` anywhere
- `og:url` → **chaoticallyorganizedai.com**
- `robots.txt` sitemap → **chaoticallyorganizedai.com**

Every authority signal on the page points AI engines and Google at a *different* domain. Result: coaibakersfield.com does the work (SSR, schema) but the citation/ranking credit can flow to the other domain — or engines pick the wrong canonical themselves. **Decide which domain is primary, then make every signal agree.**

**Fix:** self-referencing canonical on every page, align `og:url`, publish a sitemap on *this* host, cross-link the sibling domain via schema `sameAs`. (Files: `app/sitemap.ts`, `lib/site.ts`, head metadata.)

### 2. CRITICAL — Brand authority is ~zero off-site (score 17/100)
AI engines disproportionately cite Reddit, YouTube, and LinkedIn. COAI has **no presence on any of them**. Only footprint found: a brand-new (~Dec 2025) Facebook page and one aggregator listing. No GBP reviews surfaced.

**Fix (highest leverage of the whole audit):** stand up a LinkedIn company page + a verified Google Business Profile with real reviews, then 2–3 short YouTube explainers and authentic local-subreddit participation. Wire all URLs into `SAME_AS` in `lib/site.ts`.

### 3. CRITICAL — FAQ answers are invisible to crawlers
`components/revamp/Faq.tsx` gates answers behind `{isOpen && ...}` in a `"use client"` component — so answer text is **not in the server HTML**. Perplexity (limited-JS crawler) sees only the questions. The FAQPage JSON-LD partly mitigates this for AIO/ChatGPT, but it's a real extraction gap.

**Fix:** always render answer text server-side, collapse visually with CSS (`max-height`/`hidden`) instead of conditional rendering. Low effort.

---

## Per-domain findings

### AI Visibility — 41/100
- **Crawler access 80** — `Allow: /` for all UAs; GPTBot/ClaudeBot/PerplexityBot/Google-Extended all permitted. Deductions: cross-domain sitemap, and `Disallow: /home` (verify nothing primary lives there).
- **Citability 44** — a few quotable product passages (LeadShield, 60-sec audit), but marketing-framed with no stats. Add a real FAQ, a pricing/specs table, and 2–3 proprietary numbers (e.g. missed-call recovery rate) → +15–25 pts.
- **llms.txt 0** — returns 404. Create one on the canonical domain (template generated, see below).
- **Brand mentions 17** — see Critical #2.

### Platform Readiness — avg 64/100
| Platform | Score | Note |
|---|---|---|
| Google AI Overviews | 78 | Strongest — FAQPage JSON-LD + real comparison `<table>` (COAI vs Wix/GoDaddy) |
| ChatGPT Web Search | 66 | Good entity + quotable facts; add explicit per-agent robots allows |
| Bing Copilot | 63 | No IndexNow / `msvalidate.01` / GitHub presence |
| Google Gemini | 61 | GBP linked; no YouTube; expand city-page cluster with a long-form pillar |
| Perplexity AI | 52 | Weakest — client-gated FAQ + no community validation |

### Technical SEO — 62/100
- **Pass:** SSR, HTTPS, clean URLs, `nosniff`, mobile.
- **Fix:** missing canonical (Crit #1), cross-domain `og:url`/sitemap, add security headers (HSTS, CSP, X-Frame-Options, Referrer-Policy), set `poweredByHeader: false` to drop `X-Powered-By: Next.js`, verify `Disallow: /home`.

### Structured Data — 62/100
- **Strong:** JSON-LD format, LocalBusiness w/ NAP+geo+hours, FAQPage, Product/Offer, WebSite+SearchAction, Person (author: Jason Robert Manuel), Article w/ dates.
- **HIGH risk — self-serving reviews:** `Review`/`AggregateRating` markup about the business on its own site may violate Google's review-snippet policy → risk of a manual structured-data action. Confirm reviews are real, visible on-page, and ideally synced to your real GBP review count. Also `AggregateRating` is a standalone node — nest it inside the LocalBusiness in `lib/schema.ts`.
- **Add:** dedicated `Organization` node with full `sameAs`, `Service`/`OfferCatalog`, `BreadcrumbList`, `speakable`.

### Content & E-E-A-T — ~60/100 (provisional)
- Named author (Person schema → Jason Robert Manuel), dated Article, city-page cluster (Bakersfield/Delano/Shafter/Kern County), fixed pricing and process = solid trust scaffolding for a local agency.
- Gaps: thin external authority, conversion-over-depth copy, no real case studies with named clients + specific lift numbers. Add 1–2 Bakersfield case studies with hard numbers — biggest E-E-A-T lever.

---

## Prioritized action plan

**Do first (Critical, mostly low-effort, in-repo):**
1. Add self-referencing canonical + fix `og:url` to coaibakersfield.com (or redirect to the chosen primary domain).
2. Publish a sitemap on this host; remove the cross-domain `Sitemap:` line; verify `Disallow: /home`.
3. Server-render FAQ answers (`Faq.tsx`).
4. Audit `Review`/`AggregateRating` for self-serving markup; nest AggregateRating in LocalBusiness.

**Do next (High):**
5. LinkedIn company page + verified Google Business Profile with reviews; seed YouTube + Reddit; wire into `SAME_AS`.
6. Add explicit AI-crawler allow rules in `app/robots.ts`.
7. Create `/llms.txt`.
8. Add security headers + `poweredByHeader: false`.
9. Implement IndexNow + Bing `msvalidate.01`.

**Do later (Medium):**
10. Convert top H2s to question/answer-target headings with 40–60 word lead answers.
11. Add 2–3 proprietary stats + a real case study.
12. Add `Organization`, `Service`, `BreadcrumbList`, `speakable` schema.

---

## Suggested `/llms.txt` (deploy on canonical domain)

```
# Chaotically Organized AI (COAI)
> AI website design, automation, and AI phone answering for Bakersfield trades & local service businesses.

## Core Pages
- [Home](https://coaibakersfield.com/): Services overview for contractors & trades
- [Contact](https://coaibakersfield.com/contact): Bakersfield, CA service area

## Services
- LeadShield: Missed-call text-back; AI SMS auto-reply, HOT/WARM/COLD lead scoring
- Website Audit: 60-second instant site audit with grade + revenue-loss report
- AI Phone Answering: Bilingual AI voice agents, after-hours dispatch, CRM routing

## Optional
- Pricing
- Case Studies / Results
```

---

*Audit caveat: three specialist agents ran without live network access and scored from supplied context + the deployed source tree (authoritative for on-site signals). Off-site signals (Wikipedia/Reddit/LinkedIn population, GBP review count, Bing/Google verification) are inferred — confirm directly before acting on the brand/community scores.*
