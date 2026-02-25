---
file_name: 2026-02-25-echoes-of-nindalar-implementation.md
title: Echoes of Nindalar Implementation Plan
description: Task-by-task implementation plan for the Echoes of Nindalar MVP.
doc_type: project
scope: "docs/plans/**"
version: 1.0.0
last_updated: 2026-02-25
status: active
tags:
  - domain:implementation
  - language:typescript
  - framework:tanstack-start
related_docs:
  - ../standards/doc-template.md
  - ../standards/superpowers-compliance-checklist.md
  - ../standards/github-workflow.md
  - ./2026-02-25-echoes-of-nindalar-design.md
---

# Echoes of Nindalar Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build an MVP web solo RPG gamebook with irreversible action resolution, Supabase-backed persistence, and a playable first story loop.

**Architecture:** TanStack Start handles UI and server functions; Supabase Auth/Postgres/RLS handles identity and storage. Game rules run in server functions, while critical action commits run in a short transactional RPC to guarantee idempotency and no-scum-load behavior.

**Tech Stack:** TanStack Start, Supabase Auth/Postgres, TailwindCSS, shadcn/ui, Vitest, Biome, Husky, lint-staged, Bun

## Overview

This plan defines a sequential, test-first path to implement the approved MVP architecture.
It is intentionally granular to support reliable execution by Cursor agents and Superpowers workflows.
Each task includes concrete files, commands, expected outcomes, and commit boundaries.

## Goals and Non-Goals

- Goals:
  - Implement the complete MVP gameplay loop from auth to irreversible action resolution.
  - Enforce state integrity with idempotency and versioned commits.
  - Deliver a documented and testable baseline for future content expansion.
- Non-Goals:
  - Introduce features outside the approved MVP design.
  - Skip tests or merge large unverified changes.
  - Replace transactional guarantees with best-effort write paths.

## Coding Conventions

- Project structure:
  - Follow task-defined paths exactly.
  - Keep server orchestration, rules, and data adapters separated.
- Naming:
  - Use clear domain names for functions, files, and tests.
  - Keep mutation functions verb-first and specific.
- Error handling:
  - Validate inputs before mutation calls.
  - Return explicit unauthorized and conflict failures where applicable.
  - Abort execution when migration or test commands fail.
- Tooling:
  - Use Biome as the default lint and format tool.
  - Do not add ESLint or Prettier unless explicitly requested.
  - Use Husky and lint-staged for pre-commit quality gates.

## Invariants and Critical Rules

- Keep this mandatory writing-plans header block intact in implementation plan files.
- Maintain strict task ordering unless plan revision is explicitly approved.
- Apply test-first cycles per task (fail, implement minimal, pass).
- Preserve anti-scum-load guarantees in all action write paths.
- Keep Biome as the single formatter/linter source of truth.
- Keep pre-commit hooks active through Husky and lint-staged.
- Use GitHub MCP workflow for issue and PR lifecycle per `docs/standards/github-workflow.md`.
- Stop and update this plan if architecture assumptions change.

## Typical Tasks for AI Assistance

This project will be co-authored by Cursor Agents, powered by the superpowers plugin.

- Execute plan tasks:
  - Input: task number and current repository status.
  - Expected behavior: implement only current task scope and verify results.
- Validate compliance:
  - Input: updated plan or execution progress.
  - Expected behavior: confirm checklist and invariant adherence before handoff.
- Maintain plan quality:
  - Input: requested plan changes.
  - Expected behavior: update tasks with concrete files, commands, and pass criteria.
- Maintain GitHub workflow compliance:
  - Input: active task and repository state.
  - Expected behavior: ensure issue mapping, PR base branch `dev`, and metadata follow `github-workflow.md`.

## Issue Mapping and Milestones

Use this mapping to create one issue per macro task through GitHub MCP, keeping PRs small and reviewable.

