import type { Metadata } from "next";
import { RestructurePage } from "@/components/marketing/RestructurePage";

export const metadata: Metadata = {
  title: "Website and lead systems | Chaotically Organized AI",
  description: "Conversion-focused websites and lead workflows are scoped within COAI's Revenue Engine or Revenue Infrastructure offers.",
  alternates: { canonical: "/website-design" },
  openGraph: { title: "Website and lead systems | Chaotically Organized AI", description: "Conversion-focused websites and lead workflows are scoped within COAI's Revenue Engine or Revenue Infrastructure offers." }
};

export default function Page() {
  return <RestructurePage variant="services" />;
}
