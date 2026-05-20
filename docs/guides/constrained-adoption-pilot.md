# Constrained Adoption Pilot

## Goal

This document explains how to run a **bounded pilot** for AletheIA in a constrained or regulated environment.

The purpose is not broad rollout.
The purpose is to create a reviewable proof chain that answers:

- can the framework operate inside this trust posture?
- can the local extension carry the constraints cleanly?
- can the team explain why a lane was allowed, gated, or reduced to suggestion-only?

---

## Why bounded pilot evidence matters

In constrained environments, adoption claims should not begin from theory alone.

They should begin from a lane where the team can review:

- local trust-boundary posture
- local review requirements
- local tool restrictions
- minimum proof before closure
- what was reusable versus what stayed local

Without that bounded evidence, enterprise-readiness remains mostly rhetorical.

---

## Recommended pilot shape

A constrained pilot should begin with:

- one lane
- one dominant ownership boundary
- one local trust posture
- one explicit risk-to-gate mapping
- one bounded proof chain

A good first lane is usually:

- visible enough to teach something
- reversible enough to stay safe
- constrained enough to avoid broad rollout pressure
- already carrying meaningful review expectations

---

## What the pilot should make explicit

A healthy constrained pilot should make at least five things explicit.

### 1. Local trust posture

State clearly:

- what data class the lane handles
- what hosting posture is allowed
- what tool classes are allowed or blocked
- what actions require human gate regardless of confidence

### 2. Lane boundary

State clearly:

- what enters this lane now
- what remains outside
- what would count as accidental scope inflation

### 3. Risk-to-gate mapping

State clearly:

- what kind of review the lane requires
- whether the lane is suggestion-only, bounded execution, or human-gated execution
- what would escalate the lane further

### 4. Minimum proof

State clearly:

- what validation is sufficient before closure
- what review artifact is expected
- what would count as inadequate proof in this context

### 5. Conversion boundary

State clearly:

- what learning might generalize back into AletheIA
- what remains enterprise-local and should not enter the framework core

---

## Recommended output set

A bounded constrained pilot usually benefits from these artifacts:

- **task brief**
- **local trust-boundary posture**
- **risk-to-gate mapping**
- **durable local decision** when something meaningful was chosen
- **handoff** if another boundary must continue the work
- **pilot review** describing what was proved and what stayed local

That set is usually enough to create reviewability without inventing a new framework layer.

---

## What success looks like

A constrained pilot is going well when:

- the lane stays bounded
- the trust posture is explicit
- reviewers can explain why the lane was allowed or gated
- proof stays proportional
- reusable learning is extractable without carrying local residue into the framework core

---

## What failure looks like

The pilot is going poorly when:

- the team tries to roll out broadly before one lane is legible
- enterprise-local rules leak into framework truth
- trust posture remains implicit
- proof is weaker than the lane's review demands
- the pilot teaches nothing reusable and still expands anyway

---

## Suggested next reading

- `docs/enterprise-readiness-roadmap.md`
- `docs/local-trust-boundary-posture.md`
- `starter-pack/guides/enterprise-adoption-considerations.md`
- `examples/pilot-conversion/constrained-adoption-bounded-validation.md`
