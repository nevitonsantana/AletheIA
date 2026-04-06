# AletheIA

**AletheIA** is an operating framework for AI-assisted work.

It helps teams coordinate tasks, context, memory, skills, governance, validation, and learnings **without letting raw model output act directly on the system**.

In simple terms:

`model or agent output -> AletheIA -> execution`

---

## Why AletheIA exists

Many AI workflows still follow a fragile pattern:

`prompt -> output -> execution`

That can be fast, but it is often weak in:

- traceability
- scope control
- policy enforcement
- quality gates
- reusable learnings

AletheIA introduces an explicit operating layer between output and action.

Its goal is not to slow teams down for the sake of ceremony.

Its goal is to make AI-assisted work:

- clearer
- safer
- more predictable
- more reusable across projects

---

## What this is

AletheIA is:

- a framework
- provider-agnostic by design
- focused on safe and explainable AI-assisted work
- built to be reusable across projects
- designed for structured decision-making before execution

## What this is not

AletheIA is not:

- a chatbot
- an app
- a wrapper around a single LLM
- a product-specific toolkit
- a system that assumes automation is always the right answer

---

## Core operating loop

AletheIA works through a controlled loop:

`intent -> context -> decision -> execution -> validation -> learning`

This means the framework helps answer questions such as:

- What exactly is the task?
- What context is truly needed?
- What decision is being made?
- Why is this allowed, blocked, or escalated?
- What validation happened before closure?
- What should be learned from success or failure?

---

## What the first public alpha proves

The current public alpha is meant to prove that:

- an input can become a structured decision
- governance can block unsafe or poorly framed closure
- failed validation can generate reusable learnings
- the framework can stay small, inspectable, and deterministic
- the core can be reused outside its original pilot project

---

## Repository structure

- `engine/` — minimal deterministic kernel, governance, and learnings helpers
- `schemas/` — JSON schemas for framework contracts
- `policies/` — governance packs and policy definitions
- `examples/` — canonical examples and golden fixtures
- `tests/` — contract, golden, e2e, and learning-oriented checks
- `starter-pack/` — reusable operating guides, checklists, and templates
- `docs/` — architecture, roadmap, pilot narrative, and migration notes

---

## Initial examples

The alpha starts with a few small examples that make the framework tangible:

- `hello-world` — the smallest end-to-end path
- `low-confidence-review` — when ambiguity should stop direct execution
- `high-risk-human-gate` — when risk requires explicit human approval
- `learning-from-failed-validation` — when failed closure should also produce reusable learning
- `governance` — process-oriented rule evaluation using facts and a policy pack

---

## Design principles

1. Clarity over speed
2. Control over automation
3. Consistency over convenience
4. Reuse before duplication
5. Learnings must be reviewable
6. The framework should stay inspectable and debuggable

---

## Current status

This repository is the first public alpha draft of AletheIA.

It was born from real operational work inside the `Crisis Monitor` project and then extracted into a standalone reusable framework.

Today, this public draft already contains:

- an Alpha 1 baseline for governance, token discipline, durable decisions, enforcement clarity, quality, and learnings
- an explicit Alpha 2 bridge for self-application, pilot conversion, and project extension
- an Alpha 3 adoption baseline for getting started, existing-project application, contribution guidance, and starter-pack reuse
- the first concrete Alpha 4 handoff assets for model-agnostic restart packages between agents

In practical terms, that currently includes:

- core contracts
- a minimal kernel
- a governance pack
- an explicit token policy
- a small executable governance baseline
- a lightweight durable decision discipline
- an explicit boundary between behavioral and technical enforcement
- a quality baseline
- a first learnings path
- a reusable starter-pack slice

---

## Reading order

If this is your first time here, start with:

1. `docs/getting-started.md`
2. `docs/00-overview.md`
3. `docs/architecture.md`
4. `docs/governance.md`
5. `docs/token-policy.md`
6. `docs/durable-decisions.md`
7. `docs/enforcement-boundaries.md`
8. `docs/quality.md`
9. `docs/self-application.md`
10. `docs/pilot-crisis-monitor.md`
11. `docs/pilot-conversion.md`
12. `docs/project-extension-pattern.md`
13. `docs/apply-to-existing-project.md`
14. `CONTRIBUTING.md`
15. `starter-pack/`
16. `starter-pack/templates/project-extension-template.md`
17. `docs/agent-handoffs.md`
18. `starter-pack/templates/agent-handoff-template.md`
19. `examples/`

---

## Near-term direction

The next steps are:

- consolidate the first Alpha 4 handoff baseline without losing the Alpha 3 adoption gains
- keep validating the Crisis Monitor pilot and adjacent real slices
- keep converting pilot learnings into framework improvements
- keep using AletheIA to improve AletheIA itself
- extend Alpha 4 from concept + template into more repeatable handoff operating patterns
- keep Alpha 5 framed as evidence-oriented inference for higher-risk tasks

---

## Current phase map

- Alpha 1 established the governance and validation baseline.
- Alpha 2 established the pilot, self-application, and conversion bridge.
- Alpha 3 is making the framework easier to adopt and contribute to.
- Alpha 4 is starting to make inter-agent continuity explicit and reusable.

---

## First Alpha 2 bridge

The first explicit bridge into Alpha 2 is:

- `docs/self-application.md`
- `docs/pilot-crisis-monitor.md`
- `docs/pilot-conversion.md`
- `docs/project-extension-pattern.md`

Together, these documents explain how AletheIA should evolve itself, learn from pilots, and preserve a clear boundary between framework core and local project extensions.

The current Alpha 3 adoption baseline after this bridge is:

- `docs/getting-started.md`
- `docs/apply-to-existing-project.md`
- `CONTRIBUTING.md`
- `starter-pack/templates/project-extension-template.md`

The first Alpha 4 handoff baseline now adds:

- `docs/agent-handoffs.md`
- `starter-pack/templates/agent-handoff-template.md`

---

## Future direction after Alpha 4

AletheIA may eventually need a further phase focused on structured risk inference before execution in higher-risk tasks.

That future direction should stay evidence-oriented and conditional, rather than claiming strong formal verification that the framework does not yet provide.

See also:

- `docs/agent-handoffs.md`
- `starter-pack/templates/agent-handoff-template.md`
- `docs/structured-risk-inference.md`

---

## Contribution entrypoint

If you want to contribute to AletheIA, start with:

- `CONTRIBUTING.md`

This is the fastest way to understand what kinds of changes belong in the framework core, what should stay local, and how to contribute without inflating the project.

---

## Minimal governance baseline

Alpha 1 now includes a small executable governance check:

- `bash scripts/check-governance.sh`

This is intentionally modest.

It does not try to be a heavy enforcement layer yet.
It only proves that AletheIA can move from governance prose into a small technical baseline.
