# COAI three-offer preview and release notes

Prepared November 27, 2026 on `preview/coai-three-offers-2026-11-27`.

## Public scope

- National canonical: `https://www.chaoticallyorganizedai.com`.
- Three new-customer offers: $500 COAI Digital Diagnostic & Repair ($200 upfront, $300 on completion; $200 diagnostic-only), $1,997 + $297/month COAI Revenue Engine, and $4,997+ + $597–$997/month COAI Intelligent Business Infrastructure.
- New public routes: `/diagnostic`, `/revenue-engine`, `/infrastructure`, `/industries`, `/case-studies`, and `/start`. The homepage includes the five-stage system and an illustrative missed-call calculator.
- Existing customer contracts, CRM endpoints, stored data, billing integrations, legal pages, portfolio, and domain canonical remain intact.
- Bakersfield is no longer an application-level redirect alias in this repository. The separate local repository has its own self-canonical pages.

## Hosting findings

The Vercel project `jasons-projects-1d845fc4/coaibakersfield` (`prj_aAZxm3OQXXEiPBI5y5cBr6TZDVhl`) is connected to `jasonmanuel-cmd/coainewweb`, production branch `main`. It currently owns both national and Bakersfield domains. Vercel domain settings issue 307 redirects from both Bakersfield hosts to `www.chaoticallyorganizedai.com`, independent of application redirect rules. The national preview branch built successfully in this project. Its preview deployment is accessible through the Vercel team; check the branch deployment after each push.

The local acquisition repository needs a separate Vercel project and a deliberate domain move after its preview has been reviewed. Do not remove either Bakersfield domain from the existing project until the replacement project is ready and the cutover plan is approved. Preserve one chosen local canonical host and redirect the other local host to it.

## Before promotion

1. Open the national branch preview and test desktop/mobile layout, navigation, and all three offer links.
2. Create and review a separate local project preview; then confirm the domain cutover plan and rollback owner.
3. Submit a labeled synthetic inquiry through the national `/contact` form and verify CRM storage and owner receipt. Remove or mark the test record afterward. No form was submitted during preparation because it can trigger external delivery and confirmation.
4. Crawl existing public URLs and compare status, canonical, sitemap, robots, and structured data. Preserve needed redirects and watch Search Console after launch.
5. Confirm new-customer agreement and billing language with the owner before accepting payments. Existing signed agreements continue unchanged.

## Rollback

Restore each prior production deployment or revert the preview branch commits. Keep CRM and billing data untouched. Verify both domains, their canonical URLs, and inquiry flow after rollback.
