# Work Slice Spec Bundle

## Goal

Define an optional specification bundle for AletheIA Work Slices that need more clarity before execution.

The bundle helps a slice make ambiguity, requirements, technical decisions, tasks, and readiness evidence reviewable without turning AletheIA into a heavyweight delivery methodology.

---

## Core rule

The Work Slice remains the operational unit.

The spec bundle is only an optional artifact group inside a Work Slice.
It is not a new lifecycle, a new state machine, or a replacement for the task brief, decision record, execution record, handoff, restart package, or learning record.

Healthy reading:

```text
Work Slice -> optional spec bundle -> execution / validation / closeout
```

Unhealthy reading:

```text
Spec bundle -> project lifecycle -> every task must fill every document
```

---

## Why this exists

AletheIA already has:

- Work Slices as bounded operational units;
- planning-depth profiles;
- readiness gates;
- task briefs and work-slice templates;
- handoff and restart discipline.

What is still useful for some `Standard` and `High-Assurance` slices is a clearer intermediate bundle between initial framing and execution.

The bundle is meant to reduce four common failure modes:

1. implementation begins while requirements are still implicit;
2. technical choices appear before the `what` and `why` are clear;
3. tasks become a backlog instead of an executable slice plan;
4. readiness review becomes a narrative claim instead of inspectable evidence.

---

## When to use

### Lite

Do not use the bundle by default.

A `Lite` slice should normally stay with the task brief, work-slice framing, and proportional validation.

Use one small section from the bundle only if it removes immediate ambiguity faster than a longer discussion.

### Standard

Use the bundle when the slice is still bounded but has meaningful ambiguity, cross-artifact coordination, or moderate semantic risk.

Recommended artifacts:

- `spec.md`
- `plan.md`
- `tasks.md`

`readiness-review.md` is optional unless review burden is already visible.

### High-Assurance

Use the bundle when the slice is hard to reverse, trust-sensitive, review-heavy, or likely to cross a boundary.

Recommended artifacts:

- `spec.md`
- `plan.md`
- `tasks.md`
- `readiness-review.md`

For `High-Assurance`, the readiness review should instantiate existing AletheIA gates rather than define new ones.

---

## Artifact roles

### `spec.md`

Clarifies the `what` and `why` before the technical plan.

It should include:

- problem and objective;
- user, operator, or system outcomes;
- functional expectations;
- explicit assumptions;
- open questions;
- `[NEEDS CLARIFICATION]` items that should not be silently inferred.

The spec should avoid premature architecture, stack choices, or implementation detail unless those are already a governing constraint.

### `plan.md`

Explains the `how` after the spec is clear enough.

It should include:

- proposed approach;
- requirement-to-decision traceability;
- key risks and tradeoffs;
- non-goals and stop lines;
- validation approach;
- boundary or handoff expectations.

A technical decision should point back to a requirement, risk, constraint, or explicit human choice.

### `tasks.md`

Turns the plan into executable slice work.

It should include:

- ordered checkpoints;
- implementation tasks for the current slice;
- validation tasks;
- dependency or handoff notes.

Tasks should describe executable slice steps, not a roadmap, product backlog, or full project phase plan.

### `readiness-review.md`

Instantiates existing readiness gates for this slice.

It should answer whether the slice should:

- `continue`;
- `tighten`;
- `review`;
- `handoff`;
- `escalate`;
- `stop`.

It should not redefine readiness gates or duplicate `docs/readiness-gates-spec.md`.

---

## Clarification first

The highest-value behavior in this bundle is not the file structure.
It is the discipline of clarifying before planning.

Before writing or accepting `plan.md`, inspect `spec.md` for:

- unresolved open questions;
- assumptions that affect architecture, risk, scope, or validation;
- hidden decisions that would change the execution path;
- `[NEEDS CLARIFICATION]` markers that should become human decisions, explicit defaults, or stop lines.

If a question changes scope, risk, or validation, do not bury it in the plan.
Either answer it, tighten the slice, or route it to the relevant decision boundary.

---

## Relationship to Adaptive Skills

AletheIA should decide when this bundle is justified and what readiness posture applies.

A companion skill library may help execute the method by:

- eliciting clarification questions;
- shaping the spec;
- decomposing the plan;
- checking for overengineering;
- stress-testing consequential plans.

The method should stay outside the AletheIA core when it becomes specialist facilitation.
AletheIA governs the slice; skills shape capability.

---

## Anti-ceremony guardrails

Do not use the bundle to:

- make every small task fill four documents;
- import a full external specification lifecycle;
- create a project backlog inside one slice;
- duplicate the Work Slice template;
- redefine readiness gates;
- hide uncertainty behind polished language;
- promote a skill method into framework core truth.

A healthy bundle is smaller than the risk it reduces.

---

## Starter templates

Use these starter-pack templates when the bundle is justified:

- `starter-pack/templates/work-slice-spec-template.md`
- `starter-pack/templates/work-slice-plan-template.md`
- `starter-pack/templates/work-slice-tasks-template.md`
- `starter-pack/templates/work-slice-readiness-review-template.md`

For narrow slices, copy only the sections that are useful.

---

## Suggested next reading

- `docs/work-slice-pattern.md`
- `docs/planning-depth-profiles.md`
- `docs/readiness-gates-spec.md`
- `starter-pack/templates/work-slice-template.md`
- `starter-pack/guides/risk-to-gate-mapping.md`
- `examples/work-slices/standard-spec-bundle/README.md`
