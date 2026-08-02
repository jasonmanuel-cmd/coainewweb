import type { ReactNode } from "react";
import { Nav } from "@/components/revamp/Nav";
import { Footer } from "@/components/revamp/Footer";

type MarketingLayoutProps = {
  /** Unused — Nav derives the active link from the pathname. Kept so callers need no edit. */
  activeHref?: string;
  children: ReactNode;
};

/**
 * One nav and one footer for the whole site. The previous split (RevampPageNav
 * + PageFooter here, Nav + Footer on the homepage) is what let the phone number
 * and address drift between surfaces.
 */
export function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="m-page">
      <Nav />
      {children}
      <Footer />
    </div>
  );
}
