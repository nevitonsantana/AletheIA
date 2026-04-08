# Standard Work Slice Example

## Goal

This example shows a **small but complete work slice** built from contracts that already exist in AletheIA.

It is intentionally modest.
The point is not to show maximum complexity.
The point is to show how one bounded unit of work can remain explicit from framing to learning.

---

## Scenario

A team wants to improve starter-pack guidance so new adopters can understand how a bounded operational slice is composed and validated.

The work is:

- documentation-focused
- medium risk rather than trivial, because it changes reusable operating guidance
- still low enough to avoid a human gate
- reviewable through explicit validation and a small handoff to the next boundary

---

## Artifact chain

This slice includes:

1. `task-brief.json`
   - frames the work, scope, and expected validation posture
2. `decision-record.json`
   - explains why the work may continue and what should happen next
3. `execution-record.json`
   - records the local execution and minimum proof gathered so far
4. `handoff-record.json`
   - prepares the next reviewer with a compact restart package
5. `learning-record.json`
   - captures a reusable lesson that came out of the slice

---

## Why this matters

The example is deliberately built without introducing:

- a new work-slice schema
- a new engine capability
- a new policy pack

Instead, it shows the intended low-regret move:

**compose existing artifacts first, then prove whether anything stronger is needed later.**

---

## Derived state progression

A healthy reading of this slice is:

- `framed`
- `context-scoped`
- `decision-recorded`
- `execution-in-progress`
- `validation-pending`
- `learning-stored`

The slice pauses at a validation boundary through the handoff record instead of pretending closure already happened.

---

## Files in this example

- `task-brief.json`
- `decision-record.json`
- `execution-record.json`
- `handoff-record.json`
- `learning-record.json`
