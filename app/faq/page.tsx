import type { Metadata } from "next";
import Link from "next/link";
import { FaqMarketingAccordion } from "@/components/faq/FaqMarketingAccordion";
import { JsonLd } from "@/components/JsonLd";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { FAQ_MARKETING_SECTIONS, faqMarketingFlat } from "@/lib/faq-marketing-data";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd, faqPageJsonLd } from "@/lib/schema";
import { CONTACT } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: { absolute: "FAQ | Chaotically Organized AI - Bakersfield 661" },
  description:
    "Answers to every question Bakersfield business owners ask before hiring COAI. Pricing, timelines, ownership, AI automation, website maintenance, migration, and ongoing support - all of it.",
  path: "/faq"
});

export default function FaqPage() {
  const faqLd = faqPageJsonLd(faqMarketingFlat());
  const crumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "FAQ", path: "/faq" }
  ]);

  return (
    <MarketingLayout activeHref="/faq">
      <JsonLd data={faqLd} />
      <JsonLd data={crumbs} />

      <div className="m-page-hero">
        <div className="m-page-hero-grid" aria-hidden="true" />
        <div className="m-page-hero-inner">
          <div className="m-section-label">Answers</div>
          <h1>
            Every question.
            <br />
            <span className="m-text-green">Straight answer.</span>
          </h1>
          <p className="m-hero-sub">
            No fluff. No sales language. If you have a question that isn&apos;t here, call {CONTACT.phoneDisplay} or run
            the diagnostic - that&apos;s where the real conversation starts.
          </p>
        </div>
      </div>

      <FaqMarketingAccordion sections={FAQ_MARKETING_SECTIONS} />

      <div className="m-bottom-cta">
        <div className="m-section-label">Still Have Questions</div>
        <h2>
          Call us. <span className="m-text-green">No script, no pitch.</span>
        </h2>
        <p>
          Jason picks up or calls back same day. Or run the diagnostic - that 30-minute session answers most questions
          with actual data about your specific situation.
        </p>
        <div className="m-cta-row">
          <Link href="/intake" className="m-btn-primary">
            Run My Free Diagnostic &gt;
          </Link>
          <a href={`tel:${CONTACT.phoneE164}`} className="m-btn-ghost">
            Call {CONTACT.phoneDisplay}
          </a>
        </div>
      </div>
    </MarketingLayout>
  );
}
