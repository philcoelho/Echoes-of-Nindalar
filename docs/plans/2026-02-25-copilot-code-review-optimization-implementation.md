---
file_name: 2026-02-25-copilot-code-review-optimization-implementation.md
title: Copilot Code Review Optimization Implementation Plan
description: Task-by-task plan to implement a signal-fusion pull request review workflow using GitHub Copilot, static checks, and human triage.
doc_type: feature
scope: ".github/**, docs/**"
version: 1.0.0
last_updated: 2026-02-25
status: active
tags:
  - domain:developer-experience
  - language:markdown
  - framework:github-copilot
related_docs:
  - ../standards/doc-template.md
  - ../standards/superpowers-compliance-checklist.md
  - ../standards/github-workflow.md
  - ./2026-02-25-copilot-code-review-optimization-design.md
---

# Copilot Code Review Optimization Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Implement a signal-fusion review workflow that increases bug and regression detection quality in pull requests.

**Architecture:** Keep Copilot comments as advisory input, combine them with deterministic quality signals (CodeQL, lint, tests), and enforce human triage for critical paths. Store operational policy in `.github/` and playbooks under `docs/` so the process is visible, auditable, and easy to calibrate.

**Tech Stack:** GitHub Copilot Code Review, GitHub CodeQL, Markdown policy docs, Bun scripts, Biome

---

## Overview

This plan implements the approved design in small, reviewable steps.
Each task defines exact file paths, one-action-at-a-time steps, verification commands, and commit boundaries.
The rollout starts with repository policy artifacts, then quality gates, then operational metrics and calibration.

## Goals and Non-Goals

- Goals:
  - Enable repository-level Copilot review instructions focused on bugs and regressions.
  - Standardize PR context collection and review triage rules.
  - Add deterministic quality checks and define merge blocking criteria.
  - Establish measurable review quality metrics for 30/60/90 day checkpoints.
- Non-Goals:
  - Replace human review for sensitive code paths.
  - Roll out to every repository in a single batch.
  - Introduce custom automation unrelated to review quality outcomes.

## Coding Conventions

- Project structure:
  - Keep policy and review config files in `.github/`.
  - Keep process guides and rollout notes in `docs/`.
- Naming:
  - Use explicit file names for intent, for example `copilot-review-playbook.md`.
  - Keep metric names stable across docs and scripts.
- Error handling:
  - Treat failed quality checks as blocking by default.
  - Require explicit rationale for risk acceptance and false-positive dismissal.
- Tooling:
  - Use Bun for scripts and task execution.
  - Keep Biome as the default lint/format source of truth.

## Invariants and Critical Rules

- Keep the mandatory implementation-plan header block unchanged.
- Do not merge critical-path changes without human approval.
- Copilot comments require validation before action on security or data-integrity concerns.
- Maintain concise, repository-specific Copilot instructions to reduce review noise.
- Keep rollout scoped to pilot first, then expand using measured evidence.

## Typical Tasks for AI Assistance

This project will be co-authored by Cursor Agents, powered by the superpowers plugin.

- Create and refine review instructions:
  - Input: repository standards and recurrent defects.
  - Expected behavior: produce concise instructions with high-signal checks.
- Maintain review workflow docs:
  - Input: team feedback and observed false positives.
  - Expected behavior: update triage and escalation rules with explicit rationale.
- Validate readiness before rollout expansion:
  - Input: metrics snapshots from pilot period.
  - Expected behavior: compare to baseline and recommend calibrated changes.

## Issue and PR Workflow Compliance

- Use GitHub MCP operations for issue and pull request lifecycle updates.
- Create one issue per implementation task group to keep PRs reviewable.
- Use semantic titles and keep PR base branch as `dev`.
- Include issue linkage in PR body (for example `Closes #<issue-number>`).
- Keep labels and assignee metadata aligned with `docs/standards/github-workflow.md`.

## Implementation Tasks

### Task 1: Create baseline repository review policy files

**Files:**
- Create: `.github/copilot-instructions.md`
- Create: `.github/pull_request_template.md`
- Create: `docs/copilot-review-playbook.md`

**Step 1: Create failing policy checklist note**

Create `docs/copilot-review-playbook.md` with a temporary checklist that marks all required policy artifacts as missing.

**Step 2: Verify failing state exists**

Run: `rg "MISSING|TODO" docs/copilot-review-playbook.md`
Expected: matches show unresolved checklist markers.

**Step 3: Add minimal Copilot instructions**

Write `.github/copilot-instructions.md` with short headings and bullet points for:
- input validation and error handling
- auth/authz and sensitive data
- regression and performance risk hints
- actionable comment format ("why this matters" + "suggested action")

**Step 4: Add minimal PR template**

Write `.github/pull_request_template.md` with required sections:
- context
- regression risk level
- test strategy
- security notes
- evidence links

**Step 5: Update checklist to passing**

Update `docs/copilot-review-playbook.md` by replacing temporary missing markers with completed artifact references.

**Step 6: Commit**

Run:
```bash
git add .github/copilot-instructions.md .github/pull_request_template.md docs/copilot-review-playbook.md
git commit -m "feat(review): add copilot policy baseline"
```

### Task 2: Define deterministic quality-signal gates

**Files:**
- Create: `.github/workflows/codeql.yml`
- Modify: `docs/copilot-review-playbook.md`
- Create: `docs/review-gate-policy.md`

**Step 1: Write failing gate definition checklist**

In `docs/review-gate-policy.md`, add required gates and mark them as not yet enforceable.

**Step 2: Verify failing gate checklist**

Run: `rg "not yet enforceable|TODO" docs/review-gate-policy.md`
Expected: unresolved gate markers are present.

**Step 3: Add minimal CodeQL workflow**

