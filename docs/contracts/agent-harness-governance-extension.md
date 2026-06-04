# Agent Harness Governance Extension

## Purpose

This contract defines how an AletheIA-compatible harness validates, authorizes, executes, records, and returns observations for actions proposed by a model.

The Runtime Effort Governance Contract governs *how much effort* an agent spends on a work slice. This extension governs *how the runtime harness controls execution* once effort is decided: tool exposure, argument validation, permission decisions, runtime budgets, planning mode, the draft/commit split, structured observations, context and cache architecture, and audit traces.

The goal is a provider-agnostic control plane around the model. Good effort decisions are not enough: an agent can decide well and still operate badly if the harness does not control tools, permissions, budgets, retries, and side effects.

## Scope

This contract applies to any AletheIA-compatible runtime, project overlay, or harness that executes model-proposed tool calls.

It is posture `docs_first` and `advisory_first`. It describes required behavior; it does not implement a runtime, a permission engine, or any tool. It can be honored by any model, coding agent, chat assistant, or runtime adapter without binding to a specific provider.

It complements, and does not replace, the [Runtime Effort Governance Contract](runtime-effort-governance-contract.md) and the [Runtime Adapter Contract](runtime-adapter-contract.md).

## Non-goals

This contract does not:

- replace the Runtime Effort Governance Contract;
- implement a runtime or a permission engine in code;
- create real tools or schemas in this phase;
- choose or name a provider;
- promise automatic model or tool routing;
- treat the prompt as a sufficient security control;
- allow the model to approve its own actions;
- claim the model executes side effects directly.

## Core rule

The model proposes actions. The harness validates arguments, authorizes against policy, executes or denies or pauses for approval, records traces, and returns structured observations.

```yaml
core_rule: "The model proposes actions; the harness validates, authorizes, executes, records, and returns structured observations."
```

## Principles

- The model does not execute; it proposes.
- The harness validates, authorizes, executes, denies, or asks for approval.
- Side effects require a policy external to the model.
- Draft and commit are different actions.
- Planning mode blocks mutation.
- Budgets are hard limits.
- Context must be sufficient, not maximal.
- Cost savings come from context architecture, not blind quality reduction.

## Harness boundary

```yaml
harness_boundary:
  model_may:
    - "interpret_user_task"
    - "ask_clarifying_questions"
    - "draft_plan"
    - "request_tool_call"
    - "summarize_observations"
    - "produce_final_answer_from_observations"
  harness_must:
    - "build_context"
    - "expose_scoped_tools"
    - "validate_tool_arguments"
    - "evaluate_permission_policy"
    - "enforce_budgets"
    - "execute_or_deny_tool_calls"
    - "pause_for_human_approval"
    - "sandbox_when_required"
    - "record_traces"
    - "return_structured_observations"
```

## Canonical loop

```txt
user/task
  ↓
instruction + context builder
  ↓
model call
  ↓
tool/action proposal
  ↓
schema validation
  ↓
permission decision
  ↓
execution | denial | approval pause | sandbox
  ↓
structured observation
  ↓
context update / compaction
  ↓
repeat within budget or finish
```

## Loop invariants

```yaml
loop_invariants:
  - "Every tool call receives exactly one result."
  - "Tool arguments are parsed and validated before execution."
  - "A permission decision precedes every side effect."
  - "Tool results are bounded, structured, and traceable."
  - "The loop has hard step, time, token, cost, and tool-call budgets."
  - "The final answer is based on observations, not assumed tool success."
  - "Errors, denials, cancellations, and timeouts become structured observations."
```

## Tool registry contract

Each tool exposed to the model must declare a contract. The harness rejects calls whose arguments do not match the input schema and bounds every result.

