# Runtime Adapter Contract

## Goal

Define the first minimal runtime-facing contract for the 1.2 Resource-Aware Operations track.

This contract should let a local runtime emit comparable slice-level operational signals **without** turning AletheIA into a full orchestration platform.

It is intentionally narrower than the Alpha 6 adapter taxonomy.

---

## Why this exists

Alpha 6 already explains adapters as delivery mappings across surfaces.

The 1.2 track needs a different but related thing:

- a minimal runtime contract for carrying resource-aware operational signals

The goal is not to define every runtime integration.
The goal is to define the smallest shared shape that later local adapters can map onto.

---

## Relationship to existing surfaces

This document defines a runtime-facing adapter shape, not the full canonical meaning of Execution Surface.

Execution Surface is the broader canonical term.
A runtime adapter is one specific way of preserving AletheIA meaning on such a surface.

See:

- `docs/canonical-vocabulary.md`
- `docs/adapter-taxonomy.md`
- `docs/runtime-adapter-codex.md`
- `docs/runtime-adapter-claude-code.md`
- `docs/runtime-adapter-qwen.md`

This contract builds directly on:

- `docs/context-resource-telemetry-spec.md`
- `docs/slice-telemetry-model.md`
- `docs/waste-heuristics.md`
- `docs/progressive-policy-signals.md`
- `docs/adapter-taxonomy.md`

The relationship is:

- Alpha 6 adapter taxonomy explains **what kinds of delivery mappings exist**
- this contract explains **what minimum operational fields a runtime-facing mapping should preserve**

---

## Design constraints

The first runtime adapter contract should remain:

- provider-agnostic
- runtime-agnostic
- advisory-first
- compatible with manual or semi-automated local implementations
- smaller than a full task-execution API

It should not require:

- a specific model vendor
- a specific editor shell
- exact token counts
- exact cost accounting
- automatic routing
- automatic blocking

---

## Minimal contract scope

A first adapter should be able to carry five groups of meaning.

### 1. Slice identity

A runtime-facing record should preserve:

- slice identifier
- project or lane identifier
- round identifier when relevant
- dominant task shape

### 2. Context posture

It should preserve:

- cold boot size class
- exploration event count or class
- expansion event count
- whether expansion reason was recorded
- delegation event count when relevant
- handoff size class when relevant

### 3. Runtime / agent posture

It should preserve:

- runtime identity
- agent class or role when relevant
- capability profile if known
- reasoning depth if known
- trust / hosting posture when materially relevant

### 4. Review / retry posture

It should preserve:

- retry count
- retry pattern class
- validation outcome class
- human review level
- manual rescue yes / no / unknown

### 5. Restart posture

It should preserve:

- handoff required or not
- handoff quality class
- restart burden class

Optional fields may later include time, cost, and tool-use proxies.

---

## Contract style

The contract should be read as a **shape**, not as a required transport protocol.

A local runtime may implement it through:

- JSON
- YAML
- structured markdown frontmatter
- local logs
- handoff sidecar files
- project-local telemetry sinks

What matters is preserving the meaning of the fields, not forcing one storage format too early.

---

## Minimal example shape

```txt
slice_id: example-slice-001
project_id: crisis-monitor
round_id: 2
task_shape: bounded-execution
cold_boot_budget: minimal
exploration_events: 1
expansion_events: 1
expansion_reason_present: yes
delegation_events: 0
runtime_id: codex
agent_class: coding-agent
capability_profile: balanced-executor
reasoning_depth: standard
trust_hosting_posture: externally-hosted-allowed
retry_count: 1
retry_pattern: changed-strategy
validation_outcome: validated
human_review_level: light-review
manual_rescue_required: no
handoff_required: yes
handoff_quality: compact
restart_burden: low
```

This is only an illustrative shape.
A local adapter may serialize it differently.

---

## What a runtime adapter should do first

A first local runtime adapter should be able to:

1. capture a bounded slice record
2. preserve the key context and retry signals
3. preserve runtime identity and fit posture
4. preserve handoff and restart quality signals
5. keep the result reviewable by humans

That is enough for the current track.

---

## What a runtime adapter should not do yet

Do not require the first contract to:

- execute routing automatically
- block work by itself
- compute universal scores
- normalize all vendor metrics into one truth layer
- become a benchmark system by accident

Those belong later, after more evidence and comparison surfaces exist.

---

## First local implementation patterns

Healthy first patterns include:

- a markdown-frontmatter slice record
- a local JSON sidecar written by a project-specific adapter
- a reviewable artifact generated alongside a handoff package

The first contract should make these possible without forcing one canonical runtime implementation.

---

## Suggested next reading

- `docs/context-resource-telemetry-spec.md`
- `docs/slice-telemetry-model.md`
- `docs/progressive-policy-signals.md`
- `docs/adapter-taxonomy.md`
- `examples/resource-aware-operations/minimal-runtime-adapter-example.md`
