# Runtime Adapter — Qwen

## Goal

Describe how a project can map AletheIA's portable agent roles onto Qwen or another lighter/custom runtime even when that runtime does not provide a mature native subagent system.

---

## Local runtime shape

A Qwen-based workflow may be more manual or project-specific.

Typical properties:

- local prompt wrappers may exist instead of native agent classes
- role switching may happen through handoff artifacts and operator choice
- continuation may rely on compact state transfer rather than richer runtime-local tooling

This is still compatible with AletheIA.

---

## Core adapter rule

When the runtime is lighter, the adapter should preserve the **same canonical role model** and accept a simpler local implementation.

A healthy Qwen mapping still separates:

1. **canonical role**
2. **local runtime wrapper or session label**
3. **selected skills**

The framework does not require a heavyweight agent platform.

---

## Recommended Qwen role mapping

| Canonical role | Healthy Qwen mapping | Notes |
|---|---|---|
| `orchestrator` | main operator-guided session | best when framing and delegation decisions remain explicit |
| `explorer` | bounded inspection prompt or wrapper | should return evidence, not drift into broad execution |
| `implementer` | execution-focused prompt wrapper or local session | should stay narrow and bounded |
| `reviewer` | critique-focused review pass | often better as a separate pass than mixed into implementation |
| `validator` | evidence-oriented validation pass | should report proof or proof gaps clearly |

If the runtime does not have native subagents, the boundary can still be real as long as the role and handoff are explicit.

---

## Skills in the Qwen adapter

A Qwen workflow may still use the same skills library as Codex or Claude Code.

That is especially useful when the runtime itself is lighter.
The skill helps preserve method consistency even when the local runtime mechanics are thinner.

Examples:

- `explorer` + `workflow`
- `implementer` + `testing`
- `reviewer` + `architecture-review`

This gives the team stack continuity without requiring runtime feature parity.

---

## Handoff-first posture

For lighter runtimes, it is healthy to lean more on:

- compact restart packages
- explicit next action
- explicit proof expectation
- narrow role continuity

A typical Qwen continuation may therefore look like:

- canonical role preserved
- local wrapper changed
- selected skills preserved only when relevant
- operator manually opens the next boundary

This is still valid AletheIA behavior.

---

## When to escalate away from the runtime

A Qwen-based boundary may deserve escalation when:

- ambiguity remains high after one bounded pass
- retries are increasing without strategy change
- semantic review becomes the real blocker
- proof design matters more than raw execution speed

Healthy moves:

- keep the same canonical role but switch runtime
- or hand off to a stronger planning/review boundary

---

## Non-goals

This adapter should not pretend that:

- a lighter runtime must emulate every richer agent feature
- missing native subagents break the framework model
- the operator bridge is a failure

The adapter remains valid if portable meaning and bounded continuity are preserved.
