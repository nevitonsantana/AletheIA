# Agent Handoff Template

## Goal

Use this template when one agent is stopping at its boundary and another agent is expected to continue execution.

This is not a transcript.
It is a compact restart package.

---

## Handoff type

### Receiving agent role

### Dominant frontier

### Cross-boundary reason

Explain why this work is moving to another agent instead of continuing in the current one.

---

## Current status

### Status

Examples:
- ready for continuation
- blocked on validation
- blocked on decision
- partial implementation ready for next agent

### What was completed

### What remains pending

---

## Execution boundary

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

---

## Semantic guardrails

Describe what meaning, behavior, or product intent must be preserved.

---

## Acceptance criteria

Describe what must be true for the handoff target to count as complete.

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

---

## Next action

State the next action the receiving agent should take first.
