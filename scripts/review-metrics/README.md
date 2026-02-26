# Review Metrics Collector

## Purpose

This folder contains a minimal scaffold for collecting Copilot review metrics.

## Usage

- Show help:
  - `bun run review:metrics --help`
- Run with defaults:
  - `bun run review:metrics`
- Run with explicit inputs:
  - `bun run review:metrics --from=2026-02-01 --to=2026-02-28 --format=json`

## Arguments

- `--from=YYYY-MM-DD`
- `--to=YYYY-MM-DD`
- `--format=json|md`

## Output Schema Placeholder

- `report_window`:
  - `from`: string
  - `to`: string
- `metrics`:
  - `copilot_comment_acceptance_rate`: number | null
  - `confirmed_defect_prevention_proxy`: number | null
  - `false_positive_rate`: number | null
  - `review_cycle_time_hours`: number | null
  - `post_merge_bug_rate`: number | null
  - `rework_reopen_rate`: number | null
- `notes`: string[]
