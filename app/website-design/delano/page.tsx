import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd, localServiceJsonLd } from "@/lib/schema";
import { CONTACT, SITE_URL, SERVED_CITIES } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Website Design Delano, CA",
  description: SERVED_CITIES.delano.description,
  path: "/website-design/delano"
});

export default function DelanoWebsiteDesignPage() {

  const crumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Website design", path: "/website-design" },
    { name: "Delano", path: "/website-design/delano" }
  ]);
  const service = localServiceJsonLd("delano");
  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Delano Website Design",
    url: `${SITE_URL}/website-design/delano`
  };

  return (
    <MarketingLayout activeHref="/website-design">
      <JsonLd data={webPage} />
      <JsonLd data={crumbs} />
      <JsonLd data={service} />
      <div className="m-page-hero">
        <div className="m-page-hero-grid" aria-hidden="true" />
        <div className="m-page-hero-inner">
          <div className="m-section-label">Delano, CA</div>
          <h1>
            Delano <span className="m-text-green">Website Design</span>
          </h1>
          <p className="m-hero-sub">
            For Delano businesses, we build fast websites that convert visitors into calls with local-intent page
            structure and schema clarity. Stop losing leads to a slow, outdated site.
          </p>
          <div className="m-cta-row">
            <Link href="/intake" className="m-btn-primary">
              Run Delano Diagnostic →
            </Link>
            <Link href="/website-design/kern-county" className="m-btn-ghost">
              Kern County Hub
            </Link>
            <Link href="/website-design/bakersfield" className="m-btn-ghost">
              Bakersfield
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
          <div className="m-section-label">Why Delano</div>
          <h2 className="m-h2-marketing">
            Delano service businesses need a site that works <span className="m-text-green">as hard as you do.</span>
          </h2>
          <div className="m-text-block">
            <p>
              If your Delano business is relying on a Facebook page or aåå¹´å‰ website to bring in calls, you&apos;re
              leaving money on the table. Google prioritizes fast, schema-rich sites for local searches - and most
              Delano trades sites simply don&apos;t have the technical foundation to rank.
            </p>
            <p>
              We build custom-coded websites for Delano operators that load in under 3 seconds on mobile, include
              LocalBusiness schema that Google trusts, and route every visitor toward a call or contact form.
            </p>
          </div>
          <div className="m-cta-row" style={{ marginTop: "2rem" }}>
            <Link href="/intake" className="m-btn-primary">
              Free Delano Diagnostic →
            </Link>
            <Link href="/pricing" className="m-btn-ghost">
              See Pricing
            </Link>
          </div>
        </div>
      </section>

      <section className="m-marketing-section" style={{ background: "var(--m-surface)", borderTop: "1px solid var(--m-border)" }}>
        <div className="m-container-wide">
          <div className="m-section-label">How We Help</div>
          <h2 className="m-h2-marketing">
            Delano businesses we work with see <span className="m-text-green">more calls in the first 30 days.</span>
          </h2>
          <div className="m-feature-grid">
            {[
              { icon: "📱", title: "Mobile Speed", desc: "Most Delano searches happen on phone. We optimize for sub-3s 4G loads." },
              { icon: "📍", title: "Local Schema", desc: "LocalBusiness schema tuned for Delano + Kern County search visibility." },
              { icon: "📞", title: "Click-to-Call", desc: "Every page routes to a phone call or contact form. No dead ends." },
              { icon: "🗺️", title: "Google Maps SEO", desc: "GBP alignment and service-area schema for map pack rankings." },
              { icon: "🤖", title: "AI Search Ready", desc: "Structured content so AI assistants cite your Delano business." },
              { icon: "🏠", title: "Total Ownership", desc: "Custom code, your domain. No Wix, no Squarespace, no monthly builder tax." }
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
          <div className="m-section-label">Serving Delano & Kern County</div>
          <h2 className="m-h2-marketing">
            Based in Bakersfield, serving <span className="m-text-green">all of Kern County</span>
          </h2>
          <p style={{ color: "var(--m-muted)", maxWidth: 640, margin: "0 auto 2rem", textAlign: "center" }}>
            We work with trades and service businesses across the 661. Check out our other location pages.
          </p>
          <div className="m-cta-row">
            <Link href="/website-design/kern-county" className="m-btn-ghost">Kern County</Link>
            <Link href="/website-design/bakersfield" className="m-btn-ghost">Bakersfield</Link>
            <Link href="/website-design/shafter" className="m-btn-ghost">Shafter</Link>
          </div>
        </div>
      </section>

      <div className="m-bottom-cta">
        <div className="m-section-label">Start Here</div>
        <h2>
          Ready for a Delano site<br />
          <span className="m-text-green">that actually brings in calls?</span>
        </h2>
        <p>
          Free 20-minute diagnostic. We check your current site, Google profile, and lead flow - and hand you a written
          report. No pitch, no pressure, just the truth.
        </p>
        <div className="m-cta-row">
          <Link href="/intake" className="m-btn-primary">
            Get My Free Delano Audit →
          </Link>
          <a href={`tel:${CONTACT.phoneE164}`} className="m-btn-ghost">
            Call {CONTACT.phoneDisplay}
          </a>
        </div>
      </div>
    </MarketingLayout>
  );
}
