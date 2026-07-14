import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

const BUNDLES = [
  {
    name: "Trades Starter Pack",
    price: "$1,497 flat",
    desc: "Everything a trades or HVAC business needs to look sovereign and capture leads — deployed in one shot.",
    features: [
      "Sovereign 1-page web build",
      "Google Business Profile overhaul",
      "Schema / AEO injection",
      "Social media profile cleanup",
      "Review generation system setup",
    ],
    best: false,
    sq: "https://square.link/u/Xvp6QAHQ",
  },
  {
    name: "AI Lead Machine",
    price: "$1,997 + $297/mo",
    desc: "Full autonomous lead capture and follow-up. Built for operators serious about dominating the 661 market.",
    features: [
      "Sovereign web build",
      "AI chatbot embed",
      "LeadShield missed-call text-back",
      "Review automation system",
      "Monthly SEO + analytics report",
    ],
    best: true,
    sq: "https://square.link/u/6X8C4a9M",
  },
  {
    name: "Operational Ecosystem",
    price: "$1,200 + $197/mo",
    desc: "Custom sovereign site wired into a full CRM and automated SMS follow-up pipeline.",
    features: [
      "Custom HTML/JS site + schema",
      "LeadShield CRM integration",
      "Automated missed-call SMS",
      "Vercel/Netlify hosting setup",
    ],
    best: false,
    sq: "https://square.link/u/D1wnMqJt",
  },
];

const TRADE_CALL_FEATURES = [
  "Custom-coded website — you own 100% of the code",
  "Mobile-fast, conversion layout built for \"call now\"",
  "Local SEO + schema so Google Maps and AI search can find you",
  "Google Business Profile alignment",
  "Missed-call auto text-back in under 30 seconds",
  "Lead capture forms + click-to-call hardened",
  "Full handoff — export and leave anytime",
  "Phone support from a human in Bakersfield",
];

const ADDONS = [
  {
    name: "Bilingual Build (EN/ES)",
    desc: "Full Spanish translation with proper hreflang markup. Essential for Kern County businesses targeting the 50%+ Spanish-speaking local market.",
    price: "+$400",
  },
  {
    name: "Ongoing Support Retainer",
    desc: "Monthly content updates, performance monitoring, schema maintenance, and priority access. Optional — never required.",
    price: "$197 / month",
  },
  {
    name: "Structural Audit (Standalone)",
    desc: "Full performance, schema, AEO, and GBP audit with a prioritized fix list. Ideal if you already have a site.",
    price: "$350 standalone",
  },
];

