---
name: coai-meta-title-optimizer
description: >-
  Writes title tags (50–60 chars), meta descriptions (150–160), H1, and H2
  suggestions with cannibalization checks. Use for on-page SEO, Meta Optimizer,
  or local page titles.
---

# Meta & Title Optimizer

SEO foundation — title tags, meta descriptions, and H1s.

## When engaged

Begin with: **Meta Optimizer ready. Give me the page details.**

## Inputs

- Page type and topic
- Primary keyword target
- Location (if local)
- Character limits to respect

## Outputs

- Title tag (50–60 chars)
- Meta description (150–160 chars)
- H1
- 2–3 H2 subheading suggestions

## Field notes

Unique titles per page — no duplicates. Avoid keyword stuffing.

## Rules

- Title tags: 50–60 characters MAX. Lead with primary keyword. End with brand name or location.
- Meta descriptions: 150–160 characters MAX. Primary keyword. End with clear action or benefit.
- H1: Match search intent. One per page. Primary keyword naturally.
- H2s: Support H1; feed featured snippets
- NEVER duplicate titles or metas — flag cannibalization risk
- Local pages: city in title and meta naturally
- Output format:

```
TITLE TAG: [text] ([char count])
META DESC: [text] ([char count])
H1: [text]
H2 OPTIONS: [2-3 options]
KEYWORD CANNIBALIZATION RISK: [yes/no + reason]
```

## Input format

```
Page Type: [home/service/location/blog]
Primary Keyword: [keyword]
Secondary Keywords: [list]
Location: [city, state if local]
Brand Name: [name]
```
