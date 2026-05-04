import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/schema";
import { CONTACT, SITE_URL } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Website Design Shafter, CA",
  description:
    "Shafter website design for local service businesses: high-speed mobile pages, cleaner conversion UX, and structured local trust signals.",
  path: "/website-design/shafter"
});

const TICKER = ["SHAFTER WEB DESIGN", "CONVERSION UX", "LOCAL VISIBILITY", "MOBILE-FIRST", "KERN COUNTY"];

export default function ShafterWebsiteDesignPage() {
  const crumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Website design", path: "/website-design" },
    { name: "Shafter", path: "/website-design/shafter" }
  ]);
  const service = serviceJsonLd(
    "Shafter website design services",
    "Website design, schema implementation, and conversion architecture for Shafter businesses that need stronger local lead flow."
  );
  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Shafter Website Design",
    url: `${SITE_URL}/website-design/shafter`
  };

  return (
    <MarketingLayout tickerItems={TICKER} activeHref="/website-design">
      <JsonLd data={webPage} />
      <JsonLd data={crumbs} />
      <JsonLd data={service} />
      <div className="m-page-hero">
        <div className="m-page-hero-grid" aria-hidden="true" />
        <div className="m-page-hero-inner">
          <div className="m-section-label">Shafter, CA</div>
          <h1>
            Shafter <span className="m-text-green">Website Design</span>
          </h1>
          <p className="m-hero-sub">
            We help Shafter operators replace slow, low-trust sites with conversion-first systems built for Google, AI
            surfaces, and real call volume.
          </p>
          <div className="m-cta-row">
            <Link href="/intake" className="m-btn-primary">
              Run Shafter Diagnostic →
            </Link>
            <Link href="/website-design/kern-county" className="m-btn-ghost">
              Kern County Hub
            </Link>
            <Link href="/website-design/bakersfield" className="m-btn-ghost">
              Bakersfield
            </Link>
            <Link href="/website-design/delano" className="m-btn-ghost">
              Delano
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

