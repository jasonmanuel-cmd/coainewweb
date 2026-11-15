import { afterEach, beforeEach, expect, it, vi } from "vitest";
const upsert = vi.hoisted(() => vi.fn(async (..._args: unknown[]) => ({ error: null as unknown })));
vi.mock("@/lib/supabase/client", () => ({ getSupabaseAdmin: () => ({ from: () => ({ upsert }) }) }));
vi.mock("@/lib/utils/rate-limit", () => ({ takeRateLimitToken: vi.fn(async () => true) }));
vi.mock("@/lib/turnstile/verify", () => ({ verifyTurnstileToken: vi.fn(async () => true) }));
vi.mock("@sentry/nextjs", () => ({ captureException: vi.fn() }));
import { POST as intake } from "@/app/api/intake/route";
import { POST as contact } from "@/app/api/contact/route";
const valid = { first_name: "Synthetic", business_name: "Local Fixture", email: "unit@example.com", phone: "6615550100", business_website: "none", attribution: { utm_source: "facebook", landing_page: "/pricing", utm_campaign: "coai-intake", token: "secret", utm_content: "private@example.com" } };
const request = () => ({ url: "https://example.com/api/intake", headers: { get: (key: string) => key === "origin" ? "https://example.com" : key === "content-type" ? "application/json" : null }, json: async () => valid }) as unknown as Request;
beforeEach(() => {
  vi.stubEnv("COAI_IDEMPOTENT_DELIVERY_ENABLED", "false");
  vi.stubEnv("COAI_CRM_ENABLED", "true"); vi.stubEnv("CRM_STORAGE", "supabase"); vi.stubEnv("COAI_NOTIFICATION_JOURNAL_ENABLED", "false");
  vi.useFakeTimers(); vi.setSystemTime(new Date("2026-11-01T12:01:00Z"));
  upsert.mockClear(); vi.spyOn(console, "error").mockImplementation(() => {});
  vi.stubGlobal("fetch", vi.fn(async () => new Response("{}", { status: 200 })));
});
afterEach(() => { vi.useRealTimers(); vi.unstubAllEnvs(); vi.unstubAllGlobals(); vi.restoreAllMocks(); });
it.each([intake, contact])("retains sanitized volunteered inquiries before sending and preserves retries", async handler => {
  vi.mocked(fetch).mockResolvedValueOnce(new Response("private upstream", { status: 500 }));
  expect((await handler(request())).status).toBe(502);
  expect(upsert).toHaveBeenCalledTimes(1);
  const first = upsert.mock.calls[0][0] as { details: Record<string, string>; submission_key: string };
  expect(first.details).toMatchObject({ utm_source: "facebook", landing_page: "/pricing" });
  expect(JSON.stringify(first)).not.toMatch(/secret|private@example/);
  expect(upsert.mock.invocationCallOrder[0]).toBeLessThan(vi.mocked(fetch).mock.invocationCallOrder[0]);
  expect((await handler(request())).status).toBe(200);
  expect((upsert.mock.calls[1][0] as typeof first).submission_key).toBe(first.submission_key);
  // Existing visitor-triggered delivery is still attempted on each retry.
  expect(fetch).toHaveBeenCalledTimes(2);
});
it("does not contact the provider when CRM retention fails", async () => {
  upsert.mockResolvedValueOnce({ error: { message: "private DB details" } });
  expect((await contact(request())).status).toBe(503); expect(fetch).not.toHaveBeenCalled();
});
it("drops legacy query-derived source secrets and builds the contact subject from safe context", async () => {
  const unsafe = { ...request(), json: async () => ({ ...valid, inbound_source: "secret@example.com", contact_intent: "private-token", _subject: "private-token" }) } as Request;
  expect((await contact(unsafe)).status).toBe(200);
  expect(JSON.stringify(upsert.mock.calls)).not.toMatch(/secret@example|private-token/);
  const body = vi.mocked(fetch).mock.calls[0][1]?.body as FormData;
  expect(body.get("_subject")).toBe("COAI website contact");
  expect(body.has("inbound_source")).toBe(false); expect(body.has("contact_intent")).toBe(false);
});
it("documents existing dedupe bucket boundaries honestly", async () => {
  await intake(request()); vi.setSystemTime(new Date("2026-11-01T12:11:00Z")); await intake(request());
  expect((upsert.mock.calls[0][0] as { submission_key: string }).submission_key).not.toBe((upsert.mock.calls[1][0] as { submission_key: string }).submission_key);
});
it.each([intake, contact])("retains modern retry identity across time boundaries and changed recovery metadata", async handler => {
  const body = { ...valid, submission_id: "00000000-0000-4000-8000-000000000001" };
  const req = () => ({ ...request(), json: async () => body }) as Request;
  await handler(req());
  vi.setSystemTime(new Date("2026-11-02T12:11:00Z"));
  body.attribution = { ...body.attribution, utm_source: "instagram" };
  await handler(req());
  const key = (upsert.mock.calls[0][0] as { submission_key: string }).submission_key;
  expect((upsert.mock.calls[1][0] as { submission_key: string }).submission_key).toBe(key);
  const providerFields = vi.mocked(fetch).mock.calls[0][1]?.body as FormData;
  expect(providerFields.has("submission_id")).toBe(false);
  expect(JSON.stringify(upsert.mock.calls)).not.toContain(body.submission_id);
  body.email = "different@example.com"; await handler(req());
  expect((upsert.mock.calls[2][0] as { submission_key: string }).submission_key).not.toBe(key);
});
it.each([intake, contact])("rejects malformed identities before persistence or sending", async handler => {
  const req = { ...request(), json: async () => ({ ...valid, submission_id: "not-a-uuid" }) } as Request;
  expect((await handler(req)).status).toBe(400);
  expect(upsert).not.toHaveBeenCalled(); expect(fetch).not.toHaveBeenCalled();
});
it.each([intake, contact])("requires modern retry identity before capture when durable delivery is enabled", async handler => {
  vi.stubEnv("COAI_IDEMPOTENT_DELIVERY_ENABLED", "true");
  expect((await handler(request())).status).toBe(400);
  expect(upsert).not.toHaveBeenCalled(); expect(fetch).not.toHaveBeenCalled();
});
