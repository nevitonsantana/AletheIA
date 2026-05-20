# Adapter Taxonomy

## Goal

This document defines a first concrete taxonomy for AletheIA adapters.

In simple terms:

if Alpha 6 is going to deliver the same framework meaning across different environments,
it needs a clearer idea of what kinds of adapter should exist before delivery tooling becomes heavier.

---

## Why this matters

AletheIA is already becoming more reusable as a framework.

But reuse does not only depend on project shape.
It also depends on delivery surface.

A team may read the same framework through:

- repo-native docs
- AGENTS-style files
- editor-specific instruction surfaces
- handoff packages between agents
- future bootstrap or installation flows

Without a clearer adapter model, those delivery surfaces can drift and quietly redefine the framework.

The point of an adapter taxonomy is to prevent that drift.

---

## Core idea

An adapter should be understood as:

**an environment-specific delivery mapping that preserves AletheIA's meaning**

An adapter is not a new preset.
It is not a new policy pack.
It is not a fork of the framework.

An adapter should answer questions such as:

- how should the framework be presented in this environment?
- what must stay semantically identical across environments?
- what can be reformatted without changing meaning?
- what should remain human-readable versus agent-facing?

The adapter should change the delivery form.
It should not change the framework truth.

AletheIA distinguishes between an **Execution Surface** and an **Adapter**.

- the execution surface is where the framework is delivered, read, or operated
- the adapter is the environment-specific mapping that preserves framework meaning across that surface

For canonical terminology, see:

- `docs/canonical-vocabulary.md`

---

## Three adapter layers

AletheIA adapters should eventually vary along three axes:

### 1. Surface type

Where is the framework being delivered?

Examples:

- repo-native documentation
- agent instruction file
- editor-specific context surface
- handoff artifact
- future bootstrap output

### 2. Delivery audience

Who is the immediate reader or receiver?

Examples:

- human contributor
- coding agent
- reviewing agent
- mixed human-plus-agent workflow

### 3. Compression level

How condensed should the delivery be?

Examples:

- full narrative surface
- operational summary
- restart package
- installation-oriented mapping

This doc focuses mainly on the first axis: surface type.

---

## First adapter families

### 1. Repo-Native adapter

Use when the main goal is:

- reading AletheIA in its canonical public form
- understanding the full narrative and roadmap
- preserving the framework in its most inspectable state

This adapter should emphasize:

- README reading order
- docs as the primary source of meaning
- starter-pack references in native repo structure
- explicit distinction between current baseline and future direction

This remains the closest thing to the canonical public surface.

### 2. Agent Instruction adapter

Use when the main goal is:

- delivering AletheIA into an instruction-oriented agent surface
- compressing guidance into an operational format that an agent can consume quickly
- preserving rules, boundaries, and priorities without full narrative overhead

This adapter should emphasize:

- operating loop
- boundaries and ownership rules
- validation expectations
- handoff discipline
- explicit references back to canonical docs when needed

This is the family most likely to include AGENTS-style or editor instruction delivery later.

### 3. Handoff adapter

Use when the main goal is:

- passing work safely between agents or environments
- preserving restart quality across tool boundaries
- carrying forward scope, risks, validation, and next action compactly

This adapter should emphasize:

- Alpha 4 restart package structure
- execution boundary
- allowed and forbidden scope
- validation already performed
- next action for the receiving agent

This family should stay closely aligned with handoff semantics rather than general onboarding.

### 4. Review and Risk adapter

Use when the main goal is:

- surfacing decision rationale in a compact format before execution or closure
- helping reviewers reason about semantic risk and validation posture
- delivering Alpha 5 artifacts into a format suited to review workflows

This adapter should emphasize:

- inference artifacts
- assumptions versus evidence
- invariants and risks
- suggested tests
- confidence and unknowns

This family is especially relevant where human review remains part of the loop.

### 5. Bootstrap Output adapter

Use when the main goal is:

- producing a future installation or setup output once Alpha 7 exists
- translating a chosen preset or adoption mode into concrete delivery files
- keeping automation subordinate to already-defined framework meaning

This adapter should emphasize:

- delivery mapping fidelity
- explicit traceability to preset choice
- generated output that remains inspectable
- low ambiguity about what came from the core versus the adapter

This family should remain future-facing until Alpha 7 is active.

---

## A tangible mapping example

See:

- `examples/distribution/constrained-adoption-mapping.md`

That example shows how the same project can keep:

- repo-native docs as the canonical surface
- an agent-instruction surface as a compressed operational surface
- project extension as the place where local constraints live

without changing the meaning of the framework itself.

---

## What an adapter should not do

An adapter should not:

- redefine framework rules to fit one editor
- turn one tool's conventions into universal truth
- collapse handoff, preset, and pack into one delivery object
- hide the difference between canonical docs and compressed delivery forms
- promise reliable automation before the model is stable enough for it

---

## Relationship to presets

A preset and an adapter are related, but they are not the same thing.

### Preset

A curated distribution shape for a recurring project context.

### Adapter

An environment-specific way of delivering that shape without changing its meaning.

A preset decides what should be emphasized for a project shape.
An adapter decides how that emphasis appears in a particular environment.

---

## Good signs

The adapter taxonomy is healthy when:

- the same framework meaning can be recognized across environments
- compression changes format without silently changing policy or intent
- teams can reason about delivery surfaces without creating hidden forks
- future Alpha 7 tooling has a clear conceptual model to target

---

## Suggested next reading

- `docs/distribution-presets-adapters.md`
- `docs/preset-taxonomy.md`
- `docs/adoption-mode-guidance.md`
- `examples/distribution/constrained-adoption-mapping.md`
- `docs/roadmap-alpha.md`
