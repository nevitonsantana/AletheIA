# AletheIA Pilot-to-Framework Conversion

## Goal

This document explains how a real pilot learning should become a concrete improvement in the framework.

In simple terms:

the pilot should not end as an anecdote.
It should create a path from field evidence to reusable framework change.

---

## Why this matters

Real pilots generate useful signals, but those signals can be lost in three ways:

- they stay trapped in product-specific language
- they stay trapped in retrospective notes
- they never become an explicit framework artifact

Alpha 2 should prove that AletheIA can do better than that.

It should show a repeatable path from:

`pilot observation -> learning -> framework improvement`

---

## The conversion question

When a pilot teaches something useful, the key question is:

**what kind of framework change does this learning justify?**

Not every pilot learning should become the same kind of change.

Sometimes it should become:

- a doc
- a starter-pack guide
- a template
- a governance clarification
- a policy pack refinement
- a test or executable baseline improvement
- a new example that makes the conversion path inspectable

The job of conversion is to choose the smallest reusable form that preserves the learning.

---

## The minimum conversion loop

### 1. Observe a real friction or useful pattern

Something happened in the pilot that matters.

Examples:

- users did not understand why approval was needed
- audit and chat were telling different stories
- a pilot slice proved a smaller-first strategy works better
- a lane started to degrade quietly even though the main flow still worked

### 2. Write the learning explicitly

Do not jump straight from observation to repo change.

First capture:

- what happened
- why it mattered
- what seems reusable

### 3. Classify the learning

Ask which kind of reusable change it really is.

### 4. Apply the smallest justified framework change

Prefer:

- the smallest artifact
- the clearest scope
- the least speculative generalization

### 5. Validate and merge

The change should be visible, reviewable, and justified.

---

## Conversion targets

### 1. Documentation artifact

Use when the learning clarifies:

- a principle
- a boundary
- a pattern
- a distinction

Examples:

- token discipline
- enforcement boundaries
- durable decision discipline
- iterative maintenance framing

### 2. Starter-pack artifact

Use when the learning should help future adopters operate better.

Examples:

- a guide
- a checklist
- a template
- a repeatable sequence for proof, review, and escalation

### 3. Governance refinement

Use when the learning changes:

- policy interpretation
- governance wording
- expectations about review/block/escalation

### 4. Technical baseline refinement

Use when the learning justifies:

- a check
- a warning
- a test
- a small executable baseline

### 5. Pilot write-up refinement

Use when the learning mostly improves:

- how the field result is explained
- what the pilot proved
- what remains product-specific vs reusable

---

## What not to do

### Do not overgeneralize from one product detail

A product-specific behavior is not automatically a framework principle.

### Do not leave the learning untyped

If the learning is useful, decide what kind of artifact it should become.

### Do not jump to heavy mechanism first

A lightweight doc or template may be the right first conversion.

### Do not mistake observability in one pilot for a universal framework requirement

A useful lane metric or scorecard in one product can justify a framework learning without turning observability into mandatory framework infrastructure.

---

## Good Alpha 2 signs

Alpha 2 is going well when:

- a real pilot learning can be traced to a merged framework change
- the framework change is smaller than the pilot itself
- the reusable part is separated from the product residue
- the repo shows a growing chain of `pilot -> learning -> improvement`
- the latest field evidence makes older framework guidance more concrete rather than more abstract

---

## Crisis Monitor example

The Crisis Monitor pilot now provides a stronger conversion example than an early explicability slice alone.

The recent chain was:

1. real authenticated smoke proved the lane under real conditions
2. explainability contract hardening made the lane more coherent
3. a health metric and alert exposed explainability degradation risk
4. an investigable decision feed made the gap reviewable by occurrence
5. a lane scorecard summarized the operational picture
6. the framework absorbed the reusable part as stronger Alpha 2 and iterative-maintenance guidance

What remained product-specific:

- Cris naming
- exact event names
- the local observability route shape

What became reusable:

- prove the lane before broadening claims
- harden the contract before widening the surface
- treat silent degradation as something worth governing
- convert repeated operational evidence into small framework artifacts rather than core inflation

---

## Relationship to self-application

Self-application explains how the framework should govern its own evolution.

Pilot conversion explains how field learnings should enter that evolution.

Together, they make the Alpha 2 loop concrete:

`pilot -> learning -> conversion -> framework improvement`

---

## What Alpha 2 should prove with this

By making pilot conversion explicit, AletheIA should show that:

- real pilots do not remain isolated stories
- framework maturity can be fed by disciplined field evidence
- repo evolution can stay small, explicit, and traceable
- new guidance can harden because the field taught something concrete, not because the framework wanted to grow

---

## Example

See:

- `examples/pilot-conversion/crisis-monitor-real-world-validation.md`
