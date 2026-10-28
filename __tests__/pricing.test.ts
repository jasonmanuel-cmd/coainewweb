import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { pricingCatalogJsonLd } from "@/lib/schema";
import { ADDON_CATEGORIES, ADDON_COUNT, PACKAGES, describeInterest, getAddOn, isBuildInterest } from "@/lib/pricing";
import { OFFERS } from "@/lib/site";

describe("pricing catalog", () => {
  it("keeps the website price the base of every package", () => {
    expect(OFFERS.website.price).toBe("$1,997");
    expect(PACKAGES.map((p) => p.id)).toEqual(["1", "2", "3"]);
    expect(PACKAGES[0].total).toBe("$3,647");
    expect(PACKAGES[2].numeric.low).toBe(1997 + 5000);
    expect(PACKAGES[2].numeric.high).toBe(1997 + 7500);
  });

  it("has unique add-on ids and a matching count", () => {
    const ids = ADDON_CATEGORIES.flatMap((c) => c.items.map((i) => i.id));
    expect(new Set(ids).size).toBe(ids.length);
    expect(ADDON_COUNT).toBe(ids.length);
    expect(getAddOn("missed-call-sms")?.price).toBe("$450");
  });

  it("exposes the packages in the schema catalog", () => {
    const json = JSON.stringify(pricingCatalogJsonLd());
    for (const pkg of PACKAGES) expect(json).toContain(pkg.name);
  });

  it("accepts only known intake interests", () => {
    for (const v of ["website", "1", "2", "3"]) {
      expect(isBuildInterest(v)).toBe(true);
      expect(describeInterest(v)).toBeTruthy();
    }
    expect(isBuildInterest("4")).toBe(false);
  });

  it("publishes no retired offers or absolute promises in source", () => {
    const files = ["lib/pricing.ts", "public/llms.txt", "components/marketing/PackageCards.tsx"];
    for (const f of files) {
      const text = fs.readFileSync(path.join(process.cwd(), f), "utf8");
      expect(text).not.toMatch(/Revenue Continuity|TradeCall Revenue Infrastructure|\bElite\b/);
    }
  });
});
