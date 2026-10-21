import { afterEach, beforeEach, expect, it, vi } from "vitest";
const state = vi.hoisted(() => ({ token: "", userId: "", metadata: {}, authError: false }));
const from = vi.hoisted(() => vi.fn());
vi.mock("next/headers", () => ({ cookies: async () => ({ get: () => state.token ? { value: state.token } : undefined, set: vi.fn() }) }));
vi.mock("@/lib/supabase/client", () => ({ getSupabaseAdmin: () => ({ auth: { getUser: async () => ({ data: { user: state.userId ? { id: state.userId, user_metadata: state.metadata } : null }, error: state.authError ? {} : null }) }, from }) }));
import { GET, PATCH } from "@/app/api/hq/leads/route";
import { isHqOwner } from "@/lib/crm/auth";
beforeEach(() => { state.token = ""; state.userId = ""; state.metadata = {}; state.authError = false; from.mockClear(); vi.stubEnv("HQ_ADMIN_USER_IDS", "owner-uuid"); vi.stubEnv("NODE_ENV", "production"); });
afterEach(() => vi.unstubAllEnvs());
it("denies anonymous lead access before querying the database and prevents caching", async () => {
  const response = await GET(new Request("https://example.com/api/hq/leads"));
  expect(response.status).toBe(401); expect(from).not.toHaveBeenCalled(); expect(response.headers.get("cache-control")).toContain("no-store");
});
it("denies authenticated visitors even if they set an admin flag in user metadata", async () => {
  state.token = "visitor-token"; state.userId = "visitor"; state.metadata = { admin: true };
  expect((await GET(new Request("https://example.com/api/hq/leads"))).status).toBe(403); expect(from).not.toHaveBeenCalled();
});
it("fails closed on expired tokens even for an allowlisted ID", async () => {
  state.token = "expired"; state.userId = "owner-uuid"; state.authError = true;
  expect((await GET(new Request("https://example.com/api/hq/leads"))).status).toBe(403);
});
it("fails closed when no owner is configured", () => {
  vi.stubEnv("HQ_ADMIN_USER_IDS", ""); expect(isHqOwner("owner-uuid")).toBe(false); expect(isHqOwner("")).toBe(false);
});
it("rejects cross-site edits before touching lead storage", async () => {
  const request = { url: "https://example.com/api/hq/leads", headers: { get: (key: string) => key === "origin" ? "https://evil.example" : "application/json" } } as unknown as Request;
  expect((await PATCH(request)).status).toBe(403); expect(from).not.toHaveBeenCalled();
});
it("serves a paginated inbox only after validating the owner with the auth service", async () => {
  state.token = "owner-token"; state.userId = "owner-uuid";
  const query = { select: vi.fn(), order: vi.fn(), range: vi.fn(async () => ({ data: [{ id: "lead" }], error: null, count: 1 })) };
  query.select.mockReturnValue(query); query.order.mockReturnValue(query); from.mockReturnValue(query);
  const response = await GET(new Request("https://example.com/api/hq/leads"));
  expect(response.status).toBe(200); expect(await response.json()).toEqual({ leads: [{ id: "lead" }], total: 1, page: 0 }); expect(query.range).toHaveBeenCalledWith(0, 49);
});
it("rejects stale edits rather than overwriting another tab's changes", async () => {
  state.token = "owner-token"; state.userId = "owner-uuid";
  const query = { update: vi.fn(), eq: vi.fn(), select: vi.fn(), maybeSingle: vi.fn(async () => ({ data: null, error: null })) };
  query.update.mockReturnValue(query); query.eq.mockReturnValue(query); query.select.mockReturnValue(query); from.mockReturnValue(query);
  const request = { url: "https://example.com/api/hq/leads", headers: { get: (key: string) => key === "origin" ? "https://example.com" : "application/json" }, json: async () => ({ id: "1c1fb925-7947-4ba8-bbac-ed54f72ecb09", updated_at: "2026-10-17T12:00:00Z", stage: "contacted", notes: "Owner note", follow_up_on: null }) } as unknown as Request;
  expect((await PATCH(request)).status).toBe(409); expect(query.eq).toHaveBeenCalledWith("updated_at", "2026-10-17T12:00:00Z");
});
