import Link from "next/link";
import { ArrowRight, Check, ClipboardCheck, Layers, KeyRound, MessageSquareText, ShieldCheck, Wrench } from "lucide-react";
import { PackageCards } from "@/components/marketing/PackageCards";
import { ADDON_CATEGORIES, ADDON_COUNT, PACKAGES } from "@/lib/pricing";
import { DELIVERY_TIMELINE, OFFERS, THIRD_PARTY_COSTS } from "@/lib/site";
import { SYSTEM_CAPABILITY_COUNT } from "@/lib/systems";

const buildControls = [
  ["Call-first website", "A fast, mobile-first custom site with clear contact paths and approved business facts."],
  ["Identity alignment", "Name, phone, hours, services, and service area reconciled across the site."],
  ["Missed-call text-back", "An approved acknowledgement and routing path, tested to the written scope. Part of Lead Machine, or an add-on."],
  ["Search and AI visibility", "Google Business + Schema, local SEO, and GEO/AEO structure so people and answer engines understand the business."],
  ["Follow-up and recovery", "Lead follow-up, quote recovery, booking, and review requests that keep the next step moving."],
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
    stage: OFFERS.website.stage,
    name: OFFERS.website.name,
    price: `${OFFERS.website.price} flat`,
    terms: OFFERS.website.terms,
    summary: OFFERS.website.summary,
    icon: Wrench
  },
  {
    number: "03",
    stage: "Add the systems",
    name: "Three packages, or pick your own",
    price: `From ${PACKAGES[0].total}`,
    terms: `Website included · ${ADDON_COUNT} add-ons priced individually`,
    summary:
      "Digital Foundation, Lead Machine, or Customer Lifecycle: the systems that win the job and keep the customer, or add one piece at a time.",
    icon: Layers
  }
] as const;

export function ServicesMarketingContent() {
  return (
    <>
      <section className="m-page-hero">
        <div className="m-page-hero-grid" aria-hidden="true" />
        <div className="m-page-hero-inner">
          <div className="m-section-label">What COAI Builds</div>
          <h1>Websites, design, and systems.<br /><span className="m-text-steel">Built to win the job.</span></h1>
          <p className="m-hero-sub">
            Custom, hand-coded websites and the systems around them: local search and AI answer visibility, missed-call
            text-back, booking, follow-up, a CRM, and reporting. Start with the website, then add only what fits. No
            retainer you have to buy to keep what you already paid for.
          </p>
          <div className="m-cta-row">
            <Link href="/intake" className="m-btn-primary">Get My Leak Score <ArrowRight aria-hidden="true" /></Link>
            <Link href="/pricing#packages" className="m-btn-ghost">See Packages and Prices</Link>
          </div>
        </div>
      </section>

      <section className="services-command-section">
        <div className="m-container">
          <div className="services-command-heading">
            <span className="section-index">[ HOW IT WORKS ]</span>
            <h2>Start with the website. Add what you need.</h2>
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

      <section className="services-build-section" aria-labelledby="services-everything-title">
        <div className="m-container services-build-layout">
          <div className="services-build-copy">
            <span className="section-index">[ EVERYTHING WE BUILD ]</span>
            <h2 id="services-everything-title">One builder, from the website to the whole customer lifecycle.</h2>
            <p>
              Nine areas of work, each priced individually and combined into packages. Pick the pieces that fit your
              business now and add more later. Everything is built on code you own.
            </p>
            <Link className="text-link" href="/pricing#addons">See every add-on and price <ArrowRight aria-hidden="true" /></Link>
          </div>
          <div className="services-controls">
            {ADDON_CATEGORIES.map((category, index) => (
              <article key={category.id}>
                <span>0{index + 1}</span>
                <div>
                  <h3>{category.title}</h3>
                  <p>{category.blurb}</p>
                  <Link className="text-link" href={`/pricing#addons-${category.id}`}>
                    {category.items.length} options with prices <ArrowRight aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="services-command-section" id="packages" aria-labelledby="services-packages-title">
        <div className="m-container">
          <div className="services-command-heading">
            <span className="section-index">[ WEBSITE PACKAGES ]</span>
            <h2 id="services-packages-title">Three packages. Build up as far as you need.</h2>
          </div>
          <PackageCards headingId="services-packages-title" compact />
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
              Nothing here is a generic “automation package.” Each component closes a documented handoff gap
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
              <p>For the website, from signed scope and received access. Systems and integrations are quoted with their own timeline in the written scope.</p>
            </div>
            <div className="services-scope-card">
              <span className="section-index">[ AFTER LAUNCH ]</span>
              <strong>30 days</strong>
              <p>Post-launch fixes are included with every website build. Ongoing website care is optional.</p>
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
          <p>Request the Job-Call Leak Scorecard and see the first control we would install before you approve a build or a package.</p>
          <Link href="/intake" className="revamp-btn-primary">Get My Leak Score <ArrowRight aria-hidden="true" /></Link>
        </div>
      </section>
    </>
  );
}
