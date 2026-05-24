import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { PricingShell } from "@/components/pricing/PricingShell";
import { PricingPageBody } from "@/components/marketing/PricingPageBody";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Pricing — Fixed Sovereign Builds",
  description:
    "Clear, fixed pricing for sovereign website builds and AI automation. No retainers. No surprises. Starting at $1,200.",
  path: "/pricing"
});

const pricingService = serviceJsonLd(
  "Sovereign website packages and automation implementation",
  "Fixed-price sovereign website packages, commerce builds, and automation implementation for service businesses."
);

export default function PricingPage() {
  const crumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Pricing", path: "/pricing" }
  ]);

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Pricing",
    url: `${SITE_URL}/pricing`
  };

  return (
    <PricingShell>
      <JsonLd data={webPage} />
      <JsonLd data={pricingService} />
      <JsonLd data={crumbs} />
      <PricingPageBody />
    </PricingShell>
  );
}
