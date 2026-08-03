import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { ServicesMarketingContent } from "@/components/services/ServicesMarketingContent";
import { pageMetadata } from "@/lib/metadata";
import { articleJsonLd, breadcrumbJsonLd, serviceJsonLd } from "@/lib/schema";

const serviceDescription =
  "Job-call leak audits, missed-call recovery, and call-first website builds for Bakersfield operators. You own the accounts, the code, and the data.";

export const metadata: Metadata = pageMetadata({
  title: { absolute: "Services | Chaotically Organized AI - Bakersfield 661" },
  description:
    "Job-call leak audits, missed-call recovery, call-first website builds, WordPress migration, and monthly continuity for Bakersfield operators. See exactly what COAI installs and what it excludes.",
  path: "/services",
  published: "2026-01-20",
  modified: "2026-04-15",
});

export default function ServicesPage() {
  const crumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" }
  ]);
  const article = articleJsonLd({
    headline: "Services | Chaotically Organized AI - Bakersfield 661",
    description: serviceDescription,
    path: "/services",
    datePublished: "2026-01-01",
    dateModified: "2026-05-01"
  });

  return (
    <MarketingLayout activeHref="/services">
      <JsonLd data={serviceJsonLd("Revenue infrastructure services", serviceDescription)} />
      <JsonLd data={article} />
      <JsonLd data={crumbs} />
      <ServicesMarketingContent />
      <div className="m-bottom-cta">
        <div className="m-section-label">Service Paths</div>
        <h2>
          Build your local visibility stack.
          <br />
          <span className="m-text-green">Choose your next step.</span>
        </h2>
        <div className="m-cta-row">
          <Link href="/website-design" className="m-btn-primary">
            Website Design Hub &gt;
          </Link>
          <Link href="/website-design/kern-county" className="m-btn-ghost">
            Kern County Web Design
          </Link>
          <Link href="/intake" className="m-btn-ghost">
            Run Diagnostic
          </Link>
          <Link href="/contact" className="m-btn-ghost">
            Contact
          </Link>
        </div>
      </div>
    </MarketingLayout>
  );
}
