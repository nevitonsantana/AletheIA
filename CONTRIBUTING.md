# Contributing to AletheIA

Thank you for contributing to AletheIA.

AletheIA is in a **late Alpha completion cycle before 1.0**, so the most valuable contributions right now are the ones that improve clarity, reviewability, reuse, and practical adoption **without opening new strategic tracks before the open Alpha work is sufficiently closed**.

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
- coherence of the open Alpha completion work

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
- Alpha 4 handoff coherence
- Alpha 5 inference hardening without over-expansion
- Alpha 6 tangibility without premature enterprise claims
- Alpha 7 boundary clarity without tooling inflation

---

## Before opening a contribution

Please make sure that:

- the change has a clear scope
- the contribution is understandable without hidden context
- examples remain small and readable
- tests still pass when relevant
- public docs stay understandable for non-specialists
- the change does not silently turn project-specific residue into framework core
- the change does not pull deferred post-1.0 tracks into the current priority lane unless it directly helps Alpha completion

---

## How to think about scope

AletheIA works best when contributions are small, explicit, and reviewable.

Before opening a change, ask:

- is this improving the reusable framework core?
- is this a starter-pack improvement?
- is this a pilot learning that really generalizes?
- is this helping close an Alpha that is still open before 1.0?
- is this still specific to one project and therefore better left out of the public core?

If the answer is mostly project-specific, prefer keeping it local or documenting it as a project extension pattern instead of promoting it directly into the framework core.

If the change mostly belongs to a deferred post-1.0 track, it is probably premature unless it also makes the current Alpha completion pass clearer or safer.

---

## What belongs in framework core

Framework-core contributions are a good fit when they are:

- reusable across more than one project shape
- understandable without one product's vocabulary
- about operating discipline, contracts, governance, validation, or learnings
- helpful as a teaching artifact for adopters
- aligned with the current completion-first roadmap

Examples:

- governance clarifications
- starter-pack patterns that generalize well
- roadmap-aligned adoption docs
- validation and test improvements for the framework itself
- Alpha-completion hardening that improves coherence without inflating the core

---

## What should usually stay out of the core

Avoid promoting these directly into the public core unless they clearly generalize:

- provider-specific assumptions
- product-specific assistant behavior
- team-specific rituals
- one-repo ownership maps
- one-project naming conventions
- hidden abstractions that reduce inspectability
- enterprise-specific rules that belong in a future local extension or post-1.0 adoption layer

These may still be valuable as:

- project extensions
- pilot write-ups
- future examples
- deferred post-1.0 tracks

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
- what should a future contributor learn from this change?
- does this help the current Alpha completion path, or is it better deferred?

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
- opening post-1.0 roadmap scope before the current Alpha work is sufficiently closed

---

## Related reading

Before contributing, it may help to read:

- `docs/getting-started.md`
- `docs/roadmap-alpha.md`
- `docs/release-1.0-readiness.md`
- `docs/project-extension-pattern.md`
- `docs/pilot-conversion.md`
- `starter-pack/README.md`
