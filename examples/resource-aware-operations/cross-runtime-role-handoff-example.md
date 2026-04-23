# Cross-Runtime Role Handoff Example

## Goal

Show how the same AletheIA role can continue from Codex to Claude Code without changing its semantic meaning.

---

## Slice context

- slice goal: finish a bounded implementation and prove the contract end to end
- current canonical role: `implementer`
- current runtime: Codex
- selected skills: `testing`, `debugging`
- remaining proof expectation: targeted test plus smoke

---

## Boundary reason

The implementation work is partially done, but the current Codex boundary is stopping because the runtime session cannot continue comfortably.

This is a runtime boundary, not a role change.

---

## Compact handoff

### Current agent role

`implementer`

### Receiving agent role

`implementer`

### Selected skills to preserve

- `testing`
- `debugging`

### Status

ready for continuation

### What was completed

- bounded patch already applied
- targeted test path identified
- contract assumptions stayed unchanged

### What remains pending

- run the final smoke
- confirm the changed contract end to end
- summarize any remaining residual risk

### Next action

Continue as `implementer` in Claude Code, preserve the same proof expectation, run the smoke, and report whether the slice is now ready for closure.

### Validation expectation

- targeted test if not yet confirmed in the new boundary
- smoke for end-to-end confidence
- explicit note about what was or was not validated

### Main risks

- the next boundary may accidentally reinterpret this as a review step instead of implementation continuation
- the runtime switch may hide the fact that the portable role is unchanged

---

## Why this is healthy

What stayed the same:

- canonical role
- mission
- proof expectation
- selected skills

What changed:

- execution surface
- local runtime adapter
- local agent mechanics

This is the intended AletheIA portability shape.
