import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { REVAMP_PROJECTS } from "@/components/revamp/revampData";
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

const customerSites = [
  { title: "Aspen II Homes", url: "https://aspen2homes.com/", image: "/projects/aspen-ii-homes.webp" },
  { title: "Harbison Standard", url: "https://www.harbisonstandard.com/", image: "/projects/harbison-standard.webp" },
  { title: "The Pitts", url: "https://www.thepitts805.com/", image: "/projects/the-pitts.webp" },
  { title: "T&M Hauling", url: "https://www.tandmbak.com/", image: "/projects/tm-hauling.webp" }
];

describe("customer portfolio updates", () => {
  it("includes all four supplied customer sites in the homepage and full portfolio data", () => {
    for (const site of customerSites) {
      const homepageProject = REVAMP_PROJECTS.find((project) => project.title === site.title);
      const portfolioCase = PORTFOLIO_CASES.find((item) => item.client === site.title);
      expect(homepageProject?.href).toBe(site.url);
      expect(portfolioCase?.liveUrl).toBe(site.url);
      expect(homepageProject?.previewImage).toBe(site.image);
      expect(portfolioCase?.previewImage).toBe(site.image);
      expect(fs.existsSync(path.join(ROOT, "public", site.image.slice(1)))).toBe(true);
    }
  });

  it("uses the supplied Lead Engine screenshot in the product feature", () => {
    const homepage = read("app", "page.tsx");
    expect(homepage).toContain('src="/projects/coai-lead-engine.webp"');
    expect(fs.existsSync(path.join(ROOT, "public/projects/coai-lead-engine.webp"))).toBe(true);
  });

  it("uses Phil’s supplied screenshot in the full portfolio", () => {
    expect(PORTFOLIO_CASES.find((item) => item.id === "phils")?.previewImage).toBe(
      "/projects/phils-cheesesteaks.webp"
    );
    expect(fs.existsSync(path.join(ROOT, "public/projects/phils-cheesesteaks.webp"))).toBe(true);
  });

  it("removes Signature 954 from the public site and portfolio source", () => {
    const files = [...sourceFiles("app"), ...sourceFiles("components"), ...sourceFiles("lib")];
    const source = files.map((file) => read(file)).join("\n");
    expect(source).not.toMatch(/signature\s*954|signature954/i);
  });

  it("promotes the COAI Lead Engine with live product links", () => {
    const homepage = read("app", "page.tsx");
    expect(homepage).toContain("COAI Lead Engine");
    expect(homepage).toContain('href="https://www.coaihq.online/"');
    expect(homepage).toContain('href="https://www.coaihq.online/app"');
  });

  it("links to the supplied Google review without creating review copy", () => {
    const portfolio = read("app", "portfolio/page.tsx");
    expect(portfolio).toContain("https://share.google/LlU3imoz7ANEnd1eM");
    expect(portfolio).toContain("Open the Google review at its source");
  });
});
