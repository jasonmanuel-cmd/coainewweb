import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/utils/rate-limit", () => ({ takeRateLimitToken: vi.fn(async () => true) }));
vi.mock("@/lib/turnstile/verify", () => ({ verifyTurnstileToken: vi.fn(async () => true) }));
vi.mock("@sentry/nextjs", () => ({ captureException: vi.fn() }));
import { POST } from "@/app/api/intake/route";
import { takeRateLimitToken } from "@/lib/utils/rate-limit";
import { verifyTurnstileToken } from "@/lib/turnstile/verify";
import { FORMSPREE_INTAKE } from "@/lib/forms";

const valid = { first_name: "Demo", business_name: "Example Contractor", phone: "6615550100", email: "demo@example.com", business_website: "none", sms_consent: "no", package_interest: "2", industry: "Trades & Contractors", turnstileToken: "test-token", company: "" };
// happy-dom's Request filters the Origin header; keep this browser-supplied
// transport metadata in the mock instead of accidentally testing a missing header.
const request = (body: unknown, origin = "https://www.chaoticallyorganizedai.com") => ({
  url: "https://www.chaoticallyorganizedai.com/api/intake",
  headers: { get: (name: string) => (({ origin, "content-type": "application/json" } as Record<string, string>)[name.toLowerCase()] ?? null) },
  json: async () => body
}) as unknown as Request;

describe("intake acceptance and failure boundaries", () => {
  beforeEach(() => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://old-domain.example");
    vi.mocked(takeRateLimitToken).mockResolvedValue(true);
    vi.mocked(verifyTurnstileToken).mockResolvedValue(true);
  });
  afterEach(() => { vi.unstubAllGlobals(); vi.unstubAllEnvs(); vi.clearAllMocks(); });
  it("accepts a real same-origin submission and sends consent, scope and contact details to the configured form", async () => {
    const network = vi.fn(async () => new Response("{}", { status: 200 })); vi.stubGlobal("fetch", network);
    const response = await POST(request(valid));
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true });
    const [url, options] = network.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe(FORMSPREE_INTAKE);
    const fields = options.body as FormData;
    expect(fields.get("email")).toBe(valid.email);
    expect(fields.get("package_interest")).toBe("2");
    expect(fields.get("sms_consent")).toBe("no");
    expect(fields.get("_subject")).toContain(valid.business_name);
    expect(fields.has("turnstileToken")).toBe(false);
    expect(fields.has("company")).toBe(false);
    expect(options.signal).toBeDefined();
  });
  it.each([429, 500])("does not report success when the delivery provider returns %s", async (status) => {
    vi.stubGlobal("fetch", vi.fn(async () => new Response("provider-private-detail", { status })));
    const response = await POST(request(valid));
    expect(response.status).toBe(502);
    expect(JSON.stringify(await response.json())).not.toContain("provider-private-detail");
  });
  it("does not report success on a network failure or timeout", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => { throw new DOMException("Timed out", "TimeoutError"); }));
    expect((await POST(request(valid))).status).toBe(502);
  });
  it("rejects invalid submissions before contacting the provider", async () => {
    const network = vi.fn(); vi.stubGlobal("fetch", network);
    expect((await POST(request({ ...valid, email: "bad" }))).status).toBe(400);
    expect(network).not.toHaveBeenCalled();
  });
  it("rejects foreign origins and blocks failed verification and rate limits", async () => {
    const network = vi.fn(); vi.stubGlobal("fetch", network);
    expect((await POST(request(valid, "https://foreign.example"))).status).toBe(403);
    vi.mocked(verifyTurnstileToken).mockResolvedValue(false);
    expect((await POST(request(valid))).status).toBe(400);
    vi.mocked(takeRateLimitToken).mockResolvedValue(false);
    expect((await POST(request(valid))).status).toBe(429);
    expect(network).not.toHaveBeenCalled();
  });
  it("silently ignores the honeypot without contacting the provider", async () => {
    const network = vi.fn(); vi.stubGlobal("fetch", network);
    expect((await POST(request({ ...valid, company: "spam" }))).status).toBe(200);
    expect(network).not.toHaveBeenCalled();
  });
});
