# Copilot Review Instructions

## Input validation and error handling

- Check untrusted inputs at boundaries and validate type, range, and format.
- Flag missing or inconsistent error handling paths.
- Prefer deterministic failures over silent fallback when data integrity is at risk.

## Auth and sensitive data

- Verify authentication is required for protected operations.
- Verify authorization checks enforce least privilege.
- Flag any logging or exposure of secrets, tokens, or personal data.

## Regression and performance risks

- Highlight behavior changes that can break existing workflows.
- Call out missing tests for changed critical paths.
- Flag obvious performance risks in hot paths, loops, and repeated I/O.

## Comment style

- Every review comment must include:
  - why this matters
  - suggested action
- Add a severity tag at the start of each comment:
  - critical
  - important
  - suggestion
- Keep comments specific, testable, and scoped to the changed code.
