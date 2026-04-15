# AletheIA Overview

AletheIA 1.0 is an operating framework for AI-assisted work with a decision kernel at its center.

The public repository is organized around four blocks:

1. **framework core**
   - contracts
   - engine
   - policies
   - token discipline
   - durable reasoning
   - enforcement clarity
   - examples
   - tests

2. **starter-pack**
   - reusable operating guides
   - checklists
   - templates
   - branch, context, quality, and decision discipline
   - advisory model-strategy guidance for real project fleets

3. **pilot materials**
   - why the framework emerged
   - how it was extracted from Crisis Monitor
   - what was learned in the real test field
   - how pilot learnings return into framework evolution
   - how self-application, pilot conversion, and project extension stay connected

4. **post-baseline framing**
   - what is now part of the 1.0 baseline
   - what remains future-facing but bounded
   - what moves into 1.1, 1.2, 1.3, and later

---

## Current phase

AletheIA is now in its **1.0 baseline phase**.

That means the repository now distinguishes between:

- **established baseline**
  - Alpha 1
  - Alpha 2
  - Alpha 3
  - Alpha 4
  - Alpha 5
  - Alpha 6
  - Alpha 7
- **post-1.0 evolution tracks**
  - enterprise-readiness / constrained adoption (the active 1.1 hardening track)
  - resource-aware operations (the queued 1.2 operationalization track)
  - benchmark and comparative evaluation
  - learning layer, adaptive orchestration, and later domain governance hardening

The roadmap and release gate are now read together through:

- `docs/roadmap-alpha.md`
- `docs/release-1.0-readiness.md`
- `docs/enterprise-readiness-roadmap.md`
- `docs/resource-aware-operations-roadmap.md`
- `CHANGELOG.md`

---

## Alpha 2 bridge and pilot grounding

The Crisis Monitor pilot is the first concrete example of this bridge, and it now includes real-world validation beyond the first explicability slice.

The key idea is simple:

AletheIA should be reusable outside the original pilot while still preserving the lessons learned from that pilot.

That reuse depends on an explicit boundary between the framework core and each project's local extension layer.

At this point, Alpha 2 is organized around four explicit bridge artifacts and is supported by stronger real-world validation from the Crisis Monitor pilot:

- `docs/self-application.md`
- `docs/pilot-crisis-monitor.md`
- `docs/pilot-conversion.md`
- `docs/project-extension-pattern.md`

---

## Established baseline already in place

### Alpha 3 adoption baseline

Anchored by:

- `docs/getting-started.md`
- `docs/apply-to-existing-project.md`
- `CONTRIBUTING.md`
- `starter-pack/templates/project-extension-template.md`

### Alpha 4 handoff baseline

Anchored by:

- `docs/agent-handoffs.md`
- `starter-pack/guides/agent-handoff-generation.md`
- `starter-pack/templates/agent-handoff-template.md`
- `docs/project-handoff-conventions.md`
- `docs/handoff-capture-pattern.md`
- `examples/handoffs/multi-boundary-continuity.md`

### Alpha 5 experimental baseline

Anchored by:

- `docs/structured-risk-inference.md`
- `starter-pack/templates/inference-artifact-template.md`
- `starter-pack/guides/inference-trigger-guidance.md`
- `starter-pack/guides/inference-artifact-generation.md`
- `docs/inference-pilot-scenarios.md`
- `examples/structured-risk-inference/README.md`
- `examples/structured-risk-inference/regression-round-inference.json`

This means Alpha 5 can now be read across:

- concept
- trigger discipline
- generation method
- risk-to-gate fit
- iterative-maintenance fit
- concrete example artifacts

### Alpha 6 distribution baseline

Anchored by:

- `docs/distribution-presets-adapters.md`
- `docs/preset-taxonomy.md`
- `docs/adapter-taxonomy.md`
- `docs/adoption-mode-guidance.md`
- `docs/delivery-mapping-examples.md`
- `examples/distribution/constrained-adoption-mapping.md`

This means Alpha 6 can now be read across:

- packaging shape
- delivery surface
- adoption depth
- cross-surface meaning preservation
- plugability through project extension without overclaiming enterprise readiness

### Alpha 7 future-facing tooling-boundary baseline

Anchored by:

- `docs/bootstrap-principles.md`
- `docs/delivery-tooling-boundaries.md`
- `docs/bootstrap-output-examples.md`
- `docs/bootstrap-generator-contract.md`
- `docs/delivery-output-contract.md`
- `examples/delivery/reviewable-generated-bundle.md`

