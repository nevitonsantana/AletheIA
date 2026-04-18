# Work Slice Pattern

## Goal

Explain how AletheIA treats a **Work Slice** as its primary operational unit while still building on the existing core contracts.

This document should be read as the operational pattern for `Work Slice`, not as the source of the term itself.

For the canonical definition of `Work Slice` and its relationship to `Work Item`, `Restart Package`, and `Operational Boundary`, see:

- `docs/canonical-definitions.md`

A work slice is the bounded operational composition that keeps one unit of work resumable, reviewable, and restartable across boundaries.

---

## Core rule

AletheIA should read work through this lens:

- **Work Slice** = unit of operation
- **Work Item** = unit of external coordination
- **Execution Surface** = runtime detail

A work slice may point to a work item, but it does not collapse into that work item.

---

## What a work slice is

A work slice is the smallest useful bounded package of work that should remain explicit across:

- framing
- decision
- execution
- validation
- handoff when needed
- restart when the boundary changes
- learning when warranted

In practice, a work slice usually composes these artifacts:

1. **task brief**
2. **decision record**
3. **execution record**
4. **handoff record** when work crosses a boundary
5. **restart package** when a clean execution surface is healthier
6. **learning record** when the slice produces reusable learning

---

## Why this matters

Without a visible work-slice unit, teams drift toward the wrong anchors:

- the runtime conversation starts to feel like the source of truth
- an issue or board card starts to feel like the operational unit
- validation, restart, and learning lose their connection to one bounded step

The work-slice pattern keeps those layers distinct.

---

## Relationship to Work Items

A slice may map to:

- one work item
- part of one work item
- several slices inside one larger work item

This is normal.
The framework only needs the distinction to remain legible.

See also: `docs/work-item-pattern.md`.

A Work Slice may cross more than one theme or concern without requiring formal handoff.

Explicit coordination becomes necessary only when the slice crosses an Operational Boundary.

---

## When to use a work slice

Use a work slice when at least one of these is true:

- the work is no longer trivial or one-shot
- the work should survive more than one turn or one execution surface
- the work will cross an agent, review, or validation boundary
- the work needs clearer risk and validation posture
- the work may produce reusable learning

---

## Derived operational states

A useful operational read may include:

- `framed`
- `context-scoped`
- `decision-recorded`
- `execution-in-progress`
- `validation-pending`
- `review`
- `validated`
- `blocked`
- `escalated`
- `learning-stored`

This remains a reading layer, not a mandatory engine state machine.

---

## Suggested file shape

One healthy way to keep a slice legible is to group together:

- `task-brief.json`
- `decision-record.json`
- `execution-record.json`
- `handoff-record.json` when needed
- `restart-package.md` when the next boundary will resume on a clean surface
- `learning-record.json` when generated
- `README.md` to explain the slice in plain language

This is still a convenience pattern, not a required filesystem contract.
