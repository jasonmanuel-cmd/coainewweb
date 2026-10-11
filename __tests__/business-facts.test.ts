import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { PORTFOLIO_CASES } from "@/lib/portfolio-cases";
import { PORTFOLIO_STATS, countWord } from "@/lib/portfolio-stats";
import { organizationJsonLd } from "@/lib/schema";
import { BUSINESS_HOURS, CONTACT, DELIVERY_TIMELINE, OFFERS } from "@/lib/site";

const ROOT = process.cwd();
const read = (...parts: string[]) => fs.readFileSync(path.join(ROOT, ...parts), "utf8");

function sourceFiles(dir: string): string[] {
  return fs.readdirSync(path.join(ROOT, dir), { withFileTypes: true }).flatMap((entry) => {
    const rel = path.join(dir, entry.name);
    if (entry.isDirectory()) return sourceFiles(rel);
    return /\.(ts|tsx)$/.test(entry.name) ? [rel] : [];
  });
}

describe("one source of truth for business facts", () => {
  const llms = read("public", "llms.txt");

  it("llms.txt matches the typed contact, price and timeline facts", () => {
    expect(llms).toContain(CONTACT.email);
    expect(llms).toContain(OFFERS.tradecall.price);
    expect(llms).toContain(OFFERS.continuity.price);
    expect(llms).toContain("Monday–Friday");
    expect(llms).not.toMatch(/@coaibakersfield\.com/i);
  });

  it("schema opening hours come from BUSINESS_HOURS", () => {
    const json = JSON.stringify(organizationJsonLd());
    expect(json).toContain(BUSINESS_HOURS.weekday.opens);
    expect(json).toContain(BUSINESS_HOURS.weekday.closes);
    expect(json).toContain(CONTACT.phoneE164);
  });

  it("publishes no 24-hour availability claim", () => {
    const files = [...sourceFiles("app"), ...sourceFiles("components"), ...sourceFiles("lib")];
    const offenders = files.filter((file) => /open 24 hours|24\/7|24 hours a day/i.test(read(file)));
    expect(offenders).toEqual([]);
  });

  it("does not hard-code portfolio counts outside the derived stats", () => {
    const files = [...sourceFiles("app"), ...sourceFiles("components")];
    const offenders = files.filter((file) =>
      /\b(?:seven|six|7|6)\s+(?:live\s+)?(?:projects|client sites|public project links|industries)\b/i.test(read(file))
    );
    expect(offenders).toEqual([]);
  });

  it("derives portfolio stats from the case list", () => {
    expect(PORTFOLIO_STATS.projectCount).toBe(PORTFOLIO_CASES.length);
    expect(PORTFOLIO_STATS.industryCount).toBe(new Set(PORTFOLIO_CASES.map((item) => item.category)).size);
    expect(PORTFOLIO_STATS.temporaryHostCount).toBeLessThanOrEqual(PORTFOLIO_STATS.projectCount);
    expect(countWord(7)).toBe("seven");
    expect(countWord(12)).toBe("12");
  });

  it("keeps the delivery range in one place", () => {
    expect(DELIVERY_TIMELINE).toBe("2–3 weeks");
    const offenders = [...sourceFiles("app"), ...sourceFiles("components")].filter((file) =>
      /2[–-]4 weeks|two to four weeks/i.test(read(file))
    );
    expect(offenders).toEqual([]);
  });
});
