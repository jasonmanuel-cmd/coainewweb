import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd, localServiceJsonLd } from "@/lib/schema";
import { CONTACT, SITE_URL, SERVED_CITIES } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Website Design Shafter, CA",
  description: SERVED_CITIES.shafter.description,
  path: "/website-design/shafter"
});

export default function ShafterWebsiteDesignPage() {

  const crumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Website design", path: "/website-design" },
    { name: "Shafter", path: "/website-design/shafter" }
  ]);
  const service = localServiceJsonLd("shafter");
  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Shafter Website Design",
    url: `${SITE_URL}/website-design/shafter`
  };

  return (
    <MarketingLayout activeHref="/website-design">
      <JsonLd data={webPage} />
      <JsonLd data={crumbs} />
      <JsonLd data={service} />
      <div className="m-page-hero">
        <div className="m-page-hero-grid" aria-hidden="true" />
        <div className="m-page-hero-inner">
          <div className="m-section-label">Shafter, CA</div>
          <h1>
            Shafter <span className="m-text-green">Website Design</span>
          </h1>
          <p className="m-hero-sub">
            We help Shafter operators replace slow, low-trust sites with conversion-first systems built for Google, AI
            surfaces, and real call volume. Get found faster, keep more leads.
          </p>
          <div className="m-cta-row">
            <Link href="/intake" className="m-btn-primary">
              Run Shafter Diagnostic →
            </Link>
            <Link href="/website-design/kern-county" className="m-btn-ghost">
              Kern County Hub
            </Link>
            <Link href="/website-design/bakersfield" className="m-btn-ghost">
              Bakersfield
            </Link>
            <Link href="/website-design/delano" className="m-btn-ghost">
              Delano
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
          <div className="m-section-label">Why Shafter</div>
          <h2 className="m-h2-marketing">
            Shafter businesses deserve a site that <span className="m-text-green">works 24/7 - not just during business hours.</span>
          </h2>
          <div className="m-text-block">
            <p>
              Shafter is a close-knit community, and local reputation matters. When a Shafter homeowner searches for an
              electrician or plumber, they call the business that shows up first on Google Maps with a professional site.
              If your current site is slow, outdated, or buried on page three, you&apos;re losing those calls to competitors.
            </p>
            <p>
              We build Shafter service businesses custom-coded websites with LocalBusiness schema, mobile-first layouts,
              and lead capture paths designed for one thing: getting your phone to ring.
            </p>
          </div>
          <div className="m-cta-row" style={{ marginTop: "2rem" }}>
            <Link href="/intake" className="m-btn-primary">
              Free Shafter Diagnostic →
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
            A Shafter website built for <span className="m-text-green">calls, not just clicks.</span>
          </h2>
          <div className="m-feature-grid">
            {[
              { icon: "⚡", title: "Speed-First Build", desc: "Shafter mobile searches demand speed. Sub-3s load guaranteed." },
              { icon: "📍", title: "Shafter Local Schema", desc: "LocalBusiness schema tuned for Shafter + Kern County search." },
              { icon: "📞", title: "Call-First Design", desc: "Phone number prominent on every page. Click-to-call on mobile." },
              { icon: "🛠️", title: "Google Maps Priority", desc: "GBP optimization + service-area schema for local map rankings." },
              { icon: "🤖", title: "AI Citation Ready", desc: "Content structured so AI assistants recommend your Shafter business." },
              { icon: "🔐", title: "Full Sovereignty", desc: "You own the code, the domain, and every lead it generates." }
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
          <div className="m-section-label">Serving Shafter & Beyond</div>
          <h2 className="m-h2-marketing">
            Part of the <span className="m-text-green">Kern County</span> community
          </h2>
          <p style={{ color: "var(--m-muted)", maxWidth: 640, margin: "0 auto 2rem", textAlign: "center" }}>
            We&apos;re based in Bakersfield and serve Shafter operators alongside the rest of Kern County.
          </p>
          <div className="m-cta-row">
            <Link href="/website-design/kern-county" className="m-btn-ghost">Kern County</Link>
            <Link href="/website-design/bakersfield" className="m-btn-ghost">Bakersfield</Link>
            <Link href="/website-design/delano" className="m-btn-ghost">Delano</Link>
          </div>
        </div>
      </section>

      <div className="m-bottom-cta">
        <div className="m-section-label">Start Here</div>
        <h2>
          Ready for a Shafter site<br />
          <span className="m-text-green">that brings in more calls?</span>
        </h2>
        <p>
          Free 20-minute diagnostic. We check your current site, Google profile, and lead flow - and hand you a written
          report. No pitch, no pressure, just the truth.
        </p>
        <div className="m-cta-row">
          <Link href="/intake" className="m-btn-primary">
            Get My Free Shafter Audit →
          </Link>
          <a href={`tel:${CONTACT.phoneE164}`} className="m-btn-ghost">
            Call {CONTACT.phoneDisplay}
          </a>
        </div>
      </div>
    </MarketingLayout>
  );
}
