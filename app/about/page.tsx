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
  title: { absolute: "Web Design & AI Built by a Bakersfield Operator | COAI" },
  description:
    "Jason Robert Manuel built COAI from 15+ years in Bakersfield operations, trades, and events. Web design and AI automation for local service businesses in the 661.",
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
