---
file_name: review-gate-policy.md
title: Review Gate Policy
description: Deterministic gate policy for pull request review with severity-based merge rules.
doc_type: feature
scope: ".github/workflows/**, docs/**"
version: 1.0.0
last_updated: 2026-02-26
status: active
tags:
  - domain:developer-experience
  - language:markdown
  - framework:github-actions
related_docs:
  - ./copilot-review-playbook.md
  - ./standards/superpowers-compliance-checklist.md
---

# Overview

This document defines deterministic quality gates that complement Copilot review comments.
It defines enforceable merge rules and their operational preconditions.

## Goals and Non-Goals

- Goals:
  - Define severity ordering and merge-blocking behavior.
  - Require explicit human rationale for critical-path false positives.
- Non-Goals:
  - Replace human code review ownership.
  - Define rollout metrics and reporting cadence.

## Tech Stack

- Languages: Markdown, YAML
- Frameworks: GitHub Actions, CodeQL
- Infrastructure: Pull request checks and branch protection

## High-Level Architecture

- CodeQL runs on pull requests and reports findings.
- The workflow includes a post-analysis API check that counts open `critical` alerts for the current PR.
- Findings are triaged by severity and critical-path impact.
- Merge policy blocks unresolved critical findings.

## Domain Concepts

- **Critical Path** — Auth, authorization, data integrity, and sensitive data handling.
- **Finding Severity** — `critical`, `high`, `medium`, `low`.
- **False Positive Rationale** — Human-written justification with evidence.

## Coding Conventions

- Project structure:
  - Keep workflows in `.github/workflows/`.
  - Keep gate policy in `docs/`.
- Naming:
  - Use stable severity labels and explicit policy terms.
- Error handling:
  - Treat unresolved critical findings as blocking.

## Invariants and Critical Rules

- Unresolved `critical` findings block merge.
- Critical-path false-positive dismissals require human rationale and evidence.
- Gate policy decisions must be traceable in pull request discussion.

## Bootstrap History Note

Pre-enforcement drafts used marker text (`not yet enforceable`) for gate definitions.
Current enforcement state is tracked only in `Enforcement Status (Current Source of Truth)`.

## Blocking Policy

- Severity ordering:
  - `critical`
  - `high`
  - `medium`
  - `low`
- Merge rule:
  - Block merge when any `critical` finding remains unresolved.
- Critical-path false-positive rule:
  - Require reviewer rationale that states why the finding is a false positive.
  - Require supporting evidence such as code references, tests, or query context.
  - Require explicit human approval before merge.

## Enforcement Preconditions

- `.github/workflows/codeql.yml` must run on pull requests.
- The `Block on open critical alerts` step must remain enabled in the CodeQL workflow.
- Branch protection must require the CodeQL status check before merge.
- Repository reviewers must enforce documented rationale for critical-path false-positive dismissals.

## Enforcement Status (Current Source of Truth)

- [x] Severity ordering is defined.
- [x] Workflow fails when open `critical` code scanning alerts exist for the current PR.
- [x] Critical-path false-positive dismissals require human rationale and evidence.

## Verification Step

- Command: `rg -n "^- \\[x\\]" docs/review-gate-policy.md`
- Expected result: 3 matches in `Enforcement Status (Current Source of Truth)`.

## Typical Tasks for AI Assistance

This project will be co-authored by Cursor Agents, powered by the superpowers plugin.

- Validate gate readiness:
  - Input: policy and workflow files
  - Expected behavior: confirm rules and references are aligned
  - Validation: blocking rules are explicit and unambiguous

## Known Pitfalls and Anti-Patterns

- Downgrading severity to bypass merge gates.
- Dismissing critical-path findings without evidence.

## Change Notes (High-Level)

- 2026-02-26 - Added baseline deterministic gate policy and blocking rules.
