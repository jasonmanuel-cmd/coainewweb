import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { PricingShell } from "@/components/pricing/PricingShell";
import { PricingPageBody } from "@/components/marketing/PricingPageBody";
import { ADDON_COUNT } from "@/lib/pricing";
import { pageMetadata } from "@/lib/metadata";
import { articleJsonLd, breadcrumbJsonLd, pricingCatalogJsonLd, serviceJsonLd } from "@/lib/schema";
import { OFFERS, SITE_URL } from "@/lib/site";

const PRICING_DESCRIPTION = `Custom websites from ${OFFERS.website.price} flat, three packages that add missed-call text-back, booking, follow-up, CRM, and AI systems, and ${ADDON_COUNT} individually priced add-ons. Every third-party cost published before you sign.`;

export const metadata: Metadata = pageMetadata({
  title: "Pricing — websites, packages, and add-ons | COAI",
  description: PRICING_DESCRIPTION,
  path: "/pricing",
  published: "2026-01-20",
  modified: "2026-10-28",
});

const pricingService = serviceJsonLd(
  OFFERS.website.name,
  `${OFFERS.website.summary} ${OFFERS.website.price} flat.`,
  "/pricing",
  OFFERS.website.priceNumeric
);

export default function PricingPage() {
  const crumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Pricing", path: "/pricing" }
  ]);
  const pricingArticle = articleJsonLd({
    headline: "COAI pricing: websites, packages, and add-ons",
    description: PRICING_DESCRIPTION,
    path: "/pricing",
    datePublished: "2026-01-20",
    dateModified: "2026-10-28",
  });

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Pricing",
    url: `${SITE_URL}/pricing`
  };

  return (
    <PricingShell>
      <JsonLd data={pricingArticle} />
      <JsonLd data={webPage} />
      <JsonLd data={pricingService} />
      <JsonLd data={pricingCatalogJsonLd()} />
      <JsonLd data={crumbs} />
      <PricingPageBody />
    </PricingShell>
  );
}
