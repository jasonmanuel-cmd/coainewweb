import { afterEach, describe, expect, it, vi } from "vitest";

async function loadSite() {
  vi.resetModules();
  return import("@/lib/site");
}

afterEach(() => {
  vi.unstubAllEnvs();
});

describe("canonical domain", () => {
  it("is the www brand origin", async () => {
    const { CANONICAL_ORIGIN, SITE_URL } = await loadSite();
    expect(CANONICAL_ORIGIN).toBe("https://www.chaoticallyorganizedai.com");
    expect(SITE_URL).toBe(CANONICAL_ORIGIN);
  });

  it.each([
    "https://www.coaibakersfield.com",
    "https://coaibakersfield.com/",
    "https://chaoticallyorganizedai.com",
    "https://my-preview-abc123.vercel.app",
    "not-a-url"
  ])("ignores a stale or foreign NEXT_PUBLIC_SITE_URL (%s)", async (value) => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", value);
    const { CANONICAL_ORIGIN, SITE_URL } = await loadSite();
    expect(SITE_URL).toBe(CANONICAL_ORIGIN);
  });

  it("still honors localhost for local development", async () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "http://localhost:3000");
    const { SITE_URL } = await loadSite();
    expect(SITE_URL).toBe("http://localhost:3000");
  });

  it("never lists the canonical host as an alias (would redirect-loop)", async () => {
    const { ALIAS_HOSTS, CANONICAL_ORIGIN } = await loadSite();
    expect(ALIAS_HOSTS).not.toContain(new URL(CANONICAL_ORIGIN).hostname);
    expect([...ALIAS_HOSTS]).toEqual(
      expect.arrayContaining(["chaoticallyorganizedai.com", "coaibakersfield.com", "www.coaibakersfield.com"])
    );
  });
});
