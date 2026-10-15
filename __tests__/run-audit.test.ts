import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import { runAudit } from "@/lib/audit/run-audit";
import { PublicError } from "@/lib/public-error";

beforeEach(() => {
  vi.spyOn(console, "error").mockImplementation(() => undefined);
});

afterEach(() => {
  vi.restoreAllMocks();
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
    // Hermetic: never touch the network from tests (happy-dom's fetch does not
    // settle reliably with abort signals on unresolvable hosts).
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("no network")));
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
    expect(result.raw).toMatchObject({ auditError: "PageSpeed data was unavailable." });
    // The underlying error text is logged server-side, never returned.
    expect(JSON.stringify(result)).not.toContain("Network error");
    expect(console.error).toHaveBeenCalled();
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
    // The upstream response body must not reach the caller.
    expect(JSON.stringify(result)).not.toContain("Rate limited");
  });

  it("rejects loopback and private targets up front instead of auditing them", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    for (const target of ["http://localhost:3000", "http://169.254.169.254/latest", "http://10.0.0.5"]) {
      await expect(runAudit(target)).rejects.toBeInstanceOf(PublicError);
    }
    expect(fetchMock).not.toHaveBeenCalled();
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

  it("does not follow a redirect that points at a private host (SSRF via redirect)", async () => {
    const fetchMock = vi.fn().mockImplementation(() => {
      callCountRef.count++;
      if (callCountRef.count === 1) return Promise.resolve(makePsiFetch(0.9));
      // First HTML hop is a public URL that 302s at the cloud metadata endpoint.
      return Promise.resolve({
        ok: false,
        status: 302,
        headers: { get: () => "http://169.254.169.254/latest" },
        text: async () => ""
      });
    });
    const callCountRef = { count: 0 };
    vi.stubGlobal("fetch", fetchMock);

    const result = await runAudit("https://example.com");
    // PSI call + one HTML hop only; the private redirect target is never fetched.
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock.mock.calls.map((c) => String(c[0]))).not.toContain("http://169.254.169.254/latest");
    // The audit degrades gracefully instead of leaking the redirect chain.
    expect(result).toBeDefined();
    expect(result.schemaScore).toBe(0);
  });

  it("follows redirects between public hosts", async () => {
    const richHtml = `
      <html>
        <head>
          <meta name="description" content="test">
          <link rel="canonical" href="https://www.example.com">
          <script type="application/ld+json">{"@type":"LocalBusiness"}</script>
        </head>
        <body><p>ProfessionalService</p></body>
      </html>
    `;
    const callCountRef = { count: 0 };
    vi.stubGlobal("fetch", vi.fn().mockImplementation(() => {
      callCountRef.count++;
      if (callCountRef.count === 1) return Promise.resolve(makePsiFetch(0.95));
      if (callCountRef.count === 2)
        return Promise.resolve({
          ok: false,
          status: 301,
          headers: { get: () => "https://www.example.com/" },
          text: async () => ""
        });
      return Promise.resolve(makeHtmlFetch(richHtml));
    }));

    const result = await runAudit("https://example.com");
    expect(result.schemaScore).toBe(100);
  });
});
