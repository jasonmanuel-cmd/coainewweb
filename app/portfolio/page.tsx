import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { PortfolioFilterGrid } from "@/components/portfolio/PortfolioFilterGrid";
import { PortfolioEventBeacon } from "@/components/PortfolioEventBeacon";
import { pageMetadata } from "@/lib/metadata";
import { PORTFOLIO_STATS, countWord } from "@/lib/portfolio-stats";
import { breadcrumbJsonLd } from "@/lib/schema";
import { ORG_ID, SITE_URL } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: { absolute: "Portfolio - Proof of Work | COAI" },
  description:
    "Websites built by Chaotically Organized AI for builders, service businesses, artists, and local operators across Kern County and beyond.",
  path: "/portfolio",
  published: "2026-01-15",
  modified: "2026-10-21",
});

export default function PortfolioPage() {
  const crumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Portfolio", path: "/portfolio" }
  ]);

  const collection = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Portfolio - Proof of Work",
    url: `${SITE_URL}/portfolio`,
    publisher: { "@id": ORG_ID }
  };

  return (
    <MarketingLayout activeHref="/portfolio">
      <PortfolioEventBeacon />
      <JsonLd data={collection} />
      <JsonLd data={crumbs} />

      <div className="m-page-hero">
        <div className="m-page-hero-grid" aria-hidden="true" />
        <div className="m-page-hero-inner">
          <div className="m-section-label">Proof of Work</div>
          <h1>
            Real businesses.
            <br />
            <span className="m-text-green">Real infrastructure.</span>
          </h1>
          <p className="m-hero-sub">
            Every site below is custom code, owned outright by the client. No rented funnels. No
            platform dependency. {PORTFOLIO_STATS.temporaryHostCount} of the {countWord(PORTFOLIO_STATS.projectCount)} links below are still on
            temporary hosting subdomains pending client DNS cutover. Ownership remains with the client.
          </p>
        </div>
      </div>

      <div className="m-stats-row">
        <div className="m-stat-pill">
          <div className="m-num">{PORTFOLIO_STATS.projectCount}</div>
          <div className="m-lbl">Client Sites Built</div>
        </div>
        <div className="m-stat-pill">
          <div className="m-num">{PORTFOLIO_STATS.industryCount}</div>
          <div className="m-lbl">Industries Served</div>
        </div>
        <div className="m-stat-pill">
          <div className="m-num">100%</div>
          <div className="m-lbl">Client-Owned Builds</div>
        </div>
        <div className="m-stat-pill">
          <div className="m-num">661</div>
          <div className="m-lbl">Bakersfield Home Area Code</div>
        </div>
      </div>

      <PortfolioFilterGrid />

      <div className="m-portfolio-cta">
        <div className="m-section-label">Your Industry Is Next</div>
        <h2>
          Ready to own your
          <br />
          <span className="m-text-green">digital infrastructure?</span>
        </h2>
        <p>
          Every business here started with a 30-minute diagnostic call and a clear scope. No fluff, no retainers. Just a
          system you own outright.
        </p>
        <div className="m-cta-actions">
          <Link href="/intake" className="m-btn-primary">
            Request my leak score →
          </Link>
          <Link href="/pricing" className="m-btn-ghost">
            View Packages
          </Link>
        </div>
        <a
          className="m-review-source"
          href="https://share.google/LlU3imoz7ANEnd1eM"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open the Google review at its source <span aria-hidden="true">↗</span>
        </a>
      </div>
    </MarketingLayout>
  );
}
