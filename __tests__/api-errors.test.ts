import fs from "node:fs";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { PublicError } from "@/lib/public-error";

const captureException = vi.fn();
vi.mock("@sentry/nextjs", () => ({ captureException: (...args: unknown[]) => captureException(...args) }));
vi.mock("@/lib/utils/rate-limit", () => ({ takeRateLimitToken: async () => true }));
vi.mock("@/lib/turnstile/verify", () => ({ verifyTurnstileToken: async () => true }));

const runAudit = vi.fn();
vi.mock("@/lib/audit/run-audit", () => ({ runAudit: (...args: unknown[]) => runAudit(...args) }));
vi.mock("@/lib/forms", async () => ({
  ...(await vi.importActual<object>("@/lib/forms")),
  notifyLead: vi.fn(async () => undefined)
}));

const dbResult = { error: { message: 'relation "leads" does not exist' } };
vi.mock("@/lib/supabase/client", () => ({
  getSupabaseAdmin: () => ({ from: () => ({ insert: async () => dbResult }) })
}));

function jsonRequest(url: string, body: unknown, raw = false) {
  return new Request(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: raw ? String(body) : JSON.stringify(body)
  });
}

const contactBody = { first_name: "Jane", business_name: "Acme", email: "jane@example.com", business_website: "https://acme.com" };
const registerBody = { url: "https://acme.com", phone: "6615551234", email: "jane@example.com" };

async function readJson(response: Response) {
  return (await response.json()) as { error: string; fields?: Record<string, string> };
}

describe("API error responses never leak internals", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => undefined);
    captureException.mockClear();
    runAudit.mockReset();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("turns a validation failure into a readable sentence with per-field hints", async () => {
    const { POST } = await import("@/app/api/contact/route");
    const response = await POST(jsonRequest("http://localhost/api/contact", { ...contactBody, email: "not-an-email" }));
    const body = await readJson(response);

    expect(response.status).toBe(400);
    expect(body.error).toBe("Please check your email and try again.");
    expect(body.fields?.email).toBe("Enter a valid email address.");
    const text = JSON.stringify(body);
    for (const internal of ["invalid_format", "pattern", "origin", "received undefined", "[\\n"]) {
      expect(text).not.toContain(internal);
    }
  });

  it("lists every missing field in plain words", async () => {
    const { POST } = await import("@/app/api/contact/route");
    const response = await POST(jsonRequest("http://localhost/api/contact", {}));
    const body = await readJson(response);

    expect(response.status).toBe(400);
    expect(body.error).toMatch(/^Please check these fields and try again: .*first name.*email/);
    expect(body.fields?.first_name).toBe("This field is required.");
    expect(JSON.stringify(body)).not.toContain("invalid_type");
  });

  it("hides a network failure behind the route's fallback message and reports it server-side", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("getaddrinfo ENOTFOUND forms.internal.example")));
    const { POST } = await import("@/app/api/contact/route");
    const response = await POST(jsonRequest("http://localhost/api/contact", contactBody));
    const body = await readJson(response);

    expect(response.status).toBe(502);
    expect(body.error).toBe("We couldn't confirm delivery. Please try again or contact us directly.");
    expect(JSON.stringify(body)).not.toMatch(/ENOTFOUND|internal\.example/);
    expect(console.error).toHaveBeenCalledTimes(1);
    expect(captureException).toHaveBeenCalledTimes(1);
  });

  it("never returns database error text from the register route", async () => {
    runAudit.mockResolvedValue({ performanceScore: 90, schemaScore: 80, issueCount: 1, recommendations: [], raw: {} });
    const { POST } = await import("@/app/api/register/route");
    const response = await POST(jsonRequest("http://localhost/api/register", registerBody));
    const body = await readJson(response);

    expect(response.status).toBe(500);
    expect(body.error).toBe("We couldn't complete your registration right now. Please try again.");
    expect(JSON.stringify(body)).not.toMatch(/relation|leads|does not exist/);
  });

  it("keeps deliberately public messages, such as a blocked host", async () => {
    runAudit.mockRejectedValue(new PublicError("Host not allowed"));
    const { POST } = await import("@/app/api/audit/route");
    const response = await POST(jsonRequest("http://localhost/api/audit", { url: "http://localhost" }));

    expect(response.status).toBe(400);
    expect((await readJson(response)).error).toBe("Host not allowed");
    expect(captureException).not.toHaveBeenCalled();
  });

  it("treats a malformed JSON body as a plain 400", async () => {
    const { POST } = await import("@/app/api/intake/route");
    const response = await POST(jsonRequest("http://localhost/api/intake", "{not json", true));
    const body = await readJson(response);

    expect(response.status).toBe(400);
    expect(body.error).toBe("That request couldn't be read. Please try again.");
  });

  it("no API route echoes error.message back to the client", () => {
    const root = path.join(process.cwd(), "app", "api");
    const offenders: string[] = [];
    const walk = (dir: string) => {
      for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) walk(full);
        else if (/\.tsx?$/.test(entry.name) && /(?:error|err|e)\s+instanceof\s+Error\s*\?\s*(?:error|err|e)\.message/.test(fs.readFileSync(full, "utf8"))) {
          offenders.push(path.relative(process.cwd(), full));
        }
      }
    };
    walk(root);
    expect(offenders).toEqual([]);
  });
});
