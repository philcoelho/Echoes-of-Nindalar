# AGENTS Operating Guide

This file defines the authoritative agent workflow for Echoes of Nindalar.
Use it as the entry point before planning, implementation, documentation, and GitHub operations.

## Source of Truth

Follow these documents in this order:

1. `docs/standards/superpowers-compliance-checklist.md`
2. `docs/standards/github-workflow.md`
3. `docs/standards/doc-template.md`
4. `docs/standards/devlog.md`
5. Active design and implementation plans under `docs/plans/`

If two instructions conflict, prefer the most specific document for the current artifact.

## Project Baseline

- Package manager: Bun
- Lint and format: Biome (single source of truth)
- Pre-commit gate: Husky + lint-staged
- Testing: Vitest
- GitHub process: MCP operations (not GitHub CLI)

## Required Development Lifecycle

1. Confirm design is approved in `docs/plans/*-design.md`.
2. Confirm implementation plan exists in `docs/plans/*-implementation.md`.
3. Execute tasks in order with small, testable increments.
4. Keep issue and PR lifecycle aligned with `docs/standards/github-workflow.md`.
5. Update devlog entries when work context requires traceability.
6. Run compliance checks before claiming completion.

## Documentation Rules

- New or updated docs must follow `docs/standards/doc-template.md`.
- Use frontmatter and mandatory section structure.
- Avoid tables, emojis, and decorative formatting.
- Keep content concise, explicit, and machine-parseable.

## GitHub Workflow Rules

- Use GitHub MCP operations for issues and pull requests.
- Base branch for feature PRs is `dev`.
- Use semantic issue and PR titles.
- Keep labels and assignee metadata consistent.
- Include issue linkage in PR body (for example `Closes #123`).

## Quality Gates Before Handoff

- Run and pass relevant tests.
- Run and pass Biome checks.
- Ensure pre-commit hooks are active and healthy.
- Validate against `docs/standards/superpowers-compliance-checklist.md`.
- Provide explicit next step and success criteria.

## Agent Behavior Guidelines

- Do not start implementation before design and plan gates pass.
- Do not expand scope beyond approved plan tasks.
- Do not replace Bun/Biome/Husky standards without explicit approval.
- Keep changes reviewable and avoid large mixed-purpose commits.
