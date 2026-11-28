import { describe, expect, it } from "vitest";
import { calculateOpportunity } from "@/lib/opportunity-calculator";

describe("illustrative opportunity calculator", () => {
  it("applies recovery, closing, margin, and monthly fee in order", () => {
    expect(calculateOpportunity({ missedCalls: 20, recoverablePercent: 30, closingPercent: 25, averageValue: 500, contributionMarginPercent: 40, monthlyServiceFee: 297 })).toEqual({
      recoveredContacts: 6,
      estimatedCustomers: 1.5,
      grossRevenue: 750,
      contributionBeforeFee: 300,
      contributionAfterFee: 3
    });
  });

  it("clamps invalid inputs and retains a negative after-fee estimate", () => {
    const result = calculateOpportunity({ missedCalls: -5, recoverablePercent: 200, closingPercent: Number.NaN, averageValue: 100, contributionMarginPercent: 100, monthlyServiceFee: 297 });
    expect(result).toEqual({ recoveredContacts: 0, estimatedCustomers: 0, grossRevenue: 0, contributionBeforeFee: 0, contributionAfterFee: -297 });
  });
});
