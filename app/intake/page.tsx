import type { Metadata } from "next";
import { IntakeWizard } from "@/components/intake/IntakeWizard";
import { JsonLd } from "@/components/JsonLd";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Run My Diagnostic",
  description:
    "Run your free digital growth diagnostic. See your visibility score, revenue leak estimate, and priority fix list.",
  path: "/intake"
});

const TICKER = [
  "GROWTH DIAGNOSTIC",
  "FREE · NO PRESSURE",
  "30 SECONDS",
  "REAL DATA",
  "CLEAR ROADMAP",
  "GROWTH DIAGNOSTIC",
  "FREE · NO PRESSURE",
  "30 SECONDS",
  "REAL DATA",
  "CLEAR ROADMAP"
];

export default async function IntakePage({
  searchParams
}: {
  searchParams: Promise<{ pkg?: string | string[] }>;
}) {
  const sp = await searchParams;
  const raw = sp.pkg;
  const pkg = Array.isArray(raw) ? raw[0] : raw;
  const packageInterest = pkg && ["1", "2", "3"].includes(pkg) ? pkg : undefined;

  const crumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Growth diagnostic", path: "/intake" }
  ]);

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Run My Diagnostic",
    url: `${SITE_URL}/intake`
  };

  return (
    <MarketingLayout tickerItems={TICKER} activeHref="/intake">
      <JsonLd data={webPage} />
      <JsonLd data={crumbs} />
      <IntakeWizard packageInterest={packageInterest} />
    </MarketingLayout>
  );
}