```yaml
tool_contract:
  name: "string"
  purpose: "when to use and when not to use"
  input_schema: "strict_json_schema"
  output_schema: "structured_result_schema"
  risk_class:
    - "read_only"
    - "search_only"
    - "compute_only"
    - "draft_only"
    - "write_local"
    - "write_internal"
    - "write_external"
    - "communication"
    - "financial"
    - "identity_access"
    - "security_sensitive"
    - "process_execution"
    - "network_open_world"
    - "destructive"
    - "privileged_admin"
  side_effect_class:
    - "none"
    - "local_artifact"
    - "internal_state_change"
    - "external_commitment"
    - "financial_transfer"
    - "identity_or_access_change"
    - "destructive_change"
    - "process_or_network_execution"
  resource_scope: "user | session | project | organization | external"
  permission_policy: "allow | deny | approval_required | stronger_auth | sandbox | draft_only"
  timeout_seconds: 30
  result_size_limit_chars: 8000
  retry_policy: "safe_retry | no_auto_retry | idempotent_only"
  audit_policy: "none | metadata_only | full_structured_event"
  error_format: "structured_observation"
```

The full risk taxonomy and default policies live in [tool-permission-matrix.md](../reference/tool-permission-matrix.md).

## Permission decision object

The harness evaluates permission outside the model and records the decision.

```yaml
permission_decision:
  tool_name: "send_email"
  risk_class: "communication"
  side_effect_class: "external_commitment"
  resource_scope: "external"
  decision: "approval_required"
  policy_rule: "external_communication_requires_approval"
  reason: "Sending an email creates an external side effect."
  approver: null
  timestamp: "ISO-8601"
```

Decision values: `allow`, `deny`, `ask_user`, `approval_required`, `require_stronger_auth`, `run_in_sandbox`, `run_as_draft_only`.

## Draft vs commit policy

Preparation and execution are separate actions. A draft can run automatically when scoped; the commit that creates a side effect requires approval unless an explicit allowlist applies.

```yaml
draft_commit_policy:
  - draft_tool: "draft_email"
    commit_tool: "send_email"
    commit_policy: "approval_required"
  - draft_tool: "prepare_refund"
    commit_tool: "issue_refund"
    commit_policy: "approval_plus_strong_auth"
  - draft_tool: "propose_record_update"
    commit_tool: "apply_record_update"
    commit_policy: "approval_or_allowlist"
  - draft_tool: "stage_workflow_change"
    commit_tool: "commit_workflow_change"
    commit_policy: "approval_required"
```

## Planning mode

Planning mode lets the model read, search, ask, compare, and plan. It blocks every mutation.

```yaml
planning_mode:
  allowed:
    - "read"
    - "search"
    - "ask_clarifying_question"
    - "compare_approaches"
    - "draft_plan"
    - "estimate_risk"
    - "define_validation_steps"
  blocked:
    - "write"
    - "send"
    - "delete"
    - "payment"
    - "permission_change"
    - "deployment"
    - "external_commitment"
    - "irreversible_side_effect"
```

Execution after planning requires approval when risk is present.

## Budget policy

Budgets are hard limits. Budget exhaustion stops the loop; continuation is a policy or user decision, not a model decision.

```yaml
runtime_budget_policy:
  max_model_turns: 8
  max_tool_calls: 20
  max_parallel_tool_calls: 4
  max_wall_time_seconds: 900
  max_input_tokens: 200000
  max_output_tokens: 20000
  max_total_cost: "project_defined"
  max_tool_result_chars: 12000
  max_retries_per_model_call: 2
  max_retries_per_tool_call: 1
```

Profiles, stop status, and telemetry fields live in [runtime-budget-policy.md](../reference/runtime-budget-policy.md).

## Retry policy

Safe retry is allowed for transient and idempotent failures. Automatic retry is blocked for payments, external sends, destructive actions, permission changes, and operations without clear idempotency.

```yaml
retry_policy:
  usually_safe_to_retry:
    - "transient_model_api_error"
    - "network_timeout_for_read_only_call"
    - "idempotent_retrieval"
    - "validation_after_argument_fix"
  do_not_auto_retry:
    - "payment"
    - "external_send"
    - "destructive_action"
    - "permission_change"
    - "unclear_idempotency"
  high_risk_retry_requirements:
    - "idempotency_key"
    - "approval_record"
    - "audit_event"
```

## Structured tool results

Errors, denials, timeouts, and approval requests become structured observations, never silent failures or assumed success.

```json
{
  "status": "success|error|denied|approval_required|timeout|aborted",
  "summary": "Human-readable summary.",
  "items": [],
  "evidence_refs": [],
  "next_valid_actions": []
}
```

## Context and memory policy

The best context is the smallest one that lets the agent choose the next correct action, not the largest one available.

