import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/schema";
import { CONTACT, SITE_URL } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "AI Receptionist for Bakersfield Service Businesses | COAI",
  description:
    "Cipher is COAI's AI receptionist — answers missed calls 24/7, texts leads back in seconds, qualifies intent, and books jobs automatically. Built for Bakersfield trades and contractors.",
  path: "/ai-receptionist"
});

const TICKER = ["AI RECEPTIONIST", "MISSED CALL RECOVERY", "24/7 ANSWERING", "CIPHER · LIVE", "BAKERSFIELD 661"];

export default function AiReceptionistPage() {
  const crumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "AI Receptionist", path: "/ai-receptionist" }
  ]);
  const service = serviceJsonLd(
    "AI Receptionist for Bakersfield Service Businesses",
    "Cipher is an AI-powered receptionist that answers missed calls, texts leads back in seconds, qualifies intent, and routes bookings 24/7 — no human required.",
    "/ai-receptionist"
  );
  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "AI Receptionist for Bakersfield Service Businesses | COAI",
    url: `${SITE_URL}/ai-receptionist`
  };

  return (
    <MarketingLayout tickerItems={TICKER} activeHref="/services">
      <JsonLd data={webPage} />
      <JsonLd data={crumbs} />
      <JsonLd data={service} />

      <div className="m-page-hero">
        <div className="m-page-hero-grid" aria-hidden="true" />
        <div className="m-page-hero-inner">
          <div className="m-section-label">Cipher · AI Receptionist</div>
          <h1>
            AI Receptionist for<br />
            <span className="m-text-green">Bakersfield Service Businesses</span>
          </h1>
          <p className="m-hero-sub">
            Every missed call is a missed job. Cipher answers your phone 24/7, texts the lead back in seconds,
            qualifies what they need, and routes bookings — without you lifting a finger.
          </p>
          <div className="m-cta-row">
            <Link href="/intake" className="m-btn-primary">Get Cipher for My Business →</Link>
            <a href={`tel:${CONTACT.phoneE164}`} className="m-btn-ghost">
              Hear Cipher Live: {CONTACT.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      <section className="m-marketing-section">
        <div className="m-container-narrow">
          <div className="m-section-label">The Problem</div>
          <h2 className="m-h2-marketing">
            You&apos;re losing jobs<br />
            <span className="m-text-green">after hours every night.</span>
          </h2>
          <p style={{ color: "var(--text-soft)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
            A homeowner&apos;s AC goes out at 9pm. They call three contractors. Two go to voicemail. One texts back
            within 60 seconds. They book the one who responded — even if your price was lower.
          </p>
          <p style={{ color: "var(--text-soft)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
            In Bakersfield&apos;s 661 market — where summers hit 110°F and plumbing emergencies don&apos;t wait for
            business hours — the contractor who responds first wins. Not the cheapest. Not the most experienced.
            The fastest.
          </p>
          <p style={{ color: "var(--text-soft)", lineHeight: 1.8 }}>
            Cipher makes you the one who responds in seconds, every time, around the clock.
          </p>
        </div>
      </section>

      <section className="m-marketing-section" style={{ background: "rgba(16,217,138,0.03)", borderTop: "1px solid rgba(16,217,138,0.08)", borderBottom: "1px solid rgba(16,217,138,0.08)" }}>
        <div className="m-container-wide">
          <div className="m-section-label">How It Works</div>
          <h2 className="m-h2-marketing">Three steps. <span className="m-text-green">Zero manual work.</span></h2>
          <div className="m-principles-grid" style={{ marginTop: "2.5rem" }}>
            {[
              {
                num: "01",
                title: "Call comes in",
                body: "A customer calls your business line — day, after hours, weekend, holiday. Doesn't matter. Cipher is always ready."
              },
              {
                num: "02",
                title: "Cipher answers and texts back",
                body: "If you can't pick up, Cipher texts the caller within seconds: 'Hey, this is [Your Business] — we got your call. What do you need help with?' That one text recovers most leads before they call a competitor."
              },
              {
                num: "03",
                title: "Lead qualified and routed",
                body: "Cipher asks the right questions, figures out what the customer needs, and either books them directly or sends you a clean lead summary so you can follow up with full context."
              }
            ].map((step) => (
              <div key={step.num} className="m-principle-card">
                <div className="m-principle-icon">{step.num}</div>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="m-marketing-section">
        <div className="m-container-wide">
          <div className="m-section-label">Built For</div>
          <h2 className="m-h2-marketing">Who uses Cipher in <span className="m-text-green">the 661</span></h2>
          <div className="m-principles-grid" style={{ marginTop: "2.5rem" }}>
            {[
              { trade: "HVAC & AC Repair", scenario: "Summer emergency calls at midnight. Cipher texts back instantly, qualifies the urgency, and confirms your callback window — so the homeowner doesn't book your competitor." },
              { trade: "Plumbers", scenario: "Burst pipe at 2am. Cipher captures the lead, gets the address and situation, and fires you a notification so you can decide whether to dispatch." },
              { trade: "General Contractors", scenario: "Project inquiries come in all week. Cipher qualifies scope, budget, and timeline before you spend 20 minutes on the phone with someone who isn't a real lead." },
              { trade: "Electricians", scenario: "Panel upgrades, EV charger installs, permit work — high-value jobs that start with a call. Cipher captures lead details so you can quote accurately." },
              { trade: "Roofers", scenario: "Storm damage calls spike after weather events. Cipher handles the surge volume so you don't miss anyone while you're on a roof." },
              { trade: "Any service business", scenario: "If you take calls to book jobs and sometimes miss them — Cipher pays for itself with one recovered job. For most businesses that's the first week." }
            ].map((uc) => (
              <div key={uc.trade} className="m-principle-card">
                <h3 style={{ color: "var(--accent-green)" }}>{uc.trade}</h3>
                <p>{uc.scenario}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="m-marketing-section" style={{ background: "rgba(16,217,138,0.03)", borderTop: "1px solid rgba(16,217,138,0.08)", borderBottom: "1px solid rgba(16,217,138,0.08)" }}>
        <div className="m-container-narrow" style={{ textAlign: "center" }}>
          <div className="m-section-label">Live Demo</div>
          <h2 className="m-h2-marketing">Hear Cipher <span className="m-text-green">right now.</span></h2>
          <p style={{ color: "var(--text-soft)", lineHeight: 1.8, margin: "1rem auto 2rem", maxWidth: 520 }}>
            Call <strong style={{ color: "#fff" }}>{CONTACT.phoneDisplay}</strong> — that&apos;s our live line.
            The same Cipher system we deploy for clients answers our own missed calls. No demo. No fake experience.
            You&apos;ll hear exactly what your customers would hear.
          </p>
          <a href={`tel:${CONTACT.phoneE164}`} className="m-btn-primary" style={{ display: "inline-flex" }}>
            Call {CONTACT.phoneDisplay} to Hear Cipher →
          </a>
        </div>
      </section>

      <section className="m-marketing-section">
        <div className="m-container-narrow">
          <div className="m-section-label">Pricing</div>
          <h2 className="m-h2-marketing">
            One recovered job pays for it. <span className="m-text-green">Everything after is profit.</span>
          </h2>
          <p style={{ color: "var(--text-soft)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
            Cipher is included in the <strong style={{ color: "#fff" }}>Sentinel Automation package starting at $2,000</strong> — website build, AI receptionist deployment, CRM integration, and monthly optimization. One fixed price. You own the system outright.
          </p>
          <div className="m-cta-row">
            <Link href="/intake" className="m-btn-primary">Get Started — Free Diagnostic →</Link>
            <Link href="/pricing" className="m-btn-ghost">View All Packages</Link>
          </div>
        </div>
      </section>

      <div className="m-bottom-cta">
        <div className="m-container-narrow" style={{ textAlign: "center" }}>
          <h2 className="m-h2-marketing">Stop losing jobs <span className="m-text-green">to voicemail.</span></h2>
          <p style={{ color: "var(--text-soft)", marginBottom: "2rem" }}>
            Run the free diagnostic and we&apos;ll show you exactly how many leads your current setup is losing each month.
          </p>
          <div className="m-cta-row" style={{ justifyContent: "center" }}>
            <Link href="/intake" className="m-btn-primary">Run Free Diagnostic →</Link>
            <Link href="/contact" className="m-btn-ghost">Talk to Jason</Link>
          </div>
        </div>
      </div>
    </MarketingLayout>
  );
}
