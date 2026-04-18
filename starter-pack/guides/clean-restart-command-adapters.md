# Clean Restart Command Adapters

This guide adds a small operator-facing command vocabulary on top of the existing slice-finalization flow.

It does **not** change the core framework contract.
It only shows how a team may expose clean-restart behavior through lightweight, runtime-local adapters.

Use this guide together with:

- `docs/slice-finalization-and-restart.md`
- `docs/deprecated-thread-centric-language.md`
- `starter-pack/templates/slice-finalization-review-template.md`
- `starter-pack/templates/restart-bootstrap-prompt-template.md`

---

## Core rule

The adapter may name local runtime actions however it wants.
The core meaning must stay:

- finalize a work slice
- decide whether a clean execution surface is healthier
- resume from the restart package only

---

## Command semantics

### `/finalize-slice`

Purpose:

- run the slice-finalization review
- fill the finalization template
- emit a copyable restart package block
- decide the finalization outcome

Required result:

- `continue-on-current-surface`
- `recommend-clean-restart`
- `review-required`
- `not-ready`

### `/clean-restart`

Purpose:

- start a clean execution surface only after the slice is already closed cleanly
- make it explicit that the next work item or slice should not begin on the stale runtime surface

### `/resume-from-package`

Purpose:

- resume work from the restart package only

---

## Runtime mappings

These are illustrative mappings, not core requirements.

### Codex-style mapping

An adapter may say things like:

- open a new thread
- use `/clear`

That is acceptable only when the adapter also makes explicit that these are **runtime-local phrases** for the core action: **resume on a clean execution surface**.

### Claude Code-style mapping

An adapter may describe a fresh chat or session boundary.
Again, the core meaning must remain the same.

### No slash-command support

If the runtime has no slash-command surface, use the same flow as an operator checklist with no semantic loss.

---

## Recommended operator sequence

1. `/finalize-slice`
2. inspect the outcome
3. if `recommend-clean-restart`, start a clean execution surface
4. before starting the next work item or slice, confirm the stale surface has been abandoned
5. resume from the restart package and bootstrap prompt only

---

## What this guide does not do

This guide does not:

- define a CLI binary
- define runtime hooks
- define auto-reset behavior
- guarantee native slash-command support
- redefine slice finalization as a tooling problem
