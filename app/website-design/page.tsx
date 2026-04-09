import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Website Design & Revenue Systems",
  description:
    "Websites as revenue systems: fast, structured, measurable, conversion paths. Complements structural audits and AEO/GEO on chaoticallyorganizedai.com.",
  path: "/website-design"
});

export default function WebsiteDesignPage() {
  const crumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Website design", path: "/website-design" }
  ]);

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Website Design & What We Do",
    url: `${SITE_URL}/website-design`
  };

  return (
    <main>
      <JsonLd data={webPage} />
      <JsonLd data={crumbs} />
      <h1 className="hero-title">Website Design & What We Do</h1>
      <p className="muted">
        We design websites as revenue systems: fast, structured, measurable, and built to convert traffic into booked
        work.
      </p>
      <p className="muted">
        Audits and schema work live under <Link href="/services">sovereign infrastructure services</Link>. Pricing
        layers: <Link href="/pricing">pricing architecture</Link>.
      </p>
      <section className="grid">
        <article className="panel">
          <h2>Design System</h2>
          <p className="mono">Minimal front page. Deep supporting pages. No clutter, no brochure bloat, clear conversion path.</p>
        </article>
        <article className="panel">
          <h2>Technical Foundation</h2>
          <p className="mono">Core Web Vitals tuning, schema architecture, canonical control, and index quality management.</p>
        </article>
        <article className="panel">
          <h2>Growth Operations</h2>
          <p className="mono">Lead capture, CRM-ready data flow, messaging automations, and dashboard-level visibility.</p>
        </article>
      </section>
      <section className="panel">
        <h2>What our web design includes</h2>
        <div className="grid">
          <article className="panel">
            <h3>Strategic structure</h3>
            <p className="mono">Homepage kept simple, support pages carry depth, one conversion path drives action.</p>
          </article>
          <article className="panel">
            <h3>Code quality</h3>
            <p className="mono">Clean Next.js architecture, fast loading, schema coverage, and conversion-safe forms.</p>
          </article>
          <article className="panel">
            <h3>Local authority build</h3>
            <p className="mono">Bakersfield-first messaging, map/entity alignment, FAQ answers tuned for AI retrieval.</p>
          </article>
          <article className="panel">
            <h3>Post-launch support</h3>
            <p className="mono">Content updates, proof pages, and growth iteration loops without bloating the UI.</p>
          </article>
        </div>
      </section>
    </main>
  );
}
