---
date: 2026-03-01T03:47:00-03:00
scope: [api]
type: chore
commits:
  - 802b2ee
  - 6f459d5
  - 2066439
  - 8498364
  - 4629f41
  - 43263c3
  - a35a103
  - 21e0716
  - 5d8bf8f
issue: 4
---

# API - Supabase Env Contracts

**Timestamp:** 2026-03-01T03:47:00-03:00  
**Commits:** `802b2ee`, `6f459d5`, `2066439`, `8498364`, `4629f41`, `43263c3`, `a35a103`, `21e0716`, `5d8bf8f`  
**Context:** Execute implementation plan Task 4 for issue #4 with TDD env validation and Supabase connectivity contracts.

## Motivation

Task 4 requires a strict runtime contract for required Supabase environment variables before backend connectivity is introduced.

## Changes Made

### 1. Added a failing env contract test

Created `src/lib/env.test.ts` asserting that missing required Supabase keys throws an error.

### 2. Implemented environment readers

Created `src/lib/env.ts` with `readEnv` for server-required keys and `readPublicEnv` for client-safe keys.

### 3. Added Supabase connectivity entry points

Created `src/lib/supabase/client.ts` and `src/lib/supabase/server.ts` with `createClient` wrappers aligned to public and server-only credentials.

### 4. Added configuration baseline

Created `.env.example` with required keys and added `@supabase/supabase-js` dependency.

### 5. Processed Copilot review feedback

- Widened env source typing to work with Vite's `import.meta.env` shape without unsafe casts.
- Replaced the server runtime guard to use `document` presence, avoiding false positives in Bun.
- Added `src/lib/supabase/server.test.ts` with mocked `createClient` assertions for factory arguments and return contract.

### 6. Hardened test isolation for review feedback loop

- Replaced direct `process.env` reassignment and global document mutation with `vi.stubEnv` and `vi.stubGlobal`.
- Added deterministic cleanup through `vi.unstubAllEnvs` and `vi.unstubAllGlobals`.

### 7. Aligned server consumer with server-only env contract

- Added `readServerEnv` to keep server runtime requirements limited to URL + service-role key.
- Updated server client factory and tests to validate server operation without requiring anon key.

### 8. Added browser client test and less brittle env assertions

- Added `src/lib/supabase/client.test.ts` to assert browser client factory configuration through mocked `createClient`.
- Relaxed env error assertions to focus on missing key presence rather than exact message ordering.

## Key Technical Details

- Followed TDD flow: RED (`readEnv` missing) then GREEN (runtime validation passes).
- Applied TanStack Start env boundary guidance from Context7: `import.meta.env` for client and `process.env` for server.
- Avoided service-role key usage in browser client by isolating a public env reader.

## Lessons Learned

- Splitting public and server env readers reduces accidental secret leakage risk while keeping one contract surface.

## Files Changed

- `.env.example`
- `package.json`
- `bun.lock`
- `src/lib/env.test.ts`
- `src/lib/env.ts`
- `src/lib/supabase/client.ts`
- `src/lib/supabase/server.ts`
- `src/lib/supabase/server.test.ts`
