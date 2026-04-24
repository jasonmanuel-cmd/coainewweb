import Link from "next/link";
import { CONTACT } from "@/lib/site";

export function ServicesMarketingContent() {
  return (
    <>
      <div className="m-page-hero">
        <div className="m-page-hero-grid" aria-hidden="true" />
        <div className="m-page-hero-inner">
          <div className="m-section-label">What We Build</div>
          <h1>
            Systems, not <span className="m-text-green">subscriptions.</span>
          </h1>
          <p className="m-hero-sub">
            Every service COAI delivers results in infrastructure you own — not a monthly dependency on someone
            else&apos;s platform. Here&apos;s exactly what that looks like.
          </p>
        </div>
      </div>

      <div className="m-service-block">
        <div>
          <div className="m-service-num">01</div>
          <div className="m-section-label-left">Core Service</div>
          <div className="m-service-title">
            Structural Digital <span className="m-text-green">Audit</span>
          </div>
          <p className="m-service-desc">
            Before you spend a dollar on ads or content, we run a full-spectrum audit of your existing digital presence
            — performance scores, schema integrity, AEO readiness, GBP alignment, and conversion path analysis. You get a
            prioritized fix list with clear outcomes, not a vague report full of jargon.
          </p>
          <ul className="m-service-list">
            <li>
              <strong>Page speed &amp; Core Web Vitals</strong> — mobile and desktop
            </li>
            <li>
              <strong>Schema markup audit</strong> — LocalBusiness, Service, FAQ layers
            </li>
            <li>
              <strong>AEO / GEO readiness</strong> — how AI surfaces read your business
            </li>
            <li>
              <strong>Google Business Profile alignment</strong> — entity consistency check
            </li>
            <li>
              <strong>Lead path analysis</strong> — where visitors drop before contacting you
            </li>
            <li>
              <strong>Prioritized fix list</strong> — ranked by revenue impact
            </li>
          </ul>
        </div>
        <div className="m-service-panel">
          <div className="m-service-panel-label">Typical Baseline Scores</div>
          <div className="m-service-stat">
            <span className="m-big">74</span>
            <span className="m-small">avg performance score on intake</span>
          </div>
          <div className="m-service-stat">
            <span className="m-big">56</span>
            <span className="m-small">avg schema signal</span>
          </div>
          <div className="m-service-stat">
            <span className="m-big">61</span>
            <span className="m-small">avg AEO readiness</span>
          </div>
          <p className="m-service-panel-note">
            Post-build scores typically reach 90+ performance, 85+ schema, 80+ AEO readiness. Every point matters when AI
            search surfaces are deciding who to surface first.
          </p>
        </div>
      </div>

      <div className="m-service-block m-reverse">
        <div>
          <div className="m-service-num">02</div>
          <div className="m-section-label-left">Growth Layer</div>
          <div className="m-service-title">
            AI <span className="m-text-green">Automation</span> Stack
          </div>
          <p className="m-service-desc">
            Once your foundation is solid, we layer practical AI workflows that capture demand you&apos;re currently
            missing — missed calls, slow response times, unqualified leads clogging your calendar. Cipher, our AI
            receptionist, handles the front line so you focus on closing.
          </p>
          <ul className="m-service-list">
            <li>
              <strong>AI receptionist deployment</strong> — Cipher (Live Product), tuned to your business
            </li>
            <li>
              <strong>Missed-call text-back</strong> — responds within seconds, not hours
            </li>
            <li>
              <strong>Lead qualification logic</strong> — filters intent before it reaches you
            </li>
            <li>
              <strong>Booking automation</strong> — routes appointments without manual chaos
            </li>
            <li>
              <strong>Callback routing</strong> — connects warm leads to your team
            </li>
            <li>
              <strong>Workflow reporting</strong> — see exactly what&apos;s being captured
            </li>
          </ul>
          <p style={{ fontSize: "12px", color: "var(--m-muted)", marginTop: "1rem" }}>
            *Note: Cipher is our production-ready live receptionist. JAX is our separate internal/pre-deployment sentinel system.
          </p>
          <div style={{ marginTop: "1.5rem", padding: "1.25rem", borderLeft: "3px solid var(--m-green)", background: "rgba(0, 255, 136, 0.05)" }}>
            <div style={{ fontSize: "14px", fontStyle: "italic", marginBottom: "0.5rem", color: "var(--m-white)" }}>
              &ldquo;Jason helped me build a website for my business... also created a phone AI system for me to help direct callers...&rdquo;
            </div>
            <div style={{ fontSize: "12px", color: "var(--m-muted)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>— Christopher Moore</span>
              <span style={{ color: "var(--m-green)" }}>★★★★★ Google Review</span>
            </div>
          </div>
        </div>
        <div className="m-service-panel">
          <div className="m-service-panel-label">Live Deployment</div>
          <div className="m-service-stat">
            <span className="m-big">&lt;30s</span>
            <span className="m-small">missed call response time</span>
          </div>
          <div className="m-service-stat">
            <span className="m-big">24/7</span>
            <span className="m-small">receptionist uptime</span>
          </div>
          <p className="m-service-panel-note">
            COAI&apos;s own AI receptionist Cipher runs on {CONTACT.phoneDisplay}. Call it. That&apos;s the same system we
            deploy for clients — live, stable, and ready to qualify leads at any hour.
          </p>
        </div>
      </div>

      <div className="m-service-block">
        <div>
          <div className="m-service-num">03</div>
          <div className="m-section-label-left">Foundation</div>
          <div className="m-service-title">
            Sovereign Website <span className="m-text-green">Builds</span>
          </div>
          <p className="m-service-desc">
            We design and build complete website systems — not templates, not drag-and-drop editors. Custom code,
            sovereign infrastructure, deployed to hosting you control. The website is the operating layer for your
            business. Everything else plugs into it.
          </p>
          <ul className="m-service-list">
            <li>
              <strong>Information architecture</strong> — structured for conversion, not just looks
            </li>
            <li>
              <strong>Mobile-first build</strong> — 661 market is overwhelmingly mobile
            </li>
            <li>
              <strong>Schema-ready markup</strong> — built for AI and search from day one
            </li>
            <li>
              <strong>Lead capture systems</strong> — forms, click-to-call, intake flows
            </li>
            <li>
              <strong>Speed optimization</strong> — sub-3s load on 4G mobile
            </li>
            <li>
              <strong>Full handoff</strong> — you own the code, the domain, the data
            </li>
          </ul>
          <div style={{ marginTop: "1.5rem", padding: "1.25rem", borderLeft: "3px solid var(--m-green)", background: "rgba(0, 255, 136, 0.05)" }}>
            <div style={{ fontSize: "14px", fontStyle: "italic", marginBottom: "0.5rem", color: "var(--m-white)" }}>
              &ldquo;Very sleek design... affordability relative to competitors was amazing. Highly recommend!&rdquo;
            </div>
            <div style={{ fontSize: "12px", color: "var(--m-muted)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span>— Edwin Ward</span>
              <span style={{ color: "var(--m-green)" }}>★★★★★ Google Review</span>
            </div>
          </div>
        </div>
        <div className="m-service-panel">
          <div className="m-service-panel-label">Build Philosophy</div>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--m-muted)",
              lineHeight: 2,
              marginBottom: "1rem"
            }}
          >
            <div style={{ color: "var(--m-green)" }}>SOVEREIGN HOUSE</div>
            <div>→ Custom code you own</div>
            <div>→ No platform fees</div>
            <div>→ No account shutdowns</div>
            <div>→ Data is yours forever</div>
            <div style={{ color: "var(--m-red)", marginTop: "0.8rem" }}>RENTED LAND (avoid)</div>
            <div>→ Wix / Squarespace / GoDaddy</div>
            <div>→ Platform controls your data</div>
            <div>→ Price hikes whenever they want</div>
          </div>
        </div>
      </div>

      <section className="m-section-pad" style={{ background: "var(--m-surface)", borderTop: "1px solid var(--m-border)" }}>
        <div className="m-container">
          <div className="m-section-label">Who We Serve</div>
          <h2>
            Built for <span className="m-text-green">operators</span>, not idea people.
          </h2>
          <p style={{ color: "var(--m-muted)", maxWidth: 540 }}>
            If you run a real business with real customers and real revenue leaking from a broken or missing digital
            presence, COAI is built for you.
          </p>
          <div className="m-serve-grid">
            {[
              { icon: "🔧", label: "Trades & Contractors", sub: "HVAC, plumbing, electrical, construction" },
              { icon: "🍔", label: "Food & Beverage", sub: "Restaurants, food trucks, catering" },
              { icon: "💳", label: "Financial Services", sub: "Credit restoration, tax, consulting" },
              { icon: "🏠", label: "Real Estate Adjacent", sub: "Photography, staging, property services" },
              { icon: "🛍️", label: "E-Commerce & Retail", sub: "Apparel, cannabis, lifestyle brands" },
              { icon: "🎵", label: "Creative & Music", sub: "Labels, studios, artists, photographers" },
              { icon: "💼", label: "Professional Services", sub: "Consulting, legal adjacent, agencies" },
              { icon: "🏥", label: "Health & Wellness", sub: "Clinics, fitness, personal care" }
            ].map((s) => (
              <div key={s.label} className="m-serve-card">
                <div className="m-serve-icon">{s.icon}</div>
                <div className="m-serve-label">{s.label}</div>
                <div className="m-serve-sub">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="m-section-pad">
        <div className="m-container">
          <div className="m-section-label">How It Works</div>
          <h2>
            From first call to <span className="m-text-green">live system</span> — no mystery.
          </h2>
          <div className="m-process-steps">
            {[
              {
                t: "Diagnostic Call — 30 Minutes",
                p: "We run a live audit of your current digital footprint during the call. No slides, no pitch deck. Just real-time data on where you're leaking revenue and what's blocking visibility. You leave with a practical roadmap regardless of whether we work together.",
                tag: "Free · No Pressure"
              },
              {
                t: "Scope & Proposal — 48 Hours",
                p: "Every engagement is scoped before any work starts. You receive a clear document: what gets built, what it costs, what the milestones are, and what you own at the end. No vague retainers. No surprise scope creep.",
                tag: "Fixed Price · Clear Deliverables"
              },
              {
                t: "Build Phase — 2 to 4 Weeks",
                p: "We build. You review at each milestone checkpoint. Full transparency throughout — staging link available from day one so you can watch it take shape. No black box.",
                tag: "Milestone-Based · Staged Review"
              },
              {
                t: "Launch & Handoff — Full Ownership",
                p: "We deploy, verify performance scores, run final schema checks, and hand you full ownership credentials — hosting login, domain access, codebase. Ongoing support available but never required. You own the house.",
                tag: "Sovereign Handoff · Yours Forever"
              }
            ].map((step, i) => (
              <div key={step.t} className="m-process-step">
                <div className="m-step-num">{String(i + 1).padStart(2, "0")}</div>
                <div className="m-step-content">
                  <h3>{step.t}</h3>
                  <p>{step.p}</p>
                  <span className="m-step-tag">{step.tag}</span>
                </div>
              </div>
            ))}
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
            Run My Free Diagnostic →
          </Link>
          <Link href="/pricing" className="m-btn-ghost">
            See Pricing
          </Link>
        </div>
      </div>
    </>
  );
}