This is part of the 1.0 baseline because it is now clearly bounded as optional and future-facing, not because active tooling is required.

---

## Current low-regret operational-composition layer

This operational layer sits around the current baselines without becoming a new Alpha.

Anchored by:

- `docs/work-slice-pattern.md`
- `starter-pack/templates/work-slice-template.md`
- `starter-pack/guides/risk-to-gate-mapping.md`
- `examples/work-slices/standard-slice/README.md`
- `examples/handoffs/compact-reviewable-handoff.md`
- `examples/handoffs/high-stakes-handoff.md`
- `starter-pack/experiments/workspace-context-routing/README.md`
- `docs/iterative-maintenance-governance.md`
- `starter-pack/guides/round-based-maintenance.md`
- `examples/iterative-maintenance/three-round-loop/README.md`
- `starter-pack/guides/model-strategy-by-task.md`
- `starter-pack/templates/project-model-strategy-template.md`

This layer makes the current baseline more tangible through:

- composed work units
- risk-sensitive gate selection
- stronger restart-package continuity
- optional filesystem-based context routing experiments
- round-based maintenance guidance over existing work-slice contracts
- regression-aware continuation and reusable learning across rounds
- advisory-only model strategy by task shape, capability profile, reasoning depth, and trust / hosting posture

It remains useful precisely because it stays smaller than the core.


The active 1.1 track now also includes a stronger local trust-boundary posture through:

- `docs/local-trust-boundary-posture.md`
- `starter-pack/templates/local-trust-boundary-template.md`
- `examples/project-extension/local-trust-boundary-mapping.md`


The active 1.1 track now also includes bounded pilot-evidence guidance for constrained adoption through:

- `docs/constrained-adoption-pilot.md`
- `docs/constrained-pilot-review-checklist.md`
- `starter-pack/templates/constrained-pilot-review-template.md`
- `examples/pilot-conversion/constrained-adoption-bounded-validation.md`

The queued 1.2 track now begins with early observability surfaces through:

- `docs/context-resource-telemetry-spec.md`
- `docs/slice-telemetry-model.md`
- `docs/waste-heuristics.md`

These are meant to operationalize the next questions around context growth, retry waste, handoff inflation, and runtime fit before adapters or learning-layer work.

The next docs-first 1.2 layer after telemetry is progressive policy signals through:

- `docs/progressive-policy-signals.md`
- `examples/resource-aware-operations/policy-signals-review-example.md`

This keeps the framework in an advisory-first posture while making operational drift more reviewable.

The next docs-first 1.2 layer after policy signals is a minimal runtime adapter contract through:

- `docs/runtime-adapter-contract.md`
- `examples/resource-aware-operations/minimal-runtime-adapter-example.md`

This keeps the track provider-agnostic while making the future adapter surface more concrete without turning AletheIA into a full orchestration platform.

The next docs-first 1.2 layer after the runtime adapter contract is advisory runtime/agent decision guidance through:

- `docs/agent-runtime-decision-guide.md`
- `examples/resource-aware-operations/agent-runtime-decision-example.md`

This keeps the framework recommendation-oriented while making runtime fit more explicit across changing slice shapes.

The next docs-first 1.2 layer after advisory runtime fit is a lightweight workflow/readiness surface through:

- `docs/planning-depth-profiles.md`
- `docs/readiness-gates-spec.md`
- `examples/resource-aware-operations/workflow-readiness-example.md`

This keeps AletheIA proportional by clarifying how much planning a slice needs and whether it is ready to continue without importing a full delivery methodology.

The next docs-first 1.2 layer after workflow/readiness is a bounded examples-first closure through:

- `examples/resource-aware-operations/comparative-review-example.md`
- `examples/resource-aware-operations/constrained-local-review-example.md`
- `examples/resource-aware-operations/bounded-pilot-conversion-loop.md`

This keeps the track evidential and proportional before any benchmark or learning ambition.

The next bounded 1.2 step after these examples is a real-world pilot layer through:

- `docs/resource-aware-bounded-pilot.md`
- `docs/resource-aware-pilot-review-checklist.md`
- `starter-pack/templates/resource-aware-pilot-review-template.md`

This keeps the next move operational and reviewable without reopening benchmark or learning work early.

The next bounded 1.2 reference layer now also includes:

- `docs/resource-aware-crisis-monitor-reference.md`
- `examples/resource-aware-operations/resource-aware-pilot-review-reference.md`

This keeps the track anchored in one believable real-world read without collapsing local product logic into the framework.
