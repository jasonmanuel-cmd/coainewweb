import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/schema";
import { CONTACT, SITE_URL } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Local SEO & AEO for Bakersfield Service Businesses | COAI",
  description:
    "Structural SEO and Answer Engine Optimization for Bakersfield contractors, trades, and service businesses. Get found on Google and AI search. Free diagnostic, starting at $1,200.",
  path: "/seo-bakersfield"
});

const TICKER = ["SEO BAKERSFIELD", "LOCAL SEO 661", "AEO READY", "GOOGLE RANKING", "AI SEARCH VISIBILITY"];

export default function SeoBakersfieldPage() {
  const crumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "SEO Bakersfield", path: "/seo-bakersfield" }
  ]);
  const service = serviceJsonLd(
    "Local SEO & AEO for Bakersfield Service Businesses",
    "Structural SEO and Answer Engine Optimization for Bakersfield trades and contractors. Fast pages, clean schema, local entity signals, and AI search visibility.",
    "/seo-bakersfield"
  );
  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Local SEO & AEO for Bakersfield Service Businesses | COAI",
    url: `${SITE_URL}/seo-bakersfield`
  };

  return (
    <MarketingLayout tickerItems={TICKER} activeHref="/services">
      <JsonLd data={webPage} />
      <JsonLd data={crumbs} />
      <JsonLd data={service} />

      <div className="m-page-hero">
        <div className="m-page-hero-grid" aria-hidden="true" />
        <div className="m-page-hero-inner">
          <div className="m-section-label">SEO · AEO · Local Visibility</div>
          <h1>
            Local SEO &amp; AEO for<br />
            <span className="m-text-green">Bakersfield Service Businesses</span>
          </h1>
          <p className="m-hero-sub">
            If your business isn&apos;t showing up when Bakersfield customers search on Google — or when they
            ask ChatGPT or Google AI who to call — you&apos;re invisible to buyers who are ready to spend money. We fix that.
          </p>
          <div className="m-cta-row">
            <Link href="/intake" className="m-btn-primary">Get My Free SEO Audit →</Link>
            <a href={`tel:${CONTACT.phoneE164}`} className="m-btn-ghost">Call {CONTACT.phoneDisplay}</a>
          </div>
        </div>
      </div>

      <section className="m-marketing-section">
        <div className="m-container-narrow">
          <div className="m-section-label">Plain English</div>
          <h2 className="m-h2-marketing">
            What is AEO and why<br />
            <span className="m-text-green">does it matter in 2026?</span>
          </h2>
          <p style={{ color: "var(--text-soft)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
            Google SEO gets you into the blue link results. <strong style={{ color: "#fff" }}>AEO — Answer Engine Optimization</strong> gets you into the direct answers that AI tools serve up instead.
          </p>
          <p style={{ color: "var(--text-soft)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
            When a Bakersfield homeowner asks ChatGPT &ldquo;who&apos;s the best HVAC company in Bakersfield?&rdquo; or tells Google AI &ldquo;find me a plumber near me&rdquo; — those systems pull from structured data, fast pages, and trusted local entities. Not just keywords.
          </p>
          <p style={{ color: "var(--text-soft)", lineHeight: 1.8 }}>
            Most Bakersfield businesses have zero AEO infrastructure. The first local operator to build it correctly owns those AI search results. We build that infrastructure into every site we deploy.
          </p>
        </div>
      </section>

      <section className="m-marketing-section" style={{ background: "rgba(16,217,138,0.03)", borderTop: "1px solid rgba(16,217,138,0.08)", borderBottom: "1px solid rgba(16,217,138,0.08)" }}>
        <div className="m-container-wide">
          <div className="m-section-label">What We Fix</div>
          <h2 className="m-h2-marketing">The six things killing <span className="m-text-green">your local rankings</span></h2>
          <div className="m-principles-grid" style={{ marginTop: "2.5rem" }}>
            {[
              { issue: "Slow mobile pages", detail: "Google ranks mobile-first. If your site loads in 5+ seconds on a phone, you rank behind faster competitors regardless of content. Most Bakersfield business sites we audit score under 50/100 on mobile speed." },
              { issue: "Missing or broken schema", detail: "Schema markup tells Google and AI systems exactly what your business is, where you are, and who you serve. Without it you're just text. With it you're a verified local entity machines can confidently recommend." },
              { issue: "Google Business Profile gaps", detail: "An incomplete GBP — missing service categories, no photos, blank description — directly suppresses your local pack ranking. We audit and align your GBP with your website signals." },
              { issue: "No city or service-specific pages", detail: "'Plumber Bakersfield' and 'emergency plumber near me' are different searches. One page trying to rank for both ranks for neither. We build the page structure that maps your services to actual buyer queries." },
              { issue: "Thin or vague content", detail: "A homepage with three sentences doesn't give Google enough signal to decide what you're an authority on. We write content that establishes topical depth without keyword stuffing." },
              { issue: "Not showing in AI search", detail: "ChatGPT, Google AI Overview, and Bing Copilot pull business recommendations from structured data and entity signals. We implement the technical foundation that gets you cited in those answers." }
            ].map((item) => (
              <div key={item.issue} className="m-principle-card">
                <h3 style={{ color: "var(--accent-green)" }}>{item.issue}</h3>
                <p>{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="m-marketing-section">
        <div className="m-container-narrow">
          <div className="m-section-label">Why the 661</div>
          <h2 className="m-h2-marketing">Bakersfield is an <span className="m-text-green">underserved SEO market.</span></h2>
          <p style={{ color: "var(--text-soft)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
            Most SEO agencies serving California are focused on LA, San Diego, and the Bay Area. Bakersfield gets their leftover attention and generic playbooks — packages built for markets with 10x the competition and 10x the budget.
          </p>
          <p style={{ color: "var(--text-soft)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
            That underservice creates an opportunity. Local search competition in the 661 is genuinely lower than comparable cities. A contractor with a properly-optimized website, complete GBP, and clean schema can rank in the top 3 local results within 60–90 days of launch.
          </p>
          <p style={{ color: "var(--text-soft)", lineHeight: 1.8 }}>
            Jason built COAI in Bakersfield because he grew up here. Every recommendation is grounded in what actually works in the 661 — not a national agency template.
          </p>
        </div>
      </section>

      <section className="m-marketing-section" style={{ background: "rgba(16,217,138,0.03)", borderTop: "1px solid rgba(16,217,138,0.08)", borderBottom: "1px solid rgba(16,217,138,0.08)" }}>
        <div className="m-container-narrow" style={{ textAlign: "center" }}>
          <div className="m-section-label">Real Result</div>
          <h2 className="m-h2-marketing"><span className="m-text-green">+31% more calls</span><br />in 30 days.</h2>
          <p style={{ color: "var(--text-soft)", lineHeight: 1.8, maxWidth: 520, margin: "1rem auto 0" }}>
            A Bakersfield HVAC company. New site with proper schema, GBP alignment, and mobile speed fixes. 31% increase in inbound calls within 30 days. No ad spend. No paid leads. Just organic search working correctly.
          </p>
        </div>
      </section>

      <section className="m-marketing-section">
        <div className="m-container-wide">
          <div className="m-section-label">Our Process</div>
          <h2 className="m-h2-marketing">Audit. Fix. <span className="m-text-green">Monitor.</span></h2>
          <div className="m-principles-grid" style={{ marginTop: "2.5rem" }}>
            {[
              { step: "01 · Audit", desc: "Full diagnostic on your site, GBP, schema, page speed, and local ranking position. You get a plain-English report showing exactly what's broken and what it's costing you." },
              { step: "02 · Fix", desc: "We implement: rebuild or optimize the site, deploy schema markup, align GBP data, and create page structure that maps your services to local search intent. You own everything we build." },
              { step: "03 · Monitor", desc: "Rankings shift. Algorithms update. We track your local pack position and organic visibility and flag anything that needs attention — so you can focus on running your business." }
            ].map((p) => (
              <div key={p.step} className="m-principle-card">
                <h3 style={{ color: "var(--accent-green)" }}>{p.step}</h3>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="m-bottom-cta">
        <div className="m-container-narrow" style={{ textAlign: "center" }}>
          <h2 className="m-h2-marketing">
            Find out where you rank<br />
            <span className="m-text-green">and what it&apos;s costing you.</span>
          </h2>
          <p style={{ color: "var(--text-soft)", marginBottom: "2rem" }}>
            The free diagnostic takes 60 seconds. You&apos;ll see your mobile speed score, schema status,
            local ranking position, and an estimate of how many leads your current setup is losing each month.
          </p>
          <div className="m-cta-row" style={{ justifyContent: "center" }}>
            <Link href="/intake" className="m-btn-primary">Run Free SEO Audit →</Link>
            <Link href="/services" className="m-btn-ghost">All Services</Link>
            <Link href="/contact" className="m-btn-ghost">Talk to Jason</Link>
          </div>
        </div>
      </div>
    </MarketingLayout>
  );
}
