import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { ServicesMarketingContent } from "@/components/services/ServicesMarketingContent";
import { pageMetadata } from "@/lib/metadata";
import { articleJsonLd, breadcrumbJsonLd, serviceJsonLd } from "@/lib/schema";

const serviceDescription =
  "Job-call leak audits, missed-call recovery, call-first website builds, lead qualification, lifecycle follow-up, and reporting systems for Bakersfield operators. You own the accounts, code, and data.";

export const metadata: Metadata = pageMetadata({
  title: { absolute: "Services | Chaotically Organized AI - Bakersfield 661" },
  description:
    "Explore COAI's service path and public systems catalog for capturing inquiries, qualifying jobs, recovering quotes, retaining customers, and measuring revenue leaks.",
  path: "/services",
  published: "2026-01-20",
  modified: "2026-10-10",
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
    dateModified: "2026-10-10"
  });

  return (
    <MarketingLayout activeHref="/services">
      <JsonLd data={serviceJsonLd("Revenue infrastructure services", serviceDescription)} />
      <JsonLd data={article} />
      <JsonLd data={crumbs} />
      <ServicesMarketingContent />
    </MarketingLayout>
  );
}
