"use client";

import { Phone } from "lucide-react";
import { usePathname } from "next/navigation";
import { CONTACT } from "@/lib/site";

/** Pages that already have their own phone prompt or a form the bar would cover. */
const HIDDEN_ON = ["/intake", "/contact", "/thank-you"];

/** Persistent one-tap call button on phones. Hidden on desktop in CSS. */
export function MobileCallBar() {
  const pathname = usePathname();
  if (HIDDEN_ON.some((path) => pathname === path || pathname.startsWith(`${path}/`))) return null;
  return (
    <div className="mobile-call-bar" data-track-place="mobile-bar">
      <a href={`tel:${CONTACT.phoneE164}`} aria-label={`Call ${CONTACT.phoneDisplay}`}>
        <Phone aria-hidden="true" />
        <span>Call {CONTACT.phoneDisplay}</span>
      </a>
    </div>
  );
}
