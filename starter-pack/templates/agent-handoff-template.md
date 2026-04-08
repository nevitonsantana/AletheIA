# Agent Handoff Template

## Goal

Use this template when one agent is stopping at its boundary and another agent is expected to continue execution.

This is not a transcript.
It is a compact restart package.

The fields below are intentionally richer than the minimum JSON handoff schema.
Use the optional sections when they reduce ambiguity for the next boundary.

---

## Handoff type

Narrative or operational.
Prefer operational when the next boundary is another agent expected to continue execution.

### Receiving agent role

### Dominant frontier

### Cross-boundary reason

Explain why this work is moving to another agent instead of continuing in the current one.

---

## Current status

These fields map closely to the minimum structured continuity record.

### Status

Examples:
- ready for continuation
- blocked on validation
- blocked on decision
- partial implementation ready for next agent

### What was completed

### What remains pending

### Next action

State the first action the receiving agent should take.

---

## Execution boundary

Use this section when the next boundary needs stronger scope control.

### Allowed files

List the files the next agent may change.

### Forbidden files

List the files or layers that are out of scope.

### Explicitly out of scope

List expansions or reinterpretations the next agent should avoid.

---

## Available context

### Allowed data or contracts

List the data, APIs, contracts, or assumptions the next agent may safely rely on.

### Relevant files

List the files that matter most for resuming work.

### Reopen summary

Summarize the minimum context the next boundary should reload before continuing.

---

## Semantic guardrails

Describe what meaning, behavior, or product intent must be preserved.
Only fill this when it materially reduces drift.

---

## Acceptance criteria

Describe what must be true for the handoff target to count as complete.
Only fill this when the next boundary needs a clearer closure target.

---

## Validation expectation

Describe the minimum proof expected before closure.

Examples:
- lint
- smoke
- targeted tests
- human review
- audit check

---

## Risks and unknowns

### Main risks

### Unknowns still open

---

## Expected response format

Describe how the receiving agent should report back.

Examples:
- changed files
- what was validated
- what remains blocked
- recommended next action

Use this only when the handoff would benefit from a clearer return shape.