Issue creation conventions:
- Assignee: `philcoelho`
- Base labels: one functional label plus `tests` when quality gate is part of scope
- PR base branch: `dev`
- PR body must include issue linkage, for example `Closes #<issue-number>`

Milestone M1 - Foundation and Tooling:
- Task 1 issue:
  - Suggested title: `chore(setup): scaffold app with bun biome husky and lint-staged`
  - Labels: `feature`, `tests`
  - DoD: app scaffolded, Bun active, Biome initialized, Husky and lint-staged configured, baseline checks executable.
- Task 2 issue:
  - Suggested title: `chore(styling): configure tailwind baseline`
  - Labels: `enhancement`
  - DoD: global Tailwind directives active and route baseline styling verified.
- Task 3 issue:
  - Suggested title: `feat(ui): initialize shadcn and add base components`
  - Labels: `feature`
  - DoD: shadcn initialized and first UI primitives integrated in route.

Milestone M2 - Backend Core and Integrity:
- Task 4 issue:
  - Suggested title: `chore(config): add supabase env contracts`
  - Labels: `feature`, `tests`
  - DoD: env reader implemented with failing-first test and passing validation.
- Task 5 issue:
  - Suggested title: `feat(db): create schema rls and commit-action rpc`
  - Labels: `feature`
  - DoD: migrations apply cleanly, RLS policies enforce ownership, RPC commit path created.
- Task 6 issue:
  - Suggested title: `feat(auth): implement server auth guards`
  - Labels: `feature`, `tests`
  - DoD: guard behavior tested and protected mutation paths enforce auth.
- Task 7 issue:
  - Suggested title: `feat(engine): implement core outcome rules`
  - Labels: `feature`, `tests`
  - DoD: outcome tiers implemented and rule tests passing.
- Task 8 issue:
  - Suggested title: `feat(engine): implement resolve-choice hybrid transaction flow`
  - Labels: `feature`, `tests`
  - DoD: server function resolves choice, commits atomically, and returns player-safe log.

Milestone M3 - Playable Slice:
- Task 9 issue:
  - Suggested title: `feat(gameplay): build mvp scene interface`
  - Labels: `feature`, `tests`
  - DoD: playable scene UI rendered with choices, status, and action log components.
- Task 10 issue:
  - Suggested title: `feat(content): seed first authored story arc`
  - Labels: `feature`
  - DoD: seed data loaded and at least one branch playable end-to-end.

Milestone M4 - Quality and Handoff:
- Task 11 issue:
  - Suggested title: `test(quality): add mvp validation scripts and matrix`
  - Labels: `tests`, `documentation`
  - DoD: validation scripts stable, quality matrix documented, pre-commit behavior verified.
- Task 12 issue:
  - Suggested title: `docs(handoff): publish architecture and authoring guides`
  - Labels: `documentation`
  - DoD: README, architecture guide, and content authoring guide published and aligned with standards.

Execution rule:
- Start work on a task only after its issue exists and is validated against `docs/standards/github-workflow.md`.

## Implementation Tasks

### Task 1: Scaffold app and baseline tooling

**Files:**
- Create: `package.json` (via scaffold command)
- Create: `src/**/*` (framework scaffold output)
- Create: `vite.config.*` and TS config files (framework scaffold output)
- Create: `biome.json` (Biome configuration)
- Create: `.husky/pre-commit`

**Step 1: Scaffold project**

Run: `bunx create-start-app .`
Expected: project files created in repository root.

**Step 2: Install dependencies**

Run: `bun install`
Expected: `bun.lock` and `node_modules` installed without errors.

**Step 3: Start dev server smoke test**

Run: `bun run dev`
Expected: app starts and serves a default page.

**Step 4: Install and initialize Biome**

Run:
```bash
bun add -d -E @biomejs/biome
bunx @biomejs/biome init
```
Expected: Biome dependency installed and `biome.json` created.

**Step 5: Verify Biome check baseline**

Run: `bunx @biomejs/biome check .`
Expected: command executes and reports baseline issues (if any) for next tasks to address.

