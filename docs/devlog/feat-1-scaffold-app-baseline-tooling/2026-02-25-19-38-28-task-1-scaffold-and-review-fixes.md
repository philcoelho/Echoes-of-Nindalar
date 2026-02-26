---
date: 2026-02-25T19:38:28-03:00
scope: [ui, monorepo]
type: chore
commits:
  - 43048f6
  - 5e39d2d
  - 86ca95b
  - 7a3ea1a
pr: 13
issue: 1
---

# UI/Monorepo - Task 1 Scaffold and Review Fixes

**Timestamp:** 2026-02-25T19:38:28-03:00  
**Commits:** `43048f6`, `5e39d2d`, `86ca95b`, `7a3ea1a`  
**Context:** Execute Task 1 baseline setup, then address Copilot review feedback in the same PR with validated fixes.

## Motivation

Establish a reliable project foundation for upcoming implementation tasks, with reproducible setup, baseline quality gates, and review-driven hardening before moving to Task 2.

## Changes Made

### 1. Task 1 baseline scaffold and tooling

- Scaffolded TanStack Start app in repository root with Bun workflow.
- Added baseline project files (`src`, `public`, `vite.config.ts`, `tsconfig.json`, `package.json`, `bun.lock`).
- Initialized and configured Biome, Husky, and lint-staged pre-commit integration.
- Updated `.husky/pre-commit` to run staged checks with Biome via lint-staged.

### 2. Copilot review feedback implementation

- Gated devtools to development-only rendering in `src/routes/__root.tsx`.
- Corrected README command usage and Tailwind removal instructions.
- Updated package scripts to explicit Biome targets (`format`, `lint`, `check`) with non-mutating lint.
- Improved `Header` drawer accessibility behavior:
  - open/close ARIA state wiring,
  - Escape-to-close,
  - focus return to trigger,
  - keyboard tab flow handling while drawer is open.

### 3. Validation and test baseline stabilization

- Executed setup and verification commands during task flow:
  - `bun install`
  - `bun run dev`
  - `bun run check`
  - `bun run lint`
  - `bun run build`
  - `bun run test`
- Added `src/smoke.test.ts` as minimal baseline test to keep the test gate green in this bootstrap phase.

## Key Technical Details

- Work was isolated in branch/worktree `feat/1-scaffold-app-baseline-tooling` to avoid contaminating `main`.
- Devtools are now excluded from production runtime path by `import.meta.env.DEV` guard.
- `lint` script intentionally stays non-mutating (`biome lint .`) to keep CI and local checks predictable.
- `nitro` dependency remained `npm:nitro-nightly@latest` to stay aligned with current TanStack Start hosting guidance for this scaffold stage.

## Lessons Learned

- Scaffold defaults can include accessibility and script details that require immediate hardening before downstream tasks.
- Review comments should be triaged against project docs and stack constraints, not applied blindly.
- A minimal smoke test helps stabilize early quality gates while feature-specific tests are still pending.

## Files Changed

- `.cta.json`
- `.gitignore`
- `.husky/pre-commit`
- `README.md`
- `biome.json`
- `bun.lock`
- `package.json`
- `public/favicon.ico`
- `public/logo192.png`
- `public/logo512.png`
- `public/manifest.json`
- `public/robots.txt`
- `public/tanstack-circle-logo.png`
- `public/tanstack-word-logo-white.svg`
- `src/components/Header.tsx`
- `src/routeTree.gen.ts`
- `src/router.tsx`
- `src/routes/__root.tsx`
- `src/routes/index.tsx`
- `src/smoke.test.ts`
- `src/styles.css`
- `tsconfig.json`
- `vite.config.ts`
