import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { LandingHomeRevamp } from "@/components/revamp/LandingHome";
import { homeMetadata } from "@/lib/metadata";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = homeMetadata;

export default function HomePage() {
  const homePage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Chaotically Organized AI",
    url: `${SITE_URL}/home`
  };

  return (
    <>
      <JsonLd data={homePage} />
      <LandingHomeRevamp />
    </>
  );
}
