import * as Sentry from "@sentry/nextjs";

Sentry.init({
  enabled: process.env.NODE_ENV === "production",
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN ?? "https://dd2995b14877c8499b298c9f7d7d4115@o4511216321757184.ingest.us.sentry.io/4511216323264512",
  // Error monitoring stays useful without routine session recording or broad PII collection.
  tracesSampleRate: 0.05,
  enableLogs: false,
  sendDefaultPii: false
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
