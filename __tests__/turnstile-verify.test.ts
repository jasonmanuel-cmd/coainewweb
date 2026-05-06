import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { verifyTurnstileToken, turnstileRequired } from "@/lib/turnstile/verify";

describe("turnstileRequired", () => {
  afterEach(() => vi.unstubAllEnvs());

  it("returns false when TURNSTILE_SECRET_KEY is not set", () => {
    vi.stubEnv("TURNSTILE_SECRET_KEY", "");
    expect(turnstileRequired()).toBe(false);
  });

  it("returns true when TURNSTILE_SECRET_KEY is set", () => {
    vi.stubEnv("TURNSTILE_SECRET_KEY", "0x4AAAAAAA_secret");
    expect(turnstileRequired()).toBe(true);
  });

  it("returns false for whitespace-only key", () => {
    vi.stubEnv("TURNSTILE_SECRET_KEY", "   ");
    expect(turnstileRequired()).toBe(false);
  });
});

describe("verifyTurnstileToken", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("returns true (skip) when TURNSTILE_SECRET_KEY is not set", async () => {
    vi.stubEnv("TURNSTILE_SECRET_KEY", "");
    const result = await verifyTurnstileToken("anytoken1234567890");
    expect(result).toBe(true);
  });

  it("returns false when token is undefined", async () => {
    vi.stubEnv("TURNSTILE_SECRET_KEY", "0x4AAAAAAA_secret");
    const result = await verifyTurnstileToken(undefined);
    expect(result).toBe(false);
  });

  it("returns false when token is too short (< 10 chars)", async () => {
    vi.stubEnv("TURNSTILE_SECRET_KEY", "0x4AAAAAAA_secret");
    const result = await verifyTurnstileToken("short");
    expect(result).toBe(false);
  });

  it("returns true when Cloudflare responds with success: true", async () => {
    vi.stubEnv("TURNSTILE_SECRET_KEY", "0x4AAAAAAA_secret");
    const mockFetch = vi.fn().mockResolvedValue({
      json: async () => ({ success: true })
    });
    vi.stubGlobal("fetch", mockFetch);

    const result = await verifyTurnstileToken("valid_token_1234567890", "1.2.3.4");
    expect(result).toBe(true);
    expect(mockFetch).toHaveBeenCalledOnce();
    const [url] = mockFetch.mock.calls[0] as [string, unknown];
    expect(url).toContain("cloudflare.com/turnstile");
  });

  it("returns false when Cloudflare responds with success: false", async () => {
    vi.stubEnv("TURNSTILE_SECRET_KEY", "0x4AAAAAAA_secret");
    const mockFetch = vi.fn().mockResolvedValue({
      json: async () => ({ success: false, "error-codes": ["invalid-input-response"] })
    });
    vi.stubGlobal("fetch", mockFetch);

    const result = await verifyTurnstileToken("valid_token_1234567890");
    expect(result).toBe(false);
  });

  it("does not include remoteip when it is 'unknown'", async () => {
    vi.stubEnv("TURNSTILE_SECRET_KEY", "0x4AAAAAAA_secret");
    const mockFetch = vi.fn().mockResolvedValue({
      json: async () => ({ success: true })
    });
    vi.stubGlobal("fetch", mockFetch);

    await verifyTurnstileToken("valid_token_1234567890", "unknown");
    const [, options] = mockFetch.mock.calls[0] as [string, { body: URLSearchParams }];
    expect((options.body as URLSearchParams).has("remoteip")).toBe(false);
  });

  it("includes remoteip when it is a real IP", async () => {
    vi.stubEnv("TURNSTILE_SECRET_KEY", "0x4AAAAAAA_secret");
    const mockFetch = vi.fn().mockResolvedValue({
      json: async () => ({ success: true })
    });
    vi.stubGlobal("fetch", mockFetch);

    await verifyTurnstileToken("valid_token_1234567890", "9.9.9.9");
    const [, options] = mockFetch.mock.calls[0] as [string, { body: URLSearchParams }];
    expect((options.body as URLSearchParams).get("remoteip")).toBe("9.9.9.9");
  });
});
