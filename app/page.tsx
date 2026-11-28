import type { Metadata } from "next";
import { RestructurePage } from "@/components/marketing/RestructurePage";

export const metadata: Metadata = {
  title: "Intelligent Business Infrastructure for service businesses | COAI",
  description: "Your business is losing opportunities. COAI finds digital and operational gaps, repairs them, and builds connected customer systems.",
  alternates: { canonical: "/" },
  openGraph: { title: "Intelligent Business Infrastructure for service businesses | COAI", description: "Find the leak. Fix the leak. Run the system." }
};

export default function Page() {
  return <RestructurePage variant="home" />;
}
