import Link from "next/link";
import { Reveal } from "@/components/revamp/Reveal";

export function WebsiteDesignPageBody() {
  return (
    <>
      <Reveal>
      <div className="m-page-hero">
        <div className="m-page-hero-grid" aria-hidden />
        <div className="m-page-hero-inner">
          <div className="m-section-label">Website Design</div>
          <h1 className="m-page-h1">
            Not a template.
            <br />
            <span className="m-text-steel">Not rented land.</span>
            <br />A system you own.
          </h1>
          <p className="m-hero-sub">
            Every COAI website is custom-built code on infrastructure you control — designed for clear conversion paths,
            crawlable local information, and a documented ownership handoff.
          </p>
          <div className="m-hero-cta-row">
            <Link href="/intake" className="m-btn-primary-marketing">
              Start My Build →
            </Link>
            <Link href="/portfolio" className="m-btn-ghost-marketing">
              See Client Sites
            </Link>
          </div>
        </div>
      </div>
      </Reveal>

      <Reveal>
      <section className="m-marketing-section">
        <div className="m-container-narrow">
          <div className="m-section-label">Design Principles</div>
          <h2 className="m-h2-marketing">
            Every decision is <span className="m-text-steel">intentional.</span>
          </h2>
          <p className="m-wd-lead">
            No decorative choices. No &quot;we thought it looked good.&quot; Every element in a COAI build exists because
            it serves the conversion goal.
          </p>
          <div className="m-principles-grid">
            {[
              [
                "01",
                "Information Architecture First",
                "The layout is structured around how a buyer makes a decision — not how the owner wants to present their company. Conversion path is designed before a single pixel is placed."
              ],
              [
                "02",
                "Mobile is the Primary Device",
                "Your customers are looking you up from a truck, a jobsite, or a parking lot. We build mobile first, desktop second. Load time, tap targets, and call buttons are all sized for a thumb."
              ],
              [
                "03",
                "Schema Baked In, Not Bolted On",
                "Eligible LocalBusiness, Service, FAQ, and breadcrumb data is written into the build from the approved business facts — not injected later by a generic plugin."
              ],
              [
                "04",
                "Speed is Non-Negotiable",
                "Performance is measured on the finished URL with realistic mobile conditions. Clean code, optimized assets, and edge delivery support the agreed performance budget without a pre-audit guarantee."
              ],
              [
                "05",
                "Trust Architecture is a Design Element",
                "Social proof, founder visibility, named accountability, and transparent pricing are positioned in the layout strategically — where skeptical buyers look first. Trust is engineered, not hoped for."
              ],
              [
                "06",
                "One Clear Next Action Per Section",
                "Decision fatigue kills conversions. Every section ends with one primary call to action. No competing buttons. No three different CTAs asking the visitor to choose where to click."
              ]
            ].map(([num, title, text]) => (
              <div key={num} className="m-principle-card">
                <div className="m-principle-num">{num}</div>
                <h3 className="m-principle-title">{title}</h3>
                <p className="m-principle-text">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      </Reveal>

      <Reveal>
      <section className="m-marketing-section m-wd-ownership">
        <div className="m-container-narrow">
          <div className="m-section-label">The Ownership Question</div>
          <h2 className="m-h2-marketing">
            Owned outright vs. <span className="m-text-steel">rented.</span>
          </h2>
          <p className="m-wd-lead">
            This is the most important decision you&apos;ll make about your digital presence. Everything else is
            secondary.
          </p>
          <div className="m-compare-grid-wd">
            <div className="m-compare-col m-owned">
              <div className="m-col-header m-col-green">◈ COAI build — you own it</div>
              <ul className="m-compare-list-wd">
                {[
                  "You own the code — completely",
                  "You own the hosting — transfer it anywhere",
                  "You own the customer data — always",
                  "No monthly platform fee paid to COAI",
                  "Hosting account remains in your control",
                  "Schema matched to eligible page content",
                  "Performance measured before handoff",
                  "Any developer can pick it up and maintain it",
                  "One-time cost, no dependency"
                ].map((t) => (
                  <li key={t}>
                    <span className="m-check">✓</span> {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="m-compare-col">
              <div className="m-col-header m-col-red">✕ Wix / Squarespace / GoDaddy</div>
              <ul className="m-compare-list-wd">
                {[
                  "Platform owns your site — you rent it",
                  "Can&apos;t move it if you leave",
                  "Data lives on their servers",
                  "Monthly fee forever — price can increase",
                  "Account can be suspended without notice",
                  "Limited schema control",
                  "Performance capped by their infrastructure",
                  "Locked into their ecosystem",
                  "Recurring cost with no equity build"
                ].map((t) => (
                  <li key={t}>
                    <span className="m-cross">✗</span> {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      </Reveal>

      <Reveal>
      <section className="m-marketing-section">
        <div className="m-container-narrow">
          <div className="m-section-label">Emergency & Repair</div>
          <h2 className="m-h2-marketing">
            Website down or <span className="m-text-steel">losing leads?</span>
          </h2>
          <p className="m-wd-lead">
            We handle urgent website repairs for Bakersfield businesses — hacked sites, broken contact forms, SSL
            errors, performance crashes. Most fixes are live within 48 hours. And if you&apos;re trapped on a platform
            like Wix or WordPress that&apos;s bleeding your budget, we migrate you to code you own so it
            never happens again.
          </p>
          <div className="m-principles-grid">
            {[
              ["⚡", "Emergency Repairs", "Broken site? We diagnose and deploy fixes fast — typically 24-48 hours for critical issues."],
              ["🔄", "WordPress Migration", "Ditch the plugin bloat. We migrate WP sites to code you own — same content, and we show you the Lighthouse scores before and after."],
              ["📉", "Speed Recovery", "Site slowed to a crawl? We find the bottleneck (hosting, bloat, bad code) and fix it without rebuilding."]
            ].map(([icon, title, text]) => (
              <div key={title} className="m-principle-card">
                <div className="m-principle-icon">{icon}</div>
                <h3 className="m-principle-title">{title}</h3>
                <p className="m-principle-text">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      </Reveal>

      <Reveal>
      <section className="m-marketing-section">
        <div className="m-container-narrow">
          <div className="m-section-label">WordPress Migration</div>
          <h2 className="m-h2-marketing">
            Stop paying the <span className="m-text-steel">WordPress tax.</span>
          </h2>
          <p className="m-wd-lead">
            WordPress runs a large share of the web, and for plenty of businesses it is the right tool. For a
            local service business with a five-page site, it often means paying for hosting, plugins, themes,
            and constant updates just to keep the thing alive. We migrate to static code you own: same
            content, same URLs, no plugin maintenance, and no monthly fee beyond hosting. We run the
            Lighthouse scan on your current site first so the comparison is measured, not asserted.
          </p>
          <div className="m-compare-grid-wd">
            <div className="m-compare-col m-owned">
              <div className="m-col-header m-col-green">◈ After Migration</div>
              <ul className="m-compare-list-wd">
                {[
                  "Performance measured on the live URL",
                  "No WordPress plugin update cycle",
                  "No WP admin to manage",
                  "URL map and redirects documented",
                  "Hosting cost published before signature",
                  "Source and handoff documentation included"
                ].map((t) => (
                  <li key={t}><span className="m-check">✓</span> {t}</li>
                ))}
              </ul>
            </div>
            <div className="m-compare-col">
              <div className="m-col-header m-col-red">✕ Before Migration</div>
              <ul className="m-compare-list-wd">
                {[
                  "Typical 3-6 second load times",
                  "Monthly plugin and theme updates",
                  "Security vulnerabilities accumulate",
                  "Hosting + plugins = $50-200+/mo",
                  "Admin overhead just to keep it running",
                  "Locked into WP ecosystem"
                ].map((t) => (
                  <li key={t}><span className="m-cross">✗</span> {t}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      </Reveal>

      <Reveal>
      <section className="m-marketing-section">
        <div className="m-container-narrow">
          <div className="m-section-label">Speed Matters</div>
          <h2 className="m-h2-marketing">
            Every second of load time <span className="m-text-steel">costs you customers.</span>
          </h2>
          <p className="m-wd-lead">
            Slow mobile pages add friction before a customer reaches the call button. We set a performance budget for
            the actual scope, optimize assets and delivery, then document the finished result on the live URL. Speed is a
            structural decision, but the honest number comes from the deployed build—not a universal promise.
          </p>
          <div className="m-stack-grid">
            {[
              ["Measured", "Live mobile performance at handoff"],
              ["Budgeted", "Assets and third-party scripts"],
              ["Tested", "Forms, calls, and key routes"],
              ["Documented", "Deployment and ownership map"]
            ].map(([stat, label]) => (
              <div key={stat} className="m-stack-card">
                <div className="m-stack-name m-text-steel">{stat}</div>
                <div className="m-stack-desc">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      </Reveal>

      <Reveal>
      <section className="m-marketing-section">
        <div className="m-container-narrow">
          <div className="m-section-label">Tech Stack</div>
          <h2 className="m-h2-marketing">
            The tools behind <span className="m-text-steel">a system you own.</span>
          </h2>
          <div className="m-stack-grid">
            {[
              ["Next.js", "E-commerce and complex app builds"],
              ["HTML5 / CSS3", "Lightweight service sites — max speed"],
              ["Vercel", "Edge deployment, instant scale"],
              ["Netlify", "Static site deployment where appropriate"],
              ["Stripe", "Payment processing integration"],
              ["Supabase", "Database and auth for app builds"],
              ["Schema.org", "Structured data for AEO/GEO"],
              ["Formspree", "Form backend without servers"]
            ].map(([name, desc]) => (
              <div key={name} className="m-stack-card">
                <div className="m-stack-name">{name}</div>
                <div className="m-stack-desc">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      </Reveal>

      <Reveal>
      <div className="m-bottom-cta">
        <div className="m-section-label">Let&apos;s Build</div>
        <h2 className="m-bottom-cta-h2">
          Your site. Your code.
          <br />
          <span className="m-text-steel">Your asset.</span>
        </h2>
        <p>
          Run the diagnostic first — 30 minutes, free, no pitch. See exactly what your current presence is costing you
          and what a rebuild would change.
        </p>
        <div className="m-cta-row">
          <Link href="/intake" className="m-btn-primary-marketing">
            Run My Free Diagnostic →
          </Link>
          <Link href="/pricing" className="m-btn-ghost-marketing">
            View Pricing
          </Link>
        </div>
      </div>
      </Reveal>
    </>
  );
}
