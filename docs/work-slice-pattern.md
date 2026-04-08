# Work Slice Pattern

## Goal

This document explains how AletheIA can treat a bounded unit of work as a **work slice** without introducing a new core contract.

A work slice is an operational composition.
It gathers the artifacts that make one unit of work more resumable, reviewable, and teachable.

It is not a new schema.
It is not a new kernel capability.
It is a low-regret pattern built on contracts that already exist.

---

## What a work slice is

A work slice is the smallest useful package of work that should remain explicit across:

- framing
- decision
- execution
- validation
- handoff when needed
- learning when warranted

In practice, a work slice usually composes these existing artifacts:

1. **task brief**
2. **decision record**
3. **execution record**
4. **handoff record** when work crosses an agent or review boundary
5. **learning record** when the slice produces a reusable lesson

Not every slice needs every artifact in the same depth.
But the pattern becomes valuable as soon as the work should be resumed, reviewed, validated, or learned from.

---

## Why this exists

AletheIA already has strong individual contracts.
What is often missing in real work is a visible unit that ties them together.

Without that composition, teams can end up with:

- a task brief that never becomes a clear execution unit
- a decision that is not easy to reconnect to validation
- a handoff that floats separately from the work it belongs to
- a learning that loses its link to the slice that generated it

The work-slice pattern makes that chain easier to read without inflating the framework core.

---

## When to use a work slice

Use a work slice when at least one of these is true:

- the work is no longer trivial or one-shot
- the work should survive more than one turn or one session
- the work will cross an agent, review, or validation boundary
- the work needs a clearer risk read before execution
- the work may produce a reusable learning

You do **not** need a fully explicit work slice for every tiny action.

If the task is extremely local, reversible, and obvious, a lighter flow may still be enough.

---

## Relationship to existing AletheIA layers

### Task framing

The task brief gives the slice its initial boundary:

- what problem exists
- what the objective is
- what is in and out of scope
- what risk and validation posture are expected

### Decision

The decision record makes the slice reviewable before execution.
It explains why the work may continue, be reviewed, be blocked, or be escalated.

### Execution

The execution record shows what actually happened, where it ran, and what proof exists.

### Handoff

The handoff record matters when the slice crosses an agent or review boundary.
In that case, the work slice should preserve continuity through a restart package instead of relying on hidden thread memory.

### Learning

The learning record closes the slice when the work produced a reusable heuristic, guardrail, or test gap.

---

## Derived operational states

AletheIA's core loop remains:

`intent -> context -> decision -> execution -> validation -> learning`

A work slice can make that loop more tangible through a **derived operational vocabulary**.
These are not engine enums.
They are a practical reading layer.

| Derived state | Typical signal inside the slice |
| --- | --- |
| `framed` | a task brief exists with scope and success criteria |
| `context-scoped` | the minimum relevant context has been selected and bounded |
| `decision-recorded` | a decision record makes the next step explicit |
| `execution-in-progress` | an execution record is planned or running |
| `validation-pending` | execution advanced, but proof or review is still incomplete |
| `validated` | the required proof exists and closure is justified |
| `blocked` | the slice cannot advance safely under current conditions |
| `escalated` | the next step requires a higher-trust review or human gate |
| `learning-stored` | a reusable learning record was captured from the slice |

This vocabulary should stay optional and operational.
It should not become a new mandatory core state machine at this stage.

---

## Recommended composition levels

### 1. Lightweight slice

Good for small, low-risk work.
Usually includes:

- task brief
- decision record
- execution record

### 2. Reviewable slice

Good for work that needs clearer proof or a second boundary.
Usually includes:

- task brief
- decision record
- execution record
- handoff record or explicit validation step

### 3. Learning-producing slice

Good for work that revealed a pattern worth reusing.
Usually includes:

- task brief
- decision record
- execution record
- optional handoff record
- learning record

---

## What this pattern is not

A work slice is **not**:

- a replacement for the existing JSON contracts
- a new universal schema
- a new Alpha
- a claim that every task needs the same ceremony
- a hidden attempt to add a runtime orchestrator through documentation

It is deliberately smaller than that.

---

## Suggested file shape

One healthy way to make a work slice concrete is to keep its related artifacts together, for example:

- `task-brief.json`
- `decision-record.json`
- `execution-record.json`
- `handoff-record.json` when needed
- `learning-record.json` when generated
- `README.md` to explain the slice in plain language

This is a convenience pattern, not a required filesystem contract.

---

## Suggested next reading

- `starter-pack/templates/work-slice-template.md`
- `starter-pack/guides/risk-to-gate-mapping.md`
- `docs/agent-handoffs.md`
- `examples/work-slices/standard-slice/README.md`
- `examples/handoffs/compact-reviewable-handoff.md`
- `examples/handoffs/high-stakes-handoff.md`
