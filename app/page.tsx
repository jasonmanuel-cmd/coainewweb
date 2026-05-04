import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { HubPage } from "@/components/HubPage";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Chaotically Organized AI — AI Tools for Local Business",
  description: "Three AI-powered tools to protect your leads, grow your business, and fix your website. LeadShield, Chaotically Organized AI, and SiteER.",
  openGraph: {
    title: "Chaotically Organized AI",
    description: "Three AI-powered tools to protect your leads, grow your business, and fix your website.",
    url: SITE_URL,
  }
};

export default function Home() {
  const homePage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Chaotically Organized AI — Hub",
    url: SITE_URL
  };

  return (
    <>
      <JsonLd data={homePage} />
      <HubPage />
    </>
  );
}
