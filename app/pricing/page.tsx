import type { Metadata } from "next";
import { RestructurePage } from "@/components/marketing/RestructurePage";

export const metadata: Metadata = {
  title: "Pricing | Chaotically Organized AI",
  description: "Three COAI offers: $500 diagnostic with $200 upfront; $1,997 plus $297/month Revenue Engine; and $4,997+ plus $597\u2013$997/month Revenue Infrastructure.",
  alternates: { canonical: "/pricing" },
  openGraph: { title: "Pricing | Chaotically Organized AI", description: "Three COAI offers: $500 diagnostic with $200 upfront; $1,997 plus $297/month Revenue Engine; and $4,997+ plus $597\u2013$997/month Revenue Infrastructure." }
};

export default function Page() {
  return <RestructurePage variant="pricing" />;
}
