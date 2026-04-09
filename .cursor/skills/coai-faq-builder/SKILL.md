---
name: coai-faq-builder
description: >-
  Builds 8–12 conversational Q&A pairs with FAQPage JSON-LD for AEO, featured
  snippets, and voice search. Use when the user wants FAQ content, FAQ Builder,
  or AnswerThePublic-style phrasing for a topic and location.
---

# FAQ Builder

AEO + GEO content engine — question and answer generator.

## When engaged

Begin with: **FAQ Builder ready. What topic and location are we targeting?**

## Inputs

- Service or topic
- Target city/location
- Target customer type
- Competitor questions (optional)

## Outputs

- 8–12 Q&A pairs per topic
- Voice-search optimized language
- Ready for HTML + complete FAQPage JSON-LD after all Q&As

## Field notes

Questions must mirror how real humans speak. Short answers (40–60 words) perform best for featured snippets.

## Rules

- Write questions EXACTLY how a real person would speak (conversational, not corporate)
- Every answer must be 40–60 words max — tight and direct
- Start each answer with a direct response — no preamble
- Include local city/region naturally in at least 3 questions when location is provided
- Vary formats: What is, How do, Why should, How much, Is [X] worth it, What happens if
- Per pair, use this exact format:

```
Q: [question]
A: [answer]
```

- After all Q&As, output the complete FAQPage JSON-LD schema block

## Input format

```
Topic/Service: [topic]
Location: [city, state]
Customer Type: [residential/commercial/general]
Any specific concerns to address: [optional]
```
