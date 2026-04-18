# Work Slice Template

Use this template when a bounded unit of work should be easier to frame, resume, validate, hand off, or restart cleanly.

This template does **not** replace the existing AletheIA contracts.
It is the coordination layer for one explicit slice.

---

## Slice identity

- Slice ID:
- Slice title:
- Related Work Item ref: (`not_needed` if no external coordination anchor exists)
- Current derived state:
  - framed
  - context-scoped
  - decision-recorded
  - execution-in-progress
  - validation-pending
  - validated
  - blocked
  - escalated
  - learning-stored

---

## Goal and scope

### Objective

### In scope

### Out of scope

---

## Governing context

### Governing context refs

List only the durable refs that should still govern the slice.

### Constraints

### Dependencies

---

## Validation expectation

### Minimum proof expected

Examples:
- diff inspection
- manual review
- targeted tests
- lint
- policy evaluation
- structured inference before execution

### Closure rule

State what must be true before the slice can be closed.

---

## Boundary expectations

### Handoff needed?

State `yes`, `no`, or `maybe later`.

### Restart package expected?

State `yes`, `no`, or `only if boundary changes`.

### Why

Explain why the next boundary exists or why clean restart may be needed.

---

## Artifact map

Fill these with file paths, IDs, or references.

- Task brief:
- Decision record:
- Execution record:
- Handoff record:
- Restart package:
- Learning record:

---

## Notes

Keep the slice tight, bounded, and reviewable.
Do not turn this artifact into a second transcript.
