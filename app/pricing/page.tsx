import type { Metadata } from "next";
import Link from "next/link";
import { TrackedLink } from "@/components/TrackedLink";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd } from "@/lib/schema";

export const metadata: Metadata = pageMetadata({
  title: "Pricing — Signal, Commerce & Automation Layers",
  description:
    "Three-layer pricing ladder: foundation build, commerce engine, and sentinel automation. Every package flows to the growth diagnostic and sovereign infrastructure work.",
  path: "/pricing"
});

export default function PricingPage() {
  const crumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Pricing", path: "/pricing" }
  ]);

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Pricing Architecture",
    url: "https://chaoticallyorganizedai.com/pricing"
  };

  return (
    <main>
      <JsonLd data={webPage} />
      <JsonLd data={crumbs} />
      <h1 className="hero-title">Pricing Architecture</h1>
      <p className="muted">Three-layer build ladder. Every package flows to one action: Run My Growth Diagnostic.</p>
      <p className="muted">
        Scope details live on <Link href="/services">services</Link>. Book through{" "}
        <Link href="/intake">Run My Growth Diagnostic</Link> or <Link href="/contact">contact</Link> for custom
        sequencing.
      </p>
      <section className="grid">
        <article className="panel" id="package-1">
          <h2>Signal Foundation Build</h2>
          <p className="mono">Starting range: $2,500-$5,500</p>
          <p>Conversion messaging, mobile speed, SEO/AEO baseline, and lead capture controls.</p>
          <ul className="mono">
            <li>Core page architecture and technical cleanup</li>
            <li>Schema + local authority signal deployment</li>
            <li>Diagnostic-ready form and conversion funnel</li>
          </ul>
        </article>
        <article className="panel" id="package-2">
          <h2>Commerce Engine Layer</h2>
          <p className="mono">Starting range: $5,500-$12,000</p>
          <p>Store logic, catalog architecture, and transaction pathway quality assurance.</p>
          <ul className="mono">
            <li>Product/case content structure</li>
            <li>Checkout QA and path simplification</li>
            <li>Revenue attribution and lead source mapping</li>
          </ul>
        </article>
        <article className="panel" id="package-3">
          <h2>Sentinel Automation Layer</h2>
          <p className="mono">Starting range: custom scope</p>
          <p>AI qualification, missed-call recovery, and booking automation sequences.</p>
          <ul className="mono">
            <li>Automated triage logic</li>
            <li>Follow-up and routing workflows</li>
            <li>Dashboard visibility for operators</li>
          </ul>
        </article>
      </section>
      <section className="panel">
        <h2 className="mono">Decision Proof</h2>
        <p className="mono">
          Most owners choose after seeing one thing: clear leak math + a direct sequence to fix what is failing first.
        </p>
        <div className="hero-cta-row">
          <TrackedLink className="btn btn-primary" href="/intake" eventName="pricing_cta_click">
            Run My Growth Diagnostic
          </TrackedLink>
          <TrackedLink className="btn btn-ghost" href="/portfolio" eventName="pricing_proof_click">
            See Case Studies
          </TrackedLink>
        </div>
      </section>
    </main>
  );
}
