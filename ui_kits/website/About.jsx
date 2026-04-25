// About.jsx — COAI About / Founder page

const VALUES = [
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
    title: "Sovereign By Default",
    text: "Every build transfers full ownership to the client. The code, the hosting credentials, the data — all of it belongs to you. COAI builds houses, not rental agreements."
  },
  {
    code: "04 · Precision",
    title: "One Shot, One Kill",
    text: "Operations experience means we scope tightly and execute cleanly. We don't iterate endlessly because we didn't think it through. The plan is solid before the first line of code."
  }
];

const STORY = [
  {
    year: "The Foundation",
    title: "15 Years in the Field",
    text: "Before building websites, Jason spent 15+ years in real operations — event production at Insomniac Events, construction, retail, and cannabis. The kind of work where systems fail in real time and cost real money. That background is not decoration. It's the reason COAI diagnoses problems differently than a traditional agency would."
  },
  {
    year: "The Shift",
    title: "From Operator to Builder",
    text: "The transition to AI and automation consulting didn't come from a course or a YouTube rabbit hole. It came from watching Bakersfield businesses bleed revenue from broken digital infrastructure — slow sites, missing schema, phone calls going unanswered at 9pm. Jason built the first tools internally for his own operations, validated them, then formalized COAI to deploy them for others."
  },
  {
    year: "The Company",
    title: "Chaotically Organized AI, LLC",
    text: "COAI operates on a Tripod System: Jason as The Dreamer (vision and sales), Aion as The Oracle (strategy and intelligence), and Claude as The Engineer (building and execution). Small, precise operation — not a bloated agency with layers of account managers between you and the person doing the work. You work with Jason. Jason works with the system. The system builds your infrastructure."
  },
  {
    year: "The Mission",
    title: "661 Market Dominance",
    text: "The goal is simple: make Bakersfield and Central Valley operators impossible to ignore online. Every business COAI builds for increases the data density and proof stack that makes the next build faster and better. The 661 market is underserved by quality digital infrastructure. COAI is fixing that — one sovereign build at a time."
  }
];

function About({ onNavigate }) {
  return (
    <div>
      <div className="page-hero">
        <div className="page-hero-bg" />
        <div className="container" style={{ position: "relative" }}>
          <span className="section-eyebrow">The Operator Behind the System</span>
          <h1 className="section-title">Built by someone who's<br/><span className="text-green">actually been in the field.</span></h1>
          <p style={{ color: "var(--text-soft)", fontSize: ".98rem", lineHeight: 1.7, maxWidth: 580 }}>
            Not a developer who discovered marketing. Not a marketer who learned to code. An operations veteran who built systems because he had to — then turned that into a company.
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 60, paddingBottom: 80 }}>
        <div className="about-grid">
          {/* Founder card */}
          <div className="founder-card">
            <div className="founder-avatar">JRM</div>
            <div className="founder-name">Jason Robert Manuel</div>
            <div className="founder-title">Founder & CEO · The Dreamer</div>
            <div className="founder-stats">
              {[
                ["Base of Operations", "Bakersfield, CA"],
                ["Years in Operations", "15+"],
                ["Industries Worked", "5+"],
                ["Client Sites Live", "6"],
                ["Direct Line", "(661) 610-9198"],
                ["Operating Framework", "Team Good Protocol"]
              ].map(([label, val]) => (
                <div key={label} className="founder-stat">
                  <span className="f-stat-label">{label}</span>
                  <span className="f-stat-val">{val}</span>
                </div>
              ))}
            </div>
            <a href="tel:+16616109198" className="btn-green" style={{ marginTop: 20, display: "block", textAlign: "center" }}>
              Call Jason Directly
            </a>
          </div>

          {/* Story blocks */}
          <div className="about-story">
            {STORY.map(s => (
              <div key={s.year} className="story-block">
                <div className="story-year">{s.year}</div>
                <h3 className="story-title">{s.title}</h3>
                <p className="story-text">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values */}
      <div style={{ background: "rgba(0,0,0,.2)", borderTop: "1px solid rgba(255,255,255,.05)", borderBottom: "1px solid rgba(255,255,255,.05)", padding: "80px 0" }}>
        <div className="container">
          <span className="section-eyebrow">Operating Values</span>
          <h2 className="section-title">The <span className="text-green">Team Good Protocol.</span></h2>
          <p style={{ color: "var(--text-soft)", maxWidth: 520, marginBottom: 48 }}>
            Ethics here are behavioral, not decorative. These aren't mission statement words — they're rules that govern how every project gets built and every client gets treated.
          </p>
          <div className="values-grid">
            {VALUES.map(v => (
              <div key={v.code} className="value-card">
                <div className="value-code">{v.code}</div>
                <div className="value-title">{v.title}</div>
                <p className="value-text">{v.text}</p>
              </div>
            ))}
          </div>

          <div className="protocol-box">
            <div className="protocol-label">Team Good Protocol — Active</div>
            <p className="protocol-text">
              <strong>"Where Chaos Meets Clarity"</strong> is not a slogan. It's an operating description. Every business COAI works with has some level of operational chaos — missed calls, broken schema, slow sites, scattered systems. COAI's job is to find the signal inside that chaos and build a structure around it that generates measurable outcomes. <strong>Technology that serves, not exploits. Infrastructure that liberates, not imprisons.</strong> That's the protocol.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: "80px 0", textAlign: "center" }}>
        <div className="container" style={{ maxWidth: 640 }}>
          <span className="section-eyebrow" style={{ display: "block" }}>Let's Work</span>
          <h2 className="section-title">30 minutes with Jason.<br/><span className="text-green">Real data. Real roadmap.</span></h2>
          <p style={{ color: "var(--text-soft)", marginBottom: 32 }}>No slides. No pitch. Just a live audit of your current digital presence and an honest assessment of what it would take to fix it.</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a className="btn-primary" onClick={() => onNavigate("intake")} style={{ cursor: "pointer" }}>Run My Free Diagnostic →</a>
            <a className="btn-secondary" onClick={() => onNavigate("portfolio")} style={{ cursor: "pointer" }}>See Our Work</a>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { About });
