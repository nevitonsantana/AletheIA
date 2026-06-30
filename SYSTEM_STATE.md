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
- Work Observatory — partially delivered through the first S14 derived `work_record`.
- Intent-to-Evidence — delivered through the accepted S8 cross-repository pilot.
- Cognitive, intent and documentation closure — delivered through the accepted S16 pilot.
- Explainable first use — delivered through the accepted cross-repository S17 pilot.
- Capability routing reconciliation — delivered through the accepted cross-repository S10-A slice.
- Lean Skill Doctrine + Skill Catalog Governance — delivered through AletheIA PR #280 and Adaptive Skills PR #78.
- Independent Validation Hardening — delivered through AletheIA PR #281.
- Governed Loop Engineering Addendum — delivered through AletheIA PR #283.

Evidence: [`docs/roadmaps/evolution-backlog-aletheia-adaptive-skills.md`](docs/roadmaps/evolution-backlog-aletheia-adaptive-skills.md).

## Active and planned evolution

- **Active:** None — S23 was delivered; choose the next backlog slice before starting new work.
- **Next dependency path:** S22 Lean Implementation Skill remains dependency-valid after S20; S24 Pulso pilot is governance-valid after S10/S20/S21/S23.
- **Parallel planned path:** S10 delivered → S24 Design System Intelligence/Pulso pilot; S20 delivered → S22 Lean Implementation Skill; S21 → S23 Governed Loop Engineering Addendum.
- **Deferred:** S18 comparative work metrics until five reviewed records share one stable comparison group; S26 Runtime 2.0 until explicit boundary review.

## Deprecated or merged plans

- Detailed evolution packs remain source references; the integrated backlog is their executive map, not a replacement.
- “Continuity Capsule” is reconciled as optional fields in the canonical Restart Package, not a competing lifecycle artifact.
- `plans/` remains local/untracked and is not represented as repository truth.

## Documentation health

- README: current for the 1.x operating baseline.
- Integrated evolution backlog: current as v0.3 through S19 source registry and prioritization.
- Architecture and canonical vocabulary: authoritative; S15 adds a narrow continuity clarification.
- CHANGELOG and first-use guide coherence: not assessed by S15; tracked for later proportional review.

## Cognitive debt and open risks

- **Current level:** medium — multiple delivered contracts remain difficult to understand without guided explanation.
- SYSTEM_STATE can become stale; every claim must retain a source reference and review date.
- Work Observatory has one record only; no success rate, ranking, work-unit or value claim is admissible.
- New P13–P18 packs are registered as backlog sources, not implementation authority.
- Automatic collectors, routing engines, runtime kernels, SDKs and documentation generators remain out of scope.

## Next safe steps

1. Choose the next bounded slice: S22 Lean Implementation Skill or S24 Design System Intelligence / Pulso pilot.
2. Preserve the S15 Restart Package compatibility and post-resume checks.
3. Use SYSTEM_STATE as an index and load authoritative sources before mutation.
4. Do not activate S18 before its evidence threshold or S26 before an explicit boundary decision.

## Last reviewed

- **Date:** 2026-06-29
- **Evidence baseline:** AletheIA `0b0531a` after S23 merge; Adaptive Skills `4f37e29` after S20 merge
- **Review trigger:** S23 governed loop readiness addendum merged and local main synced
