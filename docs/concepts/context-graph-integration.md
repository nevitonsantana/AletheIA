# Context Graph Integration

## Goal

Define how a code-structure graph (such as `code-review-graph`) fits into the AletheIA operational model — as a **context access layer**, not as memory, orchestrator, or readiness authority.

---

## Core principle

> **AletheIA governs; the graph informs.**

The graph is a read tool. It helps locate relevant files and estimate impact before or during a slice. It does not decide whether to proceed, approve scope, or replace human judgment about risk.

---

## What the graph does

A code-structure graph can answer:

- which files are involved in a change (impact radius)?
- which files are the minimal context needed to understand a task?
- what are the structural dependencies of a module?
- what areas of the codebase are connected to a proposed change?
- are there gaps or bridges between modules that affect the decision?

These are **exploration questions**. They help the agent read less irrelevant code and miss fewer relevant connections.

---

## What the graph does not do

The graph does not:

- replace reading the actual files once identified
- decide whether a slice is ready to proceed
- validate that a change is correct
- substitute for the human review that readiness gates require
- guarantee completeness — it can miss dynamic dependencies

---

## When to use the graph

| Task shape | Use graph? | Reason |
|---|---|---|
| Bug in one known file | No | Direct read is faster; graph adds overhead |
| Bug with uncertain dependencies | Optional | Use only if first read leaves questions |
| Refactor touching multiple files | Yes, before execution | `impact-radius` before starting and before validating |
| PR review | Yes | `minimal-context` → `review-context` → selective read |
| Architecture / onboarding | Yes | Overview, communities, hubs, bridges, gaps |
| Product or governance decision | No | Graph informs technical impact only |

The rule: proportional access. Use the graph when you genuinely do not know which files matter. Do not make it a mandatory first step for every slice.

---

## Relationship to existing AletheIA contracts

### Token policy

Graph queries are an exploration event. Record them as such in the slice telemetry model (`exploration_events`). If the graph query leads to fewer files read overall, note whether it reduced expansion. If it led to more files, note whether the expansion was justified.

### Runtime adapter contract

A graph-extended adapter adds four fields to the base contract shape (see `docs/runtime-adapter-contract.md`):

- `context_source` — set to `code-graph` when the graph was used
- `graph_operation` — which operation was used (see usage guide)
- `files_suggested_by_graph` — count or list
- `files_actually_read` — count or list

See `examples/resource-aware-operations/context-graph-adapter-example.md` for the full shape.

### Readiness gates

The graph may inform gates but does not pass them.

- **Gate 1 (context minimum):** graph can help confirm the relevant files were found
- **Gate 3 (risk mapped):** a large `blast_radius_size` is a signal to deepen planning, not a gate-passing condition
- **Gate 4 (handoff usable):** include graph-identified files and open dependencies in the restart package

If the graph reveals unexpected dependencies, the default response is to return the decision to `tighten` or `review` — not to treat coverage as complete.

### Slice telemetry

Record graph use as exploration events. Record the delta between files suggested and files actually read. This is the core measurement for whether the graph helped or added overhead.

---

## Known limitation: Next.js and design systems

The `code-review-graph` evaluation benchmark reports **F1 = 0.041** for Next.js projects —
nearly zero impact accuracy. Controlled tests on the Crisis Monitor confirmed: for UI
components and CSS tokens, the 2-hop graph reaches virtually the entire project (73–97%
false positives) because connection density in a shared design system makes any node
reach the whole project within 2 hops.

For Next.js projects, the only operations with demonstrated value are:
- `detect-changes` to identify test gaps in large PR reviews
- `wiki` and `communities` for structural onboarding and overview

Impact radius, minimal context, and review context are not recommended for Next.js
projects with shared design systems until the graph supports configurable depth and
semantic filters by node type.

See `docs/context-graph-decision.md` for the full decision record.

---

## Risks

**False coverage confidence.** A large blast radius from the graph may feel like complete risk mapping. It is not. The graph captures structural connections, not semantic intent or test behavior.

**Overhead in small tasks.** For a one-file bug fix, running a graph query costs more than it saves. The usage guide has explicit rules for when not to use it.

**Recall bias.** The `code-review-graph` design explicitly favors recall over precision. It will suggest more files than necessary. This is a known tradeoff — filter by reading selectively, not by trusting the graph list as final.

**Maintenance coupling.** If the graph index is stale or the repository structure changed, suggestions will be wrong. Trust the graph as a starting direction, not as a source of truth.

---

## Suggested next reading

- `docs/runtime-adapter-contract.md`
- `docs/readiness-gates-spec.md`
- `docs/slice-telemetry-model.md`
- `starter-pack/guides/context-graph-usage-guide.md`
- `starter-pack/templates/context-graph-test-record-template.md`
- `examples/resource-aware-operations/context-graph-adapter-example.md`
