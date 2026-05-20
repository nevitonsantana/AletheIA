# Local Trust-Boundary Posture

## Goal

This document explains how a real project should make its trust-boundary posture explicit **without** turning that posture into framework truth.

In AletheIA, trust-boundary posture is usually a **project-extension concern**.

That means the framework should teach the pattern,
while the exact posture remains local.

---

## Why this matters

Constrained environments often need explicit answers to questions such as:

- what context may leave the trust boundary?
- which models are acceptable for which data classes?
- which tools are allowed in which lanes?
- which actions require human review regardless of model confidence?

If those answers remain implicit, then:

- reviews become inconsistent
- approvals become harder to explain
- hosted vs local model choices become fuzzy
- tool use may drift beyond what the team intended

---

## Core idea

A local trust-boundary posture should define four things clearly:

### 1. Data classes

Examples:

- public
- internal
- restricted
- customer-sensitive
- regulated

The exact names may differ by project.
What matters is that they are visible.

### 2. Hosting posture

Examples:

- externally hosted models acceptable only for public or low-risk internal material
- self-hosted or local runtime required for restricted material
- no external tool calls in higher-risk lanes

### 3. Tool posture

Examples:

- read tools broadly allowed
- write tools allowed only in bounded lanes
- outbound tools restricted by data class
- destructive tools always human-gated

### 4. Lane-specific review posture

Examples:

- normal bounded review
- explicit local review before write
- human approval required regardless of confidence
- no execution, suggestion-only lane

---

## Recommended mapping sequence

A practical local mapping sequence is:

1. define data classes
2. define hosting posture per class
3. define tool allow / deny posture
4. define human-gate rules
5. bind the result to lane types or work slices
6. record exceptions as durable local decisions

This keeps the trust posture reviewable instead of anecdotal.

---

## Relationship to local model strategy

A local trust-boundary posture should often be paired with:

- `starter-pack/templates/project-model-strategy-template.md`

Why:

- model strategy says what the local fleet can do
- trust-boundary posture says where each class of model is acceptable

Those two things are related, but not identical.

A project may have a powerful externally hosted model available and still forbid it for restricted work.
That is why availability and allowability should remain separate.

---

## Relationship to risk-to-gate mapping

A local trust-boundary posture should also be paired with:

- `starter-pack/guides/risk-to-gate-mapping.md`

Why:

- trust posture shapes whether execution is allowed
- risk-to-gate shapes how much review that execution requires

The same task may therefore be:

- allowed with a bounded hosted model for public material
- allowed only with a local model for restricted material
- or reduced to suggestion-only when neither posture is acceptable

---

## What belongs in local posture, not in the framework core

Usually local posture should contain things such as:

- data classes used by one organization
- allowed providers
- allowed hosting tiers
- tool restrictions tied to one environment
- lanes that require local approval regardless of confidence
- explicit no-external-context rules

Those may be rigorous.
They just should not silently become universal AletheIA truth.

---

## Good signs

A local trust-boundary posture is healthy when:

- reviewers can explain why a model or tool was acceptable in that lane
- hosted versus local choices are explicit
- exceptions are visible instead of improvised
- the framework remains provider-agnostic even though the project is not
- the local rules can change without forcing a core rewrite

---

## Suggested next reading

- `docs/enterprise-readiness-roadmap.md`
- `starter-pack/guides/enterprise-adoption-considerations.md`
- `starter-pack/templates/local-trust-boundary-template.md`
- `examples/project-extension/local-trust-boundary-mapping.md`
