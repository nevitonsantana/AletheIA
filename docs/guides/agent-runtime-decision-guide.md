# Agent / Runtime Decision Guide

## Goal

Define the advisory decision layer for choosing between agents or runtimes in the 1.2 Resource-Aware Operations track.

This guide should help teams make **proportional** choices without turning AletheIA into a rigid router.

---

## Why this exists

AletheIA already has:

- token discipline
- work slices
- trust / hosting posture
- advisory model strategy by task
- telemetry, waste heuristics, and policy signals in the early 1.2 track

What is still useful is a clearer operational answer to:

- when is a runtime stronger than the slice needs?
- when is it weaker than the slice really needs?
- when should a team stay with the current runtime versus change it?

This guide is the advisory bridge between:

- task shape
- runtime fit
- operational waste
- local trust posture

---

## Core principle

AletheIA should recommend the **smallest adequate fit**.

That means:

- do not spend a deep runtime on mechanical work by reflex
- do not keep a weaker runtime on work that now clearly needs deeper review or reasoning
- do not treat one runtime choice as universally correct

The framework should suggest.
The user or project still decides.

---

## Decision axes

### 1. Task shape

Start with the dominant slice shape:

- housekeeping / support work
- bounded execution
- planning / decomposition
- review / critique / validation
- handoff / compression
- structured risk inference

### 2. Risk posture

Ask how wrong it is to be wrong here.

Examples:

- low-risk and reversible
- bounded but meaningful
- high ambiguity or hard-to-validate
- trust-sensitive or review-heavy

### 3. Runtime capability fit

Ask what kind of runtime is proportionate:

- lightweight helper
- balanced executor
- deep planner / reviewer

### 4. Trust / hosting fit

Ask whether the runtime is acceptable for the material and lane:

- externally hosted allowed
- hosted but restricted
- self-hosted preferred
- self-hosted required

### 5. Restart / handoff burden

Ask whether the slice benefits from staying with the same runtime or would be healthier if handed off to a different fit.

---

## Recommended decision posture

### Stay with the current runtime when:

- the task shape is still aligned
- retries are not wasteful
- review burden is still proportional
- trust posture is still acceptable

### Reconsider the runtime when:

- retries are rising without strategy change
- the task became more semantic or higher-risk than expected
- review effort is now heavy enough to signal a mismatch
- the current runtime is overpowered for repetitive work
- the current runtime is underpowered for ambiguity, review, or planning depth

---

## Over-allocation signals

A runtime may be too strong for the slice when:

- the task is mechanical and stable
- the same result could be obtained with a smaller capability profile
- human review is minimal and the work is easy to inspect
- the current cost/effort profile is much higher than the value of the slice

Healthy move:

- de-escalate to a smaller adequate fit

---

## Under-allocation signals

A runtime may be too weak for the slice when:

- ambiguity remains high
- retries are increasing without resolution
- the work is semantically riskier than first expected
- the review burden is large because the runtime keeps missing the real judgment problem
- a compact handoff would be healthier than continuing with the same fit

Healthy move:

- escalate to a stronger fit
- or hand off to a better-suited runtime or review lane

---

## Simple advisory matrix

| Task shape | Default runtime fit | Escalate when | Reduce when |
|---|---|---|---|
| Housekeeping / support | lightweight helper | hidden ambiguity appears or the task stops being local | the work is clearly mechanical |
| Bounded execution | balanced executor | the work becomes cross-boundary, semantically riskier, or harder to validate | execution becomes repetitive after the hard part is done |
| Planning / decomposition | deep planner / reviewer | reversibility drops or ambiguity stays high | the planning question narrows into local execution |
| Review / critique / validation | deep planner / reviewer | trust or semantic risk rises further | the review becomes narrow checklist work |
| Handoff / compression | lightweight helper or balanced executor | interpretation burden rises or the context is more sensitive | the handoff is already narrow and obvious |
| Structured risk inference | deep planner / reviewer | assumptions weaken or downside rises | the inference is no longer proportional to the slice |

This matrix is advisory.
It should not be treated as automatic routing truth.

---

## Relationship to policy signals

The decision layer should listen to signals such as:

- retry-pattern review
- runtime-fit review
- human-rescue warning
- context-inflation warning

These do not force a switch.
They indicate that the current fit may deserve inspection.

---

## Relationship to local usage plans

Projects may translate this guide into local usage plans.

That is healthy when:

- the defaults are explicit
- trust posture is explicit
- fallbacks are explicit
- overrides are still allowed

It is unhealthy when:

- a local usage plan gets mistaken for framework truth
- the framework silently becomes an auto-router

---

## What this guide is not

This guide is not:

- a vendor ranking
- an automatic router
- a benchmark scorecard
- a hard policy pack
- a replacement for local trust-boundary rules

It is an operating guide for better proportionality.

---

## Suggested next reading

- `starter-pack/guides/model-strategy-by-task.md`
- `docs/progressive-policy-signals.md`
- `docs/runtime-adapter-contract.md`
- `docs/runtime-adapter-codex.md`
- `docs/runtime-adapter-claude-code.md`
- `docs/runtime-adapter-qwen.md`
- `examples/model-strategy/provider-agnostic-routing.md`
- `examples/resource-aware-operations/agent-runtime-decision-example.md`
