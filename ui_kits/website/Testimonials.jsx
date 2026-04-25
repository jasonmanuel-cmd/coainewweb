// Testimonials.jsx — Client outcome testimonial cards

const TESTIMONIALS = [
  {
    text: "In 30 days, qualified lead capture increased 22% and average response lag dropped below 12 minutes.",
    author: "HVAC Operator, Bakersfield",
    result: "+22% Lead Capture"
  },
  {
    text: "After launch, quote requests increased 31% with clearer service framing and tighter mobile conversion flow.",
    author: "Plumbing Team, Kern County",
    result: "+31% Quote Requests"
  },
  {
    text: "Missed-call recovery plus web intake routing lifted booked jobs by 18% in the first 45 days.",
    author: "Home Services Owner, Central Bakersfield",
    result: "+18% Booked Jobs"
  }
];

function Testimonials() {
  return React.createElement("section", { className: "testi-section" },
    React.createElement("div", { className: "container" },
      React.createElement("div", { className: "section-eyebrow" }, "Client Outcome Patterns"),
      React.createElement("h2", { className: "section-title" },
        "Built for ", React.createElement("span", { className: "text-green" }, "measurable local growth.")
      ),
      React.createElement("div", { className: "testi-grid" },
        TESTIMONIALS.map((t, i) =>
          React.createElement("div", { key: i, className: "testi-card" },
            React.createElement("div", { className: "testi-stars" }, "★★★★★"),
            React.createElement("p", { className: "testi-text" }, "\u201c", t.text, "\u201d"),
            React.createElement("div", { className: "testi-bottom" },
              React.createElement("div", null,
                React.createElement("div", { className: "testi-author" }, t.author),
                React.createElement("div", { className: "testi-role" }, "Attribution available on request")
              ),
              React.createElement("span", { className: "testi-badge" }, t.result)
            )
          )
        )
      )
    )
  );
}

Object.assign(window, { Testimonials });
