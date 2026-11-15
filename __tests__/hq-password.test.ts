import { scryptSync } from "node:crypto";
import { afterEach, expect, it, vi } from "vitest";
import { checkHqPassword, issueHqSession, validHqSession } from "@/lib/crm/password";
afterEach(() => { vi.unstubAllEnvs(); vi.useRealTimers(); });
it("uses a salted password hash and rejects incorrect, tampered and expired sessions", () => {
  const password="unit-test-only-password"; const salt="unit-test-salt";
  vi.stubEnv("HQ_PASSWORD_HASH",`${salt}:${scryptSync(password,salt,64).toString("hex")}`); vi.stubEnv("HQ_SESSION_SECRET","unit-test-signing-secret");
  expect(checkHqPassword(password)).toBe(true); expect(checkHqPassword("incorrect")).toBe(false);
  const session=issueHqSession(); expect(validHqSession(session)).toBe(true); expect(validHqSession(session+"x")).toBe(false);
  vi.useFakeTimers(); vi.setSystemTime(Date.now()+3600001); expect(validHqSession(session)).toBe(false);
});
it("does not accept sessions without configured secrets", () => {
  vi.stubEnv("HQ_PASSWORD_HASH",""); vi.stubEnv("HQ_SESSION_SECRET",""); expect(validHqSession("anything")).toBe(false);
});
