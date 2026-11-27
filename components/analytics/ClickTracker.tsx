"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/analytics/client";
import { BOOKING_URL } from "@/lib/site";

/**
 * One delegated click listener that records the contact actions that matter:
 * phone taps, email taps, social profile taps and clicks on the intake / contact
 * calls to action. Only fixed labels and the page path are sent, never link
 * text typed by a visitor or any form data.
 */
export function ClickTracker() {
  const pathname = usePathname();

  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest("a[href]");
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      const place = link.closest("header") ? "header" : link.closest("footer") ? "footer" : link.closest("[data-track-place]")?.getAttribute("data-track-place") ?? "page";

      if (href.startsWith("tel:")) trackEvent("phone_click", { page: pathname, place });
      else if (href.startsWith("mailto:")) trackEvent("email_click", { page: pathname, place });
      else if (href.startsWith(BOOKING_URL)) trackEvent("booking_click", { page: pathname, place });
      else if (/^https?:\/\/(www\.)?(facebook|instagram|linkedin)\.com\//.test(href)) {
        trackEvent("social_click", { page: pathname, network: new URL(href).hostname.replace(/^www\./, "").split(".")[0] });
      } else if (href.startsWith("/intake")) trackEvent("cta_click", { page: pathname, place, target: "intake" });
      else if (href.startsWith("/contact")) trackEvent("cta_click", { page: pathname, place, target: "contact" });
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [pathname]);

  return null;
}
