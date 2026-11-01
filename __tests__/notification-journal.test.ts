import { afterEach, beforeEach, expect, it, vi } from "vitest";
const query = vi.hoisted(() => vi.fn(async (..._args: unknown[]) => [{ id: "attempt" }]));
vi.mock("@neondatabase/serverless", () => ({ neon: () => query }));
vi.mock("@sentry/nextjs", () => ({ captureException: vi.fn() }));
import { deliverCapturedForm, notificationDispatchEnabled, notificationJournalEnabled } from "@/lib/crm/notifications";
beforeEach(() => {
  vi.stubEnv("CRM_STORAGE", "neon"); vi.stubEnv("COAI_CRM_ENABLED", "true");
  vi.stubEnv("DATABASE_URL", "postgres://synthetic-local-only");
  vi.stubEnv("COAI_NOTIFICATION_JOURNAL_ENABLED", "true");
  query.mockReset(); query.mockResolvedValue([{ id: "attempt" }]);
  vi.stubGlobal("fetch", vi.fn(async () => new Response("{}", { status: 200 })));
  vi.spyOn(console, "error").mockImplementation(() => {});
});
afterEach(() => { vi.unstubAllEnvs(); vi.unstubAllGlobals(); vi.restoreAllMocks(); });
it("keeps dispatch permanently off and leaves existing sends alone when recording is disabled", async () => {
  vi.stubEnv("COAI_NOTIFICATION_JOURNAL_ENABLED", "false");
  await deliverCapturedForm("https://provider.invalid", { email: "unit@example.com" }, "key");
  expect(notificationDispatchEnabled).toBe(false); expect(query).not.toHaveBeenCalled(); expect(fetch).toHaveBeenCalledTimes(1);
});
it.each(["redis", "supabase", ""])("cannot activate the Neon journal for backend %s even with the journal flag set", async backend => {
  vi.stubEnv("CRM_STORAGE", backend);
  expect(notificationJournalEnabled()).toBe(false);
  await deliverCapturedForm("https://provider.invalid", {}, "synthetic-key");
  expect(query).not.toHaveBeenCalled(); expect(fetch).toHaveBeenCalledTimes(1);
  expect(notificationDispatchEnabled).toBe(false);
});
it("journals intent before send and provider acceptance afterward without storing payloads", async () => {
  await deliverCapturedForm("https://provider.invalid", { email: "unit@example.com" }, "key");
  expect(query).toHaveBeenCalledTimes(2);
  expect(query.mock.invocationCallOrder[0]).toBeLessThan(vi.mocked(fetch).mock.invocationCallOrder[0]);
  expect(query.mock.calls[1]).toContain("accepted");
  expect(JSON.stringify(query.mock.calls)).not.toContain("unit@example.com");
});
it.each(["rejection", "timeout"])("records unconfirmed %s and preserves the 502 failure", async mode => {
  vi.stubGlobal("fetch", vi.fn(async () => { if (mode === "timeout") throw new Error("private"); return new Response("private", { status: 500 }); }));
  await expect(deliverCapturedForm("https://provider.invalid", {}, "key")).rejects.toMatchObject({ status: 502 });
  expect(query.mock.calls[1]).toContain("unconfirmed"); expect(fetch).toHaveBeenCalledTimes(1);
});
it("does not turn accepted delivery into failure if journal finalization fails", async () => {
  query.mockResolvedValueOnce([{ id: "attempt" }]).mockRejectedValueOnce(new Error("private DB"));
  await expect(deliverCapturedForm("https://provider.invalid", {}, "key")).resolves.toBeUndefined();
  expect(JSON.stringify(vi.mocked(console.error).mock.calls)).not.toContain("private DB");
});
it("preserves the provider attempt when recording is unavailable", async () => {
  query.mockRejectedValueOnce(new Error("storage unavailable"));
  await deliverCapturedForm("https://provider.invalid", {}, "key");
  expect(fetch).toHaveBeenCalledTimes(1);
});
it("records each visitor retry as a separate attempt on the same inquiry key; it does not auto-resend", async () => {
  await deliverCapturedForm("https://provider.invalid", {}, "same-key");
  await deliverCapturedForm("https://provider.invalid", {}, "same-key");
  expect(query.mock.calls[0]).toContain("same-key"); expect(query.mock.calls[2]).toContain("same-key");
  expect(fetch).toHaveBeenCalledTimes(2);
});
