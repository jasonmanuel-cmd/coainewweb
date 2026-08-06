import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Purchase Confirmed",
  description: "Your purchase is confirmed. We'll follow up within 2 hours.",
  openGraph: {
    title: "Purchase Confirmed",
    description: "Your purchase is confirmed. We'll follow up within 2 hours.",
    url: `${SITE_URL}/thank-you`,
  },
};

export default function ThankYouPage() {
  return (
    <div className="m-thankyou-page">
      <div className="m-thankyou-inner">
        <div className="m-thankyou-icon">✓</div>
        <h1 className="section-title">Thank You for Your Purchase</h1>
        <p className="section-sub">
          Your order has been received. Jason will follow up within <strong>2 hours</strong> during business
          hours to get started on your project. If you need anything immediately, call{" "}
          <a href={`tel:${CONTACT.phoneE164}`} className="m-text-link">
            {CONTACT.phoneDisplay}
          </a>.
        </p>
        <div className="m-thankyou-actions">
          <Link href="/" className="btn-primary">
            Back to Home
          </Link>
          <a href={`tel:${CONTACT.phoneE164}`} className="btn-secondary">
            Call {CONTACT.phoneDisplay}
          </a>
        </div>
      </div>
    </div>
  );
}
