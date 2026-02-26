---
file_name: copilot-rollout-plan.md
title: Copilot Rollout Plan
description: Four-week pilot rollout plan for Copilot review with calibration and expansion criteria.
doc_type: feature
scope: "docs/**, .github/**"
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

This document defines the pilot rollout timeline for Copilot review operations.

## Goals and Non-Goals

- Goals:
  - Roll out Copilot review in a controlled 4-week pilot.
  - Calibrate signal quality before broader adoption.
- Non-Goals:
  - Roll out to all repositories in this phase.
  - Replace human reviewer accountability.

## Tech Stack

- Languages: Markdown, YAML
- Frameworks: GitHub Copilot, GitHub CodeQL
- Infrastructure: GitHub pull requests, branch protection, review policy docs

## High-Level Architecture

- Week-based rollout controls policy readiness, enablement, measurement, and calibration.
- Deterministic gates and triage taxonomy are prerequisites for pilot activation.
- Expansion decision uses bug-leakage and false-positive trend criteria.

## Domain Concepts

- **Pilot Baseline** — Initial measurement point for bug leakage and false-positive rate.
- **Calibration Change** — Update to prompts, triage rules, or gating policy to reduce noise.
- **Expansion Decision** — Go/no-go outcome for enabling rollout beyond pilot scope.

## Coding Conventions

- Project structure:
  - Keep rollout policy in `docs/` and workflow enforcement in `.github/workflows/`.
- Naming:
  - Use explicit week labels (`Week 1` to `Week 4`) and stable metric terms.
- Error handling:
  - Keep threshold criteria explicit and block expansion when criteria are not met.

## Decision Rationale and Trade-Offs

- Rationale:
  - A 4-week staged rollout limits risk while collecting enough signal quality data.
- Trade-offs:
  - Slower adoption speed in exchange for lower regression risk and higher reviewer trust.

## Bootstrap History (Historical Note)

- Initial draft used unresolved placeholder markers under timeline headings.
- Marker verification used a placeholder-marker search command on this file.
- Historical verification result before replacement: expected 4 matches, observed 4 matches.
- Current-state rule: active policy no longer uses placeholder markers and is defined only in `Pilot Timeline` and `Expansion Criteria`.

## Pilot Timeline

### Week 1: Policy and Configuration Setup

- Publish and validate:
  - `.github/copilot-instructions.md`
  - `.github/pull_request_template.md`
  - `.github/workflows/codeql.yml`
  - `docs/review-gate-policy.md`
  - `docs/copilot-triage-taxonomy.md`
- Ensure branch protection requires CodeQL status checks.

### Week 2: Pilot Auto-Review Enablement

- Enable Copilot review for pilot pull requests on `dev`.
- Require triage classification and evidence for all Copilot comments.
- Track first-response SLA adherence by severity.

### Week 3: Metrics Capture and Top False Positives

- Capture weekly pilot metrics:
  - copilot comment acceptance rate
  - false-positive rate
  - review cycle time (hours)
  - post-merge bug leakage count
- Publish top false-positive patterns and proposed tuning actions.

### Week 4: Calibration and Expansion Decision

- Apply calibration updates for high-noise or low-value comment patterns.
- Re-run week 3 metrics after calibration changes.
- Produce expansion recommendation with go/no-go decision and rationale.

## Expansion Criteria

- Expansion is allowed only when all criteria are met:
  - Bug leakage trend does not increase versus pilot baseline for 2 consecutive weeks.
  - False-positive rate decreases by at least 20% from week 2 to week 4.
  - No unresolved `critical` code scanning findings remain open in pilot pull requests.
  - SLA adherence is at least 90% for `critical` and `high` first responses.

## Issue and PR Workflow Alignment

- Track rollout updates using GitHub MCP issue and pull request operations.
- Keep rollout PR base branch as `dev`.
- Include issue linkage in rollout-related PR descriptions.

## Invariants and Critical Rules

- Do not expand rollout when bug leakage worsens against baseline.
- Do not expand rollout with unresolved critical findings.
- Keep human approval mandatory for critical-path false-positive dismissal.

## Typical Tasks for AI Assistance

This project will be co-authored by Cursor Agents, powered by the superpowers plugin.

- Validate rollout readiness:
  - Input: rollout plan, playbook, and gate policy
  - Expected behavior: confirm week gates and expansion criteria are internally consistent
  - Validation: no missing thresholds and no contradictory criteria

## Known Pitfalls and Anti-Patterns

- Expanding scope before calibration evidence is stable.
- Treating comment volume as a quality metric.
- Ignoring recurring false-positive patterns.

## Change Notes (High-Level)

- 2026-02-26 - Added 4-week pilot rollout and expansion criteria.

## Handoff

- Next step:
  - Open a rollout-readiness pull request against `dev` with linked issue context.
- Objective success criteria:
  - `bun run check` passes.
  - `bun run test` passes.
  - All `Expansion Criteria` are measurable from documented metrics.
