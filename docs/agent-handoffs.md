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

This is the more important kind of handoff for Alpha 4 and the current operational layer around it.

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

## Minimum restart package

A useful operational handoff should usually make these things explicit:

1. current status
2. what was completed
3. what remains pending
4. the next action
5. the main risks
6. the minimum validation expectation

That is the smallest layer that helps the next boundary resume without guessing.

---

## Three layers of handoff richness

AletheIA currently benefits from keeping three layers distinct.

### 1. Conceptual richness

This is the full operating intent of a good handoff.
It may include:

- receiving agent role
- dominant frontier
- cross-boundary reason
- allowed and forbidden files
- semantic guardrails
- acceptance criteria
- expected response format

### 2. Template shape

The starter-pack template is richer than the minimum JSON record.
That is intentional.
It gives teams optional fields that reduce drift when the next boundary is non-trivial.

### 3. Schema coverage

The current handoff schema stays smaller.
It captures the minimum machine-friendly continuity record without pretending to encode every nuance of a rich restart package.

This smaller schema is a feature, not a bug.

---

## Mapping: concept -> template -> current schema

| Operational concern | Template support | Current schema coverage | Notes |
| --- | --- | --- | --- |
| status | `Status` | `status` | schema-backed |
| completed work | `What was completed` | `completed` | schema-backed |
| pending work | `What remains pending` | `pending` | schema-backed |
| main risks | `Main risks` | `risks` | schema-backed |
| summary for reopening | `Current status` / `Available context` | `reopen_context.summary` | schema-backed |
| required files | `Relevant files` | `reopen_context.required_files` | schema-backed, but the template can be richer |
| next action | `Next action` | `reopen_context.next_action` | schema-backed |
| validation expectation | `Validation expectation` | `validation_next` | schema-backed |
| receiving agent role | `Receiving agent role` | none | optional outside schema |
| dominant frontier | `Dominant frontier` | none | optional outside schema |
| cross-boundary reason | `Cross-boundary reason` | none | optional outside schema |
| allowed / forbidden files | `Allowed files` / `Forbidden files` | none | optional outside schema |
| semantic guardrails | `Semantic guardrails` | none | optional outside schema |
| acceptance criteria | `Acceptance criteria` | none | optional outside schema |
| expected response format | `Expected response format` | none | optional outside schema |
| explicitly out of scope | `Explicitly out of scope` | none | optional outside schema |

The important boundary is:

- the **schema** captures minimum structured continuity
- the **template** supports a richer restart package when the next boundary needs it

---

## Low-bureaucracy rule

A stronger handoff should reduce ambiguity, not increase ritual.

That means:

- use the richer template fields when they materially help the next boundary
- skip optional detail when it only repeats obvious facts
- do not dump raw transcripts into the artifact
- do not turn every handoff into a long-form report

Compact and restartable beats exhaustive and noisy.

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
- the handoff is rich enough to restart work, but still shorter than a transcript

---

## What not to do

Do not treat an agent handoff as:

- a raw transcript dump
- a generic paragraph with no execution boundary
- a provider-specific prompt recipe disguised as framework logic
- a bureaucratic checklist that duplicates the entire task history

AletheIA should preserve the handoff as a reusable operating pattern.

---

## Suggested next reading

- `starter-pack/guides/handoff-guide.md`
- `starter-pack/guides/agent-handoff-generation.md`
- `starter-pack/templates/handoff-template.md`
- `starter-pack/templates/agent-handoff-template.md`
- `examples/handoffs/compact-reviewable-handoff.md`
- `examples/handoffs/high-stakes-handoff.md`
- `docs/work-slice-pattern.md`
- `docs/project-handoff-conventions.md`
- `docs/handoff-capture-pattern.md`
- `docs/project-extension-pattern.md`
