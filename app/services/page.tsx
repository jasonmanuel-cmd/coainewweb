import type { Metadata } from "next";
import { RestructurePage } from "@/components/marketing/RestructurePage";

export const metadata: Metadata = {
  title: "Services | Chaotically Organized AI",
  description: "COAI reviews customer journeys and builds practical lead capture, follow-up, CRM, and reporting systems for service businesses nationwide.",
  alternates: { canonical: "/services" },
  openGraph: { title: "Services | Chaotically Organized AI", description: "COAI reviews customer journeys and builds practical lead capture, follow-up, CRM, and reporting systems for service businesses nationwide." }
};

export default function Page() {
  return <RestructurePage variant="services" />;
}
