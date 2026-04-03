# Handoff Guide

A handoff should help another person or agent resume work without rereading everything.

## A good handoff should answer

- What was done?
- What is still pending?
- What risks remain?
- What files matter most?
- What is the next recommended action?

## Keep it small

A handoff is not a transcript.

It is a compact restart package.

## Include when relevant

- validation status
- blocked decisions
- missing approvals
- learnings that change the next step


## Future evolution

AletheIA should eventually distinguish more clearly between:

- a human-facing summary
- an agent-facing restart package

That distinction becomes important when work moves from one agent to another and the next agent needs a compact, structured continuation artifact rather than a long narrative recap.


## Narrative handoff vs operational handoff

Not every handoff has the same job.

### Narrative handoff

Useful when the next reader is mainly trying to understand:

- what happened
- what remains open
- what risks exist

This is often enough for humans.

### Operational handoff

Useful when the next reader is another agent expected to continue execution with low ambiguity.

In that case, the handoff should behave more like a restart contract than a recap.

It should ideally make explicit:

- dominant frontier
- reason for the cross-boundary handoff
- allowed files
- forbidden files
- allowed data or contracts already available
- semantic guardrails
- acceptance criteria
- expected response format
- what is explicitly out of scope

This reduces drift when one agent stops at its boundary and another takes over.

## Model-agnostic requirement

AletheIA should not define handoffs that only work for one tool, one shell, or one LLM family.

A good inter-agent handoff should preserve its meaning even if the next executor is:

- Codex
- Claude Code
- another coding agent
- a future workflow built on a different provider

The artifact may reference local project conventions, but its structure should stay provider-agnostic.
