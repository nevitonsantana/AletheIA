# AletheIA — Governance Examples

## Goal

This folder keeps small examples that make governance posture easier to inspect.

It currently serves two roles:

1. show how process facts can produce `allow`, `review`, `ask_human`, and `block`
2. show how risk posture changes the expected gate and validation depth

---

## Process-governance scenarios

- `allow-before-execute.json`
  - well-framed work with clear plan and scope
- `block-without-plan.json`
  - execution requested without a plan
- `review-after-scope-expansion.json`
  - execution drifted beyond the agreed scope
- `ask-human-critical-action.json`
  - critical action requested without explicit approval
- `block-validation-required.json`
  - closure blocked because required validation did not happen
- `block-source-of-truth-mismatch.json`
  - closure blocked because the source of truth was not updated

---

## Risk-to-gate posture scenarios

- `risk-low-light-validation.json`
  - low risk -> lightweight proof is enough
- `risk-medium-expanded-validation.json`
  - medium risk -> stronger review and broader proof
- `risk-high-human-gate.json`
  - high or critical risk -> explicit human gate and stronger evidence posture

---

## What these examples are trying to prove

That AletheIA can keep governance visible at two useful levels:

- **rule evaluation** over explicit facts
- **operational posture** connecting risk, validation depth, and gate intensity

The folder is intentionally small.
It is not trying to become a heavy policy simulator.
