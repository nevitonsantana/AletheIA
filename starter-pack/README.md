# Starter Pack

This folder contains the reusable operating materials that help teams apply AletheIA with discipline.

It is intentionally smaller than the framework core.

The goal is to provide a practical baseline for:

- task framing
- context discipline
- handoffs
- branch isolation
- quality gates
- durable decisions
- advisory model-strategy guidance

Start here if you want the operating method around the framework, not only the technical core.


## Adoption note

If you are starting from an existing repository rather than a blank setup, read:

- `docs/getting-started.md`
- `docs/apply-to-existing-project.md`
- `CONTRIBUTING.md`


## New template

If you are adopting AletheIA inside a real project and need to make the local layer explicit, use:

- `starter-pack/templates/project-extension-template.md`


## Alpha 4 baseline

The current practical Alpha 4 handoff baseline now includes:

- `docs/agent-handoffs.md`
- `starter-pack/guides/agent-handoff-generation.md`
- `starter-pack/templates/agent-handoff-template.md`
- `docs/project-handoff-conventions.md`
- `docs/handoff-capture-pattern.md`

Use this set when you need model-agnostic continuity between agents without relying on hidden thread memory.


## Alpha 5 baseline

If you are exploring the current Alpha 5 structured-risk-inference baseline for higher-risk work, read:

- `docs/structured-risk-inference.md`
- `starter-pack/templates/inference-artifact-template.md`
- `starter-pack/guides/inference-trigger-guidance.md`
- `starter-pack/guides/inference-artifact-generation.md`
- `docs/inference-pilot-scenarios.md`


## Model strategy guidance

If you want practical guidance for matching task shape, capability profile, reasoning depth, and trust / hosting constraints, read:

- `starter-pack/guides/model-strategy-by-task.md`
- `starter-pack/templates/project-model-strategy-template.md`
- `examples/model-strategy/README.md`

This guidance is advisory-only.
AletheIA may suggest a fit, but the user may still choose a different model.

## Current operational-composition baseline

If you want to make bounded work more tangible without changing the core contracts, read:

- `docs/work-slice-pattern.md`
- `starter-pack/templates/work-slice-template.md`
- `starter-pack/guides/risk-to-gate-mapping.md`
- `examples/work-slices/standard-slice/README.md`
- `examples/handoffs/compact-reviewable-handoff.md`
- `examples/handoffs/high-stakes-handoff.md`
- `docs/iterative-maintenance-governance.md`
- `starter-pack/guides/round-based-maintenance.md`
- `examples/iterative-maintenance/three-round-loop/README.md`

This baseline is intentionally smaller than the core contracts and mainly reinforces Alpha 4 continuity plus Alpha 5 validation posture.
It now also makes iterative maintenance rounds and regression-aware continuation more tangible without changing the core contracts, especially for important loops where a proportional sequence of proof, contract, health, alert, investigation, and summary is justified.

Taken together, the current starter-pack now covers both:

- advisory model strategy for choosing fit-for-task model profiles
- operational maintenance guidance for carrying bounded work safely across repeated rounds
- a clearer bridge between real pilot evidence and lightweight reusable framework guidance

## Experimental workspace context routing

If you want to test a filesystem-based context-routing pattern as a local experiment, read:

- `starter-pack/experiments/workspace-context-routing/README.md`


## 1.1 constrained adoption guidance

If you are applying AletheIA in an environment with heavier approvals, stricter trust boundaries, or stronger local restrictions, read:

- `docs/enterprise-readiness-roadmap.md`
- `starter-pack/guides/enterprise-adoption-considerations.md`
- `examples/project-extension/restricted-enterprise-context.md`


## 1.1 local trust-boundary posture

If your constrained environment needs an explicit local trust and hosting posture, read:

- `docs/local-trust-boundary-posture.md`
- `starter-pack/templates/local-trust-boundary-template.md`
- `examples/project-extension/local-trust-boundary-mapping.md`


## 1.1 bounded constrained pilot evidence

If you want to run a bounded pilot in a constrained environment before broader rollout, read:

- `docs/constrained-adoption-pilot.md`
- `docs/constrained-pilot-review-checklist.md`
- `starter-pack/templates/constrained-pilot-review-template.md`
- `examples/pilot-conversion/constrained-adoption-bounded-validation.md`

## Queued 1.2 operationalization track

The next queued post-1.0 track is resource-aware operations.
Read:

- `docs/resource-aware-operations-roadmap.md`
- `docs/context-resource-telemetry-spec.md`
- `docs/slice-telemetry-model.md`
- `docs/waste-heuristics.md`
- `docs/progressive-policy-signals.md`
- `docs/runtime-adapter-contract.md`
- `docs/agent-runtime-decision-guide.md`
- `docs/planning-depth-profiles.md`
- `docs/readiness-gates-spec.md`
- `examples/resource-aware-operations/README.md`
- `examples/resource-aware-operations/comparative-review-example.md`
- `examples/resource-aware-operations/constrained-local-review-example.md`
- `examples/resource-aware-operations/bounded-pilot-conversion-loop.md`
- `docs/resource-aware-bounded-pilot.md`
- `docs/resource-aware-pilot-review-checklist.md`
- `starter-pack/templates/resource-aware-pilot-review-template.md`
- `docs/resource-aware-crisis-monitor-reference.md`
- `examples/resource-aware-operations/resource-aware-pilot-review-reference.md`
- `docs/resource-aware-next-signals.md`
- `docs/resource-aware-operations-review.md`
- `docs/slice-finalization-and-restart.md`
- `starter-pack/templates/slice-finalization-review-template.md`
- `examples/resource-aware-operations/slice-finalization-reference.md`
- `starter-pack/guides/clean-restart-command-adapters.md`
- `starter-pack/templates/restart-bootstrap-prompt-template.md`
- `examples/resource-aware-operations/clean-restart-command-adapter-example.md`
- `docs/project-local-constitution-context.md`

This future track should build on the current starter-pack surfaces rather than replace them.
