# Inference Trigger Guidance

## Goal

This guide explains when structured risk inference should be used, and when it should be skipped.

In simple terms:

use it when semantic risk is high enough to justify extra review,
not as a default ceremony for every task.

---

## Core rule

Structured risk inference is a conditional capability.

It should not run by default.

The decision to trigger it should depend on whether the task has enough semantic risk, uncertainty, or downstream consequence to justify a more explicit reasoning artifact before execution.

---

## Good trigger signals

Inference is usually justified when one or more of these are true:

### 1. Multi-module or cross-layer impact

The change crosses more than one meaningful module, boundary, or layer.

### 2. Sensitive business or domain rules

The task changes behavior that is easy to misread but costly to get wrong.

### 3. Security or governance relevance

The task affects permissions, restrictions, policies, auditing, or trust boundaries.

### 4. Refactor with invisible regression risk

The code may look mechanically safe while still changing behavior in subtle ways.

### 5. Test confidence is weak for the real risk

Tests may exist, but they do not really cover the semantic risk surface.

### 6. Low confidence from the executing agent

The agent can continue, but key assumptions still feel under-demonstrated.

### 7. High-stakes handoff

A downstream agent needs not only instructions, but also a portable rationale.

---

## Weak trigger signals

Inference is usually not needed when:

- the task is small and local
- the semantic behavior is already obvious
- existing tests already cover the meaningful risk surface
- the work is mostly mechanical or formatting-oriented
- the task does not introduce meaningful ambiguity or cross-boundary consequences

---

## Practical trigger heuristics

AletheIA should prefer simple heuristics over fake precision.

A useful working rule is:

trigger inference when the cost of being semantically wrong is meaningfully higher than the cost of one extra review artifact.

Another useful rule is:

if the team would want a human reviewer to ask “what assumptions is this change relying on?”, the task is often a good inference candidate.

---

## Trigger outcomes

### No trigger

Continue with the normal loop:

`intent -> context -> decision -> execution -> validation -> learning`

### Triggered

Use the conditional loop:

`intent -> context -> decision -> [if triggered: inference] -> execution -> validation -> learning`

---

## What to avoid

Do not trigger inference just because:

- the task sounds important in the abstract
- the work involves AI somewhere in the flow
- more documentation feels safer by default
- the team wants to look rigorous without a real risk reason

This capability loses value quickly if it becomes universal ceremony.

---

## Recommended pairings

When inference is triggered, use it together with:

- `starter-pack/templates/inference-artifact-template.md`
- `docs/structured-risk-inference.md`

When a handoff is also involved, consider pairing it with:

- `docs/agent-handoffs.md`
- `starter-pack/templates/agent-handoff-template.md`

---

## Good signs

Trigger discipline is healthy when:

- the capability is used selectively
- triggered artifacts actually change validation quality
- unnecessary inference is rare
- teams can explain why the artifact was needed

---

## Suggested next reading

- `docs/structured-risk-inference.md`
- `starter-pack/templates/inference-artifact-template.md`
- `docs/agent-handoffs.md`
