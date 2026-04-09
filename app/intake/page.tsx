import type { Metadata } from "next";
import { AuditForm } from "@/components/AuditForm";
import { GrowthCalculator } from "@/components/GrowthCalculator";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd } from "@/lib/schema";
import { TrackedLink } from "@/components/TrackedLink";

export const metadata: Metadata = pageMetadata({
  title: "Run My Growth Diagnostic",
  description:
    "Primary conversion endpoint: submit your URL and contact data for a RedScreen summary and follow-up from Chaotically Organized AI in Bakersfield.",
  path: "/intake"
});

export default function IntakePage() {
  const crumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Growth diagnostic", path: "/intake" }
  ]);

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Run My Growth Diagnostic",
    url: "https://chaoticallyorganizedai.com/intake"
  };

  return (
    <main>
      <JsonLd data={webPage} />
      <JsonLd data={crumbs} />
      <h1 className="hero-title">Run My Growth Diagnostic</h1>
      <p className="muted">
        Primary conversion endpoint. Submit your URL and contact data to receive a RedScreen summary and direct follow-up.
      </p>
      <p className="muted">
        Questions first? See the <TrackedLink href="/faq" eventName="intake_faq_click">FAQ</TrackedLink> or{" "}
        <TrackedLink href="/services" eventName="intake_services_click">services overview</TrackedLink>.
      </p>
      <AuditForm />
      <GrowthCalculator />
      <section className="panel">
        <h2 className="mono">Proof Next</h2>
        <p className="muted">After this diagnostic, review implementation outcomes before final package selection.</p>
        <div className="hero-cta-row">
          <TrackedLink className="btn btn-ghost" href="/portfolio" eventName="intake_proof_click">
            See Case Studies
          </TrackedLink>
          <TrackedLink className="btn btn-ghost" href="/pricing" eventName="intake_pricing_click">
            View Pricing
          </TrackedLink>
        </div>
      </section>
    </main>
  );
}
