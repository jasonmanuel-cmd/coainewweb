import { afterEach, beforeEach, expect, it, vi } from "vitest";
const query = vi.hoisted(() => vi.fn());
vi.mock("@neondatabase/serverless", () => ({ neon: () => query }));
import { claimDelivery, finishDelivery } from "@/lib/crm/delivery-store";
beforeEach(() => { query.mockReset(); vi.stubEnv("DATABASE_URL", "postgres://synthetic.invalid"); });
afterEach(() => vi.unstubAllEnvs());
it("grants ownership only after insert returns a claim", async () => {
  query.mockResolvedValue([{ id: "r", fingerprint: "hash", state: "pending" }]);
  expect(await claimDelivery("key", "hash")).toMatchObject({ owned: true, state: "pending" });
  expect(query.mock.calls[0][0].join("?")).toContain("on conflict(lead_id) do nothing");
});
it("reads a conflicting receipt in a fresh query without ownership", async () => {
  query.mockResolvedValueOnce([]).mockResolvedValueOnce([]).mockResolvedValueOnce([{ id: "r", fingerprint: "hash", state: "accepted" }]);
  expect(await claimDelivery("key", "hash")).toMatchObject({ owned: false, state: "accepted" });
  expect(query).toHaveBeenCalledTimes(3);
});
it("claims an operator-armed retry atomically with a fixed two-attempt ceiling", async () => {
  query.mockResolvedValueOnce([]).mockResolvedValueOnce([{ id: "r", fingerprint: "hash", state: "pending" }]);
  expect(await claimDelivery("key", "hash")).toMatchObject({ owned: true });
  const sql = query.mock.calls[1][0].join("?");
  expect(sql).toContain("r.state='ready'"); expect(sql).toContain("r.attempts=1");
  expect(sql).toContain("r.reconciliation_ref is not null");
});
it("fails when no captured lead can be identified", async () => {
  query.mockResolvedValue([]); await expect(claimDelivery("key", "hash")).rejects.toThrow();
});
it("requires a confirmed pending-state update", async () => {
  query.mockResolvedValue([]); await expect(finishDelivery("id", "accepted", 1)).rejects.toThrow();
  expect(query.mock.calls[0][0].join("?")).toContain("and attempts=?");
  expect(query.mock.calls[0]).toContain(1);
});
