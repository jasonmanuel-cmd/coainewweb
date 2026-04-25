// Packages.jsx — COAI Service Package Cards

const PACKAGES = [
  {
    tier: "Package 01",
    name: "Signal Foundation",
    desc: "Install the core website operating layer that turns silent traffic into clear local buying signals.",
    price: "$1,200",
    features: [
      "Conversion-first message hierarchy",
      "Mobile speed & trust architecture",
      "GEO / SEO / AEO visibility framework",
      "Lead capture & call-route hardening",
      "Google Business Profile alignment",
      "Full code handoff — you own everything"
    ],
    featured: false
  },
  {
    tier: "Package 02",
    name: "Commerce Engine",
    desc: "Add transaction-grade backend logic so your site sells with less friction and cleaner operations.",
    price: "$1,600",
    features: [
      "Everything in Signal Foundation",
      "Store backend & catalog logic",
      "Up to 50 products fully configured",
      "Checkout, tax, and order-flow QA",
      "Inventory & variant management",
      "Payment gateway integration"
    ],
    featured: true
  },
  {
    tier: "Package 03",
    name: "Sentinel Automation",
    desc: "Deploy conversational AI to intercept missed demand, qualify intent, and route bookings without manual chaos.",
    price: "$2,000",
    features: [
      "Everything in Signal Foundation",
      "Conversational lead qualification",
      "Missed-call recovery + callback routing",
      "Workflow-tuned booking automation",
      "CRM integration & lead tracking",
      "Monthly optimization review"
    ],
    featured: false
  }
];

function Packages({ onNavigate }) {
  return React.createElement("section", { className: "packages-section" },
    React.createElement("div", { className: "container" },
      React.createElement("div", { className: "section-eyebrow" }, "Offer Ladder"),
      React.createElement("h2", { className: "section-title" },
        "Website-first. ",
        React.createElement("span", { className: "text-green" }, "AI-layered."),
        " Always sovereign."
      ),
      React.createElement("p", { className: "section-sub" },
        "The website is the core system. AI is applied as a strategic growth layer once your foundation is conversion-ready."
      ),
      React.createElement("div", { className: "packages-grid" },
        PACKAGES.map(pkg =>
          React.createElement("div", { key: pkg.tier, className: `pkg-card${pkg.featured ? " pkg-featured" : ""}` },
            pkg.featured && React.createElement("div", { className: "pkg-badge" }, "Most Popular"),
            React.createElement("div", { className: "pkg-tier" }, pkg.tier),
            React.createElement("div", { className: "pkg-name" }, pkg.name),
            React.createElement("div", { className: "pkg-desc" }, pkg.desc),
            React.createElement("div", { className: "pkg-price" },
              pkg.price, React.createElement("span", null, " starting")
            ),
            React.createElement("ul", { className: "pkg-features" },
              pkg.features.map(f =>
                React.createElement("li", { key: f },
                  React.createElement("span", { className: "feat-arrow" }, "→"), " ", f
                )
              )
            ),
            React.createElement("a", {
              className: "pkg-cta",
              onClick: () => onNavigate("pricing"),
              style: { cursor: "pointer" }
            }, "Inspect Architecture →")
          )
        )
      )
    )
  );
}

Object.assign(window, { Packages });
