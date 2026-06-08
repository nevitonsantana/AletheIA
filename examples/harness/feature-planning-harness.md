# Example — feature-planning harness

A worked [Agent Harness Contract](../../docs/contracts/agent-harness-contract.md) for a planning
task: turn a feature idea into a reviewable plan. Planning produces no side effects, so the agent
stays at `advise` — it proposes, it does not commit — and the only gate is before the final answer.

```yaml
agent_harness_contract:
  contract_id: ahc-002
  task_id: plan-feature-001
  agent_id: codex
  autonomy_level: advise
  task_boundary:
    objective: turn a feature idea into a reviewable plan with goals, non-goals, and risks
    non_goals:
      - write or modify code
      - commit any change
      - decide whether the feature ships
    risk_level: low
    reversibility: reversible
  allowed_skills:
    - write-spec
    - architecture-review
  allowed_tools:
    - name: file_read
      permission: read
    - name: repo_search
      permission: read
  gates:
    before_write: true
    before_delete: true
    before_external_call: true
    before_structural_change: true
    before_final_answer: true
  sensors:
    computational:
      - schema_validation
    inferential:
      - architecture_review
      - risk_review
  observability:
    trace_required: true
    tool_log_required: true
    decision_log_required: true
    evidence_required: true
  rollback:
    required: false
  human_review:
    required: true
    reviewer_role: product
```

## Why it is shaped this way

- **`advise`** — planning never commits. The agent proposes a plan; the decision to act on it is a
  human one. No write/execute tool is listed, so the "no unguarded write" invariant is not even in
  play.
- **Read-only tools** — `file_read` and `repo_search` gather context without side effects, matching
  `reversibility: reversible` and the planning intent.
- **`before_final_answer` gate** — the one gate that matters here: the plan is reviewed before it is
  presented as final.
- **Feature-value boundary** — `non_goals` make explicit that *whether the feature ships* is a
  Feature Value Governance decision, not the harness's; the harness only governs how the planning
  agent operates.
- **`rollback.required: false`** — permitted because the task is reversible and read-only; the
  invariant only forces rollback for `hard_to_reverse` tasks or `autonomous_within_bounds` autonomy.
