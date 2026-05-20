# Context / Resource Telemetry Spec

## Goal

Define the first telemetry surface for the 1.2 Resource-Aware Operations track.

This spec should help projects make context and resource use more visible **without** turning AletheIA into a heavyweight runtime platform.

It is a framework-facing operating spec, not a mandatory engine feature.

---

## Why this exists

AletheIA already teaches:

- token discipline
- bounded work slices
- compact handoffs
- advisory model strategy
- stronger trust / hosting posture where needed

What is still missing is a practical surface for answering questions such as:

- where is context growing?
- where is handoff weight inflating?
- where are retries expensive but unhelpful?
- where is the selected runtime or agent stronger or weaker than the task needs?

This spec defines the first telemetry shape that later local adapters may emit.

---

## Design constraints

The telemetry surface should remain:

- provider-agnostic
- advisory-first
- reviewable
- small enough for local adoption
- compatible with manual, semi-automated, or runtime-assisted capture

It should **not** assume:

- one vendor pricing model
- one token accounting backend
- one runtime
- one orchestration stack
- one always-on agent platform

---

## Telemetry unit

The main telemetry unit for this track is the **work slice**.

A slice is the right unit because it already carries:

- task boundary
- decision posture
- execution context
- validation expectation
- handoff or continuation meaning

That makes telemetry legible in the same operating shape that AletheIA already uses.

---

## Core telemetry categories

### 1. Context telemetry

Capture signals such as:

- cold boot size
- exploration additions
- explicit expansion events
- delegated context size
- handoff size

Purpose:
- show where context grows across the slice lifecycle

### 2. Runtime / agent telemetry

Capture:

- runtime or agent used for the slice
- capability profile if known
- reasoning depth if relevant
- trust / hosting posture when materially relevant

Purpose:
- compare task shape against execution fit

### 3. Retry telemetry

Capture:

- retry count
- whether retries changed strategy or only repeated work
- whether retries followed failure, ambiguity, or governance stop

Purpose:
- distinguish useful iteration from wasteful repetition

### 4. Handoff telemetry

Capture:

- whether a handoff happened
- whether the handoff stayed compact
- whether the next step required replay of prior context anyway

Purpose:
- measure restart quality instead of only handoff existence

### 5. Human effort telemetry

Capture only lightweight signals such as:

- whether human review was required
- whether manual rewrite or rescue was substantial
- whether the final result needed heavy human correction

Purpose:
- avoid optimizing model/runtime selection while hiding human burden

### 6. Optional cost / time telemetry

If a project can estimate them safely, it may also record:

- elapsed time
- rough cost estimate
- heavy tool-use count

These fields should remain optional in the framework-facing spec.

---

## Required telemetry moments

The first version should support these moments explicitly.

### Cold boot

Record the first relevant context load for the slice.

### Exploration

Record when context grows due to unresolved ambiguity.

### Expansion

Record when the slice stops being local enough and broader context is pulled in.

### Delegation

Record when a narrower or parallel execution pack is prepared.

### Handoff

Record what was preserved for restart and whether the restart stayed lightweight.

These moments align intentionally with the existing token-policy reading of the work.

---

## Minimum field groups

The telemetry spec should support at least these field groups.

### Slice identity

- slice identifier
- project or example identifier
- date or round
- dominant task shape

### Context fields

- cold boot size class
- exploration count or additions
- explicit expansion count
- expansion reason present or absent
- handoff size class

### Runtime fields

- runtime / agent identity
- capability profile if known
- reasoning depth if used
- trust / hosting posture if relevant

### Outcome fields

- validation outcome class
- retry count
- handoff required or not
- human review required or not
- heavy human rescue yes / no / unknown

### Optional scalar fields

- elapsed time
- rough cost estimate
- tool call count

The framework should prefer **size classes and reviewable proxies** over pretending to require exact universal measurement on day one.

---

## Recommended value shapes

Prefer simple, comparable value shapes in the first version.

Examples:

- size classes: `minimal`, `moderate`, `extended`
- retry classes: `none`, `changed-strategy`, `repeated-without-change`
- handoff quality: `not-needed`, `compact`, `inflated`, `restart-still-heavy`
- human effort: `none`, `light-review`, `substantial-review`, `manual-rescue`

This keeps the first telemetry layer usable even in local or semi-manual settings.

---

## What this spec should make possible later

If adopted consistently, this telemetry surface should later support:

- waste heuristics
- progressive policy signals
- runtime / agent fit review
- comparative slice reviews
- benchmark work in later tracks

It should not require benchmark or learning layers to be useful.

---

## What this spec deliberately avoids

This spec does not yet define:

- one JSON schema as a required runtime contract
- one canonical dashboard format
- automatic scoring
- vendor-specific cost math
- framework-level auto-routing
- learning-layer feedback loops

Those belong later, after the basic surface is proven useful.

---

## Suggested next reading

- `docs/resource-aware-operations-roadmap.md`
- `docs/token-policy.md`
- `docs/work-slice-pattern.md`
- `docs/handoff-capture-pattern.md`
- `starter-pack/guides/model-strategy-by-task.md`
- `docs/slice-telemetry-model.md`
- `docs/waste-heuristics.md`
