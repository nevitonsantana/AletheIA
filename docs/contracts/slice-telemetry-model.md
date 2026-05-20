# Slice Telemetry Model

## Goal

Provide a minimal, framework-facing model for recording telemetry at the work-slice level.

This is a **model shape**, not a required JSON contract.
It exists so teams can record comparable signals before the AletheIA 1.2 track moves into adapters or stronger review layers.

---

## Minimal slice record

A healthy first slice telemetry record should answer:

- what slice was this?
- what kind of work was it?
- how much context growth happened?
- what runtime or agent carried it?
- how many retries happened?
- what kind of handoff or restart burden remained?
- how much human effort was required?

---

## Field groups

### 1. Identity

- `slice_id`
- `project_id` or example id
- `round_id` if relevant
- `task_shape`
- `risk_posture` when materially relevant

### 2. Context usage

- `cold_boot_budget`
- `exploration_events`
- `expansion_events`
- `expansion_reason_present`
- `delegation_events`
- `handoff_size_class`

### 3. Runtime / agent fit

- `runtime_id`
- `agent_class` when useful
- `capability_profile`
- `reasoning_depth`
- `trust_hosting_posture` when relevant

### 4. Retry and execution shape

- `retry_count`
- `retry_pattern`
- `tool_use_class` optionally
- `elapsed_time_class` optionally

### 5. Review and human effort

- `human_review_level`
- `manual_rescue_required`
- `validation_outcome`

### 6. Restart quality

- `handoff_required`
- `handoff_quality`
- `restart_burden`

---

## Example value vocabulary

A small vocabulary is enough for the first version.

### Context budget

- `minimal`
- `moderate`
- `extended`

### Retry pattern

- `none`
- `changed-strategy`
- `repeated-without-change`

### Human review level

- `none`
- `light-review`
- `substantial-review`
- `manual-rescue`

### Validation outcome

- `validated`
- `review-required`
- `blocked`
- `escalated`
- `incomplete`

### Handoff quality

- `not-needed`
- `compact`
- `inflated`
- `restart-still-heavy`

---

## Minimal example

```txt
slice_id: cris-routing-approval-round-2
project_id: crisis-monitor
round_id: 2
task_shape: bounded-execution
cold_boot_budget: minimal
exploration_events: 1
expansion_events: 0
expansion_reason_present: yes
delegation_events: 0
handoff_size_class: compact
runtime_id: codex
capability_profile: balanced-executor
reasoning_depth: standard
trust_hosting_posture: externally-hosted-allowed
retry_count: 1
retry_pattern: changed-strategy
human_review_level: light-review
manual_rescue_required: no
validation_outcome: validated
handoff_required: yes
handoff_quality: compact
restart_burden: low
```

This is only an example of shape.
Projects may store the same meaning differently.

---

## Recommended first-use rules

Use the model lightly at first:

- one record per meaningful slice
- prefer classes over fake precision
- record reasons when expansion happened
- record whether retries changed strategy
- record whether the next round still needed heavy replay

This is enough to support later review without pretending that the framework already has a full runtime layer.

---

## What good use looks like

A healthy first-use pass should make it easier to compare:

- one slice against another
- one runtime choice against another
- one handoff pattern against another
- one retry posture against another

without requiring perfect measurement.

---

## What not to do yet

Do not treat this model as:

- a hard schema requirement
- a scoring engine
- an automatic router input
- a benchmark suite by itself
- a substitute for human review

Those belong later in the roadmap.

---

## Suggested next reading

- `docs/context-resource-telemetry-spec.md`
- `docs/waste-heuristics.md`
- `docs/resource-aware-operations-roadmap.md`
