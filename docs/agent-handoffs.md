# Agent Handoffs

## Goal

This document explains how AletheIA treats handoffs between agents.

In simple terms:

when one agent stops and another one continues, the handoff should behave like a compact restart package instead of a loose recap.

---

## Why this matters

As soon as work crosses agent boundaries, a common failure appears:

- the task is passed on
- but the execution boundary is not
- the context is summarized
- but the rationale is blurred
- the next agent continues
- but with too much interpretation freedom

This creates drift, repeated analysis, and accidental scope expansion.

AletheIA should reduce that by making handoffs more explicit, more structured, and more portable.

---

## Two kinds of handoff

### 1. Narrative handoff

Use when the next reader mainly needs situational understanding.

Typical purpose:

- explain what happened
- summarize current status
- list pending items and known risks

This is often sufficient for humans.

### 2. Operational handoff

Use when the next reader is another agent expected to continue execution with low ambiguity.

Typical purpose:

- preserve scope boundaries
- transfer the minimum useful context
- reduce semantic drift
- define what should and should not be touched next

This is the more important kind of handoff for Alpha 4.

---

## Core rule

AletheIA should treat inter-agent handoffs as:

**restart packages, not transcripts**

That means the handoff should optimize for:

- resumability
- scope clarity
- validation continuity
- low ambiguity

Not for replaying the entire history.

---

## Minimum fields for an operational handoff

A useful operational handoff should usually make these things explicit:

### 1. Dominant frontier

What kind of work owns the next step?

### 2. Cross-boundary reason

Why is the task moving to another agent?

### 3. Allowed files

Which files the next agent is allowed to change.

### 4. Forbidden files

Which files or layers are out of scope.

### 5. Allowed data or contracts

What information is already available and safe to rely on.

### 6. Semantic guardrails

What meaning must be preserved.

### 7. Acceptance criteria

What must be true for the handoff target to count as complete.

### 8. Validation expectation

What proof should exist before closure.

### 9. Expected response format

How the receiving agent should report back.

### 10. Explicitly out of scope

What should not be expanded or reinterpreted.

---

## Model-agnostic requirement

AletheIA should not define handoffs that only make sense for one tool, one shell, or one LLM family.

A good agent handoff should preserve its meaning whether the next executor is:

- Codex
- Claude Code
- another coding agent
- a future workflow using a different provider

Project-specific conventions may appear inside the artifact, but the handoff structure itself should remain provider-agnostic.

---

## Relationship to Alpha 5

Alpha 4 focuses on continuity between agents.

Alpha 5 may later add a stronger semantic layer through structured risk inference.

That means an operational handoff may eventually carry:

- instruction and scope
- validation expectations
- and, when triggered, a structured inference artifact

But Alpha 4 does not require Alpha 5 to be useful.

---

## Good signs

Alpha 4 is going well when:

- the next agent needs less reinterpretation to continue
- scope drift is reduced
- validation continuity is preserved across the handoff
- the artifact still works even if the receiving agent changes provider

---

## What not to do

Do not treat an agent handoff as:

- a raw transcript dump
- a generic paragraph with no execution boundary
- a provider-specific prompt recipe disguised as framework logic

AletheIA should preserve the handoff as a reusable operating pattern.

---

## Suggested next reading

- `starter-pack/guides/handoff-guide.md`
- `starter-pack/guides/agent-handoff-generation.md`
- `starter-pack/templates/handoff-template.md`
- `starter-pack/templates/agent-handoff-template.md`
- `docs/project-extension-pattern.md`
