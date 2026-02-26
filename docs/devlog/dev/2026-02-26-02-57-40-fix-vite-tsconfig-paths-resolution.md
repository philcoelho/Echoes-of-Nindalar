---
date: 2026-02-26T02:57:43-03:00
scope: [builder]
type: fix
commits: []
---

# Builder - Fix vite-tsconfig-paths Resolution

**Timestamp:** 2026-02-26T02:57:43-03:00  
**Commits:** `pending`  
**Context:** Resolve TypeScript module resolution error for `vite-tsconfig-paths` in Vite config.

## Motivation

TypeScript flagged `vite-tsconfig-paths` as missing because project dependencies were not installed successfully.

## Changes Made

### 1. Root-cause fix for dependency installation

- Updated `nitro` in `package.json` from `2.10.4` to `2.2.28` (published version).
- This unblocks dependency installation so `vite-tsconfig-paths` can be resolved from `node_modules`.

## Key Technical Details

- `bun install` was failing on an unpublished version pin (`nitro@2.10.4`).
- Once install is unblocked, TypeScript can resolve both `vite/client` types and `vite-tsconfig-paths`.
- Verification run: `bunx tsc --noEmit` no longer reports `vite-tsconfig-paths`; remaining errors are unrelated (`nitro/vite`, `Bun` type).

## Files Changed

- `package.json`
- `bun.lock`
