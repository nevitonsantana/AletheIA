# Runtime Budget Policy

## Purpose

Budgets define hard limits for turns, tool calls, time, tokens, cost, retries, and result size.

This reference details the budget profiles, stop status, retry policy, parallelization rules, and telemetry referenced by the [Agent Harness Governance Extension](../contracts/agent-harness-governance-extension.md).

## Core policy

```yaml
runtime_budget_policy:
  version: "0.1"
  default_limits:
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
  enforcement:
    budget_limits_are_hard: true
    budget_exceeded_requires_stop: true
    continuation_requires_user_or_policy_approval: true
```

## Budget profiles

```yaml
budget_profiles:
  lite:
    max_model_turns: 2
    max_tool_calls: 3
    max_parallel_tool_calls: 2
    max_wall_time_seconds: 120
    max_context_expansion: "none_or_targeted"
    max_retries_per_tool_call: 0
  standard:
    max_model_turns: 6
    max_tool_calls: 12
    max_parallel_tool_calls: 4
    max_wall_time_seconds: 600
    max_context_expansion: "targeted"
    max_retries_per_tool_call: 1
  high_assurance:
    max_model_turns: 10
    max_tool_calls: 30
    max_parallel_tool_calls: 4
    max_wall_time_seconds: 1800
    max_context_expansion: "targeted_or_broad_with_justification"
    max_retries_per_tool_call: 1
```

## Stop status

```json
{
  "status": "stopped",
  "reason": "budget_exceeded",
  "completed": false,
  "budget_exceeded": "max_tool_calls",
  "next_safe_action": "Ask the user whether to continue with a larger budget."
}
```

## Retry policy

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

## Parallelization policy

```yaml
parallelization:
  safe_candidates:
    - "search"
    - "read"
    - "retrieve_metadata"
    - "classify_independent_records"
    - "summarize_independent_documents"
  serialize:
    - "writes"
    - "sends"
    - "deletes"
    - "financial_actions"
    - "permission_changes"
    - "shell_or_process_execution"
    - "multi_step_external_workflow_commits"
```

## Budget telemetry

```yaml
budget_telemetry:
  fields:
    - "session_id"
    - "work_slice_id"
    - "budget_profile"
    - "model_turns_used"
    - "tool_calls_used"
    - "parallel_tool_calls_peak"
    - "wall_time_seconds"
    - "input_tokens_used"
    - "output_tokens_used"
    - "estimated_cost"
    - "tool_result_chars_peak"
    - "retries_used"
    - "stop_reason"
    - "budget_exceeded"
```

## Non-negotiables

- Budgets are explicit before long loops.
- Budget exhaustion stops the loop.
- The agent does not continue silently beyond budget.
- High-risk retry requires idempotency and approval records.
- More budget is a policy decision, not a model decision.
