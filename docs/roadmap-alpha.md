# AletheIA Alpha Roadmap

## Alpha 1 — Core + Governance Baseline

Focus:
- prove the framework core
- harden the minimum governance baseline

Includes:
- core contracts
- minimal deterministic kernel
- governance pack
- governance hooks
- quality baseline
- learning-from-failed-validation
- token policy
- technical governance baseline
- stronger durable-decision / ADR discipline
- clearer distinction between behavioral enforcement and technical enforcement

### What Alpha 1 must prove

By the end of Alpha 1, AletheIA should already show that:

- an input can become a structured decision
- governance can evaluate whether work should proceed
- unsafe or poorly framed closure can be blocked
- failed validation can generate reusable learnings
- token discipline can be explicit instead of implicit
- the repository has a small executable governance baseline, not only governance prose

### Notes

Alpha 1 should stay intentionally small.

This phase is not the moment for:
- heavy policy engines
- installer promises
- large integration matrices
- strong claims about enterprise enforcement

The goal is to make the framework inspectable, teachable, and minimally enforceable.

Current Alpha 1 baseline artifacts now include:

- `docs/token-policy.md`
- `scripts/check-governance.sh`
- `docs/durable-decisions.md`
- `docs/enforcement-boundaries.md`

---

## Alpha 2 — Real Pilots + Self-Application

Focus:
- prove AletheIA in real product flows
- start using AletheIA to improve AletheIA

Includes:
- first real Crisis Monitor pilot write-up
- second small pilot or adjacent real flow
- stronger pilot learnings loop
- project extension pattern
- self-application loop
- self-application of AletheIA contracts to framework evolution
- clearer conversion of pilot learnings into framework improvements

### What Alpha 2 must prove

By the end of Alpha 2, AletheIA should already show that:

- the framework works in real product slices, not only examples
- pilots produce durable learnings, not just anecdotes
- AletheIA can be applied to its own roadmap and repo evolution
- project-specific extensions can exist without collapsing the framework into a single product

### Notes

This is the phase where real pilots matter more than abstract completeness.

The most important move in Alpha 2 is not adding more framework surface.
It is closing the loop between:

`pilot -> learning -> framework improvement`

Current Alpha 2 bridge artifacts now include:

- `docs/self-application.md`
- `docs/pilot-crisis-monitor.md`
- `docs/pilot-conversion.md`
- `docs/project-extension-pattern.md`

Together, these four artifacts define how AletheIA learns from pilots, improves itself, and preserves the boundary between reusable core and local project context.

---

## Alpha 3 — Adoption + Ecosystem

Focus:
- make the repository easier to adopt, extend, and contribute to

Includes:
- better onboarding
- a clearer getting-started path
- stronger contributor guidance
- clearer contribution boundaries for framework core vs project extension
- stronger starter-pack
- clearer guidance for applying AletheIA in an existing project
- cleaner release structure
- reusable domain governance packs
- tighter release hygiene
- less pilot-specific residue in public docs

### What Alpha 3 must prove

By the end of Alpha 3, AletheIA should already show that:

- a new team can understand how to start
- contributors can extend the framework without breaking its core logic
- the starter-pack is more reusable and less tied to its original extraction context
- governance patterns can be reused across domains without redefining the whole framework

### Notes

Alpha 3 is not about making the framework heavier.
It is about making it easier to adopt.

AletheIA should become easier to:
- read
- install mentally
- adapt
- contribute to
- test in real projects

---

## Alpha 4 — Orchestrated Handoffs & Multi-Agent Continuity

Focus:
- make handoffs between agents explicit, reusable, model-agnostic, and increasingly automatable

Includes:
- structured inter-agent handoff contracts
- handoff generation patterns from real work items
- clearer separation between human-facing summaries and agent-facing restart packages
- model-agnostic continuity patterns that do not depend on one LLM or coding tool
- starter-pack guidance for cross-agent execution flows
- reusable patterns for passing scope, validation, risks, and next action across agents

### What Alpha 4 must prove

By the end of Alpha 4, AletheIA should already show that:

- handoffs can be produced as compact restart packages instead of ad-hoc prompts
- one agent can stop at its boundary and prepare the next agent's work clearly
- cross-agent continuity can happen without relying on hidden thread memory
- handoff artifacts can be generated in a repeatable way from real project work
- the handoff structure can work across different LLMs and agent shells without changing its core meaning

### Notes

Alpha 4 is not about adding more agents for their own sake.
It is about making agent boundaries safer and more productive.

The key move in Alpha 4 is turning:

`work in one agent -> explicit handoff artifact -> reliable continuation in another agent`

