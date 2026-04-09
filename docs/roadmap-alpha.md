# AletheIA Roadmap — Alpha Completion First

AletheIA still uses **Alpha 1–7** as its primary maturity map.

The current roadmap rule is now explicit:

1. **close the Alphas that are still open**
2. **declare a formal 1.0 gate**
3. **only then pull the post-1.0 tracks into priority**

This means previously discussed next steps are **not lost**.
They are preserved below either as:

- a **completion-first queue** that still blocks 1.0, or
- **deferred until post-1.0** tracks that stay valid but must not compete with Alpha completion.

---

## How to read this roadmap

This roadmap is organized in three layers:

1. **Established baseline**
   - Alphas that are complete enough for the current cycle
2. **Alpha completion pass**
   - Alphas whose baseline exists but still needs hardening or clearer boundaries before 1.0
3. **Deferred until post-1.0**
   - valid tracks that remain intentionally out of the current priority lane

See also:

- `docs/release-1.0-readiness.md`
- `docs/00-overview.md`

---

## Established baseline

### Alpha 1 — Core + Governance Baseline
**Status:** complete enough for the current cycle

What Alpha 1 already established:

- framework core contracts
- minimal deterministic kernel
- governance baseline
- token discipline
- explicit token policy
- durable decisions
- enforcement-boundary clarity
- quality baseline
- learning-from-failed-validation path

Current anchor artifacts include:

- `docs/token-policy.md`
- `docs/durable-decisions.md`
- `docs/enforcement-boundaries.md`
- `docs/quality.md`
- `scripts/check-governance.sh`

### Alpha 2 — Real Pilots + Self-Application
**Status:** complete enough for the current cycle

What Alpha 2 already established:

- real pilot grounding through Crisis Monitor
- self-application of framework discipline to framework evolution
- pilot-to-learning-to-framework conversion
- project extension as a clean local layer

Current anchor artifacts include:

- `docs/self-application.md`
- `docs/pilot-crisis-monitor.md`
- `docs/pilot-conversion.md`
- `docs/project-extension-pattern.md`
- `examples/pilot-conversion/crisis-monitor-real-world-validation.md`

### Alpha 3 — Adoption + Ecosystem
**Status:** complete enough for the current cycle

What Alpha 3 already established:

- clearer onboarding
- starter-pack reuse
- contribution guidance
- existing-project application path
- stronger separation between framework core and local extension

Current anchor artifacts include:

- `docs/getting-started.md`
- `docs/apply-to-existing-project.md`
- `CONTRIBUTING.md`
- `starter-pack/README.md`
- `starter-pack/templates/project-extension-template.md`

---

## Alpha completion pass

These Alphas are real baselines already, but they are **still open for the 1.0 gate**.

### Alpha 4 — Orchestrated Handoffs & Multi-Agent Continuity
**Status:** baseline established, still open

Alpha 4 already has:

- handoff concept docs
- generation guidance
- starter-pack template
- project-level conventions
- handoff capture pattern
- restart-package examples

What still needs to feel done enough:

- tighter coherence between doc, template, and examples
- a clearer boundary between schema coverage and richer operational handoff practice
- at least one stronger multi-boundary continuity example if the current examples still feel too light

Current anchor artifacts include:

- `docs/agent-handoffs.md`
- `starter-pack/guides/agent-handoff-generation.md`
- `starter-pack/templates/agent-handoff-template.md`
- `docs/project-handoff-conventions.md`
- `docs/handoff-capture-pattern.md`

### Alpha 5 — Structured Risk Inference & Evidence-Oriented Validation
**Status:** baseline established, still open

Alpha 5 already has:

- concept framing
- template
- trigger guidance
- generation guidance
- pilot scenarios
- example artifacts

What still needs to feel done enough:

- more tangible real or near-real evidence
- a tighter connection to risk-to-gate and iterative maintenance
- clearer guidance on when inference helps and when it becomes unnecessary overhead
- continued selective positioning rather than universal ceremony

Current anchor artifacts include:

- `docs/structured-risk-inference.md`
- `starter-pack/templates/inference-artifact-template.md`
- `starter-pack/guides/inference-trigger-guidance.md`
- `starter-pack/guides/inference-artifact-generation.md`
- `docs/inference-pilot-scenarios.md`
- `examples/structured-risk-inference/README.md`

