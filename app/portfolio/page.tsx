import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { PortfolioFilterGrid } from "@/components/portfolio/PortfolioFilterGrid";
import { PortfolioEventBeacon } from "@/components/PortfolioEventBeacon";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd } from "@/lib/schema";
import { ORG_ID, SITE_URL } from "@/lib/site";

const TICKER = [
  "PORTFOLIO",
  "FOOD & BEVERAGE",
  "CREDIT RESTORATION",
  "CONTRACTING",
  "APPAREL & CANNABIS",
  "PHOTOGRAPHY",
  "INDEPENDENT MUSIC",
  "SOVEREIGN BUILDS"
];

export const metadata: Metadata = pageMetadata({
  title: { absolute: "Portfolio — Proof of Work | COAI" },
  description:
    "Real websites built by Chaotically Organized AI for real Bakersfield-area operators. See the work, read the outcomes.",
  path: "/portfolio"
});

export default function PortfolioPage() {
  const crumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Portfolio", path: "/portfolio" }
  ]);

  const collection = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Portfolio — Proof of Work",
    url: `${SITE_URL}/portfolio`,
    publisher: { "@id": ORG_ID }
  };

  return (
    <MarketingLayout tickerItems={TICKER} activeHref="/portfolio">
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
            Every site below is a sovereign build — custom code, owned outright by the client. No rented funnels. No
            platform dependency. Some portfolio links are still on temporary hosting subdomains pending client DNS
            cutover. Ownership remains with the client.
          </p>
        </div>
      </div>

      <div className="m-stats-row">
        <div className="m-stat-pill">
          <div className="m-num">6</div>
          <div className="m-lbl">Live Client Sites</div>
        </div>
        <div className="m-stat-pill">
          <div className="m-num">6</div>
          <div className="m-lbl">Industries Served</div>
        </div>
        <div className="m-stat-pill">
          <div className="m-num">100%</div>
          <div className="m-lbl">Sovereign Builds</div>
        </div>
        <div className="m-stat-pill">
          <div className="m-num">661+</div>
          <div className="m-lbl">Local + National Reach</div>
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
            Run My Free Diagnostic →
          </Link>
          <Link href="/pricing" className="m-btn-ghost">
            View Packages
          </Link>
        </div>
      </div>
    </MarketingLayout>
  );
}
