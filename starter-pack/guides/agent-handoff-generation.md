# Agent Handoff Generation Guide

## Goal

This guide explains how to generate an operational handoff from real work without turning the artifact into a transcript.

In simple terms:

start from the next agent's boundary, not from the full history.

---

## When to generate an operational handoff

Use an operational handoff when:

- one agent is stopping at a clear boundary
- another agent is expected to continue execution
- the next step needs low ambiguity
- scope drift would be costly
- the receiving agent should not have to reconstruct the task from scratch

Do not force this for every small task.

If a short narrative summary is enough, use that instead.

---

## Core rule

Generate the handoff from:

- the next action
- the allowed execution scope
- the minimum valid context

Not from:

- the entire conversation
- every trial and error step
- provider-specific prompting habits

---

## Decide whether this is one boundary or a chain

Before filling the artifact, ask:

- is there one receiving boundary?
- or will the work cross two or more meaningful frontiers in sequence?

If the work crosses more than one strong boundary, prefer:

- **one compact handoff per boundary**

instead of:

- **one oversized artifact trying to anticipate every later continuation**

This keeps each restart package smaller, fresher, and easier to validate.

---

## Generate the minimum first

Start by drafting the minimum restart package:

- status
- completed work
- remaining work
- next action
- main risks
- validation expectation

Then decide whether you need the richer optional fields.

Use the richer fields only when they materially reduce drift for the next boundary.

---

## Recommended generation order

### 1. Start from the receiving agent

Ask:

- what should the next agent do first?
- what should the next agent avoid touching?
- what proof will be expected before closure?

If these are not clear yet, the handoff is probably premature.

### 2. Define the dominant frontier

State what kind of work owns the continuation.

Examples:

- integration
- UX writing
- visual polish
- security hardening
- metrics and observability

This keeps the next agent from reinterpreting the task as a different class of work.

### 3. Freeze the execution boundary

List:

- allowed files
- forbidden files
- explicitly out of scope expansions

This is one of the most important anti-drift moves in the handoff.

### 4. Surface the minimum safe context

Include only what the next agent can safely rely on:

- existing contracts
- fields already available
- files that matter most
- assumptions that are stable enough to continue

Avoid adding long narrative history when short factual context is enough.

### 5. Preserve the semantic guardrails

State what meaning or intent must remain true.

Examples:

- keep the current product behavior unchanged
- do not reopen backend contracts
- preserve existing UI layout while refining copy
- do not expand the task into a redesign

### 6. Make acceptance explicit when needed

Define what must be true for the receiving agent to count the task as complete.

Good acceptance criteria reduce semantic drift and scope inflation.

Skip this section when the minimum restart package is already sufficient.

### 7. End with the next action

Do not leave the artifact as a passive summary.

The receiving agent should know the first action to take.

---

## Good operational handoff signals

A strong agent handoff usually has:

- a clear dominant frontier
- a narrow execution boundary
- stable context instead of full transcript history
- semantic guardrails when they matter
- acceptance criteria when they materially reduce drift
- explicit validation expectation
- a concrete next action
- a compact chain shape when work crosses more than one boundary

---

## Weak handoff signals

A weak agent handoff usually looks like:

- a long recap with no execution boundary
- broad instructions like "continue the work"
- no allowed/forbidden file distinction
- hidden assumptions about contracts or data
- no acceptance criteria when the next step clearly needs them
- no validation expectation
- provider-specific prompt tricks replacing real scope definition
- one giant artifact standing in for several later boundaries

---

## Model-agnostic requirement

The generation method should work even if the receiving agent changes.

That means the handoff should still make sense if the next executor is:

- Codex
- Claude Code
- another coding agent
- a future internal workflow on a different provider

Provider-specific details may appear as local conventions, but the artifact should not depend on them to remain understandable.

---

## Relationship to the template

Use this guide together with:

- `starter-pack/templates/agent-handoff-template.md`

The template tells you what fields to fill.

This guide tells you how to derive those fields from real work.

---

## Suggested next reading

- `docs/agent-handoffs.md`
- `starter-pack/guides/handoff-guide.md`
- `starter-pack/templates/agent-handoff-template.md`
- `examples/handoffs/multi-boundary-continuity.md`
