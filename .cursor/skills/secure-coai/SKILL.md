---
name: secure-coai
description: >-
  Autonomous security hardening for Chaotically Organized AI sites: OWASP-first
  audits, Netlify/Firebase/Cloudflare defense-in-depth, form abuse controls,
  Firebase rules review, CSP/SRI, gated security admin dashboards, deploy
  gates, and client-facing Security Guarantee copy. Use when the user invokes
  SECURE-COAI, security audit, hardening, penetration-style review, MCTB/Firebase
  safety, lead-form abuse, DDoS/WAF, or refuses-to-ship insecure deploys.
---

# SECURE-COAI

Security subagent for COAI client sites (HTML/JS/Tailwind, Netlify Forms, Firebase Auth/DB, Cloudflare).

## Stance

Assume hostile traffic: bots, scanners, competitors. **Defense-in-depth** only; never claim “unhackable.” Ship **ironclad relative to stack**: strict headers, least-privilege rules, validated inputs, monitored anomalies. If critical gaps remain after fixes, **block deploy** and document blockers.

## Stack context

| Layer | Controls |
|-------|----------|
| Static / edge | `netlify.toml`, `_headers`, Cloudflare WAF / Bot Fight / Turnstile |
| Forms | Netlify Forms + honeypot + server-side verification; optional CAPTCHA |
| App data | Firestore/RTDB Security Rules, Firebase App Check (when applicable) |
| Client JS | No `eval`, minimal inline script; DOMPurify for DOM/HTML from users; SRI on third-party scripts |

## Execute sequentially

### 1. Full audit (read-only first)

Scan repository and config for:

- **Injection / XSS**: `eval`, `new Function`, `innerHTML` with untrusted strings, unescaped template literals from URL/query, user testimonials/comments rendered raw.
- **CSRF**: state-changing actions without tokens or same-site protections (forms, functions).
- **Secrets**: API keys, Firebase config in client is expected; **never** commit service account JSON or private keys.
- **CSP**: missing or `unsafe-inline` / `unsafe-eval` without nonce/hash strategy.
- **Headers**: HSTS, `Permissions-Policy`, `Referrer-Policy`, `X-Content-Type-Options`.
- **Firebase**: open `allow read, write: if true`; missing `request.auth` / ownership checks; writes without field validation.
- **Netlify**: duplicate or weak security headers; forms without bot mitigation.

Output: ranked findings (Critical / High / Medium / Low) with file paths and remediation.

### 2. Hardening fixes (implement)

Apply fixes in-repo; prefer minimal diffs.

- **CSP**: Prefer nonces or hashes; if using `strict-dynamic`, document script entry points. Avoid blanket `unsafe-inline` for scripts.
- **User-generated HTML/text**: sanitize before insert (e.g. DOMPurify); prefer `textContent` for plain text.
- **Forms**: honeypot field (hidden from users); rate limiting via Netlify/edge/function; add Cloudflare Turnstile or hCaptcha on high-abuse forms.
- **CSRF**: tokens or documented Netlify/same-origin constraints for custom endpoints.
- **CDN scripts**: Subresource Integrity where the CDN provides integrity hashes.
- **Firebase**: tighten rules; validate shape with `request.resource.data` keys/types where appropriate. See [reference.md](reference.md) for patterns.
- **Netlify**: centralize headers in `netlify.toml` and/or `public/_headers` consistently.

### 3. Monitoring dashboard (when Firebase Auth is in use)

- Add or extend **`/security-admin`** (or project-consistent path), gated by **Firebase Auth** (admin allowlist or custom claims — document env/config).
- Surface: failed auth attempts (if available), form spam signals, uptime (external ping or status embed), recent anomalies.
- Alerts: Netlify Functions or scheduled checks → email/Slack webhook (document required env vars; no secrets in repo).

### 4. Penetration-style simulation (report, not destructive)

- **XSS**: reflect encoded payloads in test notes; confirm sanitization or encoding.
- **Injection**: confirm no server SQL in stack; if functions touch DB, parameterized queries only.
- **Rules**: attempt unauthenticated reads/writes against emulated rules (document pass/fail).

Score: **Pass** only if Critical/High are cleared or explicitly accepted with signed-off risk; else **FAIL (no deploy)**.

### 5. Deployment checklist

- [ ] `netlify.toml`: security headers, redirects (HTTPS), function settings if used
- [ ] `public/_headers` aligned with `netlify.toml` (no contradictions)
- [ ] Cloudflare: proxy orange-cloud, Bot Fight Mode, WAF custom rules as needed, Turnstile keys in env
- [ ] Firebase rules deployed and version-controlled
- [ ] No private keys in git

## Deliverables

1. Patched source and config files.
2. `firestore.rules` / `database.rules.json` (as applicable) in repo.
3. Short **Cloudflare dashboard** checklist (what toggles/rules — user applies in UI); see [reference.md](reference.md).
4. Security admin page (if scope includes Auth).
5. One-page **Security Guarantee** copy for footer or trust page — honest language (no absolute “unhackable”). Template in [reference.md](reference.md).

## Additional resources

- Long snippets and templates: [reference.md](reference.md)
