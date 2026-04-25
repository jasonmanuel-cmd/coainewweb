// Hero.jsx — COAI Landing Page Hero Section

function Hero({ onNavigate }) {
  const [revenue, setRevenue] = React.useState(148230);

  React.useEffect(() => {
    const id = setInterval(() => {
      setRevenue(v => v + Math.floor(Math.random() * 120 + 40));
    }, 2800);
    return () => clearInterval(id);
  }, []);

  return React.createElement("section", { className: "hero" },
    // Mesh bg (CSS animated)
    React.createElement("div", { className: "hero-mesh" }),
    React.createElement("div", { className: "hero-orb hero-orb-1" }),
    React.createElement("div", { className: "hero-orb hero-orb-2" }),

    React.createElement("div", { className: "container hero-inner" },
      // Left
      React.createElement("div", { className: "hero-left" },
        React.createElement("div", { className: "hero-pill" },
          React.createElement("span", { className: "pill-dot" }),
          "Bakersfield 661 · Structural Audit Engine · Live"
        ),
        React.createElement("h1", { className: "hero-h1" },
          "Your competitors are",
          React.createElement("br"),
          React.createElement("del", { className: "hero-strike" }, "invisible online."),
          React.createElement("br"),
          React.createElement("span", { className: "hero-accent" }, "You don't have to be.")
        ),
        React.createElement("p", { className: "hero-sub" },
          React.createElement("strong", null, "Chaotically Organized AI"),
          " runs structural digital audits for Bakersfield operators — fixing slow pages, broken schema, and visibility leaks ",
          React.createElement("em", null, "before"),
          " you spend a dollar on ads. We build sovereign infrastructure you own outright."
        ),
        React.createElement("div", { className: "hero-ticker-row" },
          React.createElement("div", { className: "live-ticker" },
            React.createElement("span", { className: "ticker-label" }, "Recovered Revenue This Month"),
            React.createElement("span", { className: "ticker-val" }, "$", revenue.toLocaleString())
          )
        ),
        React.createElement("div", { className: "hero-actions" },
          React.createElement("a", { className: "btn-primary", onClick: () => onNavigate("intake"), style: { cursor: "pointer" } }, "Run My Free Diagnostic →"),
          React.createElement("a", { className: "btn-secondary", href: "tel:+16616109198" }, "(661) 610-9198")
        ),
        React.createElement("div", { className: "hero-trust" },
          ["No rented funnels — you own the system", "Clear pricing, no vague retainers", "Local Bakersfield support", "Founded by Jason Robert Manuel"].map(t =>
            React.createElement("div", { key: t, className: "trust-item" },
              React.createElement("span", { className: "check" }, "✓"), " ", t
            )
          )
        )
      ),
      // Right
      React.createElement("div", { className: "hero-right" },
        React.createElement("div", { className: "hero-card" },
          React.createElement("div", { className: "card-head" },
            React.createElement("span", { className: "card-badge breach" }, "⚠ BREACH DETECTED"),
            React.createElement("div", { className: "card-sub" }, "VISIBILITY AUDIT · CURRENT BASELINE")
          ),
          ["Performance", "Schema Signal", "AEO Readiness"].map((label, i) =>
            React.createElement("div", { key: label, className: "score-row" },
              React.createElement("span", { className: "score-label" }, label),
              React.createElement("div", { className: "score-bar" },
                React.createElement("div", { className: `score-fill score-fill-${i}` })
              ),
              React.createElement("span", { className: "score-val" }, "--")
            )
          ),
          React.createElement("div", { className: "card-footer-note" },
            React.createElement("div", { className: "card-red-text" }, "env::prod-sim · queue::ready · latency_target::<3s"),
            "Status: Run the live scanner above for real scores"
          ),
          React.createElement("a", { className: "btn-primary btn-sm", onClick: () => onNavigate("intake"), style: { cursor: "pointer", marginTop: 16, display: "block", textAlign: "center" } }, "Run Free Diagnostic →")
        ),
        // Float cards
        React.createElement("div", { className: "float-card float-card-1" },
          React.createElement("div", { className: "float-icon" }, "↑"),
          React.createElement("div", null,
            React.createElement("div", { className: "float-title" }, "+22% Lead Capture"),
            React.createElement("div", { className: "float-sub" }, "30-day outcome")
          ),
          React.createElement("span", { className: "float-badge green" }, "LIVE")
        ),
        React.createElement("div", { className: "float-card float-card-2" },
          React.createElement("div", { className: "float-icon" }, "◉"),
          React.createElement("div", null,
            React.createElement("div", { className: "float-title" }, "Schema: Hardened"),
            React.createElement("div", { className: "float-sub" }, "AEO ready")
          )
        )
      )
    ),

    // Stat banner
    React.createElement("div", { className: "stat-banner" },
      [
        { num: "$" + revenue.toLocaleString(), label: "Revenue Recovered This Month" },
        { num: "661", label: "Local Bakersfield Focus" },
        { num: "<3s", label: "Target Diagnostic Response" },
        { num: "100%", label: "Sovereign — No Platform Dependency" }
      ].map((s, i) =>
        React.createElement("div", { key: i, className: "stat-item" },
          React.createElement("div", { className: "stat-num" }, s.num),
          React.createElement("div", { className: "stat-label" }, s.label)
        )
      )
    )
  );
}

Object.assign(window, { Hero });
