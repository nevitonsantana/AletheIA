# Example — Codex debugging, per-action policy flow

A worked **policy/verdict** walkthrough for a Codex `debugging` task. Where
[`../harness/codex-debugging-harness.md`](../harness/codex-debugging-harness.md) shows the per-task
*envelope* (the [Agent Harness Contract](../../docs/contracts/agent-harness-contract.md)), this
example shows what the harness *decides per action* and *records* — the
[policy verdicts](../../docs/contracts/policy-verdicts.md) and the
[audit record](../../docs/contracts/agent-action-audit-record.md).

This is an **operational** skill: it may act, but only with approval at the gates it declared. The
upstream per-skill declaration is the Adaptative Skills
`examples/harness-requirements/debugging-harness-requirements.yaml`
(`autonomy.ceiling: act_with_approval`). All content here is synthetic.

## Three proposed actions, three verdicts

### Action 1 — read a source file (allowed)

```yaml
proposed_action: { tool: filesystem.read, args: { path: src/parser.ts } }
risk_class: read_only            # coarse: low
policy_verdict: allow            # harness decision: allow
reason: "Read-only inspection, within task scope."
```

```yaml
agent_action_audit_record:
  task_id: debug-issue-001
  agent_id: codex
  skill_id: debugging
  autonomy_level: act_with_approval
  tool_name: filesystem.read
  action_type: read
  risk_class: low
  policy_verdict: allow
  approval_required: false
  evidence_refs: [repro_path]
  result_summary: "Inspected parser.ts; located the failing branch."
```

### Action 2 — run the repro test (allowed, logged)

```yaml
proposed_action: { tool: shell.test, args: { cmd: "pytest tests/test_parser.py -k repro" } }
risk_class: compute_only         # coarse: medium
policy_verdict: log_only         # harness: allow + full_structured_event
reason: "Bounded test execution; logged for traceability."
```

The verdict is `log_only` — the action runs, but the harness records a full structured event because
the skill's `audit_requirements.log_tool_calls` is true.

### Action 3 — delete a file (denied → escalated to approval)

```yaml
proposed_action: { tool: filesystem.delete, args: { path: src/old_parser.ts } }
risk_class: destructive          # coarse: critical
policy_verdict: require_approval # harness decision: approval_required
reason: "Deletion is destructive; the skill declared filesystem.delete as require_approval and a
         before_destructive_action gate."
```

```yaml
agent_action_audit_record:
  task_id: debug-issue-001
  skill_id: debugging
  tool_name: filesystem.delete
  risk_class: critical
  policy_verdict: require_approval
  approval_required: true
  approval_by: null              # paused, awaiting human
  result_summary: "Action paused at before_destructive_action gate; not executed."
```

## What this demonstrates

- An operational skill **acts** (Actions 1–2) but **never bypasses a declared gate** (Action 3).
- The verdict is decided by the harness, not the skill or the model — the skill only *declared* that
  `filesystem.delete` is `require_approval`; the harness *enforced* it.
- Every action leaves an audit record connecting `skill_id → tool → verdict → evidence`.

Contrast with [`feature-value-advise-only-example.md`](feature-value-advise-only-example.md), where a
**consultative** skill produces a verdict but is never permitted to act.
