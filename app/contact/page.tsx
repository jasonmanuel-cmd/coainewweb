import type { Metadata } from "next";
import { TrackedLink } from "@/components/TrackedLink";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { BUSINESS_HOURS_LABEL, CONTACT, GOOGLE_BUSINESS_PROFILE_URL, LEGAL_NAME } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Contact — Bakersfield Office",
  description: `Call ${CONTACT.phoneDisplay}, email ${CONTACT.email}, or use our Google Business Profile for directions and hours. ${CONTACT.addressLine}, ${CONTACT.city}, ${CONTACT.region}.`,
  path: "/contact"
});

export default function ContactPage() {
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
    <main className="panel">
      <JsonLd data={contactPage} />
      <JsonLd data={crumbs} />
      <h1>Direct Line</h1>
      <p>
        <strong>{LEGAL_NAME}</strong>
      </p>
      <p>
        Email:{" "}
        <TrackedLink href={`mailto:${CONTACT.email}`} eventName="contact_email_click">
          {CONTACT.email}
        </TrackedLink>
      </p>
      <p>
        Phone:{" "}
        <TrackedLink href={`tel:${CONTACT.phoneE164}`} eventName="contact_phone_click">
          {CONTACT.phoneDisplay}
        </TrackedLink>
      </p>
      <p>
        {CONTACT.addressLine}, {CONTACT.city}, {CONTACT.region} {CONTACT.postalCode}
      </p>
      <section className="panel" style={{ marginTop: "1rem" }}>
        <h2 className="mono" style={{ marginTop: 0 }}>
          Google Business Profile
        </h2>
        <p>
          Hours: {BUSINESS_HOURS_LABEL}. Reviews, directions, and posts live on our public profile.
        </p>
        <p style={{ marginBottom: 0 }}>
          <TrackedLink
            className="btn btn-primary"
            href={GOOGLE_BUSINESS_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            eventName="contact_gbp_click"
          >
            Open Google Business Profile
          </TrackedLink>
        </p>
      </section>
      <p className="muted">Every request routes to structural audit workflow first.</p>
    </main>
  );
}
