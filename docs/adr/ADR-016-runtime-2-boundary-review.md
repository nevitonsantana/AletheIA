# ADR 016 — Runtime 2.0 Boundary Review

| Field | Value |
|---|---|
| Status | Accepted |
| Date | 2026-07-01 |
| Author | Neviton Santana |
| Deciders | Neviton Santana |
| Related | ADR-004 (AletheIA as operating overlay), ADR-010 (Runtime Effort Governance Contract), ADR-011 (Agent Harness Governance Extension), ADR-013 (Agent Harness Contract), ADR-015 (Execution Pattern Governance Pack) |
| Supersedes | — |

## 1. Context

The P18 Runtime 2.0 pack describes a useful north-star: AletheIA work may eventually need a clearer
runtime-facing model for work episodes, governed loops, provider adapters and execution evidence.
That direction is strategically valuable, but it creates a boundary risk.

AletheIA currently owns macro-governance: Work Slice posture, decisions, gates, closure and
read-only operational projection. Adaptive Skills owns portable micro-capabilities and compatibility
declarations. Runtime/harness surfaces execute tools and emit evidence. Moving too quickly from a
north-star into a runtime kernel, SDK, CLI or provider adapter would silently change AletheIA from a
governance framework into an execution substrate.

S26 exists to decide what Runtime 2.0 means now, before any implementation begins.

## 2. Decision

1. **Keep Runtime 2.0 as a strategic north-star, not an implementation track.** The P18 pack remains
   a source for future thinking, vocabulary pressure and boundary questions. It does not authorize a
   runtime kernel, SDK, CLI, event bus, plugin interface, capability runtime or provider adapter.
2. **Preserve the current ownership boundary.** AletheIA continues to define governance contracts,
   evidence requirements and read-only projections. Adaptive Skills continues to define methods,
   capability metadata and compatibility declarations. Runtime/harness surfaces continue to execute
   work and produce evidence without owning governance interpretation.
3. **Use existing contracts before inventing a runtime layer.** Work episodes must be expressible, as
   far as possible, through Work Slice, AHC, AHGE, Runtime Effort Governance, Execution Pattern
   Governance, Work Observatory records and Restart Package continuity fields.
4. **Treat missing runtime evidence as `unavailable`, not as a reason to fabricate structure.** If a
   harness cannot report tokens, cost, duration, tool use, skill use, retry or outcome data, derived
   surfaces must show the gap with provenance instead of inventing metrics.
5. **Require a later explicit decision before implementation.** Any future Runtime 2.0 implementation
   proposal must present source-backed evidence that current contracts cannot carry the required
   meaning, define the minimum interface, list non-goals, and pass human boundary review before code
   begins.

## 3. Consequences

**Positive**
- AletheIA can keep learning from the Runtime 2.0 direction without absorbing execution ownership.
- The current docs-first and evidence-first architecture stays coherent: observe real slices first,
  then decide what deserves implementation.
- Runtime/harness evolution remains possible, but only after a bounded interface review.

**Negative / accepted tradeoffs**
- Some Runtime 2.0 ideas remain intentionally deferred even if they are attractive.
- Work episode vocabulary may feel less concrete until more real execution records exist.
- Existing contracts may carry more conceptual load in the short term.

## 4. Alternatives considered

- **Open a Runtime 2.0 implementation track now.** Rejected: S18 still lacks comparative evidence,
  Work Observatory has too few records, and no implementation boundary has been proven necessary.
- **Reject Runtime 2.0 entirely.** Rejected: the north-star helps reason about loops, work episodes,
  runtime evidence and future interoperability.
- **Absorb Runtime 2.0 into existing harness contracts without review.** Rejected: this would hide a
  major architecture decision inside incremental contract edits.
- **Create a new runtime contract immediately.** Rejected: current contracts should be stress-tested
  against real slices before adding another layer.

## 5. Relationship

- Builds on ADR-004 by preserving AletheIA as an operating overlay rather than execution runtime.
- Builds on ADR-010, ADR-011, ADR-013 and ADR-015 by treating runtime evidence, harness execution,
  per-task declaration and execution topology as existing boundaries to reuse first.
- Keeps P18/S26 in the integrated backlog as a reviewed strategic source, with implementation work
  deferred until a later explicit boundary decision.
- Does not alter public schemas, runtime adapters, Resource Observatory, Work Observatory, Adaptive
  Skills declarations or Mission Control surfaces.

## 6. Review

Reopen this ADR when at least one of the following becomes true:

- Five or more reviewed work records expose a repeated runtime-evidence gap that current contracts
  cannot represent.
- A governed loop pilot requires persistent execution state that cannot fit AHC, AHGE, loop-state,
  Restart Package or Work Observatory records.
- A runtime/harness integration needs a minimum interface to preserve evidence without vendor lock-in.
- A future architecture proposal defines a smaller safe implementation slice with explicit non-goals,
  privacy constraints, validation plan and human approval.
