import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  // Pin tracing to this app when a parent directory has another lockfile (avoids wrong root on CI/Vercel).
  outputFileTracingRoot: __dirname,
  images: {
    formats: ["image/avif", "image/webp"]
  },
  async headers() {
    // Static, build-time CSP. Kept out of middleware on purpose: a per-request
    // nonce forces every route into dynamic SSR (a Vercel Function per hit),
    // which is what blew up Active CPU. A static policy lets pages stay CDN-cached.
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://www.clarity.ms https://*.clarity.ms",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data:",
      "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com https://www.googletagmanager.com https://vitals.vercel-insights.com https://*.vercel-insights.com https://challenges.cloudflare.com https://www.clarity.ms https://*.clarity.ms",
      "frame-src https://challenges.cloudflare.com",
      "form-action 'self' https://formspree.io",
      "base-uri 'self'",
      "object-src 'none'",
      "frame-ancestors 'self'",
      "upgrade-insecure-requests"
    ].join("; ");

    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), browsing-topics=()"
          }
        ]
      }
    ];
  },
  async redirects() {
    return [
      // Revamp: old marketing pages redirect to new SPA home
      { source: "/services", destination: "/", permanent: true },
      { source: "/portfolio", destination: "/", permanent: true },
      { source: "/about", destination: "/", permanent: true },
      { source: "/faq", destination: "/", permanent: true },
      { source: "/contact", destination: "/", permanent: true },
      { source: "/website-design", destination: "/", permanent: true },
      { source: "/website-design/:path*", destination: "/", permanent: true },
      // Legacy redirects
      { source: "/jax-coming-soon", destination: "/jax", permanent: true },
      { source: "/privacy-policy", destination: "/privacy", permanent: true },
      { source: "/terms-of-service", destination: "/terms", permanent: true },
      { source: "/case-studies", destination: "/portfolio", permanent: true },
      { source: "/dashboard", destination: "/", permanent: true },
      { source: "/register", destination: "/intake", permanent: true }
    ];
  }
};

export default withSentryConfig(nextConfig, {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  org: "chaoticallyorganizedai",

  project: "sentry-canary-apple",

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: "/monitoring",

  webpack: {
    // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,

    // Tree-shaking options for reducing bundle size
    treeshake: {
      // Automatically tree-shake Sentry logger statements to reduce bundle size
      removeDebugLogging: true,
    },
  }
});
