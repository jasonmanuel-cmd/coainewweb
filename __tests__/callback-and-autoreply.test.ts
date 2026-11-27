import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/utils/rate-limit", () => ({ takeRateLimitToken: vi.fn(async () => true) }));
vi.mock("@/lib/turnstile/verify", () => ({ verifyTurnstileToken: vi.fn(async () => true) }));
vi.mock("@/lib/crm/capture", () => ({ captureCrmLead: vi.fn(async () => "captured-key") }));
vi.mock("@/lib/crm/notifications", () => ({ deliverCapturedForm: vi.fn(async () => undefined) }));
vi.mock("@sentry/nextjs", () => ({ captureException: vi.fn() }));
import { POST as callback } from "@/app/api/callback/route";
import { POST as contact } from "@/app/api/contact/route";
import { autoreplyEnabled, confirmationMessage, sendLeadConfirmation } from "@/lib/autoreply";
import { captureCrmLead } from "@/lib/crm/capture";
import { deliverCapturedForm } from "@/lib/crm/notifications";

function request(route: string, fields: Record<string, unknown>) {
  return {
    url: `https://www.chaoticallyorganizedai.com/api/${route}`,
    headers: { get: (name: string) => (({ origin: "https://www.chaoticallyorganizedai.com", "content-type": "application/json" } as Record<string, string>)[name.toLowerCase()] ?? null) },
    json: async () => fields
  } as unknown as Request;
}

describe("callback route", () => {
  beforeEach(() => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("COAI_CRM_ENABLED", "true");
    vi.stubEnv("COAI_IDEMPOTENT_DELIVERY_ENABLED", "false");
    vi.spyOn(console, "warn").mockImplementation(() => undefined);
  });
  afterEach(() => { vi.clearAllMocks(); vi.restoreAllMocks(); vi.unstubAllEnvs(); });

  it("accepts just a name and phone, stores and delivers it", async () => {
    const response = await callback(request("callback", { first_name: "Sam", phone: "6615550100" }));
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true });
    const fields = vi.mocked(captureCrmLead).mock.calls[0][1];
    expect(fields).toMatchObject({ form_type: "callback", first_name: "Sam", phone: "6615550100", business_name: "Callback request", email: "" });
    expect(fields).not.toHaveProperty("turnstileToken");
    expect(deliverCapturedForm).toHaveBeenCalledOnce();
  });

  it("rejects a missing or short phone number", async () => {
    expect((await callback(request("callback", { first_name: "Sam", phone: "12" }))).status).toBeGreaterThanOrEqual(400);
    expect(captureCrmLead).not.toHaveBeenCalled();
  });

  it.each(["company", "contact_reference"])("rejects a filled %s trap without a false receipt", async (field) => {
    const response = await callback(request("callback", { first_name: "Sam", phone: "6615550100", [field]: "autofill" }));
    expect(response.status).toBe(400);
    expect(await response.json()).not.toHaveProperty("ok");
    expect(captureCrmLead).not.toHaveBeenCalled();
    expect(deliverCapturedForm).not.toHaveBeenCalled();
  });
});

describe("confirmation email", () => {
  afterEach(() => { vi.restoreAllMocks(); vi.unstubAllEnvs(); vi.unstubAllGlobals(); });

  it("is off by default and sends nothing", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    expect(autoreplyEnabled()).toBe(false);
    await sendLeadConfirmation({ email: "a@example.com", firstName: "Sam", kind: "contact" });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("sends one plain-text message through Resend when fully configured", async () => {
    vi.stubEnv("COAI_AUTOREPLY_ENABLED", "true");
    vi.stubEnv("RESEND_API_KEY", "re_test");
    vi.stubEnv("COAI_AUTOREPLY_FROM", "COAI <hello@example.com>");
    const fetchMock = vi.fn(async () => ({ ok: true }) as Response);
    vi.stubGlobal("fetch", fetchMock);
    await sendLeadConfirmation({ email: "a@example.com", firstName: "Sam\nBcc: x@y.z", kind: "intake" });
    expect(fetchMock).toHaveBeenCalledOnce();
    const [url, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe("https://api.resend.com/emails");
    const body = JSON.parse(String(init.body));
    expect(body.to).toEqual(["a@example.com"]);
    expect(body.text).toContain("Hi Sam Bcc: x@y.z,");
    expect(body.text).not.toMatch(/\bwithin \d+|guarantee/i);
    expect(body).not.toHaveProperty("html");
    expect(body.text).toContain("https://calendar.app.google/EPr6vGFuVZ7e7pEa7");
  });

  it("never throws or logs the address when the provider fails", async () => {
    vi.stubEnv("COAI_AUTOREPLY_ENABLED", "true");
    vi.stubEnv("RESEND_API_KEY", "re_test");
    vi.stubEnv("COAI_AUTOREPLY_FROM", "hello@example.com");
    vi.stubGlobal("fetch", vi.fn(async () => { throw new Error("boom a@example.com"); }));
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
    await expect(sendLeadConfirmation({ email: "a@example.com", firstName: "Sam", kind: "contact" })).resolves.toBeUndefined();
    expect(JSON.stringify(warn.mock.calls)).not.toContain("a@example.com");
  });

  it("keeps the contact route response unchanged when autoreply is off", async () => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("COAI_IDEMPOTENT_DELIVERY_ENABLED", "false");
    const response = await contact(request("contact", { first_name: "T", business_name: "E", phone: "6615550100", email: "t@example.com", business_website: "none" }));
    expect(response.status).toBe(200);
    expect(confirmationMessage("T", "contact").subject).toContain("We got your request");
  });
});
