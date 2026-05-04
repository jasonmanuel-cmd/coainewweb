import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/schema";
import { CONTACT, SITE_URL } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Website Design Bakersfield, CA",
  description:
    "Bakersfield website design for service businesses. Conversion-first websites with local schema, fast mobile performance, and full ownership.",
  path: "/website-design/bakersfield"
});

const TICKER = ["BAKERSFIELD WEB DESIGN", "LOCAL SEO", "AEO READY", "SCHEMA", "SOVEREIGN BUILDS"];

export default function BakersfieldWebsiteDesignPage() {
  const crumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Website design", path: "/website-design" },
    { name: "Bakersfield", path: "/website-design/bakersfield" }
  ]);
  const service = serviceJsonLd(
    "Bakersfield website design services",
    "Website design and local search architecture for Bakersfield businesses that need faster conversion and clearer trust signals."
  );
  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Bakersfield Website Design",
    url: `${SITE_URL}/website-design/bakersfield`
  };

  return (
    <MarketingLayout tickerItems={TICKER} activeHref="/website-design">
      <JsonLd data={webPage} />
      <JsonLd data={crumbs} />
      <JsonLd data={service} />
      <div className="m-page-hero">
        <div className="m-page-hero-grid" aria-hidden="true" />
        <div className="m-page-hero-inner">
          <div className="m-section-label">Bakersfield, CA</div>
          <h1>
            Bakersfield <span className="m-text-green">Website Design</span>
          </h1>
          <p className="m-hero-sub">
            We design and deploy high-conversion websites for Bakersfield operators who need speed, local visibility,
            and a system they fully own.
          </p>
          <div className="m-cta-row">
            <Link href="/intake" className="m-btn-primary">
              Get My Bakersfield Site Audit →
            </Link>
            <Link href="/website-design/kern-county" className="m-btn-ghost">
              Kern County Hub
            </Link>
            <Link href="/website-design/delano" className="m-btn-ghost">
              Delano
            </Link>
            <Link href="/website-design/shafter" className="m-btn-ghost">
              Shafter
            </Link>
            <Link href="/contact" className="m-btn-ghost">
              Contact
            </Link>
            <a href={`tel:${CONTACT.phoneE164}`} className="m-btn-ghost">
              Call {CONTACT.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </MarketingLayout>
  );
}

