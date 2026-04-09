import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd } from "@/lib/schema";

export const metadata: Metadata = pageMetadata({
  title: "Lead & Call Management Dashboard",
  description:
    "Command-center view for lead intake, qualification, missed-call recovery, and pipeline attribution—aligned with JAX and Sentinel automation layers.",
  path: "/dashboard"
});

export default function DashboardPage() {
  const crumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/dashboard" }
  ]);

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "AI Call & Lead Management Dashboard",
    url: "https://chaoticallyorganizedai.com/dashboard"
  };

  return (
    <main>
      <JsonLd data={webPage} />
      <JsonLd data={crumbs} />
      <h1 className="hero-title">AI Call & Lead Management Dashboard</h1>
      <p className="muted">
        Operational view for lead intake, qualification status, and follow-up routing. This page is positioned as the command center layer.
      </p>
      <p className="muted">
        Pairs with <Link href="/jax-coming-soon">JAX Brief</Link> and <Link href="/pricing">Sentinel automation pricing</Link>.
      </p>
      <section className="grid">
        <article className="panel">
          <h2>Lead Queue</h2>
          <p className="mono">Track each intake from first audit to booked discovery call.</p>
        </article>
        <article className="panel">
          <h2>Missed-Call Recovery</h2>
          <p className="mono">Automate callbacks and text follow-up to reduce silent revenue leakage.</p>
        </article>
        <article className="panel">
          <h2>Pipeline Attribution</h2>
          <p className="mono">Connect source, intent, and close outcomes for operator-level decisions.</p>
        </article>
      </section>
    </main>
  );
}
