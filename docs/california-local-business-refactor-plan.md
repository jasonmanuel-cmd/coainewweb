# California Local Business Refactor Plan

## Strategy Basis
This requirements matrix follows the Search Visibility Strategist approach for technical SEO + GEO + AEO:
- complete metadata coverage
- canonical consistency
- schema completeness by intent
- internal linking that reinforces service + location entities

Primary project references:
- `.github/agents/site-optimization.agent.md`
- `lib/metadata.ts`
- `lib/schema.ts`
- `app/**/page.tsx`
- `app/sitemap.ts`
- `components/marketing/MarketingNav.tsx`
- `components/marketing/MarketingFooter.tsx`

## Scope
All current page templates under the App Router:
- Home
- Marketing content pages
- Service hub and location pages
- Pricing, portfolio, FAQ
- Contact and intake flow
- JAX waitlist page
- Legal pages
- Utility/testing route

## Global Requirements (Apply To All Indexable Templates)

### Metadata Requirements
1. Use `pageMetadata()` (or a template-specific wrapper) for all indexable pages.
2. Require:
   - unique `title`
   - unique `description`
   - absolute canonical in `alternates.canonical`
   - Open Graph: `title`, `description`, `url`, `siteName`, image
   - Twitter: `summary_large_image`, `title`, `description`, image
3. Title format rules:
   - include primary intent entity (service/location/page intent)
   - include brand at end when possible
   - avoid duplicate titles across templates
4. Description rules:
   - include a local qualifier for local-intent pages (Bakersfield/Kern County/CA)
   - include one conversion intent phrase (call, diagnostic, audit, quote)

### Canonical Requirements
1. Canonical must be absolute and match `SITE_URL + pathname`.
2. No query params in canonical (`?pkg`, `?from`, `?intent`, etc.).
3. No hash fragments in canonical.
4. Trailing slash policy must be consistent across all routes.
5. Canonical for utility or experimental pages should be omitted only when page is `noindex`.

### Schema Requirements
1. Sitewide baseline schema in layout:
   - `Organization`/`LocalBusiness` graph (already present)
   - add `WebSite` schema globally (`webSiteJsonLd()`), not only page-level
2. Every indexable page should include `BreadcrumbList`.
3. Every service-intent page should include `Service` schema.
4. Every FAQ-heavy page (3+ Q/A) should include `FAQPage`.
5. Contact-focused pages should include `ContactPage`.
6. About-focused pages should include `AboutPage`.
7. Collection-style pages should include `CollectionPage`.
8. Keep NAP and `areaServed` aligned with `lib/site.ts` facts.

### Internal Linking Requirements
1. Every indexable template must include:
   - link up to its parent hub (if any)
   - link sideways to peer templates (where relevant)
   - link down to a conversion endpoint (`/intake` or `/contact`)
2. Anchor text must reflect intent (service + location where relevant).
3. Footer and nav links are baseline; each template must also have contextual in-body links.
4. Avoid orphan pages: each page must have at least two inbound internal links from indexable pages.

## Template-Level Requirements Matrix

## 1) Home Template
- Route pattern: `/`
- Current route: `app/page.tsx`
- Metadata:
  - keep homepage-specific title/description via `homeMetadata` or explicit metadata
  - include primary market + service framing (Bakersfield, audits, AEO/GEO)
- Canonical:
  - canonical must be root `SITE_URL`
- Schema:
  - include `WebPage` for home
  - keep global `Organization` and `WebSite`
  - optional `FAQPage` if homepage includes >=3 FAQs
- Internal linking:
  - prominent links to `/services`, `/website-design`, `/pricing`, `/portfolio`, `/faq`, `/contact`, `/intake`
  - include a location path to `/website-design/kern-county`

## 2) Core Marketing Content Template
- Route pattern: `/<about|services|pricing|portfolio|faq|contact|jax>`
- Current routes: `/about`, `/services`, `/pricing`, `/portfolio`, `/faq`, `/contact`, `/jax`
- Metadata:
  - each page unique title + description by intent
  - include local qualifier on pages tied to local acquisition
- Canonical:
  - canonical equals full route path
- Schema:
  - all: `BreadcrumbList`
  - `/about`: `AboutPage`
  - `/services`: `Service`
  - `/pricing`: `WebPage` + `Service`
  - `/portfolio`: `CollectionPage`
  - `/faq`: `FAQPage`
  - `/contact`: `ContactPage`
  - `/jax`: `WebPage` now; add `SoftwareApplication` only when launch details are stable
- Internal linking:
  - each template links to `/intake`
  - each template links to at least one support template among `/pricing`, `/portfolio`, `/faq`, `/contact`
  - `/services` must link to `/website-design` and `/website-design/kern-county`

