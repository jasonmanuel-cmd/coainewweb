import type { Metadata } from "next";
import Link from "next/link";
import { ContactMarketingForm } from "@/components/contact/ContactMarketingForm";
import { JsonLd } from "@/components/JsonLd";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd } from "@/lib/schema";
import { CONTACT, GOOGLE_BUSINESS_PROFILE_URL, LEGAL_NAME } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Contact — Bakersfield Office",
  description: `Call ${CONTACT.phoneDisplay}, email ${CONTACT.email}, or send a message. ${CONTACT.addressLine}, ${CONTACT.city}, ${CONTACT.region}.`,
  path: "/contact"
});

const TICKER = [
  "CONTACT",
  CONTACT.phoneDisplay,
  "BAKERSFIELD CA",
  "SAME-DAY RESPONSE",
  "CIPHER LIVE 24/7",
  "CONTACT",
  CONTACT.phoneDisplay,
  "BAKERSFIELD CA",
  "SAME-DAY RESPONSE",
  "CIPHER LIVE 24/7"
];

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
    url: "https://chaoticallyorganizedai.com/contact"
  };
  const crumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" }
  ]);

  return (
    <MarketingLayout tickerItems={TICKER} activeHref="/contact">
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
            Call, text, or send a message. Same-day response guaranteed. If you&apos;re outside business hours, Cipher
            handles the first contact — Jason follows up personally.
          </p>
        </div>
      </div>

      <div className="m-contact-layout">
        <div className="m-contact-info">
          <div className="m-info-block">
            <div className="m-info-block-label">Direct Contact</div>
            <div className="m-info-line">
              <span className="m-info-icon">☎</span>
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
              <span className="m-info-icon">◉</span>
              <span className="m-info-text">
                {CONTACT.addressLine}, {CONTACT.city}, {CONTACT.region} {CONTACT.postalCode}
              </span>
            </div>
          </div>

          <div className="m-cipher-box">
            <div className="m-cipher-box-label">
              <span className="m-cipher-dot" />
              Cipher AI — Live 24/7
            </div>
            <p>
              After-hours? Cipher picks up immediately, qualifies your inquiry, and routes to Jason for a
              same-business-day follow-up. Call anytime.
            </p>
            <Link href={`tel:${CONTACT.phoneE164}`}>{CONTACT.phoneDisplay}</Link>
          </div>

          <div className="m-info-block">
            <div className="m-info-block-label">Business Hours</div>
            <div className="m-hours-grid">
              <span className="m-hours-day">Monday</span>
              <span className="m-hours-time">9AM – 6PM</span>
              <span className="m-hours-day">Tuesday</span>
              <span className="m-hours-time">9AM – 6PM</span>
              <span className="m-hours-day">Wednesday</span>
              <span className="m-hours-time">9AM – 6PM</span>
              <span className="m-hours-day">Thursday</span>
              <span className="m-hours-time">9AM – 6PM</span>
              <span className="m-hours-day">Friday</span>
              <span className="m-hours-time">9AM – 5PM</span>
              <span className="m-hours-day">Saturday</span>
              <span className="m-hours-time">By Appointment</span>
              <span className="m-hours-day">Sunday</span>
              <span className="m-hours-time">Closed</span>
            </div>
            <div style={{ marginTop: "1rem", fontFamily: "var(--font-mono), monospace", fontSize: 10, color: "var(--m-green)" }}>
              Cipher active 24/7 for after-hours inquiries
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
              <span className="m-info-icon">◈</span>
              <span className="m-info-text">{LEGAL_NAME} — registered California LLC</span>
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
