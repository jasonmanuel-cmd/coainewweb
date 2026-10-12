import * as Sentry from "@sentry/nextjs";

Sentry.init({
  enabled: process.env.NODE_ENV === "production",
  dsn: process.env.SENTRY_DSN ?? process.env.NEXT_PUBLIC_SENTRY_DSN ?? "https://dd2995b14877c8499b298c9f7d7d4115@o4511216321757184.ingest.us.sentry.io/4511216323264512",
  tracesSampleRate: 0.05,
  // v11 replaced sendDefaultPii with dataCollection, whose defaults collect cookies, headers, user info and
  // request bodies. This site posts names, emails and phone numbers, so everything stays off.
  dataCollection: { userInfo: false, cookies: false, httpHeaders: false, httpBodies: [], urlQueryParams: false }
});
