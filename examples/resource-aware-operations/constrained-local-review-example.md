# Constrained / Local Review Example

## Goal

Show how the 1.2 resource-aware surfaces can be used inside a locally constrained environment without moving trust-boundary specifics into the core.

---

## Context

A project runs with:

- hosted tools allowed only for low-sensitivity slices
- stronger review expectations on restart packages
- explicit local preference for tighter context before handoff

The slice is a reviewable maintenance task.

Initial posture:

- planning depth -> `Standard`
- runtime fit -> acceptable under local restrictions
- handoff not yet required

---

## What changed

During the slice:

- the context started growing because related historical notes were repeatedly reattached
- a likely handoff appeared because the next review would happen in a different lane
- the trust posture itself did not change, but the restart package became more important

---

## Local read using 1.2 surfaces

### Telemetry / waste read

- handoff size is growing
- cold restart burden is rising
- context inflation is appearing even though the slice is still bounded

### Policy-signal read

Healthy warning:

- the slice should justify further expansion or tighten the restart package first

### Readiness read

Best gate to inspect:

- `handoff is usable enough`

### Better next move

- tighten the restart package
- keep only the minimum context needed for the receiving lane
- preserve the local trust posture instead of changing runtime by reflex

---

## Why this matters

The useful lesson is:

- a constrained environment does not automatically mean a different framework core
- it often means the local project applies the same 1.2 surfaces with stricter thresholds and clearer stop lines
