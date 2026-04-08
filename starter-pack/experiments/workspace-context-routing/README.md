# Experimental Workspace Context Routing

## Status

Experimental.
Optional.
Non-canonical.

This folder does **not** redefine AletheIA core.
It is a starter-pack experiment for teams who want to test a more physical, filesystem-based way of routing context.

---

## Goal

The experiment asks a narrow question:

**Can a lightweight filesystem structure make context selection, stage focus, and handoff continuity easier without inflating the framework core?**

The intended gain is operational, not architectural.

---

## What this experiment is trying to prove

A useful experiment should help teams test:

- selective context loading
- a clearer separation between stable reference material and transient work artifacts
- lighter stage-specific context
- continuity through artifacts rather than hidden thread memory

---

## What this experiment is not

This experiment is not:

- a new runtime
- a new kernel feature
- a new mandatory folder contract
- a replacement for the existing AletheIA schemas
- a claim that filesystem routing is the only correct operating model

---

## Suggested loading order

A healthy reading pattern is:

1. `GLOBAL_CONTEXT.md`
   - broad rules that apply to the whole workspace
2. `WORKSPACE_CONTEXT.md`
   - the specific work area or slice being worked on
3. `STAGE_CONTEXT.md`
   - the current step or stage only
4. selected files in `references/`
   - stable knowledge or rules
5. current files in `artifacts/`
   - transient outputs and records
6. current files in `handoffs/`
   - continuation packages for the next boundary

This sequence is meant to reduce prompt sprawl, not to enforce a universal filesystem ideology.

---

## Example structure

See `example/` for a minimal concrete layout with:

- `GLOBAL_CONTEXT.md`
- `WORKSPACE_CONTEXT.md`
- `STAGE_CONTEXT.md`
- `references/`
- `artifacts/`
- `handoffs/`

---

## Decision boundary

Keep this experiment in the starter-pack layer until real use proves that it:

- improves clarity
- reduces manual context routing effort
- strengthens handoff continuity
- stays optional and easy to abandon

If it starts behaving like a required architecture, it has already gone too far.
