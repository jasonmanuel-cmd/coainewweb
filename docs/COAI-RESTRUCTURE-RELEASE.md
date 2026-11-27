# COAI three-offer preview and release notes

Prepared November 27, 2026 on `preview/coai-three-offers-2026-11-27`.

## Public scope

- National canonical: `https://www.chaoticallyorganizedai.com`.
- Three new-customer offers: $500 Revenue Diagnostic ($200 upfront), $1,997 + $297/month Revenue Engine, $4,997+ + $597–$997/month Revenue Infrastructure.
- Existing customer contracts, CRM endpoints, stored data, billing integrations, legal pages, portfolio, and domain canonical remain intact.
- Bakersfield is no longer an application-level redirect alias in this repository. The separate local repository has its own self-canonical pages.

## Hosting gate

At preparation time, both Bakersfield hosts returned a Vercel 307 redirect to the national site. The connected Vercel account showed no projects, so the domain-to-project assignment and preview deployment could not be verified or changed. Do not promote this branch until hosting ownership and domain routing are confirmed. The local domain should serve the local repository directly, with one chosen host redirecting to the other and all canonical/sitemap signals agreeing.

## Before promotion

1. Confirm the Vercel project and Git repository attached to each domain; inspect its production and preview settings.
2. Open both branch previews and test desktop/mobile layout, navigation, and all three offer links.
3. Submit a labeled synthetic inquiry through the national `/contact` form and verify CRM storage and owner receipt. Remove or mark the test record afterward. No form was submitted during preparation.
4. Crawl existing public URLs and compare status, canonical, sitemap, robots, and structured data. Preserve needed redirects and watch Search Console after launch.
5. Confirm new-customer agreement and billing language with the owner before accepting payments. Existing signed agreements continue unchanged.

## Rollback

Restore each prior production deployment or revert the preview branch commits. Keep CRM and billing data untouched. Verify both domains, their canonical URLs, and inquiry flow after rollback.
