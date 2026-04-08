# Bootstrap Generator Contract

## Goal

This document defines a first future-facing contract for what an Alpha 7 bootstrap generator should receive, what it may emit, and what traceability it must preserve.

In simple terms:

if Alpha 7 eventually generates setup outputs,
it helps to define the contract of that generation before promising any implementation.

---

## Why this matters

Bootstrap principles define posture.
Delivery tooling boundaries define stopping points.
Bootstrap output examples show healthy shapes.

The remaining question is:

**what is the smallest stable contract a future generator should honor?**

Without that contract, Alpha 7 risks jumping from principles straight to tooling behavior that is too magical, too ambiguous, or too tightly coupled to one environment.

---

## Core idea

A bootstrap generator should be understood as:

**a bounded translator from already-defined distribution choices into inspectable delivery outputs**

That means the generator should:

- accept only inputs whose meaning is already defined elsewhere
- emit only inspectable outputs
- preserve traceability back to canonical docs
- remain reviewable before adoption

It should not invent framework meaning during generation.

---

## Generator inputs

A healthy Alpha 7 generator contract should start from explicit inputs such as:

### 1. Preset selection

The generator may accept a preset that Alpha 6 already defined.

Examples:

- Core Starter
- Existing Project Adoption
- Multi-Agent Continuity
- Risk-Aware Delivery
- Security-Sensitive

### 2. Adoption mode

The generator may accept an adoption mode such as:

- Lite
- Standard
- Fuller

### 3. Delivery surface

The generator may accept a target surface such as:

- repo-native package
- instruction-facing package
- handoff-oriented package
- review-oriented package

### 4. Explicit local choices

The generator may accept project-local selections that do not redefine framework meaning.

Examples:

- preferred subset of starter-pack artifacts
- whether future-facing layers remain omitted
- whether example artifacts should be included

These inputs should remain visible and reviewable.

---

## Generator outputs

A healthy Alpha 7 generator contract may emit:

### 1. A small delivery bundle

Examples:

- reading-order bundle
- starter-pack subset
- adoption checklist
- handoff starter bundle
- risk-aware review bundle

### 2. A trace manifest

Every generated output should make it possible to answer:

- which preset was selected
- which adoption mode was selected
- which delivery surface was selected
- which canonical docs remain authoritative
- which output files are framework-derived versus locally adjusted

### 3. Reviewable emitted files

Generated material should stay inspectable before teams depend on it operationally.

That means a generator may emit:

- markdown guidance
- starter-pack copies or subsets
- small manifest-style records
- delivery notes pointing back to canonical docs

---

## Minimum contract fields

A future Alpha 7 generator contract should be able to express at least:

- `preset`
- `adoption_mode`
- `delivery_surface`
- `requested_outputs`
- `canonical_refs`
- `local_choices`
- `generated_files`
- `traceability_notes`
- `review_required`

This is still a document-level contract.
It is not yet a JSON schema.

---

## Traceability rule

A healthy generator must preserve a clear line back to the framework.

That means each generated bundle should make visible:

- which Alpha 6 choice shaped it
- which Alpha 7 delivery choice shaped it
- where canonical meaning still lives
- what remains project-local

If the output hides these distinctions, the generator is already doing too much.

---

## Review rule

A generator output should be treated as:

**reviewable before adoption**

That means a healthy contract should assume:

- inspection is possible
- acceptance is explicit
- teams can edit or discard generated outputs
- the framework still makes sense without the generator

---

## What this contract should not include yet

This first contract should not yet define:

- a CLI syntax
- a runtime installer flow
- project-local rule inference
- automatic policy selection
- silent security posture decisions
- environment-specific implementation logic

Those belong later, if they belong at all.

---

## Relationship to other Alpha 7 artifacts

This document sits after:

- `docs/bootstrap-principles.md`
- `docs/delivery-tooling-boundaries.md`
- `docs/bootstrap-output-examples.md`

In simple terms:

- bootstrap principles define the posture
- delivery tooling boundaries define the stop lines
- bootstrap output examples define healthy output shapes
- this generator contract defines the smallest future-facing input/output agreement

---

## Good signs

A first Alpha 7 generator contract is healthy when:

- its inputs are smaller than its ambition
- its outputs are inspectable and traceable
- it remains subordinate to Alpha 6 meaning
- it does not assume one canonical environment
- it still works as a contract without any implementation yet

---

## Suggested next reading

- `docs/bootstrap-principles.md`
- `docs/delivery-tooling-boundaries.md`
- `docs/bootstrap-output-examples.md`
- `docs/delivery-output-contract.md`
- `docs/distribution-presets-adapters.md`
- `docs/preset-taxonomy.md`
- `docs/adapter-taxonomy.md`
- `docs/adoption-mode-guidance.md`
- `docs/delivery-mapping-examples.md`
