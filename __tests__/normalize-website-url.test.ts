import { describe, it, expect } from "vitest";
import { normalizeWebsiteUrl } from "@/lib/utils/normalize-website-url";

describe("normalizeWebsiteUrl", () => {
  it("throws for empty string", () => {
    expect(() => normalizeWebsiteUrl("")).toThrow("URL is empty");
  });

  it("throws for whitespace-only string", () => {
    expect(() => normalizeWebsiteUrl("   ")).toThrow("URL is empty");
  });

  it("throws for a completely invalid URL", () => {
    expect(() => normalizeWebsiteUrl("not a url at all $$$")).toThrow("Invalid URL");
  });

  it("passes through an https URL unchanged", () => {
    expect(normalizeWebsiteUrl("https://example.com")).toBe("https://example.com/");
  });

  it("passes through an http URL unchanged", () => {
    expect(normalizeWebsiteUrl("http://example.com")).toBe("http://example.com/");
  });

  it("prepends https:// when protocol is missing", () => {
    expect(normalizeWebsiteUrl("example.com")).toBe("https://example.com/");
  });

  it("prepends https:// for www. URLs without protocol", () => {
    expect(normalizeWebsiteUrl("www.example.com")).toBe("https://www.example.com/");
  });

  it("handles protocol-relative URLs (//example.com)", () => {
    expect(normalizeWebsiteUrl("//example.com")).toBe("https://example.com/");
  });

  it("preserves path and query string", () => {
    expect(normalizeWebsiteUrl("https://example.com/path?q=1")).toBe(
      "https://example.com/path?q=1"
    );
  });

  it("trims leading/trailing whitespace before processing", () => {
    expect(normalizeWebsiteUrl("  example.com  ")).toBe("https://example.com/");
  });

  it("handles HTTPS URL with uppercase scheme", () => {
    expect(normalizeWebsiteUrl("HTTPS://example.com")).toBe("https://example.com/");
  });

  it("handles subdomain URLs", () => {
    expect(normalizeWebsiteUrl("sub.example.com")).toBe("https://sub.example.com/");
  });
});
