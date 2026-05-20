# Canonical Vocabulary

## Goal

Define the stable public vocabulary of AletheIA so later documentation, adapters, examples, and local project extensions do not reintroduce tool-shaped ambiguity.

This document exists to keep the framework readable across environments without letting local workflow conventions redefine framework truth.

---

## Why this document exists

As AletheIA grows, the same ideas can appear through:

- repo-native docs
- agent instruction files
- handoff artifacts
- runtime-facing records
- local project protocols

Without a canonical vocabulary, those surfaces can drift and quietly change meaning.

This document defines the stable terms that should remain recognizable across all of them.

---

## 1. Work Item

### Definition

A **Work Item** is the official governed unit of work in AletheIA.

### What it is

A Work Item is the unit used to answer questions such as:

- what is the work?
- what outcome is expected?
- what governs this work?
- what local system currently tracks its state?

A Work Item is intentionally tracker-agnostic.

It may be represented locally as:

- a GitHub issue
- a Jira ticket
- a Notion task
- an internal request
- a manual review artifact

Those are local implementations of the same concept.

### What it is not

A Work Item is not:

- a specific tracker object by definition
- a transcript
- a single prompt
- a single execution attempt
- a mandatory schema tied to one tool

### Minimum conceptual interface

A Work Item should make these elements explicit:

- identity
- objective
- expected outcome
- governing context or source-of-truth reference
- local status in the host system

---

## 2. Work Slice

### Definition

A **Work Slice** is a bounded operational composition that makes one portion of a Work Item explicit enough to frame, execute, validate, hand off, or learn from.

### Relationship to Work Item

A Work Item is the official governed unit.

A Work Slice is the bounded operational unit used to make progress inside or around that Work Item.

In practice:

- one Work Item may contain one slice
- one Work Item may evolve through multiple slices
- one slice should remain bounded enough to review, resume, or validate without replaying the whole history

### Relationship to existing contracts

A Work Slice does not replace AletheIA's existing contracts.

It is built from them.

A slice may compose:

- task brief
- decision record
- execution record
- handoff record when needed
- learning record when warranted

### What it is not

A Work Slice is not:

- a new core schema by default
- a replacement for the Work Item
- a universal state machine
- a claim that every task needs the same amount of ceremony

### Minimum conceptual interface

A Work Slice should make these elements explicit:

- slice identity
- bounded goal and scope
- current operational state
- validation expectation
- handoff expectation
- artifact map when applicable

---

## 3. Restart Package

### Definition

A **Restart Package** is the continuity artifact that allows work to resume across a real boundary without relying on hidden thread memory or transcript replay.

### Why it exists

AletheIA should not depend on long conversational history to preserve continuity.

When work crosses a real operational boundary, the receiving side should be able to restart from a compact, explicit package.

### What it should preserve

A Restart Package should preserve:

- slice or work reference
- current status
- active entrypoint
- last validated state
- next immediate action
- relevant constraints
- governing context references

### What it is not

A Restart Package is not:

- a full transcript export
- a mandatory runtime feature
- a replacement for source-of-truth documents

It is a continuity bridge.

### Relationship to handoff

A handoff may include a Restart Package.

A Restart Package becomes especially important when the next step cannot safely depend on implied context.

---

## 4. Execution Surface

### Definition

An **Execution Surface** is the surface where AletheIA is delivered, read, or operated without changing its meaning.

### Examples

Execution surfaces may include:

- repo-native documentation
- an agent instruction surface
- a handoff artifact
- a review surface
- a runtime-facing record
- a restart-oriented operational surface

### Why this matters

AletheIA may appear differently across environments.

The surface may change.

The meaning should not.

### What it is not

An Execution Surface is not the same as an adapter.

The surface is where the framework appears or is used.

The adapter is the mapping that preserves AletheIA meaning across surfaces.

### Minimum conceptual interface

An Execution Surface should make these dimensions legible:

- surface type
- intended audience
- compression level
- preserved meaning

---

