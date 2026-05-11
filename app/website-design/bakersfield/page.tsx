import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/schema";
import { CONTACT, SITE_URL } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Website Design Bakersfield, CA",
  description: "Bakersfield website design for service businesses. Conversion-first websites with local schema, fast mobile performance, and full ownership.",
  path: "/website-design/bakersfield"
});

const TICKER = ["BAKERSFIELD WEB DESIGN", "LOCAL SEO", "AEO READY", "SCHEMA", "SOVEREIGN BUILDS"];

export default function BakersfieldWebsiteDesignPage() {
  const crumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Website design", path: "/website-design" },
    { name: "Bakersfield", path: "/website-design/bakersfield" }
  ]);
  const service = serviceJsonLd(
    "Bakersfield website design services",
    "Website design and local search architecture for Bakersfield businesses that need faster conversion and clearer trust signals."
  );
  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Bakersfield Website Design",
    url: `${SITE_URL}/website-design/bakersfield`
  };

  return (
    <MarketingLayout tickerItems={TICKER} activeHref="/website-design">
      <JsonLd data={webPage} />
      <JsonLd data={crumbs} />
      <JsonLd data={service} />
      <div className="m-page-hero">
        <div className="m-page-hero-grid" aria-hidden="true" />
        <div className="m-page-hero-inner">
          <div className="m-section-label">Bakersfield, CA</div>
          <h1>Bakersfield <span className="m-text-green">Website Design</span></h1>
          <p className="m-hero-sub">
            We design and deploy high-conversion websites for Bakersfield operators who need speed, local visibility,
            and a system they fully own.
          </p>
          <div className="m-cta-row">
            <Link href="/intake" className="m-btn-primary">Get My Free Bakersfield Audit →</Link>
            <Link href="/website-design/kern-county" className="m-btn-ghost">Kern County Hub</Link>
            <Link href="/website-design/delano" className="m-btn-ghost">Delano</Link>
            <Link href="/website-design/shafter" className="m-btn-ghost">Shafter</Link>
            <Link href="/contact" className="m-btn-ghost">Contact</Link>
            <a href={`tel:${CONTACT.phoneE164}`} className="m-btn-ghost">Call {CONTACT.phoneDisplay}</a>
          </div>
        </div>
      </div>

      <section className="m-marketing-section">
        <div className="m-container-narrow">
          <div className="m-section-label">Why It Matters Here</div>
          <h2 className="m-h2-marketing">
            Bakersfield businesses are<br />
            <span className="m-text-green">losing jobs to bad websites.</span>
          </h2>
          <p style={{ color: "var(--text-soft)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
            Bakersfield runs on trades. Oil field services, HVAC, plumbing, roofing, landscaping, construction —
            the 661 economy is built by people who work with their hands. Most of those businesses have either no
            website or one built in 2015 and never touched since.
          </p>
          <p style={{ color: "var(--text-soft)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
            87% of consumers research local businesses online before calling. In Bakersfield&apos;s mobile-first market
            — where most searches happen on a phone between jobs or after hours — a slow or broken website means your
            phone doesn&apos;t ring while your competitor&apos;s does.
          </p>
          <p style={{ color: "var(--text-soft)", lineHeight: 1.8 }}>
            COAI builds websites specifically for Bakersfield operators. Not templates. Not page builders with monthly
            fees. Real code, real performance, and a structure built from day one to rank in local search.
          </p>
        </div>
      </section>

      <section className="m-marketing-section" style={{ background: "rgba(16,217,138,0.03)", borderTop: "1px solid rgba(16,217,138,0.08)", borderBottom: "1px solid rgba(16,217,138,0.08)" }}>
        <div className="m-container-wide">
          <div className="m-section-label">What We Build</div>
          <h2 className="m-h2-marketing">Every Bakersfield site includes <span className="m-text-green">these by default.</span></h2>
          <div className="m-principles-grid" style={{ marginTop: "2.5rem" }}>
            {[
              { title: "Mobile-first performance", desc: "Over 70% of Bakersfield searches happen on mobile. We build for sub-3-second load times on phones." },
              { title: "Local schema markup", desc: "Structured data that tells Google exactly what your business is, where you are, and what you serve. Required for local pack and AI search rankings." },
              { title: "Google Business Profile alignment", desc: "Your website and GBP need to say the same thing. We align both so they reinforce each other and improve your local pack visibility." },
              { title: "Conversion-first layout", desc: "Tap-to-call above the fold. Clear service descriptions. Trust signals where skeptical buyers look first. Design that earns the call." },
              { title: "Full code ownership", desc: "No Wix. No Squarespace. You get the source code and a site you fully own — no ongoing platform fees." },
              { title: "SEO from day one", desc: "Title tags, meta descriptions, local keywords, and heading structure built in from the start. Your site starts earning traffic the day it goes live." }
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
            Bakersfield website builds<br />
            <span className="m-text-green">start at $1,200.</span>
          </h2>
          <p style={{ color: "var(--text-soft)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
            One fixed price. No monthly fees. No retainer. No platform dependency. You pay once and own a website
            built to last and rank.
          </p>
          <p style={{ color: "var(--text-soft)", lineHeight: 1.8, marginBottom: "2rem" }}>
            The Signal Foundation package covers everything a Bakersfield service business needs: conversion-first
            design, mobile performance, local schema, GBP alignment, and full code ownership.
          </p>
          <div className="m-cta-row">
            <Link href="/pricing" className="m-btn-primary">See Full Pricing →</Link>
            <Link href="/intake" className="m-btn-ghost">Get Free Audit</Link>
          </div>
        </div>
      </section>

      <section className="m-marketing-section" style={{ background: "rgba(16,217,138,0.03)", borderTop: "1px solid rgba(16,217,138,0.08)", borderBottom: "1px solid rgba(16,217,138,0.08)" }}>
        <div className="m-container-narrow">
          <div className="m-section-label">FAQ</div>
          <h2 className="m-h2-marketing">Questions Bakersfield <span className="m-text-green">business owners ask</span></h2>
          <div style={{ marginTop: "2rem", display: "flex", flexDirection: "column", gap: "2rem" }}>
            {[
              { q: "Do I really need a website if I already have a Google Business Profile?", a: "Yes. Your GBP shows you exist — your website is what convinces someone to call instead of your competitor. Businesses with both convert at a significantly higher rate." },
              { q: "How long does it take to build my site?", a: "Most Bakersfield builds are live in 2-3 weeks from when we have your content. The timeline depends almost entirely on how quickly you send us what we need." },
              { q: "Do I own the website when it is done?", a: "100%. You get the source code, domain setup, and hosting credentials. No ongoing fees to COAI unless you choose to add a maintenance or automation package." }
            ].map(({ q, a }) => (
              <div key={q} style={{ borderLeft: "2px solid rgba(16,217,138,0.3)", paddingLeft: "1.5rem" }}>
                <h3 style={{ color: "#fff", fontSize: "1rem", fontWeight: 700, marginBottom: "0.5rem" }}>{q}</h3>
                <p style={{ color: "var(--text-soft)", lineHeight: 1.7, margin: 0 }}>{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="m-bottom-cta">
        <div className="m-container-narrow" style={{ textAlign: "center" }}>
          <h2 className="m-h2-marketing">Ready to get found in <span className="m-text-green">Bakersfield?</span></h2>
          <p style={{ color: "var(--text-soft)", marginBottom: "2rem" }}>
            Run the free diagnostic and see your visibility score, lead leak estimate, and what a proper site would change.
          </p>
          <div className="m-cta-row" style={{ justifyContent: "center" }}>
            <Link href="/intake" className="m-btn-primary">Run Free Bakersfield Audit →</Link>
            <Link href="/contact" className="m-btn-ghost">Talk to Jason</Link>
          </div>
        </div>
      </div>
    </MarketingLayout>
  );
}