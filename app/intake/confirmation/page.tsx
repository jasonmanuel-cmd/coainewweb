import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd } from "@/lib/schema";
import { CONTACT, SITE_URL } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Diagnostic Submitted",
  description: "Your diagnostic intake was received. Jason follows up within 2 hours during business windows.",
  path: "/intake/confirmation"
});

const TICKER = [
  "SUBMISSION RECEIVED",
  "2-HOUR FOLLOW-UP",
  "DIRECT LINE TO JASON",
  "SUBMISSION RECEIVED",
  "2-HOUR FOLLOW-UP",
  "DIRECT LINE TO JASON"
];

export default function IntakeConfirmationPage() {
  const crumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Growth diagnostic", path: "/intake" },
    { name: "Confirmation", path: "/intake/confirmation" }
  ]);

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Diagnostic Submission Confirmation",
    url: `${SITE_URL}/intake/confirmation`
  };

  return (
    <MarketingLayout tickerItems={TICKER} activeHref="/intake">
      <JsonLd data={crumbs} />
      <JsonLd data={webPage} />

      <div className="m-page-hero">
        <div className="m-page-hero-grid" aria-hidden="true" />
        <div className="m-page-hero-inner">
          <div className="m-section-label">Submission Received</div>
          <h1>
            You&apos;re in.
            <br />
            <span className="m-text-green">We have your diagnostic request.</span>
          </h1>
          <p className="m-hero-sub">
            Jason follows up within <strong>2 hours</strong> during business windows. If this is urgent, call now and
            reference your diagnostic submission.
          </p>
          <div className="m-cta-row" style={{ justifyContent: "center" }}>
            <a href={`tel:${CONTACT.phoneE164}`} className="m-btn-primary">
              Call {CONTACT.phoneDisplay}
            </a>
            <Link href="/pricing" className="m-btn-ghost">
              View Packages
            </Link>
            <a href="https://g.page/r/CXxbvj7-CCGrEBM/review" target="_blank" rel="noopener noreferrer" className="m-btn-ghost" style={{ borderColor: "var(--m-green)", color: "var(--m-green)" }}>
              Leave a Google review
            </a>
          </div>
        </div>
      </div>
    </MarketingLayout>
  );
}
