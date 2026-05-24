import Link from "next/link";

export function WebsiteDesignPageBody() {
  return (
    <>
      <div className="m-page-hero">
        <div className="m-grid-bg" aria-hidden />
        <div className="m-page-hero-inner">
          <div className="m-section-label">Website Design</div>
          <h1 className="m-page-h1">
            Not a template.
            <br />
            <span className="m-text-green">Not rented land.</span>
            <br />A sovereign system.
          </h1>
          <p className="m-hero-sub">
            Every COAI website is custom-built code on infrastructure you own — designed to convert visitors, rank on
            search, and surface on AI platforms from day one.
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

      <section className="m-marketing-section">
        <div className="m-container-narrow">
          <div className="m-section-label">Design Principles</div>
          <h2 className="m-h2-marketing">
            Every decision is <span className="m-text-green">intentional.</span>
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
                "Over 70% of local service searches in Bakersfield happen on a phone. We build mobile first, desktop second. Load time, tap targets, and call buttons are all optimized for thumb navigation."
              ],
              [
                "03",
                "Schema Baked In, Not Bolted On",
                "LocalBusiness, Service, FAQ, and Review schema is written into the HTML structure from day one — not added later with a plugin. This is what makes AI search surfaces cite your business accurately."
              ],
              [
                "04",
                "Speed is Non-Negotiable",
                "Target: sub-3 second load on 4G mobile. Achieved through clean code, optimized assets, and edge deployment — not through compressing your site into an unrecognizable husk."
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

      <section className="m-marketing-section m-wd-sovereign">
        <div className="m-container-narrow">
          <div className="m-section-label">The Ownership Question</div>
          <h2 className="m-h2-marketing">
            Sovereign house vs. <span className="m-text-green">rented land.</span>
          </h2>
          <p className="m-wd-lead">
            This is the most important decision you&apos;ll make about your digital presence. Everything else is
            secondary.
          </p>
          <div className="m-compare-grid-wd">
            <div className="m-compare-col m-sovereign">
              <div className="m-col-header m-col-green">◈ COAI Sovereign Build</div>
              <ul className="m-compare-list-wd">
                {[
                  "You own the code — completely",
                  "You own the hosting — transfer it anywhere",
                  "You own the customer data — always",
                  "No monthly platform fee to keep it live",
                  "No risk of account suspension",
                  "Custom schema and AEO structure",
                  "Performance scores 90+ achievable",
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
                  "Can't move it if you leave",
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

      <section className="m-marketing-section" style={{ background: "var(--m-surface)", borderTop: "1px solid var(--m-border)" }}>
        <div className="m-container-narrow">
          <div className="m-section-label">Emergency & Repair</div>
          <h2 className="m-h2-marketing">
            Website down or <span className="m-text-green">losing leads?</span>
          </h2>
          <p className="m-wd-lead">
            We handle urgent website repairs for Bakersfield businesses — hacked sites, broken contact forms, SSL
            errors, performance crashes. Most fixes are live within 48 hours. And if you&apos;re trapped on a platform
            like Wix or WordPress that&apos;s bleeding your budget, we migrate you to sovereign infrastructure so it
            never happens again.
          </p>
          <div className="m-principles-grid" style={{ marginTop: "1.5rem" }}>
            {[
              ["⚡", "Emergency Repairs", "Broken site? We diagnose and deploy fixes fast — typically 24-48 hours for critical issues."],
              ["🔄", "WordPress Migration", "Ditch the plugin bloat. We migrate WP sites to fast, sovereign code — same content, 10x the performance."],
              ["📉", "Speed Recovery", "Site slowed to a crawl? We find the bottleneck (hosting, bloat, bad code) and fix it without rebuilding."]
            ].map(([icon, title, text]) => (
              <div key={title} className="m-principle-card">
                <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{icon}</div>
                <h3 className="m-principle-title">{title}</h3>
                <p className="m-principle-text">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="m-marketing-section">
        <div className="m-container-narrow">
          <div className="m-section-label">WordPress Migration</div>
          <h2 className="m-h2-marketing">
            Stop paying the <span className="m-text-green">WordPress tax.</span>
          </h2>
          <p className="m-wd-lead">
            WordPress powers 40% of the web — but for a local Bakersfield service business, it&apos;s usually overkill.
            You&apos;re paying for hosting, plugins, themes, and constant updates just to keep a 5-page site alive.
            We migrate WordPress sites to static sovereign code: same content, same SEO rankings, 10x the speed, zero
            plugin maintenance, zero monthly fees beyond hosting.
          </p>
          <div className="m-compare-grid-wd">
            <div className="m-compare-col m-sovereign">
              <div className="m-col-header m-col-green">◈ After Migration</div>
              <ul className="m-compare-list-wd">
                {[
                  "Load times under 2 seconds",
                  "No plugin updates or security patches",
                  "No WP admin to manage",
                  "Same URLs — no SEO loss",
                  "Hosting cost ~$5-20/mo",
                  "Any developer can maintain it"
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

      <section className="m-marketing-section" style={{ background: "var(--m-surface)", borderTop: "1px solid var(--m-border)" }}>
        <div className="m-container-narrow">
          <div className="m-section-label">Speed Matters</div>
          <h2 className="m-h2-marketing">
            Every second of load time <span className="m-text-green">costs you customers.</span>
          </h2>
          <p className="m-wd-lead">
            Google data shows 53% of mobile users abandon a site that takes longer than 3 seconds to load. For
            Bakersfield service businesses, that&apos;s a homeowner clicking your competitor instead of calling you.
            We build for sub-2-second loads on 4G by default — not through caching tricks, but through clean
            architecture, optimized assets, and edge deployment. Speed is a structural decision, not a tweak.
          </p>
          <div className="m-stack-grid">
            {[
              ["Under 2s", "Target load time on 4G mobile"],
              ["90+", "Target Lighthouse performance"],
              ["Zero", "Render-blocking resources"],
              ["Edge", "Deployed globally on CDN"]
            ].map(([stat, label]) => (
              <div key={stat} className="m-stack-card">
                <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--m-green)" }}>{stat}</div>
                <div className="m-stack-desc">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="m-marketing-section">
        <div className="m-container-narrow">
          <div className="m-section-label">Tech Stack</div>
          <h2 className="m-h2-marketing">
            The tools that build <span className="m-text-green">sovereign infrastructure.</span>
          </h2>
          <div className="m-stack-grid">
            {[
              ["Next.js", "E-commerce and complex app builds"],
              ["HTML5 / CSS3", "Lightweight service sites — max speed"],
              ["Vercel", "Edge deployment, instant scale"],
              ["Netlify", "Static site hosting, 99.9% uptime"],
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

      <div className="m-bottom-cta">
        <div className="m-section-label">Let&apos;s Build</div>
        <h2 className="m-bottom-cta-h2">
          Your site. Your code.
          <br />
          <span className="m-text-green">Your asset.</span>
        </h2>
        <p>
          Run the diagnostic first — 30 minutes, free, no pitch. See exactly what your current presence is costing you
          and what a sovereign build would change.
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
    </>
  );
}
