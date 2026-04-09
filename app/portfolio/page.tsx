import type { Metadata } from "next";
import Link from "next/link";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { JsonLd } from "@/components/JsonLd";
import { PortfolioEventBeacon } from "@/components/PortfolioEventBeacon";
import { TrackedLink } from "@/components/TrackedLink";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd } from "@/lib/schema";
import { ORG_ID, SITE_URL } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Case Studies — Proof & Outcomes",
  description:
    "Evidence-first outcomes: BakersfieldElectrical.com authority rebuild, RedScreen diagnostic methodology, and schema-driven visibility for local operators.",
  path: "/portfolio"
});

export default function PortfolioPage() {
  const crumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Case studies", path: "/portfolio" }
  ]);

  const collection = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Case Study Locker",
    url: `${SITE_URL}/portfolio`,
    publisher: { "@id": ORG_ID }
  };

  return (
    <main>
      <PortfolioEventBeacon />
      <JsonLd data={collection} />
      <JsonLd data={crumbs} />
      <h1 className="hero-title">Case Study Locker</h1>
      <p className="muted">Evidence-first outcomes for local contractors and service operators.</p>
      <p className="muted">
        Next step: <Link href="/intake">Run My Growth Diagnostic</Link> or read the{" "}
        <Link href="/faq">FAQ</Link>.
      </p>
      <div className="grid">
        <CaseStudyCard
          title="BakersfieldElectrical.com"
          summary="Proof model for authority rebuilding, speed correction, and conversion recovery."
          proofPoints={[
            "Visibility regained through structural repairs",
            "Schema layer improved relevance in AI-driven search surfaces",
            "Lead quality shifted toward higher-intent owner inquiries"
          ]}
          updatedAt="April 2026"
        />
        <CaseStudyCard
          title="RedScreen Method"
          summary="Diagnostic-first engagement model that exposes leaks before any rebuild proposal."
          proofPoints={[
            "Fail-first framing increases action rate",
            "Single CTA map reduces conversion friction",
            "Audit reports become reusable sales intelligence"
          ]}
          updatedAt="April 2026"
        />
      </div>
      <section className="panel">
        <h2 className="mono">Incoming Case Study Templates</h2>
        <div className="grid">
          <article className="panel">
            <h3>Template A: Service Operator</h3>
            <p className="mono">Baseline: [traffic + lead quality] | Intervention: [speed/schema/funnel] | Outcome: [booking lift] | Timeline: [weeks]</p>
          </article>
          <article className="panel">
            <h3>Template B: Contractor Local Market</h3>
            <p className="mono">Baseline: [visibility gaps] | Intervention: [entity alignment + FAQ AEO] | Outcome: [AI citation + call volume] | Timeline: [weeks]</p>
          </article>
          <article className="panel">
            <h3>Template C: Commerce Funnel</h3>
            <p className="mono">Baseline: [drop-off + speed] | Intervention: [checkout + architecture] | Outcome: [conversion rate delta] | Timeline: [days/weeks]</p>
          </article>
        </div>
        <div className="hero-cta-row">
          <TrackedLink className="btn btn-primary" href="/intake" eventName="case_study_cta_click">
            Run My Growth Diagnostic
          </TrackedLink>
        </div>
      </section>
    </main>
  );
}
