# Resource-Aware Bounded Pilot

## Goal

Define the smallest healthy way to validate the 1.2 Resource-Aware Operations surfaces in a real project slice.

This should happen before any benchmark or learning-layer ambition.

---

## Why this exists

The 1.2 track now has:

- telemetry guidance
- waste heuristics
- progressive policy signals
- a runtime adapter shape
- advisory runtime / agent fit guidance
- planning-depth profiles
- readiness gates
- bounded examples

What is still needed is a clearer answer to:

- how should a team test these surfaces in real work?
- what should a bounded pilot actually prove?
- what should remain local instead of flowing back into the framework?

---

## Pilot posture

A resource-aware pilot should be:

- small
- reviewable
- reversible
- evidence-oriented
- local-first

Do **not** begin with:

- benchmark infrastructure
- automatic routing
- cost optimization dashboards
- learning-layer claims

---

## Good pilot candidates

A bounded pilot is healthiest when the slice already has at least one of these pressures:

- growing context drag
- repeated retries without new strategy
- heavier review burden than expected
- weak restart packages across a real handoff
- runtime fit that looks too strong or too weak for the actual slice

Good candidate shapes:

- bounded implementation with one review boundary
- constrained/local slice with stronger trust posture
- repeated maintenance round with visible retry waste
- cross-runtime or cross-lane handoff where restart quality matters

---

## What the pilot should instrument

A small pilot should try to make at least these things legible:

### 1. Slice shape

- what kind of work this was
- what planning depth was used
- what runtime fit was chosen

### 2. Resource posture

- whether context stayed bounded
- whether retries rose or stabilized
- whether handoff size stayed proportional
- whether review burden felt acceptable

### 3. Gate posture

- whether readiness gates were checked explicitly
- whether the slice should have paused earlier
- whether a handoff would have been healthier earlier

### 4. Local constraints

- what trust / hosting rules were local
- what remained project-specific
- what should not be generalized into the framework

---

## What the pilot should prove

A bounded pilot does not need to prove everything.

It is enough if it proves one or more of these:

- the 1.2 surfaces helped detect avoidable waste earlier
- the chosen planning depth was proportional or should have changed
- the runtime fit was healthier after an explicit review
- the restart package became clearer and smaller
- the framework surfaces were useful without expanding the core

---

## Valid pilot outcomes

A healthy resource-aware pilot may conclude with:

- `reinforced` -> the current 1.2 surfaces were enough
- `no-change` -> the issue was local, not a framework gap
- `example-needed` -> the framework mainly needs a better worked example
- `guidance-refinement` -> wording or ordering should improve
- `future-benchmark-signal` -> repeated comparable patterns now exist, but benchmark is still deferred

The point is not to force a framework change every time.

---

## What should remain local

A pilot should usually keep these things out of the framework core:

- provider-specific rules
- exact trust-boundary thresholds
- local routing defaults
- local approval workflow details
- local cost ceilings and procurement choices

Those belong in the project extension layer or local operating rules.

---

## Healthy closure

A bounded pilot closes well when it leaves behind:

- a compact reviewable summary
- what the framework helped with
- what remained local
- what, if anything, deserves another example or later track follow-up

That is enough to mature the 1.2 track proportionally.

---

## Suggested next reading

- `docs/resource-aware-operations-roadmap.md`
- `docs/progressive-policy-signals.md`
- `docs/planning-depth-profiles.md`
- `docs/readiness-gates-spec.md`
- `docs/resource-aware-pilot-review-checklist.md`
- `starter-pack/templates/resource-aware-pilot-review-template.md`