into a reusable operating pattern.

Current Alpha 4 baseline artifacts now include:

- `docs/agent-handoffs.md`
- `starter-pack/guides/agent-handoff-generation.md`
- `starter-pack/templates/agent-handoff-template.md`
- `docs/project-handoff-conventions.md`
- `docs/handoff-capture-pattern.md`

Next artifacts for this phase may include:

- execution-scope fields such as allowed files, forbidden files, allowed data, semantic guardrails, acceptance criteria, and expected response format
- project-level handoff examples drawn from real pilot work
- more explicit draft/review flows for semi-automated handoff assembly

---

## Alpha 5 — Structured Risk Inference & Evidence-Oriented Validation

Focus:
- make higher-risk decisions more reviewable before execution through structured, evidence-oriented inference

Includes:
- a conditional inference step for higher-risk work
- compact inference artifacts with premises, assumptions, invariants, risks, unknowns, and test gaps
- better connection between semantic risk and validation design
- stronger rationale preservation across high-stakes handoffs
- experimental use in code and semantic-risk scenarios before broader expansion

### What Alpha 5 must prove

By the end of Alpha 5, AletheIA should already show that:

- higher-risk changes can be reasoned about more explicitly before execution
- semantic risks can be surfaced without pretending to prove formal correctness
- evidence, assumptions, and unknowns can be captured in a reusable artifact
- risk-oriented suggested tests can improve validation quality
- the capability can remain selective instead of becoming universal ceremony

### Notes

Alpha 5 should not be framed as formal verification.
It should be framed as structured, reviewable inference for cases where raw confidence is not enough.

The key move in Alpha 5 is inserting a conditional step such as:

`intent -> context -> decision -> [if triggered: inference] -> execution -> validation -> learning`

This phase should begin as an experimental capability, not a mandatory step for every workflow.

Current Alpha 5 baseline artifacts now include:

- `docs/structured-risk-inference.md`
- `starter-pack/templates/inference-artifact-template.md`
- `starter-pack/guides/inference-trigger-guidance.md`
- `starter-pack/guides/inference-artifact-generation.md`
- `docs/inference-pilot-scenarios.md`
- `examples/structured-risk-inference/README.md`

Together, these artifacts now define Alpha 5 as a concept-plus-examples baseline rather than only a template-and-guidance layer.

---

## Alpha 6 — Distribution, Presets & Adapters

Focus:
- make AletheIA easier to package, deliver, and reuse across project shapes and agent environments without changing the framework core

Includes:
- preset or bundle models for common project shapes
- editor and agent-shell adapters that preserve the same framework meaning across environments
- lighter vs fuller adoption modes
- clearer distinction between framework core and delivery-layer packaging
- future-facing distribution guidance that stays provider-agnostic

### What Alpha 6 must prove

By the end of Alpha 6, AletheIA should already show that:

- the framework can be packaged in more than one reusable form without distorting its conceptual core
- presets can adapt the framework to different project shapes without turning into incompatible forks
- adapters can deliver the same meaning across editor or agent environments
- teams can choose lighter vs fuller adoption footprints without changing the framework's governing logic

### Notes

Alpha 6 is not a CLI-first phase.
It is a distribution-architecture phase.

This phase should not:
- change the decision or governance core
- make one editor the canonical interface
- introduce mandatory external integrations
- promise one-command installation before the model is stable

Current Alpha 6 direction is documented in:

- `docs/distribution-presets-adapters.md`

Current Alpha 6 baseline artifacts now include:

- `docs/distribution-presets-adapters.md`
- `docs/preset-taxonomy.md`
- `docs/adapter-taxonomy.md`
- `docs/adoption-mode-guidance.md`
- `docs/delivery-mapping-examples.md`

Together, these artifacts now define Alpha 6 as a first concrete distribution baseline covering packaging shape, delivery surface, adoption depth, and cross-surface meaning preservation.

---

## Alpha 7 — Bootstrap & Delivery Tooling

Focus:
- operationalize the distribution model from Alpha 6 through optional bootstrap and delivery tooling

### What Alpha 7 should remain

Alpha 7 should stay intentionally smaller and later than Alpha 6.

It may eventually include:

- optional bootstrap CLI flows
- delivery automation for presets or adapters
- packaging helpers for distributing AletheIA into real repositories

### Notes

Alpha 7 should only become active after presets, adapters, adoption modes, and delivery mappings are already well-defined.

It should remain:
- provider-agnostic
- optional
- clearly outside the framework core itself

Current Alpha 7 baseline artifacts now include:

