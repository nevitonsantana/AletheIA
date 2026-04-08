# Delivery Output Contract

## Goal

This document defines a first future-facing contract for what a generated Alpha 7 delivery output should contain once a bootstrap generator has already made its choices.

In simple terms:

if a future Alpha 7 generator emits a package,
this document defines what that emitted package should make visible before a team adopts it.

---

## Why this matters

The bootstrap generator contract explains what a future generator may receive and emit.

The next question is narrower:

**what must the emitted output itself reveal so it stays inspectable, traceable, and reviewable?**

Without an output contract, a generator may technically follow the right inputs while still producing bundles that are too opaque to trust.

---

## Core idea

A delivery output should be understood as:

**a reviewable package whose contents, origin, and authority boundaries remain explicit**

That means an emitted output should always make clear:

- what was generated
- which choices shaped it
- which docs remain canonical
- what is framework-derived versus project-local
- whether the output is ready for adoption or still needs review

---

## Minimum output sections

A healthy Alpha 7 delivery output should be able to communicate at least these sections or their equivalents.

### 1. Output identity

The output should identify itself.

Examples:

- package name
- output purpose
- delivery surface

### 2. Source choices

The output should expose the choices that shaped it.

At minimum:

- selected preset
- selected adoption mode
- selected delivery surface

### 3. Canonical references

The output should point back to the authoritative docs that still define meaning.

Examples:

- roadmap or distribution docs
- starter-pack guides
- handoff or inference docs when relevant

### 4. Generated contents

The output should list what it actually contains.

Examples:

- emitted files
- starter-pack subset
- example bundle
- review notes

### 5. Boundary notes

The output should state what it does **not** redefine.

Examples:

- does not replace canonical docs
- does not infer project-local policy
- does not silently enable future layers

### 6. Review posture

The output should state whether review is still expected before operational adoption.

---

## Minimum contract fields

A future delivery output contract should be able to express at least:

- `output_name`
- `output_purpose`
- `delivery_surface`
- `preset`
- `adoption_mode`
- `canonical_refs`
- `generated_contents`
- `boundary_notes`
- `review_status`
- `review_notes`

This is still a doc-level contract.
It is not yet a schema.

---

## Authority rule

A generated output must not become the new source of truth by accident.

That means every healthy output should make explicit:

- what remains authoritative in the repo
- what is only a packaged derivative
- what still needs human interpretation or local choice

If the output hides those distinctions, it is no longer a safe delivery artifact.

---

## Locality rule

A healthy output should preserve the distinction between:

- framework-derived content
- project-local selections
- future-facing optional layers

That means the output should not silently install local rules, future packs, or stronger automation assumptions without explicit visibility.

---

## Review rule

A healthy delivery output should carry a visible review posture such as:

- review required before adoption
- review complete, ready for local adaptation
- illustrative only, not for direct operational use

This keeps adoption explicit instead of implied.

---

## What this contract should not include yet

This first output contract should not yet define:

- a file format standard
- a manifest schema
- environment-specific output syntax
- automatic validation semantics
- delivery-side policy enforcement

Those belong later, if they become necessary.

---

## Relationship to other Alpha 7 artifacts

This document sits after:

- `docs/bootstrap-principles.md`
- `docs/delivery-tooling-boundaries.md`
- `docs/bootstrap-output-examples.md`
- `docs/bootstrap-generator-contract.md`

In simple terms:

- principles define posture
- boundaries define stop lines
- output examples define healthy shapes
- generator contract defines future generator IO
- this delivery output contract defines what the emitted package itself must reveal

---

## Good signs

A first Alpha 7 delivery output contract is healthy when:

- outputs remain smaller than their ambition
- outputs are clearly tied to preset, mode, and surface
- authority boundaries remain visible
- review posture is explicit
- the contract still makes sense without any implementation yet

---

## Suggested next reading

- `docs/bootstrap-principles.md`
- `docs/delivery-tooling-boundaries.md`
- `docs/bootstrap-output-examples.md`
- `docs/bootstrap-generator-contract.md`
- `docs/distribution-presets-adapters.md`
- `docs/preset-taxonomy.md`
- `docs/adapter-taxonomy.md`
- `docs/adoption-mode-guidance.md`
- `docs/delivery-mapping-examples.md`
