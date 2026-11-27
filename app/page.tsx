import type { Metadata } from "next";
import { RestructurePage } from "@/components/marketing/RestructurePage";

export const metadata: Metadata = {
  title: "Revenue systems for service businesses | Chaotically Organized AI",
  description: "Capture more inquiries and follow up consistently. Explore COAI's $500 diagnostic, $1,997 Revenue Engine, and $4,997+ Revenue Infrastructure.",
  alternates: { canonical: "/" },
  openGraph: { title: "Revenue systems for service businesses | Chaotically Organized AI", description: "Capture more inquiries and follow up consistently. Explore COAI's $500 diagnostic, $1,997 Revenue Engine, and $4,997+ Revenue Infrastructure." }
};

export default function Page() {
  return <RestructurePage variant="home" />;
}
