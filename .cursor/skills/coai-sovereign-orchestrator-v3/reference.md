# COAI Sovereign Orchestrator v3.0 — Agent reference

Use this file when executing Agents 1–21 in detail. Prefer reading matching `.cursor/skills/coai-*` SKILL.md files for agents 1–14 when those tasks dominate.

---

## Agent 1 — Schema Architect

**Trigger:** Rich results, FAQs, local business, service markup.

**Protocol:**

1. Identify page type: `LocalBusiness` / `Service` / `FAQPage` / `HowTo` / `WebSite`.
2. Pull NAP from client profile.
3. JSON-LD with required + recommended fields; inline `<script type="application/ld+json">` + standalone `schema.json`.
4. `sameAs`: GBP, Yelp, Facebook, BBB (URLs or TBD flags — never empty strings; omit or use real URLs only).
5. Validate: no missing `@type`, no empty strings, no placeholder lorem.

**Rules:** Nest `hasMap` for local businesses; `priceRange` if pricing exists; `areaServed` → Bakersfield, Kern County, CA; FAQPage when 3+ FAQs on page. Validate mentally against Google rich-result requirements; flag if unverifiable.

---

## Agent 2 — FAQ Builder

**Trigger:** Any page.

**Protocol:** 8–12 FAQs; conversational Q → 2–3 sentence answer; primary keyword in first sentence naturally; link schema to Agent 1; flag answers over ~50 words — trim.

**Rules:** Bakersfield homeowner speech; no corporate jargon; ≥2 “near me” / “in Bakersfield”; one price/cost FAQ.

---

## Agent 3 — Entity Mapper

**Trigger:** Group A; all projects.

**Protocol:** Extract entities (business, owner, services, location, brands); NAP exact match everywhere; map relationships; consistency checklist; flag St./Street, LLC case, phone format.

**Rules:** Business name identical every page; phone `(661) 610-9198`; city `Bakersfield, CA` in checks; owner name consistent if used.

---

## Agent 4 — Meta & Title Optimizer

**Trigger:** Any page build/audit.

**Protocol:** Title ≤60 chars: primary + city + brand; meta ≤155: action + service + location + CTA; H1 matches intent ≠ duplicate title; 3–5 H2s; no duplicate titles/metas site-wide.

**Rules:** Title contains Bakersfield or 661 or neighborhood; meta ends with CTA; H1 above fold; max ~2 exact-match keyword uses per meta element — no stuffing.

---

## Agent 5 — Local SEO Auditor

**Trigger:** Local business.

**Protocol:** NAP vs Agent 3; citations GBP/Yelp/BBB/Bing/Apple; top 5 pack competitors (best-effort); citation gap list; score 0–100 readiness.

**Rules:** Zero NAP drift; GBP category aligns with H1 topic; flag review gaps (e.g. 50+ reviews); recommend Maps embed on contact.

---

## Agent 6 — Content Clarity Checker

**Trigger:** Any copy.

**Protocol:** Strip filler (“dedicated to,” “pride ourselves,” “industry-leading”); active voice; target grade 7–8; purposeful paragraphs; flag >3 sentences without visual break.

**Rules:** First sentence of section: keyword or location; mobile paragraphs ≤4 lines; ≥1 proof point per page; “we” ok; no stiff third-person about self.

---

## Agent 7 — Internal Link Strategist

**Trigger:** 3+ pages.

**Protocol:** Silo: Home → Services → Locations → FAQ/blog; 2–4 internal links/page; anchor list (no “click here”); orphan detection; breadcrumb rec.

**Rules:** Home → all top services; each service → home + 1 related; ≤2 clicks from home; FAQ links to relevant service.

---

## Agent 8 — Core Web Vitals Checker

**Trigger:** Group A.

**Protocol:** LCP: largest above-fold; CLS: width/height; INP: heavy listeners; image checklist WebP + lazy + dimensions; fonts: preconnect + `font-display: swap`; `<head>` snippet.

**Rules:** Images explicit dimensions; critical CSS inline policy per project; Google Fonts preconnect; hero eager, below-fold lazy; target Lighthouse perf 95+ when measurable.

---

## Agent 9 — E-E-A-T Builder

**Trigger:** Competitive or sensitive niches.

**Protocol:** Trust gaps; owner bio; credentials/licenses if provided — **never fabricate**; testimonial structure; press if real.

**Rules:** Min: years in business + named contact + visible address; testimonials: first name, city, service; license in footer if provided.

---

## Agent 10 — Voice Search Optimizer

**Trigger:** FAQ / local service.

**Protocol:** Conversational answers; near-me variants; “best in Bakersfield,” zip-specific; answer first sentence; speakable schema where applicable.

**Rules:** Voice answers ~≤30 words; zips: 93301, 93305, 93306, 93307, 93308, 93309, 93311, 93312, 93313, 93314; cover who/what/where/how much/when per service.

---

## Agent 11 — Citation Hunter

**Trigger:** Local trust.

**Protocol:** Top 15 sources; niche-specific (Weedmaps cannabis, etc.); priority order; NAP paste block; flag paid listings optional.

**Rules:** Free first; identical NAP; index timeline 2–8 weeks typical.

---

## Agent 12 — Competitor AI Visibility

**Trigger:** Competition / new market.

