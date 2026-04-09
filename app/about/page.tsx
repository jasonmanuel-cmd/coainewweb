import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd } from "@/lib/schema";
import { GoogleBusinessLink } from "@/components/GoogleBusinessLink";
import { CONTACT, FOUNDER, LEGAL_NAME, ORG_ID } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "About — Founder & Mission",
  description:
    "Chaotically Organized AI, LLC is a Bakersfield-based practice focused on structural digital audits, AEO/GEO systems, and technical SEO for operators who need measurable lead flow.",
  path: "/about"
});

export default function AboutPage() {
  const crumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "About", path: "/about" }
  ]);

  const aboutPage = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Chaotically Organized AI",
    url: "https://chaoticallyorganizedai.com/about",
    mainEntity: { "@id": ORG_ID }
  };

  return (
    <main>
      <JsonLd data={aboutPage} />
      <JsonLd data={crumbs} />
      <h1 className="hero-title">About {LEGAL_NAME}</h1>
      <p className="muted">Last updated April 2026</p>
      <section className="panel">
        <h2 className="mono">Who we are</h2>
        <p>
          We build sovereign digital infrastructure for service businesses: fast pages, honest schema, and messaging
          systems that survive algorithm and AI shifts. The work is grounded in structural audits—not guesswork—so you
          know what broke before you fund a rebuild.
        </p>
      </section>
      <section className="panel">
        <h2 className="mono">{FOUNDER.name}</h2>
        <p>
          {FOUNDER.name} is the founder of {LEGAL_NAME}, operating from {CONTACT.city}, {CONTACT.region}. The practice
          combines technical SEO, JSON-LD architecture, and operator-focused diagnostics for teams that live on booked
          calls and field work—not vanity metrics.
        </p>
        <p className="muted">
          For methodology and proof points, see <Link href="/portfolio">case studies</Link> and the{" "}
          <Link href="/faq">FAQ</Link>. To start, use the <Link href="/intake">growth diagnostic</Link>,{" "}
          <Link href="/contact">contact</Link> the office, or{" "}
          <GoogleBusinessLink>Google Business</GoogleBusinessLink> for hours and directions.
        </p>
      </section>
    </main>
  );
}
