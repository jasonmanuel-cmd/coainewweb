// Faq.jsx — COAI FAQ Accordion with section nav

const FAQ_SECTIONS = [
  {
    id: "pricing", title: "Pricing",
    items: [
      { q: "What does it cost to work with COAI?", a: "Website builds start at $1,200 for the Signal Foundation package and go up to $2,000+ for the Sentinel Automation layer. Exact pricing is scoped per project — we don't charge extra for complexity you don't need, and we don't pad quotes to hit a number.\n\nThe diagnostic call is free. The proposal is free. You only pay when a clear scope is agreed on and work begins." },
      { q: "Are there monthly fees or retainers?", a: "No mandatory retainers. Every build is a one-time fixed-price engagement. You own the result. There's no ongoing fee to keep your site running. Optional ongoing support is available for clients who want COAI managing updates, monitoring, or expanding the system — but it's never a requirement." },
      { q: "Do you offer payment plans?", a: "Yes. Milestone-based payment structures are available on larger builds. Typically 50% to start, 50% on delivery — or a three-milestone split for bigger projects. We work with operators, not against them." }
    ]
  },
  {
    id: "process", title: "Process",
    items: [
      { q: "How long does a build take?", a: "Standard website builds complete in 2 to 4 weeks from signed scope to live deployment. Simpler builds (Signal Foundation) can be faster. More complex e-commerce or automation stacks take the full 4 weeks. Every milestone has a staging link so you can see it taking shape in real time." },
      { q: "What do I need to provide to get started?", a: "At minimum: your business name, services, target market, and any existing branding (logo, colors if you have them). We handle the rest — copy direction, layout, schema structure, and technical architecture. If you have photos, testimonials, or existing content, bring it. We don't stall projects waiting for perfect assets." },
      { q: "How involved do I need to be during the build?", a: "Minimal. You review at each milestone checkpoint — that's typically 2 to 3 review sessions over the build period. Each session is focused: specific questions, specific feedback, no open-ended brainstorming that wastes your time. You run your business. We build the system." }
    ]
  },
  {
    id: "ownership", title: "Ownership",
    items: [
      { q: "Who owns the website after it's built?", a: "You own everything. The code, the domain, the hosting account, the customer data — all of it transfers to you at handoff. COAI retains no ongoing control or access unless you explicitly grant it for support purposes. This is what \"sovereign infrastructure\" means. We build houses, not rental agreements." },
      { q: "What's the difference between a COAI build and Wix or Squarespace?", a: "Wix and Squarespace are rented land. You pay monthly to live on their platform. If they raise prices, change features, or shut down, you lose everything. A COAI build is custom code on hosting you control. It loads faster, ranks better, has cleaner schema, and can be handed to any developer in the world to maintain. It's an asset — not a subscription." }
    ]
  },
  {
    id: "ai", title: "AI & Automation",
    items: [
      { q: "What is the AI receptionist and do I need it?", a: "Cipher is COAI's AI receptionist — a voice and text system that answers missed calls, qualifies leads, and routes bookings 24/7 without you lifting a finger. It's deployed on COAI's own line at (661) 610-9198 — call it and hear exactly what your customers would experience. You don't need it to get a great website. But if you're missing calls after hours — this is the fix." },
      { q: "What is AEO and why does it matter?", a: "AEO stands for Answer Engine Optimization — the practice of structuring your site so AI tools like ChatGPT, Google's AI overview, Perplexity, and voice assistants can read and cite your business accurately. When someone asks Siri \"who does AC repair in Bakersfield,\" AEO determines whether your business shows up in that answer. SEO gets you on Google. AEO gets you into AI search surfaces." }
    ]
  },
  {
    id: "local", title: "Local & 661",
    items: [
      { q: "Do you only work with Bakersfield businesses?", a: "No — COAI works with businesses anywhere in the US. The portfolio includes clients in Miami (Signature 954) and national e-commerce brands. But the 661 / Bakersfield market is the primary focus because it's underserved and Jason knows it from the inside." },
      { q: "Do you offer Spanish-language builds?", a: "Yes. Bilingual (EN/ES) builds are available and strongly recommended for Kern County businesses. Over 50% of Bakersfield's population is Spanish-speaking — a monolingual English site is actively ignoring a significant portion of your market. COAI builds dual-language systems with proper hreflang markup." }
    ]
  },
  {
    id: "technical", title: "Technical",
    items: [
      { q: "What platform or tech stack do you build on?", a: "Depends on the project. Next.js for complex e-commerce and application builds. Sovereign HTML/CSS/JS for fast, lightweight service business sites with maximum performance scores. Deployed to Vercel or Netlify for reliability. The goal is always the fastest, most schema-clean result for your specific use case — not a one-size-fits-all template." },
      { q: "Can I update the site myself after handoff?", a: "Yes. COAI builds with handoff documentation and trains you (or your team) on how to make standard content updates — prices, hours, photos, service descriptions. For larger structural changes, ongoing support is available at a flat hourly rate. You will never be held hostage to COAI for routine updates." }
    ]
  }
];

