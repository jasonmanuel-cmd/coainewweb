import Link from "next/link";
import { LeadResponseDemo } from "@/components/demo/LeadResponseDemo";
import { MarketingLayout } from "@/components/marketing/MarketingLayout";
import { pageMetadata } from "@/lib/metadata";
import { DELIVERY_TIMELINE, OFFERS } from "@/lib/site";

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
        <p>{OFFERS.tradecall.name}: {OFFERS.tradecall.price} flat, {OFFERS.tradecall.terms}. Standard turnaround is {DELIVERY_TIMELINE} from signed scope, subject to access and approvals.</p>
        <p>Hosting and phone/SMS costs are separate. Review the complete inclusions and exclusions before deciding.</p>
        <Link className="m-btn-ghost" href="/pricing">Review pricing and scope</Link>
      </div>
    </MarketingLayout>
  );
}
