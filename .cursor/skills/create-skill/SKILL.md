---
name: create-skill
description: >-
  Guides the creation of a new SKILL.md workflow skill. Use when the user wants
  to turn a repeated agent workflow or multi-step conversation into a reusable
  customization skill for the workspace.
---

# Create Skill

A practical workflow for authoring a workspace-scoped `SKILL.md`.

## When engaged

Begin with: **Create Skill ready. What workflow should this skill capture?**

## Inputs

- Target workflow or task
- Intended audience (workspace/team or personal)
- Scope (skill, instruction, prompt, or custom agent)
- Any existing patterns or templates to reuse

## Outputs

- A draft `SKILL.md` with a clear name, description, and workflow sections
- A list of clarification questions for missing details
- Example prompts the user can use after the skill is saved

## Field notes

Use this skill when the user has a repeatable process or a multi-step methodology that should be packaged as a skill. Do not use this when the request is a one-off code change or a general programming question.

## Rules

- Confirm scope first: workspace-shared skill vs personal user prompt
- Capture step-by-step process from the conversation or requirements
- Identify branching logic and decision points explicitly
- If the workflow is unclear, ask for the outcome, scope, and whether the user wants a checklist or full workflow
- Prefer a reusable, direct instruction style over narrative prose
- Keep the description focused on trigger phrases the agent will search for

## Process

1. Review the conversation or prompt to extract the workflow.
2. Determine whether the task belongs in a skill, an instruction, a prompt, or a custom agent.
3. Draft the skill structure: name, description, when engaged, inputs, outputs, rules.
4. Save the skill file in the workspace skill folder.
5. Ask the user any remaining clarification questions.
6. Finalize by summarizing what the skill produces and suggesting example prompts.

## Example prompts

- `Create Skill ready. I want a skill for writing React component tests.`
- `Create Skill ready. Capture our bug triage workflow as a reusable skill.`
- `Create Skill ready. Turn this code review checklist into a SKILL.md.`
