import type { Metadata } from "next";
import { OfferDetailPage } from "@/components/marketing/OfferDetailPage";
export const metadata: Metadata = { title: "COAI Revenue Engine", description: "Conversion-focused website, lead capture, CRM, missed-call recovery, and follow-up. $1,997 implementation plus $297 monthly.", alternates: { canonical: "/revenue-engine" } };
export default function Page() { return <OfferDetailPage id="revenue-engine" />; }