function Faq({ onNavigate }) {
  const [openKey, setOpenKey] = React.useState(null);
  const toggle = k => setOpenKey(o => o === k ? null : k);

  return (
    <div>
      <div className="page-hero">
        <div className="page-hero-bg" />
        <div className="container" style={{ position: "relative" }}>
          <span className="section-eyebrow">FAQ</span>
          <h1 className="section-title">Every question<br/><span className="text-green">answered straight.</span></h1>
          <p style={{ color: "var(--text-soft)", fontSize: ".98rem", lineHeight: 1.7, maxWidth: 520 }}>No corporate hedging. If you have a question that isn't here, call Jason directly at (661) 610-9198.</p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 40, paddingBottom: 100 }}>
        <div className="faq-layout">
          {/* Side nav */}
          <nav className="faq-nav">
            <div className="faq-nav-label">Jump To</div>
            <ul>
              {FAQ_SECTIONS.map(s => (
                <li key={s.id}>
                  <button onClick={() => setOpenKey(null)} style={{ background: "none", border: "none", color: "var(--text-muted)", fontSize: ".82rem", cursor: "pointer", padding: "6px 0", fontFamily: "var(--font-body)", textAlign: "left", transition: "color .2s" }}
                    onMouseEnter={e => e.target.style.color = "#fff"}
                    onMouseLeave={e => e.target.style.color = "var(--text-muted)"}
                  >{s.title}</button>
                </li>
              ))}
            </ul>
            <div style={{ marginTop: 32, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,.06)" }}>
              <div style={{ fontSize: ".72rem", color: "var(--text-muted2)", marginBottom: 12, letterSpacing: 1, textTransform: "uppercase", fontWeight: 700 }}>Still have questions?</div>
              <a href="tel:+16616109198" className="btn-green btn-sm" style={{ display: "block", textAlign: "center" }}>Call Jason</a>
            </div>
          </nav>

          {/* Accordion */}
          <div className="faq-content">
            {FAQ_SECTIONS.map(section => (
              <section key={section.id} id={section.id} className="faq-section">
                <h2 className="faq-section-title">{section.title}</h2>
                {section.items.map((item, idx) => {
                  const key = `${section.id}-${idx}`;
                  const isOpen = openKey === key;
                  return (
                    <div key={key} className={`faq-item${isOpen ? " open" : ""}`}>
                      <button className="faq-question" onClick={() => toggle(key)}>
                        <span>{item.q}</span>
                        <span className="faq-toggle">{isOpen ? "−" : "+"}</span>
                      </button>
                      {isOpen && (
                        <div className="faq-answer">
                          {item.a.split("\n\n").map((p, i) => (
                            <p key={i}>{p}</p>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Faq });
