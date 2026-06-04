# Tool Permission Matrix

## Purpose

The model can request tools. The harness decides whether each request is allowed, denied, sandboxed, converted to draft-only, or paused for approval.

This reference details the tool contract, the risk taxonomy, the permission decision object, and the draft/commit split referenced by the [Agent Harness Governance Extension](../contracts/agent-harness-governance-extension.md).

## Tool contract

```yaml
tool:
  name: "string"
  purpose: "when to use and when not to use"
  input_schema: "strict_json_schema"
  output_schema: "structured_result_schema"
  risk_class: "read_only"
  side_effect_class: "none"
  resource_scope: "user | session | project | organization | external"
  permission_policy: "allow | deny | approval_required | stronger_auth | sandbox | draft_only"
  timeout_seconds: 30
  result_size_limit_chars: 8000
  retry_policy: "safe_retry | no_auto_retry | idempotent_only"
  audit_policy: "metadata_only"
  error_format: "structured_observation"
```

## Risk taxonomy

```yaml
risk_classes:
  read_only:
    default_policy: "allow_when_scoped"
  search_only:
    default_policy: "allow_or_policy_restricted"
  compute_only:
    default_policy: "allow_in_bounded_environment"
  draft_only:
    default_policy: "allow_when_scoped"
  write_local:
    default_policy: "allow_when_scoped_or_ask_on_risk"
  write_internal:
    default_policy: "approval_or_allowlist"
  write_external:
    default_policy: "approval_required"
  communication:
    default_policy: "draft_first_approval_to_send"
  financial:
    default_policy: "approval_plus_strong_auth"
  identity_access:
    default_policy: "approval_plus_strong_auth"
  security_sensitive:
    default_policy: "approval_or_deny_by_default"
  process_execution:
    default_policy: "sandbox_plus_allowlist_plus_timeout"
  network_open_world:
    default_policy: "sandbox_or_policy_restricted"
  destructive:
    default_policy: "deny_by_default_or_approval_with_recovery_plan"
  privileged_admin:
    default_policy: "approval_plus_strong_auth"
```

## Permission decision object

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

## Decision values

- `allow`: execute within scope.
- `deny`: do not execute; return a structured denial.
- `ask_user`: ask for clarification before deciding.
- `approval_required`: pause for scoped approval.
- `require_stronger_auth`: require stronger authentication.
- `run_in_sandbox`: execute only in a restricted environment.
- `run_as_draft_only`: prepare an artifact without committing a side effect.

## Draft vs commit

```yaml
draft_commit_examples:
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

## Structured tool result

### Success

```json
{
  "status": "success",
  "summary": "Draft created.",
  "items": [{"id": "draft_123", "title": "Customer response draft", "evidence_ref": "artifact://drafts/draft_123"}],
  "next_valid_actions": ["review_draft", "request_send_approval"]
}
```

### Error

```json
{
  "status": "error",
  "type": "permission_denied",
  "message": "Sending external email requires approval.",
  "next_valid_actions": ["draft_email", "request_approval"]
}
```

## Non-negotiables

- The model does not approve its own actions.
- Side effects require permission evaluation outside the model.
- Broad tools are avoided or encapsulated.
- Unknown arguments are rejected.
- Tool results are bounded.
- Secrets never enter the model context.
