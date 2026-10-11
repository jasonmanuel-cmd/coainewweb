import { PORTFOLIO_CASES } from "./portfolio-cases";

/** Hosts that mean "temporary subdomain, not the client's own domain yet". */
const TEMPORARY_HOST_SUFFIXES = [".vercel.app", ".netlify.app"];

const NUMBER_WORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];

function isTemporaryHost(url: string): boolean {
  try {
    const { hostname } = new URL(url);
    return TEMPORARY_HOST_SUFFIXES.some((suffix) => hostname.endsWith(suffix));
  } catch {
    return false;
  }
}

/**
 * Every portfolio count on the site (homepage, portfolio, about) derives from
 * PORTFOLIO_CASES, so a number can never disagree with the case list.
 */
export const PORTFOLIO_STATS = {
  projectCount: PORTFOLIO_CASES.length,
  industryCount: new Set(PORTFOLIO_CASES.map((item) => item.category)).size,
  temporaryHostCount: PORTFOLIO_CASES.filter((item) => isTemporaryHost(item.liveUrl)).length
} as const;

/** "seven" for 7; falls back to the digits above ten. */
export function countWord(value: number): string {
  return NUMBER_WORDS[value] ?? String(value);
}
