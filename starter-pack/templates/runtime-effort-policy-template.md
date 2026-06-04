# Runtime Effort Policy Template

## Goal

Instantiate the [Runtime Effort Governance Contract](../../docs/contracts/runtime-effort-governance-contract.md)
for a consumer project: a short, local policy that says how this project starts, escalates,
de-escalates, and stops effort — without rebuilding the contract.

Keep this file small. It is a local override layer, not a second contract.

> Quality is the floor. Token saving stays secondary to quality, evidence, safety, and clarity.

---

## Local effort policy

### Default start mode

Examples:
- `minimal_sufficient_effort` (recommended)
- `standard_by_default` (only if this project's slices are rarely trivial)

### Default planning depth per slice type

Map this project's common slice types to Lite / Standard / High-Assurance.

| Slice type | Default depth | Notes |
|---|---|---|
| | | |
| | | |

---

## Default intent priority

State the local priority order when user intents conflict. Must not let `cost_saving`
override the quality floor.

Examples:
- `safety > precision > autonomy > speed > cost_saving` (contract default)
- project-specific order, with justification

---

## Limits per slice type

Set local budgets. Leave blank to inherit the contract defaults
(`max_tool_iterations: 3`, `max_revision_loops: 2`).

| Slice type | max_context_expansion | max_tool_iterations | max_revision_loops |
|---|---|---|---|
| | | | |

---

## Local conflict resolution

Describe any project-specific rule for resolving escalation vs. de-escalation signals.

The contract's `signal_priority` always applies. Local rules may only **tighten** it (escalate
sooner), never loosen it (skip a required escalation).

### When to ask for approval

List the local actions that always require a human checkpoint, on top of the contract's
`human_checkpoint_required_for` list.

Examples:
- deploy to production
- schema or data migration
- changes to a shared contract or public surface

### When to execute directly

List the local actions safe to perform without a checkpoint.

Examples:
- local doc edits
- reversible config changes behind a flag

---

## Local telemetry

### When to record telemetry

Examples:
- on every escalation, de-escalation, and stop (recommended)
- on High-Assurance slices only

### Where telemetry is written

Examples:
- slice record
- project log
- handoff package

### Minimum fields kept

Inherit the contract's `telemetry_output.minimum_fields` unless this project has a reason to
extend them. Always keep `quality_floor_maintained` and `human_checkpoint_triggered`.

---

## Local mapping of Lite / Standard / High-Assurance

Describe what each depth means as concrete behavior in this project.

### Lite

### Standard

### High-Assurance

---

## Review checkpoint

After the first slices using this policy, answer:

- Did effort start too high or too low by default?
- Were any escalations missing a recorded reason?
- Did any de-escalation breach the quality floor?
- Should any local rule become a contract-level proposal?
