import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { RESTRUCTURE_OFFERS } from "@/lib/restructure-offers";
import { SITE_URL } from "@/lib/site";
import "./restructure.css";

type Variant = "home" | "pricing" | "services" | "faq";

const titles: Record<Variant, string> = {
  home: "Turn more inquiries into customers.",
  pricing: "Three clear ways to work together.",
  services: "Find the gap. Build the path. Run the system.",
  faq: "Straight answers before you start."
};

export function RestructurePage({ variant }: { variant: Variant }) {
  return (
    <main id="main-content" className="coai-restructure">
      {variant === "pricing" && <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Chaotically Organized AI offers",
        url: `${SITE_URL}/pricing`,
        itemListElement: RESTRUCTURE_OFFERS.map((offer, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: offer.name,
          description: `${offer.price} ${offer.ongoing}. ${offer.description}`
        }))
      }} />}
      <section className="coai-restructure-hero">
        <p className="coai-restructure-eyebrow">Chaotically Organized AI · Nationwide</p>
        <h1>{titles[variant]}</h1>
        <p>COAI helps service businesses capture demand, follow up consistently, and see what happens after a customer reaches out. Start with a diagnostic, then choose the level of implementation your business needs.</p>
        <div className="coai-restructure-actions">
          <Link href="/contact?intent=diagnostic">Discuss the $500 diagnostic</Link>
          <Link href="/pricing">Compare all three offers</Link>
        </div>
      </section>

      <section className="coai-restructure-section" id="offers" aria-labelledby="offers-heading">
        <p className="coai-restructure-eyebrow">The offers</p>
        <h2 id="offers-heading">Choose the next useful step.</h2>
        <div className="coai-restructure-grid">
          {RESTRUCTURE_OFFERS.map((offer) => (
            <article key={offer.id} id={offer.id} className="coai-restructure-card">
              <h3>{offer.name}</h3>
              <p className="coai-restructure-price">{offer.price} <small>{offer.ongoing}</small></p>
              <p>{offer.description}</p>
              <ul>{offer.deliverables.map((item) => <li key={item}>{item}</li>)}</ul>
              <p className="coai-restructure-terms">{offer.payment}</p>
              <Link href={`/contact?intent=${offer.id}`}>Discuss this offer →</Link>
            </article>
          ))}
        </div>
      </section>

      <section className="coai-restructure-section coai-restructure-process" aria-labelledby="process-heading">
        <p className="coai-restructure-eyebrow">How work starts</p>
        <h2 id="process-heading">A written scope before implementation.</h2>
        <ol>
          <li>Tell us how customers currently find and contact you.</li>
          <li>We review the gap and recommend the smallest appropriate offer.</li>
          <li>We agree on deliverables, access, timing, third-party costs, and acceptance criteria in writing.</li>
        </ol>
        <p>Existing customers keep their current agreements unless a separate change is agreed. Third-party subscriptions and ad spend are quoted separately and require your approval.</p>
      </section>

      {variant === "faq" && <section className="coai-restructure-section" aria-labelledby="questions-heading">
        <h2 id="questions-heading">Common questions</h2>
        <div className="coai-restructure-faq">
          <h3>Is the diagnostic free?</h3><p>No. It is $500, with $200 upfront and $300 due at delivery.</p>
          <h3>Is the monthly fee included in implementation?</h3><p>No. Revenue Engine is $1,997 plus $297 per month. Revenue Infrastructure starts at $4,997 plus $597–$997 per month, depending on the agreed scope.</p>
          <h3>Do I need a new CRM?</h3><p>Not automatically. We review your existing tools and document any proposed integration or migration before changing customer records.</p>
          <h3>What happens to my data?</h3><p>Ownership, access, exports, and ongoing responsibilities are documented in the customer handoff.</p>
        </div>
      </section>}

      <section className="coai-restructure-section coai-restructure-end">
        <h2>Ready to see the next step?</h2>
        <p>Share your current customer journey and we will discuss whether the diagnostic fits.</p>
        <Link href="/contact?intent=diagnostic">Contact COAI →</Link>
      </section>
    </main>
  );
}
