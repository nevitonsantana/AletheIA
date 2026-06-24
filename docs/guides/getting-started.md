# Getting Started with AletheIA

## What you will do

Run one low-risk, documentation-only Work Slice from intent to evidence and safe closure. This is the shortest first-use path; it does not require reading the whole framework.

## Before starting

You need:

- a local copy of this repository;
- Node.js and `pnpm` available;
- permission to read files and run repository checks;
- one small documentation inconsistency to inspect.

Do not use the first journey for authentication, authorization, production data, destructive commands, dependency upgrades or releases.

## Choose explanation depth

Ask the user to confirm one mode. Do not infer expertise automatically.

| Mode | How AletheIA explains |
|---|---|
| `plain` | Simple impact-first language; technical terms are explained before use. |
| `guided` | Explains the term, why it matters and where it appears. |
| `professional` | Uses technical language with short contextual anchors. |
| `expert` | Uses concise technical language, explaining only project-specific ambiguity. |

All modes preserve the same risk, evidence and escalation boundaries. A simpler explanation never means a weaker gate.

## The first journey

### 1. Pick a low-risk inconsistency

Example: a guide points to an old file path.

State the desired outcome without prescribing implementation:

> A first-time reader can follow the documented path without encountering a missing file.

### 2. Create one bounded Work Slice

Use [`core-operating-path.md`](core-operating-path.md) and the [Work Slice template](../../starter-pack/templates/work-slice-template.md).

Keep in scope only:

- confirming the broken reference;
- correcting the smallest coherent documentation surface;
- validating the corrected path.

### 3. Review before changing anything

Confirm:

- intended outcome;
- in-scope files;
- why the change is low risk;
- expected evidence;
- stop conditions.

Stop if the correction reveals a governance, architecture, security or public-behavior decision.

### 4. Make the smallest change

Change only the source-backed inconsistency. Do not rewrite adjacent guidance merely because it could be improved.

### 5. Validate

Run:

```bash
pnpm test
pnpm typecheck
pnpm check:governance
git diff --check
```

Expected result:

- commands exit successfully;
- the referenced file exists;
- the diff contains only the intended slice;
- absent evidence remains `unknown` or `unavailable`.

### 6. Explain and close

Use the [Explainable Change Brief](../../starter-pack/templates/explainable-change-brief-template.md) and the [Slice Finalization Review](../../starter-pack/templates/slice-finalization-review-template.md).

The user should be able to answer:

- What changed?
- Why does it matter?
- What evidence supports it?
- What risk remains?
- What is safe to do next?

## What AletheIA will and will not do

AletheIA may frame the slice, surface risk, suggest evidence and explain the result. It does not silently choose the user's intent, approve high-risk technical decisions, or treat a passing test as proof of understanding.

## Troubleshooting

### A command fails

Record the exact failure. Do not claim closure. Determine whether it comes from the slice or the environment before changing scope.

### The documentation conflicts

Use `document_before_closing` or `block_closure` from the [cognitive closure extension](../contracts/cognitive-documentation-closure-extension.md). Do not choose one source by confidence alone.

### You do not understand the consequence

Switch to `guided` or `plain`, request an Explainable Change Brief and pause. Understanding may trigger review, but it does not replace technical proof.

### The task becomes technical or high risk

Stop the first-use journey and require the appropriate software engineering, security or governance reviewer. Do not continue under the documentation-only risk posture.

## Where to go next

- [Core Operating Path](core-operating-path.md) — the complete minimum loop.
- [Apply to an existing project](apply-to-existing-project.md) — bounded adoption without rebuild.
- [Slice Finalization and Restart](slice-finalization-and-restart.md) — close and resume safely.
- [Canonical vocabulary](../concepts/canonical-vocabulary.md) — project-specific terms.
- [Roadmap](../roadmaps/roadmap-alpha.md) and [token policy](../reference/token-policy.md) — maturity and resource boundaries.
