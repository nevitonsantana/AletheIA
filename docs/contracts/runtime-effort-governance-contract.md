# Runtime Effort Governance Contract

## Purpose

This contract defines how AletheIA-governed agents decide runtime effort for a work slice.

It governs cognitive effort, context expansion, tool usage, escalation, de-escalation, signal priority, intent conflict resolution, stop conditions, human checkpoints, minimum telemetry, and versioning.

The goal is not to minimize tokens at any cost. The goal is to preserve quality while avoiding unnecessary resource waste.

## Scope

This contract applies to work slices handled by an AletheIA-compatible runtime or project overlay.

It can be used by any model, coding agent, chat assistant, runtime adapter, or project-specific harness.

This contract specifies operational behavior; it does not explain it. For the planning-depth vocabulary it builds on, see [planning-depth-profiles.md](../reference/planning-depth-profiles.md). For the signals it reacts to, see [effort-escalation-signals.md](../reference/effort-escalation-signals.md).

## Non-goals

This contract does not:

- choose a model;
- implement automatic model routing;
- replace runtime adapters;
- replace planning-depth profiles;
- replace readiness gates;
- replace token policy;
- create a heavy policy engine.

## Core rule

AletheIA must start each work slice with the lowest sufficient effort, escalate only when observable signals justify it, de-escalate when the task becomes bounded, and stop when the next step requires human authority, not more reasoning.

## Quality policy

Quality is the floor. Token saving is secondary.

The agent must not reduce required quality, evidence, safety, or clarity for token savings.

If the quality floor is at risk, the agent must escalate effort, ask for missing context, or stop with an explicit limitation.

```yaml
quality_policy:
  quality_floor: "required"
  token_saving_priority: "secondary"
  rule: "Do not reduce required quality, evidence, safety, or clarity for token savings."
```

## Default effort policy

```yaml
default_policy:
  start_mode: "minimal_sufficient_effort"
  escalation_mode: "evidence_based"
  deescalation_allowed: true
  human_checkpoint_required_for:
    - "irreversible_action"
    - "external_side_effect"
    - "high_cost_change"
    - "ambiguous_tradeoff"
    - "risk_exceeds_authority"
```

## Work slice classification

```yaml
work_slice_classification:
  task_type:
    - "answer"
    - "edit"
    - "plan"
    - "code_change"
    - "review"
    - "research"
    - "automation"
  reversibility:
    - "high"
    - "medium"
    - "low"
  blast_radius:
    - "local"
    - "multi_file"
    - "systemic"
    - "external_system"
  uncertainty:
    - "low"
    - "medium"
    - "high"
  risk_of_error:
    - "low"
    - "medium"
    - "high"
  context_need:
    - "none"
    - "local"
    - "project"
    - "external"
  tool_need:
    - "none"
    - "read_only"
    - "write"
    - "execute"
```

## User intent model

The user should not be required to choose an abstract reasoning level. The user may express operational intent.

```yaml
user_intent:
  priority:
    - "speed"
    - "precision"
    - "safety"
    - "autonomy"
    - "cost_saving"
  confirmation_style:
    - "ask_before_write"
    - "ask_on_risk"
    - "autonomous_with_summary"
```

## Intent conflict resolution

User intent informs effort, but does not override quality, safety, reversibility, or authority boundaries.

```yaml
intent_resolution:
  rule: "User intent informs effort, but does not override quality, safety, reversibility, or authority boundaries."
  priority_order:
    - "safety"
    - "precision"
    - "autonomy"
    - "speed"
    - "cost_saving"
  conflict_rules:
    - "safety overrides all other intents."
    - "precision overrides speed when risk_of_error is medium or high."
    - "cost_saving never overrides quality_floor."
    - "autonomy is limited by human_checkpoint_required_for."
    - "speed may reduce verbosity, but not required validation."
```

## Effort budget

```yaml
effort_budget:
  initial_depth:
    - "lite"
    - "standard"
    - "high_assurance"
  max_depth:
    - "lite"
    - "standard"
    - "high_assurance"
  max_context_expansion:
    - "none"
    - "targeted"
    - "broad"
  max_tool_iterations: 3
  max_revision_loops: 2
```

## Escalation triggers

The agent may escalate only when at least one observable trigger is present.

```yaml
escalation_triggers:
  - "missing_required_context"
  - "conflicting_requirements"
  - "multi_file_dependency_detected"
  - "test_or_validation_failure"
  - "low_confidence"
  - "security_privacy_or_compliance_risk"
  - "irreversible_or_external_action"
  - "risk_exceeds_authority"
  - "quality_floor_at_risk"
```

## De-escalation triggers

The agent may reduce effort when the task becomes bounded and no blocking escalation signal is active.

```yaml
deescalation_triggers:
  - "scope_became_local"
  - "required_context_found"
  - "risk_confirmed_low"
  - "answer_sufficient_without_more_tools"
```

## Signal priority order

Escalation signals override de-escalation signals when quality, safety, reversibility, or authority is at risk.

```yaml
signal_priority:
  rule: "Escalation signals override de-escalation signals when quality, safety, reversibility, or authority is at risk."

  always_escalate:
    - "security_privacy_or_compliance_risk"
    - "irreversible_or_external_action"
    - "risk_exceeds_authority"
    - "quality_floor_at_risk"

  escalate_before_deescalate:
    - "test_or_validation_failure"
    - "conflicting_requirements"
    - "low_confidence"

  conditional_escalation:
    - "multi_file_dependency_detected"
    - "missing_required_context"

  deescalate_only_when_no_blocking_risk:
    - "answer_sufficient_without_more_tools"
    - "scope_became_local"
    - "risk_confirmed_low"
    - "required_context_found"
```

## Stop conditions

