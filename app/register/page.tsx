import type { Metadata } from "next";
import { AuditForm } from "@/components/AuditForm";
import { JsonLd } from "@/components/JsonLd";
import { pageMetadata } from "@/lib/metadata";
import { breadcrumbJsonLd } from "@/lib/schema";

export const metadata: Metadata = pageMetadata({
  title: "Register — Audit Flow",
  description:
    "Enter URL and contact data to trigger the RedScreen extraction pipeline and log your lead into the sovereign ledger.",
  path: "/register"
});

export default function RegisterPage() {
  const crumbs = breadcrumbJsonLd([
    { name: "Home", path: "/" },
    { name: "Register", path: "/register" }
  ]);

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Register / Audit Flow",
    url: "https://chaoticallyorganizedai.com/register"
  };

  return (
    <main>
      <JsonLd data={webPage} />
      <JsonLd data={crumbs} />
      <h1>Register / Audit Flow</h1>
      <p className="muted">Enter URL and contact data to trigger extraction and log the lead into the sovereign ledger.</p>
      <AuditForm />
    </main>
  );
}