**Step 6: Install Husky and lint-staged**

Run:
```bash
bun add -d -E husky lint-staged
```
Expected: Husky and lint-staged dev dependencies installed.

**Step 7: Initialize Husky**

Run: `bunx husky init`
Expected: `.husky/` is created and `prepare` script is present in `package.json`.

**Step 8: Configure pre-commit hook and lint-staged**

Update:
- `.husky/pre-commit` to run `bunx lint-staged`
- `package.json` with a `lint-staged` config that runs Biome on staged files

Suggested `lint-staged` command:
- `bunx @biomejs/biome check --write`

Expected: commits trigger staged-file validation and safe auto-fixes.

**Step 9: Commit**

Run:
```bash
git add .
git commit -m "chore: scaffold tanstack start app baseline"
```

### Task 2: Configure TailwindCSS and app styling baseline

**Files:**
- Modify: `src/styles/app.css` (or framework global stylesheet path)
- Modify: `tailwind.config.*` (if not already present)
- Modify: `postcss.config.*` (if not already present)

**Step 1: Write failing visual expectation test note**

Create note in `docs/plans/qa-checklist.md` with: "App root should render Tailwind utility classes correctly."

**Step 2: Add Tailwind directives**

Add to global stylesheet:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**Step 3: Add a visible utility class check**

Render a root container with Tailwind classes in the home route.

**Step 4: Verify**

Run: `bun run dev`
Expected: utility styling visible in browser.

**Step 5: Commit**

Run:
```bash
git add .
git commit -m "chore: configure tailwind base styling"
```

### Task 3: Install and initialize shadcn/ui

**Files:**
- Create/Modify: `components.json` (shadcn config)
- Create: `src/components/ui/button.tsx`
- Create: `src/components/ui/card.tsx`
- Modify: route component using new UI primitives

**Step 1: Initialize shadcn**

Run: `bunx shadcn@latest init`
Expected: config and aliases validated/created.

**Step 2: Add first components**

Run: `bunx shadcn@latest add button card`
Expected: component files generated under `src/components/ui`.

**Step 3: Wire components in home route**

Use `Button` and `Card` in one route.

**Step 4: Verify**

Run: `bun run dev`
Expected: route renders shadcn components without runtime errors.

**Step 5: Commit**

Run:
```bash
git add .
git commit -m "feat: add shadcn ui primitives"
```

### Task 4: Configure Supabase project connectivity and env contracts

**Files:**
- Create: `.env.example`
- Create: `src/lib/supabase/client.ts`
- Create: `src/lib/supabase/server.ts`
- Create: `src/lib/env.ts`

**Step 1: Write failing env validation test**

Create: `src/lib/env.test.ts`
```ts
import { describe, expect, it } from 'vitest'
import { readEnv } from './env'

describe('env', () => {
  it('throws when required supabase vars are missing', () => {
    expect(() => readEnv({} as NodeJS.ProcessEnv)).toThrow()
  })
})
```

**Step 2: Run test to verify failure**

Run: `bunx vitest run src/lib/env.test.ts`
Expected: FAIL because `readEnv` does not exist yet.

**Step 3: Implement minimal env reader**

Create `src/lib/env.ts` exporting `readEnv` with required keys:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

**Step 4: Re-run test**

Run: `bunx vitest run src/lib/env.test.ts`
Expected: PASS.

**Step 5: Commit**

Run:
```bash
git add .
git commit -m "chore: add supabase env contracts"
```

### Task 5: Define database schema and RLS policies

**Files:**
- Create: `supabase/migrations/0001_initial_schema.sql`
- Create: `supabase/migrations/0002_rls_policies.sql`
- Create: `supabase/migrations/0003_rpc_commit_action.sql`

**Step 1: Create schema migration**

Add tables:
- `characters`
- `campaign_states`
- `scenes`
- `choices`
- `action_logs`
- supporting indexes and foreign keys.

