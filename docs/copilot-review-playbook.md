---
file_name: copilot-review-playbook.md
title: Copilot Review Playbook
description: Operating playbook for using Copilot review signals with deterministic checks and human triage.
doc_type: feature
scope: ".github/**, docs/**"
version: 1.0.0
last_updated: 2026-02-26
status: active
tags:
  - domain:developer-experience
  - language:markdown
  - framework:github-copilot
related_docs:
  - ./standards/doc-template.md
  - ./standards/superpowers-compliance-checklist.md
---

# Overview

This playbook defines how pull request reviewers should use Copilot feedback.
The current checklist state is the source of truth for required artifact readiness.

## Goals and Non-Goals

- Goals:
  - Ensure required review-policy artifacts are present and linked.
  - Keep review guidance concise and actionable.
- Non-Goals:
  - Replace human approval for critical code paths.
  - Define full rollout metrics in this task.

## Tech Stack

- Languages: Markdown
- Frameworks: GitHub Copilot
- Infrastructure: GitHub pull requests, repository policy files

## High-Level Architecture

- Reviewers use `.github/copilot-instructions.md` for Copilot guidance.
- Authors fill `.github/pull_request_template.md` with required context.
- Deterministic gate rules are defined in `docs/review-gate-policy.md`.
- Triage classification rules are defined in `docs/copilot-triage-taxonomy.md`.
- This playbook links policy artifacts, deterministic checks, and escalation flow.

## Domain Concepts

- **Policy Artifact** — Required file that drives review behavior.
- **Signal Fusion** — Copilot findings combined with tests, lint, and human judgment.

## Coding Conventions

- Project structure:
  - Keep Copilot and PR policy files in `.github/`.
  - Keep operating docs in `docs/`.
- Naming:
  - Use explicit policy names and stable section headings.
- Error handling:
  - Track artifact status using explicit checkboxes and file references.

## Invariants and Critical Rules

- Every required policy artifact must be present before this checklist passes.
- Copilot comments are advisory and require validation before security-sensitive changes.

## Typical Tasks for AI Assistance

This project will be co-authored by Cursor Agents, powered by the superpowers plugin.

- Validate policy artifact readiness:
  - Input: required artifact list
  - Expected behavior: report missing and completed artifacts
  - Validation: checklist references all required files with checked status

## Policy Artifact Checklist

- [x] `.github/copilot-instructions.md`
- [x] `.github/pull_request_template.md`
- [x] `docs/copilot-review-playbook.md`
- [x] `docs/review-gate-policy.md`
- [x] `docs/copilot-triage-taxonomy.md`
- [x] `docs/copilot-rollout-plan.md`
- [x] `docs/copilot-metrics.md`

## Bootstrap History (Historical Only)

Initial bootstrap used unchecked placeholders for required artifacts.
The current checklist is fully checked and is the only active state reference.

## Marker Verification Step

- Commands:
  - `rg -n "^- \\[x\\].*\\.github/copilot-instructions\\.md" docs/copilot-review-playbook.md`
  - `rg -n "^- \\[x\\].*\\.github/pull_request_template\\.md" docs/copilot-review-playbook.md`
  - `rg -n "^- \\[x\\].*docs/copilot-review-playbook\\.md" docs/copilot-review-playbook.md`
  - `rg -n "^- \\[x\\].*docs/review-gate-policy\\.md" docs/copilot-review-playbook.md`
  - `rg -n "^- \\[x\\].*docs/copilot-triage-taxonomy\\.md" docs/copilot-review-playbook.md`
  - `rg -n "^- \\[x\\].*docs/copilot-rollout-plan\\.md" docs/copilot-review-playbook.md`
  - `rg -n "^- \\[x\\].*docs/copilot-metrics\\.md" docs/copilot-review-playbook.md`
- Expected result: each command returns exactly 1 checklist match.

## Replacement and Completion Step

- Historical unchecked placeholders were replaced by checked references in `Policy Artifact Checklist`.
- Final state:
  - `.github/copilot-instructions.md` is present.
  - `.github/pull_request_template.md` is present.
  - `docs/copilot-review-playbook.md` is present.
  - `docs/review-gate-policy.md` is present.
  - `docs/copilot-triage-taxonomy.md` is present.
  - `docs/copilot-rollout-plan.md` is present.
  - `docs/copilot-metrics.md` is present.

## Operating Flow

- Author opens a pull request using `.github/pull_request_template.md`.
- Copilot generates review comments guided by `.github/copilot-instructions.md`.
- Reviewer classifies each comment using `docs/copilot-triage-taxonomy.md`.
- Reviewer validates high-risk findings with tests, static checks, and code inspection.
- Reviewer applies blocking rules from `docs/review-gate-policy.md`.
- Reviewer writes final decisions with clear rationale before merge approval.

## Escalation Flow

- Escalate all `critical` findings to a human reviewer.
- Do not merge while any `critical` finding is unresolved.
- For critical-path false positives, require documented human rationale and evidence.

## Triage State and Severity Contract

- Severity and triage state are independent dimensions.
- Severity defines urgency and escalation path.
- Triage state defines decision status and evidence quality.
- Precedence rule:
  - If severity is `critical`, route to human escalation regardless of triage state.
  - If triage state is `needs_human_validation`, route to human escalation regardless of severity.

## Triage Ownership and Response Targets

- Ownership:
  - Pull request author: provide first-pass classification and initial evidence.
  - Assigned reviewer: validate classification and enforce gate policy decisions.
  - Code owner or security owner: required approver for `critical` decisions.
- Response targets by severity:
  - `critical`: initial human response within 2 hours.
  - `high`: initial reviewer response within 8 business hours.
  - `medium`: initial reviewer response within 1 business day.
  - `low`: initial reviewer response within 2 business days.
- SLA convention:
  - Business hours are Monday-Friday, 09:00-18:00 UTC.
  - Off-hours critical findings require on-call or next-available human reviewer acknowledgement.

## Rollout and Calibration

- Pilot rollout plan: `docs/copilot-rollout-plan.md`
- Metrics definitions: `docs/copilot-metrics.md`
- Use the week-by-week rollout to sequence enablement and calibration.
- Make expansion decisions only from documented `Expansion Criteria`.
- Record go/no-go rationale in pull request or planning updates.
- Follow issue and PR lifecycle rules from `docs/standards/github-workflow.md`.

## Decision Rationale and Trade-Offs

- Rationale:
  - Keep policy, rollout, and metrics artifacts linked so reviewers can audit decisions end-to-end.
- Trade-offs:
  - Additional documentation overhead in exchange for stronger traceability and lower scope drift.

## Handoff

- Next step:
  - Open a pull request against `dev` and request human review for rollout readiness.
- Objective success criteria:
  - `bun run check` passes.
  - `bun run test` passes.
  - All required policy artifacts remain present and linked.
  - No unresolved `critical` findings are open at merge decision time.

## Known Pitfalls and Anti-Patterns

- Treating Copilot output as merge-ready without validation.
- Accepting unclear PR context that blocks effective review.

## Change Notes (High-Level)

- 2026-02-26 - Added baseline policy artifacts and operating flow for Copilot review.
