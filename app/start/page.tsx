import type { Metadata } from "next";
import Link from "next/link";
import { RESTRUCTURE_OFFERS } from "@/lib/restructure-offers";
import "@/components/marketing/restructure.css";
export const metadata: Metadata = { title: "Start with COAI", description: "Choose a COAI offer and send a secure inquiry. Scope and payment terms are confirmed before any charge.", alternates: { canonical: "/start" } };
export default async function Page({ searchParams }: { searchParams: Promise<{ intent?: string }> }) {
  const { intent } = await searchParams;
  const selected = RESTRUCTURE_OFFERS.find((offer) => offer.id === intent);
  return <main id="main-content" className="coai-restructure"><section className="coai-restructure-hero"><p className="coai-restructure-eyebrow">COAI / Start</p><h1>{selected ? selected.cta : "Tell us what your customer path needs."}</h1><p>{selected ? selected.description : "Choose the smallest useful first step, then tell us about your business."}</p><div className="coai-restructure-actions"><Link href={`/contact?intent=${selected?.id ?? "diagnostic"}`}>Send a secure inquiry</Link><Link href="/pricing">Compare offers</Link></div><p>We confirm the scope, milestones, account access, outside costs, and payment method in writing before charging. Existing customer billing arrangements do not change here.</p></section><section className="coai-restructure-section"><h2>What happens next.</h2><ol><li>Describe your business and the current problem.</li><li>COAI reviews fit and defines the agreed scope.</li><li>You approve the agreement and payment terms before implementation.</li></ol><p>Do not enter passwords, payment card details, or sensitive customer records into the inquiry form.</p></section></main>;
}
