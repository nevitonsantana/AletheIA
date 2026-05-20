# AletheIA Durable Decision Discipline

## Goal

This document explains how AletheIA treats important decisions as durable artifacts instead of informal thread memory.

In simple terms:

if a decision changes how work should be executed, interpreted, validated, or governed, it should be recorded in a form that survives the session.

---

## Why this matters

AI-assisted work creates a new kind of decision risk:

- important decisions get buried in threads
- the implementation survives, but the reasoning disappears
- future sessions re-open solved questions
- teams cannot tell whether a tradeoff was accidental or intentional

AletheIA wants decisions to stay:

- reviewable
- reusable
- auditable
- small enough to maintain

---

## What counts as a durable decision

Not every thought needs an ADR.

Durable decision discipline should be used when the choice:

- changes framework behavior
- changes governance expectations
- changes a contract or interpretation rule
- creates a reusable convention
- introduces a meaningful tradeoff
- would be expensive to rediscover later

Good examples:

- choosing how policy outcomes are prioritized
- introducing a token budget model
- defining a stable hook lifecycle
- deciding where pilot-specific logic stops and framework logic begins

Bad examples:

- tiny local wording edits
- one-off implementation details with no future reuse
- temporary notes that do not affect future work

---

## The minimum durable decision record

A durable decision in AletheIA should answer:

1. **What was decided**
2. **Why it was decided**
3. **What alternatives mattered**
4. **What changed because of it**
5. **What remains intentionally unresolved**

That is enough to preserve reasoning without turning the repo into a bureaucracy machine.

---

## Relationship to other AletheIA artifacts

Durable decisions are not a substitute for:

- `Task Brief`
- `Decision Record`
- `Policy Evaluation`
- `Handoff Record`

They serve a different purpose.

### Short-lived execution artifacts

These explain a specific task or run.

### Durable decision artifacts

These explain a rule, tradeoff, or boundary that should influence future work.

---

## Recommended forms

For Alpha 1, AletheIA only needs a light baseline.

Recommended forms:

- architecture note
- ADR-style markdown
- decision appendix inside a roadmap or governance doc

Current example:

- `docs/durable-decision-finalization-context-prompt.md`

The important part is not the label.
The important part is that future contributors can find and understand the reasoning.

---

## Good decision hygiene

### 1. Record the decision close to the framework

Do not leave an important framework decision only in a PR description or issue comment.

### 2. Prefer one decision per artifact

This keeps the reasoning findable and easier to update later.

### 3. Record tradeoffs, not only conclusions

“We chose X” is weaker than “We chose X because Y and explicitly did not choose Z.”

### 4. Preserve boundaries

A durable decision should make framework boundaries clearer, not blur them.

### 5. Keep the record short

A short usable record is better than a perfect one nobody maintains.

---

## Alpha 1 baseline

Alpha 1 does not need a large ADR system.

It only needs to prove that:

- important framework decisions are not left implicit
- rationale can be recovered later
- roadmap changes and governance changes can be anchored in durable notes

For this reason, the current baseline can be lightweight:

- a small durable decision guide
- a starter-pack decision template
- explicit references from roadmap/governance materials

---

## When to create a durable decision artifact

Create one when at least one of these is true:

- future work will depend on this choice
- another contributor could reasonably make the opposite choice later
- the choice constrains governance, contracts, or adoption
- the choice separates pilot residue from reusable framework core

---

## What Alpha 1 should prove with this discipline

By adding durable decision discipline, AletheIA should show that:

- framework evolution is not only commit history
- key tradeoffs can be understood without replaying old conversations
- the project can stay small while still preserving architectural memory

---

## Future evolution

Later versions may add:

- a formal ADR index
- decision lifecycle states
- links between policy packs and decision notes
- decision-aware governance checks

Alpha 1 does not need that yet.

It only needs to prove that durable reasoning belongs inside the framework.
