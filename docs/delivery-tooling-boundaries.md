# Delivery Tooling Boundaries

## Goal

This document defines a first future-facing boundary model for Alpha 7 delivery tooling.

In simple terms:

if AletheIA eventually gains bootstrap or delivery tooling,
it needs a clearer idea of what that tooling may do, what it must not do, and where it should stop.

---

## Why this matters

Once tooling enters the picture, ambiguity becomes more expensive.

A vague document can be corrected later.
A vague generator tends to repeat the same mistake at scale.

That is why Alpha 7 should make boundaries explicit before it starts promising more automation.

The goal is not to constrain tooling unnecessarily.
The goal is to keep tooling from silently becoming a second framework.

---

## Core idea

Delivery tooling should be understood as:

**a bounded helper for packaging and emitting already-defined AletheIA meaning**

That means tooling may help with:

- selecting a preset
- selecting an adoption mode
- producing delivery outputs for a surface
- generating inspectable files from already-stable models

But tooling should not:

- invent new framework meaning
- collapse distinctions between layers
- decide policy on its own
- hide what it generated and why

---

## What delivery tooling may do

Alpha 7 delivery tooling may eventually:

### 1. Materialize a chosen preset

Example:

- take a preset choice already defined by Alpha 6
- produce a recommended reading package or starter output
- keep the relationship between preset and generated output explicit

### 2. Materialize a chosen adoption mode

Example:

- reflect Lite, Standard, or Fuller entry posture in generated guidance
- make it explicit which layers are activated now versus postponed

### 3. Emit environment-specific delivery outputs

Example:

- generate a repo-facing package
- generate an instruction-facing package
- generate a delivery artifact for a specific surface

Only if the output still preserves the same framework meaning.

### 4. Preserve traceability

Generated outputs should indicate:

- which preset influenced them
- which adoption mode influenced them
- which adapter logic influenced them
- which canonical docs remain the source of truth

### 5. Support review before adoption

Generated outputs should be inspectable before teams rely on them operationally.

---

## What delivery tooling must not do

Alpha 7 delivery tooling must not:

### 1. Redefine the framework core

Tooling should never become the place where AletheIA's operating model is quietly rewritten.

### 2. Collapse layer distinctions

Tooling must not blur:

- core versus project extension
- preset versus adapter
- adoption mode versus framework meaning
- domain governance pack versus universal rule

### 3. Make one environment canonical

Tooling must not treat one editor, shell, or delivery surface as the “real” AletheIA while others become secondary approximations.

### 4. Hide generated assumptions

If tooling makes assumptions, those assumptions should stay visible and reviewable.

### 5. Jump ahead of the model

Tooling must not automate concepts that Alpha 6 has not clarified yet.

### 6. Pretend inspection is optional

If the only way to trust the output is to trust the tool blindly, the boundary has already been crossed.

---

## What should remain outside delivery tooling

Some things should remain outside Alpha 7 delivery tooling unless the framework evolves much further.

Examples:

- deciding domain-specific policies automatically
- inferring project-local rules without explicit input
- choosing security posture without human review
- replacing durable decisions with generated defaults
- turning future domain governance packs into silent universal installs

These are closer to governance and judgment than to delivery.

---

## Relationship to bootstrap principles

`docs/bootstrap-principles.md` defines the posture.
This document defines the boundary.

In practice:

- bootstrap principles explain how tooling should behave
- delivery tooling boundaries explain where tooling should stop

Both are needed before Alpha 7 can move safely toward implementation.

---

## Good signs

Alpha 7 tooling boundaries are healthy when:

- tooling scope is narrower than tooling ambition
- generated outputs remain legible
- the canonical docs remain authoritative
- teams can understand what was emitted and why
- stopping points are explicit instead of implied

---

## Suggested next reading

- `docs/bootstrap-principles.md`
- `docs/bootstrap-generator-contract.md`
- `docs/delivery-output-contract.md`
- `docs/roadmap-alpha.md`
- `docs/distribution-presets-adapters.md`
- `docs/preset-taxonomy.md`
- `docs/adapter-taxonomy.md`
- `docs/adoption-mode-guidance.md`
- `docs/delivery-mapping-examples.md`
