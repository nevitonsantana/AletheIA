# Inference Artifact Template

## Goal

Use this template when a task triggers structured risk inference before execution.

This is not a replacement for tests or validation.
It is a compact artifact for making higher-risk reasoning more reviewable.

---

## Trigger context

### Why inference was triggered

Examples:
- multi-module change
- sensitive business rule
- security or governance impact
- refactor with invisible regression risk
- insufficient test confidence
- high-stakes handoff

### Decision being scrutinized

State the change or decision that still needs structured review before execution proceeds.

---

## Hypothesis

Describe the expected behavior after the change.

---

## Premises

List the main evidence supporting the hypothesis.

Examples:
- observed code path
- existing contract behavior
- current validation result
- documented invariant

---

## Assumptions

List what is being assumed but not yet demonstrated.

---

## Impacted paths

List the main functional or semantic paths likely to be affected.

Examples:
- flow A -> component X -> side effect Y
- route B -> service C -> persistence D

---

## Invariants

List what must remain true after the change.

---

## Risks

For each major risk, describe:

- description
- likelihood: low | medium | high
- impact: low | medium | high

---

## Unknowns

List what could not be verified yet.

---

## Test gaps

List which meaningful scenarios are not currently covered.

---

## Suggested tests

List the tests or validation moves that would most reduce uncertainty.

---

## Confidence

### Confidence level

Use:
- low
- medium
- high

### Confidence basis

Explain why this confidence level was assigned.

---

## Recommended next action

State the next action that should happen after this inference artifact is reviewed.
