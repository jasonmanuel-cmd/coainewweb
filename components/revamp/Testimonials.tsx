"use client";

import React from "react";

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

export function Testimonials() {
  return (
    <section className="testi-section">
      <div className="container">
        <div className="section-eyebrow">Client Outcome Patterns</div>
        <h2 className="section-title">
          Built for <span className="text-green">measurable local growth.</span>
        </h2>
        <div className="testi-grid">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="testi-card">
              <div className="testi-stars">★★★★★</div>
              <p className="testi-text">“{t.text}”</p>
              <div className="testi-bottom">
                <div>
                  <div className="testi-author">{t.author}</div>
                  <div className="testi-role">Attribution available on request</div>
                </div>
                <span className="testi-badge">{t.result}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
