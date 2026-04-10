# Reviewable Generated Bundle

This example shows the kind of Alpha 7 output posture the framework is describing.

It is **illustrative only**.
It is **not** the output of a real generator.
It is **not** required for 1.0.

The goal is simply to make the boundary clearer:

if Alpha 7 ever emits a bundle, the bundle should still be inspectable, traceable, and obviously subordinate to the canonical docs.

---

## Output identity

- **output_name**: `existing-project-standard-bundle`
- **output_purpose**: `Provide a compact onboarding package for standard-mode adoption in an existing project`
- **delivery_surface**: `repo-native plus instruction companion`

---

## Source choices

- **preset**: `Existing Project Adoption`
- **adoption_mode**: `Standard`
- **delivery_surface**: `repo-native + agent instruction`

These choices should remain visible in the output so the package never looks like an unexplained black box.

---

## Canonical references

This sample bundle would still point back to:

- `docs/distribution-presets-adapters.md`
- `docs/adoption-mode-guidance.md`
- `docs/project-extension-pattern.md`
- `docs/agent-handoffs.md`

These remain authoritative.
The generated bundle is only a packaged derivative.

---

## Generated contents

A small package like this might contain:

- a short reading order
- a starter-pack subset for bounded work
- a note about when to use operational handoffs
- a reminder that project-local restrictions belong in the extension layer

That is enough to be useful without pretending to replace the canonical repo.

---

## Boundary notes

A healthy generated bundle should say what it does **not** do.

Example boundary notes:

- does not replace the canonical repo-native docs
- does not infer project-local rules automatically
- does not activate future domain governance packs by default
- does not imply that Alpha 7 tooling is required for understanding AletheIA

---

## Review posture

A healthy output should make review posture explicit.

For this sample bundle:

- **review_status**: `illustrative only`
- **review_notes**: `This package shape is an example of a safe Alpha 7 output posture. It should not be treated as an active generated artifact or as a requirement for the 1.0 baseline.`

---

## Why this example matters

This example mainly clarifies four things:

1. Alpha 7 output should still be readable without a generator
2. source choices should remain visible
3. canonical docs should remain authoritative
4. the 1.0 baseline does not depend on active tooling implementation
