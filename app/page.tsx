import type { Metadata } from "next";
import { LandingHomeRevamp } from "@/components/revamp/LandingHome";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Chaotically Organized AI — Bakersfield Websites & AI Automation",
  description:
    "Bakersfield's digital shop for tradesmen and small businesses. Sovereign websites, AI lead automation, computer repair, and honest tech support. No fluff. No contracts. Just stuff that works.",
  openGraph: {
    title: "Chaotically Organized AI — Bakersfield",
    description:
      "Sovereign websites, AI lead automation, computer repair, and honest tech support for Bakersfield tradesmen.",
    url: SITE_URL,
  },
};

export default function Home() {
  return <LandingHomeRevamp />;
}
