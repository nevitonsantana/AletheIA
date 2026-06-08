# Agent Action Audit Record

> Posture: `docs_first`, `advisory_first`. Describes a record's required fields; implements no runtime,
> logger, or storage. Provider-agnostic.

## Goal

Define the **minimum** record that proves what happened when an agent took (or was denied) an action:
which skill, which task, which tool, what risk, which verdict, what evidence, and whether a human
approved. "Audit proves" — without this record, a permission decision is just a claim.

## Minimum record

```yaml
agent_action_audit_record:
  task_id:
  agent_id:
  skill_id:
  autonomy_level:        # observe | advise | act_with_approval | autonomous_within_bounds
  tool_name:
  action_type:
  risk_class:            # coarse (low|medium|high|critical) or authoritative class
  policy_version:
  policy_verdict:        # allow | deny | require_approval | transform | log_only
  approval_required:
  approval_by:
  evidence_refs:
  knowledge_packs_used:
  restrictions_applied:
  timestamp:
  result_summary:
```

This is the **minimum** for declaration and review. It is not a new logging system.

## Reconciliation with existing observability

The runtime harness already defines a per-event and per-action record:

- `trace_event` / `minimum_events` in
  [agent-harness-governance-extension.md](agent-harness-governance-extension.md);
- the per-action JSON Schema
  [`agent-harness-governance-record.schema.json`](../../schemas/agent-harness-governance-record.schema.json);
- knowledge-side logging in [knowledge-audit-log-spec.md](knowledge-audit-log-spec.md);
- slice-level telemetry in [slice-telemetry-model.md](slice-telemetry-model.md).

This audit record is a **skill-and-policy-oriented view** over those: it names the fields a reviewer
needs to connect *skill → tool → verdict → evidence → approval*. When emitting real traces, populate
the governance record/schema; this document says which of those fields are non-negotiable for audit of
a skill-driven action. Where they overlap, the governance record schema is authoritative for structure.

## Non-negotiable fields

At minimum, a recorded action must carry: `skill_id`, `task_id`, `tool_name`, `policy_verdict`,
`evidence_refs`, and — when the verdict was `require_approval` — `approval_by`.

## See also

- [policy-verdicts.md](policy-verdicts.md) — the `policy_verdict` values.
- [agent-harness-governance-extension.md](agent-harness-governance-extension.md) — trace events + record schema.
- [autonomy-levels.md](../concepts/autonomy-levels.md), [tool-risk-taxonomy.md](../concepts/tool-risk-taxonomy.md).
