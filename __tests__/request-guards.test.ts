import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { getClientIp, isSameSiteRequest, hasJsonContentType } from "@/lib/security/request-guards";

function makeRequest(headers: Record<string, string> = {}): Request {
  // Use a plain object mock to avoid the Fetch spec's "forbidden header" restrictions
  // (e.g. the `origin` header is stripped by real Request constructors).
  return {
    headers: {
      get: (name: string) => headers[name.toLowerCase()] ?? null
    }
  } as unknown as Request;
}

// ---------------------------------------------------------------------------
// getClientIp
// ---------------------------------------------------------------------------
describe("getClientIp", () => {
  it("returns the first IP from x-forwarded-for", () => {
    const req = makeRequest({ "x-forwarded-for": "1.2.3.4, 5.6.7.8" });
    expect(getClientIp(req)).toBe("1.2.3.4");
  });

  it("returns a single IP from x-forwarded-for", () => {
    const req = makeRequest({ "x-forwarded-for": "9.9.9.9" });
    expect(getClientIp(req)).toBe("9.9.9.9");
  });

  it("falls back to x-real-ip when x-forwarded-for is absent", () => {
    const req = makeRequest({ "x-real-ip": "3.3.3.3" });
    expect(getClientIp(req)).toBe("3.3.3.3");
  });

  it("trims whitespace from x-real-ip", () => {
    const req = makeRequest({ "x-real-ip": "  4.4.4.4  " });
    expect(getClientIp(req)).toBe("4.4.4.4");
  });

  it("returns 'unknown' when neither header is present", () => {
    const req = makeRequest();
    expect(getClientIp(req)).toBe("unknown");
  });
});

// ---------------------------------------------------------------------------
// hasJsonContentType
// ---------------------------------------------------------------------------
describe("hasJsonContentType", () => {
  it("returns true for application/json", () => {
    const req = makeRequest({ "content-type": "application/json" });
    expect(hasJsonContentType(req)).toBe(true);
  });

  it("returns true for application/json with charset", () => {
    const req = makeRequest({ "content-type": "application/json; charset=utf-8" });
    expect(hasJsonContentType(req)).toBe(true);
  });

  it("returns true for uppercase content-type", () => {
    const req = makeRequest({ "content-type": "Application/JSON" });
    expect(hasJsonContentType(req)).toBe(true);
  });

  it("returns false for text/html", () => {
    const req = makeRequest({ "content-type": "text/html" });
    expect(hasJsonContentType(req)).toBe(false);
  });

  it("returns false when content-type is absent", () => {
    const req = makeRequest();
    expect(hasJsonContentType(req)).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// isSameSiteRequest
// ---------------------------------------------------------------------------
describe("isSameSiteRequest", () => {
  const SITE = "https://chaoticallyorganizedai.com";

  beforeEach(() => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", SITE);
    vi.stubEnv("NODE_ENV", "production");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("returns true when origin matches NEXT_PUBLIC_SITE_URL", () => {
    const req = makeRequest({ origin: SITE });
    expect(isSameSiteRequest(req)).toBe(true);
  });

  it("returns false when origin does not match", () => {
    const req = makeRequest({ origin: "https://evil.com" });
    expect(isSameSiteRequest(req)).toBe(false);
  });

  it("returns true when referer origin matches", () => {
    const req = makeRequest({ referer: `${SITE}/page` });
    expect(isSameSiteRequest(req)).toBe(true);
  });

  it("returns false when referer origin does not match", () => {
    const req = makeRequest({ referer: "https://evil.com/page" });
    expect(isSameSiteRequest(req)).toBe(false);
  });

  it("returns false for a malformed referer", () => {
    const req = makeRequest({ referer: "not-a-url" });
    expect(isSameSiteRequest(req)).toBe(false);
  });

  it("returns true in non-production when no origin/referer", () => {
    vi.stubEnv("NODE_ENV", "development");
    const req = makeRequest();
    expect(isSameSiteRequest(req)).toBe(true);
  });

  it("returns false in production when no origin/referer", () => {
    const req = makeRequest();
    expect(isSameSiteRequest(req)).toBe(false);
  });

  it("returns true when NEXT_PUBLIC_SITE_URL is not set", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
    const req = makeRequest({ origin: "https://evil.com" });
    expect(isSameSiteRequest(req)).toBe(true);
  });

  it("returns true when NEXT_PUBLIC_SITE_URL is an invalid URL", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "not-a-valid-url");
    const req = makeRequest({ origin: "https://evil.com" });
    expect(isSameSiteRequest(req)).toBe(true);
  });
});
