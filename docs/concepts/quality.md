# AletheIA — Quality Baseline v1

## Objective

This document formalizes `AletheIA` entering quality Phase 3.

In plain language:

after vision, contracts, kernel, and governance, the framework must prove automatically that:

- its contracts remain intact;
- its core behaviors remain stable;
- its minimum flow still works end to end.

---

## Three minimum alpha proofs

## 1. Contract tests

These verify whether the framework's minimum artifacts still have the expected structure.

In the alpha, this mainly covers:

- core contracts;
- governance artifacts;
- required minimum fields.

## 2. Golden tests

These verify whether reference behaviors remain unchanged.

In the alpha, this covers:

- the `allow` path for `hello-world`;
- the `review` path for low confidence;
- the `ask_human` path for critical risk;
- the `block` path for governance failure.

## 3. Minimum E2E

This verifies whether the integrated flow still closes:

`kernel -> governance hook -> policy evaluation`

---

## What this phase aims to prove

- contracts did not break silently;
- reference scenarios remain stable;
- the framework remains coherent from start to finish.

---

## Important rule

The alpha does not need to start with a heavy test suite.

It only needs a small but reliable baseline that prevents invisible regression.

---

## Implementation in this iteration

### Main scripts

- `scripts/aletheia/test-contracts.ts`
- `scripts/aletheia/test-goldens.ts`
- `scripts/aletheia/test-e2e.ts`
- `scripts/aletheia/test-learnings.ts`

### Reference fixtures

- `docs/examples/aletheia/goldens/*.json`
- `docs/examples/aletheia/learning-from-failed-validation/*`

### Additional coverage in this iteration

- `learning-from-failed-validation` scenario;
- generation of a `Learning Record` from a `Policy Evaluation`;
- proof that validation failure can become useful learning instead of only a block.

---

## Recommended next step

After this expanded baseline:

1. consolidate the initial documentation for the public repository;
2. prepare the extraction blueprint for `AletheIA`;
3. separate what belongs in `framework core`, `starter-pack`, and `pilot materials`.
