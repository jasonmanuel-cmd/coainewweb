import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { PricingShell } from "@/components/pricing/PricingShell";
import { PricingPageBody } from "@/components/marketing/PricingPageBody";
import { pageMetadata } from "@/lib/metadata";
import { articleJsonLd, breadcrumbJsonLd, serviceJsonLd } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Pricing — TradeCall System | COAI",
  description:
    "TradeCall System at $1,997 flat. Custom website + missed-call recovery for Bakersfield trades. You own the code. No monthly platform tax.",
  path: "/pricing",
  published: "2026-01-20",
  modified: "2026-07-14",
});

const pricingService = serviceJsonLd(
  "TradeCall System — website and missed-call recovery for trades",
  "Custom-coded website with missed-call text-back for Bakersfield trade businesses. $1,997 flat. You own everything."
);

export default function PricingPage() {
  const crumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Pricing", path: "/pricing" }
  ]);
  const pricingArticle = articleJsonLd({
    headline: "TradeCall System Pricing — $1,997 Flat | COAI",
    description:
      "TradeCall System for Bakersfield trades: custom website + missed-call recovery at $1,997 flat. You own the code. Built by a former licensed contractor.",
    path: "/pricing",
    datePublished: "2026-01-20",
    dateModified: "2026-07-14",
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
