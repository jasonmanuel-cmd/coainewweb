import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { BUSINESS_HOURS_LABEL, CONTACT, DELIVERY_TIMELINE, FOUNDER, OFFERS, SITE_URL } from "@/lib/site";
import { SYSTEM_CAPABILITY_COUNT, SYSTEM_CHAPTERS, SYSTEM_CHAPTER_COUNT } from "@/lib/systems";

const ROOT = path.resolve(process.cwd());
const SOURCE_ROOTS = ["app", "components", "lib"];
const TEXT_EXTENSIONS = new Set([".ts", ".tsx", ".css", ".txt", ".svg"]);

function sourceFiles(): string[] {
  const files: string[] = [];
  const walk = (entry: string) => {
    for (const item of fs.readdirSync(entry, { withFileTypes: true })) {
      const full = path.join(entry, item.name);
      if (item.isDirectory()) walk(full);
      else if (TEXT_EXTENSIONS.has(path.extname(full))) files.push(full);
    }
  };
  SOURCE_ROOTS.forEach((root) => walk(path.join(ROOT, root)));
  files.push(path.join(ROOT, "public", "llms.txt"));
  return files;
}

function combinedSource(): string {
  return sourceFiles().map((file) => fs.readFileSync(file, "utf8")).join("\n");
}

describe("public site integrity", () => {
  it("uses the primary brand domain by default", () => {
    expect(SITE_URL).toBe("https://www.chaoticallyorganizedai.com");
    expect(fs.readFileSync(path.join(ROOT, "public", "llms.txt"), "utf8")).toContain(SITE_URL);
  });

  it("does not publish the retired canonical domain", () => {
    expect(combinedSource()).not.toMatch(/https?:\/\/(?:www\.)?coaibakersfield\.com/i);
  });

  it("contains no common mojibake sequences", () => {
    expect(combinedSource()).not.toMatch(/Â|â˜|â-|Ã|ðŸ|�|å|å¹|å‰/);
  });

  it("keeps canonical contact and hours facts coherent", () => {
    expect(CONTACT.phoneE164).toBe("+16616830228");
    expect(CONTACT.email).toBe("chaoticallyorganizedai@gmail.com");
    expect(BUSINESS_HOURS_LABEL).toBe("Monday–Friday, 9:00 AM–5:00 PM Pacific");
  });

  it("keeps offer and timeline facts in one typed source", () => {
    expect(OFFERS.tradecall.price).toBe("$1,997");
    expect(OFFERS.continuity.price).toBe("$197");
    expect(DELIVERY_TIMELINE).toBe("2–3 weeks");
  });

  it("keeps the public systems catalog complete and distinct from package scope", () => {
    const capabilityNames = SYSTEM_CHAPTERS.flatMap((chapter) =>
      chapter.capabilities.map((capability) => capability.name)
    );
    expect(FOUNDER.role).toBe("Founder & CEO");
    expect(SYSTEM_CHAPTER_COUNT).toBe(6);
    expect(SYSTEM_CAPABILITY_COUNT).toBe(24);
    expect(new Set(capabilityNames).size).toBe(capabilityNames.length);
    expect(fs.readFileSync(path.join(ROOT, "app", "systems", "page.tsx"), "utf8")).toContain(
      "A catalog is not a promise that every module is included."
    );
  });
});
