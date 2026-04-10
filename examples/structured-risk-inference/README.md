# AletheIA — Structured Risk Inference Examples

## Goal

This folder makes the Alpha 5 inference artifact more concrete.

In simple terms:

it shows what a compact inference artifact can look like in real higher-risk scenarios,
without pretending the artifact replaces execution or validation.

---

## Why these examples exist

The Alpha 5 docs already explain:

- what structured risk inference is
- when to trigger it
- how to assemble the artifact
- which pilot scenarios are good first candidates

These examples answer a different question:

**what does the artifact actually look like when written well?**

They are intentionally small, reviewable, and tied to realistic task shapes.

---

## Included examples

### 1. `refactor-risk-inference.json`

A refactor that looks mechanically safe but may still change behavior indirectly.

This example shows:

- explicit premises
- explicit assumptions
- semantic invariants
- validation work driven by the main regression risk

### 2. `high-stakes-handoff-inference.json`

A handoff where another agent must continue execution and the main risk is semantic reinterpretation, not syntax.

This example shows:

- rationale preserved across a boundary
- contract stability called out as an invariant
- validation priorities that should survive the handoff

### 3. `regression-round-inference.json`

A maintenance round where degradation signals suggest the current gate is too light.

This example shows:

- a lane-health premise entering the reasoning package
- a test gap tied to silent regression risk
- a next action that helps decide whether the round should stay blocked, widen, or continue

---

## What these examples are not

These files are not:

- engine output
- formal proof artifacts
- universal truth for every task shape

They are concrete examples for teaching what a healthy Alpha 5 artifact looks like.

---

## Reading rule

A good Alpha 5 reading order is:

1. understand the trigger
2. inspect the premises and assumptions
3. inspect the test gaps and suggested tests
4. ask whether the artifact changed the gate, the handoff, or the validation plan enough to earn its cost

If the answer is no, the artifact was probably unnecessary.

---

## Suggested next reading

- `docs/structured-risk-inference.md`
- `starter-pack/templates/inference-artifact-template.md`
- `starter-pack/guides/inference-trigger-guidance.md`
- `starter-pack/guides/inference-artifact-generation.md`
- `starter-pack/guides/risk-to-gate-mapping.md`
- `docs/inference-pilot-scenarios.md`
