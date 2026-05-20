# Distribution, Presets & Adapters

## Goal

This document explains the Alpha 6 direction for AletheIA.

In simple terms:

keep the framework core stable,
but make it easier to package, deliver, and reuse across different project shapes and agent environments.

---

## Current status

Alpha 6 now has a **baseline established, still open** posture.

That means:

- the conceptual model already exists
- the packaging and delivery vocabulary is now public
- the current gap is **tangibility**, not only theory

Alpha 6 should therefore be read as a concrete distribution baseline that still needs stronger examples before it can be considered done enough for 1.0.

---

## Why this phase exists

AletheIA is becoming stronger as an operating framework.

It already has:

- a governance baseline
- real pilot learnings
- an adoption baseline
- a handoff baseline
- an experimental inference baseline

The next gap is not primarily conceptual.

The next gap is distribution.

Today, AletheIA is easier to understand than to package consistently across:

- different project shapes
- different editor or agent-shell environments
- lighter vs fuller adoption footprints

Alpha 6 exists to improve that distribution layer without redefining the framework core.

---

## Alpha 6 thesis

Alpha 6 should prove a simple idea:

**the same AletheIA meaning can be delivered through different forms without distorting the framework core.**

That means:

- same framework meaning
- different delivery forms
- no core distortion

AletheIA should stay recognizable even if teams adopt it through different presets, environments, or setup footprints.

---

## The three tracks of Alpha 6

### 1. Presets / Bundles

AletheIA should support curated packages for common project shapes.

Examples:

- core starter preset
- existing project adoption preset
- multi-agent continuity preset
- risk-aware delivery preset
- security-sensitive preset

The goal is not to create many bundles quickly.

The goal is to define a reusable preset model that can package the same core in context-appropriate ways.

### 2. Adapters

AletheIA should support delivery adapters for different editor and agent environments.

Examples:

- repo-native delivery
- AGENTS-style delivery
- Claude-style delivery
- Codex-oriented delivery
- future editor or shell adapters

The goal is not to privilege one editor.

The goal is to preserve the same framework meaning across environments.

### 3. Adoption modes

AletheIA should support more than one installation footprint.

Examples:

- lite mode
- standard mode
- fuller operating mode

This helps teams adopt the framework with the right amount of structure for their context, instead of forcing one universal level of ceremony.

---

## What Alpha 6 is not

Alpha 6 is not about:

- changing the decision or governance core
- making one editor the canonical interface
- introducing mandatory external integrations
- promising a one-command bootstrap experience yet
- replacing the Alpha 1 through Alpha 5 concepts with packaging concerns
- claiming enterprise-readiness before the baseline is ready for that discussion

This phase should stay clearly in the delivery layer.

---

## Current baseline artifacts

The current concrete Alpha 6 baseline includes:

- `docs/distribution-presets-adapters.md`
- `docs/preset-taxonomy.md`
- `docs/adapter-taxonomy.md`
- `docs/adoption-mode-guidance.md`
- `docs/delivery-mapping-examples.md`
- `examples/distribution/constrained-adoption-mapping.md`

Together, these artifacts now define Alpha 6 as a model for:

- packaging shape
- delivery surface
- adoption depth
- cross-surface meaning preservation
- one more tangible example of local distribution choice in a constrained context

before any heavier tooling is introduced.

---

## A practical Alpha 6 selection recipe

When applying Alpha 6 to a real project, the smallest useful selection sequence is:

1. choose the **preset**
   - what kind of project or operating problem is this?
2. choose the **adapter**
   - in what surface should the framework be delivered first?
3. choose the **adoption mode**
   - how much operating depth is justified now?
4. define the **project extension boundary**
   - what remains framework-stable versus local?

This is the smallest tangible move that turns Alpha 6 from vocabulary into packaging discipline.

---

## Relationship to project extension

Alpha 6 becomes safer when it stays paired with project extension discipline.

Why:

- presets should not absorb local business rules
- adapters should not absorb local trust posture
- adoption modes should not redefine the framework core
- local restrictions, model limits, approvals, and tool boundaries should still land in the project extension layer

That is why Alpha 6 should be read together with:

- `docs/project-extension-pattern.md`
- `examples/distribution/constrained-adoption-mapping.md`

---

## Relationship to Alpha 7

Alpha 6 defines the model.

Alpha 7 may later operationalize it through future-facing tooling contracts, but still without implementation.

That means Alpha 6 should answer questions such as:

- what is a preset?
- what is an adapter?
- what should vary by environment?
- what must remain framework-stable?
- what does lite vs standard vs fuller adoption mean?

Only after those answers are stable should AletheIA seriously consider:

- bootstrap tooling
- installation automation
- delivery CLI flows

That later work still belongs to Alpha 7, not to Alpha 6.

---

## Good signs

Alpha 6 is going well when:

- the framework becomes easier to package without becoming tool-dependent
- teams can describe different delivery forms without confusing them with framework truth
- presets and adapters feel like delivery choices, not conceptual forks
- plugability is easier to explain through concrete examples
- AletheIA remains provider-agnostic and core-stable

---

## Risks

The main risks are:

- letting packaging concerns redefine the framework core
- overpromising CLI or automation too early
- importing tool-specific assumptions into the framework model
- treating external integrations as mandatory before the distribution model is stable
- using one constrained example as if it proved broad regulated readiness already

---

## Mitigations

Alpha 6 should mitigate those risks by:

- keeping packaging explicitly separate from the governance core
- treating external integrations as out of scope for now
- defining presets and adapters conceptually before automating them
- keeping Alpha 7 as a later tooling phase rather than collapsing both phases together
- showing concrete mappings without overstating readiness

---

## Suggested next reading

- `docs/preset-taxonomy.md`
- `docs/adapter-taxonomy.md`
- `docs/adoption-mode-guidance.md`
- `docs/delivery-mapping-examples.md`
- `docs/project-extension-pattern.md`
- `examples/distribution/constrained-adoption-mapping.md`
