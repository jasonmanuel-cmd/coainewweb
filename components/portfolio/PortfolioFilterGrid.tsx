"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { PortfolioCategory } from "@/lib/portfolio-cases";
import { PORTFOLIO_CASES } from "@/lib/portfolio-cases";

const FILTERS: { id: PortfolioCategory; label: string }[] = [
  { id: "all", label: "All Work" },
  { id: "food", label: "Food & Beverage" },
  { id: "finance", label: "Finance" },
  { id: "contracting", label: "Building & Trades" },
  { id: "apparel", label: "Apparel" },
  { id: "photo", label: "Photography" },
  { id: "music", label: "Music" },
  { id: "real-estate", label: "Real Estate" },
  { id: "home-services", label: "Home Services" }
];

export function PortfolioFilterGrid() {
  const [cat, setCat] = useState<PortfolioCategory>("all");

  return (
    <>
      <div className="m-filter-bar">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            className={`m-filter-btn ${cat === f.id ? "m-active" : ""}`}
            onClick={() => setCat(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>
      <div className="m-portfolio-grid">
        {PORTFOLIO_CASES.map((c) => (
          <article
            key={c.id}
            data-category={c.category}
            className={`m-case-card ${cat === "all" || cat === c.category ? "m-case-card--visible" : "m-case-card--hidden"}`}
          >
            <div className={`m-card-accent ${c.accentClass}`} />
            {c.previewImage && (
              <div className="m-card-preview">
                <Image
                  className="m-card-preview-image"
                  src={c.previewImage}
                  alt={c.previewAlt ?? `${c.client} website screenshot`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            )}
            <div className="m-card-header">
              <div className="m-outcome-badge m-badge-live">● Live</div>
              <div className={`m-card-industry-tag ${c.tagClass}`}>{c.industryLabel}</div>
              <div className="m-card-client">{c.client}</div>
              <div className="m-card-location">{c.location}</div>
            </div>
            <div className="m-card-body">
              <p className="m-card-desc">{c.description}</p>
              <div className="m-card-built">
                <div className="m-card-built-label">What COAI Built</div>
                <div className="m-card-built-list">
                  {c.built.map((tag) => (
                    <span key={tag} className="m-built-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="m-card-footer">
              <a href={c.liveUrl} target="_blank" rel="noopener noreferrer" className="m-card-link m-primary">
                View Live Site ↗
              </a>
              <Link href="/intake" className="m-card-link">
                Get This Build
              </Link>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
