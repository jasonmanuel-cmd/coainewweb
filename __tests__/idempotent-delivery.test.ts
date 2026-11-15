import { beforeEach, afterEach, expect, it, vi } from "vitest";
import { createHash } from "node:crypto";
const store = vi.hoisted(() => ({ claim: vi.fn(), finish: vi.fn() }));
vi.mock("@/lib/crm/delivery-store", () => ({ claimDelivery: store.claim, finishDelivery: store.finish }));
vi.mock("@sentry/nextjs", () => ({ captureException: vi.fn() }));
import { deliverCapturedForm } from "@/lib/crm/notifications";

let receipt: { id: string; fingerprint: string; state: string; attempts: number } | undefined;
beforeEach(() => {
  vi.stubEnv("COAI_IDEMPOTENT_DELIVERY_ENABLED", "true");
  vi.stubEnv("CRM_STORAGE", "neon"); vi.stubEnv("COAI_CRM_ENABLED", "true");
  receipt = undefined; store.claim.mockReset(); store.finish.mockReset();
  store.claim.mockImplementation(async (_key, fingerprint) => {
    if (receipt) return { ...receipt, owned: false };
    receipt = { id: "receipt", fingerprint, state: "pending", attempts: 1 };
    return { ...receipt, owned: true };
  });
  store.finish.mockImplementation(async (_id, state) => { receipt!.state = state; });
  vi.stubGlobal("fetch", vi.fn(async () => new Response("{}", { status: 200 })));
  vi.spyOn(console, "error").mockImplementation(() => {});
});
afterEach(() => { vi.unstubAllEnvs(); vi.unstubAllGlobals(); vi.restoreAllMocks(); });
const send = (fields = {}) => deliverCapturedForm("https://provider.invalid", fields, "captured-content-key");
it("replays accepted receipts without a send, even when attribution changes", async () => {
  await send({ recovery_age_ms: "100" }); await send({ recovery_age_ms: "200" });
  expect(fetch).toHaveBeenCalledTimes(1); expect(receipt?.state).toBe("accepted");
  expect(store.finish).toHaveBeenCalledWith("receipt", "accepted", 1);
});
it("allows only one concurrent sender", async () => {
  const results = await Promise.allSettled([send(), send(), send()]);
  expect(fetch).toHaveBeenCalledTimes(1);
  expect(results.filter(r => r.status === "fulfilled")).toHaveLength(1);
});
it.each(["network", "timeout", "rejection"])("retains %s uncertainty and never automatically resends", async mode => {
  vi.mocked(fetch).mockImplementation(async () => {
    if (mode === "rejection") return new Response("private-provider-body", { status: 500 });
    throw new DOMException("private network details", mode === "timeout" ? "TimeoutError" : "NetworkError");
  });
  await expect(send()).rejects.toThrow("Your inquiry is saved");
  await expect(send()).rejects.toMatchObject({ status: 503 });
  expect(fetch).toHaveBeenCalledTimes(1); expect(receipt?.state).toBe("unknown");
});
it("fails closed when the receipt database cannot claim", async () => {
  store.claim.mockRejectedValue(new Error("private DB details"));
  await expect(send()).rejects.toThrow("Your inquiry is saved"); expect(fetch).not.toHaveBeenCalled();
});
it("does not resend acceptance when the receipt commit fails", async () => {
  store.finish.mockRejectedValue(new Error("DB commit unknown"));
  await expect(send()).rejects.toMatchObject({ status: 503 });
  await expect(send()).rejects.toMatchObject({ status: 503 });
  expect(receipt?.state).toBe("pending"); expect(fetch).toHaveBeenCalledTimes(1);
});
it("does not resend a pending claim left by a crash before provider invocation", async () => {
  const fingerprint = createHash("sha256").update(JSON.stringify(["https://provider.invalid", "captured-content-key"])).digest("hex");
  store.claim.mockResolvedValue({ id: "crashed", owned: false, state: "pending", fingerprint });
  await expect(send()).rejects.toMatchObject({ status: 503 }); expect(fetch).not.toHaveBeenCalled();
});
it("fails closed without a captured key or compatible store", async () => {
  await expect(deliverCapturedForm("https://provider.invalid", {})).rejects.toMatchObject({ status: 503 });
  vi.stubEnv("CRM_STORAGE", "redis"); await expect(send()).rejects.toMatchObject({ status: 503 });
  expect(fetch).not.toHaveBeenCalled();
});
it("uses a bounded signal and never sends submission identifiers to the provider", async () => {
  await send({ email: "test@example.invalid", submission_id: "private-id", submission_key: "private-key" });
  const options = vi.mocked(fetch).mock.calls[0][1]!;
  expect(options.signal).toBeDefined();
  expect((options.body as FormData).get("email")).toBe("test@example.invalid");
  expect((options.body as FormData).has("submission_id")).toBe(false);
  expect((options.body as FormData).has("submission_key")).toBe(false);
});
it("blocks changing the destination on an accepted receipt", async () => {
  await send();
  await expect(deliverCapturedForm("https://different.invalid", {}, "captured-content-key")).rejects.toMatchObject({ status: 409 });
  expect(fetch).toHaveBeenCalledTimes(1);
});
