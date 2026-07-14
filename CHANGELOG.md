# Changelog

## Unreleased

- close S52 after the AletheIA-to-Adaptive-Skills evolution bridge review merge, returning Active to none and preserving blocked mutation boundaries

- add a manual AletheIA-to-Adaptive-Skills evolution bridge review from S50 without mutating Adaptive Skills or authorizing automatic skill changes

- close S51 after the Restart Package learning/context-hygiene compatibility review merge, returning Active to none and preserving blocked automation boundaries

- add a manual Restart Package learning/context-hygiene compatibility review from S50 without introducing automation, memory writeback, schemas or Adaptive Skills changes

- close S50 after the Learning Distillation & Context Hygiene Addendum v0.7 intake merge, returning Active to none while keeping implementation blocked behind future bounded review

- register Learning Distillation & Context Hygiene Addendum v0.7 as an intake-only backlog source, marking older v0.1-v0.6 variants as superseded without implementing learning automation, memory writeback, schemas or Adaptive Skills changes

- repair stale documentation references in the logs/handoffs policy and Crisis Monitor overlay pilot handoff so local Markdown links resolve without reintroducing presets or cross-repo skill paths

- reconcile the completed Dependabot maintenance cycle for `@types/node`, Vite and TypeScript with source-backed governance documentation; README remains current and no runtime, scanner, policy engine or schema is introduced

- expand the canonical AletheIA + Adaptive Skills evolution backlog to v0.2 with P10 Work Observatory, P11 Cognitive Documentation & Continuity, and a versioned non-normative ecosystem territory map; no runtime, schema, collector or dashboard is introduced

- materialize the `example-4-layers` knowledge pack on disk under `examples/project-extension/knowledge-packs/` (schema-valid `manifest.yaml`, operational capsule, usage policy, version history, source map/link, and a `feature-value-governance` consumption walkthrough); generic and fictional, illustrating a proprietary framework registered as a `capsule_first` pack with `full_text_exposure: forbidden`

- lock the canonical sensitivity vocabulary (`public | internal | confidential | restricted | regulated`) and document how project extensions map local labels (e.g. `private`, regulatory tags) to it; add a project-extension mapping example
- align `aletheia-context-pack.schema.json` `sources[].sensitivity` enum with the canonical taxonomy (replaces the non-canonical `secret` and adds `confidential` + `regulated`); existing context-pack examples continue to validate

- introduce the Knowledge Governance Layer (docs-only): concepts, contracts, JSON Schemas, and generic project-extension examples for governing user-provided knowledge bases used by agents and skills (ADR-008)

- clarify that `recommend-clean-restart` should explicitly signal a fresh thread / local clear-thread action before starting a new issue
- add a project-local Constitution context guide clarifying how stronger governing-context bootstraps can support clean restart without becoming framework core

- add docs-first clean-restart command adapters and a restart bootstrap prompt template on top of slice finalization guidance

- add slice finalization and restart guidance with AI Fatigue control and a copyable restart-package pattern

- add a 1.2 resource-aware operations review to make the current proof level and stop line explicit

- add a resource-aware next-signals guide so the 1.2 track only reopens on stronger evidence

- add a bounded Crisis Monitor reference for the 1.2 resource-aware operations pilot layer

- add bounded real-world pilot guidance, checklist, and template for the 1.2 resource-aware operations track

- add bounded Phase F resource-aware examples for comparative review, constrained/local posture, and pilot conversion

- add planning-depth profiles and a lightweight readiness-gates spec for the 1.2 resource-aware operations track

- start the next 1.2 layer with advisory runtime/agent decision guidance and a lightweight example
- start the next 1.2 layer with a minimal runtime adapter contract and lightweight example
- start the next 1.2 layer with progressive policy signals and a lightweight review example
- define the first 1.2 telemetry surfaces for resource-aware operations
- start the 1.2 track with context/resource telemetry, slice telemetry, and waste heuristics docs
- add a Resource-Aware Operations roadmap as the queued 1.2+ track
- reposition the post-1.0 roadmap so 1.1 stays constrained-adoption hardening while 1.2 becomes operationalization
- defer benchmark and learning ambitions into later 1.3+ / 1.4+ tracks instead of treating them as active work now

## 1.0.0 — 2026-04-09

First public stable baseline of AletheIA.

### Included baseline

- Alpha 1 governance, token policy, durable decisions, enforcement boundaries, quality, and learnings baseline
- Alpha 2 pilot, self-application, and project-extension baseline
- Alpha 3 adoption and starter-pack baseline
- Alpha 4 handoff and multi-boundary continuity baseline
- Alpha 5 selective structured risk inference baseline
- Alpha 6 distribution, presets, adapters, and adoption-mode baseline
- Alpha 7 optional future-facing tooling-boundary baseline
- operational-composition layer across work slices, risk-to-gate mapping, iterative maintenance, and model-strategy guidance

### Notes

- 1.0.0 marks the baseline as public and versioned
- this release does **not** claim enterprise-readiness, completed domain governance packs, or active delivery tooling implementation
- post-baseline work now continues through 1.1, 1.2, 1.3, and later roadmap tracks