### Alpha 6 — Distribution, Presets & Adapters
**Status:** baseline established, still open

Alpha 6 already has:

- distribution architecture framing
- preset taxonomy
- adapter taxonomy
- adoption modes
- delivery mappings

What still needs to feel done enough:

- more tangible presets, adapters, and adoption examples
- at least one stronger local distribution or extension example in a demanding context
- clearer communication of architectural plugability without claiming enterprise-readiness

Current anchor artifacts include:

- `docs/distribution-presets-adapters.md`
- `docs/preset-taxonomy.md`
- `docs/adapter-taxonomy.md`
- `docs/adoption-mode-guidance.md`
- `docs/delivery-mapping-examples.md`

### Alpha 7 — Bootstrap & Delivery Tooling
**Status:** baseline defined, still not 1.0-ready

Alpha 7 already has:

- principles
- tooling boundaries
- bootstrap output examples
- generator contract
- delivery output contract

What still needs to feel done enough for 1.0:

- clearer boundary language so the tooling layer stays obviously optional and future-facing
- coherence between generator, output, and boundary docs
- no implication that 1.0 depends on real delivery tooling

Current anchor artifacts include:

- `docs/bootstrap-principles.md`
- `docs/delivery-tooling-boundaries.md`
- `docs/bootstrap-output-examples.md`
- `docs/bootstrap-generator-contract.md`
- `docs/delivery-output-contract.md`

---

## Current operational-composition baseline

This is **not a new Alpha**.
It is a proportional operating layer that makes the existing baselines easier to apply.

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

It should remain smaller than the core and must not replace the Alpha completion pass.

---

## Completion-first queue

These previously discussed moves remain **active** and are now the formal queue before 1.0:

1. **Alpha 4 completion pass**
2. **Alpha 5 hardening pass**
3. **Alpha 6 tangibility pass**
4. **Alpha 7 boundary clarification pass**

This queue exists so that new strategic tracks do not compete with what still blocks a clean 1.0 baseline.

---

## Deferred until post-1.0

These tracks remain valid, but they are now explicitly **deferred until after the 1.0 gate**.

### 1.1 — Enterprise-readiness / regulated adoption
Includes the previously discussed backlog items such as:

- enterprise-readiness / regulated adoption roadmap
- enterprise adoption guidance
- restricted enterprise extension example
- stronger articulation of local trust-boundary posture in constrained environments

### 1.2 — Pilot expansion / stronger real-world validation
Includes:

- expansion beyond the strongest current pilot lane
- more real-world comparisons between project extensions
- stronger pilot-to-framework conversion evidence

### 1.3 — Distribution & delivery hardening
Includes:

- broader delivery and distribution hardening beyond “done enough”
- stronger preset and adapter tangibility after the Alpha 6 pass
- additional delivery-layer material once the baseline is already stable

### 1.4+ — Domain governance packs hardening
Includes:

- stronger domain governance packs
- future trust-boundary and prompt-injection packs as harder reusable layers
- heavier Alpha 7 tooling only after the baseline and post-1.0 priorities justify it

These deferred tracks are preserved as backlog on purpose.
They are not cancelled.
They are simply not the current priority lane.

---

## Sequence to 1.0

The current order is now explicit:

1. finish the **Alpha completion-first queue**
2. run the **1.0 readiness check** in `docs/release-1.0-readiness.md`
3. flip the public surfaces from late-alpha to **AletheIA 1.0**
4. begin the **1.x roadmap**

Until then, the repository should keep treating:

- enterprise-readiness
- stronger domain governance packs
- heavier delivery tooling
- broader post-baseline distribution work

as **deferred tracks**, not current priorities.

---

## Cross-Alpha principles

Across all phases, AletheIA should preserve a few boundaries:

1. remain provider-agnostic
2. avoid collapsing into one product's operating residue
3. prefer explicit contracts over hidden conventions
4. keep learnings reviewable instead of informal
5. improve through real pilots instead of theory alone
6. keep delivery and tooling as delivery-layer concerns, not replacements for the core operating model
7. treat project extension as the main place where local complexity should land