The agent must stop when continuing would add cost without improving quality or when the next step requires human authority.

```yaml
stop_conditions:
  - "sufficient_quality_reached"
  - "budget_exhausted"
  - "human_decision_required"
  - "risk_exceeds_authority"
  - "next_action_is_not_reversible"
```

## Human checkpoint rules

The agent must stop and request a human decision — not more reasoning — when an action crosses the authority boundary.

```yaml
human_checkpoint:
  required_for:
    - "irreversible_action"
    - "external_side_effect"
    - "high_cost_change"
    - "ambiguous_tradeoff"
    - "risk_exceeds_authority"
  behavior: "stop, summarize the decision needed, and wait for human confirmation"
  rule: "More reasoning must not substitute for human authority."
```

## Telemetry requirements

```yaml
telemetry:
  record_effort_decision: true
  record_escalation_reason: true
  record_deescalation_reason: true
  record_stop_reason: true
  record_context_expansion: true
  record_tool_iterations: true
  record_quality_floor_risk: true
```

## Telemetry output format

The contract does not require a heavy telemetry engine. It defines a minimum structured output that adapters and projects can implement.

```yaml
telemetry_output:
  format: "structured_log"
  minimum_fields:
    - "slice_id"
    - "task_type"
    - "classification"
    - "user_intent"
    - "initial_effort"
    - "final_effort"
    - "escalation_count"
    - "escalation_reasons"
    - "deescalation_count"
    - "deescalation_reasons"
    - "stop_reason"
    - "human_checkpoint_triggered"
    - "quality_floor_maintained"
    - "context_expansion_level"
    - "tool_iterations"
    - "timestamp"
```

Example:

```yaml
runtime_effort_telemetry:
  slice_id: "slice-2026-06-02-001"
  task_type: "code_change"
  classification:
    reversibility: "medium"
    blast_radius: "multi_file"
    uncertainty: "medium"
    risk_of_error: "medium"
    context_need: "project"
    tool_need: "write"
  user_intent:
    priority: ["precision", "cost_saving"]
    confirmation_style: "ask_on_risk"
  initial_effort: "standard"
  final_effort: "high_assurance"
  escalation_count: 1
  escalation_reasons:
    - "multi_file_dependency_detected"
  deescalation_count: 0
  deescalation_reasons: []
  stop_reason: "human_decision_required"
  human_checkpoint_triggered: true
  quality_floor_maintained: true
  context_expansion_level: "targeted"
  tool_iterations: 2
  timestamp: "2026-06-02T00:00:00Z"
```

## Versioning

```yaml
versioning:
  current: "0.1"
  compatibility: "backward_compatible_within_minor"
  breaking_changes: "require_major_version_bump"
  deprecation_policy: "deprecated fields must remain documented for at least one minor version"
```

## Relationship with planning-depth profiles

Lite, Standard, and High-Assurance remain the planning-depth vocabulary.

This contract defines when to start, escalate, reduce, or stop across those profiles.

## Relationship with runtime adapters

Runtime adapters translate the contract into local runtime behavior.

The contract must not name a vendor as the default implementation.

Example:

```yaml
runtime_mapping_example:
  lite:
    runtime_behavior: "targeted read, minimal planning, concise output"
  standard:
    runtime_behavior: "short plan, related context inspection, focused validation"
  high_assurance:
    runtime_behavior: "dependency mapping, explicit plan, validation, checkpoint before risky action"
```

## Relationship with waste heuristics

Waste heuristics detect inefficient behavior. This contract defines the operational response.

Examples:

- if context expansion produces no relevant signal, de-escalate or stop;
- if tool calls repeat without progress, stop or ask for human direction;
- if a simple local change triggers unnecessary planning, reduce depth;
- if a concise answer risks quality, escalate;
- if a de-escalation signal appears while quality floor is at risk, do not de-escalate.

## Examples

See [runtime-effort-contract-example.md](https://github.com/nevitonsantana/AletheIA/blob/main/examples/resource-aware-operations/runtime-effort-contract-example.md).

## Schema

The prose above is the contract. The per-slice **record** an agent emits — its
classification, intent, effort decision, escalation/de-escalation reasons, stop reason, and
minimum telemetry — is formalized as an optional JSON Schema:
[`runtime-effort-governance-contract.schema.json`](../../schemas/runtime-effort-governance-contract.schema.json).

The schema validates the record, not the prose. It constrains signal names to the defined
catalog and enforces the "never silent" guardrails: escalation/de-escalation counts must
match recorded reasons, a breached quality floor must coincide with a human checkpoint or an
authority/budget stop, and a triggered checkpoint must stop for an authority or
irreversibility reason. See `examples/resource-aware-operations/fixtures/standard-slice.json`
for a conforming record.

## Relationship to other contracts

- [effort-escalation-signals.md](../reference/effort-escalation-signals.md) — the catalog of escalation, de-escalation, stop, waste, and risk signals this contract reacts to, plus their priority order.
- [planning-depth-profiles.md](../reference/planning-depth-profiles.md) — the Lite / Standard / High-Assurance vocabulary this contract starts, escalates, and de-escalates across.
- [waste-heuristics.md](../reference/waste-heuristics.md) — detects inefficient behavior; this contract defines the operational response to it.
- [token-policy.md](../reference/token-policy.md) — token discipline rules; this contract keeps token saving subordinate to the quality floor.
- [runtime-adapter-contract.md](runtime-adapter-contract.md) — what any adapter must honor when translating this contract into local runtime behavior.
- [readiness-gates-spec.md](readiness-gates-spec.md) — whether a slice is ready to continue; this contract uses gates to separate execution problems from authority problems.
- [slice-telemetry-model.md](slice-telemetry-model.md) — the minimal slice-level telemetry model the effort telemetry output extends.
