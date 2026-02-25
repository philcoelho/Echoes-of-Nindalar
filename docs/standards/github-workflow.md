---
file_name: github-workflow.md
title: GitHub Workflow
description: Standard workflow for issues and pull requests using GitHub MCP tools instead of GitHub CLI.
doc_type: guideline
scope: "docs/**"
version: 2.0.0
last_updated: 2026-02-25
status: active
tags:
  - domain:engineering
  - language:markdown
  - framework:github-mcp
related_docs:
  - ./doc-template.md
  - ./devlog.md
  - ./superpowers-compliance-checklist.md
---

# GitHub Workflow

## Overview

This document defines the standard GitHub workflow for this project using GitHub MCP operations.
It replaces `gh` CLI-driven flows with MCP-native actions for repository, issue, and pull request management.
The goal is to keep issue-to-PR traceability explicit, reduce review risk, and keep changes small and auditable.

## Goals and Non-Goals

- Goals:
  - Standardize issue and pull request operations through GitHub MCP.
  - Enforce small, reviewable changes with clear linkage between issue and PR.
  - Keep metadata consistent across labels, assignees, branches, and status updates.
- Non-Goals:
  - Define local git commands for coding tasks in detail.
  - Replace the development plan or task decomposition process.
  - Allow direct feature development against `main`.

## Tech Stack

- Languages: Markdown, JSON metadata in MCP descriptors
- Frameworks: Cursor Agent with Superpowers workflow
- Infrastructure: GitHub repository plus `user-github` MCP server

## High-Level Architecture

- Main components:
  - Cursor Agent executes GitHub actions through `CallMcpTool`.
  - GitHub MCP server exposes structured operations for issues and pull requests.
  - Repository branch policy uses `dev` as integration branch and `main` as production branch.
- Typical workflow:
  - Create or refine an issue with labels and assignees.
  - Implement task on a feature branch linked to the issue.
  - Open PR targeting `dev` with traceable summary and test plan.
  - Update PR metadata and status through MCP as review evolves.
  - Merge through approved flow and keep issue/PR state synchronized.

## Domain Concepts

- **Issue Lifecycle** — Opening, labeling, assigning, refining, and closing work units.
- **PR Lifecycle** — Creating, reviewing, updating, and merging branch changes.
- **Issue-PR Linkage** — Explicit relationship between one issue and one implementation PR.
- **MCP Action Step** — A GitHub workflow step mapped to one or more MCP operations.

Core MCP workflow mapping:
- Identity and context:
  - `get_me`
- Issue creation and maintenance:
  - `issue_write`
  - `list_issues`
  - `issue_read`
  - `add_issue_comment`
- Branch and PR flow:
  - `create_branch`
  - `create_pull_request`
  - `update_pull_request`
  - `list_pull_requests`
  - `pull_request_read`
  - `pull_request_review_write`
  - `merge_pull_request`

Prompt-level MCP workflow references:
- `issue_to_fix_workflow`
- `AssignCodingAgent`

## Workflow Steps Using GitHub MCP

- Step 1: Confirm repository and actor context
  - Use: `get_me`
  - Validate: authenticated user, target repository owner/name.
- Step 2: Create or refine the issue
  - Use: `issue_write` or prompt `issue_to_fix_workflow`.
  - Minimum input for `issue_to_fix_workflow`: `owner`, `repo`, `title`, `description`.
  - Optional metadata: `labels`, `assignees`.
- Step 3: Verify issue details before coding
  - Use: `issue_read` and optionally `list_issues`.
  - Validate: scope, acceptance criteria, labels, assignee.
- Step 4: Create feature branch for the issue
  - Use: `create_branch`.
  - Validate: branch naming includes task intent and, when possible, issue reference.
- Step 5: Open PR targeting integration branch
  - Use: `create_pull_request`.
  - Required conventions: base `dev`, semantic title, summary, test plan, and `Closes #<issue>`.
- Step 6: Maintain PR metadata during review
  - Use: `update_pull_request`, `pull_request_read`, and `pull_request_review_write`.
  - Validate: labels/assignee remain aligned with issue and review status.
- Step 7: Merge only after checks and review
  - Use: `merge_pull_request`.
  - Validate: approved review, passing checks, and correct base branch.
- Step 8: Confirm final linkage state
  - Use: `issue_read` and `pull_request_read`.
  - Validate: PR merged and issue status consistent with workflow policy.

## Coding Conventions

- Project structure:
  - Keep process standards under `docs/standards/`.
  - Keep implementation plans under `docs/plans/`.
  - Keep active session traceability under `docs/devlog/`.
- Naming:
  - Issues and PR titles must follow semantic style, for example `feat(scope): message`.
  - Branches should include issue reference when possible, for example `feat/123-short-topic`.
- Metadata:
  - Language for issue and PR titles, descriptions, and comments must be English.
  - PR base branch must be `dev` unless explicitly approved otherwise.
  - Default assignee is `philcoelho` for issues and PRs.
  - PR body must include issue reference, for example `Closes #123`, plus summary and test plan.
  - Labels should be selected from this set:
    - `bug` for broken behavior.
    - `enhancement` for improvements to existing behavior.
    - `feature` for new functionality.
    - `documentation` for docs work.
    - `tests` for test-focused changes.
    - `refactor` for structural code improvements.
    - `question` when additional clarification is needed.
    - `release` for release-oriented PR flow such as `dev` to `main`.
- Error handling:
  - If required metadata is missing, stop and request completion before creating issue or PR.
  - If MCP operation fails, capture error context and retry with corrected parameters.
  - If issue-PR linkage is missing, update PR body and metadata before review.

## Invariants and Critical Rules

- Always use GitHub MCP operations for issue and PR management in agent workflows.
- Always target `dev` as PR base branch unless explicitly approved otherwise.
- Always assign `philcoelho` on issues and PRs unless changed by project decision.
- Always include issue reference in PR body, using `Closes #<number>` and explicit context.
- Never merge unreviewed large PRs that aggregate unrelated tasks.
- If these invariants are violated, traceability drops and review quality degrades.

## Typical Tasks for AI Assistance

This project will be co-authored by Cursor Agents, powered by the superpowers plugin.

- Create issue from approved plan task:
  - Input: title, description, labels, assignee.
  - Expected behavior: create issue with full metadata and return issue URL/number.
  - Validation: issue has correct labels, assignee, and scope.
- Open PR from feature branch:
  - Input: base branch, title, summary, test plan, issue reference.
  - Expected behavior: create PR targeting `dev` and include linkage context.
  - Validation: PR body includes `Closes #<issue>` and review-ready checklist.
- Update review state:
  - Input: PR number and requested metadata updates.
  - Expected behavior: update labels, assignees, and body through MCP.
  - Validation: PR reflects latest task state and review decisions.
- Merge approved PR:
  - Input: PR number after review approval and checks.
  - Expected behavior: merge through MCP and confirm final status.
  - Validation: PR merged and linked issue status is consistent.

## Known Pitfalls and Anti-Patterns

- Using `gh` CLI in agent-driven workflow where MCP is the project standard.
- Creating oversized PRs that combine multiple independent tasks.
- Skipping labels or assignees, which harms triage and queue visibility.
- Opening PRs directly to `main` for regular feature work.
- Assuming auto-close behavior always works when base branch is not default.

## Change Notes (High-Level)

- 2026-02-25 - Standard rewritten to align with documentation template and migrate workflow from `gh` CLI to GitHub MCP operations.
- 2026-02-21 - Initial workflow focused on `gh` CLI commands.