**Step 2: Create RLS migration**

Enable RLS and add authenticated ownership policies using `(select auth.uid())`.

**Step 3: Create RPC migration**

Create transactional function `commit_resolved_action(...)` that:
- checks ownership and state version
- ensures `action_id` idempotency
- writes state + log
- increments version

**Step 4: Verify migrations**

Run: `supabase db reset` (or project migration command)
Expected: migrations apply cleanly.

**Step 5: Commit**

Run:
```bash
git add supabase/migrations
git commit -m "feat: add schema rls and action commit rpc"
```

### Task 6: Implement auth guards and campaign ownership checks

**Files:**
- Create: `src/server/auth/get-user.ts`
- Create: `src/server/auth/require-user.ts`
- Modify: protected routes and server functions

**Step 1: Write failing auth guard test**

Create: `src/server/auth/require-user.test.ts`
```ts
import { describe, expect, it } from 'vitest'
import { requireUser } from './require-user'

describe('requireUser', () => {
  it('throws when no user exists', async () => {
    await expect(requireUser(null as any)).rejects.toThrow()
  })
})
```

**Step 2: Run test to verify failure**

Run: `bunx vitest run src/server/auth/require-user.test.ts`
Expected: FAIL until helper exists.

**Step 3: Implement minimal guard**

Create `requireUser` to throw unauthorized error when user is absent.

**Step 4: Re-run test**

Run: `bunx vitest run src/server/auth/require-user.test.ts`
Expected: PASS.

**Step 5: Commit**

Run:
```bash
git add .
git commit -m "feat: add auth guard for protected actions"
```

### Task 7: Implement game rule engine (pure functions)

**Files:**
- Create: `src/server/game/rules/types.ts`
- Create: `src/server/game/rules/roll.ts`
- Create: `src/server/game/rules/resolve-outcome.ts`
- Test: `src/server/game/rules/resolve-outcome.test.ts`

**Step 1: Write failing tests for outcome tiers**

Add cases for critical/success/partial/severe.

**Step 2: Run tests to verify failure**

Run: `bunx vitest run src/server/game/rules/resolve-outcome.test.ts`
Expected: FAIL.

**Step 3: Implement minimal resolution functions**

Implement deterministic formulas based on input roll/modifier/difficulty.

**Step 4: Re-run tests**

Run: `bunx vitest run src/server/game/rules/resolve-outcome.test.ts`
Expected: PASS.

**Step 5: Commit**

Run:
```bash
git add src/server/game/rules
git commit -m "feat: implement core outcome resolution engine"
```

### Task 8: Implement resolve-choice server function (hybrid flow)

**Files:**
- Create: `src/server/functions/resolve-choice.ts`
- Create: `src/server/data/commit-resolved-action.ts`
- Modify: route/action integration where choice submission occurs
- Test: `src/server/functions/resolve-choice.test.ts`

**Step 1: Write failing integration-style test**

Test should assert:
- ownership check
- rule resolution call
- RPC commit call
- returned player-facing action log string.

**Step 2: Run test to verify failure**

Run: `bunx vitest run src/server/functions/resolve-choice.test.ts`
Expected: FAIL.

**Step 3: Implement minimal server function**

Use `createServerFn({ method: 'POST' })` with input validation and user guard.

**Step 4: Re-run tests**

Run: `bunx vitest run src/server/functions/resolve-choice.test.ts`
Expected: PASS.

**Step 5: Commit**

Run:
```bash
git add .
git commit -m "feat: resolve choice with hybrid transaction flow"
```

### Task 9: Build MVP gameplay UI screens

**Files:**
- Create: `src/routes/play.tsx`
- Create: `src/components/game/scene-view.tsx`
- Create: `src/components/game/choice-list.tsx`
- Create: `src/components/game/status-panel.tsx`
- Create: `src/components/game/action-log.tsx`

**Step 1: Write failing component test**

