import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { LegalShell } from "@/components/marketing/LegalShell";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd } from "@/lib/schema";
import { CONTACT, LEGAL_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Service",
  description:
    "Terms of service for Chaotically Organized AI: scope agreements, payment, IP ownership, diagnostics disclaimer, and California law.",
  path: "/terms"
});

export default function TermsPage() {
  const crumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Terms of service", path: "/terms" }
  ]);
  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Terms of Service",
    url: `${SITE_URL}/terms`
  };

  return (
    <LegalShell>
      <JsonLd data={crumbs} />
      <JsonLd data={webPage} />
      <div className="m-legal-wrap">
        <div className="m-legal-top">
          <div className="m-legal-type">Legal Document</div>
          <h1>Terms of Service</h1>
          <div className="m-legal-date">
            Last Updated: April 2026 · {LEGAL_NAME} · Bakersfield, CA
          </div>
        </div>

        <div className="m-legal-section">
          <h2>1. Agreement to Terms</h2>
          <p>
            By accessing or using the website at chaoticallyorganizedai.com (the &quot;Site&quot;) or engaging
            Chaotically Organized AI, LLC (&quot;COAI&quot;) for services, you agree to be bound by these Terms of
            Service. If you do not agree, do not use the Site or engage our services.
          </p>
        </div>

        <div className="m-legal-section">
          <h2>2. Services</h2>
          <p>
            COAI provides digital infrastructure services including website design and development, structural digital
            audits, AEO/SEO optimization, and AI automation deployment. All service engagements are governed by a
            separate written scope agreement (&quot;Scope Document&quot;) executed between COAI and the client. In the
            event of any conflict between these Terms and a Scope Document, the Scope Document governs.
          </p>
        </div>

        <div className="m-legal-section">
          <h2>3. Payment Terms</h2>
          <ul>
            <li>Payment terms are specified in the individual Scope Document for each engagement</li>
            <li>Standard payment structure: 50% upon execution of scope, 50% upon delivery</li>
            <li>All payments are non-refundable once a milestone is delivered and approved</li>
            <li>Work does not begin until initial payment is received</li>
            <li>Outstanding invoices beyond 30 days accrue interest at 1.5% per month</li>
          </ul>
        </div>

        <div className="m-legal-section">
          <h2>4. Intellectual Property and Ownership</h2>
          <p>
            Upon final payment, the client receives full ownership of all custom code, design assets, and content
            created specifically for their project. COAI retains no ongoing ownership or license to client-specific
            deliverables after final payment.
          </p>
          <p>
            COAI retains ownership of: proprietary tools, methodologies, internal systems, and any pre-existing code
            frameworks used in the build that are not custom-created for the client. Third-party libraries and frameworks
            remain subject to their own open-source licenses.
          </p>
        </div>

        <div className="m-legal-section">
          <h2>5. Client Responsibilities</h2>
          <p>Clients are responsible for:</p>
          <ul>
            <li>Providing accurate business information and content in a timely manner</li>
            <li>Reviewing and providing feedback at milestone checkpoints within 5 business days</li>
            <li>Maintaining credentials and access to hosting, domain, and third-party accounts</li>
            <li>Ensuring all content provided to COAI does not infringe third-party intellectual property rights</li>
          </ul>
          <p>Delays caused by client inaction may result in adjusted delivery timelines at COAI&apos;s discretion.</p>
        </div>

        <div className="m-legal-section">
          <h2>6. Website Use</h2>
          <p>You agree not to use this Site to:</p>
          <ul>
            <li>Violate any applicable law or regulation</li>
            <li>Transmit spam, malware, or harmful code</li>
            <li>Attempt to gain unauthorized access to any part of the Site or COAI systems</li>
            <li>Scrape or harvest data from the Site without written permission</li>
          </ul>
        </div>

        <div className="m-legal-section">
          <h2>7. Diagnostic Tools</h2>
          <p>
            The diagnostic and ROI calculator tools on this Site provide estimates based on user-provided inputs.
            Results are illustrative and not guaranteed. Actual revenue recovery depends on many factors including
            business operations, market conditions, and implementation quality. COAI makes no warranty as to the
            accuracy of diagnostic estimates.
          </p>
        </div>

        <div className="m-legal-section">
          <h2>8. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, COAI&apos;s total liability for any claims arising from services shall
            not exceed the total amount paid by the client for the specific engagement giving rise to the claim. COAI is
            not liable for indirect, incidental, consequential, or punitive damages of any kind.
          </p>
        </div>

        <div className="m-legal-section">
          <h2>9. Warranty Disclaimer</h2>
          <p>
            The Site and its content are provided &quot;as is&quot; without warranties of any kind, express or implied.
            COAI does not warrant that the Site will be uninterrupted, error-free, or free of viruses or other harmful
            components.
          </p>
        </div>

        <div className="m-legal-section">
          <h2>10. Governing Law</h2>
          <p>
            These Terms are governed by the laws of the State of California. Any disputes shall be resolved in the
            courts of Kern County, California. If any provision of these Terms is found unenforceable, the remaining
            provisions remain in full effect.
          </p>
        </div>

        <div className="m-legal-section">
          <h2>11. Changes to Terms</h2>
          <p>
            COAI reserves the right to update these Terms at any time. The date at the top of this page reflects the
            most recent revision. Continued use of the Site after changes constitutes acceptance.
          </p>
        </div>

        <div className="m-legal-section">
          <h2>12. Contact</h2>
          <p>
            Questions about these Terms: <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> · {CONTACT.phoneDisplay}{" "}
            · {CONTACT.addressLine}, {CONTACT.city}, {CONTACT.region} {CONTACT.postalCode}.
          </p>
        </div>
      </div>
    </LegalShell>
  );
}
