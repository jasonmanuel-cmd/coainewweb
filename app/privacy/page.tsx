import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { LegalShell } from "@/components/marketing/LegalShell";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd } from "@/lib/schema";
import { CONTACT, LEGAL_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "Privacy policy for Chaotically Organized AI: data collected for diagnostics, Formspree forms, and Google Analytics.",
  path: "/privacy"
});

export default function PrivacyPage() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "G-ZYCPQEBGTN";
  const crumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Privacy policy", path: "/privacy" }
  ]);
  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Privacy Policy",
    url: `${SITE_URL}/privacy`
  };

  return (
    <LegalShell>
      <JsonLd data={crumbs} />
      <JsonLd data={webPage} />
      <div className="m-legal-wrap">
        <div className="m-legal-top">
          <div className="m-legal-type">Legal Document</div>
          <h1>Privacy Policy</h1>
          <div className="m-legal-date">
            Last Updated: April 2026 · {LEGAL_NAME} · Bakersfield, CA
          </div>
        </div>

        <div className="m-legal-section">
          <h2>1. Who We Are</h2>
          <p>
            Chaotically Organized AI, LLC (&quot;COAI,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is a
            digital infrastructure and AI automation company located at {CONTACT.addressLine}, {CONTACT.city},{" "}
            {CONTACT.region} {CONTACT.postalCode}. We can be reached at{" "}
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> or {CONTACT.phoneDisplay}.
          </p>
        </div>

        <div className="m-legal-section">
          <h2>2. Information We Collect</h2>
          <p>
            We collect information you provide directly when using our website, contact forms, diagnostic tools, or
            engaging our services:
          </p>
          <ul>
            <li>Name, business name, phone number, and email address</li>
            <li>Website URL and business information you submit in diagnostic forms</li>
            <li>Messages and inquiries submitted through contact forms</li>
            <li>Business metrics you provide (call volume, ticket value, etc.) for diagnostic calculations</li>
          </ul>
          <p>
            We also collect standard web analytics data automatically, including pages visited, time on site, device
            type, and general geographic location. This data is aggregated and not tied to individual identities.
          </p>
        </div>

        <div className="m-legal-section">
          <h2>3. How We Use Your Information</h2>
          <ul>
            <li>To respond to your inquiries and provide services you have requested</li>
            <li>To send your diagnostic results and follow-up communications</li>
            <li>To improve our website and service offerings</li>
            <li>To send service-related communications (not marketing) relevant to your engagement</li>
            <li>To comply with legal obligations</li>
          </ul>
          <p>We do not sell, rent, or trade your personal information to third parties. Ever.</p>
        </div>

        <div className="m-legal-section">
          <h2>4. Form Submissions</h2>
          <p>
            Contact forms and intake forms on this site are processed through Formspree, a third-party form handling
            service. Submissions are delivered to COAI&apos;s email and stored in accordance with Formspree&apos;s
            privacy policy. By submitting a form, you consent to this data transfer.
          </p>
        </div>

        <div className="m-legal-section">
          <h2>5. Analytics</h2>
          <p>
            This site uses Google Analytics ({gaId}) to understand aggregate traffic patterns. Google Analytics uses
            cookies and collects anonymized data about visitor behavior. You can opt out of Google Analytics tracking by
            using the Google Analytics Opt-out Browser Add-on.
          </p>
        </div>

        <div className="m-legal-section">
          <h2>6. Data Retention</h2>
          <p>
            We retain contact and inquiry data for as long as necessary to fulfill the purpose it was collected for, or
            as required by law. If you would like your data deleted, contact us at{" "}
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> and we will process your request within 30 days.
          </p>
        </div>

        <div className="m-legal-section">
          <h2>7. California Privacy Rights (CCPA)</h2>
          <p>
            If you are a California resident, you have the right to know what personal information we collect about
            you, request deletion of your personal information, and opt out of any sale of personal information (we do
            not sell personal information). To exercise these rights, contact us directly.
          </p>
        </div>

        <div className="m-legal-section">
          <h2>8. Security</h2>
          <p>
            We implement reasonable technical and organizational measures to protect your personal information. No
            internet transmission is 100% secure, and we cannot guarantee absolute security of data transmitted to our
            site.
          </p>
        </div>

        <div className="m-legal-section">
          <h2>9. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. The date at the top of this page reflects the most
            recent update. Continued use of the site after changes constitutes acceptance of the updated policy.
          </p>
        </div>

        <div className="m-legal-section">
          <h2>10. Contact</h2>
          <p>
            Questions about this Privacy Policy: <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> ·{" "}
            {CONTACT.phoneDisplay} · {CONTACT.addressLine}, {CONTACT.city}, {CONTACT.region} {CONTACT.postalCode}.
          </p>
        </div>
      </div>
    </LegalShell>
  );
}
