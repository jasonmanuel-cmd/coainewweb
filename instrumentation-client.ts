/**
 * Client-side Sentry initialisation lives in components/SentryLazyInit.tsx, which loads
 * the SDK on idle instead of shipping it in the critical bundle.
 *
 * Server-side reporting is unchanged and still configured here.
 */
export {};