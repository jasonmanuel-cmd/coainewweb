import type { ReactNode } from "react";
import { RevampPageNav } from "@/components/revamp/RevampPageNav";
import { PageFooter } from "@/components/revamp/PageFooter";

type MarketingLayoutProps = {
  activeHref?: string;
  children: ReactNode;
};

export function MarketingLayout({ activeHref, children }: MarketingLayoutProps) {
  return (
    <div className="m-page">
      <RevampPageNav activeHref={activeHref} />
      {children}
      <PageFooter />
    </div>
  );
}
