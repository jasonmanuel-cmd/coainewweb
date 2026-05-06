import { describe, it, expect } from "vitest";
import { breadcrumbSchema } from "@/lib/seo/schemas";

describe("breadcrumbSchema", () => {
  it("returns the correct @context and @type", () => {
    const result = breadcrumbSchema([]);
    expect(result["@context"]).toBe("https://schema.org");
    expect(result["@type"]).toBe("BreadcrumbList");
  });

  it("returns an empty itemListElement for empty input", () => {
    const result = breadcrumbSchema([]);
    expect(result.itemListElement).toEqual([]);
  });

  it("maps a single item with position 1", () => {
    const result = breadcrumbSchema([{ name: "Home", item: "https://example.com/" }]);
    expect(result.itemListElement).toHaveLength(1);
    expect(result.itemListElement[0]).toEqual({
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://example.com/"
    });
  });

  it("maps multiple items with sequential positions", () => {
    const items = [
      { name: "Home", item: "https://example.com/" },
      { name: "Services", item: "https://example.com/services" },
      { name: "Audit", item: "https://example.com/services/audit" }
    ];
    const result = breadcrumbSchema(items);
    expect(result.itemListElement).toHaveLength(3);
    result.itemListElement.forEach((entry, idx) => {
      expect(entry.position).toBe(idx + 1);
      expect(entry["@type"]).toBe("ListItem");
      expect(entry.name).toBe(items[idx].name);
      expect(entry.item).toBe(items[idx].item);
    });
  });
});
