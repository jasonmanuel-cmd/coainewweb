import type { ReactNode } from "react";

type MarketingLayoutProps = {
  activeHref?: string;
  children: ReactNode;
};

/** Shared chrome is supplied once by AppChrome in the root layout. */
export function MarketingLayout({ children }: MarketingLayoutProps) {
  return <main id="main-content" className="m-page">{children}</main>;
}
