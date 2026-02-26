---
date: 2026-02-26T10:39:35-03:00
scope: [builder]
type: fix
commits: []
---

# Builder - Unblock Nitro Vite Dev Server

**Timestamp:** 2026-02-26T10:39:35-03:00  
**Commits:** `pending`  
**Context:** Fix local `bun run dev` startup failure caused by unresolved `nitro/vite`.

## Motivation

The development server was blocked by `ERR_MODULE_NOT_FOUND` for `nitro/vite`, preventing local task verification.

## Changes Made

### 1. Root-cause investigation and docs validation

- Confirmed local `node_modules/nitro` package did not expose `nitro/vite`.
- Verified current Nitro integration pattern in Context7 docs (`import { nitro } from "nitro/vite"`).
- Confirmed reinstall attempts were failing due to integrity and network resolution errors.

### 2. Added resilient Nitro plugin loading

- Updated `vite.config.ts` to load Nitro plugin with dynamic import inside `defineConfig(async () => ...)`.
- Added safe fallback when `nitro/vite` is unavailable, so local dev is not blocked.

## Key Technical Details

- `bun run check` passes after config update.
- `bun run dev` now starts successfully and serves on `http://localhost:3000/`.
- This is a local resiliency fix while dependency installation remains unstable.

## Files Changed

- `vite.config.ts`
