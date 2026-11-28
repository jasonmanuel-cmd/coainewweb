import type { Metadata } from "next";
import { OfferDetailPage } from "@/components/marketing/OfferDetailPage";
export const metadata: Metadata = { title: "COAI Digital Diagnostic & Repair", description: "A $500 diagnostic and defined priority repairs for service businesses, with a $200 diagnostic-only option.", alternates: { canonical: "/diagnostic" } };
export default function Page() { return <OfferDetailPage id="diagnostic" />; }
