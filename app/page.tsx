import type { Metadata } from "next";
import { LandingHome } from "@/components/landing/LandingHome";
import { SITE_URL } from "@/lib/site";

const DESC =
  "Structural digital audits, AEO-ready systems, and AI automation for Bakersfield 661 operators. Stop bleeding leads. Run your free diagnostic.";

export const metadata: Metadata = {
  title: { absolute: "Chaotically Organized AI | Bakersfield Growth Systems & AEO" },
  description: DESC,
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "Chaotically Organized AI | Bakersfield Growth Systems & AEO",
    description: DESC,
    url: SITE_URL,
    siteName: "Chaotically Organized AI",
    images: [{ url: "/logo.png", width: 1200, height: 630 }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Chaotically Organized AI | Bakersfield Growth Systems & AEO",
    description: DESC,
    images: ["/logo.png"]
  }
};

export default function HomePage() {
  return <LandingHome />;
}
