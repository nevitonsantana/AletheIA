# Standard Work Slice Example — Specification Facilitation Bundle

## Goal

Show how a `Standard` Work Slice can use the optional Work Slice Spec Bundle without turning it into a mandatory lifecycle.

This example uses AletheIA as the macro layer and Adaptive Skills as the micro facilitation layer:

```text
AletheIA Work Slice -> clarify -> spec -> plan -> tasks -> readiness support
Adaptive Skills -> workflow + feature-planning + optional premortem
```

It does not introduce `.specify/`, a CLI, a project constitution, or a parallel methodology.

---

## Scenario

A product team wants to add a short readiness summary before an operator starts a multi-step action.

The request is bounded enough for a `Standard` slice, but not clear enough for immediate implementation because two choices could change scope, proof, and readiness:

- should unavailable readiness data block the action or only warn the operator?
- which existing data state is authoritative for readiness?

The slice activates the optional bundle because unresolved ambiguity could change execution.
It remains `Standard` because the first slice can stay reversible and reviewable if blocking behavior is kept out of scope.

---

## Macro layer: AletheIA

AletheIA governs:

- Work Slice framing;
- planning depth;
- readiness gates;
- continuity and handoff decisions;
- proof before closure.

Example Work Slice frame:

- goal: show a readiness summary before the operator starts the action;
- in scope: summary content, unavailable-data state, proof that existing action behavior is unchanged;
- out of scope: new readiness engine, new data source, workflow redesign, approval-rule changes;
- planning depth: `Standard`;
- expected proof: smoke or focused check showing summary visibility and unchanged action semantics.

---

## Micro layer: Adaptive Skills

Adaptive Skills facilitates the method:

- `workflow` frames the immediate boundary and minimum proof;
- `feature-planning` runs specification clarification, smallest-slice planning, traceability, and anti-overengineering review;
- `premortem` is optional and only enters if the plan starts changing blocking behavior or other consequential decisions.

The skills do not decide AletheIA readiness gates.
They help produce clearer inputs for those gates.

---

## 1. Clarify

The facilitation pass keeps only questions that would change the plan, proof, architecture, or readiness.

```md
## Clarifications
- `[NEEDS CLARIFICATION]`: Should unavailable readiness data block the action, or only warn the operator?
  - Why it matters: changes behavior, risk posture, acceptance evidence, and whether premortem is justified.
  - Default for first slice: warn only; do not change action semantics.

- `[NEEDS CLARIFICATION]`: Which existing data state is authoritative for readiness?
  - Why it matters: prevents inventing a new readiness source inside the first slice.
  - Default for first slice: use the already documented source if it exists; otherwise stop before implementation.
```

Questions about future dashboard design, visual polish, or automation are deferred because they do not change the smallest useful slice.

---

## 2. Spec

The spec keeps `what` and `why` separate from `how`.

```md
## What / Why
- What: show a short readiness summary before the operator starts the multi-step action.
- Why: reduce accidental starts when readiness context is missing, stale, or unavailable.

## Functional expectations
- The operator sees readiness status before initiating the action.
- Missing readiness data is visible rather than inferred.
- The first slice does not change the underlying action behavior.

## How boundary
- Already decided: use existing readiness data; do not introduce a new data source.
- Not decided yet: whether unavailable data should block the action in a later slice.
- Explicit stop line: do not implement blocking behavior until the block-versus-warn clarification is answered.
```

---

## 3. Plan

The plan chooses the smallest useful slice: render an informational readiness summary using existing data and preserve current action semantics.

| Requirement | Decision | Task | Acceptance evidence |
| --- | --- | --- | --- |
| Operator can see readiness before acting. | Add the summary before the action starts, not after confirmation. | Render the readiness summary in the existing flow. | Smoke confirms the summary appears before the action. |
| Missing readiness data is visible. | Do not infer readiness from partial or absent data. | Add an unavailable-data state. | Focused check covers missing readiness data. |
| First slice remains reversible. | Keep action semantics unchanged until block-versus-warn is decided. | Avoid disabling or blocking the action in this slice. | Existing action smoke still passes. |

This trace is intentionally small.
It is enough for review, but not a roadmap.

---

## 4. Tasks

Tasks are executable checkpoints for the current Work Slice.

```md
## Execution checkpoints

1. Locate existing readiness state
   - Verify the source already exists.
   - Stop if no authoritative source exists.
   - Evidence: source reference recorded in the plan.

2. Render readiness summary
   - Add summary using existing data.
   - Add unavailable-data state.
   - Evidence: smoke or focused UI check shows both states.

3. Preserve current action behavior
   - Confirm the action still behaves as before.
   - Avoid block/warn enforcement logic in this slice.
   - Evidence: existing action smoke still passes.
```

Out-of-slice backlog:

- decide whether unavailable readiness data should block the action;
- consider premortem before introducing blocking behavior;
- evaluate workflow redesign only in a separate Work Slice.

---

## 5. Readiness support

The readiness review instantiates AletheIA gates for this slice.
It does not redefine the gate model.

| Gate | Status | Evidence |
| --- | --- | --- |
| Context minimum exists | `pass` | Existing flow and readiness source identified. |
| Decision is clear enough | `tighten` | First slice can proceed only if action semantics stay unchanged. |
| Risk is mapped enough | `pass` | Informational summary is reversible; blocking behavior is deferred. |
| Handoff is usable enough | `not_needed` | No boundary yet if implementation stays in the same slice. |
| Runtime / agent fit is acceptable enough | `pass` | Balanced executor is enough for a docs/product/UI slice with focused validation. |

Outcome: `continue` for the informational summary slice.

Required adjustment before execution:

- keep `[NEEDS CLARIFICATION]` items visible in the spec;
- do not implement blocking behavior until the relevant clarification is resolved;
- record any new readiness-source ambiguity as a stop condition.

---

## Premortem decision

Do not run `premortem` for the first informational summary slice if it remains reversible and does not change action semantics.

Run `premortem` before a later slice if the team decides to add blocking behavior, because a false block or false pass has meaningful operational cost and the plan can still change.

---

## Why this stays proportional

This example uses the bundle because ambiguity affects execution, proof, and readiness.

It stays proportional because:

- `Lite` slices are not affected;
- the example does not copy Spec Kit structure or tooling;
- tasks stay tied to the current Work Slice;
- Adaptive Skills facilitates clarification and traceability without becoming the macro layer;
- AletheIA remains responsible for readiness and boundary decisions.
