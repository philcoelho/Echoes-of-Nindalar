---
file_name: superpowers-compliance-checklist.md
title: Superpowers Compliance Checklist
description: Mandatory checklist to validate documentation and execution handoff quality when using Cursor Superpowers workflows.
doc_type: guideline
scope: "docs/**"
version: 1.1.0
last_updated: 2026-02-25
status: active
tags:
  - domain:engineering
  - language:markdown
  - framework:cursor-superpowers
related_docs:
  - ./doc-template.md
  - ./devlog.md
  - ./github-workflow.md
---

# Overview

This document defines a concise compliance checklist for sessions that use the Superpowers workflow.
Its purpose is to ensure consistent quality across design docs, implementation plans, and active devlogs.
Use this checklist before task handoff, before implementation start, and before session completion claims.

## Goals and Non-Goals

- Goals:
  - Standardize quality gates for AI-generated documentation artifacts.
  - Reduce drift between approved design, execution plan, and implementation behavior.
  - Improve traceability and onboarding by enforcing predictable document structure.
- Non-Goals:
  - Replace deep technical review of architecture or code quality.
  - Add heavy process overhead for tiny one-off notes.
  - Force rigid formatting beyond existing standards defined in related documents.

## Tech Stack

- Languages: Markdown, YAML frontmatter
- Frameworks: Cursor Superpowers workflow
- Infrastructure: Git repository documentation under `docs/**`

## High-Level Architecture

- The checklist acts as a quality gate layered on top of:
  - `doc-template.md` for structure and metadata consistency.
  - `devlog.md` for session-level traceability.
- Typical flow:
  - Draft or update a document artifact.
  - Run through the 10-item checklist.
  - Fix gaps before asking for approval or execution.
  - Record key decisions in devlog when implementation starts.

## Domain Concepts

- **Artifact**: Any Superpowers-aligned document (design, plan, devlog, standard).
- **Compliance Gate**: A verification pass using mandatory checklist items.
- **Execution Handoff**: Transition from approved plan to implementation workflow.

## Coding Conventions

- Project structure:
  - Place this checklist under `docs/standards/`.
  - Keep operational documents under `docs/plans/` and `docs/devlog/`.
- Naming:
  - Use kebab-case for all file names.
  - Keep versioned standards with clear title and metadata.
- Error handling:
  - If any mandatory item fails, do not proceed to implementation handoff.
  - Resolve gaps first, then rerun checklist.

## Invariants and Critical Rules

- Every artifact must include valid frontmatter without placeholder values.
- Every plan must declare scope boundaries and explicit non-goals.
- Every handoff must define the next action with objective success criteria.
- If any invariant is violated, implementation should pause until corrected.

## Typical Tasks for AI Assistance

This project will be co-authored by Cursor Agents, powered by the superpowers plugin.

- Validate plan compliance:
  - Input: one target plan file.
  - Expected behavior: report pass/fail for each checklist item with concrete fixes.
  - Validation: all mandatory items pass before implementation begins.
- Validate design compliance:
  - Input: design document path.
  - Expected behavior: confirm architecture, invariants, and non-goals are explicit.
- Validate devlog readiness:
  - Input: active session summary and commit references.
  - Expected behavior: confirm format and traceability alignment with `devlog.md`.

## Compliance Checklist

- [ ] Document exists in the correct path for its lifecycle stage.
- [ ] Frontmatter is complete, valid, and contains no placeholders.
- [ ] File and folder naming follow project conventions.
- [ ] All mandatory structural sections are present.
- [ ] Invariants and critical rules are explicit and non-contradictory.
- [ ] Decision rationale and trade-offs are clearly documented.
- [ ] Scope and non-goals are explicit to prevent uncontrolled expansion.
- [ ] Implementation tasks are actionable, testable, and granular.
- [ ] Technical decisions are aligned with approved project stack and standards.
- [ ] Issue and PR lifecycle follows `github-workflow.md` with GitHub MCP operations.
- [ ] Handoff ends with clear next step and success criteria.

## Applying This to Superpowers Directly

- For brainstorming outputs:
  - Require checklist pass before design approval.
- For writing-plans outputs:
  - Require checklist pass before choosing execution mode.
- For executing-plans sessions:
  - Re-check items 5, 8, 9, and 10 before claiming completion.
- For devlog updates:
  - Confirm frontmatter and rationale sections match `devlog.md`.
- For issue and PR execution:
  - Validate title, labels, assignee, base branch, and linkage against `github-workflow.md`.

## Known Pitfalls and Anti-Patterns

- Treating checklist as optional after verbal approval.
- Passing checklist without checking stack alignment against approved architecture.
- Writing generic tasks that are not executable in short cycles.
- Skipping handoff criteria and starting implementation with ambiguous scope.

## Change Notes (High-Level)

- 2026-02-25 - Added explicit GitHub MCP workflow compliance requirement via `github-workflow.md`.
- 2026-02-25 - Initial checklist standard created for Superpowers workflow compliance.
