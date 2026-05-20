# AletheIA 1.0 Readiness Gate

This document originally existed to answer one question clearly:

**what still needed to be true before AletheIA could stop presenting itself as an alpha and become 1.0?**

That gate is now satisfied.

> **AletheIA 1.0 is the point where Alpha 1–7 are done enough for the baseline, even though future tracks still remain open.**

That means:

- the Alpha completion-first queue is now considered sufficiently closed for the baseline
- 1.0 is **not** claiming enterprise-readiness, domain-pack completion, or active tooling implementation
- those later tracks remain valid as **post-1.0 roadmap work**

---

## Why 1.0 was gated by Alpha completion

The Alpha roadmap was the backbone of the framework.

AletheIA only moved out of alpha framing after the open Alpha work was hardened enough to remove avoidable ambiguity about:

- what is already stable enough to teach
- what remains future-facing but bounded
- what should move into 1.1, 1.2, 1.3, and later

So 1.0 should be read as:

- a **baseline release**
- not the end of framework evolution
- not a claim that every future track is complete

---

## Current Alpha status

### Done enough for the 1.0 baseline

- **Alpha 1** — core + governance baseline
- **Alpha 2** — real pilots + self-application
- **Alpha 3** — adoption + ecosystem baseline
- **Alpha 4** — handoff baseline hardened enough for restartable multi-boundary continuity
- **Alpha 5** — structured risk inference hardened enough as a selective experimental baseline
- **Alpha 6** — distribution baseline made tangible enough through presets, adapters, adoption modes, and a constrained mapping example
- **Alpha 7** — tooling layer bounded clearly enough as optional and future-facing

---

## What changed during the completion pass

### Alpha 4

Reached done-enough status through:

- clearer boundary language between minimum schema-backed continuity and richer operational handoff
- stronger multi-boundary continuity guidance
- a stronger example showing chains of compact restart packages

### Alpha 5

Reached done-enough status through:

- clearer selective trigger posture
- stronger connection to risk-to-gate mapping
- stronger connection to iterative maintenance and regression-aware continuation
- a near-real example showing when degradation signals justify inference

### Alpha 6

Reached done-enough status through:

- clearer preset / adapter / adoption-mode relationships
- a practical selection recipe
- a constrained adoption mapping example showing plugability through local extension without overclaiming readiness

### Alpha 7

Reached done-enough status through:

- consistent optional / future-facing wording
- clearer tooling stop lines
- clearer generator and output contracts as doc-level future contracts only
- an illustrative reviewable output example that does not require implementation

---

## 1.0 release checklist completed

The public 1.0 flip included:

- removing alpha framing from public-facing docs
- updating central docs to say **AletheIA 1.0** clearly and consistently
- adding `"version": "1.0.0"` to `package.json`
- creating `CHANGELOG.md`
- preparing the public versioned baseline for 1.x evolution

### Public surfaces updated at the 1.0 flip

- `README.md`
- `docs/00-overview.md`
- `docs/getting-started.md`
- `docs/launch-kit.md`
- `CONTRIBUTING.md`
- `package.json`
- `CHANGELOG.md`

---

## What remains post-1.0

These tracks remain real and already planned, but they were **not** required for the 1.0 baseline.

### 1.1 — enterprise-readiness / regulated adoption

Current track includes:

- enterprise-readiness / regulated adoption roadmap
- enterprise adoption guidance, now started through the starter-pack guide
- restricted enterprise extension example, now started through the project-extension example
- stronger local trust-boundary posture for constrained environments, started through docs/template/example material

Remaining work is evidence-oriented: stronger constrained-adoption proof before
claiming broader enterprise-readiness.

### 1.2 — pilot expansion / stronger real-world validation

Planned backlog includes:

- expansion beyond the strongest current pilot lane
- more real-world comparisons between extensions
- stronger conversion from pilot evidence into framework improvement

### 1.3 — distribution & delivery hardening

Planned backlog includes:

- broader distribution hardening beyond the 1.0 baseline
- stronger post-baseline preset and adapter material
- more delivery-layer clarity once the baseline is already stable

### 1.4+ — domain governance packs hardening

Planned backlog includes:

- stronger domain governance packs
- reusable trust-boundary and prompt-injection layers
- heavier Alpha 7 tooling only if later justified

---

## What 1.0 means and does not mean

### 1.0 means

- the baseline roadmap is coherent enough to teach, reuse, and evolve publicly
- Alpha 1–7 are done enough for the baseline
- the framework now moves into versioned **1.x evolution**

### 1.0 does not mean

- enterprise-ready by default
- fully tooled bootstrap and delivery automation
- every future domain pack already hardened
- the end of framework evolution

AletheIA 1.0 is the moment when the baseline stops being ambiguous.
It is not the moment when every next track is finished.
