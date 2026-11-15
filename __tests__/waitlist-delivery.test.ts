import { afterEach, beforeEach, expect, it, vi } from "vitest";
vi.mock("@/lib/utils/rate-limit", () => ({ takeRateLimitToken: vi.fn(async () => true) }));
vi.mock("@/lib/turnstile/verify", () => ({ verifyTurnstileToken: vi.fn(async () => true) }));
vi.mock("@sentry/nextjs", () => ({ captureException: vi.fn() }));
vi.mock("@/lib/crm/capture", () => ({ captureCrmLead: vi.fn(async () => "captured-key") }));
import { captureCrmLead } from "@/lib/crm/capture";
import { POST } from "@/app/api/jax-waitlist/route";
const valid = { email: "synthetic@example.invalid", submission_id: "b46cd419-2515-434e-a796-e5a12aa40a29", turnstileToken: "test" };
const request = (body: unknown) => ({
  url: "https://www.chaoticallyorganizedai.com/api/jax-waitlist",
  headers: { get: (name: string) => ({ origin: "https://www.chaoticallyorganizedai.com", "content-type": "application/json" } as Record<string, string>)[name.toLowerCase()] ?? null },
  json: async () => body
}) as unknown as Request;
beforeEach(() => {
  vi.stubEnv("COAI_IDEMPOTENT_DELIVERY_ENABLED", "false"); vi.stubEnv("COAI_NOTIFICATION_JOURNAL_ENABLED", "false");
  vi.stubGlobal("fetch", vi.fn(async () => new Response("{}", { status: 200 })));
  vi.spyOn(console, "error").mockImplementation(() => {});
});
afterEach(() => { vi.unstubAllEnvs(); vi.unstubAllGlobals(); vi.restoreAllMocks(); vi.clearAllMocks(); });
it("retains captured ID and uses the bounded delivery adapter without leaking the ID", async () => {
  expect((await POST(request(valid))).status).toBe(200);
  expect(captureCrmLead).toHaveBeenCalledWith("waitlist", expect.objectContaining({ submission_id: valid.submission_id }));
  const options = vi.mocked(fetch).mock.calls[0][1]!;
  expect(options.signal).toBeDefined();
  expect((options.body as FormData).get("form_type")).toBe("jax_waitlist");
  expect((options.body as FormData).has("submission_id")).toBe(false);
});
it.each(["timeout", "rejection"])("returns bounded %s failure with the captured lead retained", async mode => {
  vi.mocked(fetch).mockImplementation(async () => {
    if (mode === "timeout") throw new DOMException("timeout", "TimeoutError");
    return new Response("private", { status: 500 });
  });
  expect((await POST(request(valid))).status).toBe(502); expect(captureCrmLead).toHaveBeenCalledTimes(1);
});
it("requires a stable submission ID when gated before capture or provider calls", async () => {
  vi.stubEnv("COAI_IDEMPOTENT_DELIVERY_ENABLED", "true");
  expect((await POST(request({ email: valid.email }))).status).toBe(400);
  expect(captureCrmLead).not.toHaveBeenCalled(); expect(fetch).not.toHaveBeenCalled();
});
