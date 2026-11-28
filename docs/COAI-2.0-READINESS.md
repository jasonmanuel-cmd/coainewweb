# COAI 2.0 preview readiness and rollback

Prepared November 27, 2026. This is a preview-branch implementation, not a production release.

## Verified repository and hosting baseline

- National source: jasonmanuel-cmd/coainewweb, Next.js 16.4.6, production branch main; pre-change rollback commit 8378242a1ebc3ceb8a89ea748ea91ce43170a304.
- Local source: jasonmanuel-cmd/coai-bakersfield-site, static HTML/CSS/JavaScript; pre-change rollback commit c091bfdc5abc4efd7a3d6d8428557c3b2ec399d8.
- Vercel team jasons-projects-1d845fc4, project coaibakersfield, is linked to the national repository. Both Bakersfield hosts belong to that project and have Vercel-level 307 redirects to the national host. The local repository is not linked to a Vercel project.
- National application canonical is https://www.chaoticallyorganizedai.com. The local static site's intended canonical is https://coaibakersfield.com; this will only be effective after a separate project and domain cutover.
- National forms use /api/contact, /api/intake, and /api/callback, with Zod validation, same-site checks, rate limits, Turnstile, CRM capture, Formspree delivery, and optional confirmation. CRM storage can use Neon, Supabase, or Redis according to environment configuration. HQ has separate session/auth routes. These code paths and existing data were left intact.
- No Zoho CRM integration was found in the inspected national source paths. This does not prove the user has no separate Zoho account or external workflow.
- No payment provider was added or modified. The new /start route sends prospects to the existing contact form after explaining that scope and payment terms are agreed before any charge.

## Scope implemented on preview branches

- National: new homepage sequence, three offer detail routes, industry page, evidence page, start route, accessible five-stage disclosure diagram, and illustrative opportunity calculator. Navigation, footer, descriptions, sitemaps, and machine-readable offer names were updated. Existing HQ, CRM, billing, legal, and customer routes remain.
- Bakersfield: 13 rebuilt acquisition pages including local offer pages, industries, case studies, and start, with local canonicals and an updated 19-URL sitemap. The calculator works locally. Local inquiries link to the existing national CRM form with from=coaibakersfield.
- Only the three approved offers are promoted in the new navigation. Older legacy routes still need an SEO migration decision before production; do not remove them without redirect and Search Console review.

## Verification and remaining gates

1. National Next.js production build and TypeScript passed; 361 automated tests passed across 51 files. Bakersfield: 13 pages passed HTML, JSON-LD, canonical, and local-link checks; sitemap has 19 unique URLs.
2. Browser review: local national and Bakersfield pages opened on desktop and mobile. Both calculators changed from 20 to 40 missed calls and returned 12 recovered contacts, 3 estimated customers, $1,500 gross, and $303 after fee with default assumptions. These are test calculations, not business results.
3. Live contact delivery is unverified in this branch. A synthetic submission would use the actual CRM and Formspree route and may send confirmation; no external submission was made.
4. The local site has no hosted preview. A separate Vercel project and one-off preview deployment are needed. Confirm that this fits existing included usage before deployment because the team is on a Pro plan and the user prohibited new expenses.
5. Production promotion and Bakersfield domain transfer require explicit final cutover approval. Set one local canonical host, redirect the other, verify every old URL/redirect, and confirm CRM storage plus owner receipt.
6. Customer names, logos, testimonials, and results need evidence and publication permission. The new case-studies page makes no quantified claim.

## SEO and discoverability controls

National new routes use canonical metadata and are in the sitemap; the offer list uses ItemList and offer pages use Service schema. The local site retains .html paths, local canonical URLs, LocalBusiness context, robots, and sitemap. The two homepages differ by national versus Bakersfield intent. Existing local SEO visibility, backlinks, Search Console coverage, and AI citations were not independently measured. A separate migration inventory is required for legacy website-design URLs and any external links.

## Security and privacy review

The changed files do not include environment values, secrets, database queries, authentication behavior, or payment calls. The new calculator runs in the browser without transmitting inputs. The local static site links to the existing national form rather than introducing a new unprotected form. The new /start route does not collect payment. Existing form consent and protection code was preserved, but live environment configuration and delivery were not independently verified.

## Recent technology evaluation

- [Next.js 16.2](https://nextjs.org/blog/next-16-2) was released March 18, 2026 and documents performance and debugging improvements. The repo already uses Next.js 16.4.6; this work did not add another framework or dependency.
- [Chrome 147 element-scoped view transitions](https://developer.chrome.com/blog/element-scoped-view-transitions) were introduced in March 2026. They were not adopted because the current five-stage diagram and calculator work with native HTML disclosures and React state without browser-specific animation, extra maintenance, or reduced-motion complexity.
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/) remains the accessibility target. Native disclosure controls, labels, focus outlines, and reduced-motion rules were used. Full conformance is not claimed without a complete manual audit.

## Production cutover and rollback

Before cutover, export current Vercel domain settings and production deployment IDs, capture a public URL/status/canonical inventory, and test a labeled inquiry end to end. Promote the national branch only after owner review. For Bakersfield, deploy its separate project, test it with no custom domain, then move both hosts in a controlled window. If critical behavior fails, restore the prior national deployment and return the Bakersfield domain configuration to the recorded project/redirect state. Verify forms, canonicals, sitemap, and contact routing after either cutover or rollback. Never roll back or migrate customer data as part of website presentation rollback.
