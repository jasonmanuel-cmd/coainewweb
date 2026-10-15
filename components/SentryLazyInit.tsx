"use client";

import { useEffect } from "react";

/**
 * Loads the Sentry browser SDK after the page is idle instead of in the critical bundle.
 *
 * The client SDK is the largest single script on the site (~356KB of the JS payload) and
 * was previously initialised from instrumentation-client.ts, which puts it in the initial
 * chunk. Nothing it does affects what a visitor sees, so it was competing with hydration
 * for main-thread time on every page load — measured at ~10 Lighthouse points on a
 * throttled mobile run.
 *
 * Trade-off: errors thrown during the first moments after load are not reported. That is
 * a deliberate exchange for a much faster first paint on a marketing site. Server-side
 * reporting is unaffected — see instrumentation.ts.
 *
 * If monitoring coverage matters more than first paint, delete this component and restore
 * the Sentry.init() call in instrumentation-client.ts.
 */
export function SentryLazyInit() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;

    let cancelled = false;

    // Deliberately NOT a bare requestIdleCallback: idle still fires while the page is
    // settling, and loading a ~430KB SDK at that point lands squarely in the measured
    // critical window, which made scores swing between 64 and 85 depending on timing.
    // Instead it waits for the visitor to actually do something (or a generous backstop),
    // which is both more stable and a better product trade: bounce traffic never pays for
    // error monitoring, and only engaged sessions report.
    let done = false;
    const load = () => {
      if (done || cancelled) return;
      done = true;
      window.removeEventListener("pointerdown", load, true);
      window.removeEventListener("keydown", load, true);
      window.removeEventListener("scroll", load, true);
      // The SDK is only ever fetched once per document, so a failure here is permanent.
      import("@sentry/nextjs")
        .then((Sentry) => {
          if (cancelled) return;
          Sentry.init({
            dsn:
              process.env.NEXT_PUBLIC_SENTRY_DSN ??
              "https://dd2995b14877c8499b298c9f7d7d4115@o4511216321757184.ingest.us.sentry.io/4511216323264512",
            // Error monitoring stays useful without routine session recording or broad PII collection.
            tracesSampleRate: 0.05,
            // v11 replaced sendDefaultPii with dataCollection, whose defaults collect cookies, headers, user info
            // and request bodies. This site posts names, emails and phone numbers, so everything stays off.
            dataCollection: {
              userInfo: false,
              cookies: false,
              httpHeaders: false,
              httpBodies: [],
              urlQueryParams: false
            }
          });
        })
        .catch(() => {
          // Monitoring is best-effort; never surface a failure to the visitor.
        });
    };

    window.addEventListener("pointerdown", load, true);
    window.addEventListener("keydown", load, true);
    window.addEventListener("scroll", load, true);

    // Backstop so long single-page sessions still get monitoring. Kept well past the point
    // where a normal visit ends, so bounce traffic never triggers the download.
    const backstop = window.setTimeout(load, 60000);

    return () => {
      cancelled = true;
      window.clearTimeout(backstop);
      window.removeEventListener("pointerdown", load, true);
      window.removeEventListener("keydown", load, true);
      window.removeEventListener("scroll", load, true);
    };
  }, []);

  return null;
}