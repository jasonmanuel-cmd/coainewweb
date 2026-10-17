import type { Metadata } from "next";
import { HqWorkspace } from "@/components/hq/HqWorkspace";
import "./hq.css";

export const metadata: Metadata = { title: "HQ — Private lead workspace", robots: { index: false, follow: false }, referrer: "no-referrer" };
export default function HqPage() { return <HqWorkspace />; }
