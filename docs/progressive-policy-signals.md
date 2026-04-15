# Progressive Policy Signals

## Goal

Define the next step after the first telemetry surfaces in the 1.2 Resource-Aware Operations track.

This guide explains how AletheIA can turn context and resource guidance into **reviewable signals** without pretending that everything is already technically enforced.

The purpose is to make waste and mismatch more visible early, not to create a hard blocking system immediately.

---

## Why this comes after telemetry

AletheIA already had:

- token policy
- enforcement-boundary clarity
- work-slice discipline
- advisory model strategy

The first 1.2 pass added:

- context / resource telemetry
- slice telemetry shape
- waste heuristics

The next low-regret step is not adapters or auto-routing.
It is to define what kinds of **signals** the framework should surface once those telemetry concepts exist.

---

## Core principle

AletheIA should begin with:

- **advisory signals**
- visible review prompts
- explainable thresholds
- soft escalation posture

It should not begin with:

- hard blocking by default
- rigid scores
- silent automatic routing
- fake certainty about universal thresholds

This keeps the framework honest about what is behavioral, what is reviewable, and what may later become technically enforceable.

---

## Signal types

### 1. Context inflation signals

Use when:

- cold boot is larger than task shape suggests
- exploration keeps expanding without resolving the uncertainty
- expansion happened without a visible reason

Healthy first output:

- warning
- review note
- prompt to record expansion reason

### 2. Retry waste signals

Use when:

- retries increase but strategy does not change
- the same failure pattern repeats
- retries are consuming effort without creating clarity

Healthy first output:

- warning
- ask whether the slice should change strategy, stop, or escalate

### 3. Handoff inflation signals

Use when:

- the handoff grows toward narrative replay
- restart burden stays high after handoff
- the next round still needs large reconstruction work

Healthy first output:

- review note
- hint to shrink handoff to restart-package essentials

### 4. Runtime / task-shape mismatch signals

Use when:

- a strong runtime is repeatedly used for mechanical work
- a weaker runtime is stretched across work that obviously needs deeper reasoning or review
- the same mismatch pattern repeats across slices

Healthy first output:

- advisory mismatch note
- recommendation to revisit model strategy or local usage plan

### 5. Hidden human rescue signals

Use when:

- manual rewrite is heavy
- review effort is high compared with slice value
- the result only becomes acceptable after human repair

Healthy first output:

- review note
- prompt to reassess runtime fit or validation posture

### 6. Slice-creep signals

Use when:

- adjacent work keeps entering the same slice
- the stop condition disappears
- checkpoint-like discipline was clearly skipped

Healthy first output:

- stop-and-review signal
- recommendation to re-bound the slice before continuing

---

## Signal levels

A simple three-level model is enough for the first version.

### Level 1 — note

Use when:

- there is a mild signal
- the work can continue safely
- the main value is visibility

### Level 2 — warning

Use when:

- waste or mismatch is becoming meaningful
- the next step should be reviewed before continuing by habit
- the operator should document a reason or change in posture

### Level 3 — review-required

Use when:

- the signal suggests the current path may no longer be healthy
- expansion, retries, or mismatch are clearly undermining the slice
- continuing without explicit review would likely increase waste or ambiguity

This is still not a hard block by default.
It is a stronger request for visible inspection.

---

## Good first-use rules

### Rule 1 — signals should be explainable in one sentence

A signal is only useful if a reviewer can explain why it appeared.

### Rule 2 — start with classes and review notes, not scores

The first version should prefer:

- `note`
- `warning`
- `review-required`

instead of pretending to have a universal numeric scoring model.

### Rule 3 — signals should point to an action

A signal should help answer:

- continue
- shrink
- change strategy
- hand off
- escalate
- revisit runtime fit

### Rule 4 — do not blur behavioral and technical enforcement

A signal may be derived from telemetry or heuristics, but it should not overclaim that the framework has already enforced the right behavior technically.

### Rule 5 — keep trust-boundary specifics local

A signal may say that runtime fit or hosting posture should be reviewed.
It should not silently encode one project's trust policy into the framework core.

---

## Example signal families

A healthy first signal set could look like this:

- `context-inflation-warning`
- `expansion-reason-missing`
- `retry-pattern-review`
- `handoff-inflation-warning`
- `runtime-fit-review`
- `slice-creep-review`
- `human-rescue-warning`

These names are illustrative only.
They are meant to show shape, not define a final API.

---

## Relationship to later 1.2 work

These signals are meant to unlock the next steps safely.

After signals are clearer, the framework can later discuss:

- minimal runtime adapter contracts
- advisory decision layers between agents/runtimes
- readiness gates informed by real operational signals

Signals therefore sit between:

- telemetry surfaces
- and stronger operational guidance

They are the bridge, not the endpoint.

---

## What not to do yet

Do not use policy signals yet as:

- automatic hard-stop logic by default
- vendor ranking shortcuts
- pseudo-precise scoring systems
- proof that a learning layer is ready
- a replacement for human judgment on high-stakes work

---

## Suggested next reading

- `docs/context-resource-telemetry-spec.md`
- `docs/slice-telemetry-model.md`
- `docs/waste-heuristics.md`
- `docs/enforcement-boundaries.md`
- `docs/resource-aware-operations-roadmap.md`
