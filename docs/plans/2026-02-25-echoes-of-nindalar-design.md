---
file_name: 2026-02-25-echoes-of-nindalar-design.md
title: Echoes of Nindalar Design
description: Approved architecture and domain design for the Echoes of Nindalar MVP.
doc_type: project
scope: "docs/plans/**"
version: 1.0.0
last_updated: 2026-02-25
status: active
tags:
  - domain:game-design
  - language:typescript
  - framework:tanstack-start
related_docs:
  - ../standards/doc-template.md
  - ../standards/superpowers-compliance-checklist.md
  - ./2026-02-25-echoes-of-nindalar-implementation.md
---

# Overview

This document defines the approved MVP design for Echoes of Nindalar, a web solo RPG gamebook.
The design balances authored narrative, open-world feeling, and character progression, with a light preference for authored graph narrative.
It establishes technical constraints, domain boundaries, and execution-critical invariants before implementation starts.

## Goals and Non-Goals

- Goals:
  - Deliver a playable MVP with meaningful branching choices and persistent progression.
  - Use irreversible action resolution to prevent scene reroll and scum-load behavior.
  - Keep architecture small enough for fast iteration, but scalable for future content growth.
- Non-Goals:
  - Build multiplayer or real-time collaboration features.
  - Build runtime AI-generated narrative in MVP.
  - Build a full visual world map renderer in MVP.

## Tech Stack

- Languages: TypeScript, SQL, Markdown
- Frameworks: TanStack Start, shadcn/ui, TailwindCSS, Vitest, Biome, Husky, lint-staged
- Infrastructure: Supabase Auth, Supabase Postgres, RLS policies
- Package Manager: Bun

## High-Level Architecture

- Main components and interactions:
  - Presentation layer in TanStack Start routes for scene, choices, status, and log.
  - Application layer in TanStack Server Functions for auth, validation, resolution orchestration, and RPC callout.
  - Data layer in Supabase Postgres for authored content, player state, and action logs.
- External integrations:
  - Supabase Auth for identity and session.
  - Supabase Postgres for persistence and policy enforcement.
- Typical processing flow:
  - Load campaign and current scene.
  - Render valid choices based on state and prerequisites.
  - Submit one choice action to a server function.
  - Resolve outcome using server-side rules and RNG.
  - Commit outcome atomically through RPC and update state version.
  - Return next scene or dynamic event payload and repeat.

## Domain Concepts

- **Character** — Player identity and progression state with attributes, resources, and skill profile.
- **CampaignState** — Current scene, region, flags, reputation, and state version for concurrency control.
- **Scene and Choice** — Authored narrative graph nodes and transitions with optional prerequisites and effects.
- **ActionLog** — Player-visible simplified outcome plus internal tuning metadata.
- **Dynamic Event Template** — Systemic event definitions that inject open-world variability.

Core model set:
- `profiles` (optional extension over auth metadata)
- `characters`
- `character_skills`
- `items` and `inventory_entries`
- `campaign_states`
- `scenes`
- `choices`
- `event_templates`
- `event_instances` (MVP+ extension)
- `quests` and `quest_objectives` (light MVP form)
- `action_logs`

## Coding Conventions

- Project structure:
  - `src/routes` for UI routes.
  - `src/server/functions` for server function entry points.
  - `src/server/game` for deterministic domain rules.
  - `src/server/data` for persistence adapters and RPC integration.
  - `supabase/migrations` for schema, policies, and RPC SQL.
- Naming:
  - Use explicit names like `resolve-choice`, `commit-resolved-action`, and `campaign-state`.
  - Keep commit-style verb-noun naming for mutation entry points.
- Error handling:
  - Distinguish unauthorized, forbidden, conflict, and validation errors.
  - Reject stale state updates through version checks.
  - Surface deterministic, player-safe error messages for action failures.
- Tooling:
  - Use Biome as the single formatter and linter toolchain.
  - Use Husky and lint-staged to enforce staged-file checks in pre-commit.
  - Do not introduce ESLint or Prettier in MVP setup.

## Invariants and Critical Rules

- Action resolution is server-side only and never trusted from client calculation.
- Completed action commits are irreversible for player progression flow.
- Every action write path enforces idempotency with `action_id`.
- Campaign state mutations must include ownership and version validation.
- Code quality enforcement must use Biome, replacing ESLint and Prettier.
- Pre-commit hooks must run through Husky and lint-staged.
- If invariants break, progression integrity degrades and anti-scum-load guarantees fail.

## Typical Tasks for AI Assistance

This project will be co-authored by Cursor Agents, powered by the superpowers plugin.

- Design updates:
  - Input: changed game rule, architecture, or persistence constraint.
  - Expected behavior: update design sections and maintain invariants consistency.
- Domain model evolution:
  - Input: new feature concept and constraints.
  - Expected behavior: map change into entities, lifecycle, and migration impact.
- Architecture validation:
  - Input: implementation proposal.
  - Expected behavior: verify alignment with approved stack and invariants.
- Test strategy refinement:
  - Input: new rule or regression scenario.
  - Expected behavior: update unit and integration priorities tied to critical paths.

## Known Pitfalls and Anti-Patterns

- Letting client-side logic decide final combat or choice outcomes.
- Mixing orchestration and SQL commit concerns without clear ownership boundaries.
- Skipping idempotency, which allows replay bugs under retries.
- Expanding MVP scope with non-core systems before loop stability.
- Reintroducing ESLint and Prettier after Biome standardization.

## Change Notes (High-Level)

- 2026-02-25 - Design normalized to project documentation template and approved for implementation planning.
