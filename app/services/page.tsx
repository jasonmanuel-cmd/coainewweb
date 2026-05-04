import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { ServicesMarketingContent } from "@/components/services/ServicesMarketingContent";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/schema";

const TICKER = [
  "SERVICES",
  "STRUCTURAL AUDIT",
  "AEO SYSTEMS",
  "AI AUTOMATION",
  "SOVEREIGN BUILDS",
  "MISSED CALL RECOVERY"
];

const sovereignServiceDescription =
  "Structural digital audits, AI automation, and sovereign website builds for Bakersfield operators — infrastructure you own outright.";

export const metadata: Metadata = pageMetadata({
  title: "Services | Chaotically Organized AI — Bakersfield 661",
  description:
    "Structural audits, AEO systems, AI automation, and sovereign website builds for Bakersfield operators. See exactly what COAI delivers.",
  path: "/services"
});

export default function ServicesPage() {
  const crumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" }
  ]);

  return (
    <MarketingLayout tickerItems={TICKER} activeHref="/services">
      <JsonLd data={serviceJsonLd("Sovereign infrastructure services", sovereignServiceDescription)} />
      <JsonLd data={crumbs} />
      <ServicesMarketingContent />
      <div className="m-bottom-cta">
        <div className="m-section-label">Service Paths</div>
        <h2>
          Build your local visibility stack.
          <br />
          <span className="m-text-green">Choose your next step.</span>
        </h2>
        <div className="m-cta-row">
          <Link href="/website-design" className="m-btn-primary">
            Website Design Hub →
          </Link>
          <Link href="/website-design/kern-county" className="m-btn-ghost">
            Kern County Web Design
          </Link>
          <Link href="/intake" className="m-btn-ghost">
            Run Diagnostic
          </Link>
          <Link href="/contact" className="m-btn-ghost">
            Contact
          </Link>
        </div>
      </div>
    </MarketingLayout>
  );
}