**Protocol:** Competitor URLs from profile; top 5 keywords (infer from content); schema audit; reviews vs client; 90-day gap +3 quick wins.

**Rules:** Local pack focus; no black-hat; if competitor lacks FAQ/AEO schema → exploit.

---

## Agent 13 — Content Refresh

**Trigger:** Existing sites / quarterly.

**Protocol:** Stale stats, dead links, thin <300 words; refresh priority; seasonal FAQs; meta fixes for length/keywords.

**Rules:** Year-specific copy needs annual review; thin → expand toward 600+; use **current calendar year** in titles when relevant; preserve internal links unless Agent 7 overrides.

---

## Agent 14 — GBP Optimizer

**Trigger:** Local.

**Protocol:** 750-char description; 5 services × ~200 chars; 4 posts; 5 Q&A seeds; photo checklist + alt ideas.

**Rules:** Keyword in first sentence of description; posts end phone or URL; Q&A mirrors FAQ; no ALL CAPS.

---

## Agent 15 — VEGA (Visual Engineering & Graphic Architect)

**Trigger:** UI/CSS/layout; Group A.

**Protocol:**

1. **Palette:** `:root` HSL vars — dominant, accent, neutral, semantic, dark variants.
2. **Typography:** scale 12/14/16/20/24/32/48/64; pairing display + body — **not** Inter/Roboto/Arial as primary.
3. **Spatial:** 4px grid; tokens 4/8/12/16/24/32/48/64.
4. **Code:** full CSS + HTML hooks; dark theme in same system.
5. **Contrast:** WCAG AA all text pairs; primary CTA ≥7:1 vs background where Agent 16 requires.

**Forbidden:** purple gradients, glassmorphism, rainbow text, layout-shift animations, generic “AI slop” aesthetics.

**Critique format:** What works → Biggest issue → Exact fix → Critical/Major/Minor.

**Rules:** Max 5 colors per component; shadow base `0 1px 3px rgba(0,0,0,0.08)`; radius 4/8/12/16/9999px; easing `cubic-bezier(0.4,0,0.2,1)`.

---

## Agent 16 — Conversion Architect

**Trigger:** Lead gen.

**Protocol:** Funnel AIDA-style map; primary CTA above fold; form max 4 fields (name, phone, service, message); trust stack; CTA copy variants (3); inline validation; click-to-call mobile.

**Rules:** CTA = verb + benefit; exit-intent optional (30s or scroll-back); social proof visible fast; estimate baseline 3–5% → 8–15% with full stack (flag as model not guarantee).

---

## Agent 17 — Automation Integrator

**Trigger:** Forms + phone.

**Protocol:**

- `api/mctb.js` — Twilio missed-call text-back (Netlify Function or equivalent).
- Form → Firebase Realtime DB (or documented alternative) with **rules**: writes constrained; reads admin-only.
- SMS under 160 chars; reply YES flow; **opt-out**: “Reply STOP to unsubscribe.”
- `deploy.sh` — Netlify CLI deploy.
- Secrets in `.env` only.

**Default SMS:**

`Hi [Name], this is [Business]. Missed your call about [Service]. Reply YES for a free quote or call us back: [Phone]. -[Business]`

**Rules:** MCTB within 60s of missed call when implemented; never hardcode keys.

---

## Agent 18 — Performance Auditor

**Trigger:** Pre/post launch.

**Protocol:** Lighthouse table (simulated if needed); bundle under 100kb gzip target; WebP mandatory, AVIF nice; font loading per Agent 8; ranked fix list.

**Targets:** Performance ≥90 (97 goal); A11y/BP/SEO ≥95 (100 goals). Fail explicit if LCP over 2.5s simulated, images missing dimensions, render-blocking head (fixable).

---

## Agent 19 — Client Handoff

**Trigger:** Completion.

**Protocol:** 10-step Netlify checklist; client portal wireframe (monitoring); **$97/mo** retainer pitch (content refresh, 4 GBP posts, uptime, schema updates, monthly report); DNS + credentials template; 30-day monitoring plan.

**Rules:** GA + Search Console before handoff; retainer in writing + verbal; read-only dashboard for client.

---

## Agent 20 — Client Profile Injector

**Trigger:** Group A; always first for client data.

**Protocol:** Parse user input → client profile JSON; missing → defaults; broadcast to all agents; inconsistency flags; **one** clarifying question if niche ambiguous (e.g. “general contractor”).

**Rules:** Fix NAP at injection; output JSON is authoritative.

---

## Agent 21 — Voice & Tone Architect

**Trigger:** Group A; all copy.

**Protocol:** Niche profile: trades / cannabis / legal / events / food; Bakersfield direct, working-class credibility; 5 voice rules; banned phrases; 3 before/after examples.

**Default trades:** job-site clarity; problem → fix; numbers; no passive, no “committed to,” no “solutions”; always next step.

**Rules:** Never mix tone profiles on one site.

---

## Validation cross-check (Step 4 summary)

| Metric | Threshold |
|--------|-----------|
| Schema | Valid JSON-LD, no holes |
| Contrast | 4.5:1 min text |
| Lighthouse perf | 90+ |
| Lighthouse SEO | 95+ |
| Lighthouse a11y | 95+ |
| Conversion | 8%+ target with full stack (model, not guarantee) — flag if weak CTA/trust |
| NAP | 100% |
| Voice | Agent 21 pass |
