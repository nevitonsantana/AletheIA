# Agent Harness Governance — Operational Examples

Concrete examples that exercise the
[Agent Harness Governance Extension](../../docs/contracts/agent-harness-governance-extension.md).
They show how an AletheIA-compatible harness validates, authorizes, executes, budgets,
and returns structured observations for model-proposed actions — without naming any
specific model or provider.

In every scenario the model **proposes**; the harness **decides and executes**.

## 1. Read-only task — allowed

### Scenario

A user asks: "Find the current owner of service `billing-api`."

### Classification

```yaml
tool_requested: "search_service_registry"
risk_class: "read_only"
side_effect_class: "none"
resource_scope: "project"
```

### Harness decision

```yaml
permission_decision:
  tool_name: "search_service_registry"
  decision: "allow"
  policy_rule: "read_only_allow_when_scoped"
  reason: "Read-only, no side effect, within project scope."
```

### Structured observation

```json
{
  "status": "success",
  "summary": "Owner found.",
  "items": [{"id": "svc_billing_api", "owner": "team-payments", "evidence_ref": "registry://services/billing-api"}],
  "next_valid_actions": ["produce_final_answer"]
}
```

## 2. Draft-only task — allowed

### Scenario

A user asks: "Prepare a reply to the customer's refund question."

### Classification

```yaml
tool_requested: "draft_email"
risk_class: "draft_only"
side_effect_class: "local_artifact"
resource_scope: "session"
```

### Harness decision

```yaml
permission_decision:
  tool_name: "draft_email"
  decision: "run_as_draft_only"
  policy_rule: "draft_only_allow_when_scoped"
  reason: "Preparing an artifact creates no external commitment."
```

### Structured observation

```json
{
  "status": "success",
  "summary": "Draft created.",
  "items": [{"id": "draft_123", "title": "Customer response draft", "evidence_ref": "artifact://drafts/draft_123"}],
  "next_valid_actions": ["review_draft", "request_send_approval"]
}
```

## 3. Commit — approval-gated

### Scenario

After the draft is reviewed, the model proposes sending it.

### Classification

```yaml
tool_requested: "send_email"
risk_class: "communication"
side_effect_class: "external_commitment"
resource_scope: "external"
```

### Harness decision

```yaml
permission_decision:
  tool_name: "send_email"
  decision: "approval_required"
  policy_rule: "external_communication_requires_approval"
  reason: "Sending an email creates an external side effect."
  approver: null
```

### Structured observation

```json
{
  "status": "approval_required",
  "summary": "Sending the email requires human approval.",
  "items": [{"id": "draft_123", "evidence_ref": "artifact://drafts/draft_123"}],
  "next_valid_actions": ["request_approval", "edit_draft"]
}
```

The model does not approve its own send. The harness pauses for a human approver.

## 4. Planning mode — blocks mutation

### Scenario

In planning mode, the model proposes deleting a stale database record while drafting a cleanup plan.

### Classification

```yaml
mode: "planning"
tool_requested: "delete_record"
risk_class: "destructive"
side_effect_class: "destructive_change"
```

### Harness decision

```yaml
permission_decision:
  tool_name: "delete_record"
  decision: "deny"
  policy_rule: "planning_mode_blocks_mutation"
  reason: "Planning mode allows read, search, ask, compare, and plan; it blocks delete and other mutations."
```

### Structured observation

```json
{
  "status": "denied",
  "summary": "Deletion is blocked in planning mode.",
  "items": [],
  "next_valid_actions": ["draft_plan", "estimate_risk", "request_execution_mode_with_approval"]
}
```

## 5. Budget exceeded

### Scenario

A long retrieval loop reaches the standard profile tool-call limit before finishing.

### Classification

```yaml
budget_profile: "standard"
max_tool_calls: 12
tool_calls_used: 12
```

### Harness decision

```yaml
enforcement:
  budget_limits_are_hard: true
  budget_exceeded_requires_stop: true
  continuation_requires_user_or_policy_approval: true
```

### Stop status

```json
{
  "status": "stopped",
  "reason": "budget_exceeded",
  "completed": false,
  "budget_exceeded": "max_tool_calls",
  "next_safe_action": "Ask the user whether to continue with a larger budget."
}
```

The agent does not continue silently. More budget is a policy decision.

## 6. Structured success result

### Scenario

A compute-only tool classifies an independent batch of records.

### Structured observation

```json
{
  "status": "success",
  "summary": "Classified 20 records.",
  "items": [{"id": "batch_001", "classified": 20, "evidence_ref": "artifact://batches/batch_001"}],
  "evidence_refs": ["artifact://batches/batch_001"],
  "next_valid_actions": ["summarize_results", "produce_final_answer"]
}
```

## 7. Structured error result

### Scenario

A write-external tool is requested without the required approval.

### Structured observation

```json
{
  "status": "error",
  "type": "permission_denied",
  "message": "Sending external email requires approval.",
  "next_valid_actions": ["draft_email", "request_approval"]
}
```

The error is a structured observation, not a silent failure or an assumed success.

## 8. Prompt-cache-aware context assembly

### Scenario

The harness assembles the request to maximize cache reuse without sacrificing relevance.

### Assembly order

```yaml
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
```

### Anti-pattern avoided

```txt
Bad:    timestamp + request_id + fresh search result + system instructions + tools + task
Better: stable tools + stable instructions + stable schemas + reference map + dynamic state + current task
```

Cache-friendliness never overrides context relevance: stable content is included only when relevant, and snippets are retrieved just-in-time.
