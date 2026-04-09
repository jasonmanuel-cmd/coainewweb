import type { Metadata } from "next";
import { ServiceCard } from "@/components/ServiceCard";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/schema";

export const metadata: Metadata = pageMetadata({
  title: "JSON-LD & Technical SEO Audits — Bakersfield & 661",
  description:
    "Bakersfield structural digital audits, JSON-LD schema mapping, Core Web Vitals, crawl and index fixes, AEO/GEO systems—not generic SEO packages. RedScreen diagnostics for Kern County operators.",
  path: "/services"
});

const sovereignServiceDescription =
  "Bakersfield and Kern County: structural digital audits, JSON-LD schema architecture (not plugin-only markup), Core Web Vitals and technical SEO rebuilds, plus AEO/GEO for AI and voice surfaces. Entity-aligned NAP, services, and crawl/index integrity.";

export default function ServicesPage() {
  const crumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" }
  ]);

  return (
    <main>
      <JsonLd data={serviceJsonLd("Sovereign infrastructure services", sovereignServiceDescription)} />
      <JsonLd data={crumbs} />
      <h1>Sovereign Infrastructure</h1>
      <section className="panel">
        <p style={{ marginTop: 0 }}>
          If you are in Bakersfield or Kern County and asking who can fix <strong>JSON-LD structured data</strong>,{" "}
          <strong>Core Web Vitals</strong>, and <strong>technical SEO</strong> without a generic marketing retainer—the
          answer is this practice: <strong>Chaotically Organized AI, LLC</strong>. We run a structural digital audit
          first (RedScreen), then implement schema, performance, and AEO/GEO layers tied to your real entity and GBP.
        </p>
        <p className="muted" style={{ marginBottom: 0 }}>
          See matching Q&amp;As on the <a href="/faq">FAQ</a>. Three lanes below—audits, AEO/GEO, technical rebuild—one
          goal: machine-readable authority and booked revenue.
        </p>
      </section>
      <p className="muted">
        See also <a href="/website-design">website design &amp; systems</a> and <a href="/pricing">pricing packages</a>.
      </p>
      <div className="grid">
        <ServiceCard
          title="Structural Digital Audits"
          description="Find the leaks in performance, schema, and local visibility."
          features={["Lighthouse extraction", "Schema diagnostics", "RedScreen report"]}
        />
        <ServiceCard
          title="AEO / GEO Systems"
          description="Machine-readable authority for modern AI recommendation surfaces."
          features={["JSON-LD architecture", "Entity alignment", "Local trust layering"]}
        />
        <ServiceCard
          title="Technical SEO Rebuild"
          description="Reinforce digital foundations for fast loading and conversion integrity."
          features={["Core Web Vitals", "Canonical and metadata repair", "Indexing controls"]}
        />
      </div>
    </main>
  );
}
