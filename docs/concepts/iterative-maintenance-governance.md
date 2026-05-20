# Iterative Maintenance Governance

## Goal

This document explains how AletheIA can learn from **SWE-CI** without trying to become SWE-CI.

The benchmark is useful because it highlights a real operational problem:

**maintenance quality depends on what happens across rounds, not only inside one patch.**

AletheIA can contribute to that problem as a governance layer.
It does not need to reproduce the benchmark to do so.

---

## What SWE-CI reveals

SWE-CI is valuable because it shifts attention away from one-shot correctness and toward **maintainability across ongoing change**.

That shift matters because real maintenance work is shaped by:

- repeated rounds rather than isolated patches
- regressions that appear after seemingly successful work
- regressions that may stay partially silent until someone looks at the lane health
- early decisions that either support or weaken later iterations
- the need to resume context without replaying the full history

This is exactly the kind of problem where a framework like AletheIA can help govern better.

---

## What is reference, not direction

AletheIA should treat these parts of SWE-CI as **reference only**:

- the benchmark itself
- EvoScore as an evaluation metric
- zero-regression rate as a benchmark scoring output
- a fixed Architect / Programmer protocol
- a CI harness or oracle-following runtime
- a benchmark-shaped environment as a framework requirement

Those pieces are useful for diagnosis.
They are not the core of AletheIA.

---

## What is directionally compatible

The problem that SWE-CI exposes is highly compatible with AletheIA's existing layers.

AletheIA already has reusable pieces for:

- framing a bounded unit of work
- recording a decision before execution
- tying risk posture to validation depth
- preserving continuity through restart packages
- storing reusable learnings when a failure or pattern repeats
- making hidden regression risk more reviewable through structured inference when that is proportional

The practical next move is not a new benchmark layer.
It is making these pieces more legible in **iterative maintenance loops**.

---

## The compatible thesis

AletheIA can help govern iterative maintenance by making each round more explicit.

In that reading, one round should become easier to understand as:

- a bounded work slice
- a decision about what this round will and will not attempt
- an execution step with visible validation expectations
- a potential regression event that changes the next gate
- a continuity artifact for the next round or reviewer
- a place where reusable learning may be captured

This keeps the framework focused on governance rather than on benchmark reproduction.

---

## Regression as a governance event

SWE-CI makes regressions impossible to ignore.
That is the strongest lesson for AletheIA.

Inside AletheIA, regression should not be read only as a final metric.
It can also be read as an operational event that affects the current round.

Examples:

- a previously green behavior breaks and the round should no longer close as if it were clean progress
- a regression can force stronger review or wider validation before the next continuation
- repeated regressions in the same area should raise the expected gate for later rounds
- a non-obvious regression can justify a handoff, a learning record, or selective structured inference
- a silent degradation can justify a small lane health reading before the next round is treated as trustworthy

That is a governance move, not a benchmark move.

---

## A practical operational reading

In higher-value iterative loops, the most useful operational sequence is often:

1. **proof** — establish that the lane or round actually works in a real slice
2. **contract** — harden consistency around what the lane is supposed to mean
3. **health metric** — make the lane readable as a health signal, not only as a successful patch
4. **alert** — surface degradation before it becomes purely anecdotal
5. **investigation** — make the degraded case inspectable without replaying everything
6. **lane summary** — keep a compact readout of the current operational picture

This sequence should be read as a **proportional pattern**, not as a universal framework obligation.

---

## What would drift the framework away from its core

This reference becomes harmful if it pushes AletheIA into:

- benchmark mimicry
- mandatory dual-agent architecture
- multi-round runtime orchestration inside the core
- score-first thinking instead of decision quality and reviewability
- heavy process for every local or reversible change
- treating observability as mandatory framework infrastructure for every project

AletheIA should stay small enough to teach, inspect, and adapt.
If a maintenance-oriented idea only works by inflating the framework, it should remain optional or experimental.

---

## Low-regret implementation shape

The lowest-regret way to apply this reference is:

1. treat each round as a composed work slice
2. strengthen the practical link between regression and gate escalation
3. make continuity between rounds more restartable
4. preserve reusable learnings when regressions or validation failures repeat
5. use small operational readings when a loop is important enough to justify them
6. test the idea through docs, starter-pack guidance, and examples before changing any core contract

That sequence preserves clarity and keeps the experiment reversible.

---

## What recent real-world evidence changed

The Crisis Monitor pilot did not turn AletheIA into an observability framework.

What it did was make one important point more concrete:

**iterative maintenance is easier to govern when silent degradation becomes legible before the next continuation is treated as safe.**

That real-world evidence makes iterative maintenance in AletheIA less abstract.
It shows that rounds, gates, continuity, and reusable learning are stronger when a meaningful loop can also answer:

- is the lane still coherent?
- is the explainability still there?
- are we continuing on top of a fragile step without noticing?

---

## Suggested next reading

- `starter-pack/guides/round-based-maintenance.md`
- `docs/work-slice-pattern.md`
- `starter-pack/guides/risk-to-gate-mapping.md`
- `docs/structured-risk-inference.md`
- `examples/iterative-maintenance/three-round-loop/README.md`
- `examples/pilot-conversion/crisis-monitor-real-world-validation.md`
