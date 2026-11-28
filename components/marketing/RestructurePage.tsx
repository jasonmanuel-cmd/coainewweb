import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { OpportunityCalculator } from "@/components/marketing/OpportunityCalculator";
import { RESTRUCTURE_OFFERS } from "@/lib/restructure-offers";
import { SITE_URL } from "@/lib/site";
import "./restructure.css";

type Variant = "home" | "pricing" | "services" | "faq";

const stages = [
  ["Discover", "Be found and understood in search and answer systems."],
  ["Convert", "Give visitors a clear next step on every device."],
  ["Capture", "Route calls and forms into a reliable lead record."],
  ["Recover", "Follow up on missed calls and unanswered inquiries."],
  ["Optimize", "Review measured outcomes before changing the system."]
] as const;

const questions = [
  ["What does the diagnostic cost?", "The full COAI Digital Diagnostic & Repair is $500: $200 upfront and $300 after the agreed repairs. A diagnostic-only option is $200. The repair scope is written before work begins."],
  ["How long does implementation take?", "The diagnostic targets 7–14 days, Revenue Engine 5–10 business days, and Infrastructure 10–20 business days, subject to scope, access, and approvals."],
  ["Who owns the website and customer data?", "Ownership, account access, exports, and handoff responsibilities are documented in the agreement. Existing systems are reviewed before migration."],
  ["Can COAI work with my current website and CRM?", "Yes, where the tools support the agreed work. Any replacement or integration is defined before customer records change."],
  ["What does the monthly fee include?", "The written scope defines hosting, monitoring, maintenance, reporting, support, and optimization. Third-party subscriptions, usage, and extra work are disclosed separately."],
  ["Is AI usage unlimited?", "No. AI receptionist capabilities, volume limits, provider costs, and human handoff rules are defined before activation."],
  ["Can I cancel or export my data?", "The signed agreement states notice, service end date, account access, data export, and transition responsibilities."],
  ["Are the calculator results guaranteed?", "No. Its outputs are illustrative estimates from your inputs, not a forecast or revenue guarantee."]
] as const;

function OfferCards() {
  return <div className="coai-restructure-grid">{RESTRUCTURE_OFFERS.map((offer) => <article key={offer.id} id={offer.id} className={`coai-restructure-card${offer.id === "revenue-engine" ? " featured" : ""}`}>
    {offer.id === "revenue-engine" && <p className="coai-card-label">Core implementation</p>}
    <h3>{offer.name}</h3><p className="coai-restructure-price">{offer.price} <small>{offer.ongoing}</small></p><p>{offer.description}</p>
    <ul>{offer.deliverables.map((item) => <li key={item}>{item}</li>)}</ul><p className="coai-restructure-terms">{offer.payment}. {offer.timing}.</p><Link href={offer.href}>{offer.cta} →</Link>
  </article>)}</div>;
}

