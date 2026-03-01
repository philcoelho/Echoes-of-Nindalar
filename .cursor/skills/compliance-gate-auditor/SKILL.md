---
name: compliance-gate-auditor
description: Performs strict compliance audit for changed work using the Superpowers checklist and GitHub workflow gates. Use before any commit, push, PR progression, or completion claim.
---

# Compliance Gate Auditor

## Purpose

Run a strict compliance audit and return only `PASS` or `FAIL`.
This skill is a mandatory quality gate and must be executed before commit and before completion claims.

## Required Sources (in order)

1. `docs/standards/superpowers-compliance-checklist.md`
2. `docs/standards/github-workflow.md`
3. `.cursor/rules/compliance-gate.mdc`
4. Changed files and git diff for the current task
5. Relevant GitHub issue and PR state when available

## Hard Rules

- Use fail-closed behavior.
- If any required evidence is missing, ambiguous, or contradictory, return `FAIL`.
- Never mark `PASS` with inferred or assumed evidence.
- Validate all checklist items explicitly.
- Validate workflow gates explicitly:
  - Issue exists and is linked to task when required.
  - Dedicated branch exists and was used.
  - Subagent code review loop reached `PASS`.
  - Compliance gate reached `PASS`.
  - PR targets `dev` and never `main`.
  - PR assignee is `philcoelho`.
  - Copilot review was requested through MCP.
  - Copilot feedback loop was applied and re-reviewed.

## Audit Procedure

1. Build evidence set from changed files, git state, and workflow artifacts.
2. Evaluate each compliance checklist item with direct evidence.
3. Evaluate GitHub workflow gate requirements with direct evidence.
4. Produce result:
   - `PASS` only if all checks are explicitly satisfied.
   - Otherwise `FAIL` with required fixes.

## Output Contract

Return exactly this structure:

```markdown
Compliance Gate Result: PASS|FAIL

Checklist Validation:
- [PASS|FAIL] Item 1 - <short evidence>
- [PASS|FAIL] Item 2 - <short evidence>
- [PASS|FAIL] Item 3 - <short evidence>
- [PASS|FAIL] Item 4 - <short evidence>
- [PASS|FAIL] Item 5 - <short evidence>
- [PASS|FAIL] Item 6 - <short evidence>
- [PASS|FAIL] Item 7 - <short evidence>
- [PASS|FAIL] Item 8 - <short evidence>
- [PASS|FAIL] Item 9 - <short evidence>
- [PASS|FAIL] Item 10 - <short evidence>

Workflow Gates:
- [PASS|FAIL] Issue and branch pre-check
- [PASS|FAIL] Branch checkout before implementation
- [PASS|FAIL] Mandatory subagent review loop until PASS
- [PASS|FAIL] Compliance gate PASS before commit/push
- [PASS|FAIL] PR targets dev and includes assignee/reviewer policy
- [PASS|FAIL] Copilot feedback loop processed and re-reviewed

Required Fixes:
- <ordered list of mandatory fixes; write "None" only if PASS>

Next Step:
- <single objective action>

Success Criteria:
- <objective condition to rerun and get PASS>
```

## Scope

- This skill audits and reports.
- This skill does not auto-approve ambiguous cases.
