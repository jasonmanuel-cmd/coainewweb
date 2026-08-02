import { describe, expect, test } from "vitest";
import { revenueAtRisk } from "@/lib/revenue-at-risk";

/**
 * The homepage calculator publishes a dollar figure to prospects, so the
 * assumptions behind it need to stay pinned. If these numbers change, the
 * disclaimer rendered next to the calculator must change with them.
 */
describe("revenueAtRisk", () => {
  test("returns a low/base/high band matching the stated assumptions", () => {
    // 6 missed calls/week x 4 weeks x 40% unanswered x 25% would-have-booked x $450
    const { low, base, high } = revenueAtRisk(6, 450);
    expect(base).toBe(1080);
    expect(low).toBe(648);
    expect(high).toBe(1512);
  });

  test("orders the band low < base < high", () => {
    const { low, base, high } = revenueAtRisk(12, 800);
    expect(low).toBeLessThan(base);
    expect(base).toBeLessThan(high);
  });

  test("never returns a negative figure for junk input", () => {
    expect(revenueAtRisk(-5, 450).base).toBe(0);
    expect(revenueAtRisk(6, -450).base).toBe(0);
    expect(revenueAtRisk(0, 0)).toEqual({ low: 0, base: 0, high: 0 });
  });

  test("does not assume every missed call converts", () => {
    // The old version was calls x value x 4, which implied 100% conversion.
    const naive = 6 * 450 * 4;
    expect(revenueAtRisk(6, 450).base).toBeLessThan(naive);
  });
});
