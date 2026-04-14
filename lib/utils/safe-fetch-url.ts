/**
 * Blocks obvious SSRF targets for server-side HTTP fetches (metadata, loopback, RFC1918).
 * Does not mitigate DNS rebinding; pair with short timeouts and edge rate limits.
 */
function ipv4Parts(host: string): [number, number, number, number] | null {
  const m = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/.exec(host);
  if (!m) return null;
  const a = Number(m[1]);
  const b = Number(m[2]);
  const c = Number(m[3]);
  const d = Number(m[4]);
  if ([a, b, c, d].some((n) => n > 255)) return null;
  return [a, b, c, d];
}

function isUnsafeIpv4(host: string): boolean {
  const p = ipv4Parts(host);
  if (!p) return false;
  const [a, b] = p;
  if (a === 0 || a === 127 || a === 10) return true;
  if (a === 172 && b >= 16 && b <= 31) return true;
  if (a === 192 && b === 168) return true;
  if (a === 169 && b === 254) return true;
  if (a === 100 && b >= 64 && b <= 127) return true; // CGNAT
  if (a === 255) return true;
  return false;
}

function isUnsafeIpv6(host: string): boolean {
  const h = host.toLowerCase();
  if (h === "::1") return true;
  if (h.startsWith("fc") || h.startsWith("fd")) return true; // unique local
  if (h.startsWith("fe80:")) return true;
  return false;
}

export function assertUrlSafeForServerFetch(urlString: string): void {
  let u: URL;
  try {
    u = new URL(urlString);
  } catch {
    throw new Error("Invalid URL");
  }
  if (u.protocol !== "http:" && u.protocol !== "https:") {
    throw new Error("URL protocol not allowed");
  }
  const host = u.hostname;
  if (!host) throw new Error("Missing host");

  if (host === "localhost" || host.endsWith(".localhost")) {
    throw new Error("Host not allowed");
  }
  if (isUnsafeIpv4(host) || isUnsafeIpv6(host)) {
    throw new Error("Host not allowed");
  }
}
