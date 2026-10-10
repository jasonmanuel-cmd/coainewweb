import Link from "next/link";
import { ArrowRight, Check, ClipboardCheck, Gauge, KeyRound, MessageSquareText, ShieldCheck, Wrench } from "lucide-react";
import { DELIVERY_TIMELINE, OFFERS, THIRD_PARTY_COSTS } from "@/lib/site";
import { SYSTEM_CAPABILITY_COUNT } from "@/lib/systems";

const buildControls = [
  ["Call-first website", "A fast, mobile-first site with clear contact paths and approved business facts."],
  ["Identity alignment", "Name, phone, hours, services, and service area reconciled across the delivered system."],
  ["Missed-call recovery", "Text-back, acknowledgement, and routing paths configured and tested to the written scope."],
  ["Lead pipeline", "A simple owner-visible path for new, contacted, qualified, and booked opportunities."],
  ["Google profile baseline", "A structured cleanup plan for the business profile and local trust signals."],
  ["Ownership handoff", "Account map, credentials, source access, and launch documentation delivered to you."]
] as const;

const stages = [
  {
    number: "01",
    stage: OFFERS.scorecard.stage,
    name: OFFERS.scorecard.name,
    price: OFFERS.scorecard.price,
    terms: OFFERS.scorecard.alt,
    summary: OFFERS.scorecard.summary,
    icon: ClipboardCheck
  },
  {
    number: "02",
    stage: OFFERS.tradecall.stage,
    name: OFFERS.tradecall.name,
    price: `${OFFERS.tradecall.price} flat`,
    terms: OFFERS.tradecall.terms,
    summary: OFFERS.tradecall.summary,
    icon: Wrench
  },
  {
    number: "03",
    stage: OFFERS.continuity.stage,
    name: OFFERS.continuity.name,
    price: `${OFFERS.continuity.price}/${OFFERS.continuity.period}`,
    terms: OFFERS.continuity.terms,
    summary: OFFERS.continuity.summary,
    icon: Gauge
  }
] as const;

export function ServicesMarketingContent() {
  return (
    <>
      <section className="m-page-hero">
        <div className="m-page-hero-grid" aria-hidden="true" />
        <div className="m-page-hero-inner">
          <div className="m-section-label">What COAI Installs</div>
          <h1>One revenue path.<br /><span className="m-text-steel">Three clear stages.</span></h1>
          <p className="m-hero-sub">
            Find the leak, install the controls, then keep the system verified. No conflicting service menu and no
            retainer you have to buy to keep what you already paid for.
          </p>
          <div className="m-cta-row">
            <Link href="/intake" className="m-btn-primary">Get My Leak Score <ArrowRight aria-hidden="true" /></Link>
            <Link href="/pricing" className="m-btn-ghost">See Every Cost</Link>
          </div>
        </div>
      </section>

      <section className="services-command-section">
        <div className="m-container">
          <div className="services-command-heading">
            <span className="section-index">[ THE COMPLETE OFFER ]</span>
            <h2>Three stages. Nothing hidden between them.</h2>
          </div>
          <div className="services-command-grid">
            {stages.map((item) => {
              const Icon = item.icon;
              return (
                <article className="services-command-card" key={item.number}>
                  <div className="services-command-top"><span>{item.number}</span><Icon aria-hidden="true" /></div>
                  <span className="services-command-stage">{item.stage}</span>
                  <h3>{item.name}</h3>
                  <strong>{item.price}</strong>
                  <small>{item.terms}</small>
                  <p>{item.summary}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="services-map-section" aria-labelledby="services-map-title">
        <div className="m-container services-map-layout">
          <div className="services-map-copy">
            <span className="section-index">[ PUBLIC SYSTEMS BRIEFING ]</span>
            <h2 id="services-map-title">The website is one piece. The systems around it are the rest.</h2>
            <p>
              COAI&apos;s capability map covers {SYSTEM_CAPABILITY_COUNT} practical controls across capture, qualification,
              conversion, discovery, retention, and measurement. It is a diagnostic map—not a promise that every module
              belongs in every build.
            </p>
            <Link className="text-link" href="/systems">Explore the complete catalog <ArrowRight aria-hidden="true" /></Link>
          </div>
          <div className="services-map-steps">
            <article><span>01</span><div><h3>Catch</h3><p>Missed calls, quote requests, and booking attempts enter a visible path.</p></div></article>
            <article><span>02</span><div><h3>Convert</h3><p>Proof, qualification, and clear next actions move demand toward scheduled work.</p></div></article>
            <article><span>03</span><div><h3>Keep</h3><p>Reviews, reminders, reactivation, and referrals extend the customer relationship.</p></div></article>
          </div>
        </div>
      </section>

      <section className="services-build-section">
        <div className="m-container services-build-layout">
          <div className="services-build-copy">
            <span className="section-index">[ INSIDE THE BUILD ]</span>
            <h2>Controls you can see, test, and own.</h2>
            <p>
              The flagship build is not a generic “automation package.” Each component closes a documented handoff gap
              between an interested customer and the person responsible for the next action.
            </p>
            <div className="services-build-meta">
              <span><MessageSquareText aria-hidden="true" /> Response path tested</span>
              <span><ShieldCheck aria-hidden="true" /> Human escalation defined</span>
              <span><KeyRound aria-hidden="true" /> Ownership documented</span>
            </div>
          </div>
          <div className="services-controls">
            {buildControls.map(([title, text], index) => (
              <article key={title}>
                <span>0{index + 1}</span>
                <div><h3>{title}</h3><p>{text}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="services-scope-section">
        <div className="m-container">
          <div className="services-scope-grid">
            <div className="services-scope-card">
              <span className="section-index">[ STANDARD DELIVERY ]</span>
              <strong>{DELIVERY_TIMELINE}</strong>
              <p>From signed scope and received access. Complex integrations are quoted with their own timeline.</p>
            </div>
            <div className="services-scope-card">
              <span className="section-index">[ OPTIMIZATION ]</span>
              <strong>30 days</strong>
              <p>Launch checks and baseline optimization are included before optional continuity begins.</p>
            </div>
            <div className="services-scope-card">
              <span className="section-index">[ OWNERSHIP ]</span>
              <strong>100%</strong>
              <p>You receive the delivered code, account map, data access, and handoff documentation.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="services-cost-section">
        <div className="m-container services-cost-layout">
          <div>
            <span className="section-index">[ THIRD-PARTY COSTS ]</span>
            <h2>Paid to the vendor.<br />Never marked up by COAI.</h2>
          </div>
          <div className="services-cost-list">
            {THIRD_PARTY_COSTS.map((cost) => (
              <div key={cost.item}><span>{cost.item}<small>{cost.paidTo}</small></span><strong>{cost.cost}</strong></div>
            ))}
          </div>
        </div>
      </section>

      <section className="services-final">
        <div className="m-container services-final-inner">
          <Check aria-hidden="true" />
          <h2>Start with evidence—not a pitch.</h2>
          <p>Request the Job-Call Leak Scorecard and see the first control we would install before you approve a build.</p>
          <Link href="/intake" className="revamp-btn-primary">Get My Leak Score <ArrowRight aria-hidden="true" /></Link>
        </div>
      </section>
    </>
  );
}
