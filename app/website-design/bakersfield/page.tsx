import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd, localServiceJsonLd } from "@/lib/schema";
import { CONTACT, SITE_URL, SERVED_CITIES } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Website Design Bakersfield, CA",
  description: SERVED_CITIES.bakersfield.description + " WordPress migration and speed optimization for Bakersfield operators.",
  path: "/website-design/bakersfield"
});

export default function BakersfieldWebsiteDesignPage() {

  const crumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Website design", path: "/website-design" },
    { name: "Bakersfield", path: "/website-design/bakersfield" }
  ]);
  const service = localServiceJsonLd("bakersfield");
  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Bakersfield Website Design",
    url: `${SITE_URL}/website-design/bakersfield`
  };

  return (
    <MarketingLayout activeHref="/website-design">
      <JsonLd data={webPage} />
      <JsonLd data={crumbs} />
      <JsonLd data={service} />
      <div className="m-page-hero">
        <div className="m-page-hero-grid" aria-hidden="true" />
        <div className="m-page-hero-inner">
          <div className="m-section-label">Bakersfield, CA</div>
          <h1>
            Bakersfield <span className="m-text-green">Website Design</span>
          </h1>
          <p className="m-hero-sub">
            We design and deploy high-conversion websites for Bakersfield operators who need speed, local visibility,
            and a system they fully own. No Wix tax. No platform lock-in. Just a site that generates calls.
          </p>
          <div className="m-cta-row">
            <Link href="/intake" className="m-btn-primary">
              Get My Bakersfield Site Audit â†'
            </Link>
            <Link href="/website-design/kern-county" className="m-btn-ghost">
              Kern County Hub
            </Link>
            <Link href="/website-design/delano" className="m-btn-ghost">
              Delano
            </Link>
            <Link href="/website-design/shafter" className="m-btn-ghost">
              Shafter
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
          <div className="m-section-label">Why Bakersfield</div>
          <h2 className="m-h2-marketing">
            Bakersfield businesses lose calls every day to <span className="m-text-green">slow sites and broken lead paths.</span>
          </h2>
          <div className="m-text-block">
            <p>
              Most Bakersfield trades sites were built on drag-and-drop platforms that load slow on mobile, fail schema
              checks, and bury contact info. That means fewer Google Maps impressions, lower AI citation rates, and
              customers calling your competitor instead.
            </p>
            <p>
              We fix that with hand-coded sovereign sites, geo-targeted LocalBusiness schema, and conversion architecture
              that turns visitors into booked jobs. Every site we build in Bakersfield is optimized for the 661 market.
            </p>
          </div>
          <div className="m-cta-row" style={{ marginTop: "2rem" }}>
            <Link href="/intake" className="m-btn-primary">
              Free Bakersfield Diagnostic â†'
            </Link>
            <Link href="/pricing" className="m-btn-ghost">
              See Pricing
            </Link>
          </div>
        </div>
      </section>

      <section className="m-marketing-section" style={{ background: "var(--m-surface)", borderTop: "1px solid var(--m-border)" }}>
        <div className="m-container-wide">
          <div className="m-section-label">What You Get</div>
          <h2 className="m-h2-marketing">
            Everything a <span className="m-text-green">Bakersfield operator</span> needs
          </h2>
          <div className="m-feature-grid">
            {[
              { icon: "âš¡", title: "Mobile-First Speed", desc: "Sub-3s load on 4G. Bakersfield is a mobile-first market â€" slow sites lose." },
              { icon: "ðŸ"", title: "Local Schema", desc: "LocalBusiness + Service schema tuned for Bakersfield and Kern County." },
              { icon: "ðŸ¤-", title: "AI-Ready Content", desc: "Structured so Google AI, SGE, and voice assistants surface you first." },
              { icon: "ðŸ"ž", title: "Lead Capture", desc: "Forms, click-to-call, intake flows â€" every path ends in a booked job." },
              { icon: "ðŸ"§", title: "Industry Focus", desc: "Built for HVAC, plumbing, electrical, and service businesses that dominate 661." },
              { icon: "ðŸ ", title: "Full Ownership", desc: "Custom code, your domain, your data. No builder tax. No platform risk." }
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
          <div className="m-section-label">Serving Bakersfield & Beyond</div>
          <h2 className="m-h2-marketing">
            We cover all of <span className="m-text-green">Kern County</span>
          </h2>
          <p style={{ color: "var(--m-muted)", maxWidth: 640, margin: "0 auto 2rem", textAlign: "center" }}>
            Based in Bakersfield, we serve the entire Kern County area. Your nearest city page below.
          </p>
          <div className="m-cta-row">
            <Link href="/website-design/kern-county" className="m-btn-ghost">Kern County</Link>
            <Link href="/website-design/delano" className="m-btn-ghost">Delano</Link>
            <Link href="/website-design/shafter" className="m-btn-ghost">Shafter</Link>
          </div>
        </div>
      </section>

      <div className="m-bottom-cta">
        <div className="m-section-label">Start Here</div>
        <h2>
          Ready for a Bakersfield site<br />
          <span className="m-text-green">that actually generates calls?</span>
        </h2>
        <p>
          Free 20-minute diagnostic. We check your current site, Google profile, and lead flow â€" and hand you a written
          report. No pitch, no pressure, just the truth.
        </p>
        <div className="m-cta-row">
          <Link href="/intake" className="m-btn-primary">
            Get My Free Bakersfield Audit â†'
          </Link>
          <a href={`tel:${CONTACT.phoneE164}`} className="m-btn-ghost">
            Call {CONTACT.phoneDisplay}
          </a>
        </div>
      </div>
    </MarketingLayout>
  );
}