Create `src/components/game/choice-list.test.tsx` with one expectation:
choice click triggers callback with selected `choiceId`.

**Step 2: Run test to verify failure**

Run: `bunx vitest run src/components/game/choice-list.test.tsx`
Expected: FAIL.

**Step 3: Implement minimal components**

Render scene text, choices, player stats, and action log.

**Step 4: Re-run tests**

Run: `bunx vitest run src/components/game/choice-list.test.tsx`
Expected: PASS.

**Step 5: Commit**

Run:
```bash
git add src/routes src/components/game
git commit -m "feat: add playable mvp scene interface"
```

### Task 10: Seed authored content and first playable story loop

**Files:**
- Create: `supabase/seed/seed-scenes.sql`
- Create: `supabase/seed/seed-choices.sql`
- Create: `supabase/seed/seed-campaign.sql`

**Step 1: Add one compact story arc**

Create 5-8 scenes with branching outcomes and at least one test-based choice.

**Step 2: Seed database**

Run: `supabase db reset`
Expected: schema + seed content loaded.

**Step 3: Manual playthrough verification**

Run app and complete one branch to confirm irreversible save behavior.

**Step 4: Commit**

Run:
```bash
git add supabase/seed
git commit -m "feat: add first authored campaign arc seed"
```

### Task 11: End-to-end quality gates for MVP readiness

**Files:**
- Create: `docs/testing/mvp-test-matrix.md`
- Modify: `package.json` scripts (`test`, `test:watch`, `typecheck`, `lint`, `format`, `check`, `prepare`)
- Modify: `.husky/pre-commit`

**Step 1: Add validation scripts**

Add scripts for repeatable CI usage:
- `test` and `test:watch` with Vitest
- `typecheck`
- `lint` with Biome
- `format` with Biome
- `check` with Biome comprehensive check
- `prepare` for Husky install lifecycle

**Step 2: Run full test suite**

Run: `bun run test`
Expected: all test files pass.

**Step 3: Run type checks**

Run: `bun run typecheck`
Expected: no type errors.

**Step 4: Run Biome quality checks**

Run: `bun run check`
Expected: code quality check completes according to configured Biome rules.

**Step 5: Verify pre-commit behavior**

Run:
- stage one file change
- run `git commit -m "test: verify precommit hooks"`
Expected: Husky runs `lint-staged` and blocks commit on failing checks.

**Step 6: Add MVP manual checklist**

Include auth flow, choice resolution, idempotency, lock conflict, and log correctness checks.

**Step 7: Commit**

Run:
```bash
git add .
git commit -m "test: add mvp validation scripts and matrix"
```

### Task 12: Documentation handoff

**Files:**
- Create: `README.md`
- Create: `docs/architecture.md`
- Create: `docs/content-authoring.md`

**Step 1: Write README setup and run guide**

Include required env vars, local run, and test commands.

**Step 2: Write architecture summary**

Document hybrid transaction flow and anti-scum-load invariants.

**Step 3: Write content authoring guide**

Explain how to add scenes, choices, and balance difficulty.

**Step 4: Final verification**

Run:
- `bun run test`
- `bun run typecheck`
- `bun run check`
Expected: all checks pass before release tag.

**Step 5: Commit**

Run:
```bash
git add README.md docs
git commit -m "docs: add architecture and authoring guides"
```

---

## Notes for Execution

- Keep tasks strictly sequential.
- Do not implement extra features not listed in this plan (YAGNI).
- Prefer small red-green-refactor cycles per task.
- If any task changes architecture assumptions, pause and update this plan before coding further.

## Known Pitfalls and Anti-Patterns

- Collapsing multiple tasks into one large change.
- Implementing before tests in rule-critical areas.
- Treating expected command output as optional verification.
- Removing the required writing-plans header block.
- Reintroducing ESLint or Prettier after Biome adoption.

## Change Notes (High-Level)

- 2026-02-25 - Plan normalized to project documentation template while preserving mandatory writing-plans header.
