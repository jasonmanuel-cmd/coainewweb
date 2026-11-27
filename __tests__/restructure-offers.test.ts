import { describe, expect, it } from "vitest";
import { RESTRUCTURE_OFFERS } from "@/lib/restructure-offers";

describe("approved public offers", () => {
  it("publishes the three approved prices and payment terms", () => {
    expect(RESTRUCTURE_OFFERS.map((offer) => offer.name)).toEqual([
      "Revenue Diagnostic", "Revenue Engine", "Revenue Infrastructure"
    ]);
    expect(RESTRUCTURE_OFFERS.map((offer) => [offer.price, offer.ongoing])).toEqual([
      ["$500", "One-time engagement"],
      ["$1,997", "+ $297/month"],
      ["$4,997+", "+ $597–$997/month"]
    ]);
    expect(RESTRUCTURE_OFFERS[0].payment).toContain("$200 upfront");
  });
});
