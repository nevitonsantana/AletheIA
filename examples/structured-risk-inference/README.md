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

---

## What these examples are not

These files are not:

- engine output
- formal proof artifacts
- universal truth for every task shape

They are concrete examples for teaching what a healthy Alpha 5 artifact looks like.

---

## Suggested next reading

- `docs/structured-risk-inference.md`
- `starter-pack/templates/inference-artifact-template.md`
- `starter-pack/guides/inference-trigger-guidance.md`
- `starter-pack/guides/inference-artifact-generation.md`
- `docs/inference-pilot-scenarios.md`
