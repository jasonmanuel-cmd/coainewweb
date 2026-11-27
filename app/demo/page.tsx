import Link from "next/link";
import { LeadResponseDemo } from "@/components/demo/LeadResponseDemo";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Try the contractor lead-response demo",
  description: "Walk through a sample missed call, acknowledgement, job qualification, and owner handoff. No real calls or messages are sent.",
  path: "/demo"
});

export default function DemoPage() {
  return (
    <MarketingLayout>
      <div className="m-page-hero">
        <div className="m-page-hero-inner">
          <div className="m-section-label">Try the workflow</div>
          <h1>See what happens after a missed call.</h1>
          <p className="m-hero-sub">Try the sample customer journey, then see the details an owner needs to follow up. No signup required.</p>
        </div>
      </div>
      <LeadResponseDemo />
      <div className="lead-demo">
        <h2>A working example starts the conversation. Your scope comes next.</h2>
        <p>The Revenue Engine starts at $1,997 plus $297 per month. The exact lead response workflow, third-party costs, and timing are confirmed in a written scope before work begins.</p>
        <Link className="m-btn-ghost" href="/pricing">Review pricing and scope</Link>
      </div>
    </MarketingLayout>
  );
}
