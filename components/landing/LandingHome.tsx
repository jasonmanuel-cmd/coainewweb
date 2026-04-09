import Image from "next/image";
import Link from "next/link";
import { AuditForm } from "@/components/AuditForm";
import { JsonLd } from "@/components/JsonLd";
import { LpRevenueCounter } from "@/components/landing/LpRevenueCounter";
import { LpRoiBlock } from "@/components/landing/LpRoiBlock";
import { LpTicker } from "@/components/landing/LpTicker";
import { LpTopNav } from "@/components/landing/LpTopNav";
import { LpLangToggle } from "@/components/landing/LpLangToggle";
import { webSiteJsonLd } from "@/lib/schema";
import {
  BRAND_TAGLINE,
  CONTACT,
  FOUNDER,
  GOOGLE_BUSINESS_PROFILE_URL,
  LEGAL_NAME
} from "@/lib/site";

export function LandingHome() {
  return (
    <div className="lp-page">
      <JsonLd data={webSiteJsonLd()} />
      <LpTicker />
      <LpTopNav />

      <section className="lp-hero">
        <div className="lp-hero-grid-bg" aria-hidden="true" />
        <div className="lp-hero-inner">
          <div className="lp-hero-badge">Bakersfield 661 · Structural Audit Engine · Live</div>
          <h1>
            Your competitors are
            <br />
            <span className="lp-strike">invisible online.</span>
            <br />
            <span className="lp-accent">You don&apos;t have to be.</span>
          </h1>
          <p className="lp-hero-sub">
            <strong>{LEGAL_NAME.split(",")[0]}</strong> runs structural digital audits for Bakersfield operators — fixing
            slow pages, broken schema, and visibility leaks <em>before</em> you spend a dollar on ads. We build sovereign
            infrastructure you own outright.
          </p>
          <div className="lp-hero-actions">
            <Link href="/intake" className="lp-btn-primary">
              Run My Free Diagnostic →
            </Link>
            <a href="#calculator" className="lp-btn-secondary">
              Calculate My Revenue Leak
            </a>
          </div>
          <div className="lp-hero-trust">
            <div className="lp-trust-item">
              <span className="lp-check">✓</span> No rented funnels — you own the system
            </div>
            <div className="lp-trust-item">
              <span className="lp-check">✓</span> Clear pricing, no vague retainers
            </div>
            <div className="lp-trust-item">
              <span className="lp-check">✓</span> Local Bakersfield support
            </div>
            <div className="lp-trust-item">
              <span className="lp-check">✓</span> Founded by {FOUNDER.name}
            </div>
          </div>
        </div>
      </section>

      <div className="lp-stat-banner">
        <div className="lp-stat-item">
          <LpRevenueCounter />
          <div className="lp-stat-label">Revenue Recovered This Month</div>
        </div>
        <div className="lp-stat-item">
          <div className="lp-stat-num">661</div>
          <div className="lp-stat-label">Local Bakersfield Focus</div>
        </div>
        <div className="lp-stat-item">
          <div className="lp-stat-num">&lt;3s</div>
          <div className="lp-stat-label">Target Diagnostic Response</div>
        </div>
        <div className="lp-stat-item">
          <div className="lp-stat-num">100%</div>
          <div className="lp-stat-label">Sovereign — No Platform Dependency</div>
        </div>
      </div>

      <section className="lp-breach-section lp-section">
        <div className="lp-container">
          <div className="lp-breach-grid">
            <div className="lp-breach-visual">
              <div className="lp-breach-svg-wrap">
                <div className="lp-breach-label">⚠ BREACH DETECTED</div>
                <div style={{ color: "var(--lp-muted)", fontSize: 10, marginBottom: "1.5rem", marginTop: "0.5rem" }}>
                  VISIBILITY AUDIT · CURRENT BASELINE
                </div>
                <div className="lp-score-row">
                  <span className="lp-score-label">Performance</span>
                  <div className="lp-score-bar">
                    <div className="lp-score-fill lp-perf" />
                  </div>
                  <span className="lp-score-val lp-perf-c">74</span>
                </div>
                <div className="lp-score-row">
                  <span className="lp-score-label">Schema Signal</span>
                  <div className="lp-score-bar">
                    <div className="lp-score-fill lp-schema" />
                  </div>
                  <span className="lp-score-val lp-bad">56</span>
                </div>
                <div className="lp-score-row">
                  <span className="lp-score-label">AEO Readiness</span>
                  <div className="lp-score-bar">
                    <div className="lp-score-fill lp-aeo" />
                  </div>
                  <span className="lp-score-val lp-bad">61</span>
                </div>
                <div
                  style={{
                    marginTop: "1.5rem",
                    paddingTop: "1.2rem",
                    borderTop: "1px solid var(--lp-border)",
                    fontSize: 10,
                    color: "var(--lp-muted)"
                  }}
                >
                  <div style={{ color: "var(--lp-red)", marginBottom: 4 }}>
                    env::prod-sim · queue::ready · latency_target::&lt;3s
                  </div>
                  <div>Status: AWAITING TARGET URL — Submit below to run live audit</div>
                </div>
              </div>
            </div>
            <div className="lp-breach-cta-stack">
              <div className="lp-section-label">RedScreen Audit</div>
              <h2>
                Is your site <span className="lp-text-green">bleeding leads</span> right now?
              </h2>
              <p style={{ color: "var(--lp-muted)", fontSize: 14, lineHeight: 1.7, marginBottom: "1rem" }}>
                A ruptured schema layer is invisible to you — but every search engine and AI surface sees it. Green
                diagnostic light marks exactly where your ranking authority and lead flow are escaping the system.
              </p>
              <AuditForm variant="landing" />
            </div>
          </div>
        </div>
      </section>

      <section className="lp-roi-section lp-section" id="calculator">
        <div className="lp-container">
          <div className="lp-section-label">Revenue Leak Calculator</div>
          <h2>
            How much are you <span className="lp-text-green">leaving on the table</span> every month?
          </h2>
          <p style={{ color: "var(--lp-muted)", marginBottom: "2rem", maxWidth: 560 }}>
            Most Bakersfield service businesses lose 15–40% of potential revenue from unanswered calls and slow response.
            Model your number below.
          </p>
          <LpRoiBlock />
        </div>
      </section>

      <section className="lp-section" style={{ background: "var(--lp-surface)", borderTop: "1px solid var(--lp-border)" }}>
        <div className="lp-container">
          <div className="lp-section-label">Offer Ladder</div>
          <h2>
            Website-first. <span className="lp-text-green">AI-layered.</span> Always sovereign.
          </h2>
          <p style={{ color: "var(--lp-muted)", maxWidth: 540 }}>
            The website is the core system. AI is applied as a strategic growth layer once your foundation is
            conversion-ready.
          </p>
          <div className="lp-packages-grid">
            <div className="lp-pkg-card">
              <div className="lp-pkg-tier">Package 01</div>
              <div className="lp-pkg-name">Signal Foundation</div>
              <div className="lp-pkg-desc">
                Install the core website operating layer that turns silent traffic into clear buying signals.
              </div>
              <div className="lp-pkg-price">
                $1,200 <span>starting</span>
              </div>
              <ul className="lp-pkg-features">
                <li>Conversion-first message hierarchy</li>
                <li>Mobile speed &amp; trust architecture</li>
                <li>GEO / SEO / AEO visibility framework</li>
                <li>Lead capture &amp; call-route hardening</li>
              </ul>
              <Link href="/pricing#package-1" className="lp-pkg-cta">
                Inspect Architecture →
              </Link>
            </div>
            <div className="lp-pkg-card lp-featured">
              <div className="lp-pkg-badge">Most Popular</div>
              <div className="lp-pkg-tier">Package 02</div>
              <div className="lp-pkg-name">Commerce Engine</div>
              <div className="lp-pkg-desc">
                Add transaction-grade backend logic so your site sells with less friction and cleaner operations.
              </div>
              <div className="lp-pkg-price">
                $1,600 <span>starting</span>
              </div>
              <ul className="lp-pkg-features">
                <li>Everything in Signal Foundation</li>
                <li>Store backend &amp; catalog logic</li>
                <li>Up to 50 products fully configured</li>
                <li>Checkout, tax, and order-flow QA</li>
              </ul>
              <Link href="/pricing#package-2" className="lp-pkg-cta">
                Inspect Architecture →
              </Link>
            </div>
            <div className="lp-pkg-card">
              <div className="lp-pkg-tier">Package 03</div>
              <div className="lp-pkg-name">Sentinel Automation</div>
              <div className="lp-pkg-desc">
                Deploy conversational AI to intercept missed demand, qualify intent, and route bookings without manual chaos.
              </div>
              <div className="lp-pkg-price">
                $2,000 <span>starting</span>
              </div>
              <ul className="lp-pkg-features">
                <li>Everything in Signal Foundation</li>
                <li>Conversational lead qualification</li>
                <li>Missed-call recovery + callback routing</li>
                <li>Workflow-tuned booking automation</li>
              </ul>
              <Link href="/pricing#package-3" className="lp-pkg-cta">
                Inspect Architecture →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="lp-testimonials lp-section">
        <div className="lp-container">
          <div className="lp-section-label">Client Outcomes</div>
          <h2>
            Built for <span className="lp-text-green">measurable local growth.</span>
          </h2>
          <div className="lp-testimonials-grid">
            <div className="lp-testi-card">
              <div className="lp-testi-stars">★★★★★</div>
              <p className="lp-testi-text">
                &ldquo;In 30 days, qualified lead capture increased 22% and average response lag dropped below 12
                minutes.&rdquo;
              </p>
              <div className="lp-testi-author">HVAC Operator</div>
              <div className="lp-testi-role">Bakersfield, CA</div>
            </div>
            <div className="lp-testi-card">
              <div className="lp-testi-stars">★★★★★</div>
              <p className="lp-testi-text">
                &ldquo;After launch, quote requests increased 31% with clearer service framing and tighter mobile
                conversion flow.&rdquo;
              </p>
              <div className="lp-testi-author">Plumbing Team</div>
              <div className="lp-testi-role">Kern County, CA</div>
            </div>
            <div className="lp-testi-card">
              <div className="lp-testi-stars">★★★★★</div>
              <p className="lp-testi-text">
                &ldquo;Missed-call recovery plus web intake routing lifted booked jobs by 18% in the first 45 days.&rdquo;
              </p>
              <div className="lp-testi-author">Home Services Owner</div>
              <div className="lp-testi-role">Central Bakersfield</div>
            </div>
          </div>
        </div>
      </section>

      <section className="lp-section" style={{ background: "var(--lp-black)" }}>
        <div className="lp-container">
          <div className="lp-section-label">Sovereign Proof Stack</div>
          <h2>
            Why operators choose <span className="lp-text-green">infrastructure they own.</span>
          </h2>
          <div className="lp-proof-grid">
            <div className="lp-proof-card">
              <div className="lp-proof-icon">⬛</div>
              <div className="lp-proof-title">Infrastructure Ownership</div>
              <p className="lp-proof-text">
                No rented funnel dependency. One codebase, one data ledger, one accountable operator path. You own the
                house — not a tenant on someone else&apos;s platform.
              </p>
            </div>
            <div className="lp-proof-card">
              <div className="lp-proof-icon">◈</div>
              <div className="lp-proof-title">Process Clarity</div>
              <p className="lp-proof-text">
                Audit → diagnosis → prioritized fix list → tracked outcomes. No vague retainers. No mystery deliverables.
                Every milestone is scoped before work begins.
              </p>
            </div>
            <div className="lp-proof-card">
              <div className="lp-proof-icon">◉</div>
              <div className="lp-proof-title">Local 661 Precision</div>
              <p className="lp-proof-text">
                Bakersfield and 661 entity alignment across schema, GBP, and conversion-ready content. We know this market.
                We live and operate here.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="lp-final-cta">
        <div className="lp-container">
          <div className="lp-section-label" style={{ justifyContent: "center" }}>
            Ready to Deploy
          </div>
          <h2>
            Replace manual chaos
            <br />
            with a <span className="lp-text-green">growth system.</span>
          </h2>
          <p>
            Book a short strategy call and receive a practical roadmap for your next growth phase. No fluff. No pressure.
            Just data.
          </p>
          <a href={`tel:${CONTACT.phoneE164}`} className="lp-cta-phone">
            {CONTACT.phoneDisplay}
          </a>
          <div className="lp-final-cta-actions">
            <Link href="/intake" className="lp-btn-primary">
              Generate My Growth Roadmap →
            </Link>
            <Link href="/portfolio" className="lp-btn-secondary">
              See Case Studies
            </Link>
          </div>
        </div>
      </section>

      <footer className="lp-footer">
        <div className="lp-footer-inner">
          <div className="lp-footer-brand">
            <Image src="/logo.png" alt="" width={100} height={28} style={{ height: 28, width: "auto" }} />
            <span style={{ fontWeight: 700, fontSize: 13, letterSpacing: "0.08em" }}>CHAOTICALLY ORGANIZED AI</span>
            <p className="lp-footer-tagline">
              Website growth systems for Bakersfield businesses. {BRAND_TAGLINE}.
            </p>
            <p className="lp-footer-address">
              {CONTACT.addressLine}
              <br />
              {CONTACT.city}, {CONTACT.region} {CONTACT.postalCode}
              <br />
              {CONTACT.phoneDisplay}
              <br />
              {CONTACT.email}
            </p>
          </div>
          <div className="lp-footer-col">
            <h4>Services</h4>
            <ul>
              <li>
                <Link href="/services">Website Systems</Link>
              </li>
              <li>
                <Link href="/pricing">Packages</Link>
              </li>
              <li>
                <Link href="/website-design">Web Design</Link>
              </li>
              <li>
                <Link href="/contact">Consultation</Link>
              </li>
            </ul>
          </div>
          <div className="lp-footer-col">
            <h4>Company</h4>
            <ul>
              <li>
                <Link href="/portfolio">Case Studies</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/case-studies">Resources</Link>
              </li>
              <li>
                <Link href="/jax-coming-soon">JAX Preview</Link>
              </li>
            </ul>
          </div>
          <div className="lp-footer-col">
            <h4>Start</h4>
            <ul>
              <li>
                <Link href="/intake">Run Diagnostic</Link>
              </li>
              <li>
                <Link href="/faq">FAQ</Link>
              </li>
              <li>
                <Link href="/dashboard">Dashboard</Link>
              </li>
              <li>
                <a href={GOOGLE_BUSINESS_PROFILE_URL} target="_blank" rel="noopener noreferrer">
                  Google Business
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="lp-footer-bottom">
          <p>
            © 2026 {LEGAL_NAME} ·{" "}
            <Link href="/privacy" style={{ color: "var(--lp-muted)", textDecoration: "none" }}>
              Privacy
            </Link>{" "}
            ·{" "}
            <Link href="/terms" style={{ color: "var(--lp-muted)", textDecoration: "none" }}>
              Terms
            </Link>{" "}
            · Last updated April 2026
          </p>
          <LpLangToggle />
        </div>
      </footer>

      <Link href="/jax-coming-soon" className="lp-jax-float">
        <span className="lp-jax-dot" />
        <span className="lp-jax-text">JAX SENTINEL — LIVE</span>
      </Link>
    </div>
  );
}
