# AletheIA SYSTEM_STATE

> Compact first-load index. This file is not a universal source of truth. Canonical contracts, ADRs, execution records, evidence and accepted decisions remain authoritative.

## Project identity

- **Project:** AletheIA
- **Version:** `1.0.0`
- **Maturity:** versioned 1.x evolution
- **Purpose:** macro-governance for bounded, traceable and reviewable AI-assisted work

## Current architecture summary

- AletheIA owns Work Slice governance, decisions, gates, closure and read-only operational projection.
- Adaptive Skills owns portable methods, capability metadata and compatibility declarations.
- Runtime/harnesses execute tools and produce evidence; they do not own governance interpretation.
- Resource Observatory and Work Observatory project source-backed records without becoming execution authorities.

Authoritative entrypoints:

- [`docs/concepts/architecture.md`](docs/concepts/architecture.md)
- [`docs/concepts/canonical-vocabulary.md`](docs/concepts/canonical-vocabulary.md)
- [`docs/roadmaps/evolution-backlog-aletheia-adaptive-skills.md`](docs/roadmaps/evolution-backlog-aletheia-adaptive-skills.md)

## Delivered evolution baseline

- Visual Operations and Mission Control read-only baseline — delivered.
- Recoverable Observation Governance — delivered baseline.
- Context Surface Governance — delivered minimum registry.
- Governed Loop Observation — delivered through the accepted S7 pilot.
- Work Observatory — partially delivered through S14 plus S12, S21, S23 and S25 derived `work_record` examples, with an S18 comparison-readiness review that keeps comparative metrics blocked.
- Intent-to-Evidence — delivered through the accepted S8 cross-repository pilot.
- Cognitive, intent and documentation closure — delivered through the accepted S16 pilot.
- Explainable first use — delivered through the accepted cross-repository S17 pilot.
- Capability routing reconciliation — delivered through the accepted cross-repository S10-A slice.
- Lean Skill Doctrine + Skill Catalog Governance — delivered through AletheIA PR #280 and Adaptive Skills PR #78.
- Independent Validation Hardening — delivered through AletheIA PR #281.
- Governed Loop Engineering Addendum — delivered through AletheIA PR #283.
- Lean Implementation Skill compatibility — delivered through Adaptive Skills PR #79 and AletheIA PR #285.

Evidence: [`docs/roadmaps/evolution-backlog-aletheia-adaptive-skills.md`](docs/roadmaps/evolution-backlog-aletheia-adaptive-skills.md).

## Active and planned evolution

- **Active:** S27 Backlog v0.4 source registry and prioritization.
- **Next dependency path:** S27 chooses the next evidence-respecting track; S18 remains deferred until evidence threshold is met; Runtime 2.0 implementation remains deferred until a later explicit boundary decision.
- **Delivered dependency chain:** S20 delivered → S22 Lean Implementation Skill; S21 delivered → S23 Governed Loop Engineering Addendum.
- **Deferred:** S18 comparative work metrics until five reviewed records share one stable comparison group; PR #313 confirms the current five records do not meet that threshold. Runtime 2.0 implementation until a later explicit boundary decision.

## Deprecated or merged plans

- Detailed evolution packs remain source references; the integrated backlog is their executive map, not a replacement.
- “Continuity Capsule” is reconciled as optional fields in the canonical Restart Package, not a competing lifecycle artifact.
- `plans/` remains local/untracked and is not represented as repository truth.

## Documentation health

- README: current for the 1.x operating baseline.
- Integrated evolution backlog: being updated to v0.4 to register domain governance, constrained adoption and resource-aware next-signal candidates after S0-S26 closure.
- Architecture and canonical vocabulary: authoritative; S15 adds a narrow continuity clarification.
- CHANGELOG and first-use guide coherence: not assessed by S15; tracked for later proportional review.

## Cognitive debt and open risks

- **Current level:** medium — multiple delivered contracts remain difficult to understand without guided explanation.
- SYSTEM_STATE can become stale; every claim must retain a source reference and review date.
- Work Observatory has five total records, and the S18 comparison-readiness review confirms they are heterogeneous and not one reviewed stable comparison group; no success rate, ranking, work-unit or value claim is admissible until at least five comparable records share one stable comparison group.
- External references require S2 intake before they influence implementation; P19–P23 v0.4 candidates remain planning sources until their slices are explicitly accepted.
- Automatic collectors, routing engines, runtime kernels, SDKs, provider adapters and documentation generators remain out of scope.

## Next safe steps

1. Complete S27 by registering v0.4 sources and prioritizing the next domain/evidence track.
2. Prefer S28 AI Agent Security & Prompt Injection as the first new domain-governance pack unless a stronger user-selected focus supersedes it.
3. Use SYSTEM_STATE as an index and load authoritative sources before mutation.
4. Do not activate S18 before its evidence threshold; do not activate Runtime 2.0 implementation before a later explicit boundary decision.

## Last reviewed

- **Date:** 2026-07-02
- **Evidence baseline:** AletheIA `d63022b` after the S18 status refresh; Adaptive Skills `e434483` after S24 closure
- **Review trigger:** S0-S26 closure and issue #274 cleanup; S27 selects the next backlog without reopening blocked tracks
