# Planning Depth Profiles

## Goal

Define a small, vendor-agnostic planning-depth layer for the 1.2 Resource-Aware Operations track.

This document exists to help teams choose **how much planning structure** a slice really needs before execution.

It should keep AletheIA proportional.
It should not turn the framework into a heavyweight delivery lifecycle.

---

## Why this exists

By the time a team reaches the later 1.2 track, AletheIA already has:

- telemetry guidance
- waste heuristics
- progressive policy signals
- a minimal runtime adapter contract
- advisory runtime / agent fit guidance

What still helps in practice is a simpler answer to:

- how much upfront planning is justified here?
- when is a lightweight slice enough?
- when does the work deserve stronger readiness before execution?

That is the purpose of planning-depth profiles.

---

## Core rule

Choose the **smallest planning depth that still makes the next step reviewable**.

Do not over-plan by habit.
Do not under-plan when ambiguity, risk, or review burden are already visible.

---

## The three profiles

### Lite

Use `Lite` when the slice is:

- narrow
- reversible
- locally understandable
- easy to validate after execution

Typical fit:

- small bounded execution
- straightforward maintenance work
- local documentation or support changes
- compact handoff packaging when the boundary is obvious

What `Lite` should usually make explicit:

- the immediate objective
- what is in scope now
- what success looks like
- the next validation step

What `Lite` should usually avoid:

- deep decomposition
- extended alternative analysis
- heavy gate choreography

### Standard

Use `Standard` when the slice is:

- meaningful but still bounded
- somewhat ambiguous
- touching more than one artifact or boundary
- likely to need clearer review or handoff

Typical fit:

- implementation with moderate semantic risk
- small cross-boundary work
- reviewable change sets
- planning that should survive restart or handoff

What `Standard` should usually make explicit:

- objective and scope
- main non-goals
- dominant risk posture
- expected proof shape
- whether a handoff or review boundary is likely

If requirements, technical decisions, or executable checkpoints are still ambiguous,
`Standard` may use a small Work Slice Spec Bundle:

- `spec.md`
- `plan.md`
- `tasks.md`

What `Standard` should usually avoid:

- turning into a full project plan
- documenting every hypothetical branch before execution begins

### High-Assurance

Use `High-Assurance` when the slice is:

- hard to reverse
- trust-sensitive
- semantically risky
- difficult to validate after the fact
- likely to require explicit review before execution or before closure

Typical fit:

- structured risk inference
- higher-stakes review or critique
- constrained-environment work with strong local rules
- work where a bad shortcut creates expensive cleanup later

What `High-Assurance` should usually make explicit:

- objective, scope, and exclusions
- mapped risk posture
- review and approval expectations
- validation boundary
- handoff expectations if execution crosses lanes or runtimes

If the slice needs stronger pre-execution evidence, `High-Assurance` may use the full
Work Slice Spec Bundle, including a `readiness-review.md` that instantiates the existing
readiness gates for the slice.

What `High-Assurance` should still avoid:

- becoming a universal ceremony for normal work
- trying to predict the full lifecycle beyond the current slice

---

## Choosing a profile

A healthy choice usually depends on five questions.

### 1. How reversible is the work?

- highly reversible -> `Lite`
- bounded but meaningful -> `Standard`
- hard to reverse -> `High-Assurance`

### 2. How much ambiguity remains?

- low ambiguity -> `Lite`
- bounded ambiguity -> `Standard`
- persistent ambiguity with meaningful downside -> `High-Assurance`

### 3. How hard will review be?

- easy to inspect after execution -> `Lite`
- reviewable with some structure -> `Standard`
- review-heavy or trust-sensitive -> `High-Assurance`

### 4. How likely is a handoff?

- no meaningful handoff expected -> `Lite`
- a reviewable restart package may be needed -> `Standard`
- handoff clarity is critical -> `High-Assurance`

### 5. How constrained is the local environment?

- ordinary posture -> `Lite` or `Standard`
- explicit local constraints -> `Standard`
- strong trust / hosting / approval constraints -> `High-Assurance`

---

## Quick comparison

| Profile | Best fit | Main value | Main failure if underused | Main failure if overused |
| --- | --- | --- | --- | --- |
| `Lite` | narrow, reversible slices | speed with legibility | hidden ambiguity gets ignored | not enough structure for review or restart |
| `Standard` | bounded but meaningful work | clearer reviewable planning | moderate risk is handled too casually | medium work gets treated like a project |
| `High-Assurance` | trust-sensitive or hard-to-reverse work | explicit gates and proof posture | expensive ambiguity survives into execution | normal work gets buried in ceremony |

---

## Relationship to runtime fit

Planning depth and runtime fit are related, but they are not the same thing.

Examples:

- a `Lite` slice may still need a strong runtime if the interpretation burden is high
- a `High-Assurance` slice may still delegate some execution steps to a smaller runtime after the risky judgment is closed

Healthy order:

1. understand the slice shape
2. choose planning depth
3. choose runtime fit
4. keep both reviewable as the slice evolves

---

## Relationship to readiness gates

Planning depth explains **how much structure** a slice should receive.

Readiness gates explain **whether the slice is ready enough to continue**.

That means:

- depth answers: `how much planning is justified?`
- readiness answers: `is this planning sufficient to proceed?`

---

## What this is not

Planning-depth profiles are not:

- a mandatory process for every task
- a new engine state machine
- a replacement for local project operating rules
- a delivery methodology imported wholesale from another framework

They are a proportional planning aid.

---

## Suggested next reading

- `docs/readiness-gates-spec.md`
- `docs/work-slice-spec-bundle.md`
- `docs/work-slice-pattern.md`
- `docs/progressive-policy-signals.md`
- `docs/agent-runtime-decision-guide.md`
- `examples/resource-aware-operations/workflow-readiness-example.md`
