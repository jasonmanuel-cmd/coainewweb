import { describe, it, expect, vi, afterEach } from "vitest";
import { pageMetadata } from "@/lib/metadata";
import { SITE_URL, ORG_NAME } from "@/lib/site";

afterEach(() => vi.unstubAllEnvs());

describe("pageMetadata", () => {
  it("sets title and description", () => {
    const meta = pageMetadata({
      title: "Test Page",
      description: "A description",
      path: "/test"
    });
    expect(meta.title).toBe("Test Page");
    expect(meta.description).toBe("A description");
  });

  it("builds a canonical URL for a non-root path", () => {
    const meta = pageMetadata({ title: "Services", description: "desc", path: "/services" });
    expect(meta.alternates?.canonical).toBe(`${SITE_URL}/services`);
  });

  it("uses SITE_URL directly for the root path '/'", () => {
    const meta = pageMetadata({ title: "Home", description: "desc", path: "/" });
    expect(meta.alternates?.canonical).toBe(SITE_URL);
  });

  it("populates openGraph fields", () => {
    const meta = pageMetadata({ title: "OG Test", description: "og desc", path: "/og" });
    const og = meta.openGraph as Record<string, unknown>;
    expect(og.title).toBe("OG Test");
    expect(og.description).toBe("og desc");
    expect(og.siteName).toBe(ORG_NAME);
    expect(og.url).toBe(`${SITE_URL}/og`);
  });

  it("populates twitter card fields", () => {
    const meta = pageMetadata({ title: "TW Test", description: "tw desc", path: "/tw" });
    const tw = meta.twitter as Record<string, unknown>;
    expect(tw.card).toBe("summary_large_image");
    expect(tw.title).toBe("TW Test");
    expect(tw.description).toBe("tw desc");
  });
});

describe("SITE_URL", () => {
  it("is a valid URL string", () => {
    expect(() => new URL(SITE_URL)).not.toThrow();
  });

  it("does not end with a trailing slash", () => {
    expect(SITE_URL).not.toMatch(/\/$/);
  });
});
