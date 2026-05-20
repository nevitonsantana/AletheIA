# Readiness Gates Spec

## Goal

Define a light readiness layer for the 1.2 Resource-Aware Operations track.

These gates should help teams decide whether a slice is ready to continue, review, hand off, or stop.

The intent is operational clarity.
The intent is not rigid early blocking.

---

## Why this exists

AletheIA already helps teams frame work, shape slices, reason about risk, and package handoffs.

What still causes waste in real work is advancing when one of these is still weak:

- context is insufficient
- the decision is still blurry
- risk is not really mapped
- the handoff would not restart cleanly
- the runtime fit is already wrong for the slice

Readiness gates make those weak spots easier to notice.

---

## Core posture

Readiness gates should begin as **advisory and reviewable**.

They are here to produce better questions such as:

- are we ready to continue?
- should this pause for review?
- should the slice be reframed or tightened first?
- should the work be handed off instead of pushed further here?

They should not start as a rigid enforcement system.

---

## Recommended gates

### 1. Context minimum exists

Ask:

- is the minimum relevant context present?
- is the context bounded enough for the current slice?
- are we carrying obvious excess context that should be trimmed or handed off?

Healthy outcome:

- enough context to proceed without guessing
- not so much context that the slice already carries avoidable inflation

### 2. Decision is clear enough

Ask:

- is the next move explicit?
- are scope and non-goals understandable?
- is the reason for proceeding, reviewing, or stopping legible?

Healthy outcome:

- the slice can advance without hidden reinterpretation

### 3. Risk is mapped enough

Ask:

- how wrong is it to be wrong here?
- is the dominant risk posture explicit enough for this slice?
- does the planning depth match the risk?

Healthy outcome:

- the slice is not pretending low risk when it is actually hard to reverse or hard to review

### 4. Handoff is usable enough

Ask:

- if this crossed a boundary now, would the next reader be able to resume?
- is the restart package shape clear enough?
- would a handoff reduce ambiguity more than continuing here?

Healthy outcome:

- continuity remains possible without replaying the whole thread

### 5. Runtime / agent fit is acceptable enough

Ask:

- is the current runtime still proportional to the slice?
- are retries, review burden, or ambiguity signaling a mismatch?
- is the local trust / hosting posture still acceptable?

Healthy outcome:

- the slice is not obviously over-allocated or under-allocated

---

## Gate outcomes

A practical gate review may end in one of these outcomes:

- `continue` -> current posture is acceptable
- `tighten` -> reduce scope, context, or ambition before continuing
- `review` -> pause for explicit inspection before proceeding
- `handoff` -> continuity is healthier through another boundary
- `escalate` -> stronger runtime, review posture, or approval is needed
- `stop` -> the slice should not advance under current conditions

These are operational outcomes, not new mandatory engine enums.

---

## Minimum by planning depth

### Lite

For `Lite`, the bar is usually:

- context minimum exists
- decision is clear enough
- runtime fit is acceptable enough

### Standard

For `Standard`, the bar is usually:

- context minimum exists
- decision is clear enough
- risk is mapped enough
- runtime fit is acceptable enough

### High-Assurance

For `High-Assurance`, the bar is usually:

- context minimum exists
- decision is clear enough
- risk is mapped enough
- handoff is usable enough when a boundary is likely
- runtime fit is acceptable enough

---

## Relationship to policy signals

Progressive policy signals can feed gate review.

Examples:

- context inflation warning -> gate 1 deserves review
- retry waste warning -> gate 5 deserves review
- weak expansion rationale -> gates 1 and 2 deserve review
- handoff inflation warning -> gate 4 deserves review

Signals do not replace judgment.
They help decide which gate needs inspection.

---

## Relationship to planning depth

Readiness gates should not force every slice into the same ceremony.

A healthy rule is:

- `Lite` -> fewer gates need explicit discussion
- `Standard` -> more gates should be legible
- `High-Assurance` -> the gates should be explicitly reviewable

For slices that use a Work Slice Spec Bundle, `readiness-review.md` should instantiate
these gates for that concrete slice. It should not redefine the gate model.

See: `docs/work-slice-spec-bundle.md`.

---

## What this is not

This spec is not:

- a blocking engine
- a full approval workflow product
- a replacement for project-local trust rules
- a claim that every slice needs all gates at full depth

It is a lightweight review surface.

---

## Suggested next reading

- `docs/planning-depth-profiles.md`
- `docs/progressive-policy-signals.md`
- `docs/agent-handoffs.md`
- `docs/agent-runtime-decision-guide.md`
- `examples/resource-aware-operations/workflow-readiness-example.md`
