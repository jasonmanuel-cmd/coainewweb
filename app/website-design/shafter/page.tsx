import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/schema";
import { CONTACT, SITE_URL } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Website Design Shafter, CA",
  description: "Shafter website design for local service businesses: high-speed mobile pages, cleaner conversion UX, and structured local trust signals.",
  path: "/website-design/shafter"
});

const TICKER = ["SHAFTER WEB DESIGN", "CONVERSION UX", "LOCAL VISIBILITY", "MOBILE-FIRST", "KERN COUNTY"];

export default function ShafterWebsiteDesignPage() {
  const crumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Website design", path: "/website-design" },
    { name: "Shafter", path: "/website-design/shafter" }
  ]);
  const service = serviceJsonLd(
    "Shafter website design services",
    "Website design, schema implementation, and conversion architecture for Shafter businesses that need stronger local lead flow."
  );
  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Shafter Website Design",
    url: `${SITE_URL}/website-design/shafter`
  };

  return (
    <MarketingLayout tickerItems={TICKER} activeHref="/website-design">
      <JsonLd data={webPage} />
      <JsonLd data={crumbs} />
      <JsonLd data={service} />
      <div className="m-page-hero">
        <div className="m-page-hero-grid" aria-hidden="true" />
        <div className="m-page-hero-inner">
          <div className="m-section-label">Shafter, CA</div>
          <h1>Shafter <span className="m-text-green">Website Design</span></h1>
          <p className="m-hero-sub">
            We help Shafter operators replace slow, low-trust sites with conversion-first systems built for Google,
            AI search surfaces, and real call volume.
          </p>
          <div className="m-cta-row">
            <Link href="/intake" className="m-btn-primary">Run Shafter Diagnostic →</Link>
            <Link href="/website-design/kern-county" className="m-btn-ghost">Kern County Hub</Link>
            <Link href="/website-design/bakersfield" className="m-btn-ghost">Bakersfield</Link>
            <Link href="/website-design/delano" className="m-btn-ghost">Delano</Link>
            <Link href="/contact" className="m-btn-ghost">Contact</Link>
            <a href={`tel:${CONTACT.phoneE164}`} className="m-btn-ghost">Call {CONTACT.phoneDisplay}</a>
          </div>
        </div>
      </div>

      <section className="m-marketing-section">
        <div className="m-container-narrow">
          <div className="m-section-label">Shafter, CA</div>
          <h2 className="m-h2-marketing">
            Shafter is growing fast.<br />
            <span className="m-text-green">Your website should keep up.</span>
          </h2>
          <p style={{ color: "var(--text-soft)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
            Shafter has transformed from a small farming community into one of the fastest-growing logistics and
            distribution hubs in California. New warehouses, new industrial facilities, and a growing base of service
            businesses — HVAC, electrical, plumbing, landscaping — supporting the workforce living and working here.
          </p>
          <p style={{ color: "var(--text-soft)", lineHeight: 1.8 }}>
            The businesses that show up online when new Shafter residents search for local services are the ones that
            win the work. COAI builds websites built to rank in local search from day one.
          </p>
        </div>
      </section>

      <section className="m-marketing-section" style={{ background: "rgba(16,217,138,0.03)", borderTop: "1px solid rgba(16,217,138,0.08)", borderBottom: "1px solid rgba(16,217,138,0.08)" }}>
        <div className="m-container-wide">
          <div className="m-section-label">What We Build</div>
          <h2 className="m-h2-marketing">Every Shafter build includes <span className="m-text-green">these by default.</span></h2>
          <div className="m-principles-grid" style={{ marginTop: "2.5rem" }}>
            {[
              { title: "Mobile-first speed", desc: "Shafter workers are on mobile. Fast pages on a phone connection are non-negotiable — we build to sub-3-second load times as a baseline." },
              { title: "Service area coverage", desc: "We structure your site to rank for Shafter, Kern County, and nearby areas — the full geographic market your business serves." },
              { title: "Local schema markup", desc: "Structured data that establishes your business as a trusted Shafter entity in Google and AI systems. Required for local pack rankings." },
              { title: "Google Business Profile alignment", desc: "Consistent name, address, phone, and service data across your website and GBP. Mismatches suppress local rankings." },
              { title: "Conversion architecture", desc: "Clear tap-to-call, visible service descriptions, and trust signals placed where Shafter buyers look before making a decision." },
              { title: "No platform dependency", desc: "You own the code. No subscription. No monthly fee. No risk of a platform going down and taking your site with it." }
            ].map((item) => (
              <div key={item.title} className="m-principle-card">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="m-marketing-section">
        <div className="m-container-narrow">
          <div className="m-section-label">Pricing</div>
          <h2 className="m-h2-marketing">
            Shafter website builds<br />
            <span className="m-text-green">start at $1,200.</span>
          </h2>
          <p style={{ color: "var(--text-soft)", lineHeight: 1.8, marginBottom: "2rem" }}>
            One fixed price. No monthly fees. You own a site built to rank and convert from day one.
            Run the free diagnostic and see exactly what your current setup is missing.
          </p>
          <div className="m-cta-row">
            <Link href="/intake" className="m-btn-primary">Run Free Shafter Diagnostic →</Link>
            <Link href="/pricing" className="m-btn-ghost">View Pricing</Link>
            <a href={`tel:${CONTACT.phoneE164}`} className="m-btn-ghost">Call {CONTACT.phoneDisplay}</a>
          </div>
        </div>
      </section>

      <div className="m-bottom-cta">
        <div className="m-container-narrow" style={{ textAlign: "center" }}>
          <h2 className="m-h2-marketing">Ready to get found in <span className="m-text-green">Shafter?</span></h2>
          <div className="m-cta-row" style={{ justifyContent: "center" }}>
            <Link href="/intake" className="m-btn-primary">Run Free Audit →</Link>
            <Link href="/contact" className="m-btn-ghost">Talk to Jason</Link>
          </div>
        </div>
      </div>
    </MarketingLayout>
  );
}