function Faq() {
  return <section className="coai-restructure-section" aria-labelledby="questions-heading"><p className="coai-restructure-eyebrow">Clear terms</p><h2 id="questions-heading">Questions before you start.</h2>
    <div className="coai-restructure-faq">{questions.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
  </section>;
}

export function RestructurePage({ variant }: { variant: Variant }) {
  const home = variant === "home";
  const titles: Record<Variant, string> = { home: "Your business is losing opportunities. We find out where.", pricing: "Three clear ways to fix the customer path.", services: "From missed opportunity to managed system.", faq: "Straight answers before you start." };
  return <main id="main-content" className="coai-restructure">
    {variant === "pricing" && <JsonLd data={{ "@context": "https://schema.org", "@type": "ItemList", name: "COAI offers", url: `${SITE_URL}/pricing`, itemListElement: RESTRUCTURE_OFFERS.map((offer, index) => ({ "@type": "ListItem", position: index + 1, name: offer.name, url: `${SITE_URL}/${offer.id}`, description: `${offer.price} ${offer.ongoing}. ${offer.description}` })) }} />}
    <section className="coai-restructure-hero"><p className="coai-restructure-eyebrow">COAI / Intelligent Business Infrastructure / Nationwide</p><h1>{titles[variant]}</h1>
      <p>COAI identifies the digital and operational gaps costing service businesses customers, repairs those problems, and builds connected systems designed to improve discoverability, capture opportunities, and streamline follow-up.</p>
      <div className="coai-restructure-actions"><Link href="/start?intent=diagnostic">Start Your Diagnostic</Link><Link href="/#offers">Explore Our Solutions</Link></div>
      <p className="coai-restructure-tagline">Find the leak. Fix the leak. Run the system.</p>
      {home && <div className="coai-system-rail" aria-label="COAI system stages">{stages.map(([stage], index) => <a key={stage} href={`#stage-${index}`}><span>0{index + 1}</span>{stage}</a>)}</div>}
    </section>
    {home && <section className="coai-restructure-section coai-problem" aria-labelledby="problem-heading"><p className="coai-restructure-eyebrow">The business problem</p><h2 id="problem-heading">Opportunities disappear between the first search and the final follow-up.</h2><p>Weak search visibility, outdated mobile pages, broken forms, missed calls, disconnected software, and slow responses make it hard to see where customers were lost. We measure the path and repair what is broken.</p></section>}
    {(home || variant === "services") && <section className="coai-restructure-section" aria-labelledby="system-heading"><p className="coai-restructure-eyebrow">The COAI system</p><h2 id="system-heading">Discover → Convert → Capture → Recover → Optimize.</h2><p>Open a stage to see its practical outcome.</p><div className="coai-stage-grid">{stages.map(([stage, description], index) => <details key={stage} id={`stage-${index}`}><summary><span>0{index + 1}</span>{stage}</summary><p>{description}</p></details>)}</div></section>}
    {variant !== "faq" && <section className="coai-restructure-section" id="offers" aria-labelledby="offers-heading"><p className="coai-restructure-eyebrow">Three solutions</p><h2 id="offers-heading">Start with the smallest useful step.</h2><OfferCards /></section>}
    {home && <section className="coai-restructure-section" aria-labelledby="calculator-heading"><p className="coai-restructure-eyebrow">Explore the math</p><h2 id="calculator-heading">What could missed calls represent?</h2><p>Enter your own assumptions to see an illustrative path from missed calls to possible contribution after the monthly service fee.</p><OpportunityCalculator /></section>}
    {home && <section className="coai-restructure-section coai-evidence" aria-labelledby="evidence-heading"><p className="coai-restructure-eyebrow">Customer work</p><h2 id="evidence-heading">Inspect the work. Ask about the result.</h2><p>Our portfolio documents selected customer websites and delivered features. Measured outcomes are published only with a source and customer permission.</p><Link href="/case-studies">View documented projects →</Link></section>}
    {home && <section className="coai-restructure-section" aria-labelledby="industries-heading"><p className="coai-restructure-eyebrow">Service businesses</p><h2 id="industries-heading">A missed inquiry matters when each job matters.</h2><p>Contractors, homebuilders, restoration teams, and high-value local services need a dependable path from discovery to quote or appointment.</p><Link href="/industries">Explore industries →</Link></section>}
    <section className="coai-restructure-section coai-restructure-process" aria-labelledby="process-heading"><p className="coai-restructure-eyebrow">Implementation</p><h2 id="process-heading">A defined process with visible handoffs.</h2><ol><li>Diagnostic</li><li>Findings</li><li>Agreement</li><li>Implementation</li><li>Verification</li><li>Ongoing management</li></ol><p>Existing customer agreements remain in place unless separately changed. The written scope defines access, milestones, support, revisions, outside costs, usage limits, acceptance, and data handoff.</p></section>
    {(home || variant === "faq") && <Faq />}
    <section className="coai-restructure-section coai-restructure-end"><p className="coai-restructure-eyebrow">The next step</p><h2>Find out where your customer path breaks.</h2><p>Start with the diagnostic or request a consultation for a more complex system.</p><div className="coai-restructure-actions"><Link href="/start?intent=diagnostic">Start Your Diagnostic</Link><Link href="/start?intent=infrastructure">Request a Consultation</Link></div></section>
  </main>;
}
