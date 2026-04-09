# AletheIA 1.0 Readiness Gate

This document exists to answer one question clearly:

**what still needs to be true before AletheIA can stop presenting itself as an alpha and become 1.0?**

The current rule is explicit:

> **AletheIA reaches 1.0 when Alpha 1–7 are done enough for the baseline, not when every future track is finished.**

That means:

- 1.0 is blocked by the **open Alpha completion work**
- 1.0 is **not** blocked by enterprise-readiness, domain packs, or heavier tooling
- those later tracks remain valid, but they move into **post-1.0 roadmap work**

---

## Why 1.0 is gated by Alpha completion

The Alpha roadmap is the backbone of the framework.

If AletheIA declared 1.0 before the open Alphas are sufficiently hardened, the framework would create avoidable ambiguity about:

- what is already stable enough to teach
- what still needs operational hardening
- what is intentionally future-facing

So the 1.0 gate exists to make three things explicit:

1. **Alpha 1–3 are already complete enough** for the current cycle
2. **Alpha 4–7 still need specific completion work**
3. **post-1.0 tracks stay deferred until that completion work is done**

---

## Current Alpha status

### Complete enough for the current cycle

- **Alpha 1** — core + governance baseline
- **Alpha 2** — real pilots + self-application
- **Alpha 3** — adoption + ecosystem baseline

### Still open for the 1.0 gate

- **Alpha 4** — baseline established, still open
- **Alpha 5** — baseline established, still open
- **Alpha 6** — baseline established, still open
- **Alpha 7** — future-facing but bounded, still not 1.0-ready

See also:

- `docs/roadmap-alpha.md`

---

## Done-enough criteria by Alpha

### Alpha 1 — done enough

Already sufficient for the current cycle.
No new blocker is defined here beyond keeping the baseline coherent.

### Alpha 2 — done enough

Already sufficient for the current cycle.
No new blocker is defined here beyond keeping the pilot-to-framework bridge coherent.

### Alpha 3 — done enough

Already sufficient for the current cycle.
No new blocker is defined here beyond keeping adoption guidance and starter-pack clarity coherent.

### Alpha 4 — done enough when

- handoff docs, template, and examples are coherent without a meaningful gap between concept and use
- the boundary between schema coverage and richer operational handoff practice is clear
- at least one strong multi-boundary continuity example exists if the current examples still feel too light

### Alpha 5 — done enough when

- it remains selective rather than universal
- it has more tangible real or near-real evidence
- it is better coupled to risk-to-gate and iterative maintenance
- it is clearer when structured inference adds value and when it only adds overhead

### Alpha 6 — done enough when

- presets, adapters, and adoption modes feel more tangible
- at least one more concrete extension or distribution example exists
- plugability is better explained without drifting into enterprise-readiness claims

### Alpha 7 — done enough for 1.0 when

- it remains explicitly optional and future-facing
- generator, output, and tooling-boundary docs are coherent with each other
- the roadmap no longer implies that 1.0 depends on real tooling implementation

Important:

**Alpha 7 does not need active tooling implementation before 1.0.**
It only needs a clear, bounded, non-misleading definition.

---

## 1.0 public-release checklist

The 1.0 flip should happen only after the open Alpha criteria above are satisfied.

At that moment, the public release checklist is:

- remove public-facing language that still frames the repo as an alpha or draft
- update central docs to say **AletheIA 1.0** clearly and consistently
- add `"version": "1.0.0"` to `package.json`
- create `CHANGELOG.md`
- prepare and publish the public tag/release `v1.0.0`

### Public surfaces to update at the 1.0 flip

- `README.md`
- `docs/00-overview.md`
- `docs/getting-started.md`
- `docs/launch-kit.md`
- `CONTRIBUTING.md`
- `package.json`
- `CHANGELOG.md`

---

## What remains post-1.0

These tracks remain real and already planned, but they are **not** part of the 1.0 gate.

### 1.1 — enterprise-readiness / regulated adoption

Preserved backlog includes:

- enterprise-readiness / regulated adoption roadmap
- enterprise adoption guidance
- restricted enterprise extension example
- stronger local trust-boundary posture for constrained environments

### 1.2 — pilot expansion / stronger real-world validation

Preserved backlog includes:

- expansion beyond the strongest current pilot lane
- more real-world comparisons between extensions
- stronger conversion from pilot evidence into framework improvement

### 1.3 — distribution & delivery hardening

Preserved backlog includes:

- broader distribution hardening beyond “done enough”
- stronger post-baseline preset and adapter material
- more delivery-layer clarity once the baseline is already stable

### 1.4+ — domain governance packs hardening

Preserved backlog includes:

- stronger domain governance packs
- reusable trust-boundary and prompt-injection layers
- heavier Alpha 7 tooling only if later justified

---

## Completion-first queue before 1.0

The current pre-1.0 queue is:

1. **Alpha 4 completion pass**
2. **Alpha 5 hardening pass**
3. **Alpha 6 tangibility pass**
4. **Alpha 7 boundary clarification pass**

Until this queue is sufficiently closed, these post-1.0 tracks remain deferred by design.

---

## What 1.0 will and will not mean

### 1.0 will mean

- the baseline roadmap is coherent enough to teach, reuse, and evolve publicly
- Alpha 1–7 are done enough for the baseline
- the framework can move from alpha framing into versioned 1.x evolution

### 1.0 will not mean

- enterprise-ready by default
- fully tooled bootstrap and delivery automation
- every future domain pack already hardened
- the end of framework evolution

1.0 is the moment when the baseline stops being ambiguous, not the moment when every next track is finished.
