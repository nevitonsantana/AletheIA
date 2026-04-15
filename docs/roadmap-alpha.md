# AletheIA Roadmap — 1.0 Baseline and 1.x Evolution

AletheIA still uses **Alpha 1–7** as its maturity spine.

The difference now is that the Alpha completion-first queue has been closed at a **done-enough baseline level**, so the framework has moved into **AletheIA 1.0**.

That means the roadmap now has two layers:

1. **Established 1.0 baseline**
   - what Alpha 1–7 already established
2. **Post-1.0 evolution tracks**
   - what now belongs to 1.1, 1.2, 1.3, and later

See also:

- `docs/release-1.0-readiness.md`
- `docs/00-overview.md`
- `CHANGELOG.md`

---

## Established 1.0 baseline

### Alpha 1 — Core + Governance Baseline
**Status:** complete enough for 1.0

Established in the baseline:

- framework core contracts
- minimal deterministic kernel
- governance baseline
- token discipline
- explicit token policy
- durable decisions
- enforcement-boundary clarity
- quality baseline
- learning-from-failed-validation path

Anchor artifacts include:

- `docs/token-policy.md`
- `docs/durable-decisions.md`
- `docs/enforcement-boundaries.md`
- `docs/quality.md`
- `scripts/check-governance.sh`

### Alpha 2 — Real Pilots + Self-Application
**Status:** complete enough for 1.0

Established in the baseline:

- real pilot grounding through Crisis Monitor
- self-application of framework discipline to framework evolution
- pilot-to-learning-to-framework conversion
- project extension as a clean local layer

Anchor artifacts include:

- `docs/self-application.md`
- `docs/pilot-crisis-monitor.md`
- `docs/pilot-conversion.md`
- `docs/project-extension-pattern.md`
- `examples/pilot-conversion/crisis-monitor-real-world-validation.md`

### Alpha 3 — Adoption + Ecosystem
**Status:** complete enough for 1.0

Established in the baseline:

- clearer onboarding
- starter-pack reuse
- contribution guidance
- existing-project application path
- stronger separation between framework core and local extension

Anchor artifacts include:

- `docs/getting-started.md`
- `docs/apply-to-existing-project.md`
- `CONTRIBUTING.md`
- `starter-pack/README.md`
- `starter-pack/templates/project-extension-template.md`

### Alpha 4 — Orchestrated Handoffs & Multi-Agent Continuity
**Status:** complete enough for 1.0

Established in the baseline:

- handoff concept docs
- generation guidance
- richer operational template over smaller schema-backed continuity
- project-level conventions
- handoff capture pattern
- stronger multi-boundary continuity example

Anchor artifacts include:

- `docs/agent-handoffs.md`
- `starter-pack/guides/agent-handoff-generation.md`
- `starter-pack/templates/agent-handoff-template.md`
- `docs/project-handoff-conventions.md`
- `docs/handoff-capture-pattern.md`
- `examples/handoffs/multi-boundary-continuity.md`

### Alpha 5 — Structured Risk Inference & Evidence-Oriented Validation
**Status:** complete enough for 1.0 as an experimental selective baseline

Established in the baseline:

- concept framing
- template
- trigger guidance
- generation guidance
- stronger tie to risk-to-gate mapping
- stronger tie to iterative maintenance
- near-real example of regression-aware inference

Anchor artifacts include:

- `docs/structured-risk-inference.md`
- `starter-pack/templates/inference-artifact-template.md`
- `starter-pack/guides/inference-trigger-guidance.md`
- `starter-pack/guides/inference-artifact-generation.md`
- `docs/inference-pilot-scenarios.md`
- `examples/structured-risk-inference/README.md`
- `examples/structured-risk-inference/regression-round-inference.json`

### Alpha 6 — Distribution, Presets & Adapters
**Status:** complete enough for 1.0

Established in the baseline:

- distribution architecture framing
- preset taxonomy
- adapter taxonomy
- adoption modes
- delivery mappings
- a concrete constrained adoption mapping example

Anchor artifacts include:

- `docs/distribution-presets-adapters.md`
- `docs/preset-taxonomy.md`
- `docs/adapter-taxonomy.md`
- `docs/adoption-mode-guidance.md`
- `docs/delivery-mapping-examples.md`
- `examples/distribution/constrained-adoption-mapping.md`

