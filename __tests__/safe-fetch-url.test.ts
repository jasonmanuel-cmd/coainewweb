import { describe, it, expect } from "vitest";
import { assertUrlSafeForServerFetch } from "@/lib/utils/safe-fetch-url";

describe("assertUrlSafeForServerFetch", () => {
  // --- Valid / allowed URLs ---
  it("allows a public https URL", () => {
    expect(() => assertUrlSafeForServerFetch("https://example.com")).not.toThrow();
  });

  it("allows a public http URL", () => {
    expect(() => assertUrlSafeForServerFetch("http://example.com")).not.toThrow();
  });

  it("allows a public IP address", () => {
    expect(() => assertUrlSafeForServerFetch("https://8.8.8.8")).not.toThrow();
  });

  // --- Invalid / malformed URL ---
  it("throws for a non-URL string", () => {
    expect(() => assertUrlSafeForServerFetch("not-a-url")).toThrow("Invalid URL");
  });

  // --- Disallowed protocols ---
  it("throws for ftp:// protocol", () => {
    expect(() => assertUrlSafeForServerFetch("ftp://example.com")).toThrow(
      "URL protocol not allowed"
    );
  });

  it("throws for file:// protocol", () => {
    expect(() => assertUrlSafeForServerFetch("file:///etc/passwd")).toThrow(
      "URL protocol not allowed"
    );
  });

  // --- localhost ---
  it("throws for localhost", () => {
    expect(() => assertUrlSafeForServerFetch("http://localhost")).toThrow("Host not allowed");
  });

  it("throws for a .localhost subdomain", () => {
    expect(() => assertUrlSafeForServerFetch("http://app.localhost")).toThrow("Host not allowed");
  });

  // --- Loopback (127.x.x.x) ---
  it("throws for 127.0.0.1", () => {
    expect(() => assertUrlSafeForServerFetch("http://127.0.0.1")).toThrow("Host not allowed");
  });

  it("throws for 127.255.255.255", () => {
    expect(() => assertUrlSafeForServerFetch("http://127.255.255.255")).toThrow("Host not allowed");
  });

  // --- RFC 1918 private ranges ---
  it("throws for 10.0.0.1 (class A private)", () => {
    expect(() => assertUrlSafeForServerFetch("http://10.0.0.1")).toThrow("Host not allowed");
  });

  it("throws for 172.16.0.1 (class B private, lower bound)", () => {
    expect(() => assertUrlSafeForServerFetch("http://172.16.0.1")).toThrow("Host not allowed");
  });

  it("throws for 172.31.0.1 (class B private, upper bound)", () => {
    expect(() => assertUrlSafeForServerFetch("http://172.31.0.1")).toThrow("Host not allowed");
  });

  it("allows 172.15.0.1 (just below class B private range)", () => {
    expect(() => assertUrlSafeForServerFetch("http://172.15.0.1")).not.toThrow();
  });

  it("allows 172.32.0.1 (just above class B private range)", () => {
    expect(() => assertUrlSafeForServerFetch("http://172.32.0.1")).not.toThrow();
  });

  it("throws for 192.168.1.1 (class C private)", () => {
    expect(() => assertUrlSafeForServerFetch("http://192.168.1.1")).toThrow("Host not allowed");
  });

  // --- Link-local ---
  it("throws for 169.254.0.1 (link-local / AWS metadata)", () => {
    expect(() => assertUrlSafeForServerFetch("http://169.254.0.1")).toThrow("Host not allowed");
  });

  // --- CGNAT ---
  it("throws for 100.64.0.1 (CGNAT lower bound)", () => {
    expect(() => assertUrlSafeForServerFetch("http://100.64.0.1")).toThrow("Host not allowed");
  });

  it("throws for 100.127.255.255 (CGNAT upper bound)", () => {
    expect(() => assertUrlSafeForServerFetch("http://100.127.255.255")).toThrow("Host not allowed");
  });

  it("allows 100.63.255.255 (just below CGNAT range)", () => {
    expect(() => assertUrlSafeForServerFetch("http://100.63.255.255")).not.toThrow();
  });

  it("allows 100.128.0.1 (just above CGNAT range)", () => {
    expect(() => assertUrlSafeForServerFetch("http://100.128.0.1")).not.toThrow();
  });

  // --- 0.x.x.x ---
  it("throws for 0.0.0.0", () => {
    expect(() => assertUrlSafeForServerFetch("http://0.0.0.0")).toThrow("Host not allowed");
  });

  // --- Broadcast ---
  it("throws for 255.255.255.255 (broadcast)", () => {
    expect(() => assertUrlSafeForServerFetch("http://255.255.255.255")).toThrow("Host not allowed");
  });

  // --- IPv6 ---
  it("throws for IPv6 loopback ::1", () => {
    expect(() => assertUrlSafeForServerFetch("http://[::1]")).toThrow("Host not allowed");
  });

  it("throws for IPv6 unique-local fc00::", () => {
    expect(() => assertUrlSafeForServerFetch("http://[fc00::1]")).toThrow("Host not allowed");
  });

  it("throws for IPv6 unique-local fd00::", () => {
    expect(() => assertUrlSafeForServerFetch("http://[fd00::1]")).toThrow("Host not allowed");
  });

  it("throws for IPv6 link-local fe80::", () => {
    expect(() => assertUrlSafeForServerFetch("http://[fe80::1]")).toThrow("Host not allowed");
  });

  it("allows a public IPv6 address", () => {
    expect(() =>
      assertUrlSafeForServerFetch("http://[2001:db8::1]")
    ).not.toThrow();
  });
});
