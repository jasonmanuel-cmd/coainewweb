import type { Metadata } from "next";
import Link from "next/link";
import { ContactMarketingForm } from "@/components/contact/ContactMarketingForm";
import { JsonLd } from "@/components/JsonLd";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd } from "@/lib/schema";
import { BUSINESS_HOURS_LABEL, CONTACT, GOOGLE_BUSINESS_PROFILE_URL, LEGAL_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Contact — direct line to Jason",
  description: `Contact Chaotically Organized AI in Bakersfield, CA. Same-day response from Jason. Call ${CONTACT.phoneDisplay} or send a message - no gatekeepers.`,
  path: "/contact"
});

export default async function ContactPage({
  searchParams
}: {
  searchParams: Promise<{ package?: string; from?: string; intent?: string }>;
}) {
  const sp = await searchParams;
  const pkg = sp.package;
  const initialPackage = pkg && ["1", "2", "3"].includes(pkg) ? pkg : undefined;
  const contactPage = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Chaotically Organized AI",
    url: `${SITE_URL}/contact`
  };
  const crumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" }
  ]);

  return (
    <MarketingLayout activeHref="/contact">
      <JsonLd data={contactPage} />
      <JsonLd data={crumbs} />

      <div className="m-page-hero">
        <div className="m-grid-bg" aria-hidden />
        <div className="m-page-hero-inner">
          <div className="m-section-label">Get In Touch</div>
          <h1 className="m-page-h1">
            No gatekeepers.
            <br />
            <span className="m-text-green">Direct line to Jason.</span>
          </h1>
          <p className="m-hero-sub">
            Call, text, or send a message. We aim to reply the same business day. Outside our published hours
            an automated agent takes the first contact and Jason follows up personally — you are told it is
            automated, and you can ask for a person.
          </p>
        </div>
      </div>

      <div className="m-contact-layout">
        <div className="m-contact-info">
          <div className="m-info-block">
            <div className="m-info-block-label">Direct Contact</div>
            <div className="m-info-line">
              <span className="m-info-icon">â˜Ž</span>
              <span className="m-info-text">
                <Link href={`tel:${CONTACT.phoneE164}`}>{CONTACT.phoneDisplay}</Link>
              </span>
            </div>
            <div className="m-info-line">
              <span className="m-info-icon">@</span>
              <span className="m-info-text">
                <Link href={`mailto:${CONTACT.email}`}>{CONTACT.email}</Link>
              </span>
            </div>
            <div className="m-info-line">
              <span className="m-info-icon">â-‰</span>
              <span className="m-info-text">
                {CONTACT.city}, {CONTACT.region} — we work remotely and come to you. No walk-in office.
              </span>
            </div>
          </div>

          <div className="m-cipher-box">
            <div className="m-cipher-box-label">
              <span className="m-cipher-dot" />
              Cipher — automated call agent
            </div>
            <p>
              Outside our hours, Cipher picks up, qualifies your inquiry, and routes it to Jason for a
              same-business-day follow-up. It tells you up front that it is automated, calls may be recorded
              for quality review, and you can ask for a person at any time. Not for emergencies — call 911.{" "}
              <Link href="/ai-disclosure">How this works</Link>.
            </p>
            <Link href={`tel:${CONTACT.phoneE164}`}>{CONTACT.phoneDisplay}</Link>
          </div>

          <div className="m-info-block">
            <div className="m-info-block-label">Business Hours</div>
            <p className="m-info-line" style={{ marginTop: 0 }}>
              <span className="m-info-text">{BUSINESS_HOURS_LABEL}</span>
            </p>
            <div style={{ marginTop: "1rem", fontFamily: "var(--font-mono), monospace", fontSize: 10, color: "var(--m-green)" }}>
              Outside these hours an automated agent takes a message and Jason follows up.
            </div>
          </div>

          <div className="m-info-block">
            <div className="m-info-block-label">Verify Us</div>
            <div className="m-info-line">
              <span className="m-info-icon">G</span>
              <span className="m-info-text">
                <Link href={GOOGLE_BUSINESS_PROFILE_URL} target="_blank" rel="noopener noreferrer">
                  Google Business Profile →
                </Link>
              </span>
            </div>
            <div className="m-info-line">
              <span className="m-info-icon">â-ˆ</span>
              <span className="m-info-text">{LEGAL_NAME} - registered California LLC</span>
            </div>
          </div>
        </div>

        <ContactMarketingForm
          initialPackage={initialPackage}
          inboundSource={sp.from}
          contactIntent={sp.intent}
        />
      </div>
    </MarketingLayout>
  );
}
