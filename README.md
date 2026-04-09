# AletheIA

**AletheIA** is an operating framework for AI-assisted work.

It helps teams coordinate tasks, context, memory, skills, governance, validation, and learnings **without letting raw model output act directly on the system**.

In simple terms:

`model or agent output -> AletheIA -> execution`

---

## Why the name AletheIA

The name combines **Aletheia** — the idea of truth as something brought into the open rather than left hidden — with **IA**, signaling the framework's focus on AI-assisted work.

Conceptually, the name points to the framework's main intention:

- make reasoning more explicit
- make decisions more reviewable
- make validation and learnings less hidden
- keep AI work from moving straight from output to action without an operating layer

In that sense, AletheIA is not about treating AI output as truth.
It is about creating the conditions for AI-assisted work to become more inspectable, governable, and revealable before execution.

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

## What the current pre-1.0 repository proves

The current public repository is meant to prove that:

- an input can become a structured decision
- governance can block unsafe or poorly framed closure
- failed validation can generate reusable learnings
- the framework can stay small, inspectable, and deterministic
- the core can be reused outside its original pilot project
- pilots can turn into reviewable framework improvements
- the roadmap can distinguish baseline work from deferred evolution

---

## Repository structure

- `engine/` — minimal deterministic kernel, governance, and learnings helpers
- `schemas/` — JSON schemas for framework contracts
- `policies/` — governance packs and policy definitions
- `examples/` — canonical examples and golden fixtures
- `tests/` — contract, golden, e2e, and learning-oriented checks
- `starter-pack/` — reusable operating guides, checklists, and templates
- `docs/` — architecture, roadmap, pilot narrative, and release-readiness notes

---

## Initial examples

The repository starts with a few small examples that make the framework tangible:

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

AletheIA is still **pre-1.0**.

The repository is now in a **late Alpha completion cycle**:

- **Alpha 1–3** are treated as complete enough for the current cycle
- **Alpha 4–7** remain active completion or hardening lanes before the 1.0 gate
- post-baseline tracks such as enterprise-readiness, stronger domain packs, and heavier tooling are preserved, but explicitly deferred until after 1.0

Today, the public repository already contains:

- an Alpha 1 baseline for governance, token discipline, durable decisions, enforcement clarity, quality, and learnings
- an Alpha 2 bridge for self-application, pilot conversion, and project extension, reinforced by real-world Crisis Monitor validation
- an Alpha 3 adoption baseline for getting started, existing-project application, contribution guidance, and starter-pack reuse
- an Alpha 4 handoff baseline for model-agnostic restart packages, project conventions, and semi-automated handoff capture
- an Alpha 5 experimental baseline for structured risk inference in higher-risk work, including concrete example artifacts
- an Alpha 6 distribution baseline for presets, adapters, adoption modes, and cross-surface delivery mappings
- a current operational-composition baseline for work slices, risk-to-gate mapping, stronger restart-package examples, round-based maintenance guidance, and optional filesystem context-routing experiments
- an early Alpha 7 bootstrap-and-delivery baseline for future tooling contracts that remains clearly outside the core

This repository is **not 1.0 yet**.
The current priority is to close the remaining open Alpha work cleanly before pulling post-1.0 tracks into the main lane.

See also:

- `docs/roadmap-alpha.md`
- `docs/release-1.0-readiness.md`

---

## Reading order

If this is your first time here, start with:

1. `docs/getting-started.md`
2. `docs/00-overview.md`
3. `docs/roadmap-alpha.md`
4. `docs/release-1.0-readiness.md`
5. `docs/architecture.md`
6. `docs/governance.md`
7. `docs/token-policy.md`
8. `starter-pack/guides/model-strategy-by-task.md`
9. `docs/durable-decisions.md`
10. `docs/enforcement-boundaries.md`
11. `docs/quality.md`
12. `docs/self-application.md`
13. `docs/pilot-crisis-monitor.md`
14. `docs/pilot-conversion.md`
15. `examples/pilot-conversion/crisis-monitor-real-world-validation.md`
16. `docs/project-extension-pattern.md`
17. `docs/apply-to-existing-project.md`
18. `CONTRIBUTING.md`
19. `starter-pack/README.md`
20. `starter-pack/templates/project-extension-template.md`
21. `starter-pack/templates/project-model-strategy-template.md`
22. `docs/agent-handoffs.md`
23. `starter-pack/guides/agent-handoff-generation.md`
24. `starter-pack/templates/agent-handoff-template.md`
25. `docs/project-handoff-conventions.md`
26. `docs/handoff-capture-pattern.md`
27. `docs/work-slice-pattern.md`
28. `starter-pack/templates/work-slice-template.md`
29. `starter-pack/guides/risk-to-gate-mapping.md`
30. `docs/structured-risk-inference.md`
31. `starter-pack/templates/inference-artifact-template.md`
32. `starter-pack/guides/inference-trigger-guidance.md`
33. `starter-pack/guides/inference-artifact-generation.md`
34. `docs/inference-pilot-scenarios.md`
35. `examples/work-slices/standard-slice/README.md`
36. `examples/handoffs/compact-reviewable-handoff.md`
37. `examples/handoffs/high-stakes-handoff.md`
38. `examples/structured-risk-inference/README.md`

---

## What happens after 1.0

After the 1.0 gate is satisfied, the roadmap shifts from Alpha completion into **1.x evolution**.

The next planned lanes are already preserved as deferred tracks:

- **1.1** — enterprise-readiness / regulated adoption
- **1.2** — pilot expansion / stronger real-world validation
- **1.3** — distribution & delivery hardening
- **1.4+** — domain governance packs hardening

Those tracks remain valid, but they are intentionally not the current priority lane.
