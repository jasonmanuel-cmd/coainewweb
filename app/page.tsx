import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/JsonLd";
import { ScoreCard } from "@/components/ScoreCard";
import Link from "next/link";
import { webSiteJsonLd } from "@/lib/schema";
import { SITE_DESCRIPTION, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "Structural Digital Audits & AEO | Bakersfield 661" },
  description: SITE_DESCRIPTION,
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "Structural Digital Audits & AEO | Bakersfield 661",
    description: SITE_DESCRIPTION,
    url: "https://chaoticallyorganizedai.com",
    siteName: "Chaotically Organized AI",
    images: [{ url: "/logo.png", width: 1200, height: 630 }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Structural Digital Audits & AEO | Bakersfield 661",
    description: SITE_DESCRIPTION,
    images: ["/logo.png"]
  }
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={webSiteJsonLd()} />
      <section className="panel mono">
        <p style={{ margin: 0 }}>Recent diagnostic signal: 74 performance / 56 schema / 61 AEO readiness baseline.</p>
      </section>
      <Hero />
      <section className="grid">
        <ScoreCard label="Performance Baseline" value={0.74} />
        <ScoreCard label="Schema Signal" value={0.56} />
        <ScoreCard label="AEO Readiness" value={0.61} />
      </section>
      <section className="panel">
        <h2 className="mono">ROI Calculator Logic</h2>
        <p className="mono">(Missed Calls Per Day x 30.4) x Closing Rate x Average Ticket</p>
        <p className="muted">Keep the front page simple: diagnostic trigger + proof + offer ladder.</p>
        <div className="hero-cta-row">
          <Link className="btn btn-primary" href="/intake">
            Run My Growth Diagnostic
          </Link>
          <Link className="btn btn-ghost" href="/portfolio">
            See Case Studies
          </Link>
          <Link className="btn btn-ghost" href="/faq">
            Read the FAQ
          </Link>
          <Link className="btn btn-ghost" href="/jax-coming-soon">
            Explore JAX Brief
          </Link>
        </div>
      </section>
      <section className="panel">
        <h2 className="mono">Sovereign Proof Stack</h2>
        <div className="grid">
          <article className="panel">
            <h3>Infrastructure Ownership</h3>
            <p className="mono">No rented funnel dependency. One codebase, one data ledger, one accountable operator path.</p>
          </article>
          <article className="panel">
            <h3>Process Clarity</h3>
            <p className="mono">Audit to diagnosis to prioritized fix list to tracked outcomes. No vague retainers.</p>
          </article>
          <article className="panel">
            <h3>Local Precision</h3>
            <p className="mono">Bakersfield and 661 entity alignment across schema, GBP, and conversion-ready content.</p>
          </article>
        </div>
      </section>
    </>
  );
}
