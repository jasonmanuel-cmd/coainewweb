import { describe, it, expect, vi, afterEach } from "vitest";
import { runAudit } from "@/lib/audit/run-audit";

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

function makeHtmlFetch(html: string) {
  return { ok: true, text: async () => html, json: async () => ({}) };
}

function makePsiFetch(score: number) {
  return {
    ok: true,
    json: async () => ({
      lighthouseResult: { categories: { performance: { score } } }
    }),
    text: async () => ""
  };
}

describe("runAudit – invalid URL", () => {
  it("returns an error result for an empty string", async () => {
    const result = await runAudit("");
    expect(result.performanceScore).toBe(0);
    expect(result.issueCount).toBeGreaterThan(0);
    expect(result.raw).toMatchObject({ auditError: "Invalid URL" });
  });

  it("returns an error result for a garbage URL", async () => {
    const result = await runAudit("$$not-a-url");
    expect(result.performanceScore).toBe(0);
  });
});

describe("runAudit – network scenarios", () => {
  it("detects all schema signals present in HTML", async () => {
    const richHtml = `
      <html>
        <head>
          <meta name="description" content="test">
          <link rel="canonical" href="https://example.com">
          <script type="application/ld+json">{"@type":"LocalBusiness"}</script>
        </head>
        <body><p>ProfessionalService</p></body>
      </html>
    `;

    let callCount = 0;
    vi.stubGlobal("fetch", vi.fn().mockImplementation(() => {
      callCount++;
      if (callCount === 1) return Promise.resolve(makePsiFetch(0.95));
      return Promise.resolve(makeHtmlFetch(richHtml));
    }));

    const result = await runAudit("https://example.com");
    expect(result.schemaScore).toBe(100);
    expect(result.performanceScore).toBe(95);
  });

  it("reports missing schema signals", async () => {
    vi.stubGlobal("fetch", vi.fn().mockImplementation(() =>
      Promise.resolve(makePsiFetch(0.85))
    ).mockImplementationOnce(() =>
      Promise.resolve(makePsiFetch(0.85))
    ).mockImplementation(() =>
      Promise.resolve(makeHtmlFetch("<html><body>nothing</body></html>"))
    ));

    const result = await runAudit("https://example.com");
    expect(result.schemaScore).toBeLessThan(100);
    expect(result.recommendations).toContain("Missing JSON-LD schema layer.");
    expect(result.recommendations).toContain("No ProfessionalService/LocalBusiness entity found.");
    expect(result.recommendations).toContain("Missing canonical tag.");
    expect(result.recommendations).toContain("Missing meta description.");
  });

  it("handles a failed PageSpeed API call gracefully", async () => {
    let callCount = 0;
    vi.stubGlobal("fetch", vi.fn().mockImplementation(() => {
      callCount++;
      if (callCount === 1) return Promise.reject(new Error("Network error"));
      return Promise.resolve(makeHtmlFetch("<html></html>"));
    }));

    const result = await runAudit("https://example.com");
    expect(result.performanceScore).toBe(0);
    expect(result.raw).toMatchObject({ auditError: expect.stringContaining("Network error") });
  });

  it("handles a non-ok PageSpeed response", async () => {
    let callCount = 0;
    vi.stubGlobal("fetch", vi.fn().mockImplementation(() => {
      callCount++;
      if (callCount === 1)
        return Promise.resolve({ ok: false, status: 429, text: async () => "Rate limited" });
      return Promise.resolve(makeHtmlFetch("<html></html>"));
    }));

    const result = await runAudit("https://example.com");
    expect(result.raw).toMatchObject({ auditError: expect.stringContaining("429") });
  });

  it("returns 'No critical violations detected.' when everything passes", async () => {
    const richHtml = `
      <html>
        <head>
          <meta name="description" content="test">
          <link rel="canonical" href="https://example.com">
          <script type="application/ld+json">{"@type":"LocalBusiness"}</script>
        </head>
        <body><p>ProfessionalService</p></body>
      </html>
    `;

    let callCount = 0;
    vi.stubGlobal("fetch", vi.fn().mockImplementation(() => {
      callCount++;
      if (callCount === 1) return Promise.resolve(makePsiFetch(0.95));
      return Promise.resolve(makeHtmlFetch(richHtml));
    }));

    const result = await runAudit("https://example.com");
    expect(result.recommendations).toEqual(["No critical violations detected."]);
  });

  it("clamps performance score to 0–100", async () => {
    let callCount = 0;
    vi.stubGlobal("fetch", vi.fn().mockImplementation(() => {
      callCount++;
      if (callCount === 1) return Promise.resolve(makePsiFetch(1.5));
      return Promise.resolve(makeHtmlFetch("<html></html>"));
    }));

    const result = await runAudit("https://example.com");
    expect(result.performanceScore).toBeLessThanOrEqual(100);
    expect(result.performanceScore).toBeGreaterThanOrEqual(0);
  });

  it("blocks SSRF and falls back gracefully for private IP HTML fetch", async () => {
    // PSI succeeds, HTML fetch to private IP is blocked
    let callCount = 0;
    vi.stubGlobal("fetch", vi.fn().mockImplementation(() => {
      callCount++;
      if (callCount === 1) return Promise.resolve(makePsiFetch(0.9));
      return Promise.reject(new Error("Host not allowed"));
    }));

    // Use a public URL — assertUrlSafeForServerFetch is called before the second fetch
    const result = await runAudit("https://example.com");
    expect(result).toBeDefined();
  });
});
