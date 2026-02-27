---
date: 2026-02-26T02:57:43-03:00
scope: [builder]
type: fix
commits:
  - 6aca9ad
---

# Builder - Fix vite-tsconfig-paths Resolution

**Timestamp:** 2026-02-26T02:57:43-03:00
**Commits:** `6aca9ad`
**Context:** Resolve TypeScript module resolution error for `vite-tsconfig-paths` in Vite config.

## Motivation

TypeScript flagged `vite-tsconfig-paths` as missing because project dependencies were not installed successfully.

## Changes Made

### 1. Root-cause fix for dependency installation

- Replaced unpublished `nitro` pin `2.10.4` with a temporarily installable version to unblock `bun install`.
- This unblocked `vite-tsconfig-paths` resolution from `node_modules` for the immediate setup session.

## Key Technical Details

- `bun install` was failing on an unpublished version pin (`nitro@2.10.4`).
- Once install was unblocked, TypeScript resolved both `vite/client` types and `vite-tsconfig-paths`.
- Verification run: `bunx tsc --noEmit` no longer reports `vite-tsconfig-paths`; remaining errors are unrelated (`nitro/vite`, `Bun` type).
- Follow-up note: Nitro dependency strategy was later normalized to TanStack Start guidance (`npm:nitro-nightly@latest`) during PR review fixes.

## Lessons Learned

- Dependency aliases or unpublished versions should be validated before running scaffolding fixes.

## Files Changed

- `package.json`
- `bun.lock`
