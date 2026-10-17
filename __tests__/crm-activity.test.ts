import { afterEach, expect, it, vi } from "vitest";
const rpc = vi.hoisted(() => vi.fn(async (_name: string, _params: unknown) => ({ error: null })));
vi.mock("@/lib/supabase/client", () => ({ getSupabaseAdmin: () => ({ rpc }) }));
vi.mock("@/lib/utils/rate-limit", () => ({ takeRateLimitToken: async () => true }));
import { POST } from "@/app/api/activity/route";
const request = (body: unknown, extra: Record<string, string> = {}) => ({ url: "https://example.com/api/activity", headers: { get: (key: string) => ({ origin: "https://example.com", "content-type": "application/json", ...extra }[key] ?? null) }, json: async () => body }) as unknown as Request;
afterEach(() => { vi.unstubAllEnvs(); rpc.mockClear(); });
it("counts only fixed public paths and rejects extra identifying properties", async () => {
  vi.stubEnv("COAI_CRM_ENABLED", "true");
  expect((await POST(request({ page: "/demo" }))).status).toBe(204);
  expect(rpc).toHaveBeenCalledWith("coai_crm_count_view", { requested_page: "/demo" }); rpc.mockClear();
  expect((await POST(request({ page: "/hq" }))).status).toBe(400);
  expect((await POST(request({ page: "/demo", email: "private@example.com" }))).status).toBe(400); expect(rpc).not.toHaveBeenCalled();
});
it("honors privacy signals and keeps counting off before rollout", async () => {
  vi.stubEnv("COAI_CRM_ENABLED", "true");
  await POST(request({ page: "/" }, { "sec-gpc": "1" })); await POST(request({ page: "/" }, { dnt: "1" }));
  vi.stubEnv("COAI_CRM_ENABLED", "false"); await POST(request({ page: "/" })); expect(rpc).not.toHaveBeenCalled();
});
