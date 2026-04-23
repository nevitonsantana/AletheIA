# Agent Role Catalog

## Goal

Provide one compact index for AletheIA's portable agent-role layer.

This document exists so teams can understand the full role stack, how it relates to skills, and how it remains portable across runtimes such as Codex, Claude Code, and Qwen.

---

## Core rule

AletheIA keeps three layers distinct:

- **Agent Role** — portable operational responsibility
- **Skill** — reusable capability artifact that a role may use
- **Runtime Adapter** — runtime-local mapping of the portable role

This means:

- role is not skill
- skill is not agent
- runtime does not redefine the role

---

## Canonical role catalog

| Role | Primary job | Best used when | Common next handoff |
|---|---|---|---|
| `orchestrator` | frame the slice and decide the next healthiest boundary | the slice still needs arbitration, routing, or integration | `explorer`, `implementer`, `reviewer`, `validator` |
| `explorer` | reduce discoverable unknowns | the blocker is still discoverable rather than implementational or judgment-heavy | `implementer`, `reviewer`, `orchestrator` |
| `implementer` | execute a bounded slice | the task is decision-closed and ready for bounded execution | `reviewer`, `validator`, `orchestrator` |
| `reviewer` | challenge semantic risk, contract drift, and weak proof | the main problem is critique, approval, or semantic confidence | `implementer`, `validator`, `orchestrator` |
| `validator` | confirm or summarize closure evidence | the main problem is proof, closure, or validation clarity | `implementer`, `reviewer`, `orchestrator` |

---

## Role relationships

A healthy slice often moves through the catalog like this:

- `orchestrator` frames the slice
- `explorer` reduces discoverable unknowns when needed
- `implementer` executes the bounded change
- `reviewer` challenges semantic risk when needed
- `validator` confirms whether closure evidence is sufficient

Not every slice needs every role.
The point of the catalog is not ceremony.
The point is bounded clarity.

---

## Relationship to skills

Roles may use skills, but skills stay independent.

Typical pairings:

| Role | Frequent skill support |
|---|---|
| `orchestrator` | `workflow`, `feature-planning`, `communication` |
| `explorer` | `architecture-review`, `workflow`, `debugging` |
| `implementer` | `api-design`, `refactoring`, `testing`, `debugging` |
| `reviewer` | `architecture-review`, `communication`, `testing` |
| `validator` | `testing`, `debugging`, `workflow` |

The role still defines:

- mission
- boundaries
- stop rules
- handoff triggers
- proof expectation

The skill only improves execution discipline inside that role.

---

## Relationship to runtime adapters

The same role may appear in different runtimes with different local mechanics.

Examples:

- `implementer` in Codex -> local `worker` or main session execution lane
- `implementer` in Claude Code -> local execution-oriented agent definition
- `implementer` in Qwen -> bounded execution wrapper or operator-guided session

The portable meaning stays the same.
Only the adapter changes.

See:

- `docs/runtime-adapter-codex.md`
- `docs/runtime-adapter-claude-code.md`
- `docs/runtime-adapter-qwen.md`

---

## Reading order

If you are adopting the role system, read in this order:

1. `docs/agent-role-catalog.md`
2. `docs/agent-role-orchestrator.md`
3. `docs/agent-role-explorer.md`
4. `docs/agent-role-implementer.md`
5. `docs/agent-role-reviewer.md`
6. `docs/agent-role-validator.md`
7. `starter-pack/templates/agent-role-card-template.md`
8. `docs/runtime-adapter-codex.md`
9. `docs/runtime-adapter-claude-code.md`
10. `docs/runtime-adapter-qwen.md`

---

## Suggested next reading

- `docs/agent-handoffs.md`
- `docs/runtime-adapter-contract.md`
- `docs/agent-runtime-decision-guide.md`
- `examples/resource-aware-operations/agent-role-portability-example.md`
