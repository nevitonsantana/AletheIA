# Pilot: Crisis Monitor

## Goal

This document explains how AletheIA was tested in a real product flow inside the Crisis Monitor project and how that pilot matured over time.

It exists to answer four questions:

1. what problem the pilot was trying to solve
2. what was actually tested
3. what was learned from the product field
4. how those learnings returned to the framework

---

## Why Crisis Monitor matters

Crisis Monitor is not the framework itself.

It is the first real proving ground where the framework could be tested against:

- real user-facing flows
- real decision ambiguity
- real approval logic
- real audit surfaces
- real operational tradeoffs
- real signals of degradation after the first proof already worked

This matters because AletheIA should not mature only through internal framework theory.

It should mature through contact with actual product work.

---

## The problem observed in the product

Before the pilot, the Cris assistant could already:

- route work to a skill
- generate a proposal
- ask for approval
- write audit signals

But an important gap remained:

**execution was becoming more visible than decision.**

In practice, users could still face ambiguity around:

- why a given skill was chosen
- why a proposal required approval
- what exactly still depended on human decision
- whether chat and audit were telling the same story
- whether the quality of the assisted flow was getting better or quietly degrading over time

That made the product a strong first pilot for AletheIA, because the framework is specifically concerned with the space between:

`output -> decision -> governed action`

---

## Pilot hypothesis

If the product makes the decision path more explicit, then:

- the flow becomes easier to trust
- approval becomes easier to interpret
- audit becomes more useful
- degradations become easier to detect before they turn into silent fragility
- AletheIA gets a real product proof without needing a large new capability

---

## Scope of the pilot

The pilot stayed intentionally bounded.

It focused on:

- proposal explicability
- routing clarity
- approval rationale
- real-flow validation
- explainability consistency
- small operational observability around the pilot lane

It did **not** try to:

- redesign the Cris UI
- replace approval policy
- create a full new runtime
- generalize the whole framework through one product feature
- turn product observability into a mandatory framework requirement

---

## What was actually tested

### Slice 1 — Decision trace clarity

The first slice made the proposal flow more explicit about:

- chosen skill
- routing origin
- routing reason
- next decision needed
- why the proposal requires approval

This proved that a small explicability improvement could already produce meaningful value.

### Slice 2 — Functional authenticated smoke

The next slice raised the proof level.

It validated a real local flow:

1. login
2. real proposal creation by Cris
3. audit read
4. controlled reject
5. final audit read

This moved the pilot from:

- static or render-level proof

into:

- real product behavior under controlled conditions

### Slice 3 — Explainability contract hardening

The next move was not a bigger feature.
It was stronger consistency.

The product hardened the explainability contract so the lane could more reliably preserve alignment between:

- the suggested action
- the explicit explanation for that action
- the audit trail supporting it

That mattered because the pilot was no longer proving only that a decision could be shown.
It was proving that the decision story could stay coherent across artifacts.

### Slice 4 — Health metric and alert

Once the lane had a stronger contract, the pilot gained a small health reading around explainability coverage.

That made it possible to ask:

- is the lane still producing enough explainability?
- is the flow staying legible?
- is degradation happening even when the main path still technically works?

### Slice 5 — Investigable decision feed

The next slice made degradation more inspectable.

Instead of stopping at a summary metric, the pilot exposed a small decision feed that made specific explainability gaps reviewable.

This mattered because operational quality is easier to improve when the problem is not only visible as a number, but also as a short inspectable event.

### Slice 6 — Lane scorecard

The lane then gained a compact scorecard that summarized:

- current status
- dominant tension
- relevant alerts
- recent investigable items

This did not turn the framework into an observability system.
It simply showed that a real pilot can evolve from:

`decision clarity -> proof -> contract -> health -> investigation -> summary`

without becoming a giant platform effort.

---

## What the pilot proved

The pilot proved that AletheIA can add value in a real product without starting from a giant feature.

More specifically, it now shows that:

- explicability can be a valid first proof of the framework
- approval rationale adds real clarity
- audit and chat can be checked as parallel surfaces of the same governed flow
- a real flow can be smoke-tested under authentication
- a decision lane can be hardened through contract consistency before widening surface area
- small health metrics and alerts can expose silent degradation in a high-value lane
- a pilot can generate reusable framework learnings about continuity, detection, and conversion

---

## Product-specific vs reusable

### Product-specific

These belong to Crisis Monitor:

- the Cris assistant
- skill names and routing heuristics
- approval semantics for monitoring/editorial actions
- the specific audit UI and product language
- the exact observability names used for the pilot lane

### Reusable for AletheIA

These became reusable framework lessons:

- start pilots with low-risk explicability improvements
- validate decision and audit together
- prefer controlled reversible actions for early proof
- strengthen the contract before widening the feature
- treat degradation detection as part of the operating picture, not only as a final complaint
- convert real pilot evidence into small reusable framework artifacts instead of inflating the core

---

## How the pilot fed the framework

This pilot directly influenced the public AletheIA repo by reinforcing:

- governance as something visible, not hidden
- token and scope discipline as operating concerns
- durable decision reasoning
- the need to distinguish behavioral enforcement from technical enforcement
- the self-application loop as a real next step
- iterative maintenance as a governance problem, not only a patch problem
- pilot conversion as a repeatable path from product evidence to framework maturity

In other words:

this pilot did not stay trapped in product history.
It became input for framework evolution.

---

## Current reading of the pilot

At this stage, the Crisis Monitor pilot should be read as:

- a **real test field**
- a **source of disciplined learnings**
- a **bridge between Alpha 1 and Alpha 2**
- an example of how product evidence can harden operational guidance without creating new core contracts

It is still not the final word on AletheIA adoption.

But it now proves more than an initial product slice.
It shows that the framework can be tested in product reality, observed over repeated hardening steps, and then converted into reusable framework maturity.

---

## What Alpha 2 should do with this pilot

The useful moves now are:

1. keep converting new product learnings into explicit framework artifacts
2. use the pilot as evidence that self-application is not only rhetorical
3. keep the reusable lesson separate from the product residue
4. preserve the pilot as one of the main anchors for the Alpha 2 story

---

## Relationship to self-application

The Crisis Monitor pilot and the self-application loop are complementary:

- the pilot provides real field evidence
- self-application provides the conversion logic back into the framework

Together, they form the practical center of Alpha 2:

`pilot -> learning -> framework improvement`
