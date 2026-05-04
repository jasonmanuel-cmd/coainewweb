import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/schema";
import { CONTACT, SITE_URL } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Kern County Website Design",
  description:
    "Website design services for Kern County businesses: conversion-first builds, local schema, and ownership-first infrastructure.",
  path: "/website-design/kern-county"
});

const TICKER = [
  "KERN COUNTY WEB DESIGN",
  "BAKERSFIELD",
  "DELANO",
  "SHAFTER",
  "SOVEREIGN BUILDS",
  "KERN COUNTY WEB DESIGN"
];

export default function KernCountyWebsiteDesignPage() {
  const crumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Website design", path: "/website-design" },
    { name: "Kern County", path: "/website-design/kern-county" }
  ]);
  const service = serviceJsonLd(
    "Kern County website design services",
    "Conversion-first website design, local SEO/AEO architecture, and schema implementation for Kern County businesses."
  );
  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Kern County Website Design",
    url: `${SITE_URL}/website-design/kern-county`
  };

  return (
    <MarketingLayout tickerItems={TICKER} activeHref="/website-design">
      <JsonLd data={webPage} />
      <JsonLd data={crumbs} />
      <JsonLd data={service} />

      <div className="m-page-hero">
        <div className="m-page-hero-grid" aria-hidden="true" />
        <div className="m-page-hero-inner">
          <div className="m-section-label">Kern County Coverage</div>
          <h1>
            Website Design in <span className="m-text-green">Kern County</span>
          </h1>
          <p className="m-hero-sub">
            We build conversion-first websites for operators across Kern County with clean local schema, clear service
            architecture, and a system you own outright.
          </p>
          <div className="m-cta-row">
            <Link href="/intake" className="m-btn-primary">
              Run My Free Diagnostic →
            </Link>
            <Link href="/website-design" className="m-btn-ghost">
              Website Design Hub
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

      <section className="m-marketing-section">
        <div className="m-container-wide">
          <div className="m-section-label">Locations</div>
          <h2 className="m-h2-marketing">
            Kern County pages built for <span className="m-text-green">local intent</span>
          </h2>
          <div className="m-cta-row">
            <Link href="/website-design/bakersfield" className="m-btn-ghost">
              Bakersfield Website Design
            </Link>
            <Link href="/website-design/delano" className="m-btn-ghost">
              Delano Website Design
            </Link>
            <Link href="/website-design/shafter" className="m-btn-ghost">
              Shafter Website Design
            </Link>
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
}

