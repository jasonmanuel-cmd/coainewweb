import Link from "next/link";
import { CONTACT } from "@/lib/site";
import { ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/revamp/Reveal";

export function ServicesMarketingContent() {
  return (
    <>
      <Reveal>
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
      </Reveal>

      <Reveal>
      <div className="m-service-block">
        <div>
          <div className="m-service-num">01</div>
          <div className="m-section-label-left">Core Service</div>
          <div className="m-service-title">
            Structural Digital <span className="m-text-green">Audit</span>
          </div>
          <p className="m-service-desc">
            Most trades businesses leak revenue online and don&apos;t know why — slow sites, missing schema, broken lead
            paths. We run a full-spectrum audit of your digital presence:
            <strong>performance scores, schema integrity, AI discoverability, Google Business Profile alignment, and
            conversion path analysis.</strong> You get a prioritized fix list ranked by dollar impact on your
            incoming calls and jobs.
          </p>
          <ul className="m-service-list">
            <li>
              <strong>Page speed &amp; Core Web Vitals</strong> — slow sites kill leads before they convert
            </li>
            <li>
              <strong>Schema markup audit</strong> — helps Google and AI assistants surface your business first
            </li>
            <li>
              <strong>AEO / GEO readiness</strong> — are AI answer engines recommending you or your competitor?
            </li>
            <li>
              <strong>Google Business Profile alignment</strong> — inconsistent data costs you map rankings and calls
            </li>
            <li>
              <strong>Lead path analysis</strong> — where visitors drop before filling your contact form or calling
            </li>
            <li>
              <strong>Prioritized fix list</strong> — ranked by revenue impact, not technical severity
            </li>
            </ul>
            <div style={{ marginTop: "1.5rem", padding: "0.75rem 1rem", borderLeft: "3px solid var(--m-green)", background: "rgba(0, 255, 136, 0.04)", display: "flex", gap: "8px", alignItems: "flex-start" }}>
              <ShieldCheck size={16} style={{ color: "var(--m-green)", flexShrink: 0, marginTop: 1 }} />
              <span style={{ fontSize: "13px", color: "var(--m-muted)", lineHeight: 1.5 }}>
                <strong style={{ color: "var(--m-white)" }}>No-Risk Diagnostic:</strong> If we don&apos;t find at least 3 actionable issues that would generate more calls, your audit is free.
              </span>
            </div>
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
      </Reveal>

      <Reveal>
      <div className="m-service-block m-reverse">
        <div>
          <div className="m-service-num">02</div>
          <div className="m-section-label-left">Growth Layer</div>
          <div className="m-service-title">
            AI <span className="m-text-green">Automation</span> Stack
          </div>
          <p className="m-service-desc">
            Your phone is your #1 lead source — but every missed call is a job going to your competitor. We deploy
            practical AI workflows that <strong>capture every inbound lead</strong> your business is currently
            hemorrhaging: missed calls that never get returned, voicemails nobody listens to, late-night inquiries
            that cool off before morning. Cipher, our AI receptionist, handles the front line so every lead gets
            contacted inside 30 seconds — not 24 hours.
          </p>
          <ul className="m-service-list">
            <li>
              <strong>AI receptionist deployment</strong> — Cipher, tuned to your business, answers 24/7
            </li>
            <li>
              <strong>Missed-call text-back</strong> — responds in seconds, recovers jobs from voicemail
            </li>
            <li>
              <strong>Lead qualification logic</strong> — filters hot leads from tire-kickers automatically
            </li>
            <li>
              <strong>Booking automation</strong> — routes appointments without manual back-and-forth
            </li>
            <li>
              <strong>Callback routing</strong> — sends warm leads straight to your crew
            </li>
            <li>
              <strong>Workflow reporting</strong> — see every recovered lead and booked job
            </li>
          </ul>
          <p style={{ fontSize: "12px", color: "var(--m-muted)", marginTop: "1rem" }}>
            *Note: Cipher is our production-ready live receptionist. JAX is our separate internal/pre-deployment sentinel system.
          </p>
            <div style={{ marginTop: "1.5rem", padding: "0.75rem 1rem", borderLeft: "3px solid var(--m-green)", background: "rgba(0, 255, 136, 0.04)", display: "flex", gap: "8px", alignItems: "flex-start" }}>
              <ShieldCheck size={16} style={{ color: "var(--m-green)", flexShrink: 0, marginTop: 1 }} />
              <span style={{ fontSize: "13px", color: "var(--m-muted)", lineHeight: 1.5 }}>
                <strong style={{ color: "var(--m-white)" }}>Lead Recovery Guarantee:</strong> If you don&apos;t see reduced missed calls in the first 30 days, we optimize at no cost.
              </span>
            </div>
            <div style={{ marginTop: "1.25rem", padding: "1.25rem", borderLeft: "3px solid var(--m-green)", background: "rgba(0, 255, 136, 0.05)" }}>
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
      </Reveal>

      <Reveal>
      <div className="m-service-block">
        <div>
          <div className="m-service-num">03</div>
          <div className="m-section-label-left">Foundation</div>
          <div className="m-service-title">
            Sovereign Website <span className="m-text-green">Builds</span>
          </div>
          <p className="m-service-desc">
            Your website should be a <strong>24/7 lead generation engine</strong>, not a digital brochure nobody finds.
            We hand-code sovereign sites with geo-targeted LocalBusiness schema, AI-optimized content, and conversion
            paths that turn visitors into paying customers. No templates, no drag-and-drop builders, no platform lock-in.
            You own the code, the domain, and every single lead it generates.
          </p>
          <ul className="m-service-list">
            <li>
              <strong>Information architecture</strong> — structured to convert visitors into calls, not just look pretty
            </li>
            <li>
              <strong>Mobile-first build</strong> — 661 market is overwhelmingly mobile, so every tap target is thumb-friendly
            </li>
            <li>
              <strong>Schema-ready markup</strong> — tells Google and AI assistants you&apos;re a real local business, not spam
            </li>
            <li>
              <strong>Lead capture systems</strong> — forms, click-to-call, intake flows — every path ends in a booked job
            </li>
            <li>
              <strong>Speed optimization</strong> — sub-3s load on 4G; every second of delay costs you conversions
            </li>
            <li>
              <strong>Full handoff</strong> — you own the code, the domain, the data, and every lead it generates
            </li>
          </ul>
            <div style={{ marginTop: "1.5rem", padding: "0.75rem 1rem", borderLeft: "3px solid var(--m-green)", background: "rgba(0, 255, 136, 0.04)", display: "flex", gap: "8px", alignItems: "flex-start" }}>
              <ShieldCheck size={16} style={{ color: "var(--m-green)", flexShrink: 0, marginTop: 1 }} />
              <span style={{ fontSize: "13px", color: "var(--m-muted)", lineHeight: 1.5 }}>
                <strong style={{ color: "var(--m-white)" }}>Delivery Guarantee:</strong> We launch in 30 days or we work for free until it&apos;s live. No excuses.
              </span>
            </div>
            <div style={{ marginTop: "1.25rem", padding: "1.25rem", borderLeft: "3px solid var(--m-green)", background: "rgba(0, 255, 136, 0.05)" }}>
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
      </Reveal>

      <Reveal>
      <div className="m-service-block m-reverse">
        <div>
          <div className="m-service-num">04</div>
          <div className="m-section-label-left">Ongoing Care</div>
          <div className="m-service-title">
            Website Maintenance <span className="m-text-green">&amp; Support</span>
          </div>
          <p className="m-service-desc">
            Your site is live — now what? COAI offers ongoing maintenance and support for clients who want someone
            handling updates, monitoring, and backups so you can focus on running your business. No retainers. No
            long-term commitments. Pay for what you need, when you need it.
          </p>
          <ul className="m-service-list">
            <li>
              <strong>Content updates</strong> — pricing changes, new photos, service descriptions, seasonal promotions
            </li>
            <li>
              <strong>Performance monitoring</strong> — uptime checks, speed audits, Core Web Vitals tracking
            </li>
            <li>
              <strong>Security &amp; backups</strong> — regular backups, SSL renewal, vulnerability scanning
            </li>
            <li>
              <strong>SEO maintenance</strong> — schema updates, metadata refreshes, Google Business Profile syncing
            </li>
            <li>
              <strong>Emergency fixes</strong> — broken forms, 404 spikes, hosting issues — 48-hour turnaround
            </li>
            <li>
              <strong>Feature additions</strong> — add a new service page, booking form, gallery, or blog section
            </li>
          </ul>
        </div>
        <div className="m-service-panel">
          <div className="m-service-panel-label">Support Plans</div>
          <div className="m-service-stat">
            <span className="m-big">$75</span>
            <span className="m-small">/hr — as-needed support</span>
          </div>
          <div className="m-service-stat">
            <span className="m-big">$250</span>
            <span className="m-small">/mo — 4hr monthly retainer</span>
          </div>
          <p className="m-service-panel-note">
            No long-term contracts. You can cancel anytime. Support is available for COAI-built sites and
            third-party sites we can work with (assessment required).
          </p>
        </div>
      </div>
      </Reveal>

      <Reveal>
      <div className="m-service-block">
        <div>
          <div className="m-service-num">05</div>
          <div className="m-section-label-left">Migration Service</div>
          <div className="m-service-title">
            WordPress &amp; Platform <span className="m-text-green">Migration</span>
          </div>
          <p className="m-service-desc">
            Trapped on Wix, Squarespace, GoDaddy, or WordPress? We migrate your entire digital presence to
            sovereign infrastructure — without losing SEO rankings, content, or functionality. Same domain. Same
            URLs. Same Google rankings. Just faster, cheaper to run, and fully owned by you.
          </p>
          <ul className="m-service-list">
            <li>
              <strong>Full content migration</strong> — text, images, pages, blog posts — moved as-is
            </li>
            <li>
              <strong>URL preservation</strong> — no broken links, no lost rankings, 301 redirects where needed
            </li>
            <li>
              <strong>Plugin audit</strong> — we identify what you actually need vs. what was bloat
            </li>
            <li>
              <strong>Form &amp; lead path rebuild</strong> — contact forms, booking widgets, newsletter signups
            </li>
            <li>
              <strong>Custom functionality</strong> — we rebuild essential features in clean code, no plugins
            </li>
            <li>
              <strong>Full handoff</strong> — you own the code, hosting, domain, and data — no monthly fees
            </li>
          </ul>
        </div>
        <div className="m-service-panel">
          <div className="m-service-panel-label">Typical Results</div>
          <div className="m-service-stat">
            <span className="m-big">3-10x</span>
            <span className="m-small">speed improvement after migration</span>
          </div>
          <div className="m-service-stat">
            <span className="m-big">$50-200</span>
            <span className="m-small">/mo saved on hosting &amp; plugins</span>
          </div>
          <p className="m-service-panel-note">
            Most Wix and WordPress sites we migrate go from 40-60 Lighthouse performance scores to 90+.
            Migration cost depends on complexity — typically $500-1,500 for a standard 5-10 page site.
          </p>
        </div>
      </div>
      </Reveal>

      <Reveal>
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
      </Reveal>

      <Reveal>
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
      </Reveal>

      <Reveal>
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
        <div className="m-cta-testi">
          <span style={{ color: "var(--m-green)", fontSize: "14px", letterSpacing: "1px" }}>★★★★★</span>
          <p style={{ fontStyle: "italic", color: "var(--m-muted)", fontSize: "13px", margin: "0.5rem 0" }}>
            &ldquo;No more $200/mo for a site I don&apos;t own. Finally someone who speaks straight.&rdquo;
          </p>
          <span style={{ fontSize: "12px", color: "var(--m-white)" }}>— Mike R., Plumber, Bakersfield</span>
        </div>
        <div className="m-cta-row">
          <Link href="/intake" className="m-btn-primary">
            Run My Free Diagnostic →
          </Link>
          <Link href="/pricing" className="m-btn-ghost">
            See Pricing
          </Link>
        </div>
        <div className="m-cta-badges" style={{ marginTop: "1.5rem", display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
          <span style={{ fontSize: "12px", color: "var(--m-muted)", border: "1px solid var(--m-border)", padding: "0.3rem 0.8rem", borderRadius: "4px" }}>Local Bakersfield</span>
          <span style={{ fontSize: "12px", color: "var(--m-muted)", border: "1px solid var(--m-border)", padding: "0.3rem 0.8rem", borderRadius: "4px" }}>You Own Everything</span>
          <span style={{ fontSize: "12px", color: "var(--m-muted)", border: "1px solid var(--m-border)", padding: "0.3rem 0.8rem", borderRadius: "4px" }}>No Contracts</span>
        </div>
      </div>
      </Reveal>
    </>
  );
}