## 5. Operational Boundary

### Definition

An **Operational Boundary** is the point where continuity can no longer remain implicit and explicit coordination becomes necessary.

This is the condition that justifies handoff, restart packaging, escalation, or explicit ownership signaling.

### Key rule

A work item may cross themes, concerns, or lenses without requiring formal handoff.

**Thematic crossing alone is not an operational boundary.**

### Typical operational-boundary triggers

An explicit boundary is usually present when one or more of these happen:

- executor changes
- dominant execution surface changes
- dominant mode of work changes in a way that affects continuity
- risk or contract posture changes
- work is truly split into parallel sub-work-items
- one actor formally stops so another can continue

### What should not trigger a boundary by itself

The following do not automatically create an operational boundary:

- crossing more than one topic
- touching product, observability, and UX in the same governed unit
- moving through more than one lens of analysis
- local complexity that still preserves the same executor, surface, and governing posture

### Why this matters

This keeps AletheIA from turning every cross-cutting task into unnecessary ceremony.

The framework should preserve explicit coordination only where the work itself actually changes operational shape.

---

## 6. Core vs Adapter vs Operator

### Core

The **core** is the stable framework meaning.

It includes:

- operating concepts
- contracts
- governance principles
- vocabulary
- reviewable logic about continuity, validation, and learning

The core should remain stable across environments.

### Adapter

An **adapter** is the environment-specific mapping that preserves core meaning across a different surface.

Adapters may change:

- format
- compression
- delivery style
- local packaging

Adapters should not change framework truth.

### Operator

The **operator** is the local human or agent actor who applies, chooses, initiates, reviews, resumes, or closes work inside a real environment.

Operators may decide:

- which local tool to use
- which tracker represents the work item
- when to initiate a restart
- how much local structure is justified
- what local extension rules apply

These are local actions, not framework truth.

---

## 7. One compact example

A team has one Work Item to improve a high-risk reporting workflow.

Inside that Work Item, one Work Slice may touch:

- product semantics
- observability updates
- user-facing wording

If the same executor continues the work, the same execution surface remains active, and the same risk posture still governs the slice, no formal handoff is required.

The Work Item is crossing themes, but it has not crossed an Operational Boundary.

Later, the same Work Item may require:

- a different executor
- a move into a design-oriented instruction surface
- a risk or contract review
- or true parallel split into separate tracks

At that point, the work has crossed an Operational Boundary.

Now explicit coordination is required, such as:

- handoff
- restart package
- review gate
- or sub-work-item creation

---

## 8. Relationship to existing documents

Read this document together with:

- `docs/governance.md`
- `docs/work-slice-pattern.md`
- `docs/slice-finalization-and-restart.md`
- `docs/adapter-taxonomy.md`
- `docs/runtime-adapter-contract.md`

These documents elaborate different parts of the model.

This file exists to keep the vocabulary itself stable across them.

---

## 9. Handoff

### Definition

A **Handoff** is the transition artifact that moves a slice across an agent, review, or ownership boundary.

Every operational handoff should behave like a restart package, not a transcript dump.

---

## 10. Governing Context

**Governing Context** is the minimum durable context that still constrains the next boundary.

Typical refs may include:

- active spec or plan
- policy pack
- decision log
- quality gate or release rule
- project-local constitution or operating rules

---

## 11. Durable Memory

**Durable Memory** is the set of reviewable artifacts that must survive past one execution surface.

Examples include docs, decisions, handoffs, restart packages, and learnings.

---

## 12. External Coordination System

An **External Coordination System** is any tool used to track status, priority, ownership, or progress outside the core.

Examples:

- GitHub Projects
- Jira boards
- Linear views

AletheIA integrates with these systems through adapter logic or operator practice, not through core dependence.

---

## Final rule

AletheIA should stay:

- project-agnostic
- tracker-agnostic
- provider-agnostic
- surface-flexible

The purpose of canonical vocabulary is not to remove local variation.

It is to prevent local variation from becoming mistaken for framework truth.
