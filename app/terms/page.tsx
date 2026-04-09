import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Service",
  description:
    "Terms for Chaotically Organized AI structural audits: diagnostic estimates, no guaranteed rankings, and consent to follow-up communication.",
  path: "/terms"
});

export default function TermsPage() {
  return (
    <main className="panel">
      <h1>Terms</h1>
      <p className="muted">Last updated April 2026</p>
      <p>Audit results are diagnostic estimates and do not guarantee ranking outcomes.</p>
      <p className="muted">Use of this service implies consent to receive follow-up communication.</p>
    </main>
  );
}
