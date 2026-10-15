import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

// The browser SDK is initialised lazily from components/SentryLazyInit.tsx (it used to
// live in instrumentation-client.ts, but that put a ~430KB chunk in the critical bundle).
// Server runtimes are configured separately.
const CONFIGS = [
  "components/SentryLazyInit.tsx",
  "sentry.server.config.ts",
  "sentry.edge.config.ts"
];

/**
 * Sentry 11 replaced `sendDefaultPii` with `dataCollection`, whose defaults collect cookies, headers,
 * user info and request bodies. The contact/intake forms carry names, emails and phone numbers, so the
 * client must stay opted out of all of it in every runtime.
 */
describe("Sentry data collection stays opted out", () => {
  it.each(CONFIGS)("%s disables cookies, headers, user info, bodies and query params", (file) => {
    const source = fs.readFileSync(path.join(process.cwd(), file), "utf8");
    expect(source).toMatch(/dataCollection:\s*\{[^}]*userInfo:\s*false/);
    expect(source).toMatch(/dataCollection:\s*\{[^}]*cookies:\s*false/);
    expect(source).toMatch(/dataCollection:\s*\{[^}]*httpHeaders:\s*false/);
    expect(source).toMatch(/dataCollection:\s*\{[^}]*httpBodies:\s*\[\]/);
    expect(source).toMatch(/dataCollection:\s*\{[^}]*urlQueryParams:\s*false/);
    expect(source).not.toMatch(/dataCollection:\s*(true|\{\s*\})/);
  });
});
