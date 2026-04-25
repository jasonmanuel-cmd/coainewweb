// Nav.jsx — COAI Navigation Component
// Ticker strip + sticky nav bar with logo, links, status, CTA

function Nav({ activePage, onNavigate }) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const links = [
    { href: "home", label: "Services" },
    { href: "pricing", label: "Pricing" },
    { href: "portfolio", label: "Portfolio" },
    { href: "about", label: "About" },
    { href: "faq", label: "FAQ" },
    { href: "contact", label: "Contact" },
    { href: "jax", label: "JAX" },
  ];

  return React.createElement(React.Fragment, null,
    // Ticker
    React.createElement("div", { className: "ticker" },
      React.createElement("div", { className: "ticker-track" },
        React.createElement("span", null, "JAX SENTINEL TECHNICAL BRIEF NOW AVAILABLE"),
        React.createElement("span", null, "NODE: STABLE · BAKERSFIELD 661 · SOVEREIGN STACK v1.0"),
        React.createElement("span", null, "WHERE CHAOS MEETS CLARITY · RUN YOUR FREE DIAGNOSTIC TODAY"),
        React.createElement("span", null, "JAX SENTINEL TECHNICAL BRIEF NOW AVAILABLE"),
        React.createElement("span", null, "NODE: STABLE · BAKERSFIELD 661 · SOVEREIGN STACK v1.0"),
        React.createElement("span", null, "WHERE CHAOS MEETS CLARITY · RUN YOUR FREE DIAGNOSTIC TODAY"),
      )
    ),
    // Nav bar
    React.createElement("nav", { className: "nav" },
      React.createElement("a", { className: "nav-logo", onClick: () => onNavigate("home"), style: { cursor: "pointer" } },
        React.createElement("img", { src: "../../assets/logo-nobg.png", alt: "COAI", height: "30" }),
        React.createElement("span", { className: "nav-logo-text" }, "CHAOTICALLY ORGANIZED AI")
      ),
      React.createElement("div", { className: "nav-status" },
        React.createElement("span", { className: "status-dot" }),
        "NODE: STABLE"
      ),
      React.createElement("ul", { className: "nav-links" },
        links.map(l =>
          React.createElement("li", { key: l.href },
            React.createElement("a", {
              className: activePage === l.href ? "active" : "",
              onClick: () => { onNavigate(l.href); setMenuOpen(false); },
              style: { cursor: "pointer" }
            }, l.label)
          )
        )
      ),
      React.createElement("a", {
        className: "nav-cta",
        onClick: () => onNavigate("intake"),
        style: { cursor: "pointer" }
      }, "Run Diagnostic"),
      React.createElement("button", {
        className: "hamburger",
        onClick: () => setMenuOpen(o => !o),
        "aria-label": "Menu"
      }, menuOpen ? "✕" : "☰")
    ),
    // Mobile drawer
    menuOpen && React.createElement("div", { className: "mobile-drawer" },
      links.map(l =>
        React.createElement("a", {
          key: l.href,
          onClick: () => { onNavigate(l.href); setMenuOpen(false); },
          style: { cursor: "pointer" }
        }, l.label)
      ),
      React.createElement("a", { href: "tel:+16616109198" }, "(661) 610-9198"),
      React.createElement("a", {
        className: "nav-cta",
        onClick: () => { onNavigate("intake"); setMenuOpen(false); },
        style: { cursor: "pointer", textAlign: "center" }
      }, "Run Diagnostic")
    )
  );
}

Object.assign(window, { Nav });
