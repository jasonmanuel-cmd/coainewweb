import { createHmac, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
export function passwordLoginConfigured() { return Boolean(process.env.HQ_PASSWORD_HASH && process.env.HQ_SESSION_SECRET); }
export function checkHqPassword(password: string) {
  const [salt, expected] = (process.env.HQ_PASSWORD_HASH ?? "").split(":");
  if (!salt || !expected || !/^[a-f0-9]{128}$/.test(expected)) return false;
  const actual = scryptSync(password, salt, 64); return timingSafeEqual(actual, Buffer.from(expected,"hex"));
}
export function issueHqSession() {
  const payload = Buffer.from(JSON.stringify({ exp: Date.now()+3600000, nonce: randomBytes(24).toString("hex") })).toString("base64url");
  return `${payload}.${createHmac("sha256",process.env.HQ_SESSION_SECRET!).update(payload).digest("base64url")}`;
}
export function validHqSession(token: string) {
  if (!passwordLoginConfigured()) return false;
  try { const [payload, signature, extra] = token.split("."); if (extra || !payload || !signature) return false;
    const expected = createHmac("sha256",process.env.HQ_SESSION_SECRET!).update(payload).digest(); const actual=Buffer.from(signature,"base64url");
    if (actual.length!==expected.length || !timingSafeEqual(actual,expected)) return false;
    const data=JSON.parse(Buffer.from(payload,"base64url").toString()); return typeof data.exp==="number" && data.exp>Date.now() && data.exp<=Date.now()+3600000;
  } catch { return false; }
}
