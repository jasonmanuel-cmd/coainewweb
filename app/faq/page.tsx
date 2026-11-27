import type { Metadata } from "next";
import { RestructurePage } from "@/components/marketing/RestructurePage";

export const metadata: Metadata = {
  title: "FAQ | Chaotically Organized AI",
  description: "Answers about COAI's three offers, payments, CRM, customer data, and the written scope.",
  alternates: { canonical: "/faq" },
  openGraph: { title: "FAQ | Chaotically Organized AI", description: "Answers about COAI's three offers, payments, CRM, customer data, and the written scope." }
};

export default function Page() {
  return <RestructurePage variant="faq" />;
}
