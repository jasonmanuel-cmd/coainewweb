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
    <div style={{ padding: "120px 0", minHeight: "80vh", display: "flex", alignItems: "center" }}>
      <div className="container" style={{ maxWidth: 600, textAlign: "center" }}>
        <div style={{ fontSize: "4rem", marginBottom: "20px", color: "var(--accent)" }}>✓</div>
        <h1 className="section-title">Thank You for Your Purchase</h1>
        <p className="section-sub" style={{ margin: "0 auto 32px" }}>
          Your order has been received. Jason will follow up within <strong>2 hours</strong> during business
          hours to get started on your project. If you need anything immediately, call{" "}
          <a href={`tel:${CONTACT.phoneE164}`} style={{ color: "var(--accent)", fontWeight: 700 }}>
            {CONTACT.phoneDisplay}
          </a>.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/" className="btn-primary" style={{ textDecoration: "none" }}>
            Back to Home
          </Link>
          <a href={`tel:${CONTACT.phoneE164}`} className="btn-secondary" style={{ textDecoration: "none" }}>
            Call {CONTACT.phoneDisplay}
          </a>
        </div>
      </div>
    </div>
  );
}
