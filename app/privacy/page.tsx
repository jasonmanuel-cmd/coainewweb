import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy",
  description:
    "Privacy policy for Chaotically Organized AI: data collected for structural audits and follow-up, including URL, business name, phone, email, and diagnostic results.",
  path: "/privacy"
});

export default function PrivacyPage() {
  return (
    <main className="panel">
      <h1>Privacy Policy</h1>
      <p className="muted">Last updated April 2026</p>
      <p>We collect only the data required to run structural audits and provide follow-up communication.</p>
      <p className="muted">Data fields may include URL, business name, phone, email, and diagnostic results.</p>
    </main>
  );
}
