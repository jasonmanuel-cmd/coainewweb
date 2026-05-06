import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { getMessagingProvider } from "@/lib/messaging/sms-service";

const payload = { to: "+16611234567", body: "Hello!", leadId: "lead_001" };

describe("getMessagingProvider – ConsoleProvider (default)", () => {
  beforeEach(() => {
    vi.stubEnv("SMS_PROVIDER", "");
  });
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("returns a provider named 'console'", () => {
    expect(getMessagingProvider().name).toBe("console");
  });

  it("sendSms resolves with status 'queued'", async () => {
    const provider = getMessagingProvider();
    const result = await provider.sendSms(payload);
    expect(result.status).toBe("queued");
    expect(result.provider).toBe("console");
    expect(result.payload).toEqual(payload);
  });
});

describe("getMessagingProvider – TwilioProvider", () => {
  beforeEach(() => {
    vi.stubEnv("SMS_PROVIDER", "twilio");
  });
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("returns a provider named 'twilio'", () => {
    expect(getMessagingProvider().name).toBe("twilio");
  });

  it("throws when Twilio credentials are missing", async () => {
    vi.stubEnv("TWILIO_ACCOUNT_SID", "");
    vi.stubEnv("TWILIO_AUTH_TOKEN", "");
    vi.stubEnv("TWILIO_FROM_NUMBER", "");
    const provider = getMessagingProvider();
    await expect(provider.sendSms(payload)).rejects.toThrow("missing credentials");
  });

  it("calls fetch with Twilio endpoint and returns 'sent' on success", async () => {
    vi.stubEnv("TWILIO_ACCOUNT_SID", "ACtest");
    vi.stubEnv("TWILIO_AUTH_TOKEN", "authtoken");
    vi.stubEnv("TWILIO_FROM_NUMBER", "+10000000000");

    const mockFetch = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", mockFetch);

    const provider = getMessagingProvider();
    const result = await provider.sendSms(payload);

    expect(mockFetch).toHaveBeenCalledOnce();
    const [url] = mockFetch.mock.calls[0] as [string, unknown];
    expect(url).toContain("api.twilio.com");
    expect(result.status).toBe("sent");
    expect(result.provider).toBe("twilio");

    vi.unstubAllGlobals();
  });

  it("throws when fetch response is not ok", async () => {
    vi.stubEnv("TWILIO_ACCOUNT_SID", "ACtest");
    vi.stubEnv("TWILIO_AUTH_TOKEN", "authtoken");
    vi.stubEnv("TWILIO_FROM_NUMBER", "+10000000000");

    const mockFetch = vi.fn().mockResolvedValue({
      ok: false,
      text: async () => "API error message"
    });
    vi.stubGlobal("fetch", mockFetch);

    const provider = getMessagingProvider();
    await expect(provider.sendSms(payload)).rejects.toThrow("Twilio send failed");

    vi.unstubAllGlobals();
  });
});
