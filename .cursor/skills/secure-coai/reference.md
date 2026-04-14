# SECURE-COAI — Reference

## Firebase Security Rules (patterns)

Adapt paths (`leads`, `mctb`, etc.) to the project. **Deny by default**; open only what is required.

### Firestore — authenticated create only (example)

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /leads/{docId} {
      allow create: if request.auth != null
        && request.resource.data.keys().hasOnly(['name','email','message','createdAt'])
        && request.resource.data.name is string
        && request.resource.data.email is string
        && request.resource.data.message is string;
      allow read, update, delete: if false;
    }
  }
}
```

### Public lead write + anti-spam note

Anonymous writes are higher risk. Prefer **App Check + rate limits + server mediation**. If anonymous `create` is required, combine with:

- Field validation and size caps (`message.size() < 5000`)
- No broad `allow read: if true` on collections with PII

### Realtime Database (sketch)

```json
{
  "rules": {
    ".read": false,
    ".write": false,
    "public": {
      ".read": true,
      ".write": false
    }
  }
}
```

Tighten per-node; never leave default open rules in production.

## Netlify — headers (illustrative)

Place in `public/_headers` or `netlify.toml` `[headers]`; align duplicates.

```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), microphone=(), camera=()
  Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
```

CSP is site-specific (hashes/nonces). Start from a report-only CSP in staging if breaking changes are likely.

## `netlify.toml` — security fragment (illustrative)

```toml
[build]
  publish = "dist"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
```

Add redirects for HTTPS at CDN/host level; Netlify provides HTTPS by default.

## Cloudflare dashboard (manual)

Document for the client:

1. **SSL/TLS**: Full (strict) when origin supports it.
2. **Bot Fight Mode** (free): on for small sites; tune if false positives.
3. **WAF**: managed rules where plan allows; custom rule to challenge/block obvious scanner paths if needed.
4. **Turnstile**: create site keys; wire to forms; store secrets in Netlify env, not repo.
5. **Rate limiting**: available on paid plans; otherwise lean on Turnstile + Netlify function throttles.

## Security Guarantee — one-page copy (footer-ready)

**Title:** Security practices for your project

We design sites with **defense in depth**: secure transport (HTTPS), strict browser headers where compatible with your stack, careful handling of form and lead data, and least-privilege access to databases and APIs. Third-party services (hosting, analytics, scheduling) follow their own security programs; we configure integrations to reduce exposure and keep secrets out of source control.

We **do not** guarantee zero risk — no honest provider can. We **do** commit to following current OWASP-aligned practices for our stack, applying updates when we maintain your site, and remediating reported vulnerabilities according to severity.

*Adjust specifics to match actual hosting, Firebase usage, and maintenance agreement.*

## SRI reminder

For any static `<script src="https://cdn...">` with a fixed version URL, add `integrity` and `crossorigin` per vendor docs.

## Pen-test simulation — minimal payloads (safe in test only)

- XSS string (for encoding checks): `"><img src=x onerror=alert(1)>`
- SQLi probe only applies if the project uses SQL endpoints; static sites: N/A.

Record **expected** result: no execution / no error leakage.
