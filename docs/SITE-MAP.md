# COAI site map

Canonical origin: `https://www.chaoticallyorganizedai.com`
Submit this to Google Search Console: **https://www.chaoticallyorganizedai.com/sitemap.xml**
(`robots.txt` already points to it: https://www.chaoticallyorganizedai.com/robots.txt)

Source of truth: `app/sitemap.ts` (URLs and last-modified dates) and `app/robots.ts`. Update this file when a page is added, removed or moved.

## Public pages (in the Google sitemap)

| Page | Full URL |
|---|---|
| Home | https://www.chaoticallyorganizedai.com/ |
| Services | https://www.chaoticallyorganizedai.com/services |
| Systems catalog | https://www.chaoticallyorganizedai.com/systems |
| Pricing | https://www.chaoticallyorganizedai.com/pricing |
| Website design hub | https://www.chaoticallyorganizedai.com/website-design |
| Kern County | https://www.chaoticallyorganizedai.com/website-design/kern-county |
| Bakersfield | https://www.chaoticallyorganizedai.com/website-design/bakersfield |
| Delano | https://www.chaoticallyorganizedai.com/website-design/delano |
| Shafter | https://www.chaoticallyorganizedai.com/website-design/shafter |
| Portfolio | https://www.chaoticallyorganizedai.com/portfolio |
| About | https://www.chaoticallyorganizedai.com/about |
| FAQ | https://www.chaoticallyorganizedai.com/faq |
| Demo | https://www.chaoticallyorganizedai.com/demo |
| Contact | https://www.chaoticallyorganizedai.com/contact |
| Intake (leak score / build inquiry) | https://www.chaoticallyorganizedai.com/intake |
| Privacy | https://www.chaoticallyorganizedai.com/privacy |
| Cookie notice | https://www.chaoticallyorganizedai.com/cookies |
| Terms | https://www.chaoticallyorganizedai.com/terms |
| SMS terms | https://www.chaoticallyorganizedai.com/sms-terms |
| AI disclosure | https://www.chaoticallyorganizedai.com/ai-disclosure |

## Pages kept out of Google on purpose

| Page | Why |
|---|---|
| `/intake/confirmation` | Shown after an intake submit; `noindex` |
| `/thank-you` | Legacy page, `noindex`, nothing links to it |
| `/jax` | Product preview, `noindex` |
| `/hq` | Private lead workspace; `noindex` and disallowed in `robots.txt` |

## Structure

```
/
├─ /services
├─ /systems
├─ /pricing
├─ /website-design
│   ├─ /kern-county
│   ├─ /bakersfield
│   ├─ /delano
│   └─ /shafter
├─ /portfolio
├─ /about
├─ /faq
├─ /demo
├─ /contact
├─ /intake
│   └─ /confirmation   (noindex)
├─ /thank-you          (noindex)
├─ /jax                (noindex)
├─ /hq                 (private)
└─ legal: /privacy /cookies /terms /sms-terms /ai-disclosure
```

## Navigation

- Top menu: Proof (`/#proof`), Systems, Services, Explore (Pricing, Portfolio, About, FAQ, JAX Preview, AI Disclosure, Contact), Call, "Discuss your build".
- Footer: System and Company links, phone, booking link, email, social icons, legal links.
- Phones: sticky "Call" bar (hidden on `/intake`, `/contact`, `/thank-you`).

## Ways a visitor becomes a lead

1. Call: nav, footer, home hero, mobile call bar.
2. Book a time: Google Calendar appointment page (`BOOKING_URL` in `lib/site.ts`).
3. Call me back: two-field form on `/` and `/pricing` (`/api/callback`).
4. Intake: 3-step request (`/api/intake`).
5. Contact form: `/contact` (`/api/contact`).
6. Chat: "Chat with Cipher".

## Server routes (not pages)

`/api/contact`, `/api/intake`, `/api/callback`, `/api/jax-waitlist`, `/api/audit`, `/api/lighthouse`, `/api/register`, `/api/activity`, `/api/hq/*` (private).