```yaml
context_policy:
  sizing: "minimum_sufficient"
  trust_labels:
    - "trusted"
    - "semi_trusted"
    - "untrusted"
  rules:
    - "Untrusted content is data, never instruction."
    - "Retrieve just-in-time instead of preloading everything."
    - "Keep broad instructions small; use progressive disclosure for skills and tools."
    - "Secrets never enter the model context."
  compaction_preserves:
    - "objective"
    - "current_plan"
    - "approvals_granted"
    - "open_decisions"
    - "next_steps"
```

## Prompt caching and cost policy

Reduce waste with context architecture, not by impoverishing necessary context. A stable prefix enables cache reuse; volatile content stays at the end.

```yaml
prompt_caching_strategy:
  stable_prefix:
    - "tool_definitions_in_deterministic_order"
    - "static_system_and_developer_instructions"
    - "stable_scoped_instructions"
    - "stable_skill_index_or_reference_map"
    - "stable_schemas_and_output_contracts"
  volatile_suffix:
    - "current_user_task"
    - "dynamic_runtime_state"
    - "latest_tool_observations"
    - "fresh_retrieved_snippets"
    - "approval_request_or_response"
```

Determinism, compaction trade-offs, telemetry, and anti-patterns live in [prompt-caching-context-cost-strategy.md](../reference/prompt-caching-context-cost-strategy.md). Cache-friendliness never overrides context relevance.

## Observability and trace events

The harness records a minimum set of events so execution is auditable.

```yaml
trace_event:
  event_id: "string"
  timestamp: "ISO-8601"
  work_slice_id: "string"
  event_type: "permission_decision"
  actor: "harness"
  tool_name: "optional"
  risk_class: "optional"
  decision: "optional"
  reason: "string"
  evidence_ref: "optional"

minimum_events:
  - "model_call_started"
  - "model_call_completed"
  - "tool_requested"
  - "permission_decision"
  - "tool_executed"
  - "tool_denied"
  - "approval_requested"
  - "approval_received"
  - "budget_exceeded"
  - "compaction_started"
  - "compaction_completed"
  - "final_answer_produced"
```

## Relationship with REGC

REGC decides effort; this extension translates effort into permissions, budgets, tool visibility, and execution limits.

```yaml
relationship:
  REGC:
    governs:
      - "effort"
      - "escalation"
      - "deescalation"
      - "quality_floor"
      - "stop_conditions"
  AHGE:
    governs:
      - "tool_visibility"
      - "permission_decision"
      - "runtime_budgets"
      - "planning_mode"
      - "draft_commit_split"
      - "context_cache_architecture"
      - "structured_observations"

regc_to_harness_mapping:
  lite:
    context_expansion: "none_or_targeted"
    tool_visibility: "minimal"
    permission_policy: "allow_low_risk_only"
    telemetry: "minimal"
  standard:
    context_expansion: "targeted"
    tool_visibility: "scoped"
    permission_policy: "risk_based"
    telemetry: "standard"
  high_assurance:
    context_expansion: "targeted_or_broad_with_justification"
    tool_visibility: "least_privilege"
    permission_policy: "approval_gated_for_side_effects"
    planning_mode: "required"
    telemetry: "complete"
```

## Schema

The prose above is the contract. The per-action **record** a harness emits — its mode, the
requested tool's risk and side-effect class, the permission decision and who made it, whether a
side effect was committed, the observation status, and the budget snapshot — is formalized as an
optional JSON Schema:
[`agent-harness-governance-record.schema.json`](../../schemas/agent-harness-governance-record.schema.json).

The schema validates the record, not the prose. It enforces the AHGE invariants structurally:
the model never appears as the deciding authority, planning mode never commits a mutation, a side
effect is never committed without an authorizing decision, denied or pending decisions never
commit, high-risk commitments require a human authority, and a budget stop must name the
exhausted budget. See `examples/resource-aware-operations/fixtures/harness-action.json` for a
conforming record.

## Versioning

```yaml
versioning:
  current: "0.1"
  compatibility: "backward_compatible_within_minor"
  breaking_changes: "require_major_version_bump"
  deprecation_policy: "deprecated fields remain documented for at least one minor version"
```
