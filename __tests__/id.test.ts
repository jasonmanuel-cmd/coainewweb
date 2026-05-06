import { describe, it, expect } from "vitest";
import { createId } from "@/lib/utils/id";

describe("createId", () => {
  it("returns a string", () => {
    expect(typeof createId()).toBe("string");
  });

  it("uses the default prefix 'rpt'", () => {
    expect(createId()).toMatch(/^rpt_/);
  });

  it("uses a custom prefix", () => {
    expect(createId("lead")).toMatch(/^lead_/);
  });

  it("includes a timestamp segment", () => {
    const before = Date.now();
    const id = createId();
    const after = Date.now();
    const ts = Number(id.split("_")[1]);
    expect(ts).toBeGreaterThanOrEqual(before);
    expect(ts).toBeLessThanOrEqual(after);
  });

  it("generates unique IDs across multiple calls", () => {
    const ids = new Set(Array.from({ length: 1000 }, () => createId()));
    expect(ids.size).toBe(1000);
  });

  it("has the expected format: prefix_timestamp_randomPart", () => {
    const id = createId("x");
    expect(id).toMatch(/^x_\d+_[a-z0-9]+$/);
  });
});