Create `.github/workflows/codeql.yml` for pull requests with baseline language config used by the repository.

**Step 4: Define blocking policy**

Update `docs/review-gate-policy.md` with severity ordering and blocking rules:
- block merge on unresolved critical findings
- require human rationale for false-positive dismissal in critical paths

**Step 5: Link policy from playbook**

Modify `docs/copilot-review-playbook.md` to reference `docs/review-gate-policy.md` and escalation flow.

**Step 6: Commit**

Run:
```bash
git add .github/workflows/codeql.yml docs/copilot-review-playbook.md docs/review-gate-policy.md
git commit -m "feat(review): define deterministic gate policy"
```

### Task 3: Add triage workflow for Copilot comments

**Files:**
- Modify: `docs/copilot-review-playbook.md`
- Create: `docs/copilot-triage-taxonomy.md`

**Step 1: Write failing taxonomy draft**

Create `docs/copilot-triage-taxonomy.md` with placeholder labels only and no decision criteria.

**Step 2: Verify failing taxonomy state**

Run: `rg "placeholder|TODO" docs/copilot-triage-taxonomy.md`
Expected: unresolved taxonomy placeholders are found.

**Step 3: Implement triage states and criteria**

Update `docs/copilot-triage-taxonomy.md` with concrete classification:
- `actionable_confirmed`
- `needs_human_validation`
- `false_positive`

Include required evidence examples per class.

**Step 4: Integrate taxonomy in playbook**

Update `docs/copilot-review-playbook.md` with triage flow, ownership, and expected response time by severity.

**Step 5: Commit**

Run:
```bash
git add docs/copilot-review-playbook.md docs/copilot-triage-taxonomy.md
git commit -m "feat(review): add copilot triage taxonomy"
```

### Task 4: Define pilot rollout and calibration loop

**Files:**
- Create: `docs/copilot-rollout-plan.md`
- Modify: `docs/copilot-review-playbook.md`

**Step 1: Create failing rollout draft**

Write `docs/copilot-rollout-plan.md` with timeline headings only and missing success thresholds.

**Step 2: Verify failing rollout draft**

Run: `rg "missing threshold|TODO" docs/copilot-rollout-plan.md`
Expected: unresolved threshold markers are present.

**Step 3: Implement 4-week pilot rollout**

Define week-by-week rollout:
- week 1: policy/config setup
- week 2: pilot auto-review enablement
- week 3: metrics capture and top false positives
- week 4: calibration and expansion decision

**Step 4: Add explicit expansion criteria**

Add objective conditions to expand pilot scope, including bug leakage trend and false-positive reduction.

**Step 5: Link rollout in playbook**

Update `docs/copilot-review-playbook.md` with a "Rollout and Calibration" section referencing the rollout doc.

**Step 6: Commit**

Run:
```bash
git add docs/copilot-rollout-plan.md docs/copilot-review-playbook.md
git commit -m "docs(review): add pilot rollout calibration plan"
```

### Task 5: Establish review quality metrics and reporting routine

**Files:**
- Create: `docs/copilot-metrics.md`
- Create: `scripts/review-metrics/README.md`
- Create: `scripts/review-metrics/collect-metrics.ts`
- Modify: `package.json`

**Step 1: Write failing metrics definition**

Create `docs/copilot-metrics.md` with metric names only and missing formulas.

**Step 2: Verify failing metric definition**

Run: `rg "formula pending|TODO" docs/copilot-metrics.md`
Expected: missing formula markers are found.

**Step 3: Implement metric definitions**

Define formulas and data sources for:
- copilot comment acceptance rate
- confirmed defect prevention proxy
- review cycle time
- post-merge bug rate
- rework/reopen rate

**Step 4: Add minimal metrics collector scaffold**

Create `scripts/review-metrics/collect-metrics.ts` with argument parsing and output schema placeholders.

**Step 5: Add Bun script entry**

Modify `package.json` with:
- `review:metrics` -> `bun run scripts/review-metrics/collect-metrics.ts`

**Step 6: Verify script wiring**

Run: `bun run review:metrics --help`
Expected: command executes and prints usage/help output.

**Step 7: Commit**

Run:
```bash
git add docs/copilot-metrics.md scripts/review-metrics/README.md scripts/review-metrics/collect-metrics.ts package.json
git commit -m "feat(review): add metrics baseline scaffold"
```

### Task 6: Final verification and handoff readiness

**Files:**
- Modify: `docs/copilot-review-playbook.md`
- Modify: `docs/copilot-rollout-plan.md`
- Modify: `docs/copilot-metrics.md`

**Step 1: Run quality checks**

Run:
- `bun run check`
- `bun run test`

Expected: no new quality regressions introduced by the workflow artifacts and scripts.

**Step 2: Validate plan/design alignment**

Manually verify each implemented artifact aligns with `docs/plans/2026-02-25-copilot-code-review-optimization-design.md`.

Expected: no scope drift against approved design goals and non-goals.

**Step 3: Validate compliance checklist**

Run through `docs/standards/superpowers-compliance-checklist.md` and record pass/fail for all mandatory items.

Expected: all mandatory items pass before requesting PR review.

**Step 4: Commit**

Run:
```bash
git add docs/copilot-review-playbook.md docs/copilot-rollout-plan.md docs/copilot-metrics.md
git commit -m "docs(review): finalize workflow handoff criteria"
```

## Known Pitfalls and Anti-Patterns

- Expanding beyond pilot scope before evidence-based calibration.
- Treating comment count as quality without confirmation of defect prevention.
- Accepting unresolved high-severity findings due to schedule pressure.
- Writing broad Copilot instructions that create noise and lower reviewer trust.

## Change Notes (High-Level)

- 2026-02-25 - Initial implementation plan created from approved signal-fusion design.