- `docs/bootstrap-principles.md`
- `docs/delivery-tooling-boundaries.md`
- `docs/bootstrap-output-examples.md`
- `docs/bootstrap-generator-contract.md`
- `docs/delivery-output-contract.md`

Together, these artifacts now define Alpha 7 as a first future-facing tooling baseline covering posture, boundaries, output shape, generator IO, and output obligations before any implementation is attempted.

---

## Current Operational Composition Baseline

Focus:
- make the current baselines more tangible through composed work slices, clearer risk-to-gate mapping, stronger handoff examples, and optional filesystem-based context routing experiments

This is not a new Alpha.
It is a low-regret operational-composition baseline that composes the current artifacts around Alpha 4 and Alpha 5 without changing the framework core.

Current artifacts in this layer now include:

- `docs/work-slice-pattern.md`
- `starter-pack/templates/work-slice-template.md`
- `starter-pack/guides/risk-to-gate-mapping.md`
- `examples/work-slices/standard-slice/README.md`
- `examples/handoffs/compact-reviewable-handoff.md`
- `examples/handoffs/high-stakes-handoff.md`
- `starter-pack/experiments/workspace-context-routing/README.md`

Together, these artifacts now define a first operational-composition baseline and strengthen four practical moves without inflating the core:

- make bounded work more legible through composed slices
- connect risk posture to proof depth and gate choice
- make handoffs more restartable without making them more bureaucratic
- test filesystem-based context routing as an optional starter-pack experiment

---

## Future Track — Reusable Domain Governance Packs

Focus:
- make recurring domain-specific governance reusable without inflating the AletheIA core

This future track exists for governance patterns that are:

- too domain-specific to live in the framework core
- too reusable to remain only as project-local rules
- worth documenting as reusable operating discipline before any heavier automation appears

This is not a new Alpha right now.
It is a future track for reusable domain governance layers that sit between the framework core and each project's local extension.

The intended layer is:

`AletheIA core -> domain governance pack -> project extension`

The first planned packs in this track are:

- `Web App Security & Trust Boundaries Pack`
- `AI Agent Security & Prompt Injection Pack`

This future track connects to the existing phases in specific ways:

- Alpha 1 provides the generic governance baseline and core security-adjacent rules
- Alpha 3 opens the path for reusable domain governance packs beyond the core
- Alpha 4 contributes execution boundaries, handoffs, and semantic guardrails
- Alpha 5 may later strengthen higher-risk decisions inside these packs through selective structured inference

Current direction for this track is documented in:

- `docs/domain-governance-packs.md`
- `docs/web-app-security-trust-boundaries.md`
- `docs/ai-agent-security-prompt-injection.md`

This future track should not:

- redefine the kernel or policy core
- collapse vendor-specific guidance into framework truth
- turn project-local rules into universal enforcement by accident
- pretend these packs are already active policies in the framework

---

## Cross-Alpha principles

Across all phases, AletheIA should preserve a few boundaries:

1. It should remain provider-agnostic.
2. It should not collapse into a single governance template.
3. It should not confuse product pilot residue with reusable framework core.
4. It should prefer explicit contracts over hidden conventions.
5. It should treat learnings as reviewable artifacts, not informal memory.
6. It should evolve through real pilots, not only through internal theory.
7. It should treat distribution and tooling as delivery-layer concerns, not as replacements for the core operating model.

---

## Near-term priority order

1. keep the current operational-composition baseline coherent
   - work-slice pattern
   - risk-to-gate mapping
   - stronger handoff examples
   - optional workspace-context-routing experiment
2. keep the current Alpha 5 inference baseline coherent
   - concept doc
   - inference template
   - trigger guidance
   - generation guide
   - pilot scenarios
   - example artifacts
   - alignment with Alpha 4 handoffs and the new work-slice layer
3. keep the current Alpha 4 handoff baseline coherent
   - concept doc
   - generation guide
   - handoff template
   - project-level conventions
   - handoff capture pattern
   - compact restart-package examples
4. keep the current Alpha 3 adoption baseline coherent
   - getting started
   - existing-project application
   - contributor guidance
   - project extension template
5. keep the Alpha 2 bridge coherent while adoption grows
6. continue validating the Crisis Monitor pilot and nearby real slices
7. convert pilot learnings into framework updates
8. keep Alpha 5 framed as experimental structured risk inference rather than strong formal verification
9. keep Alpha 6 as a concrete distribution layer without distorting the framework core
10. keep Alpha 7 optional, bounded, and clearly outside the core model
11. shape future domain governance packs as reusable layers without moving them into the framework core
