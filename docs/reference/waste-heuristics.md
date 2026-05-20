# Waste Heuristics

## Goal

Give AletheIA a lightweight, reviewable way to talk about waste before stronger policy signals or benchmarking exist.

This guide is not trying to optimize for token count alone.
It is trying to distinguish **proportional effort** from **avoidable operational waste**.

---

## Waste versus healthy cost

Not every expensive slice is wasteful.
Not every cheap slice is efficient.

A slice may be costly and still healthy when:

- risk is real
- ambiguity is high
- validation needs depth
- handoff quality matters
- human review is proportionate to the stakes

Waste appears when effort grows without proportional gain.

---

## Core waste patterns

### 1. Context inflation

Signals:

- cold boot is larger than task shape suggests
- exploration keeps growing without resolving the real uncertainty
- expansion occurs without a clear reason

### 2. Retry waste

Signals:

- multiple retries happen without changing strategy
- retries repeat the same context posture and same failure pattern
- retries add cost but not clarity

### 3. Handoff inflation

Signals:

- handoff artifacts grow toward transcript replay
- the next round still needs heavy reconstruction despite the handoff
- restart burden stays high even after a handoff was written

### 4. Capability mismatch

Signals:

- a high-capability runtime is used for clearly mechanical work
- a low-capability runtime is kept on a slice that obviously needs deeper reasoning or review
- the task shape and chosen runtime repeatedly misalign

### 5. Hidden human rescue

Signals:

- the model output only becomes usable after heavy human rewrite
- review time becomes large compared with the value of the slice
- a result looks acceptable only because humans silently repaired it

### 6. Slice creep

Signals:

- adjacent follow-up keeps entering the current round
- the current slice loses its stop condition
- checkpoint decisions are skipped even though the task changed shape

---

## Healthy counter-patterns

A slice is usually healthy when it shows:

- bounded cold boot
- explicit reasons for expansion
- retries that change strategy when needed
- compact handoffs that really reduce restart burden
- runtime fit that looks proportional to task shape and risk
- human review that confirms quality instead of rescuing weak output

---

## First review questions

Use these questions before claiming waste.

1. Was the task genuinely high-ambiguity or high-risk?
2. Did expansion have a real reason?
3. Did retries change the operating approach?
4. Did the handoff reduce restart burden or only document it?
5. Did the selected runtime or agent fit the slice shape?
6. Was human effort proportional, or was it hiding weak output quality?

---

## Recommended first-use posture

Use these heuristics as:

- a review lens
- a policy-signal input later
- a comparative discussion tool

Do not use them yet as:

- a rigid score
- a hard blocker
- a vendor ranking shortcut
- a full performance benchmark

---

## Relationship to the 1.2 track

These heuristics are intentionally early and lightweight.
They are meant to support the first resource-aware operational questions:

- where is the waste likely happening?
- what kind of waste is it?
- is the problem context, retries, handoff, runtime fit, or hidden human burden?

That is enough to justify later policy signals without forcing premature automation.

---

## Suggested next reading

- `docs/context-resource-telemetry-spec.md`
- `docs/slice-telemetry-model.md`
- `docs/resource-aware-operations-roadmap.md`
