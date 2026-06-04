"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { ArrowRight, CalendarDays, CheckCircle2, Star, Wrench } from "lucide-react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

interface HeroProps {
  onNavigate: (page: string) => void;
}

type XrayResult = {
  performance: number | null;
  seo: number | null;
  accessibility: number | null;
  bestPractices: number | null;
  error?: string;
};

function gradeLabel(score: number | null): string {
  if (score === null) return "—";
  if (score >= 90) return "A";
  if (score >= 50) return "B";
  if (score >= 10) return "C";
  return "D";
}

function gradeColor(score: number | null): string {
  if (score === null) return "var(--cream-dim)";
  if (score >= 90) return "#4ade80";
  if (score >= 50) return "#facc15";
  if (score >= 10) return "#fb923c";
  return "#f87171";
}

export function Hero({ onNavigate }: HeroProps) {
  const [xrayUrl, setXrayUrl] = useState("");
  const [xrayLoading, setXrayLoading] = useState(false);
  const [xrayResult, setXrayResult] = useState<XrayResult | null>(null);

  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 30 });

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleCardMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const runXray = async () => {
    if (!xrayUrl.trim()) return;
    setXrayLoading(true);
    setXrayResult(null);
    try {
      const r = await fetch(`/api/lighthouse?url=${encodeURIComponent(xrayUrl.trim())}&strategy=mobile`);
      const data = await r.json();
      if (!r.ok) {
        setXrayResult({ performance: null, seo: null, accessibility: null, bestPractices: null, error: data.error || "Scan failed" });
      } else {
        setXrayResult(data);
      }
    } catch {
      setXrayResult({ performance: null, seo: null, accessibility: null, bestPractices: null, error: "Network error. Try again." });
    }
    setXrayLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") runXray();
  };

  return (
    <section className="hero" style={{ position: "relative", overflow: "hidden" }}>
      <div className="hero-mesh" style={{ zIndex: 1 }} />
      <div className="container hero-inner" style={{ position: "relative", zIndex: 2 }}>
        <div className="hero-left">
          <div className="hero-pill">
            Based in Bakersfield, CA · Serving the U.S.
          </div>
           <h1 className="hero-h1">
              Get More Job Calls Without Increasing Your Ad Spend
           </h1>
            <p className="hero-sub">
               <strong>Chaotically Organized AI</strong> builds complete digital lead systems for trades businesses. Each custom website converts visitors into booked jobs using geo-targeted schema and AI-optimized copy. According to Google, 76% of people who search for a nearby service visit a business within 24 hours — but only if they find you first. COAI websites capture this traffic, text missed callers back instantly, and rank on Google Maps. No jargon, no contracts, just more jobs.
            </p>
           <div className="hero-google-rating">
             <div className="hero-google-stars" aria-label="5.0 out of 5 stars">★★★★★</div>
             <span className="hero-google-text">5.0 on Google · 8 reviews</span>
           </div>
           <div className="hero-actions">
            <a className="btn-primary" onClick={() => onNavigate("intake")} style={{ cursor: "pointer" }}>
              Get Your Free Digital Audit <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a className="btn-calendar" href="https://calendar.app.google/hswWkCmjqLEKtRuE6" target="_blank" rel="noopener noreferrer">
              <CalendarDays size={18} aria-hidden="true" />
              Book Free Audit
            </a>
            <a className="btn-phone" href="tel:6616591376">
              (661) 659-1376
            </a>
          </div>
          <div className="hero-trust">
            <div className="trust-item"><CheckCircle2 className="check" size={16} aria-hidden="true" /> You own the website — no monthly rental</div>
            <div className="trust-item"><CheckCircle2 className="check" size={16} aria-hidden="true" /> Clear pricing, no hidden fees</div>
            <div className="trust-item"><CheckCircle2 className="check" size={16} aria-hidden="true" /> 6+ trade sites already built and live</div>
            <div className="trust-item"><CheckCircle2 className="check" size={16} aria-hidden="true" /> Phone support — talk to a human</div>
            <div className="trust-item" style={{ gridColumn: "1 / -1", fontSize: "12px", color: "var(--cream-dim)", marginTop: "4px" }}>
              Source: <a href="https://www.thinkwithgoogle.com/data/near-me-micro-moments-statistics/" target="_blank" rel="noopener noreferrer" style={{ color: "var(--amber)", textDecoration: "underline" }}>Google — 76% of local searchers visit a business within 24 hours</a>
            </div>
          </div>
           <div className="trust-badges">
             <Image src="/newlogo.png" alt="COAI" width={24} height={24} style={{ borderRadius: 4, objectFit: "contain" }} />
             <span className="trust-badge">Based in Bakersfield, CA</span>
             <span className="trust-badge"><Star size={14} aria-hidden="true" /> 5 Google Rated</span>
           </div>
           <div style={{ 
             fontSize: "12px", 
             color: "var(--amber)", 
             fontWeight: 600, 
             marginTop: "16px",
             padding: "12px 16px",
             background: "rgba(232,160,32,0.08)",
             border: "1px solid rgba(232,160,32,0.2)",
             borderRadius: "6px",
             textAlign: "center"
           }}>
             🔥 Accepting 2-3 new clients this month. Limited availability.
           </div>
         </div>

        <motion.div
          className="hero-right"
          ref={cardRef}
          onMouseMove={handleCardMouseMove}
          onMouseLeave={handleCardMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
            perspective: 1000,
          }}
        >
          <div className="hero-card" style={{ transformStyle: "preserve-3d" }}>
            <div className="hero-card-icon" aria-hidden="true">
              <Wrench size={30} strokeWidth={2.2} />
            </div>
            <h3>What we do, plain and simple:</h3>
            <ul className="hero-card-list">
              <li>Websites you actually own (not rented from Wix)</li>
              <li>AI that texts your missed callers back instantly</li>
              <li>Computer repair &amp; tech support — no BS</li>
              <li>Google setup so customers can find you</li>
              <li>Free 20-minute audit to show you what&apos;s broken</li>
            </ul>
            <div className="hero-lighthouse-input">
              <p style={{ fontSize: "13px", color: "var(--cream-muted)", marginBottom: "8px", fontWeight: 600 }}>Get your Website X-Ray:</p>
              <div style={{ display: "flex", gap: "8px" }}>
                <input
                  type="url"
                  placeholder="yourwebsite.com"
                  value={xrayUrl}
                  onChange={e => setXrayUrl(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={xrayLoading}
                  style={{
                    flex: 1, padding: "10px 14px", borderRadius: "8px",
                    background: "var(--navy)", border: "1px solid var(--navy-border)",
                    color: "var(--cream)", fontSize: "14px", outline: "none"
                  }}
                />
                <button
                  onClick={runXray}
                  disabled={xrayLoading}
                  style={{
                    padding: "10px 18px", borderRadius: "8px", border: "none",
                    background: "var(--amber)", color: "var(--navy)",
                    fontWeight: 700, fontSize: "13px", cursor: "pointer", whiteSpace: "nowrap"
                  }}
                >
                  {xrayLoading ? "Scanning..." : "X-Ray It"}
                </button>
              </div>
              {xrayLoading && <p style={{ fontSize: "12px", color: "var(--cream-dim)", marginTop: "8px" }}>Running Google Lighthouse scan...</p>}
              {xrayResult && !xrayLoading && (
                <div style={{ marginTop: "12px", padding: "12px", background: "rgba(0,0,0,0.3)", borderRadius: "8px", border: "1px solid var(--navy-border)" }}>
                  {xrayResult.error ? (
                    <p style={{ fontSize: "12px", color: "#f87171" }}>{xrayResult.error}</p>
                  ) : (
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                      {[
                        ["Perf", xrayResult.performance],
                        ["SEO", xrayResult.seo],
                        ["Access", xrayResult.accessibility],
                        ["Best Pr.", xrayResult.bestPractices],
                      ].map(([label, score]) => (
                        <div key={label as string} style={{ textAlign: "center" }}>
                          <div style={{ fontSize: "10px", color: "var(--cream-dim)", textTransform: "uppercase", letterSpacing: "1px" }}>{label as string}</div>
                          <div style={{ fontSize: "20px", fontWeight: 800, color: gradeColor(score as number | null) }}>{gradeLabel(score as number | null)}</div>
                        </div>
                      ))}
                    </div>
                  )}
                  <a onClick={() => onNavigate("intake")} style={{ display: "block", textAlign: "center", marginTop: "8px", fontSize: "12px", color: "var(--amber)", cursor: "pointer", textDecoration: "underline" }}>
                    Get the full audit & fix plan <ArrowRight size={14} aria-hidden="true" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="stat-banner" style={{ position: "relative", zIndex: 2 }}>
        {[
          { num: "50+", label: "Services Offered" },
          { num: "$50", label: "PC Repair Starting Price" },
          { num: "6+", label: "Trade Sites Built" },
          { num: "100%", label: "You Own What We Build" },
        ].map((s, i) => (
          <div key={i} className="stat-item">
            <div className="stat-num">{s.num}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
