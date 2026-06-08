# Autonomy Levels

> Posture: `docs_first`, `advisory_first`. This document describes vocabulary and required behavior.
> It does not implement a runtime, a permission engine, or any tool. It is provider-agnostic.

## Goal

Name the levels of authority an agent may hold, so a skill can declare a ceiling and a harness can
enforce one. **Autonomy is about authority, not depth.** How deep a task runs (effort) is governed by
the [Runtime Effort Governance Contract](../contracts/runtime-effort-governance-contract.md); how much
authority the agent holds is this axis.

## Canonical levels

These four values are the **source of truth** and are enforced structurally by the
[Agent Harness Contract schema](../../schemas/agent-harness-contract.schema.json)
(`enum: ["observe", "advise", "act_with_approval", "autonomous_within_bounds"]`) and described in
[`agent-harness-contract.md`](../contracts/agent-harness-contract.md) and
[ADR-013](../adr/ADR-013-agent-harness-contract.md). Do not invent additional level names.

```yaml
autonomy_levels:
  observe:
    description: "Can inspect context and summarize. No recommendations that trigger action."
  advise:
    description: "Can recommend options and record decisions. No tool side effects."
  act_with_approval:
    description: "Can prepare or execute bounded actions only after explicit approval gates."
  autonomous_within_bounds:
    description: "Can act within narrow, pre-approved constraints; must declare blocked actions and rollback."
```

The schema enforces that `autonomous_within_bounds` declares at least one blocked action and requires
rollback (Invariant 3). Treat unbounded autonomy as out of scope for this phase.

## Vocabulary reconciliation

External material (the Agent Harness Enforcement Addendum drafts) sometimes uses a five-level model
with `bounded_autonomous` and a standalone `autonomous`. Map them to the canonical vocabulary:

| External draft term | Canonical AletheIA level |
|---|---|
| `observe` | `observe` |
| `advise` | `advise` |
| `act_with_approval` | `act_with_approval` |
| `bounded_autonomous` | `autonomous_within_bounds` |
| `autonomous` (unbounded) | out of scope — not a level in this phase |

Skills in the Adaptative Skills repo declare an autonomy `floor` and `ceiling` using **these canonical
names** in their per-skill `harness_requirements` (see Adaptative Skills
`docs/harness-requirements-for-skills.md`).

## See also

- [agent-harness-contract.md](../contracts/agent-harness-contract.md) — per-task envelope that carries the level.
- [tool-risk-taxonomy.md](tool-risk-taxonomy.md) — the orthogonal "how risky is this tool" axis.
- [enforcement-boundaries.md](enforcement-boundaries.md) — who declares vs. who enforces.
