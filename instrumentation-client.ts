/**
 * Client-side Sentry initialisation moved to components/SentryLazyInit.tsx.
 *
 * Initialising the SDK from this file put the ~430KB browser bundle in the critical path
 * of every page. SentryLazyInit loads it on first interaction (60s backstop) instead, so
 * the PII opt-out below now lives there and is still enforced by
 * __tests__/sentry-privacy.test.ts.
 *
 * Note: the `onRouterTransitionStart` export this file used to provide is gone with it.
 * Server-side reporting is unaffected - it is configured in instrumentation.ts via
 * sentry.server.config.ts and sentry.edge.config.ts.
 */
export {};