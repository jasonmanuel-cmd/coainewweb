import Link from "next/link";
import { BRAND_TAGLINE, CONTACT, FOUNDER, LEGAL_NAME } from "@/lib/site";

export function AboutMarketingContent() {
  return (
    <>
      <div className="m-page-hero">
        <div className="m-page-hero-grid" aria-hidden="true" />
        <div className="m-page-hero-inner">
          <div className="m-section-label">The Operator Behind the System</div>
          <h1>
            Built by someone who&apos;s
            <br />
            <span className="m-text-steel">actually been in the field.</span>
          </h1>
          <p className="m-hero-sub">
            Not a developer who discovered marketing. Not a marketer who learned to code. An operations veteran who built
            systems because he had to — then turned that into a company.
          </p>
        </div>
      </div>

      <section className="m-section-pad">
        <div className="m-container">
          <div className="m-founder-grid">
            <div className="m-founder-card">
              <div className="m-founder-avatar">JRM</div>
              <div className="m-founder-name">{FOUNDER.name}</div>
              <div className="m-founder-title">Founder &amp; CEO · The Dreamer</div>
              <div className="m-founder-stats">
                <div className="m-f-stat">
                  <span className="m-f-stat-label">Base of Operations</span>
                  <span className="m-f-stat-val">
                    {CONTACT.city}, {CONTACT.region}
                  </span>
                </div>
                <div className="m-f-stat">
                  <span className="m-f-stat-label">Years in Operations</span>
                  <span className="m-f-stat-val">15+</span>
                </div>
                <div className="m-f-stat">
                  <span className="m-f-stat-label">Industries Worked</span>
                  <span className="m-f-stat-val">5+</span>
                </div>
                <div className="m-f-stat">
                  <span className="m-f-stat-label">Client Sites Live</span>
                  <span className="m-f-stat-val">6</span>
                </div>
                <div className="m-f-stat">
                  <span className="m-f-stat-label">Direct Line</span>
                  <span className="m-f-stat-val">{CONTACT.phoneDisplay}</span>
                </div>
                <div className="m-f-stat">
                  <span className="m-f-stat-label">Operating Framework</span>
                  <span className="m-f-stat-val">Team Good Protocol</span>
                </div>
              </div>
            </div>
            <div className="m-founder-story">
              <div className="m-story-block">
                <div className="m-story-year">The Foundation</div>
                <h3>15 Years in the Field</h3>
                <p>
                  Before building websites, Jason spent <strong>15+ years in real operations</strong> — event production
                  at Insomniac Events, construction, retail, and cannabis. The kind of work where systems fail in real time
                  and cost real money. That background is not decoration. It&apos;s the reason COAI diagnoses problems
                  differently than a traditional agency would.
                </p>
              </div>
              <div className="m-story-block">
                <div className="m-story-year">The Shift</div>
                <h3>From Operator to Builder</h3>
                <p>
                  The transition to AI and automation consulting didn&apos;t come from a course or a YouTube rabbit hole.
                  It came from <strong>watching Bakersfield businesses bleed revenue</strong> from broken digital
                  infrastructure — slow sites, missing schema, phone calls going unanswered at 9pm. Jason built the first
                  tools internally for his own operations, validated them, then formalized COAI to deploy them for others.
                </p>
              </div>
              <div className="m-story-block">
                <div className="m-story-year">The Company</div>
                <h3>{LEGAL_NAME}</h3>
                <p>
                  COAI operates on a <strong>Tripod System</strong>: Jason as The Dreamer (vision and sales), Aion as The
                  Oracle (strategy and intelligence), and Claude as The Engineer (building and execution). It&apos;s a
                  small, precise operation — not a bloated agency with layers of account managers between you and the
                  person doing the work.{" "}
                  <strong>You work with Jason. Jason works with the system. The system builds your infrastructure.</strong>
                </p>
              </div>
              <div className="m-story-block">
                <div className="m-story-year">The Mission</div>
                <h3>661 Market Dominance</h3>
                <p>
                  The goal is simple: make Bakersfield and Central Valley operators{" "}
                  <strong>impossible to ignore online</strong>. Every business COAI builds for increases the data density
                  and proof stack that makes the next build faster and better. The 661 market is underserved by quality
                  digital infrastructure. COAI is fixing that — one installed system at a time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="m-section-pad">
        <div className="m-container">
          <div className="m-section-label">Operating Values</div>
          <h2>
            The <span className="m-text-steel">Team Good Protocol.</span>
          </h2>
          <p className="m-hero-sub">
            Ethics here are behavioral, not decorative. These aren&apos;t mission statement words — they&apos;re rules
            that govern how every project gets built and every client gets treated.
          </p>
          <div className="m-values-grid">
            {[
              {
                code: "01 · Integrity",
                title: "No Bullshit Architecture",
                text: "Every recommendation is made because it serves the client's business, not because it generates a higher invoice. If something isn't the right move, we say so before the contract is signed."
              },
              {
                code: "02 · Transparency",
                title: "Clear Scope, Every Time",
                text: "You know exactly what you're getting before work begins. Milestone-based contracts, staging links from day one, and plain-language deliverables. No mystery boxes."
              },
              {
                code: "03 · Ownership",
                title: "You Own It By Default",
                text: "Every build transfers full ownership to the client. The code, the hosting credentials, the data — all of it belongs to you. COAI builds houses, not rental agreements."
              },
              {
                code: "04 · Precision",
                title: "One Shot, One Kill",
                text: "Operations experience means we scope tightly and execute cleanly. We don't iterate endlessly because we didn't think it through. The plan is solid before the first line of code."
              }
            ].map((v) => (
              <div key={v.code} className="m-value-card">
                <div className="m-value-code">{v.code}</div>
                <div className="m-value-title">{v.title}</div>
                <p className="m-value-text">{v.text}</p>
              </div>
            ))}
          </div>

          <div className="m-protocol-box">
            <div className="m-protocol-label">Team Good Protocol — Active</div>
            <p className="m-protocol-text">
              <strong>&ldquo;{BRAND_TAGLINE}&rdquo;</strong> is not a slogan. It&apos;s an operating description. Every
              business COAI works with has some level of operational chaos — missed calls, broken schema, slow sites,
              scattered systems. COAI&apos;s job is to find the signal inside that chaos and build a structure around it
              that generates measurable outcomes.{" "}
              <strong>Technology that serves, not exploits. Infrastructure that liberates, not imprisons.</strong>{" "}
              That&apos;s the protocol.
            </p>
          </div>
        </div>
      </section>

      <div className="m-bottom-cta">
        <div className="m-section-label">Let&apos;s Work</div>
        <h2>
          30 minutes with Jason.
          <br />
          <span className="m-text-steel">Real data. Real roadmap.</span>
        </h2>
        <p>
          No slides. No pitch. Just a live audit of your current digital presence and an honest assessment of what it
          would take to fix it.
        </p>
        <div className="m-cta-row">
          <Link href="/intake" className="m-btn-primary">
            Run My Free Diagnostic →
          </Link>
          <Link href="/portfolio" className="m-btn-ghost">
            See Our Work
          </Link>
        </div>
      </div>
    </>
  );
}
