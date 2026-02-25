---
file_name: devlog.md
title: Devlog Standard
description: Standards for creating and maintaining timestamped development logs during active work.
doc_type: guideline
scope: "docs/devlog/**"
version: 1.0.0
last_updated: 2026-02-25
status: active
tags:
  - domain:engineering
  - language:markdown
related_docs:
  - ./github-workflow.md
---

# Devlog Standard

Devlogs are timestamped development narratives that capture decision context not visible in commits alone.
This standard defines where devlogs live, how entries are named, which metadata is mandatory, and which
content structure each entry must follow. It exists to improve debugging speed, onboarding quality, and
historical traceability while work is still active.

## Goals and Non-Goals

- Goals:
  - Preserve reasoning behind non-obvious technical choices.
  - Record experiments, dead ends, and tradeoffs during implementation.
  - Provide a reliable trail for regressions discovered after merge.
  - Standardize format so humans and AI agents can parse entries consistently.
- Non-Goals:
  - Replace permanent architecture or domain documentation.
  - Duplicate commit history without adding rationale.
  - Keep devlogs forever after context is no longer operationally useful.

## Tech Stack and Runtime

- Languages: Markdown, YAML frontmatter.
- Frameworks: None.
- Infrastructure: Git repository, pull requests, and issue tracking context.
- Core commands:
  - Development: `n/a`
  - Tests: `n/a`
  - Production: `n/a`

## High-Level Architecture

- Devlogs live under `docs/devlog/` and are grouped by work context folder.
- Each context folder can contain multiple timestamped files, one per session or logical work chunk.
- Every file starts with required entry frontmatter, followed by a canonical narrative structure.
- Entries map commits and optional issue/PR references to documented implementation rationale.
- Typical flow:
  - Pick the context folder for the work unit.
  - Create a timestamped file using the naming convention.
  - Fill frontmatter with required metadata.
  - Write the narrative sections using the standard body template.
  - Keep the entry while work is active and remove it only when lifecycle criteria are met.

## Domain Concepts

- **Devlog Entry** — A single timestamped Markdown file that captures one development session.
- **Context Folder** — A folder under `docs/devlog/` representing issue, PR, branch, or setup work.
- **Session Scope** — The app/package surface impacted by a session, represented by `scope`.
- **Entry Type** — Classification of change intent using commitlint-aligned values.

Standard context folder naming:
- `issue-{n}/`: Work tracked by a GitHub issue.
- `pr-{n}/`: Work reviewed in a specific pull request.
- `{branch-name}/`: Work tied to a feature branch.
- `setup/`: Project bootstrap and initial configuration.

Standard file naming:
- `YYYY-MM-DD-HH-MM-SS-{slug}.md`
- Timestamp must come from the first relevant commit in the session.
- Slug must be short and kebab-case.

Entry frontmatter contract:
```yaml
---
date: 2026-02-20T17:58:28-03:00
scope: [api, jobs]
type: feat
commits:
  - a312f04
  - 529d428
pr: 10
issue: 47
---
```

Allowed `scope` reference values:
- `api`, `jobs`, `builder`, `monorepo`, `ui`, `design-system`, or explicit package names.

Required entry body structure:
```markdown
# {App/Scope} - {Short Title}

**Timestamp:** {ISO date}
**Commits:** `{sha1}`, `{sha2}`
**Context:** One sentence explaining why the session started.

## Motivation

## Changes Made

### 1. {Logical change group}

### 2. {Logical change group}

## Key Technical Details

## Lessons Learned

## Files Changed
```

## Coding Conventions

- Project structure:
  - Root: `docs/devlog/`.
  - One context folder per work unit.
  - One file per active session or logical chunk.
- Naming:
  - Context folders must follow the approved patterns.
  - File names must follow timestamp plus slug format.
  - Slugs must be concise and kebab-case.
- Error handling:
  - If commit references are missing, delay entry finalization until SHAs are known.
  - If scope is ambiguous, use an array with all affected scopes.
  - If there are no meaningful lessons, omit `Lessons Learned` only when truly justified.

## Invariants and Critical Rules

- Every devlog entry must include valid frontmatter with `date`, `scope`, `type`, and `commits`.
- `type` must be one of: `feat`, `fix`, `refactor`, `chore`, `docs`, `test`.
- `commits` must include all short SHAs covered by the entry.
- `Motivation` and `Changes Made` must always be present in the body.
- Devlogs are ephemeral, but should not be removed immediately after merge.
- If these invariants are violated, the historical trail becomes unreliable and regression analysis slows down.

## Typical Tasks for AI Assistance

This project will be co-authored by Cursor Agents, powered by the superpowers plugin.

Common AI tasks for this standard:
- Create new devlog entry:
  - Input: context folder, session summary, commit SHAs, issue/PR references.
  - Expected behavior: generate a valid entry with required frontmatter and body sections.
  - Validation: naming, metadata, and mandatory sections are all compliant.
- Normalize existing devlogs:
  - Input: one or more legacy entries.
  - Expected behavior: reformat to this standard without losing historical meaning.
- Validate compliance:
  - Input: target devlog files.
  - Expected behavior: report missing metadata, invalid types/scopes, and structural gaps.
- Summarize sessions:
  - Input: multiple entries in one context folder.
  - Expected behavior: produce concise timeline summaries for debugging and onboarding.

## Known Pitfalls and Anti-Patterns

- Writing chronological notes without rationale or decision context.
- Using inconsistent scope names that cannot be mapped to project areas.
- Omitting failed attempts, which hides useful debugging history.
- Deleting devlogs immediately after merge, reducing post-merge observability.
- Treating devlogs as permanent docs instead of active-context artifacts.

## Change Notes (High-Level)

- 2026-02-25 - Rewritten to fully align with the documentation template section model.
- 2026-02-21 - Initial devlog standard created.
