# Runtime Adapter — Codex

## Goal

Describe how a project can map AletheIA's portable agent roles onto Codex without treating Codex-native mechanics as framework truth.

This is an adapter guide, not a canonical role definition.

---

## Local runtime shape

Codex is healthiest when treated as a **tool-based execution surface**.

Typical properties:

- one main session acts as the active orchestrating boundary
- delegation happens through runtime tools such as spawned agents or bounded local continuation patterns
- agent classes available in the runtime may be fewer than the framework's portable role catalog
- the runtime may prefer explicit tool calls over declarative agent files

The adapter should preserve the portable role even when the local mechanic is different.

---

## Role mapping posture

The Codex adapter should preserve three layers separately:

1. **canonical role** — `orchestrator`, `explorer`, `implementer`, `reviewer`, `validator`
2. **local runtime class** — for example `main session`, `explorer`, `worker`, or another bounded local delegation lane
3. **selected skills** — the capability artifacts that materially shape the work

A healthy Codex record does not collapse these into one label.

---

## Recommended Codex role mapping

| Canonical role | Healthy Codex mapping | Notes |
|---|---|---|
| `orchestrator` | main Codex session | owns framing, decides whether to delegate, integrates results |
| `explorer` | Codex `explorer` agent or bounded local read pass | should reduce discoverable unknowns, not drift into implementation |
| `implementer` | Codex `worker` when delegation is justified, otherwise the main session | if the work is blocking and tightly coupled, keep it local |
| `reviewer` | main session review pass or bounded delegated review lane | Codex may not expose a native `reviewer` class; preserve the canonical role anyway |
| `validator` | main session or bounded delegated validation lane | validation should stay evidence-oriented and narrow |

The important rule is:

- **canonical role stays stable**
- **Codex runtime class may vary**

---

## Skills in the Codex adapter

In Codex, skills should be treated as **instructional capability layers** that the current boundary can load or apply.

Examples:

- `implementer` -> `testing`, `debugging`, `refactoring`
- `reviewer` -> `architecture-review`, `communication`, `testing`
- `validator` -> `testing`, `workflow`

The skill should be preserved in the record or handoff only when it materially shaped:

- the chosen method
- the proof expectation
- the continuation path

Codex should not treat the skill name as a substitute for the canonical role.

---

## Delegation defaults

Healthy defaults for Codex:

- keep the **orchestrator** in the main session
- use **explorer** for discoverable unknowns
- use **worker** only when the bounded execution slice is already decision-closed
- avoid delegating urgent blocking work that the main session must inspect immediately
- avoid parallel lanes unless ownership and output shape are explicit

If a stronger review step is needed, the adapter may keep the same runtime and switch only the active role posture.

---

## Handoff pattern

A Codex handoff should usually preserve:

- current canonical role
- local runtime class used in Codex
- selected skills when relevant
- completed work
- pending work
- next action
- proof already obtained
- remaining proof expectation

Example:

- canonical role: `implementer`
- local runtime class: `worker`
- selected skills: `testing`, `debugging`
- next boundary: Claude Code `implementer`

This keeps the runtime switch explicit without changing the meaning of the role.

---

## Non-goals

This adapter should not assume:

- Codex-native mechanics are universal framework truth
- every canonical role has a 1:1 native Codex class
- delegated execution is mandatory
- the runtime must become a full router

The adapter preserves meaning.
The runtime keeps its local mechanics.
