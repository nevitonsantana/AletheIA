# Bootstrap Principles

## Goal

This document defines the Alpha 7 bootstrap posture.

In simple terms:

if Alpha 7 is going to introduce tooling later,
it should first make explicit what that tooling must preserve and what it must never distort.

---

## Current status

Alpha 7 is currently:

- **defined**
- **optional**
- **future-facing**
- **not required for 1.0**

That means these docs exist to remove ambiguity, not to announce active tooling work.

AletheIA does **not** need a real bootstrap tool before 1.0.
It needs a clear enough tooling boundary that later implementation cannot quietly distort the framework.

---

## Why this matters

Once a framework starts thinking about bootstrap tooling, a predictable risk appears:

the installer or generator becomes more influential than the framework itself.

That creates avoidable problems:

- the tool starts redefining framework meaning
- one delivery surface becomes de facto canonical
- setup convenience starts to outrun conceptual clarity
- teams inherit automation they do not fully understand

Alpha 7 should not begin by asking:

**what command should we build first?**

It should begin by asking:

**what must bootstrap tooling preserve so it remains subordinate to the framework?**

---

## Core idea

Bootstrap tooling should be understood as:

**an optional delivery layer that operationalizes a model already defined elsewhere**

That means Alpha 7 tooling should:

- follow Alpha 6 models
- stay subordinate to canonical docs
- remain inspectable
- remain optional
- avoid redefining framework truth through automation

Tooling may speed up setup.
It should not become the source of meaning.

---

## First bootstrap principles

### 1. Model before tooling

Bootstrap should only operationalize concepts that Alpha 6 already clarified.

That means tooling should come after there is a stable model for:

- presets
- adapters
- adoption modes
- delivery mappings

If the model is still ambiguous, the tool will encode that ambiguity and make it harder to fix later.

### 2. Canonical docs stay authoritative

Generated or installed outputs must not replace the canonical repo-native docs as the reference source.

Tooling may compress or distribute.
It should still point back to the canonical surfaces when meaning matters.

### 3. Inspectability over magic

Bootstrap outputs should stay readable and inspectable.

A team should be able to answer:

- what was generated?
- why was it generated?
- which preset or mode drove it?
- which parts are framework-derived versus project-local?

### 4. Optionality over lock-in

Alpha 7 tooling should remain optional.

Teams should still be able to adopt AletheIA without a CLI or installer.

Tooling should support the framework.
It should not become a prerequisite for understanding it.

### 5. No single tool becomes framework truth

Bootstrap should not make one editor, one provider, or one instruction style the canonical AletheIA experience.

If a tool only works by making one surface privileged, it is probably trying to do too much.

### 6. Generated outputs must preserve boundaries

Tooling must preserve the distinctions already made explicit in earlier phases, including:

- framework core versus project extension
- preset versus adapter
- adoption mode versus framework meaning
- domain governance pack versus universal core

### 7. Human review should stay possible

Bootstrap outputs should be reviewable before teams treat them as authoritative.

Even when automation is helpful, teams should still be able to inspect and adjust what was produced.

### 8. Progressive complexity is healthier than total installation

Alpha 7 should prefer layered setup over a single promise that “one command installs everything.”

A safer posture is:

- start with explicit distribution choices
- generate small inspectable outputs
- expand only where the model is already clear

---

## What Alpha 7 tooling should not do

Bootstrap tooling should not:

- redefine the core operating model
- silently encode vendor-specific assumptions as framework truth
- collapse docs, presets, adapters, and packs into one opaque artifact
- produce outputs that are hard to inspect or revise
- promise complete automation before the model is stable enough to justify it
- be treated as a blocker for the 1.0 release

---

## Relationship to Alpha 6

Alpha 6 defines the distribution model.
Alpha 7 may later operationalize it.

That means Alpha 7 should treat the following as inputs, not as open questions:

- `docs/preset-taxonomy.md`
- `docs/adapter-taxonomy.md`
- `docs/adoption-mode-guidance.md`
- `docs/delivery-mapping-examples.md`

If tooling starts inventing meaning beyond those artifacts, it is no longer acting as a safe delivery layer.

---

## Good signs

Alpha 7 is clarified enough for 1.0 when:

- tooling principles are clearer than tooling ambition
- inspectability stays more important than cleverness
- optionality stays explicit
- generated outputs remain legible and reviewable
- the framework still makes sense even without the tooling
- the docs no longer imply that active tooling implementation is required before 1.0

---

## Suggested next reading

- `docs/delivery-tooling-boundaries.md`
- `docs/bootstrap-output-examples.md`
- `docs/bootstrap-generator-contract.md`
- `docs/delivery-output-contract.md`
- `examples/delivery/reviewable-generated-bundle.md`
- `docs/roadmap-alpha.md`
