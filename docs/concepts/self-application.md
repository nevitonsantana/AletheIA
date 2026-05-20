# AletheIA Self-Application Loop

## Goal

This document explains how AletheIA should be used to improve AletheIA itself.

In simple terms:

the framework should not evolve only through ad-hoc repo edits.
It should increasingly apply its own operating logic to its own roadmap, changes, and learnings.

---

## Why this matters

Alpha 2 is not only about having real pilots.

It is also about proving that:

- the framework can guide its own evolution
- repository changes can follow the same discipline it recommends to others
- learnings from pilots can be converted into framework improvements without becoming anecdotal drift

Without a self-application loop, AletheIA risks becoming:

- a framework that describes discipline but does not use it
- a public repo that grows by intuition instead of explicit reasoning
- a pilot-driven project without a repeatable conversion path from learning to framework change

---

## Core idea

The self-application loop is:

`framework change -> task framing -> governance -> validation -> learning -> framework improvement`

This does not mean every small edit needs full ceremony.

It means meaningful framework evolution should increasingly leave behind:

- a reason
- a scope
- a validation
- a learning

---

## What should be self-applied first

Alpha 2 should start small.

The first things to self-apply are:

1. roadmap-driven framework changes
2. governance baseline improvements
3. pilot-to-framework conversions
4. changes that affect public positioning or adoption guidance

This is enough to prove the loop without turning every typo into process theater.

---

## Minimum self-application discipline

For a meaningful framework change, try to preserve:

### 1. A clear work item

What exactly is changing?

### 2. A bounded scope

What is inside this increment, and what is not?

### 3. A validation path

How do we know the change holds?

Examples:

- governance baseline passes
- tests still pass
- docs align with implementation
- a pilot-derived claim can be connected back to real evidence

### 4. A durable learning

What should future framework work remember from this change?

---

## Relationship to pilots

Pilots are not only examples.

In Alpha 2, pilots should become input for framework evolution.

That means:

1. a pilot exposes a friction, gap, or useful pattern
2. the learning is written down
3. the repo evolves in a small explicit increment
4. the framework becomes slightly more reusable because of that pilot

This is the practical bridge between:

`real field use` and `public framework maturity`

---

## What recent real-world validation added

The Crisis Monitor pilot made the self-application loop more concrete because it did not stop at an initial product proof.

The recent sequence moved through:

1. authenticated smoke of a real flow
2. explainability contract hardening
3. health metric and alert around the lane
4. investigable decision feed
5. compact lane scorecard
6. conversion of those learnings into new framework guidance

That matters because it shows self-application as a chain of small reviewable moves, not as a vague promise to “learn from pilots later.”

---

## What self-application is not

Self-application is not:

- forcing every tiny change through heavy artifacts
- pretending the framework is already fully automated
- blocking momentum with unnecessary ceremony
- copying product observability mechanics directly into the framework core

It is a discipline of proportion.

The process should be heavy enough to preserve reasoning, but light enough to keep the project moving.

---

## Good Alpha 2 signs

Alpha 2 is going well when:

- a framework change can be traced back to a real pilot or explicit roadmap need
- the repo shows why something changed, not only that it changed
- the public narrative and the internal reasoning stay aligned
- the framework starts to improve itself with its own language
- real-world validation creates smaller reusable artifacts instead of larger speculative machinery

---

## First practical pattern

For now, the simplest useful self-application pattern is:

1. choose one small roadmap or pilot-driven improvement
2. open a clean branch
3. implement it with bounded scope
4. run the minimum baseline validation
5. record the learning
6. merge and keep `main` coherent

This is already enough to prove self-application in practice.

---

## What Alpha 2 should prove with this

By adding the self-application loop, AletheIA should show that:

- the framework can shape its own evolution
- pilot learnings can become reusable artifacts
- repo evolution can be governed without becoming rigid
- real pilot evidence can harden the framework without turning product details into framework law

---

## Relationship to pilot conversion

Self-application explains how the framework should govern its own evolution.

Pilot conversion explains how field learnings should enter that evolution.

Together, they make the Alpha 2 loop concrete:

`pilot -> learning -> conversion -> framework improvement`

See also:

- `docs/pilot-crisis-monitor.md`
- `docs/pilot-conversion.md`
- `docs/project-extension-pattern.md`
