import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/schema";
import { CONTACT, SITE_URL } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Website Design Delano, CA",
  description: "Delano website design focused on local lead conversion, mobile speed, and entity schema for better Google and AI visibility.",
  path: "/website-design/delano"
});

const TICKER = ["DELANO WEB DESIGN", "LOCAL LEAD FLOW", "SCHEMA", "MOBILE SPEED", "KERN COUNTY"];

export default function DelanoWebsiteDesignPage() {
  const crumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Website design", path: "/website-design" },
    { name: "Delano", path: "/website-design/delano" }
  ]);
  const service = serviceJsonLd(
    "Delano website design services",
    "Website design and local search architecture for Delano businesses that need more calls, form submissions, and clear trust signals."
  );
  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Delano Website Design",
    url: `${SITE_URL}/website-design/delano`
  };

  return (
    <MarketingLayout tickerItems={TICKER} activeHref="/website-design">
      <JsonLd data={webPage} />
      <JsonLd data={crumbs} />
      <JsonLd data={service} />
      <div className="m-page-hero">
        <div className="m-page-hero-grid" aria-hidden="true" />
        <div className="m-page-hero-inner">
          <div className="m-section-label">Delano, CA</div>
          <h1>Delano <span className="m-text-green">Website Design</span></h1>
          <p className="m-hero-sub">
            For Delano businesses, we build fast websites that convert visitors into calls with local-intent page
            structure, schema clarity, and bilingual capability.
          </p>
          <div className="m-cta-row">
            <Link href="/intake" className="m-btn-primary">Run Delano Diagnostic →</Link>
            <Link href="/website-design/kern-county" className="m-btn-ghost">Kern County Hub</Link>
            <Link href="/website-design/bakersfield" className="m-btn-ghost">Bakersfield</Link>
            <Link href="/website-design/shafter" className="m-btn-ghost">Shafter</Link>
            <Link href="/contact" className="m-btn-ghost">Contact</Link>
            <a href={`tel:${CONTACT.phoneE164}`} className="m-btn-ghost">Call {CONTACT.phoneDisplay}</a>
          </div>
        </div>
      </div>

      <section className="m-marketing-section">
        <div className="m-container-narrow">
          <div className="m-section-label">Delano, CA</div>
          <h2 className="m-h2-marketing">
            Delano businesses deserve<br />
            <span className="m-text-green">a website that works as hard as they do.</span>
          </h2>
          <p style={{ color: "var(--text-soft)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
            Delano is an agricultural and service business community. Most businesses here are owner-operated — the
            owner is answering calls, doing the work, and trying to grow. COAI builds websites for exactly that
            situation: a site that runs on its own, capturing leads and ranking in local search, so you can focus
            on the work.
          </p>
          <p style={{ color: "var(--text-soft)", lineHeight: 1.8 }}>
            We also build bilingual websites. Delano&apos;s community is predominantly Spanish-speaking, and a site
            that serves customers in their preferred language converts significantly better. Ask us about bilingual builds.
          </p>
        </div>
      </section>

      <section className="m-marketing-section" style={{ background: "rgba(16,217,138,0.03)", borderTop: "1px solid rgba(16,217,138,0.08)", borderBottom: "1px solid rgba(16,217,138,0.08)" }}>
        <div className="m-container-wide">
          <div className="m-section-label">What We Build</div>
          <h2 className="m-h2-marketing">Every Delano build includes <span className="m-text-green">these by default.</span></h2>
          <div className="m-principles-grid" style={{ marginTop: "2.5rem" }}>
            {[
              { title: "Mobile-first performance", desc: "Most Delano customers search on mobile. We build for fast load times — a slow site means they call someone else." },
              { title: "Bilingual capability", desc: "We build in English, Spanish, or both. Bilingual sites in Delano reach a significantly larger share of the local market." },
              { title: "Local schema markup", desc: "Structured data that establishes your business in Delano and Kern County across Google and AI search systems." },
              { title: "Google Business Profile alignment", desc: "We align your website and GBP so they reinforce each other and improve your visibility in local search." },
              { title: "Conversion-first layout", desc: "Tap-to-call above the fold. Clear service descriptions in the language your customers speak. Design that earns the call." },
              { title: "Full ownership", desc: "No platforms. No monthly fees. You own the code and the site outright when we hand it off." }
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
            Delano website builds<br />
            <span className="m-text-green">start at $1,200.</span>
          </h2>
          <p style={{ color: "var(--text-soft)", lineHeight: 1.8, marginBottom: "2rem" }}>
            One fixed price. No monthly fees. No retainer. The free diagnostic shows exactly what your current setup
            is missing and what fixing it would be worth.
          </p>
          <div className="m-cta-row">
            <Link href="/intake" className="m-btn-primary">Run Free Delano Diagnostic →</Link>
            <Link href="/pricing" className="m-btn-ghost">View Pricing</Link>
            <a href={`tel:${CONTACT.phoneE164}`} className="m-btn-ghost">Call {CONTACT.phoneDisplay}</a>
          </div>
        </div>
      </section>

      <div className="m-bottom-cta">
        <div className="m-container-narrow" style={{ textAlign: "center" }}>
          <h2 className="m-h2-marketing">Ready to get found in <span className="m-text-green">Delano?</span></h2>
          <div className="m-cta-row" style={{ justifyContent: "center" }}>
            <Link href="/intake" className="m-btn-primary">Run Free Audit →</Link>
            <Link href="/contact" className="m-btn-ghost">Talk to Jason</Link>
          </div>
        </div>
      </div>
    </MarketingLayout>
  );
}