## 3) Service Hub Template
- Route pattern: `/website-design`
- Current route: `app/website-design/page.tsx`
- Metadata:
  - include service entity + ownership proposition + geography
- Canonical:
  - canonical to `/website-design`
- Schema:
  - `WebPage`
  - `BreadcrumbList`
  - add `Service` schema for the hub itself
- Internal linking:
  - must link to location hub `/website-design/kern-county`
  - must link to every city page (`/website-design/bakersfield`, `/website-design/delano`, `/website-design/shafter`)
  - must link to `/intake`

## 4) Location Hub Template
- Route pattern: `/website-design/<county-or-region>`
- Current route: `/website-design/kern-county`
- Metadata:
  - include region entity + service + conversion phrase
- Canonical:
  - canonical to the exact hub path
- Schema:
  - `BreadcrumbList`
  - `Service`
  - add `WebPage` for stronger entity typing
- Internal linking:
  - link to all child city pages
  - link up to `/website-design`
  - link to `/intake` and `/contact`

## 5) City Service Template
- Route pattern: `/website-design/<city-slug>`
- Current routes: `/website-design/bakersfield`, `/website-design/delano`, `/website-design/shafter`
- Metadata:
  - title format: `Website Design {City}, CA`
  - description includes city + service + conversion outcome
- Canonical:
  - canonical to exact city page path
- Schema:
  - `BreadcrumbList`
  - `Service` with city in service name/description
  - add `WebPage`
- Internal linking:
  - link up to `/website-design` and `/website-design/kern-county`
  - link sideways to sibling cities
  - link to `/intake` and `/contact`

## 6) Intake Form Template
- Route pattern: `/intake`
- Metadata:
  - emphasize diagnostic intent and conversion action
- Canonical:
  - canonical fixed to `/intake` (strip params)
- Schema:
  - `WebPage`
  - `BreadcrumbList`
  - optional `HowTo` only if process steps are shown as instructional content
- Internal linking:
  - link back to `/services` and `/pricing`
  - link to `/contact` for direct-call alternative

## 7) Intake Confirmation Template (Thank-You)
- Route pattern: `/intake/confirmation`
- Metadata:
  - title and description unique, non-duplicate with intake page
- Canonical:
  - canonical to `/intake/confirmation`
- Schema:
  - `WebPage`
  - `BreadcrumbList`
- Internal linking:
  - link to `/pricing`, `/contact`, and one trust asset (`/portfolio` or GBP)
  - keep page in crawl path but avoid over-prioritizing in global navigation

## 8) Legal Template
- Route pattern: `/<privacy|terms>`
- Metadata:
  - legal-specific title and description
- Canonical:
  - canonical to exact legal path
- Schema:
  - add `WebPage` + `BreadcrumbList` for both pages
  - optional `Organization` reference via `publisher`
- Internal linking:
  - include links to `/`, `/contact`, and cross-link privacy <-> terms
  - no aggressive conversion CTA requirements on legal templates

## 9) Utility/Test Template
- Route pattern: `/sentry-example-page`
- Metadata:
  - apply `robots: { index: false, follow: false }`
  - add explicit title indicating non-production utility
- Canonical:
  - omit canonical if page is noindex, or canonical to self if temporarily public for diagnostics
- Schema:
  - none required
- Internal linking:
  - remove from nav/footer and sitemap
  - no contextual links from indexable marketing templates

## Canonical and Sitemap Enforcement Rules
1. Every indexable route in templates 1-8 must exist in `app/sitemap.ts`.
2. Every sitemap URL must resolve to a self-referencing canonical.
3. Exclude noindex utility routes from sitemap.
4. Include `lastModified`, `changeFrequency`, and route-priority policy by template tier:
   - Tier 1 (home, services, website-design, kern-county, contact, intake): higher priority
   - Tier 2 (pricing, portfolio, faq, about, city pages): medium priority
   - Tier 3 (legal, confirmation): lower priority

## Internal Linking Graph Requirements
1. Hub-and-spoke service graph:
   - `/services` -> `/website-design` -> `/website-design/kern-county` -> city pages
2. Conversion graph:
   - all commercial templates -> `/intake` and `/contact`
3. Trust graph:
   - commercial templates -> `/portfolio`, `/faq`, `/about`
4. Legal trust graph:
   - global footer -> `/privacy` and `/terms`

## Definition Of Done
1. Every template has unique metadata.
2. Every indexable template has self-canonical.
3. Every template has required schema type(s) and breadcrumb.
4. Every commercial template includes contextual links to:
   - one parent/hub page
   - one sibling/support page
   - one conversion page
5. Sitemap and canonical URLs match exactly.
6. Utility/testing templates are noindex and excluded from sitemap/internal link graph.
