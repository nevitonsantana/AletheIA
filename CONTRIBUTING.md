# Contributing to AletheIA

Thank you for contributing to AletheIA.

AletheIA is still in public alpha, so the most valuable contributions are the ones that improve clarity, reviewability, reuse, and practical adoption without making the framework heavier than it needs to be.

---

## What to prioritize

Please prioritize contributions that improve:

- clarity
- determinism
- explainability
- portability
- governance
- quality baseline
- starter-pack reuse
- adoption without premature complexity

---

## Good contribution areas

Strong contribution areas right now include:

- documentation clarity
- examples
- schemas
- deterministic tests
- starter-pack guides and templates
- roadmap alignment
- adoption guidance
- pilot-to-framework learnings that clearly generalize

---

## Before opening a contribution

Please make sure that:

- the change has a clear scope
- the contribution is understandable without hidden context
- examples remain small and readable
- tests still pass when relevant
- public docs stay understandable for non-specialists
- the change does not silently turn project-specific residue into framework core

---

## How to think about scope

AletheIA works best when contributions are small, explicit, and reviewable.

Before opening a change, ask:

- is this improving the reusable framework core?
- is this a starter-pack improvement?
- is this a pilot learning that really generalizes?
- is this still specific to one project and therefore better left out of the public core?

If the answer is mostly project-specific, prefer keeping it local or documenting it as a project extension pattern instead of promoting it directly into the framework core.

---

## What belongs in framework core

Framework-core contributions are a good fit when they are:

- reusable across more than one project shape
- understandable without one product's vocabulary
- about operating discipline, contracts, governance, validation, or learnings
- helpful as a teaching artifact for adopters

Examples:

- governance clarifications
- starter-pack patterns that generalize well
- roadmap-aligned adoption docs
- validation/test improvements for the framework itself

---

## What should usually stay out of the core

Avoid promoting these directly into the public core unless they clearly generalize:

- provider-specific assumptions
- product-specific assistant behavior
- team-specific rituals
- one-repo ownership maps
- one-project naming conventions
- hidden abstractions that reduce inspectability

These may still be valuable as:

- project extensions
- pilot write-ups
- future examples

---

## Good first contribution patterns

If you want a safe place to start, consider contributions like:

### 1. Documentation improvements

Clarify an idea, improve a reading path, or reduce ambiguity in a public doc.

### 2. Example hardening

Make an example smaller, clearer, or better aligned with the current contracts.

### 3. Starter-pack improvements

Improve a guide, template, or checklist without overfitting it to one project.

### 4. Validation improvements

Add or refine checks that keep the framework honest without making it heavy.

---

## Review expectations

A good contribution should make it easy for a reviewer to answer:

- what changed?
- why does it belong in the framework?
- what stays out of scope?
- how was it validated?
- what future contributor should learn from this change?

---

## Validation baseline

Before opening a PR, run the smallest relevant validation for your change.

For most documentation and roadmap changes, this should at least include:

- `bash scripts/check-governance.sh`

For code or test changes, run the relevant test subset as well.

---

## Contribution style

Prefer:

- small branches
- clear PR narratives
- bounded changes
- explicit terminology
- minimal ambiguity

Avoid:

- broad unscoped rewrites
- hidden coupling
- provider lock-in in the core
- making the framework sound stronger than it currently is

---

## Related reading

Before contributing, it may help to read:

- `docs/getting-started.md`
- `docs/roadmap-alpha.md`
- `docs/project-extension-pattern.md`
- `docs/pilot-conversion.md`
- `starter-pack/README.md`
