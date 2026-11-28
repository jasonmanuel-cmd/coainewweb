import type { Metadata } from "next";
import { OfferDetailPage } from "@/components/marketing/OfferDetailPage";
export const metadata: Metadata = { title: "COAI Intelligent Business Infrastructure", description: "Connected service-business infrastructure with AI receptionist, workflows, and reporting. From $4,997 plus $597–$997 monthly.", alternates: { canonical: "/infrastructure" } };
export default function Page() { return <OfferDetailPage id="infrastructure" />; }
