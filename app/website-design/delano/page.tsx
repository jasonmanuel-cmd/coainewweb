import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/schema";
import { CONTACT, SITE_URL } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Website Design Delano, CA",
  description:
    "Delano website design focused on local lead conversion, mobile speed, and entity schema for better Google and AI visibility.",
  path: "/website-design/delano"
});

const TICKER = ["DELANO WEB DESIGN", "LOCAL LEAD FLOW", "SCHEMA", "MOBILE SPEED", "KERN COUNTY"];

export default function DelanoWebsiteDesignPage() {
  const crumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Website design", path: "/website-design" },
    { name: "Delano", path: "/website-design/delano" }
  ]);
  const service = serviceJsonLd(
    "Delano website design services",
    "Website design and local search architecture for Delano businesses that need more calls, form submissions, and clear trust signals."
  );
  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Delano Website Design",
    url: `${SITE_URL}/website-design/delano`
  };

  return (
    <MarketingLayout tickerItems={TICKER} activeHref="/website-design">
      <JsonLd data={webPage} />
      <JsonLd data={crumbs} />
      <JsonLd data={service} />
      <div className="m-page-hero">
        <div className="m-page-hero-grid" aria-hidden="true" />
        <div className="m-page-hero-inner">
          <div className="m-section-label">Delano, CA</div>
          <h1>
            Delano <span className="m-text-green">Website Design</span>
          </h1>
          <p className="m-hero-sub">
            For Delano businesses, we build fast websites that convert visitors into calls with local-intent page
            structure and schema clarity.
          </p>
          <div className="m-cta-row">
            <Link href="/intake" className="m-btn-primary">
              Run Delano Diagnostic →
            </Link>
            <Link href="/website-design/kern-county" className="m-btn-ghost">
              Kern County Hub
            </Link>
            <Link href="/website-design/bakersfield" className="m-btn-ghost">
              Bakersfield
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

