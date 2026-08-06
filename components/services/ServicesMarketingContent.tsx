import Link from "next/link";
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
            Systems, not <span className="m-text-steel">subscriptions.</span>
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
            Structural Digital <span className="m-text-steel">Audit</span>
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
          </div>
        <div className="m-service-panel">
          <div className="m-service-panel-label">What the audit checks</div>
          <div className="m-service-stat">
            <span className="m-big">01</span>
            <span className="m-small">Lighthouse scan of your live site</span>
          </div>
          <div className="m-service-stat">
            <span className="m-big">02</span>
            <span className="m-small">schema and business-facts check</span>
          </div>
          <div className="m-service-stat">
            <span className="m-big">03</span>
            <span className="m-small">call path and response-time test</span>
          </div>
          <p className="m-service-panel-note">
            We measure the same four Lighthouse scores before and after, on your own URL, and show you both. We
            do not publish a target score here — your content, images, and third-party tools set the ceiling,
            and anyone quoting you a guaranteed number has not looked at your site yet.
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
            AI <span className="m-text-steel">Automation</span> Stack
          </div>
          <p className="m-service-desc">
            Your phone is your main lead source, and every missed call is a job going to whoever answers next.
            We install the intake path that catches it: missed calls that never get returned, voicemails nobody
            listens to, late-night inquiries that cool off before morning. Calls received, missed, texted back,
            qualified, estimates booked — that is the sequence, and each step is a control you can test.
          </p>
          <ul className="m-service-list">
            <li>
              <strong>AI receptionist deployment</strong> — Cipher, tuned to your business, with disclosure,
              recording consent, an emergency exclusion, and a named human escalation. Coverage hours are
              scoped and written down, never assumed.
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
          <p className="m-service-panel-note">
            *Note: Cipher is our production-ready live receptionist. JAX is our separate internal/pre-deployment sentinel system.
          </p>
        </div>
        <div className="m-service-panel">
          <div className="m-service-panel-label">Live Deployment</div>
          <div className="m-service-stat">
            <span className="m-big">&lt;30s</span>
            <span className="m-small">missed call response time</span>
          </div>
          <div className="m-service-stat">
            <span className="m-big">01</span>
            <span className="m-small">named human escalation</span>
          </div>
          <p className="m-service-panel-note">
            Every automated path has a person behind it. Ask for a human at any point and you get one. An
            automation with no human fallback is not a feature — it is a new way to fail, which is why we
            scope the escalation before we scope the script.
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
            Call-First Website <span className="m-text-steel">Builds</span>
          </div>
          <p className="m-service-desc">
            Your website should catch the search and hand the caller a button, not sit there as a brochure
            nobody finds. We hand-code the site with LocalBusiness schema, consistent business facts, and one
            obvious path to a call. No templates, no drag-and-drop builders, no platform lock-in.{" "}
            <strong>You control the domain, hosting, source code, analytics, and lead data</strong>, and the
            handoff is documented.
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
        </div>
        <div className="m-service-panel">
          <div className="m-service-panel-label">Build Philosophy</div>
          <div className="m-philosophy-list">
            <div className="m-philosophy-item m-philosophy-owned">OWNED OUTRIGHT</div>
            <div className="m-philosophy-row">→ Custom code you own</div>
            <div className="m-philosophy-row">→ No platform fees</div>
            <div className="m-philosophy-row">→ No account shutdowns</div>
            <div className="m-philosophy-row">→ Data is yours forever</div>
            <div className="m-philosophy-item m-philosophy-rented">RENTED LAND (avoid)</div>
            <div className="m-philosophy-row">→ Wix / Squarespace / GoDaddy</div>
            <div className="m-philosophy-row">→ Platform controls your data</div>
            <div className="m-philosophy-row">→ Price hikes whenever they want</div>
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
            Website Maintenance <span className="m-text-steel">&amp; Support</span>
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
            WordPress &amp; Platform <span className="m-text-steel">Migration</span>
          </div>
          <p className="m-service-desc">
            On Wix, Squarespace, GoDaddy, or WordPress and want out? We migrate the whole presence to code you
            own — same domain, same URLs, content intact. A platform site can be the right call for a simple
            brochure; we compare control, export path, performance, maintenance, and five-year cost with you
            before recommending a move, and sometimes the answer is to stay put.
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
          <div className="m-service-panel-label">How we decide</div>
          <div className="m-service-stat">
            <span className="m-big">04</span>
            <span className="m-small">Lighthouse scores, measured before and after</span>
          </div>
          <div className="m-service-stat">
            <span className="m-big">05</span>
            <span className="m-small">year cost compared, both options</span>
          </div>
          <p className="m-service-panel-note">
            We run the scan on your current site first and show you the number. Migration is scoped and quoted
            per project — page count and how cleanly the content moves set the price, and you get it in
            writing before anything starts.
          </p>
        </div>
      </div>
      </Reveal>

      <Reveal>
      <section className="m-section-pad">
        <div className="m-container">
          <div className="m-section-label">Who We Serve</div>
          <h2>
            Built for <span className="m-text-steel">operators</span>, not idea people.
          </h2>
          <p className="m-hero-sub">
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
            From first call to <span className="m-text-steel">live system</span> — no mystery.
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
                tag: "Documented Handoff · Accounts In Your Name"
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
          <span className="m-text-steel">See your actual numbers.</span>
        </h2>
        <p>
          30 minutes. Real data. Clear roadmap. Whether you hire us or not, you leave with actionable intelligence about
          your digital presence.
        </p>
        <div className="m-cta-testi">
          <span className="m-cta-rating">★★★★★</span>
          <p className="m-cta-quote">
            &ldquo;No more $200/mo for a site I don&apos;t own. Finally someone who speaks straight.&rdquo;
          </p>
          <span className="m-cta-author">— Mike R., Plumber, Bakersfield</span>
        </div>
        <div className="m-cta-row">
          <Link href="/intake" className="m-btn-primary">
            Run My Free Diagnostic →
          </Link>
          <Link href="/pricing" className="m-btn-ghost">
            See Pricing
          </Link>
        </div>
        <div className="m-cta-badges">
          <span className="m-cta-badge">Local Bakersfield</span>
          <span className="m-cta-badge">You Own Everything</span>
          <span className="m-cta-badge">No Contracts</span>
        </div>
      </div>
      </Reveal>
    </>
  );
}
