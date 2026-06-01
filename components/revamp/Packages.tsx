"use client";

import React, { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

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

function TiltCard({ pkg, onNavigate }: { pkg: typeof PACKAGES[number]; onNavigate: (p: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 25 });
  const glowX = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const glowY = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`pkg-card${pkg.featured ? " pkg-featured" : ""}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 800,
        position: "relative",
        overflow: "hidden",
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Mouse-tracked highlight glare */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at ${glowX} ${glowY}, rgba(232,160,32,0.08) 0%, transparent 60%)`,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        {pkg.featured && <div className="pkg-badge">Most Popular</div>}
        <div className="pkg-tier">{pkg.tier}</div>
        <div className="pkg-name">{pkg.name}</div>
        <div className="pkg-desc">{pkg.desc}</div>
        <div className="pkg-price">
          {pkg.price}<span> starting</span>
        </div>
        <ul className="pkg-features">
          {pkg.features.map((f) => (
            <li key={f}>
              <span className="feat-arrow" aria-hidden="true"><ArrowRight size={14} /></span> {f}
            </li>
          ))}
        </ul>
        <a
          className="pkg-cta"
          onClick={() => onNavigate("pricing")}
          style={{ cursor: "pointer" }}
        >
          Inspect Architecture <ArrowRight size={16} aria-hidden="true" />
        </a>
      </div>
    </motion.div>
  );
}

interface PackagesProps {
  onNavigate: (page: string) => void;
}

export function Packages({ onNavigate }: PackagesProps) {
  return (
    <section className="packages-section">
      <div className="container">
        <div className="section-eyebrow">Offer Ladder</div>
        <h2 className="section-title">
          Website-first. <span className="text-amber">AI-layered.</span> Always sovereign.
        </h2>
        <p className="section-sub">
          The website is the core system. AI is applied as a strategic growth layer once your foundation is conversion-ready.
        </p>
        <div className="packages-grid" style={{ perspective: "1200px" }}>
          {PACKAGES.map((pkg) => (
            <TiltCard key={pkg.tier} pkg={pkg} onNavigate={onNavigate} />
          ))}
        </div>
      </div>
    </section>
  );
}
