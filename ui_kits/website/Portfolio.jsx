// Portfolio.jsx — COAI Portfolio Filter Grid

const CASES = [
  {
    id: "phils", category: "food", industry: "Food & Beverage",
    client: "Phil's Cheesesteaks & More",
    location: "1112 19th St · Bakersfield, CA · Est. 1978",
    desc: "Owner Felipe brought his North Philly roots and Boricua flavor to downtown Bakersfield — real Cheez Whiz, thinly sliced ribeye, smash burgers, and crinkle-cut fries. COAI built a conversion-first restaurant site with online ordering integration, DoorDash linkage, Google Business alignment, and a menu system designed to drive pickup revenue and repeat visits. Rated 4.8–4.9 stars across Google, Yelp, and DoorDash.",
    built: ["Menu System","Online Order Flow","DoorDash Integration","GBP Schema","Mobile-First","Review Aggregation"],
    url: "https://phils-cheesesteaks-and-more.com",
    accent: "#f97316"
  },
  {
    id: "edwin", category: "finance", industry: "Credit Restoration",
    client: "Edwin Ward Consulting",
    location: "Credit Restoration Services · USA",
    desc: "Edwin Ward helps individuals repair, rebuild, and take ownership of their credit profile — one of the most high-trust, high-stakes service categories in financial consulting. COAI built a credibility-forward site with a clear service breakdown, transparent process flow, and a lead intake funnel designed to convert skeptical clients who have been burned by credit repair scams before.",
    built: ["Trust-First Layout","Lead Intake Form","Service Breakdown","Process Timeline","Schema Markup","Mobile Optimized"],
    url: "https://edwinwardconsulting.com",
    accent: "#6c63ff"
  },
  {
    id: "sig954", category: "contracting", industry: "General Contracting",
    client: "Signature 954",
    location: "Miami, FL · Area Code 954",
    desc: "Signature 954 is a Miami-area contracting company delivering premium construction and renovation work across South Florida's competitive trades market. COAI built a high-impact project showcase site with a portfolio-forward layout, service category pages, and a quote request funnel engineered for high-ticket residential and commercial contracts.",
    built: ["Project Showcase","Quote Request Funnel","Service Pages","Local SEO","Vercel Deploy","Fast Load Architecture"],
    url: "https://signature954.vercel.app",
    accent: "#10d98a"
  },
  {
    id: "hgm", category: "apparel", industry: "Apparel & Cannabis",
    client: "Home Grow Money",
    location: "E-Commerce · Apparel & Cannabis Lifestyle",
    desc: "Home Grow Money is a dual-channel lifestyle brand merging street apparel with cannabis culture. COAI architected a full Next.js e-commerce storefront handling product catalog, cart, checkout, and order flow across two distinct product verticals — engineered with rate limiting, admin controls, and Vercel deployment so the owner operates it independently without relying on Shopify.",
    built: ["Next.js Storefront","Dual Product Catalog","Cart & Checkout","Admin Dashboard","Rate Limiting","Vercel Deploy"],
    url: "https://homegrowmoney.com",
    accent: "#a855f7"
  },
  {
    id: "willam", category: "photo", industry: "Photography & Tattoo",
    client: "Willam Dean",
    location: "Real Estate Photography · Tattoo Artist",
    desc: "Willam Dean operates in two visually-driven worlds — real estate photography where sharp imagery moves listings faster, and custom tattoo artistry where the portfolio is the entire pitch. COAI built a dual-identity portfolio site that lets both audiences land in the right place without confusion. One URL, two sovereign audiences.",
    built: ["Dual Portfolio","Gallery System","Booking Intake","Real Estate Focus","Tattoo Showcase","Netlify Deploy"],
    url: "https://willamdean.netlify.app",
    accent: "#00f0ff"
  },
  {
    id: "pwr", category: "music", industry: "Independent Music",
    client: "Poison Well Records",
    location: "Independent Punk Label · USA",
    desc: "Poison Well Records is an independent punk label — raw, confrontational, and completely outside the major label machine. COAI built a site that matches the genre's energy: dark, high-contrast, built for the community not the algorithm. Roster pages, release archives, merch linkage, and a booking/contact system give the label a sovereign digital home it actually owns.",
    built: ["Roster Pages","Release Archive","Merch Integration","Booking System","High-Contrast UI","Netlify Deploy"],
    url: "https://poisonwellrecord.netlify.app",
    accent: "#ef4444"
  }
];

const FILTERS = [
  { id: "all", label: "All Work" },
  { id: "food", label: "Food & Beverage" },
  { id: "finance", label: "Finance" },
  { id: "contracting", label: "Contracting" },
  { id: "apparel", label: "Apparel" },
  { id: "photo", label: "Photography" },
  { id: "music", label: "Music" }
];

function Portfolio({ onNavigate }) {
  const [cat, setCat] = React.useState("all");
  const visible = cat === "all" ? CASES : CASES.filter(c => c.category === cat);

  return (
    <div>
      <div className="page-hero">
        <div className="page-hero-bg" />
        <div className="container" style={{ position: "relative" }}>
          <span className="section-eyebrow">Our Work</span>
          <h1 className="section-title">Sovereign builds.<br/><span className="text-green">Measurable outcomes.</span></h1>
          <p style={{ color: "var(--text-soft)", fontSize: ".98rem", lineHeight: 1.7, maxWidth: 560 }}>
            Every project listed here is live, owned by the client, and built without rented-platform dependency.
          </p>
        </div>
      </div>

      <div className="container" style={{ paddingTop: 40, paddingBottom: 100 }}>
        {/* Filter bar */}
        <div className="port-filter-bar">
          {FILTERS.map(f => (
            <button key={f.id} className={`port-filter-btn${cat === f.id ? " active" : ""}`} onClick={() => setCat(f.id)}>
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="port-grid">
          {visible.map(c => (
            <article key={c.id} className="port-card">
              <div className="port-card-accent" style={{ background: c.accent }} />
              <div className="port-card-head">
                <div className="port-live-badge">● Live</div>
                <div className="port-industry" style={{ color: c.accent }}>{c.industry}</div>
                <div className="port-client">{c.client}</div>
                <div className="port-location">{c.location}</div>
              </div>
              <p className="port-desc">{c.desc}</p>
              <div className="port-built">
                <div className="port-built-label">What COAI Built</div>
                <div className="port-tags">
                  {c.built.map(t => (
                    <span key={t} className="port-tag">{t}</span>
                  ))}
                </div>
              </div>
              <div className="port-card-footer">
                <a href={c.url} target="_blank" rel="noopener noreferrer" className="btn-primary btn-sm">
                  View Live Site ↗
                </a>
                <a className="btn-secondary btn-sm" onClick={() => onNavigate("intake")} style={{ cursor: "pointer" }}>
                  Get This Build
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="port-bottom-cta">
          <h2 className="section-title">Your business could be next.</h2>
          <p style={{ color: "var(--text-soft)", marginBottom: 24 }}>Every build starts with a free diagnostic. No pressure, no pitch — just data.</p>
          <a className="btn-primary" onClick={() => onNavigate("intake")} style={{ cursor: "pointer" }}>Run My Free Diagnostic →</a>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Portfolio });
