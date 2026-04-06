# Inference Artifact Generation

## Goal

This guide explains how to generate a compact inference artifact from real work.

In simple terms:

when a task has enough semantic risk to trigger Alpha 5,
the artifact should make the decision more reviewable without turning into a transcript or architecture essay.

---

## Why this guide exists

After trigger guidance answers **when** structured risk inference should run,
the next question becomes:

**how should the artifact actually be assembled from real work?**

Without a generation method, two common failures appear:

- the artifact becomes verbose and vague
- the artifact sounds rigorous but still hides assumptions, weak evidence, or unclear test gaps

This guide exists to keep the artifact:

- compact
- evidence-oriented
- reviewable
- proportional to the actual risk

---

## Core rule

Treat the inference artifact as:

**a bounded reasoning package, not a transcript**

The artifact should optimize for:

- explicit evidence
- explicit assumptions
- explicit unknowns
- risk-focused validation guidance

It should not try to replay every branch of analysis.

---

## When to use this guide

Use this guide only when structured risk inference has already been triggered.

Typical cases include:

- multi-module changes with semantic uncertainty
- security or governance-sensitive changes
- refactors with invisible regression risk
- high-stakes patch review
- high-stakes inter-agent handoff

If the task is still too small to justify the capability, do not force an artifact.

---

## Recommended generation order

### 1. Start from the bounded question

Before writing the artifact, make the decision question explicit.

Examples:

- what behavior is expected after this refactor?
- what semantic regression is most likely here?
- which business rule is at risk of being misapplied?

The artifact should stay anchored to one dominant question, not many loose ones.

### 2. Gather the strongest premises first

List the most relevant evidence or premises before writing conclusions.

Good premises usually come from:

- source-of-truth docs
- code paths actually inspected
- tests already present
- contracts already defined
- explicit product or governance rules

Prefer fewer strong premises over many weak observations.

### 3. Separate assumptions from evidence

Anything not directly shown should move into `assumptions`.

This matters because a common failure mode is presenting inference as if it were demonstrated fact.

If a conclusion depends on something you did not verify, make that dependency visible.

### 4. Map the impacted paths

Describe the main path or paths likely to be affected.

The goal is not to diagram the whole system.
The goal is to show where the change may concentrate semantic risk.

### 5. Protect the invariants

State what must remain true after the change.

Good invariants are usually:

- business rules that must still hold
- safety properties that must not regress
- contract expectations that must remain stable
- trust-boundary constraints that must continue to be enforced

### 6. Surface the main risks and unknowns

Keep risks focused on the most meaningful failure modes.

Then make unknowns explicit.

A good artifact should say not only:

- what may break

but also:

- what could not yet be verified

### 7. Translate the risk into validation work

Use the artifact to produce:

- `test_gaps`
- `suggested_tests`

This is one of the main reasons the capability exists.

The artifact should improve the validation plan,
not only describe abstract risk.

### 8. Assign confidence with a basis

Use a qualitative confidence band such as:

- low
- medium
- high

Then explain **why**.

The confidence basis should point back to:

- evidence strength
- assumption weight
- remaining unknowns
- validation still missing

---

## Good signs

The artifact is probably healthy when:

- it stays centered on one bounded semantic question
- premises are stronger than conclusions
- assumptions and unknowns are easy to spot
- suggested tests are directly tied to the identified risk
- a reviewer can challenge the reasoning without rereading the full work history

---

## Failure signs

The artifact is probably weak when:

- it reads like a long recap of the task
- it hides assumptions inside confident language
- impacted paths are too broad to be actionable
- risks are generic and not tied to the change
- suggested tests are not connected to the risk surface
- confidence sounds stronger than the evidence justifies

---

## Relationship to Alpha 4 handoffs

If the work will cross an agent boundary,
the inference artifact may travel with the handoff.

In that case, the artifact should preserve:

- rationale
- assumptions
- unknowns
- validation priorities

without turning the restart package into a transcript dump.

---

## Suggested next reading

- `docs/structured-risk-inference.md`
- `starter-pack/templates/inference-artifact-template.md`
- `starter-pack/guides/inference-trigger-guidance.md`
- `docs/inference-pilot-scenarios.md`
