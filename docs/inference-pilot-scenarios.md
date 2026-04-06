# Inference Pilot Scenarios

## Goal

This document defines the first recommended pilot scenarios for structured risk inference.

In simple terms:

start where semantic risk is real,
but still bounded enough to compare outcomes.

---

## Why pilot scenarios matter

Alpha 5 should not begin as a universal capability.

It should begin where teams can ask a concrete question:

**did structured risk inference improve the quality of the decision and the validation plan in this kind of task?**

That means the first scenarios should be:

- high enough risk to justify the artifact
- narrow enough to compare outcomes
- common enough to repeat more than once

---

## Recommended first scenarios

### 1. Patch review with semantic uncertainty

Use when a proposed change looks plausible but its semantic effect is not obvious from a quick read.

Good fit when:

- the patch is not large
- the logic change is subtle
- the main question is behavior, not style

What to observe:

- whether the artifact surfaces assumptions that a normal review would miss
- whether suggested tests become sharper
- whether the review discussion becomes more concrete

### 2. Refactor with invisible regression risk

Use when a refactor appears mechanically safe but may still change behavior in indirect ways.

Good fit when:

- abstractions are being moved or rewritten
- signatures stay similar
- downstream behavior could shift without obvious compiler or lint errors

What to observe:

- whether impacted paths are identified earlier
- whether invariants are made explicit
- whether hidden regression risk becomes easier to validate

### 3. Semantic regression risk with weak test coverage

Use when tests exist but do not really cover the risk surface that matters.

Good fit when:

- the suite passes
- confidence still feels fragile
- the risky behavior depends on workflow meaning rather than syntax or type correctness

What to observe:

- whether test gaps are identified more honestly
- whether suggested tests are more aligned with real risk
- whether confidence becomes better calibrated

### 4. High-stakes inter-agent handoff

Use when work is being passed to another agent and the next step depends on preserving rationale, not only instruction.

Good fit when:

- the receiving agent must continue execution
- assumptions matter
- the task has real downstream consequence if misunderstood

What to observe:

- whether the next agent needs less reinterpretation
- whether validation continuity improves
- whether reasoning survives the handoff better than instruction alone

---

## Scenarios to avoid first

Do not begin Alpha 5 pilots with:

- cosmetic changes
- trivial local fixes
- formatting-only tasks
- broad open-ended redesign work
- tasks where no meaningful semantic risk exists

These cases make it too hard to tell whether the capability is helping.

---

## Evaluation questions

For each pilot scenario, ask:

1. Did the artifact reveal meaningful assumptions or unknowns?
2. Did it improve the validation plan?
3. Did it reduce semantic ambiguity?
4. Did it improve handoff clarity, if a handoff was involved?
5. Was the extra overhead justified by the risk level?

---

## Recommended pilot posture

Alpha 5 pilots should begin as:

- small
- selective
- repeatable
- reviewable

The goal is not to prove universal value immediately.

The goal is to find the first task shapes where the capability clearly earns its cost.

---

## Suggested next reading

- `docs/structured-risk-inference.md`
- `starter-pack/templates/inference-artifact-template.md`
- `starter-pack/guides/inference-trigger-guidance.md`
- `examples/structured-risk-inference/README.md`
