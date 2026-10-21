import { afterEach, expect, it, vi } from "vitest";
const upsert = vi.hoisted(() => vi.fn(async (_row: Record<string, unknown>, _options: Record<string, unknown>) => ({ error: null as unknown })));
vi.mock("@/lib/supabase/client", () => ({ getSupabaseAdmin: () => ({ from: () => ({ upsert }) }) }));
import { captureCrmLead } from "@/lib/crm/capture";
const fields = { first_name: "Test", business_name: "Example", email: "test@example.com", phone: "6615550100", business_website: "none", turnstileToken: "secret-token", company: "", package_interest: "2", industry: "Trades" };
afterEach(() => { vi.unstubAllEnvs(); upsert.mockClear(); });
it("keeps the existing email rollout independent while CRM is disabled", async () => {
  vi.stubEnv("COAI_CRM_ENABLED", "false"); await captureCrmLead("intake", fields); expect(upsert).not.toHaveBeenCalled();
});
it("stores only allowlisted submitted data with explicit no-consent and retry deduplication", async () => {
  vi.stubEnv("COAI_CRM_ENABLED", "true"); await captureCrmLead("intake", fields); await captureCrmLead("intake", fields);
  const row = upsert.mock.calls[0][0] as unknown as Record<string, unknown>;
  expect(row.intent).toBe("build"); expect(row.sms_consent).toBe("no");
  expect(JSON.stringify(row)).not.toContain("secret-token"); expect(row).not.toHaveProperty("company");
  expect(upsert.mock.calls[1][0]).toEqual(row); expect(upsert.mock.calls[0][1]).toEqual({ onConflict: "submission_key", ignoreDuplicates: true });
});
it("does not claim CRM acceptance after storage fails and hides database internals", async () => {
  vi.stubEnv("COAI_CRM_ENABLED", "true"); upsert.mockResolvedValueOnce({ error: { message: "private database details" } });
  await expect(captureCrmLead("contact", fields)).rejects.toThrow("couldn't save");
});