export function PricingPageBody() {
  return (
    <>
      <div className="m-page-hero">
        <div className="m-grid-bg" aria-hidden />
        <div className="m-page-hero-inner">
          <div className="m-section-label">Pricing</div>
          <h1 className="m-page-h1">
            One price. <span className="m-text-green">Full ownership.</span>
            <br />
            No surprises.
          </h1>
          <p className="m-hero-sub">
            Fixed scope, fixed price. You approve the proposal before a line of code is written.
            You own everything the day it goes live.
          </p>
        </div>
      </div>

      <section className="m-marketing-section">
        <div className="m-container-wide">
          {/* Single Primary Offer — TradeCall System */}
          <div className="m-section-label">The Primary Offer</div>
          <div style={{ maxWidth: 520, margin: "0 auto" }}>
            <div className="m-pkg" style={{ borderColor: "rgba(232,160,32,0.3)", borderWidth: "1px", borderStyle: "solid" }}>
              <div className="m-pkg-top-bar" style={{ background: "var(--accent)" }} />
              <div className="m-pkg-head">
                <div className="m-pkg-tier" style={{ color: "var(--accent)" }}>TRADECALL SYSTEM&trade;</div>
                <div className="m-pkg-name" style={{ fontSize: "1.8rem" }}>Custom website + missed-call recovery</div>
                <div className="m-pkg-tagline">
                  Built for Bakersfield trades. You own it. No monthly platform tax.
                </div>
                <div className="m-pkg-price">
                  <span className="m-amount">$1,997</span>
                  <span className="m-suffix">flat</span>
                </div>
                <div style={{ fontSize: ".85rem", color: "var(--cream-dim)", marginTop: "4px" }}>
                  $997 to start &middot; $1,000 at launch &middot; 2–3 weeks
                </div>
              </div>
              <div className="m-pkg-body">
                <ul className="m-pkg-features">
                  {TRADE_CALL_FEATURES.map((f, i) => (
                    <li key={i} className="m-included">
                      <span className="m-feat-icon">
                        <CheckCircle2 size={14} style={{ color: "var(--accent)" }} />
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="m-pkg-foot">
                <Link href="/intake" className="m-pkg-cta">
                  Book Free Job Call Audit &rarr;
                </Link>
                <div style={{ textAlign: "center", fontSize: ".75rem", color: "var(--cream-dim)", marginTop: "12px" }}>
                  No deposit until scope is agreed
                </div>
              </div>
            </div>
          </div>

          {/* Spanish add-on note */}
          <div className="m-section-label" style={{ marginTop: "60px" }}>Add-Ons</div>
          <div className="m-addons-grid">
            {ADDONS.map((a) => (
              <div key={a.name} className="m-addon-card">
                <div className="m-addon-name">{a.name}</div>
                <div className="m-addon-desc">{a.desc}</div>
                <div className="m-addon-price">{a.price}</div>
              </div>
            ))}
          </div>

          {/* Guarantee */}
          <div className="m-guarantee-box" style={{ marginTop: "60px" }}>
            <div className="m-g-icon">◈</div>
            <div>
              <div className="m-g-title">The Scope Guarantee</div>
              <p className="m-g-text">
                Every project is scoped in writing before work begins. If COAI misses a deliverable that was in the
                scope document, we fix it at no additional cost. No scope creep charges. No &quot;that wasn&apos;t
                included&quot; conversations after you&apos;ve paid. The proposal is the contract — and we honor it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Add-on Bundles */}
      <section style={{ padding: "80px 0", borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="m-container-wide">
          <div className="m-section-label">Already Have a Site?</div>
          <h2 className="m-h2-marketing">
            Add-on bundles. <span className="m-text-green">Buy what you need.</span>
          </h2>
          <p className="m-hero-sub" style={{ marginTop: "12px" }}>
            Standalone upgrades for businesses that already have web presence but need specific gaps filled.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px", marginTop: "40px" }}>
            {BUNDLES.map((b) => (
              <div key={b.name} className="m-pkg" style={{ position: "relative" }}>
                {b.best && <div className="m-pkg-badge">Best Value</div>}
                <div className="m-pkg-head">
                  <div className="m-pkg-name" style={{ fontSize: "1.2rem" }}>{b.name}</div>
                  <div className="m-pkg-tagline" style={{ fontSize: ".85rem" }}>{b.desc}</div>
                  <div className="m-pkg-price" style={{ margin: "16px 0 0" }}>
                    <span className="m-amount" style={{ fontSize: "1.4rem" }}>{b.price}</span>
                  </div>
                </div>
                <div className="m-pkg-body">
                  <ul className="m-pkg-features">
                    {b.features.map((f) => (
                      <li key={f} className="m-included">
                        <span className="m-feat-icon">→</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="m-pkg-foot">
                  <a href={b.sq} target="_blank" rel="noopener noreferrer" className="m-pkg-cta">
                    Buy Now &rarr;
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="m-bottom-cta">
        <div className="m-section-label">Not Sure?</div>
        <h2 className="m-bottom-cta-h2">
          Run the free audit first.
          <br />
          <span className="m-text-green">It clarifies everything.</span>
        </h2>
        <p>
          20 minutes with Jason surfaces exactly what&apos;s costing you calls. Most clients know
          what they need before the call ends.
        </p>
        <div className="m-cta-row">
          <Link href="/intake" className="m-btn-primary-marketing">
            Book My Free Audit &rarr;
          </Link>
          <Link href="/faq" className="m-btn-ghost-marketing">
            Read the FAQ
          </Link>
        </div>
      </div>
    </>
  );
}
