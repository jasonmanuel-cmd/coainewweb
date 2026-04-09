import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd } from "@/lib/schema";

export const metadata: Metadata = pageMetadata({
  title: "JAX Sentinel Technical Brief",
  description:
    "Preview of JAX automation: intake triage, missed-call recovery, booking handoffs, and operator controls for sovereign lead systems.",
  path: "/jax-coming-soon"
});

export default function JaxComingSoonPage() {
  const crumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "JAX Brief", path: "/jax-coming-soon" }
  ]);

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "JAX Sentinel Technical Brief",
    url: "https://chaoticallyorganizedai.com/jax-coming-soon"
  };

  return (
    <main>
      <JsonLd data={webPage} />
      <JsonLd data={crumbs} />
      <h1 className="hero-title">JAX Sentinel Technical Brief</h1>
      <p className="muted">
        Deep technical authority page for automation architecture, qualification routing, and compliance-aware outreach behavior.
      </p>
      <p className="muted">
        Related: <Link href="/pricing">automation layer pricing</Link> · <Link href="/dashboard">dashboard vision</Link>
      </p>
      <section className="panel" id="technical-brief">
        <h2>JAX Preview Interface</h2>
        <ul className="mono">
          <li>Real-time intake triage and priority scoring</li>
          <li>Missed-call recovery with structured response trees</li>
          <li>Calendar handoff logic with conflict-safe booking paths</li>
          <li>Operator override controls and full event auditing</li>
        </ul>
      </section>
    </main>
  );
}
