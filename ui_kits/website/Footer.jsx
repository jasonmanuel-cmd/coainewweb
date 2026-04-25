// Footer.jsx — COAI Multi-column marketing footer

function Footer({ onNavigate }) {
  const cols = [
    { title: "Services", links: [["home","Website Systems"],["pricing","Packages"],["home","Web Design"],["intake","Consultation"]] },
    { title: "Company", links: [["portfolio","Portfolio"],["about","About"],["faq","FAQ"],["jax","JAX"]] },
    { title: "Start", links: [["intake","Run Diagnostic"],["pricing","Pricing"],["contact","Contact"]] }
  ];

  return React.createElement("footer", { className: "footer" },
    React.createElement("div", { className: "footer-inner" },
      React.createElement("div", { className: "footer-brand" },
        React.createElement("div", { className: "footer-logo-row" },
          React.createElement("img", { src: "../../assets/logo-nobg.png", alt: "COAI", height: "28" }),
          React.createElement("span", { className: "footer-wordmark" }, "CHAOTICALLY ORGANIZED AI")
        ),
        React.createElement("p", { className: "footer-tagline" }, "Website growth systems for Bakersfield businesses. Where Chaos Meets Clarity."),
        React.createElement("address", { className: "footer-address" },
          "1712 19th St #216", React.createElement("br"),
          "Bakersfield, CA 93301", React.createElement("br"),
          React.createElement("a", { href: "tel:+16616109198" }, "(661) 610-9198"), React.createElement("br"),
          React.createElement("a", { href: "mailto:jason@coaibakersfield.com" }, "jason@coaibakersfield.com")
        )
      ),
      cols.map(col =>
        React.createElement("div", { key: col.title, className: "footer-col" },
          React.createElement("h4", { className: "footer-col-title" }, col.title),
          React.createElement("ul", null,
            col.links.map(([href, label]) =>
              React.createElement("li", { key: label },
                React.createElement("a", { onClick: () => onNavigate(href), style: { cursor: "pointer" } }, label)
              )
            )
          )
        )
      )
    ),
    React.createElement("div", { className: "footer-bottom" },
      React.createElement("p", null,
        "© 2026 Chaotically Organized AI, LLC · ",
        React.createElement("a", null, "Privacy"), " · ",
        React.createElement("a", null, "Terms"), " · Last updated April 2026"
      ),
      React.createElement("div", { className: "footer-status" },
        React.createElement("span", { className: "status-dot" }),
        "NODE: STABLE"
      )
    )
  );
}

Object.assign(window, { Footer });
