import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { RESTRUCTURE_OFFERS } from "@/lib/restructure-offers";
import { SITE_URL } from "@/lib/site";
import "./restructure.css";

export function OfferDetailPage({ id }: { id: (typeof RESTRUCTURE_OFFERS)[number]["id"] }) {
  const offer = RESTRUCTURE_OFFERS.find((item) => item.id === id)!;
  const path = id === "diagnostic" ? "/diagnostic" : `/${id}`;
  return <main id="main-content" className="coai-restructure">
    <JsonLd data={{ "@context": "https://schema.org", "@type": "Service", name: offer.name, description: offer.description, url: `${SITE_URL}${path}`, provider: { "@type": "Organization", name: "Chaotically Organized AI, LLC", url: SITE_URL }, areaServed: { "@type": "Country", name: "United States" } }} />
    <section className="coai-restructure-hero"><p className="coai-restructure-eyebrow">COAI / {offer.name}</p><h1>{offer.name}</h1><p>{offer.description}</p><p className="coai-restructure-price">{offer.price} <small>{offer.ongoing}</small></p><div className="coai-restructure-actions"><Link href={offer.href}>{offer.cta}</Link><Link href="/pricing">Compare all offers</Link></div></section>
    <section className="coai-restructure-section"><p className="coai-restructure-eyebrow">Included in the written scope</p><h2>What this engagement covers.</h2><ul className="coai-detail-list">{offer.deliverables.map((item) => <li key={item}>{item}</li>)}</ul><p><strong>Payment:</strong> {offer.payment}.</p><p><strong>Timing:</strong> {offer.timing}.</p></section>
    <section className="coai-restructure-section coai-restructure-process"><h2>Clear boundaries before work begins.</h2><p>We document deliverables, responsibilities, access, acceptance, support, revision limits, usage, data ownership, cancellation, and handoff. Third-party subscriptions, advertising, and work outside scope require separate approval. No customer outcome or ranking is guaranteed.</p></section>
    <section className="coai-restructure-section coai-restructure-end"><h2>Ready to discuss this work?</h2><div className="coai-restructure-actions"><Link href={offer.href}>{offer.cta}</Link><Link href="/contact">Contact COAI</Link></div></section>
  </main>;
}
