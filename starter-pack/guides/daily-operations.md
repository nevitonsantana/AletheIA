# Daily Operations Guide

## Goal

Provide a short, repeatable operating pattern for using AletheIA in day-to-day work.

This guide is intentionally lighter than the full framework docs.
It is for people who already understand the basic model and want a practical default loop.

---

## The short daily loop

Use this sequence for most non-trivial work:

1. **Frame the slice**
   - what is the actual goal?
   - what is in scope?
   - what proof will count before closure?

2. **Load only the governing context**
   - source-of-truth artifact
   - local operating rules when relevant
   - minimum contracts or decisions that still constrain the slice

3. **Choose the right boundary**
   - stay in the current boundary if the task is still proportional
   - hand off only when the boundary really changed
   - avoid opening parallel work without explicit ownership

4. **Execute the smallest useful move**
   - prefer one bounded step over broad optimistic progress
   - keep the next action explicit

5. **Validate before claiming done**
   - run the minimum proof that matches the slice
   - say clearly what was validated and what was not

6. **Close, hand off, or restart cleanly**
   - if the slice is done, close it clearly
   - if the boundary changed, leave a compact restartable handoff
   - if the runtime is no longer healthy, prefer a clean restart package over transcript replay

---

## Healthy daily defaults

Use these defaults unless the slice clearly needs more structure:

- one bounded slice at a time
- one source-of-truth artifact when possible
- one explicit validation expectation
- one clear next action
- one compact handoff when work crosses a real boundary

---

## When to slow down

Slow the work down when:

- ambiguity is still high
- the source of truth is unclear
- the validation expectation is still fuzzy
- the work crossed into a new risk or ownership boundary
- retries are increasing without better clarity

When one of these appears, return to framing instead of forcing execution.

---

## When to hand off

Hand off when the next boundary is meaningfully different, for example:

- runtime fit changed
- ownership changed
- the work moved from execution into review
- the main need became validation, not more implementation

A good handoff should preserve:

- current status
- what was completed
- what remains pending
- next action
- validation expectation
- main risks

---

## What to avoid

Avoid these patterns in daily use:

- loading too much context too early
- treating every task like a full multi-boundary workflow
- using hidden thread memory as the main continuity layer
- claiming closure without explicit proof
- continuing in the same boundary after the work clearly changed shape

---

## Best companion docs

Use this guide together with:

- `docs/getting-started.md`
- `docs/governance.md`
- `docs/agent-handoffs.md`
- `docs/slice-finalization-and-restart.md`
- `starter-pack/templates/agent-handoff-template.md`
