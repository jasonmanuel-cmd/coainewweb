import { afterEach, expect, it, vi } from "vitest";
import { followUpLabel, inFollowUpQueue } from "@/lib/crm/follow-up";
const rows = vi.hoisted(() => vi.fn());
vi.mock("@/lib/crm/auth", () => ({ requireHqOwner: vi.fn(async () => {}) }));
vi.mock("@/lib/crm/redis-store", () => ({ usesRedisCrm: () => true, listRedisLeads: rows, updateRedisLead: vi.fn() }));
import { GET } from "@/app/api/hq/leads/route";
afterEach(() => { vi.useRealTimers(); vi.unstubAllEnvs(); });
it("distinguishes overdue, today, future, missing dates and closed opportunities", () => {
  const today = "2026-11-01";
  expect(inFollowUpQueue({ stage: "new", follow_up_on: today }, "due", today)).toBe(true);
  expect(inFollowUpQueue({ stage: "new", follow_up_on: today }, "overdue", today)).toBe(false);
  expect(inFollowUpQueue({ stage: "new", follow_up_on: "2026-10-31" }, "overdue", today)).toBe(true);
  expect(inFollowUpQueue({ stage: "new", follow_up_on: "2026-11-02" }, "upcoming", today)).toBe(true);
  expect(inFollowUpQueue({ stage: "new", follow_up_on: null }, "unscheduled", today)).toBe(true);
  for (const stage of ["won", "lost", "archived"] as const) {
    expect(inFollowUpQueue({ stage, follow_up_on: "2026-10-31" }, "due", today)).toBe(false);
    expect(inFollowUpQueue({ stage, follow_up_on: null }, "closed", today)).toBe(true);
  }
  expect(followUpLabel({ stage: "new", follow_up_on: today }, today)).toBe("Due today (UTC)");
});
it("finds old overdue inquiries beyond the first 50 records before pagination", async () => {
  vi.stubEnv("CRM_STORAGE", "redis"); vi.useFakeTimers(); vi.setSystemTime(new Date("2026-11-01T01:00:00Z"));
  rows.mockResolvedValue([...Array.from({ length: 55 }, (_, i) => ({ id: String(i), stage: "new", follow_up_on: null })), { id: "old-due", stage: "contacted", follow_up_on: "2026-10-01" }, { id: "closed", stage: "won", follow_up_on: "2026-10-01" }]);
  const response = await GET(new Request("https://example.com/api/hq/leads?queue=overdue"));
  expect(response.status).toBe(200);
  const body = await response.json(); expect(body.total).toBe(1); expect(body.leads[0].id).toBe("old-due");
});
it("rejects unknown queue values", async () => {
  expect((await GET(new Request("https://example.com/api/hq/leads?queue=invalid"))).status).toBe(400);
});
