import type { Metadata } from "next";
import Link from "next/link";
import "@/components/marketing/restructure.css";
export const metadata: Metadata = { title: "Service industries | COAI", description: "COAI helps contractors and high-value local services capture, recover, and measure customer inquiries.", alternates: { canonical: "/industries" } };
const industries = [
  ["HVAC and plumbing", "Urgent calls need clear service-area pages, reliable routing, and a response process."],
  ["Roofing, electrical, and general contracting", "High-value estimates need a simple path from project interest to a qualified conversation."],
  ["Restoration and homebuilding", "Longer decisions need organized inquiries, follow-up ownership, and visible next steps."],
  ["Automotive detailing and coatings", "Appointment-based services need accurate listings, strong mobile pages, and timely follow-up."],
  ["Other established local services", "We assess the customer journey before recommending a system or a new tool."]
] as const;
export default function Page() { return <main id="main-content" className="coai-restructure"><section className="coai-restructure-hero"><p className="coai-restructure-eyebrow">COAI / Industries</p><h1>Built for service businesses where each inquiry matters.</h1><p>The customer path varies by industry. The method stays the same: discover, convert, capture, recover, and optimize.</p><div className="coai-restructure-actions"><Link href="/start?intent=diagnostic">Start Your Diagnostic</Link></div></section><section className="coai-restructure-section"><h2>Common customer journeys.</h2><div className="coai-restructure-grid">{industries.map(([name, detail]) => <article className="coai-restructure-card" key={name}><h3>{name}</h3><p>{detail}</p></article>)}</div></section></main>; }
