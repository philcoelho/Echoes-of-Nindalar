---
date: 2026-02-26T10:39:35-03:00
scope: [builder]
type: fix
commits:
  - 7d96648
---

# Builder - Unblock Nitro Vite Dev Server

**Timestamp:** 2026-02-26T10:39:35-03:00
**Commits:** `7d96648`
**Context:** Fix local `bun run dev` startup failure caused by unresolved `nitro/vite`.

## Motivation

The development server was blocked by `ERR_MODULE_NOT_FOUND` for `nitro/vite`, preventing local task verification.

## Changes Made

### 1. Root-cause investigation and docs validation

- Confirmed local `node_modules/nitro` package did not expose `nitro/vite` because resolution pointed to the unrelated `nitro@2.2.28` package.
- Verified TanStack Start hosting docs and Context7 references require the UnJS Nitro package path (`import { nitro } from "nitro/vite"`).
- Confirmed TanStack Start guidance explicitly recommends the nightly alias: `"nitro": "npm:nitro-nightly@latest"`.

### 2. Restored Nitro dependency intent and hardened local fallback

- Restored dependency intent to the TanStack Start recommendation (`npm:nitro-nightly@latest`).
- Kept dynamic Nitro plugin loading in `vite.config.ts` with a strict guard:
  - only suppress in `serve` mode
  - only for `ERR_MODULE_NOT_FOUND` with `nitro/vite`
  - rethrow all other errors
- Added an explicit warning log in dev when fallback is triggered.

## Key Technical Details

- `bun run check` passes after config update.
- `bun run dev` starts successfully and serves on `http://localhost:3000/`.
- `bun run build` still fails fast when `nitro/vite` is unresolved, preserving CI/build safety.

## Lessons Learned

- Runtime-safe fallback logic should be scoped to local development and never hide production misconfiguration.
- Package-name collisions can produce misleading installs; official framework docs must be treated as source of truth for dependency identity.

## Files Changed

- `vite.config.ts`
