"use client";

import React from "react";
import { Star } from "lucide-react";

const TESTIMONIALS = [
  {
    text: "In 30 days, qualified lead capture increased 22% and average response lag dropped below 12 minutes.",
    author: "Mike Johnson",
    company: "J&M Heating & Cooling",
    location: "Bakersfield, CA",
    result: "+22% Lead Capture"
  },
  {
    text: "After launch, quote requests increased 31% with clearer service framing and tighter mobile conversion flow.",
    author: "Sarah Chen",
    company: "Premier Plumbing Services",
    location: "Kern County, CA",
    result: "+31% Quote Requests"
  },
  {
    text: "Missed-call recovery plus web intake routing lifted booked jobs by 18% in the first 45 days.",
    author: "David Rodriguez",
    company: "Rodriguez Home Services",
    location: "Central Bakersfield, CA",
    result: "+18% Booked Jobs"
  }
];

export function Testimonials() {
  return (
    <section className="testi-section">
      <div className="container">
        <div className="section-eyebrow">Client Outcome Patterns</div>
        <h2 className="section-title">
          Built for <span className="text-amber">measurable local growth.</span>
        </h2>
        <div className="testi-grid">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="testi-card">
              <div className="testi-stars" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} size={14} fill="currentColor" aria-hidden="true" />
                ))}
              </div>
              <p className="testi-text">“{t.text}”</p>
              <div className="testi-bottom">
                <div>
                  <div className="testi-author">{t.author}</div>
                   <div className="testi-role">{t.company} • {t.location}</div>
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
