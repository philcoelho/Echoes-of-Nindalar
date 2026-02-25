---
file_name: doc-template.md
title: Documentation Template
doc_type: guideline
scope: "docs/**"
version: 1.0.0
last_updated: 2026-02-25
status: active
tags:
  - domain:documentation
  - type:template
related_docs: []
---

# Documentation Principles

Every document generated from this template **must** use these three principles:

1. **Clear Headings** — Use a logical hierarchy of sections and subsections with descriptive titles, as summarized below, this is mandatory when creating the documentation. Each heading should immediately convey what the section covers, enabling both humans and AI agents to navigate and retrieve context efficiently.

2. **Consistent Formatting** — Avoid mixing too many styles. Use clear bullet lists. **Do not** use tables, **Do not** use icons/emojis, keep paragraphs short, and maintain homogeneous conventions throughout. Consistency reduces cognitive load and improves LLM parsing accuracy.

3. **Good Frontmatter** — Always fill in title, description, tags, and other useful metadata in the YAML frontmatter. Use path patterns (globs) for contextual scoping. Well-structured frontmatter enables automated filtering, indexing, and selective context injection. Every new document **must** start with the following frontmatter structure:

```yaml
---
file_name: [doc-name.md] #Always use kebab_case
title: [Document Title] 
doc_type: [project | service | feature | domain | guideline]
scope: [short description or glob, e.g. "backend/billing-api"]
version: [semver, e.g. 1.0.0]
last_updated: [YYYY-MM-DD]
status: [active | deprecated | experimental]
tags:
  - domain:[e.g. payments]
  - language:[e.g. typescript]
  - framework:[e.g. nestjs]
related_docs:
  - ./related-doc.md
---
```

# Overview

[Short 2–4 sentence summary of what this project/module/service does,  
why it exists, and how it fits into the larger system.]

## Goals and Non-Goals

- Goals:
  - [What this project/module **should** do and prioritize.]
- Non-Goals:
  - [What is **explicitly out of scope**, to avoid misuse by humans and AIs.]

## Tech Stack

- Languages: [e.g. TypeScript]
- Frameworks: [e.g. Tanstack Start]
- Infrastructure: [e.g. Supabase, Vercel]

## High-Level Architecture

- Main components/modules and how they interact.
- External integrations (APIs, queues, databases, third-party services).
- Typical request/processing flow in 3–7 bullet points.

## Domain Concepts

- **KeyConceptA** — what it represents, important fields, main constraints.
- **KeyConceptB** — relation to KeyConceptA, typical lifecycle, examples.
- [Add simple JSON examples or data structures if helpful.]

## Coding Conventions

- Project structure:
  - [e.g. `src/domain`, `src/app`, `src/infra` and what belongs in each.]
- Naming:
  - [e.g. `*Service` for orchestration, `*Repository` for persistence, etc.]
- Error handling:
  - [How to model domain errors, HTTP errors, logging strategy.]

## Invariants and Critical Rules

- [List rules that **must never be broken**, e.g. “never charge a user twice for the same order ID.”]
- [Explain briefly what happens if each invariant is violated.]

## Typical Tasks for AI Assistance

This project will be co-authored by Cursor Agents, powered by the superpowers plugin.

Describe common tasks you expect Cursor Agent tools, including **Superpowers** plugin to perform here.

- Create new documentation:
  - Input: module/service name and purpose
  - Expected behavior: generate doc following DOC_TEMPLATE.md with all sections filled
  - Validation: all frontmatter fields present, no empty sections
- Add or change an endpoint:
  - Input: [short description of what needs to change]
  - Expected behavior: [success criteria and constraints]
- Implement or refactor a use case:
  - Keep: [what must remain true / backwards-compatible]
  - Change: [what is allowed to evolve]
- Write or adjust tests:
  - Test framework: [e.g. Vitest]
  - Style: [e.g. given/when/then, fixtures, mocks policy.]

## Known Pitfalls and Anti-Patterns

- [List recurring mistakes seen in this area and why they are harmful.]
- [Describe the preferred alternative or pattern.]

## Change Notes (High-Level)

- 2026-02-15 — [Short note about a significant architectural or behavior change.]
- 2026-01-10 — [Another key change the AI and humans should be aware of.]
