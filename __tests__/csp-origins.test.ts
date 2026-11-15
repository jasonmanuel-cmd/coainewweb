import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

/**
 * The Content-Security-Policy is built at build time in next.config.ts and shipped as a
 * static header. Because it is static, nothing fails at build time when a third-party
 * widget loads a resource the policy does not allow: the script executes and then the
 * browser silently blocks its stylesheet, font or API calls. That is how the knocket
 * (trtc.io) widget ended up non-functional in production while every check stayed green.
 *
 * Each entry below is an origin that a script in the app actually requests, mapped to the
 * directive that must permit it. Adding a third-party script to the app without adding
 * its origins here should fail this test.
 */
const REQUIRED: Array<[directive: string, origin: string, why: string]> = [
  [
    "script-src",
    "https://trtc.io",
    "knocket SDK script (app/layout.tsx)"
  ],
  [
    "style-src",
    "https://trtc.io",
    "knocket SDK stylesheet - was missing, so the widget rendered unstyled and its API calls were blocked"
  ],
  [
    "connect-src",
    "https://api.trtc.io",
    "knocket portal API - was missing, so the widget could never initialise"
  ],
  ["font-src", "https://unpkg.com", "Vapi chat widget loads the lucide-static icon font from unpkg"],
  ["script-src", "https://cdn.jsdelivr.net", "Vapi chat widget is served from jsDelivr"],
  ["connect-src", "https://api.vapi.ai", "Vapi chat widget API"],
  ["script-src", "https://www.googletagmanager.com", "Google Tag Manager"],
  ["script-src", "https://scripts.simpleanalyticscdn.com", "Simple Analytics"],
  ["connect-src", "https://queue.simpleanalyticscdn.com", "Simple Analytics noscript pixel"],
  ["frame-src", "https://challenges.cloudflare.com", "Cloudflare Turnstile"]
];

function cspDirectives(): Map<string, string[]> {
  const source = fs.readFileSync(path.join(process.cwd(), "next.config.ts"), "utf8");

  // Take the `const csp = [ ... ].join("; ")` array verbatim rather than trying to regex
  // the individual directives: they are a mix of double-quoted strings, single-quoted
  // values and a template literal that interpolates ${developmentEval}, so quote-aware
  // matching is fragile.
  const block = source.slice(source.indexOf("const csp = ["));
  const end = block.indexOf('].join("; ")');
  const body = block.slice(0, end === -1 ? block.length : end);

  const map = new Map<string, string[]>();
  for (const line of body.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed.startsWith("\"") && !trimmed.startsWith("`")) continue;
    const match = trimmed.match(/^[`"]([a-z-]+-src)\b/i);
    if (!match) continue;
    const directive = match[1];
    // Everything after the directive name: origins, keywords and any interpolation.
    const rest = trimmed.slice(match[1].length + match[0].length - match[1].length);
    const origins = rest.match(/https?:\/\/[^\s"'`]+/g) ?? [];
    if (!map.has(directive)) map.set(directive, origins);
  }
  return map;
}

describe("Content-Security-Policy permits every third-party origin the app loads", () => {
  const directives = cspDirectives();

  it.each(REQUIRED)("%s allows %s (%s)", (directive, origin, why) => {
    expect(directives.has(directive), `directive "${directive}" not found in next.config.ts`).toBe(true);
    expect(directives.get(directive), `${origin} missing from ${directive}`).toContain(origin);
  });

  it("keeps object-src and base-uri locked down", () => {
    const source = fs.readFileSync(path.join(process.cwd(), "next.config.ts"), "utf8");
    expect(source).toContain(`"object-src 'none'"`);
    expect(source).toContain(`"base-uri 'self'"`);
  });
});