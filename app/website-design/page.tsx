import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { WebsiteDesignPageBody } from "@/components/marketing/WebsiteDesignPageBody";
import { pageMetadata } from "@/lib/metadata";
import { articleJsonLd, breadcrumbJsonLd, serviceJsonLd } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";
import Link from "next/link";

export const metadata: Metadata = pageMetadata({
  title: "Website design — call-first builds you own",
  description:
    "Call-first website design for Bakersfield service businesses. Custom code, not templates. You control the domain, hosting, source code, analytics, and lead data. WordPress migration, speed work, and emergency repairs available.",
  path: "/website-design",
  published: "2026-02-01",
  modified: "2026-04-15",
});

export default function WebsiteDesignPage() {
  const crumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Website design", path: "/website-design" }
  ]);

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Website Design",
    url: `${SITE_URL}/website-design`
  };
  const service = serviceJsonLd(
    "Website design services",
    "Conversion-first custom website design for Bakersfield and Kern County operators who need full ownership, technical SEO readiness, and AI answer visibility."
  );

  const article = articleJsonLd({
    headline: "Website design for Bakersfield businesses — built to catch the call",
    description:
      "Call-first website design for Bakersfield service businesses. Custom code, not templates, and a documented handoff so you own what we build.",
    path: "/website-design",
    datePublished: "2026-01-01",
    dateModified: "2026-05-01"
  });

  return (
    <MarketingLayout activeHref="/website-design">
      <JsonLd data={webPage} />
      <JsonLd data={service} />
      <JsonLd data={article} />
      <JsonLd data={crumbs} />
      <WebsiteDesignPageBody />
      <div className="m-bottom-cta">
        <div className="m-section-label">Kern County Coverage</div>
        <h2 className="m-bottom-cta-h2">
          City-specific pages for <span className="m-text-green">local search intent.</span>
        </h2>
        <div className="m-cta-row">
          <Link href="/website-design/kern-county" className="m-btn-primary-marketing">
            Kern County Hub &gt;
          </Link>
          <Link href="/intake" className="m-btn-primary-marketing">
            Run My Diagnostic &gt;
          </Link>
          <Link href="/website-design/bakersfield" className="m-btn-ghost-marketing">
            Bakersfield
          </Link>
          <Link href="/website-design/delano" className="m-btn-ghost-marketing">
            Delano
          </Link>
          <Link href="/website-design/shafter" className="m-btn-ghost-marketing">
            Shafter
          </Link>
          <Link href="/contact" className="m-btn-ghost-marketing">
            Contact
          </Link>
        </div>
      </div>
    </MarketingLayout>
  );
}
