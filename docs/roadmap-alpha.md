# AletheIA Alpha Roadmap

## Alpha 1 — Core + Governance Baseline

Focus:
- prove the framework core
- harden the minimum governance baseline

Includes:
- core contracts
- minimal deterministic kernel
- governance pack
- governance hooks
- quality baseline
- learning-from-failed-validation
- token policy
- technical governance baseline
- stronger durable-decision / ADR discipline
- clearer distinction between behavioral enforcement and technical enforcement

### What Alpha 1 must prove

By the end of Alpha 1, AletheIA should already show that:

- an input can become a structured decision
- governance can evaluate whether work should proceed
- unsafe or poorly framed closure can be blocked
- failed validation can generate reusable learnings
- token discipline can be explicit instead of implicit
- the repository has a small executable governance baseline, not only governance prose

### Notes

Alpha 1 should stay intentionally small.

This phase is not the moment for:
- heavy policy engines
- installer promises
- large integration matrices
- strong claims about enterprise enforcement

The goal is to make the framework inspectable, teachable, and minimally enforceable.

Current Alpha 1 baseline artifacts now include:

- `docs/token-policy.md`
- `scripts/check-governance.sh`
- `docs/durable-decisions.md`
- `docs/enforcement-boundaries.md`

---

## Alpha 2 — Real Pilots + Self-Application

Focus:
- prove AletheIA in real product flows
- start using AletheIA to improve AletheIA

Includes:
- first real Crisis Monitor pilot write-up
- second small pilot or adjacent real flow
- stronger pilot learnings loop
- project extension pattern
- self-application loop
- self-application of AletheIA contracts to framework evolution
- clearer conversion of pilot learnings into framework improvements

### What Alpha 2 must prove

By the end of Alpha 2, AletheIA should already show that:

- the framework works in real product slices, not only examples
- pilots produce durable learnings, not just anecdotes
- AletheIA can be applied to its own roadmap and repo evolution
- project-specific extensions can exist without collapsing the framework into a single product

### Notes

This is the phase where real pilots matter more than abstract completeness.

The most important move in Alpha 2 is not adding more framework surface.
It is closing the loop between:

`pilot -> learning -> framework improvement`

Current Alpha 2 bridge artifacts now include:

- `docs/self-application.md`
- `docs/pilot-crisis-monitor.md`
- `docs/pilot-conversion.md`
- `docs/project-extension-pattern.md`

Together, these four artifacts define how AletheIA learns from pilots, improves itself, and preserves the boundary between reusable core and local project context.

---

## Alpha 3 — Adoption + Ecosystem

Focus:
- make the repository easier to adopt, extend, and contribute to

Includes:
- better onboarding
- stronger contributor guidance
- stronger starter-pack
- clearer guidance for applying AletheIA in an existing project
- cleaner release structure
- reusable domain governance packs
- tighter release hygiene
- less pilot-specific residue in public docs

### What Alpha 3 must prove

By the end of Alpha 3, AletheIA should already show that:

- a new team can understand how to start
- contributors can extend the framework without breaking its core logic
- the starter-pack is more reusable and less tied to its original extraction context
- governance patterns can be reused across domains without redefining the whole framework

### Notes

Alpha 3 is not about making the framework heavier.
It is about making it easier to adopt.

AletheIA should become easier to:
- read
- install mentally
- adapt
- contribute to
- test in real projects

---

## Alpha 4 — Orchestrated Handoffs & Multi-Agent Continuity

Focus:
- make handoffs between agents explicit, reusable, model-agnostic, and increasingly automatable

Includes:
- structured inter-agent handoff contracts
- handoff generation patterns from real work items
- clearer separation between human-facing summaries and agent-facing restart packages
- model-agnostic continuity patterns that do not depend on one LLM or coding tool
- starter-pack guidance for cross-agent execution flows
- reusable patterns for passing scope, validation, risks, and next action across agents

### What Alpha 4 must prove

By the end of Alpha 4, AletheIA should already show that:

- handoffs can be produced as compact restart packages instead of ad-hoc prompts
- one agent can stop at its boundary and prepare the next agent's work clearly
- cross-agent continuity can happen without relying on hidden thread memory
- handoff artifacts can be generated in a repeatable way from real project work
- the handoff structure can work across different LLMs and agent shells without changing its core meaning

### Notes

Alpha 4 is not about adding more agents for their own sake.
It is about making agent boundaries safer and more productive.

The key move in Alpha 4 is turning:

`work in one agent -> explicit handoff artifact -> reliable continuation in another agent`

into a reusable operating pattern.

Potential first artifacts for this phase may include:

- handoff generation guidance
- agent-facing handoff templates
- project-level handoff conventions
- automated or semi-automated handoff creation from completed work items
- execution-scope fields such as allowed files, forbidden files, allowed data, semantic guardrails, acceptance criteria, and expected response format

---

## Cross-Alpha principles

Across all three alphas, AletheIA should preserve a few boundaries:

1. It should remain provider-agnostic.
2. It should not collapse into a single governance template.
3. It should not confuse product pilot residue with reusable framework core.
4. It should prefer explicit contracts over hidden conventions.
5. It should treat learnings as reviewable artifacts, not informal memory.
6. It should evolve through real pilots, not only through internal theory.

---

## Near-term priority order

1. open the first Alpha 3 adoption artifacts
   - applying AletheIA to an existing project
   - stronger onboarding path
2. keep the Alpha 2 bridge coherent while adoption grows
3. continue validating the Crisis Monitor pilot and nearby real slices
4. convert pilot learnings into framework updates
5. shape Alpha 4 around orchestrated handoffs and cross-agent continuity