### Alpha 7 — Bootstrap & Delivery Tooling
**Status:** complete enough for 1.0 as an optional future-facing boundary layer

Established in the baseline:

- bootstrap posture
- tooling stop lines
- output examples
- future generator contract
- future output contract
- illustrative reviewable bundle example

Important boundary:

**Alpha 7 is part of the 1.0 baseline because its scope is now clearly bounded, not because active tooling exists.**

Anchor artifacts include:

- `docs/bootstrap-principles.md`
- `docs/delivery-tooling-boundaries.md`
- `docs/bootstrap-output-examples.md`
- `docs/bootstrap-generator-contract.md`
- `docs/delivery-output-contract.md`
- `examples/delivery/reviewable-generated-bundle.md`

---

## Current operational-composition baseline

This is still **not a new Alpha**.
It remains a proportional operating layer that makes the established baseline easier to apply.

Current artifacts in this layer include:

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

This layer currently strengthens:

- work-slice legibility
- risk-to-gate mapping
- stronger restart-package continuity
- optional filesystem-based context routing experiments
- round-based maintenance guidance over existing contracts
- regression-aware continuation and reusable learning across rounds
- advisory-only model strategy by task shape, capability profile, reasoning depth, and trust / hosting posture

It remains smaller than the core and should continue evolving proportionally.

---

## Post-1.0 evolution tracks

### 1.1 — Enterprise-readiness / regulated adoption

Current low-regret hardening now begins with:

- `docs/enterprise-readiness-roadmap.md`
- `starter-pack/guides/enterprise-adoption-considerations.md`
- `examples/project-extension/restricted-enterprise-context.md`

Current backlog still includes:

- stronger local trust-boundary posture for constrained environments (now started through docs/template/example)
- bounded pilot evidence from a constrained environment (now started through docs/example)
- eventual regulated-domain guidance only if later justified

### 1.2 — Resource-aware operations

This is the next queued operationalization track after the current 1.1 hardening pass.

The first docs-first 1.2 pass now begins with:

- `docs/resource-aware-operations-roadmap.md`
- `docs/context-resource-telemetry-spec.md`
- `docs/slice-telemetry-model.md`
- `docs/waste-heuristics.md`

The next docs-first layer now also begins with:

- `docs/progressive-policy-signals.md`
- `examples/resource-aware-operations/policy-signals-review-example.md`

The next docs-first layer now also begins with:

- `docs/runtime-adapter-contract.md`
- `examples/resource-aware-operations/minimal-runtime-adapter-example.md`

The next docs-first layer now also begins with:

- `docs/agent-runtime-decision-guide.md`
- `examples/resource-aware-operations/agent-runtime-decision-example.md`

The next docs-first layer now also begins with:

- `docs/planning-depth-profiles.md`
- `docs/readiness-gates-spec.md`
- `examples/resource-aware-operations/workflow-readiness-example.md`

The next docs-first layer now also begins with:

- `examples/resource-aware-operations/comparative-review-example.md`
- `examples/resource-aware-operations/constrained-local-review-example.md`
- `examples/resource-aware-operations/bounded-pilot-conversion-loop.md`

Remaining backlog includes:

- stronger bounded real-world conversions before any benchmark or learning ambition

### 1.3+ — Benchmark and comparative evaluation

Planned backlog includes:

- comparative review of slices once telemetry exists
- stronger benchmark material only after adapter and policy surfaces are real
- cross-runtime or cross-project evaluation without collapsing into vendor truth

### 1.4+ — Learning layer, adaptive orchestration, and later domain governance hardening

Planned backlog includes:

- learning-layer exploration only after measurement maturity
- adaptive orchestration only after comparable signals exist
- stronger domain governance packs later, not as a blocker for 1.2
- reusable trust-boundary and prompt-injection packs when later priorities justify them

---

## Cross-version principles

Across the 1.x line, AletheIA should preserve a few boundaries:

1. remain provider-agnostic
2. avoid collapsing into one product's operating residue
3. prefer explicit contracts over hidden conventions
4. keep learnings reviewable instead of informal
5. improve through real pilots instead of theory alone
6. keep delivery and tooling as delivery-layer concerns, not replacements for the core operating model
7. treat project extension as the main place where local complexity should land
