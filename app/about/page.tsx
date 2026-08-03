import type { Metadata } from "next";
import { AboutMarketingContent } from "@/components/about/AboutMarketingContent";
import { JsonLd } from "@/components/JsonLd";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { pageMetadata } from "@/lib/metadata";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/schema";
import { ORG_ID, SITE_URL } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: { absolute: "About | Chaotically Organized AI - Bakersfield 661" },
  description:
    "Jason Robert Manuel, founder of Chaotically Organized AI. A contractor who codes, building revenue intake systems for Bakersfield operators.",
  path: "/about",
  published: "2026-01-15",
  modified: "2026-04-15",
});

export default function AboutPage() {
  const crumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "About", path: "/about" }
  ]);
  const aboutArticle = articleJsonLd({
    headline: "About Chaotically Organized AI — Jason Robert Manuel",
    description:
      "Jason Robert Manuel, founder of Chaotically Organized AI. A contractor who codes, building call-first websites and lead recovery for Bakersfield, CA operators.",
    path: "/about",
    datePublished: "2026-01-15",
    dateModified: "2026-04-15",
  });

  const aboutPage = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Chaotically Organized AI",
    url: `${SITE_URL}/about`,
    mainEntity: { "@id": ORG_ID }
  };

  return (
    <MarketingLayout activeHref="/about">
      <JsonLd data={aboutArticle} />
      <JsonLd data={aboutPage} />
      <JsonLd data={crumbs} />
      <AboutMarketingContent />
    </MarketingLayout>
  );
}
