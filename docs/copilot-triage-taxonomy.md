---
file_name: copilot-triage-taxonomy.md
title: Copilot Triage Taxonomy
description: Triage classes for Copilot review comments and required evidence expectations.
doc_type: feature
scope: "docs/**"
version: 1.0.0
last_updated: 2026-02-26
status: active
tags:
  - domain:developer-experience
  - language:markdown
  - framework:github-copilot
related_docs:
  - ./copilot-review-playbook.md
  - ./review-gate-policy.md
---

# Overview

This document defines classification labels for Copilot review comments.

## Goals and Non-Goals

- Goals:
  - Define unambiguous triage states for Copilot review comments.
  - Require evidence-backed decisions for each triage outcome.
- Non-Goals:
  - Replace severity-based escalation policy.
  - Replace deterministic merge gates defined in `docs/review-gate-policy.md`.

## Tech Stack

- Languages: Markdown
- Frameworks: GitHub Copilot
- Infrastructure: GitHub pull request reviews and triage records

## High-Level Architecture

- Copilot comments are classified into one triage state.
- Severity and state are evaluated together using precedence rules.
- Final decisions and evidence are recorded in pull request discussion.

## Coding Conventions

- Project structure:
  - Keep taxonomy definitions in `docs/` and enforce usage via playbook and PR process.
- Naming:
  - Use stable state identifiers: `actionable_confirmed`, `needs_human_validation`, `false_positive`.
- Error handling:
  - Escalate ambiguous or critical findings to human validation.

## Bootstrap History (Historical Note)

- Initial failing state: placeholder labels existed and criteria were missing.
- Marker verification command: `rg "placeholder|TODO" docs/copilot-triage-taxonomy.md`
- Historical verification result: expected 3 matches before replacement (`placeholder`, `placeholder`, `TODO`).
- Transition: placeholders were replaced with concrete triage states and evidence criteria in this document.
- Current-state rule: only `Triage States` and `Classification Rules` define active policy.

## Triage States

- `actionable_confirmed`
  - Criteria:
    - The reported issue is reproducible or directly verifiable in the changed code.
    - The impact is confirmed on behavior, security, correctness, or performance.
    - A concrete fix path is identified.
  - Evidence examples:
    - Failing test or deterministic reproduction steps.
    - Code reference showing the defect path.
    - Static analysis output or benchmark data confirming impact.

- `needs_human_validation`
  - Criteria:
    - The comment indicates a plausible risk but evidence is incomplete or ambiguous.
    - The decision requires domain context, architecture intent, or product constraints.
    - Automated checks do not conclusively confirm or reject the issue.
  - Evidence examples:
    - Reviewer request for additional test coverage.
    - Design reference needed to confirm intended behavior.
    - Pending owner decision for edge-case handling.

- `false_positive`
  - Criteria:
    - The reported issue does not apply to current code behavior.
    - Existing controls or invariants already mitigate the risk.
    - Verification confirms no actionable defect.
  - Evidence examples:
    - Test result demonstrating expected behavior.
    - Code reference showing guard conditions or unreachable path.
    - Policy rationale documented by a human reviewer for critical-path dismissal.

## Classification Rules

- Assign exactly one triage state per Copilot comment.
- Record evidence in the pull request discussion before closing the comment.
- Escalate any ambiguous `critical` finding to human validation.

## Typical Tasks for AI Assistance

This project will be co-authored by Cursor Agents, powered by the superpowers plugin.

- Validate triage classification:
  - Input: Copilot comment, severity, and supporting evidence
  - Expected behavior: suggest one state with rationale and escalation need
  - Validation: classification follows state rules and precedence contract

## State and Severity Contract

- Triage state and severity are distinct attributes and must both be recorded.
- Triage state answers: "What is the decision outcome?"
- Severity answers: "How urgent and impactful is this finding?"
- Precedence rules:
  - `critical` severity always requires human escalation.
  - `needs_human_validation` always requires human escalation.
  - `false_positive` on critical-path findings requires documented human rationale.

## Invariants and Critical Rules

- Every Copilot comment must have exactly one triage state.
- Every triage decision must include evidence in pull request discussion.
- No critical-path false-positive dismissal is valid without human rationale.

## Known Pitfalls and Anti-Patterns

- Assigning triage state without recording supporting evidence.
- Using severity as a substitute for triage classification.
- Closing ambiguous findings as `false_positive` without human review.

## Change Notes (High-Level)

- 2026-02-26 - Added triage states, evidence criteria, and state-severity contract.
