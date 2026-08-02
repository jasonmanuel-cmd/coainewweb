import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { PricingShell } from "@/components/pricing/PricingShell";
import { PricingPageBody } from "@/components/marketing/PricingPageBody";
import { pageMetadata } from "@/lib/metadata";
import { articleJsonLd, breadcrumbJsonLd, serviceJsonLd } from "@/lib/schema";
import { OFFERS, SITE_URL } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: `Pricing — ${OFFERS.tradecall.name} | COAI`,
  description: `${OFFERS.tradecall.name} at ${OFFERS.tradecall.price} flat, ${OFFERS.tradecall.terms}. ${OFFERS.continuity.name} optional at ${OFFERS.continuity.price}/month. Every third-party cost published before you sign.`,
  path: "/pricing",
  published: "2026-01-20",
  modified: "2026-08-02",
});

const pricingService = serviceJsonLd(
  OFFERS.tradecall.name,
  `${OFFERS.tradecall.summary} ${OFFERS.tradecall.price} flat.`
);

export default function PricingPage() {
  const crumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Pricing", path: "/pricing" }
  ]);
  const pricingArticle = articleJsonLd({
    headline: `${OFFERS.tradecall.name} pricing — ${OFFERS.tradecall.price} flat | COAI`,
    description: `Three offers and nothing else: ${OFFERS.scorecard.name}, ${OFFERS.tradecall.name} at ${OFFERS.tradecall.price} flat, and optional ${OFFERS.continuity.name} at ${OFFERS.continuity.price} per month. Exclusions and third-party costs published.`,
    path: "/pricing",
    datePublished: "2026-01-20",
    dateModified: "2026-08-02",
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
      <JsonLd data={crumbs} />
      <PricingPageBody />
    </PricingShell>
  );
}
