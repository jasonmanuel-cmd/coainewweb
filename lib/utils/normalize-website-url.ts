/**
 * Turns user input (example.com, www.example.com, path URLs) into an absolute URL
 * for PageSpeed / HTTP fetches. Does not require a protocol in the input.
 */
export function normalizeWebsiteUrl(input: string): string {
  const raw = input.trim();
  if (!raw) {
    throw new Error("URL is empty");
  }

  try {
    if (/^https?:\/\//i.test(raw)) {
      return new URL(raw).toString();
    }
    if (raw.startsWith("//")) {
      return new URL(`https:${raw}`).toString();
    }
    return new URL(`https://${raw}`).toString();
  } catch {
    throw new Error("Invalid URL");
  }
}
