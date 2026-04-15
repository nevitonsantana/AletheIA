# Policy Signals Review Example

## Context

A bounded slice begins as a small implementation round, but the execution pattern starts drifting.

Observed conditions:

- cold boot stayed reasonable
- exploration expanded twice
- the second expansion had no explicit reason
- two retries happened without a visible strategy change
- the handoff draft started growing toward narrative replay

## Useful signals

### `expansion-reason-missing`

Why it fires:

- at least one meaningful expansion happened without an explicit reason

What it should cause:

- add a reason
- or shrink the slice back to what is clearly justified

### `retry-pattern-review`

Why it fires:

- retries are increasing without a change in operating approach

What it should cause:

- stop repeating the same attempt
- decide whether to change strategy, hand off, or escalate

### `handoff-inflation-warning`

Why it fires:

- the handoff is no longer a compact restart package

What it should cause:

- rewrite the handoff around what changed, what was proved, and what remains open

## Why this is useful

The point is not to block the slice automatically.
The point is to make the unhealthy drift visible before the team keeps paying for it.

## Why this is still only Phase B

This example does not require:

- a runtime adapter
- scoring
- benchmark infrastructure
- learning-layer feedback

It only requires that the framework can name the signal, explain it, and point to a healthier next move.
