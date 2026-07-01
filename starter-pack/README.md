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

A short daily-use entrypoint is now also available at:

- `starter-pack/guides/daily-operations.md`

Start here if you want the operating method around the framework, not only the technical core.


## Adoption note

If you are starting from an existing repository rather than a blank setup, read:

- `docs/getting-started.md`
- `docs/apply-to-existing-project.md`
- `CONTRIBUTING.md`


## New template

If you are adopting AletheIA inside a real project and need to make the local layer explicit, use:

- `starter-pack/templates/project-extension-template.md`


## Harness shims

If you are wiring a consumer project to a harness (currently: Claude Code), use:

- `starter-pack/harness-shims/claude/` — copy-and-substitute pack for `AGENTS.md`, `CLAUDE.md`, and `.claude/`
- `docs/guides/setting-up-harnesses.md` — five-step adoption walkthrough


## Presets

For a single-bundle adoption that combines the overlay skeleton with the harness shim, use the `operating-overlay` pack at the repo root:

- [`packs/operating-overlay/`](../packs/operating-overlay/) — day-one overlay + Claude shims + `manifest.yaml` provenance record. Also the payload of the AletheIA APM package (see [`docs/guides/install-via-apm.md`](../docs/guides/install-via-apm.md)).


## Alpha 4 baseline

The current practical Alpha 4 handoff baseline now includes:

- `docs/agent-handoffs.md`
- `starter-pack/guides/agent-handoff-generation.md`
- `starter-pack/templates/agent-handoff-template.md`
- `docs/project-handoff-conventions.md`
- `docs/handoff-capture-pattern.md`

Use this set when you need model-agnostic continuity between agents without relying on hidden runtime memory.


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

- `docs/canonical-definitions.md`
- `docs/work-item-pattern.md`
- `starter-pack/templates/work-item-template.md`
- `docs/work-slice-pattern.md`
- `starter-pack/templates/work-slice-template.md`
- `docs/work-slice-spec-bundle.md`
- `starter-pack/templates/work-slice-spec-template.md`
- `starter-pack/templates/work-slice-plan-template.md`
- `starter-pack/templates/work-slice-tasks-template.md`
- `starter-pack/templates/work-slice-readiness-review-template.md`
- `starter-pack/guides/risk-to-gate-mapping.md`
- `examples/work-slices/standard-slice/README.md`
- `examples/work-slices/standard-spec-bundle/README.md`
- `examples/handoffs/compact-reviewable-handoff.md`
- `examples/handoffs/high-stakes-handoff.md`
- `docs/iterative-maintenance-governance.md`
- `starter-pack/guides/round-based-maintenance.md`
- `examples/iterative-maintenance/three-round-loop/README.md`

This baseline is intentionally smaller than the core contracts and mainly reinforces Alpha 4 continuity plus Alpha 5 validation posture.
It now also makes iterative maintenance rounds and regression-aware continuation more tangible without changing the core contracts, especially for important loops where a proportional sequence of proof, contract, health, alert, investigation, and summary is justified.

Taken together, the current starter-pack now covers both:

- advisory model strategy for choosing fit-for-task model profiles
- optional pre-execution specification for ambiguous `Standard` and `High-Assurance` slices
- operational maintenance guidance for carrying bounded work safely across repeated rounds
- a clearer bridge between real pilot evidence and lightweight reusable framework guidance

## Experimental workspace context routing

If you want to test a filesystem-based context-routing pattern as a local experiment, read:

- `starter-pack/experiments/workspace-context-routing/README.md`

For a normative, manual registry of context surfaces and their load boundaries, use:

- `docs/contracts/context-surface-registry.md`
- `starter-pack/templates/context-surface-registry.yaml`
- `examples/context-surface-governance/minimum-registry.yaml`

For compact, source-backed observations that retain a governed path to lossy raw output, use:

