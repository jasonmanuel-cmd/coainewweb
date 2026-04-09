import type { Metadata } from "next";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd } from "@/lib/schema";
import { FOUNDER_ID, ORG_ID, SITE_URL } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Proof Pad — BakersfieldElectrical.com",
  description:
    "Deep-dive case entry: performance stabilization, ProfessionalService schema coverage, and audit-driven lead quality for a Bakersfield electrical property.",
  path: "/case-studies"
});

export default function CaseStudiesPage() {
  const crumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Case studies", path: "/case-studies" }
  ]);

  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "BakersfieldElectrical.com Case Study",
    url: `${SITE_URL}/case-studies`,
    dateModified: "2026-04-01",
    author: { "@type": "Person", "@id": FOUNDER_ID, name: "Jason Robert Manuel" },
    publisher: { "@id": ORG_ID }
  };

  return (
    <main>
      <JsonLd data={article} />
      <JsonLd data={crumbs} />
      <h1>Proof Pad</h1>
      <p className="muted">Last updated April 2026</p>
      <CaseStudyCard
        title="BakersfieldElectrical.com"
        summary="Proof locker entry showing ranking movement and stronger structured data signals."
        proofPoints={[
          "Performance stabilized for mobile-heavy traffic",
          "ProfessionalService schema coverage improved",
          "Lead quality shifted from passive inquiries to audit-driven action"
        ]}
        updatedAt="April 2026"
      />
    </main>
  );
}
