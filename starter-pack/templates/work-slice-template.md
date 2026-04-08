# Work Slice Template

Use this template when a bounded unit of work should be made easier to frame, resume, validate, or learn from.

This template does **not** replace the existing AletheIA contracts.
It is a composition layer that points to them.

---

## Slice identity

### Slice ID

### Slice title

### Current derived state

Examples:
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

## Minimum context

### Relevant context

List only the context that should travel with this slice.

### Constraints

### Dependencies

---

## Risk read

### Task type / severity / risk

### Why this risk posture applies

### Human gate required?

State `yes` or `no`, and explain briefly if useful.

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

## Handoff expectation

### Handoff needed?

State `yes`, `no`, or `maybe later`.

### Why

If a handoff is expected, explain why the next boundary exists.

---

## Artifact map

Fill these with file paths, IDs, or references.

### Task brief

### Decision record

### Execution record

### Handoff record

Use only if a handoff exists.

### Learning record

Use only if the slice produced a reusable learning.

---

## Notes

Use this template to make one slice legible.
Do not turn it into a second transcript.
Keep the slice tight, bounded, and reviewable.
