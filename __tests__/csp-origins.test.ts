import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

/**
 * The Content-Security-Policy is built at build time in next.config.ts and shipped as a
 * static header. Because it is static, nothing fails at build time when a third-party
 * widget loads a resource the policy does not allow: the script executes and then the
 * browser silently blocks its stylesheet, font or API calls.
 *
 * Each entry below is an origin that a script in the app actually requests, mapped to the
 * directive that must permit it. Adding a third-party script to the app without adding
 * its origins here should fail this test.
 */
const REQUIRED: Array<[directive: string, origin: string, why: string]> = [
  ["font-src", "https://unpkg.com", "Vapi chat widget loads the lucide-static icon font from unpkg"],
  ["script-src", "https://cdn.jsdelivr.net", "Vapi chat widget is served from jsDelivr"],
  ["connect-src", "https://api.vapi.ai", "Vapi chat widget API"],
  ["script-src", "https://www.googletagmanager.com", "Google Tag Manager and the Google tag (gtag.js)"],
  ["connect-src", "https://www.google-analytics.com", "Google tag measurement requests"],
  ["script-src", "https://www.clarity.ms", "Microsoft Clarity loader"],
  ["script-src", "https://scripts.clarity.ms", "Microsoft Clarity recorder"],
  ["connect-src", "https://*.clarity.ms", "Microsoft Clarity collection endpoints"],
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
describe("analytics and social wiring", () => {
  const read = (...p: string[]) => fs.readFileSync(path.join(process.cwd(), ...p), "utf8");

  it("loads no trtc.io (knocket) script and allows none in the CSP", () => {
    expect(read("app", "layout.tsx")).not.toMatch(/trtc\.io|knocket/i);
    expect(read("next.config.ts")).not.toMatch(/trtc\.io/i);
  });

  it("puts one Google tag in <head> as a plain script, using the hard-coded ID", () => {
    const layout = read("app", "layout.tsx");
    const site = read("lib", "site.ts");
    expect(site).toContain('GOOGLE_TAG_ID = "G-ZYCPQEBGTN"');
    expect(layout.match(/googletagmanager\.com\/gtag\/js/g)?.length).toBe(1);
    expect(layout).toMatch(/<head>[\s\S]*<script async src=\{`https:\/\/www\.googletagmanager\.com\/gtag\/js\?id=\$\{GOOGLE_TAG_ID\}`\}[\s\S]*<\/head>/);
    expect(layout).toContain("gtag('config'");
    expect(layout).not.toMatch(/NEXT_PUBLIC_GA_MEASUREMENT_ID/);
  });
});

describe("Microsoft Clarity", () => {
  it("is loaded once from <head>, never on /hq and never for DNT or GPC visitors", () => {
    const layout = fs.readFileSync(path.join(process.cwd(), "app", "layout.tsx"), "utf8");
    expect(layout.match(/clarity\.ms\/tag\//g)?.length).toBe(1);
    expect(layout).toContain("CLARITY_PROJECT_ID");
    expect(layout).toContain("doNotTrack");
    expect(layout).toContain("globalPrivacyControl");
    expect(layout).toMatch(/<head>[\s\S]*CLARITY_INIT[\s\S]*<\/head>/);
  });
});

describe("organization sameAs", () => {
  it("lists only verified profiles", async () => {
    const { SAME_AS } = await import("@/lib/site");
    expect(SAME_AS.some((u) => /x\.com|twitter\.com|linkedin\.com\/company/.test(u))).toBe(false);
    expect(SAME_AS.some((u) => u.includes("facebook.com/profile.php?id=61584598503488"))).toBe(true);
    expect(SAME_AS.some((u) => u.includes("instagram.com/chaoticallyorganizedai661"))).toBe(true);
  });
});

describe("footer social links", () => {
  it("point at the same verified profiles as the schema", async () => {
    const { SOCIAL_LINKS, SAME_AS, FOUNDER_SAME_AS } = await import("@/lib/site");
    const known = new Set<string>([...SAME_AS, ...FOUNDER_SAME_AS]);
    expect(SOCIAL_LINKS.map((l) => l.id)).toEqual(["facebook", "instagram", "linkedin"]);
    for (const link of SOCIAL_LINKS) expect(known.has(link.href)).toBe(true);
  });
});
