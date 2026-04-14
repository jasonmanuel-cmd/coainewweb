import type { Metadata } from "next";
import { AboutMarketingContent } from "@/components/about/AboutMarketingContent";
import { JsonLd } from "@/components/JsonLd";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd } from "@/lib/schema";
import { ORG_ID, SITE_URL } from "@/lib/site";

const TICKER = [
  "ABOUT COAI",
  "JASON ROBERT MANUEL",
  "FOUNDER & CEO",
  "BAKERSFIELD 661",
  "TEAM GOOD PROTOCOL",
  "WHERE CHAOS MEETS CLARITY"
];

export const metadata: Metadata = pageMetadata({
  title: "About | Chaotically Organized AI — Bakersfield 661",
  description:
    "Jason Robert Manuel — founder of Chaotically Organized AI. 15+ years in operations, trades, and events. Building sovereign infrastructure for Bakersfield operators.",
  path: "/about"
});

export default function AboutPage() {
  const crumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "About", path: "/about" }
  ]);

  const aboutPage = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Chaotically Organized AI",
    url: `${SITE_URL}/about`,
    mainEntity: { "@id": ORG_ID }
  };

  return (
    <MarketingLayout tickerItems={TICKER} activeHref="/about">
      <JsonLd data={aboutPage} />
      <JsonLd data={crumbs} />
      <AboutMarketingContent />
    </MarketingLayout>
  );
}
