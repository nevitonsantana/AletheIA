# Slice Finalization & Restart Guidance

## Goal

Define a manual-first way to close a work slice cleanly, preserve continuity through a compact restart package, and recommend a **clean execution surface** only when transcript replay is no longer needed.

This is not a thread-control feature.
It is a slice-finalization capability.

In canonical AletheIA vocabulary:

- a Restart Package is the continuity artifact used when work must resume across a real boundary
- that boundary should be understood as an Operational Boundary, not as thematic crossing by itself

For canonical terminology, see:

- `docs/canonical-vocabulary.md`

---

## Core rule

AletheIA should optimize for:

- `restart package, not transcript`
- `work slice, not conversation history`
- `execution surface as runtime detail, not framework truth`

---

## Why this exists

Long AI-assisted execution surfaces accumulate stale context.
That creates avoidable fatigue for both humans and agents.

Examples:

- recap drag before the next bounded step begins
- repeated questions about already-settled decisions
- drift caused by staying on the same stale surface after the real slice boundary was crossed

---

## Relationship to other AletheIA surfaces

This guide builds on:

- `docs/canonical-definitions.md`
- `docs/agent-handoffs.md`
- `docs/work-slice-pattern.md`
- `docs/readiness-gates-spec.md`
- `docs/slice-telemetry-model.md`

Use the existing handoff surfaces as the structured continuity artifact.
Use this guide as the operational review layer for deciding whether the slice is healthy to continue on the current execution surface or should resume on a clean one.

---

## Finalization flow

A healthy slice finalization should follow this order:

1. validation check
2. continuity check
3. AI fatigue read
4. finalization outcome
5. optional clean-restart recommendation

The goal is not to restart by habit.
The goal is to restart when continuing on the same execution surface now carries more drag than value.

A Restart Package is justified when continuity can no longer remain implicit, not merely because the work touched more than one concern.

---

## Minimum finalization questions

### 1. Was the slice validated?

If validation is still incomplete, the slice is not ready.

### 2. Is the next action explicit?

If the next action is unclear, clean restart is unsafe.
The slice needs review first.

### 3. Is a structured continuity artifact available?

A compact restart package should exist whenever the next boundary matters.

### 4. Does the next step still belong to the same slice?

If yes, continuing on the current execution surface may still be healthier.
If not, a bounded restart may be healthier.

### 5. Would the next execution surface still depend on transcript replay?

If yes, the slice has not closed cleanly enough.

---

## AI Fatigue Read

A finalization review should explicitly read these fields:

- `stale_context_risk`: `low | medium | high`
- `transcript_replay_needed`: `yes | no`
- `restart_burden`: `low | medium | high`
- `handoff_size_class`: `compact | inflated | heavy`
- `redundant_question_risk`: `low | medium | high`
- `governing_context_changed`: `yes | no`
- `governing_context_refs`: list of refs
- `governing_context_summary`: short summary when changed

### Hard rule

If `transcript_replay_needed = yes`, the slice is **not** ready for healthy clean restart.

---

## Finalization outcomes

### `continue-on-current-surface`

Use when:

- the next step still belongs to the same bounded slice
- context carryover is still useful
- fatigue signals are still low enough that continuing is healthier than resetting

### `recommend-clean-restart`

Use when:

- the slice is validated
- the next action is explicit
- the restart package is compact
- transcript replay is not needed
- stale context risk for the next slice is `medium` or `high`

### `review-required`

Use when:

- the next action is ambiguous
- regression or fork is still open
- the handoff is inflated
- restarting now would carry confusion into the next boundary

### `not-ready`

Use when:

- validation is incomplete
- conflict or high-risk review is still open
- the closure rule is not yet satisfied

---

## Restart package as a physical block

Do not treat the restart package as only a loose summary inside the handoff.

For this version, the operator-facing artifact should include a copyable markdown block:

```md
<!-- RESTART_PACKAGE_BEGIN -->
## Context for Clean Restart
- **Project:** ...
- **Official Work Item:** ...
- **Slice ID:** ...
- **Related Work Item:** ...
- **Validation Status:** ...
- **Mission Focus:** ...
- **Resume Entrypoint:** ...
- **Last Boundary Summary:** ...
- **Do Not Reopen:** ...
- **Next Official Step:** ...
- **Open New Execution Surface:** `yes | no`
- **Why:** ...
- **Next Immediate Action:** ...
- **Known Constraints:** ...
- **Governing Context Refs:** ...
- **Governing Context Delta:** ...
<!-- RESTART_PACKAGE_END -->
```

### Required continuity rule

Every finalization-ready slice should leave a **Finalization Context Prompt** that is:

- short
- copyable
- project-identified
- explicit about whether the next action should open a new execution surface

This exists to reduce:

- token waste
- memory dependence
- transcript replay
- accidental reopening of the closed slice

The package must therefore answer:

1. what project or system this belongs to
2. what official work item anchors the slice when an adapter exists
3. what was proved enough to close the slice
4. what must not be reopened
5. what the next official step is
6. whether the next action should open a new clean execution surface, and why

### New execution-surface rule

The restart package must explicitly say:

- `Open New Execution Surface: yes`
- or `Open New Execution Surface: no`

and give a one-line reason.

Use `yes` when:

- the next step belongs to a new slice
- the next step crosses a new executor, tool, contract, risk, or ownership boundary
- carrying the current transcript would cost more than it helps

Use `no` when:

- the next step is still inside the same bounded slice
- no meaningful boundary changed
- continuing locally is cheaper and clearer than restarting

---

## Compatibility note

Older materials may still say things like:

- fresh thread
- clean session
- clear the chat

Those phrases should now be read as runtime-local examples of the same core meaning:

**resume on a clean execution surface from the restart package only**

See `docs/deprecated-thread-centric-language.md`.

---

## Runtime boundary

AletheIA does **not** depend on a runtime command such as `/clear` or `/new`.

Runtime-local actions remain examples only.
The core capability is still:

- finish the slice
- preserve continuity
- detect fatigue risk
- recommend clean restart when healthy

---

## Success read

A healthy restart recommendation should usually imply:

- `transcript_replay_needed = no`
- `redundant_question_risk = low`
- `restart_burden = low`

A practical success proxy remains:

- **TRC (Time to Recover Context)** `< 2 interactions`
