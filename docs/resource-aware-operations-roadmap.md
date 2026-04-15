# Resource-Aware Operations Roadmap

## Why this is the 1.2 focus

AletheIA 1.1 is already doing the right next job:

- constrained adoption guidance
- local trust-boundary posture
- bounded pilot evidence for heavier environments

The next question is different.

It is no longer only:

- how should the framework enter constrained environments safely?

It becomes:

- how should the framework make context and resource use more observable, comparable, and actionable across real agents and runtimes without inflating the core?

That is the purpose of the 1.2 track.

This track should be read as **resource-aware operations**, not as token optimization in disguise.

---

## What 1.2 builds on instead of replacing

The 1.2 track should explicitly reuse what the repository already established.

This includes:

- `docs/token-policy.md`
- `docs/agent-handoffs.md`
- `docs/handoff-capture-pattern.md`
- `docs/work-slice-pattern.md`
- `starter-pack/guides/risk-to-gate-mapping.md`
- `starter-pack/guides/model-strategy-by-task.md`
- `docs/project-extension-pattern.md`
- `docs/enterprise-readiness-roadmap.md`
- `docs/local-trust-boundary-posture.md`

The goal is not to restate these as fresh gaps.
The goal is to operationalize them more concretely.

---

## What resource-aware means here

Resource-aware operations should include proportional handling of:

- context size
- cold boot cost
- restart and handoff weight
- retry waste
- slice expansion
- runtime / agent fit
- human review effort
- optional time and cost signals

This should remain:

- vendor-agnostic
- advisory-first
- reviewable
- smaller than a full orchestration platform

---

## Recommended implementation order

### Phase A — observability first

Start with the measurement spine:

- context expansion
- cold boot size
- handoff size and inflation
- retry patterns
- slice cost proxies
- basic human-review effort signals
- runtime / agent used per slice

Expected outputs:

- **Context / Resource Telemetry Spec**
- **minimal slice telemetry model**
- **Waste Heuristics guide**

This phase now begins with:

- `docs/context-resource-telemetry-spec.md`
- `docs/slice-telemetry-model.md`
- `docs/waste-heuristics.md`

### Phase B — progressive policy signals

Turn existing guidance into light operational signals:

- warnings
- thresholds
- expansion reason required
- retry-waste hints
- handoff-inflation hints
- task-shape versus runtime mismatch hints

Important boundary:

Start advisory-only.
Do not begin with rigid enforcement.

Expected outputs:

- **Progressive Policy Signals guide**
- lightweight review examples of healthy versus unhealthy signals

This phase now begins with:

- `docs/progressive-policy-signals.md`
- `examples/resource-aware-operations/policy-signals-review-example.md`

### Phase C — runtime adapter contract

Only after the signals are legible should the framework define a runtime-facing contract.

Keep the contract minimal and provider-agnostic.
It should cover:

- slice metadata
- context budget metadata
- expansion reason
- handoff metadata
- retry metadata
- runtime / agent identity
- optional time / cost fields

Expected outputs:

- **Runtime Adapter Contract**
- one example adapter shape
- one or two local runtime examples

This phase now begins with:

- `docs/runtime-adapter-contract.md`
- `examples/resource-aware-operations/minimal-runtime-adapter-example.md`

### Phase D — advisory multi-agent decision layer

The framework may then publish an advisory layer for choosing between agents and runtimes.

This should remain:

- a decision guide
- an advisory matrix
- an example policy surface

It should not become rigid core truth.

Expected outputs:

- **Agent / Runtime Decision Guide**
- example decision matrix by task shape and risk posture

This phase now begins with:

- `docs/agent-runtime-decision-guide.md`
- `examples/resource-aware-operations/agent-runtime-decision-example.md`

### Phase E — workflow guide and readiness layer

Only after observability and adapter shape exist should AletheIA strengthen workflow guidance with:

- workflow guide layer
- planning depth profiles
- readiness gates

Recommended profile shapes:

- `Lite`
- `Standard`
- `High-Assurance`

Recommended gate types:

- context minimum exists
- decision is clear enough
- risk is mapped enough
- handoff is usable enough
- runtime / agent fit is acceptable enough

Expected outputs:

- **Planning Depth Profiles**
- **Readiness Gates Spec**
- lightweight workflow guide examples

This phase now begins with:

- `docs/planning-depth-profiles.md`
- `docs/readiness-gates-spec.md`
- `examples/resource-aware-operations/workflow-readiness-example.md`

### Phase F — examples before learning

Before any benchmark or learning ambition, the framework should close the loop through:

- concrete examples
- constrained / local examples
- comparative review examples
- one bounded real pilot conversion loop

The purpose is to prove that the operational surfaces help in real use before they become a bigger system.

This phase now begins with:

- `examples/resource-aware-operations/comparative-review-example.md`
- `examples/resource-aware-operations/constrained-local-review-example.md`
- `examples/resource-aware-operations/bounded-pilot-conversion-loop.md`

---

## What this track explicitly defers

### 1.3+ — benchmark and comparative evaluation

Benchmarking should wait until there is enough telemetry and adapter shape to compare real slices meaningfully.

### 1.4+ — learning layer and adaptive orchestration

Learning should wait until there is:

- comparable telemetry
- useful review signals
- enough repeated evidence
- a benchmark baseline worth optimizing against

### Also not in scope now

- vendor-specific model policy in the core
- rigid persona catalogs from other frameworks
- full delivery lifecycle orchestration
- auto-evolution or RL-style behavior shaping in the core framework

---

## Reference posture

This track may borrow useful ideas from references such as BMAD, Memento-Skills, and ART, but only selectively.

Absorb now:

- workflow guidance
- readiness shaping
- planning depth profiles
- stronger operational surface design

Do not absorb now:

- rigid persona systems as core truth
- full lifecycle delivery packaging
- active autoevolution in the framework core
- training-driven orchestration before measurement maturity

---

## Relationship to Adaptative Skills

AletheIA 1.2 should stay complementary to the broader ecosystem.

- **AletheIA** remains the macro layer for readiness, gates, continuity, and resource-aware operations
- **Adaptative Skills** remains the micro layer for specialist execution
- **Evolution Layer** remains the governed improvement path for the skill library
- **Efficiency Layer** remains the transversal micro discipline for chunking, checkpointing, handoffs, and related operational fluency

This means AletheIA should not absorb the skill library.
It should make macro operating posture more explicit around it.

---

## Success condition for the 1.2 track

This track is working if AletheIA can eventually help teams answer questions such as:

- where is context inflating?
- where are handoffs heavier than they should be?
- where is retry behavior wasteful?
- where is the chosen runtime stronger or weaker than the task really needs?
- where is human review effort too high for the value returned?

without becoming a heavyweight orchestration product.

## Current 1.2 deliverables

This track now begins with:

- `docs/resource-aware-operations-roadmap.md`
- `docs/context-resource-telemetry-spec.md`
- `docs/slice-telemetry-model.md`
- `docs/waste-heuristics.md`
- `docs/progressive-policy-signals.md`
- `examples/resource-aware-operations/policy-signals-review-example.md`
- `docs/runtime-adapter-contract.md`
- `examples/resource-aware-operations/minimal-runtime-adapter-example.md`
- `docs/agent-runtime-decision-guide.md`
- `examples/resource-aware-operations/agent-runtime-decision-example.md`

These are meant to establish the first observability spine, the first advisory signal layer, a minimal runtime contract, and an advisory fit layer before any benchmark or learning-layer work is attempted.
