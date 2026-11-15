import { afterEach, expect, it, vi } from "vitest";
const owner = vi.hoisted(() => vi.fn(async () => {}));
const limit = vi.hoisted(() => vi.fn(async () => ({ error: null as unknown })));
const redis = vi.hoisted(() => vi.fn());
vi.mock("@/lib/crm/auth", () => ({ requireHqOwner: owner }));
vi.mock("@/lib/supabase/client", () => ({ getSupabaseAdmin: () => ({ from: () => ({ select: () => ({ limit }) }) }) }));
vi.mock("@/lib/crm/redis-store", () => ({ usesRedisCrm: () => false, redisCommand: redis }));
import { GET, POST } from "@/app/api/hq/health/route";
import { GET as notifications } from "@/app/api/hq/notifications/route";
import { PublicError } from "@/lib/public-error";
afterEach(() => { vi.unstubAllEnvs(); vi.clearAllMocks(); });
it("reports the Supabase read check accurately without claiming write verification", async () => {
  vi.stubEnv("CRM_STORAGE", "supabase");
  expect(await (await GET()).json()).toMatchObject({ ok: true, storage: "supabase", storage_write_verified: false });
  expect(redis).not.toHaveBeenCalled();
});
it("does not send a Redis write probe in Supabase mode", async () => {
  vi.stubEnv("CRM_STORAGE", "supabase");
  const request = { url: "https://example.com/api/hq/health", headers: { get: () => "https://example.com" } } as unknown as Request;
  expect((await POST(request)).status).toBe(501); expect(redis).not.toHaveBeenCalled();
});
it("hides backend errors", async () => {
  vi.stubEnv("CRM_STORAGE", "supabase"); limit.mockResolvedValueOnce({ error: { message: "secret database" } });
  const response = await GET(); expect(response.status).toBe(503); expect(JSON.stringify(await response.json())).not.toContain("secret database");
});
it("denies unauthenticated notification access and does not cache private responses", async () => {
  owner.mockRejectedValueOnce(new PublicError("Unauthorized", 401));
  const response = await notifications(); expect(response.status).toBe(401); expect(response.headers.get("cache-control")).toContain("no-store");
});
