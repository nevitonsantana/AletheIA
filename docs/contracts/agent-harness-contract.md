# Agent Harness Contract — Specification

## Purpose

Define the **per-task declaration** an agent operates within: autonomy, allowed tools and skills,
blocked actions, required gates, expected sensors, observability, rollback, human review, and the
context policy. The conceptual background and the boundary table are in
[concepts/agent-harness-contract.md](../concepts/agent-harness-contract.md).

This contract is docs-first and advisory-first. It declares an envelope; it does not execute,
authorize, or enforce. Per-action authorization and the action trace are governed by the
[Agent Harness Governance Extension](agent-harness-governance-extension.md) (AHGE); effort is
governed by the [Runtime Effort Governance Contract](runtime-effort-governance-contract.md) (REGC);
authorized context is governed by the [Knowledge Source Contract](knowledge-source-contract.md).

## Non-goals

- No runtime, orchestrator, policy engine, or permission automation.
- No restating of REGC effort logic, AHGE permission logic, or Knowledge Governance authority — the
  contract references them (see [Mapping](#mapping-to-regc-ahge-and-knowledge-governance)).
- No new "Harness Governance Layer" — this is a contract (see [ADR-013](../adr/ADR-013-agent-harness-contract.md)).

## Declaration shape

```yaml
agent_harness_contract:
  contract_id: ahc-001
  task_id: <task-id>
  agent_id: <agent-or-runtime>
  date: <YYYY-MM-DD>
  autonomy_level: observe | advise | act_with_approval | autonomous_within_bounds

  task_boundary:
    objective: <what the agent is allowed to accomplish>
    non_goals:
      - <what the agent must not do>
    risk_level: low | medium | high | critical
    reversibility: reversible | partially_reversible | hard_to_reverse

  allowed_skills:
    - <skill-id>
  blocked_skills:
    - <skill-id>

  allowed_tools:
    - name: <tool-name>
      permission: read | write | execute
      constraints:
        - <constraint>

  blocked_actions:
    - <action>

  context_policy:
    allowed_knowledge_packs:
      - <pack-id@version>
    retrieval_mode: capsule_first | excerpt_only | metadata_only | none
    max_context_scope: task_only | project | repository | workspace

  gates:
    before_write: true
    before_delete: true
    before_external_call: true
    before_structural_change: true
    before_final_answer: true

  sensors:
    computational:
      - test_suite
      - linter
      - typecheck
      - schema_validation
    inferential:
      - review_skill
      - architecture_review
      - risk_review

  observability:
    trace_required: true
    tool_log_required: true
    decision_log_required: true
    evidence_required: true

  rollback:
    required: true
    strategy: git_diff | revert_commit | feature_flag | manual_restore

  human_review:
    required: true
    reviewer_role: product | design | engineering | governance | security
```

## Autonomy taxonomy

The four levels declare *how much authority* the agent holds. Each maps onto AHGE planning/execution
mode and `decision_authority` — it does not introduce a parallel permission model.

| `autonomy_level` | Meaning | AHGE mapping |
|---|---|---|
| `observe` | read and report only; no side effects | execution blocked; read-only tools; no commit |
| `advise` | propose changes as drafts; never commit | draft-only; commit decision deferred to human |
| `act_with_approval` | may commit, but side effects pass a gate | `approval_required` decisions on write/delete/external |
| `autonomous_within_bounds` | acts within a declared budget and blocked-action list | harness-authorized within budget; high-risk still needs human authority |

`autonomy_level` is *how much authority*; the Adaptative Skills `execution-modes` (basic / extended
/ high-risk / multi-agent) are *how deep* the work runs. They are orthogonal axes.

## Normative invariants

These are the safety rules the [schema](../../schemas/agent-harness-contract.schema.json) enforces
structurally:

1. **No unguarded write above low risk.** If `risk_level` is `medium`, `high`, or `critical` and any
   `allowed_tools[].permission` is `write` or `execute`, then `gates.before_write` must be `true`.
2. **No irreversible action without recovery.** If `reversibility` is `hard_to_reverse`, then
   `rollback.required` and `human_review.required` must both be `true`.
3. **Bounded autonomy.** If `autonomy_level` is `autonomous_within_bounds`, then `blocked_actions`
   must list at least one action and `rollback.required` must be `true`.

## Mapping to REGC, AHGE, and Knowledge Governance

The contract composes the existing surfaces; it does not re-decide them.

```yaml
ahc_mapping:
  REGC:
    provides: ["effort_level", "escalation", "stop_conditions", "quality_floor"]
    ahc_inherits: "the slice effort; AHC does not re-decide it"
  AHGE:
    provides: ["permission_decision", "draft_commit_split", "planning_mode", "runtime_budgets", "per_action_record"]
    ahc_relationship:
      autonomy_level: "maps to planning/execution mode + decision_authority"
      gates: "map to draft/commit policy + permission decision object"
      allowed_tools_permission: "maps to AHGE tool registry risk/side-effect class"
      observability: "the trace IS the AHGE per-action record"
  knowledge_governance:
    provides: ["source_authority", "sensitivity", "precedence", "restrictions"]
    ahc_relationship:
      context_policy: "references allowed_knowledge_packs + retrieval_mode; never decides authority"
```

## Related

- [ADR-013 — Agent Harness Contract](../adr/ADR-013-agent-harness-contract.md)
- [Agent-Computer Interface](../concepts/agent-computer-interface.md)
- [Context-Rot Controls](../concepts/context-rot-controls.md)
- [Harness Expiration Review Checklist](../reference/harness-expiration-review-checklist.md)
- Examples: `examples/harness/codex-debugging-harness.md`, `examples/harness/codex-testing-harness.md`
