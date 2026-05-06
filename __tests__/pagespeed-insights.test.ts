import { describe, it, expect } from "vitest";
import {
  buildPsiQuery,
  categoryScoreToPercent,
  normalizePsiStrategy,
  PSI_CATEGORIES
} from "@/lib/pagespeed-insights";

describe("normalizePsiStrategy", () => {
  it("returns 'desktop' when input is 'desktop'", () => {
    expect(normalizePsiStrategy("desktop")).toBe("desktop");
  });

  it("returns 'mobile' for any other string", () => {
    expect(normalizePsiStrategy("mobile")).toBe("mobile");
    expect(normalizePsiStrategy("DESKTOP")).toBe("mobile");
    expect(normalizePsiStrategy("other")).toBe("mobile");
    expect(normalizePsiStrategy("")).toBe("mobile");
  });

  it("returns 'mobile' for null", () => {
    expect(normalizePsiStrategy(null)).toBe("mobile");
  });

  it("returns 'mobile' for undefined", () => {
    expect(normalizePsiStrategy(undefined)).toBe("mobile");
  });
});

describe("buildPsiQuery", () => {
  it("includes required params: url, strategy, locale", () => {
    const q = buildPsiQuery({ url: "https://example.com", strategy: "mobile" });
    expect(q.get("url")).toBe("https://example.com");
    expect(q.get("strategy")).toBe("mobile");
    expect(q.get("locale")).toBe("en-US");
  });

  it("appends all four categories", () => {
    const q = buildPsiQuery({ url: "https://example.com", strategy: "desktop" });
    const categories = q.getAll("category");
    for (const cat of PSI_CATEGORIES) {
      expect(categories).toContain(cat);
    }
    expect(categories).toHaveLength(PSI_CATEGORIES.length);
  });

  it("omits the key param when apiKey is not provided", () => {
    const q = buildPsiQuery({ url: "https://example.com", strategy: "mobile" });
    expect(q.has("key")).toBe(false);
  });

  it("includes the key param when apiKey is provided", () => {
    const q = buildPsiQuery({ url: "https://example.com", strategy: "mobile", apiKey: "MY_KEY" });
    expect(q.get("key")).toBe("MY_KEY");
  });

  it("omits the key param when apiKey is undefined", () => {
    const q = buildPsiQuery({ url: "https://example.com", strategy: "mobile", apiKey: undefined });
    expect(q.has("key")).toBe(false);
  });
});

describe("categoryScoreToPercent", () => {
  it("converts 0 to 0", () => {
    expect(categoryScoreToPercent(0)).toBe(0);
  });

  it("converts 1 to 100", () => {
    expect(categoryScoreToPercent(1)).toBe(100);
  });

  it("converts 0.5 to 50", () => {
    expect(categoryScoreToPercent(0.5)).toBe(50);
  });

  it("rounds fractional values", () => {
    expect(categoryScoreToPercent(0.456)).toBe(46);
    expect(categoryScoreToPercent(0.995)).toBe(100);
  });

  it("returns null for null", () => {
    expect(categoryScoreToPercent(null)).toBeNull();
  });

  it("returns null for undefined", () => {
    expect(categoryScoreToPercent(undefined)).toBeNull();
  });

  it("returns null for NaN-producing values", () => {
    expect(categoryScoreToPercent("not-a-number")).toBeNull();
  });

  it("handles numeric strings", () => {
    expect(categoryScoreToPercent("0.75")).toBe(75);
  });
});