- `docs/contracts/observation-governance-contract.md`
- `starter-pack/templates/observation-record-template.yaml`
- `examples/resource-aware-operations/test-output-observation-example.yaml`


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
- `docs/runtime-adapter-codex.md`
- `docs/runtime-adapter-claude-code.md`
- `docs/runtime-adapter-qwen.md`
- `docs/agent-role-catalog.md`
- `docs/agent-role-adoption-guide.md`
- `docs/agent-role-orchestrator.md`
- `docs/agent-role-implementer.md`
- `docs/agent-role-reviewer.md`
- `docs/agent-role-validator.md`
- `docs/agent-role-explorer.md`
- `starter-pack/templates/agent-role-card-template.md`
- `docs/agent-runtime-decision-guide.md`
- `examples/resource-aware-operations/cross-runtime-role-handoff-example.md`
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
- `docs/github-project-operations.md`
- `starter-pack/templates/restart-bootstrap-prompt-template.md`
- `examples/resource-aware-operations/clean-restart-command-adapter-example.md`
- `docs/project-local-constitution-context.md`

This future track should build on the current starter-pack surfaces rather than replace them.

## Coding safety plan profile

For bounded coding Work Slices that need explicit base state, scope, verification, drift, rollback and stop conditions, use:

- `docs/contracts/coding-safety-plan-profile.md`
- `starter-pack/templates/coding-safety-plan-template.yaml`
- `docs/reference/coding-safety-non-engineer-checklist.md`
- `examples/coding-safety/s9-standard-docs-slice.yaml`

This is a planning profile, not a runtime, command, auto-merge flow or new Adaptive Skill promotion.

## Reference intake and adoption

Before using an external pack, plan, screenshot, repository or capability proposal as input to AletheIA or Adaptive Skills evolution, use:

- `docs/contracts/reference-intake-adoption-contract.md`
- `starter-pack/templates/reference-intake-decision-template.yaml`
- `examples/reference-intake/evolution-pack-intake.yaml`

This keeps external references as governed source material, not automatic instructions, dependencies, skill mutations or runtime authority changes.

## Design System Intelligence pilot

If you need to review a work artifact against a design system without adding scanners,
automation, or promotion authority, use:

- `docs/contracts/design-system-intelligence-pilot.md`
- `starter-pack/templates/design-system-intelligence-review-template.yaml`
- `examples/design-system-intelligence/pulso-pilot-review.yaml`

The first pilot uses Pulso as a lab case. Pulso remains an external design-system
source; AletheIA records source-backed review evidence and does not become the
design-system authority.

## Human expertise and evidence-based learning

If a slice depends on scoped human expertise or produces learning that may affect
future work, use:

- `docs/contracts/human-expertise-learning-contract.md`
- `starter-pack/templates/domain-expertise-brief-template.yaml`
- `starter-pack/templates/evidence-based-learning-record-template.yaml`
- `examples/human-expertise-learning/s25-domain-expertise-learning-synthetic.yaml`

These records preserve expert guidance and learning evidence without allowing
skills, dashboards, or agents to mutate themselves automatically.

## Visual Operations docs-first projection

If you want to make governed Work Slices visible without adding a runtime, backend, or new source of
truth, read and adapt:

- `docs/concepts/visual-operations-layer.md`
- `docs/concepts/mission-control-cockpit.md`
- `docs/contracts/visual-operations-event-model.md`
- `docs/contracts/work-slice-visual-state-contract.md`
- `docs/contracts/visual-ops-privacy-boundaries.md`
- `starter-pack/templates/visual-ops-dashboard-config.yaml`
- `starter-pack/templates/work-slice-card-template.yaml`
- `starter-pack/templates/visual-ops-event-template.yaml`
- `starter-pack/templates/slice-trace-template.md`
- `starter-pack/templates/visual-ops-reconcile-template.md`
- `examples/visual-operations/dashboard-snapshot.md`
- `docs/guides/github-pr-visual-operations-projector.md`
- `examples/visual-operations/github-pr-projector-input.json`
- `examples/visual-operations/github-pr-projector-output.json`
- `examples/visual-operations/github-pr-projector-output.md`
- `scripts/visual-ops-project.ts`
- `scripts/visual-ops-project.sh`
- `scripts/check-visual-ops-snapshots.sh`
- `docs/guides/visual-operations-usage-evidence.md`
- `starter-pack/templates/visual-ops-usage-evidence-template.md`
- `examples/visual-operations/github-pr-195-cli-input.json`
- `examples/visual-operations/github-pr-195-cli-output.json`
- `examples/visual-operations/github-pr-195-cli-output.md`

These materials are read-only projection guidance. Board lanes are presentation states, events retain
their authoritative `source_refs`, and missing telemetry remains `unknown` or `unavailable`.
