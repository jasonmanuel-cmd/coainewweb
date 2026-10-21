import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd } from "@/lib/schema";
import { BUSINESS_HOURS_LABEL, CONTACT, OFFERS, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Diagnostic Submitted",
    description: "Your request was received. Jason will confirm eligibility, scope, and timing before work begins.",
    path: "/intake/confirmation"
  }),
  robots: { index: false }
};

export default async function IntakeConfirmationPage({ searchParams }: { searchParams: Promise<{ intent?: string }> }) {
  const buildInquiry = (await searchParams).intent === "build";
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
    <MarketingLayout activeHref="/intake">
      <JsonLd data={crumbs} />
      <JsonLd data={webPage} />

      <div className="m-page-hero">
        <div className="m-page-hero-grid" aria-hidden="true" />
        <div className="m-page-hero-inner">
          <div className="m-section-label">Submission Received</div>
          <h1>
            You&apos;re in.
            <br />
            <span className="m-text-green">{buildInquiry ? "We have your build inquiry." : "We have your diagnostic request."}</span>
          </h1>
          <p className="m-hero-sub">
            Jason will review your request and confirm eligibility, scope, and timing before work begins.
            {buildInquiry ? ` No purchase or appointment has been made. ${OFFERS.tradecall.name} is ${OFFERS.tradecall.price} flat, ${OFFERS.tradecall.terms}, after scope approval.` : ` Scorecards are ${OFFERS.scorecard.price.toLowerCase()}; ${OFFERS.scorecard.alt.toLowerCase()}. The usual scorecard turnaround is ${OFFERS.scorecard.turnaround} after qualification.`}
          </p>
          <p className="m-hero-sub">
            Business hours: {BUSINESS_HOURS_LABEL}. For a time-sensitive question, call or email directly.
          </p>
          <div className="m-cta-row m-cta-row--center">
            <a href={`tel:${CONTACT.phoneE164}`} className="m-btn-primary">
              Call {CONTACT.phoneDisplay}
            </a>
            <Link href="/pricing" className="m-btn-ghost">
              Review pricing and scope
            </Link>
            <a href={`mailto:${CONTACT.email}`} className="m-btn-ghost">
              Email Jason
            </a>
          </div>
        </div>
      </div>
    </MarketingLayout>
  );
}
