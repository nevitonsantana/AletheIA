# Agent Handoffs

## Goal

Explain how AletheIA treats handoffs between agents as compact restartable transitions between work-slice boundaries.

---

## Core rule

Inter-agent handoffs should behave as:

**restart packages, not transcripts**

They should preserve:

- work-slice boundary clarity
- validation continuity
- next-action explicitness
- low ambiguity for the next boundary

---

## Handoff in the broader model

A handoff sits between:

- a current **Work Slice**
- a possible related **Work Item** in an external coordination system
- the current and next **Execution Surface**

The handoff should preserve what the next boundary needs without pretending that the previous runtime surface is durable memory.

---

## Minimum restart package

A useful operational handoff should usually make these things explicit:

1. current status
2. what was completed
3. what remains pending
4. the next action
5. the main risks
6. the minimum validation expectation
7. the related work-slice or work-item refs when they matter

---

## Richness rule

Keep three layers distinct:

1. **conceptual richness** — the full meaning the boundary may need
2. **template richness** — optional fields that reduce drift
3. **schema coverage** — the minimum structured continuity record

The schema may stay smaller than the template.
That is a feature, not a bug.

### When the minimum package is enough

Prefer the minimum restart package when:

- the next action is obvious
- the receiving boundary is narrow
- the main risk is execution, not reinterpretation
- validation continuity fits in one compact line

### When to step up to the richer template

Use the richer operational template when one or more of these are true:

- the work crosses a meaningful ownership boundary
- file scope must be frozen explicitly
- semantic guardrails matter more than raw file paths
- acceptance criteria need to be preserved to avoid reinterpretation
- the receiving boundary should report back in a specific format

Compact and restartable still beats exhaustive and noisy, but the richer template is justified when it materially reduces drift.

---

## Multi-boundary continuity

If work will cross more than one meaningful boundary, prefer:

**a chain of compact handoffs**

instead of one oversized artifact.

A healthy flow still looks like:

`boundary A -> restart package -> boundary B -> restart package -> boundary C`

---

## Model-agnostic requirement

A good handoff should still preserve its meaning whether the next executor is:

- Codex
- Claude Code
- another coding agent
- a future workflow using a different provider

Runtime-local examples may differ.
The handoff meaning should not.
