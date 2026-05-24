import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd, organizationJsonLd } from "@/lib/schema";
import { CONTACT, SITE_URL } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Kern County Website Design",
  description:
    "Website design services for Kern County businesses: conversion-first builds, local schema, and ownership-first infrastructure.",
  path: "/website-design/kern-county"
});

export default function KernCountyWebsiteDesignPage() {
  const crumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Website design", path: "/website-design" },
    { name: "Kern County", path: "/website-design/kern-county" }
  ]);
  const org = organizationJsonLd();
  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Kern County Website Design Services",
    url: `${SITE_URL}/website-design/kern-county`,
    description: "Conversion-first website design, local SEO/AEO architecture, and schema implementation for Kern County businesses."
  };

  return (
    <MarketingLayout activeHref="/website-design">
      <JsonLd data={webPage} />
      <JsonLd data={crumbs} />
      <JsonLd data={org} />

      <div className="m-page-hero">
        <div className="m-page-hero-grid" aria-hidden="true" />
        <div className="m-page-hero-inner">
          <div className="m-section-label">Kern County Coverage</div>
          <h1>
            Website Design in <span className="m-text-green">Kern County</span>
          </h1>
          <p className="m-hero-sub">
            We build conversion-first websites for operators across Kern County with clean local schema, clear service
            architecture, and a system you own outright. Serving Bakersfield, Delano, Shafter, and every community in between.
          </p>
          <div className="m-cta-row">
            <Link href="/intake" className="m-btn-primary">
              Run My Free Diagnostic â†’
            </Link>
            <Link href="/website-design" className="m-btn-ghost">
              Website Design Hub
            </Link>
            <Link href="/contact" className="m-btn-ghost">
              Contact
            </Link>
            <a href={`tel:${CONTACT.phoneE164}`} className="m-btn-ghost">
              Call {CONTACT.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      <section className="m-marketing-section">
        <div className="m-container-wide">
          <div className="m-section-label">Kern County Coverage</div>
          <h2 className="m-h2-marketing">
            We serve trades and service businesses <span className="m-text-green">across all of Kern County.</span>
          </h2>
          <div className="m-text-block">
            <p>
              From Bakersfield to Delano, Shafter to Ridgecrest â€” Kern County operators face the same challenge: getting
              found online by local customers who are searching right now. Most trades websites in the 661 area are built
              on slow platforms with broken schema, buried contact info, and zero AI visibility.
            </p>
            <p>
              We fix that with hand-coded sovereign websites, LocalBusiness schema, and conversion architecture designed
              for one outcome: more phone calls and booked jobs. No templates, no monthly builder tax, no nonsense.
            </p>
          </div>
        </div>
      </section>

      <section className="m-marketing-section" style={{ background: "var(--m-surface)", borderTop: "1px solid var(--m-border)" }}>
        <div className="m-container-wide">
          <div className="m-section-label">What We Build</div>
          <h2 className="m-h2-marketing">
            Every Kern County site ships with <span className="m-text-green">6 core systems.</span>
          </h2>
          <div className="m-feature-grid">
            {[
              { icon: "âš¡", title: "Speed", desc: "Sub-3s mobile load times. Kern County searches are overwhelmingly mobile." },
              { icon: "ðŸ“", title: "Local Schema", desc: "LocalBusiness + Service schema for every city we serve." },
              { icon: "ðŸ“ž", title: "Lead Capture", desc: "Forms, click-to-call, intake â€” every visitor hits a conversion path." },
              { icon: "ðŸ—ºï¸", title: "GBP Alignment", desc: "Entity schema synced with your Google Business Profile." },
              { icon: "ðŸ¤–", title: "AI Readiness", desc: "Content structured for AIO, SGE, and voice assistant citations." },
              { icon: "ðŸ”", title: "Full Ownership", desc: "Custom code, your domain, your data. No platform lock-in ever." }
            ].map(f => (
              <div key={f.title} className="m-feature-card">
                <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{f.icon}</div>
                <h3 style={{ fontSize: "1rem", marginBottom: "0.3rem", color: "var(--m-white)" }}>{f.title}</h3>
                <p style={{ fontSize: "0.85rem", color: "var(--m-muted)", lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="m-marketing-section">
        <div className="m-container-wide">
          <div className="m-section-label">Locations</div>
          <h2 className="m-h2-marketing">
            Kern County pages built for <span className="m-text-green">local intent</span>
          </h2>
          <p style={{ color: "var(--m-muted)", maxWidth: 640, margin: "0 auto 1.5rem", textAlign: "center" }}>
            Each location page is independently written with city-specific content, schema, and conversion paths. 
            No copy-paste. No cookie-cutter.
          </p>
          <div className="m-cta-row">
            <Link href="/website-design/bakersfield" className="m-btn-ghost">
              Bakersfield Website Design
            </Link>
            <Link href="/website-design/delano" className="m-btn-ghost">
              Delano Website Design
            </Link>
            <Link href="/website-design/shafter" className="m-btn-ghost">
              Shafter Website Design
            </Link>
          </div>
        </div>
      </section>

      <div className="m-bottom-cta">
        <div className="m-section-label">Start Here</div>
        <h2>
          Run the free diagnostic.
          <br />
          <span className="m-text-green">See your actual numbers.</span>
        </h2>
        <p>
          30 minutes. Real data. Clear roadmap. Whether you hire us or not, you leave with actionable intelligence about
          your digital presence.
        </p>
        <div className="m-cta-row">
          <Link href="/intake" className="m-btn-primary">
            Run My Free Diagnostic â†’
          </Link>
          <Link href="/pricing" className="m-btn-ghost">
            See Pricing
          </Link>
        </div>
      </div>
    </MarketingLayout>
  );
}
