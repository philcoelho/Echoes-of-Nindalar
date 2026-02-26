---
file_name: copilot-metrics.md
title: Copilot Review Metrics
description: Definitions and data sources for Copilot review quality metrics.
doc_type: feature
scope: "docs/**, scripts/review-metrics/**"
version: 1.0.0
last_updated: 2026-02-26
status: active
tags:
  - domain:developer-experience
  - language:markdown
  - framework:github-copilot
related_docs:
  - ./copilot-review-playbook.md
  - ./copilot-rollout-plan.md
  - ./review-gate-policy.md
---

# Overview

This document defines pilot metrics for Copilot-assisted pull request review.

## Goals and Non-Goals

- Goals:
  - Standardize metric formulas used during pilot evaluation.
  - Keep data-source mapping explicit and auditable.
- Non-Goals:
  - Build a production analytics pipeline in this phase.
  - Replace human review judgment with single metric thresholds.

## Tech Stack

- Languages: Markdown, TypeScript
- Frameworks: GitHub Copilot, Bun
- Infrastructure: GitHub pull request metadata, issue metadata, CI outputs

## High-Level Architecture

- Metric definitions live in this document.
- Collection scaffold is implemented in `scripts/review-metrics/collect-metrics.ts`.
- Rollout and decision gates consume these metrics via `docs/copilot-rollout-plan.md`.

## Domain Concepts

- **Reporting Window** — Fixed date interval used for metric computation.
- **Triage Outcome** — Final classification assigned to a Copilot finding.
- **Bug Leakage** — Defects discovered after merge and linked to merged pull requests.

## Coding Conventions

- Project structure:
  - Keep metric definitions in `docs/` and collection code in `scripts/review-metrics/`.
- Naming:
  - Use snake_case metric names and explicit unit suffixes when needed.
- Error handling:
  - Treat missing source mappings as invalid metric definitions.

## Decision Rationale and Trade-Offs

- Rationale:
  - Formula-first definitions improve repeatability and reduce subjective interpretation.
- Trade-offs:
  - Proxy metrics provide directional quality signals but do not prove absolute defect prevention.

## Bootstrap History (Historical Note)

- Initial draft listed metric names with unresolved placeholder markers.
- Marker verification used a placeholder-marker search command on this file.
- Historical verification result before replacement: expected 5 matches, observed 5 matches.
- Current-state rule: active definitions are in `Metric Definitions`.

## Metric Definitions

- `copilot_comment_acceptance_rate`
  - Formula: accepted_copilot_comments / total_copilot_comments
  - Data sources:
    - Copilot review comments from pull request timeline
    - Reviewer resolution outcome labels (`accepted`, `dismissed`)

- `confirmed_defect_prevention_proxy`
  - Formula: confirmed_pre_merge_defects / total_actionable_confirmed_findings
  - Data sources:
    - Triage state records from `docs/copilot-triage-taxonomy.md`
    - Pull request fixes linked to Copilot comments before merge

- `false_positive_rate`
  - Formula: false_positive_findings / total_triaged_findings
  - Data sources:
    - Triage records classified as `false_positive`
    - Total triaged findings in the same reporting window

- `review_cycle_time_hours`
  - Formula: median((pr_review_completed_at - pr_opened_at) in hours) over reporting window
  - Unit: hours
  - Data sources:
    - Pull request opened timestamp
    - Pull request approved or merged timestamp

- `post_merge_bug_rate`
  - Formula: post_merge_bugs_linked_to_prs / merged_pr_count
  - Data sources:
    - Issues labeled as post-merge defects
    - Pull request links in issue metadata

- `rework_reopen_rate`
  - Formula: reopened_or_rework_prs / merged_pr_count
  - Data sources:
    - Pull requests reopened after initial approval
    - Follow-up rework pull requests linked to prior merged pull requests

## Invariants and Critical Rules

- Every metric must include one explicit formula and one or more explicit data sources.
- Metrics must be computed on consistent reporting windows.
- Expansion decisions must not use metrics with missing data lineage.

## Issue and PR Workflow Alignment

- Keep metrics updates traceable through GitHub MCP issue and pull request operations.
- Use base branch `dev` for metrics-related pull requests.
- Include issue linkage in pull request descriptions for metrics changes.

## Typical Tasks for AI Assistance

This project will be co-authored by Cursor Agents, powered by the superpowers plugin.

- Validate metric definitions:
  - Input: metrics doc and collection scaffold
  - Expected behavior: confirm each metric has formula + source mapping
  - Validation: no unresolved placeholder markers remain

## Known Pitfalls and Anti-Patterns

- Measuring comment volume instead of confirmed outcome quality.
- Mixing reporting windows across metrics.
- Interpreting proxy metrics as absolute quality guarantees.

## Change Notes (High-Level)

- 2026-02-26 - Added baseline metric formulas and source mappings.

## Handoff

- Next step:
  - Open a metrics-readiness pull request against `dev` with linked issue context.
- Objective success criteria:
  - `bun run check` passes.
  - `bun run test` passes.
  - Metric definitions include formulas and data sources for rollout expansion decisions.
