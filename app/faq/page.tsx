import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { FAQ_ITEMS } from "@/lib/faq-content";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd, faqPageJsonLd } from "@/lib/schema";

export const metadata: Metadata = pageMetadata({
  title: "FAQ — AEO, GEO & Structural Audits",
  description:
    "Answers to structural digital audits, AEO vs SEO, GEO for Bakersfield businesses, RedScreen, pricing, and how to get started with Chaotically Organized AI.",
  path: "/faq"
});

export default function FaqPage() {
  const faqLd = faqPageJsonLd(
    FAQ_ITEMS.map((item) => ({ question: item.question, answer: item.answer }))
  );
  const crumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "FAQ", path: "/faq" }
  ]);

  return (
    <main>
      <JsonLd data={faqLd} />
      <JsonLd data={crumbs} />
      <h1 className="hero-title">Frequently Asked Questions</h1>
      <p className="muted">
        Plain answers for voice search, AI surfaces, and owners evaluating a structural audit in Bakersfield or beyond.
      </p>
      <div className="panel" style={{ marginTop: "1rem" }}>
        {FAQ_ITEMS.map((item) => (
          <article key={item.question} style={{ marginBottom: "1.5rem" }}>
            <h2 style={{ fontSize: "1.1rem", marginBottom: "0.35rem" }}>{item.question}</h2>
            <p style={{ margin: 0 }}>{item.answer}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
