import type { Metadata } from "next";
import { RestructurePage } from "@/components/marketing/RestructurePage";

export const metadata: Metadata = {
  title: "Revenue systems | Chaotically Organized AI",
  description: "Explore COAI's three focused offers for customer inquiry, follow-up, and revenue infrastructure.",
  alternates: { canonical: "/systems" },
  openGraph: { title: "Revenue systems | Chaotically Organized AI", description: "Explore COAI's three focused offers for customer inquiry, follow-up, and revenue infrastructure." }
};

export default function Page() {
  return <RestructurePage variant="services" />;
}
