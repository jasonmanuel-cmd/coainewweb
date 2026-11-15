import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/utils/rate-limit", () => ({ takeRateLimitToken: vi.fn(async () => true) }));
vi.mock("@/lib/turnstile/verify", () => ({ verifyTurnstileToken: vi.fn(async () => true) }));
vi.mock("@/lib/crm/capture", () => ({ captureCrmLead: vi.fn(async () => "captured-key") }));
vi.mock("@/lib/crm/notifications", () => ({ deliverCapturedForm: vi.fn(async () => undefined) }));
vi.mock("@sentry/nextjs", () => ({ captureException: vi.fn() }));
import { POST as contact } from "@/app/api/contact/route";
import { POST as intake } from "@/app/api/intake/route";
import { captureCrmLead } from "@/lib/crm/capture";
import { deliverCapturedForm } from "@/lib/crm/notifications";
import { verifyTurnstileToken } from "@/lib/turnstile/verify";

const valid = { first_name: "Test", business_name: "Example", phone: "6615550100", email: "test@example.com", business_website: "none", sms_consent: "no", package_interest: "2", industry: "Trades & Contractors", turnstileToken: "synthetic-token" };
function request(route: string, fields: Record<string, unknown>) {
  return {
    url: `https://www.chaoticallyorganizedai.com/api/${route}`,
    headers: { get: (name: string) => (({ origin: "https://www.chaoticallyorganizedai.com", "content-type": "application/json" } as Record<string, string>)[name.toLowerCase()] ?? null) },
    json: async () => fields
  } as unknown as Request;
}
describe.each([{ name: "contact", handler: contact }, { name: "intake", handler: intake }])("$name spam boundary", ({ name, handler }) => {
  beforeEach(() => {
    vi.stubEnv("NODE_ENV", "production");
    vi.stubEnv("COAI_CRM_ENABLED", "true");
    vi.stubEnv("COAI_IDEMPOTENT_DELIVERY_ENABLED", "false");
    vi.spyOn(console, "warn").mockImplementation(() => undefined);
    vi.mocked(verifyTurnstileToken).mockResolvedValue(true);
  });
  afterEach(() => { vi.clearAllMocks(); vi.restoreAllMocks(); vi.unstubAllEnvs(); });
  it.each(["company", "contact_reference"])("rejects filled %s without a false receipt or side effects", async field => {
    const response = await handler(request(name, { ...valid, [field]: "autofilled business" }));
    expect(response.status).toBe(400);
    const body = await response.json();
    expect(body).not.toHaveProperty("ok");
    expect(body.error).toContain("Refresh the page");
    expect(captureCrmLead).not.toHaveBeenCalled();
    expect(deliverCapturedForm).not.toHaveBeenCalled();
  });
  it("accepts a clean form while keeping anti-spam fields out of CRM and delivery", async () => {
    const response = await handler(request(name, { ...valid, company: "", contact_reference: "  " }));
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true });
    const fields = vi.mocked(captureCrmLead).mock.calls[0][1];
    expect(fields).not.toHaveProperty("company");
    expect(fields).not.toHaveProperty("contact_reference");
    expect(fields).not.toHaveProperty("turnstileToken");
    expect(deliverCapturedForm).toHaveBeenCalledOnce();
    expect(verifyTurnstileToken).toHaveBeenCalledOnce();
  });
  it("still blocks failed CAPTCHA before capture or delivery", async () => {
    vi.mocked(verifyTurnstileToken).mockResolvedValue(false);
    expect((await handler(request(name, valid))).status).toBe(400);
    expect(captureCrmLead).not.toHaveBeenCalled();
    expect(deliverCapturedForm).not.toHaveBeenCalled();
  });
});
