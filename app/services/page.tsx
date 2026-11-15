import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { ServicesMarketingContent } from "@/components/services/ServicesMarketingContent";
import { pageMetadata } from "@/lib/metadata";
import { articleJsonLd, breadcrumbJsonLd, serviceJsonLd } from "@/lib/schema";

const serviceDescription =
  "Custom website design and development, local search and AI answer-engine setup, missed-call text-back, booking, follow-up, CRM, AI systems, and reporting for Bakersfield and Kern County operators. You own the accounts, code, and data.";

export const metadata: Metadata = pageMetadata({
  title: { absolute: "Services | Chaotically Organized AI - Bakersfield 661" },
  description:
    "Custom websites, three packages, and individually priced systems for local search, AI answer visibility, lead capture, follow-up, retention, and reporting. See everything COAI builds.",
  path: "/services",
  published: "2026-01-20",
  modified: "2026-10-28",
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
    dateModified: "2026-10-28"
  });

  return (
    <MarketingLayout activeHref="/services">
      <JsonLd data={serviceJsonLd("Website design and growth systems", serviceDescription)} />
      <JsonLd data={article} />
      <JsonLd data={crumbs} />
      <ServicesMarketingContent />
    </MarketingLayout>
  );
}
