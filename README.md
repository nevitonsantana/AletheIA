# AletheIA

**AletheIA** is an operating framework for AI-assisted work.

It helps teams coordinate tasks, context, memory, skills, governance, validation, and learnings **without letting raw model output act directly on the system**.

In simple terms:

`model or agent output -> AletheIA -> execution`

---

## Why AletheIA exists

Many AI workflows still follow a fragile pattern:

`prompt -> output -> execution`

That is fast, but often weak in:

- traceability
- scope control
- policy enforcement
- quality gates
- reusable learnings

AletheIA introduces an explicit operating layer between output and action.

Its goal is not to slow teams down.

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

## What the first public alpha should prove

The first public alpha should prove that:

- an input can become a structured decision
- governance can block unsafe or poorly framed closure
- failed validation can generate reusable learnings
- the framework remains small, inspectable, and deterministic
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
- `governance` — process-oriented rule evaluation using facts + policy pack

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

This repository is being prepared as the first public alpha of AletheIA.

It was born from real operational work inside the `Crisis Monitor` project and is now being extracted into a standalone reusable framework.

Right now, the public draft already contains:

- the first core contracts
- a minimal kernel
- a governance pack
- a quality baseline
- a first learnings path
- a portable draft structure outside the original project

---

## Reading order

If this is your first time here, start with:

1. `docs/00-overview.md`
2. `docs/architecture.md`
3. `docs/governance.md`
4. `docs/quality.md`
5. `examples/`

---

## Public alpha direction

The next milestones are:

- refine the public narrative
- complete the core extraction
- decide how the starter-pack will enter the public repo
- publish the first standalone alpha
