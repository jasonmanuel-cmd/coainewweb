import type { Metadata } from "next";
import { RestructurePage } from "@/components/marketing/RestructurePage";

export const metadata: Metadata = {
  title: "Pricing | Chaotically Organized AI",
  description: "COAI Digital Diagnostic & Repair: $500, or $200 diagnostic-only. Revenue Engine: $1,997 plus $297 monthly. Infrastructure: from $4,997 plus $597–$997 monthly.",
  alternates: { canonical: "/pricing" },
  openGraph: { title: "Pricing | COAI", description: "Three clear offers with defined scope, payment milestones, and monthly service boundaries." }
};

export default function Page() {
  return <RestructurePage variant="pricing" />;
}
