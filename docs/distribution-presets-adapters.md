# Distribution, Presets & Adapters

## Goal

This document explains the future Alpha 6 direction for AletheIA.

In simple terms:

keep the framework core stable,
but make it easier to package, deliver, and reuse across different project shapes and agent environments.

---

## Why this phase exists

AletheIA is becoming stronger as an operating framework.

It already has:

- a governance baseline
- real pilot learnings
- an adoption baseline
- a model-agnostic handoff baseline
- a future direction for structured risk inference

The next gap is not primarily conceptual.

The next gap is distribution.

Today, AletheIA is easier to understand than to package consistently across:

- different project shapes
- different editor or agent-shell environments
- lighter vs fuller adoption footprints

Alpha 6 exists to improve that distribution layer without redefining the framework core.

---

## Useful reference, limited influence

Tools such as `maestro-bundle-cli` are useful references for this phase because they show a practical packaging mindset:

- bundle a baseline
- adapt it to different editors
- offer lighter or fuller installation paths

That is useful inspiration.

But the lesson for AletheIA is specifically about:

- packaging
- delivery
- presets
- adapters

It is not about replacing AletheIA's core operating model with a CLI-first or tool-specific worldview.

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

AletheIA should eventually support curated packages for common project shapes.

Examples:

- web application preset
- AI product preset
- regulated-domain preset
- lightweight starter preset

The goal is not to create many bundles quickly.

The goal is to define a reusable preset model that can package the same core in context-appropriate ways.

### 2. Adapters

AletheIA should eventually support delivery adapters for different editor and agent environments.

Examples:

- AGENTS-style delivery
- Claude-style delivery
- Codex-oriented delivery
- future editor or shell adapters

The goal is not to privilege one editor.

The goal is to preserve the same framework meaning across environments.

### 3. Adoption modes

AletheIA should eventually support more than one installation footprint.

Examples:

- lightweight mode
- fuller operating mode

This helps teams adopt the framework with the right amount of structure for their context, instead of forcing one universal level of ceremony.

---

## What Alpha 6 is not

Alpha 6 is not about:

- changing the decision or governance core
- making one editor the canonical interface
- introducing mandatory external integrations
- promising a one-command bootstrap experience yet
- replacing the roadmap Alpha 1 through Alpha 5 concepts with packaging concerns

This phase should stay clearly in the delivery layer.

---

## Likely first artifacts

Good first Alpha 6 artifacts would include:

- a preset taxonomy
- an adapter taxonomy
- lite vs fuller adoption mode guidance
- delivery mapping examples across environments

Current Alpha 6 artifacts now include:

- `docs/preset-taxonomy.md`
- `docs/adapter-taxonomy.md`

Likely next artifacts for this phase may include:

- lite vs fuller adoption mode guidance
- delivery mapping examples across environments

These should make the distribution model explicit before any heavier tooling is introduced.

---

## Relationship to Alpha 7

Alpha 6 defines the model.

Alpha 7 may later operationalize it.

That means Alpha 6 should answer questions such as:

- what is a preset?
- what is an adapter?
- what should vary by environment?
- what must remain framework-stable?
- what does lightweight vs fuller adoption mean?

Only after those answers are stable should AletheIA seriously consider:

- bootstrap tooling
- installation automation
- delivery CLI flows

That later work belongs to Alpha 7, not to Alpha 6.

---

## Good signs

Alpha 6 is going well when:

- the framework becomes easier to package without becoming tool-dependent
- teams can imagine different delivery forms without confusing them with framework truth
- presets and adapters feel like delivery choices, not conceptual forks
- AletheIA remains provider-agnostic and core-stable

---

## Risks

The main risks are:

- letting packaging concerns redefine the framework core
- overpromising CLI or automation too early
- importing tool-specific assumptions into the framework model
- treating external integrations as mandatory before the distribution model is stable

---

## Mitigations

Alpha 6 should mitigate those risks by:

- keeping packaging explicitly separate from the governance core
- treating external integrations as out of scope for now
- defining presets and adapters conceptually before automating them
- keeping Alpha 7 as a later tooling phase rather than collapsing both phases together

---

## Suggested next reading

- `docs/roadmap-alpha.md`
- `docs/project-extension-pattern.md`
- `docs/agent-handoffs.md`
- `docs/structured-risk-inference.md`
