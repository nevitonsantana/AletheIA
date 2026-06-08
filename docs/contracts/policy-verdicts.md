# Policy Verdicts

> Posture: `docs_first`, `advisory_first`. Describes vocabulary and required behavior; implements no
> runtime, permission engine, or tool. Provider-agnostic.

## Goal

Name the small set of outcomes a permission decision can produce, so skills, contracts, and audit
records share one vocabulary. A **verdict** is what the harness decides about a proposed action — it
is decided *outside* the model and recorded.

## Verdicts (declaration vocabulary)

```yaml
policy_verdicts:
  allow:           { meaning: "Action may execute." }
  deny:            { meaning: "Action must not execute." }
  require_approval:{ meaning: "Action pauses until explicit human approval." }
  transform:       { meaning: "Action may execute only after being reduced, masked, scoped, or converted." }
  log_only:        { meaning: "Action may execute but must be logged due to a traceability requirement." }
```

These five are the vocabulary a **skill** or reviewer uses to talk about outcomes (e.g. a
`restricted_tools[].restriction` in a per-skill `harness_requirements`).

## Reconciliation with the harness decision values

The runtime harness emits a richer set of decision values, defined authoritatively in
[agent-harness-governance-extension.md](agent-harness-governance-extension.md) and
[tool-permission-matrix.md](../reference/tool-permission-matrix.md):
`allow, deny, ask_user, approval_required, require_stronger_auth, run_in_sandbox, run_as_draft_only`.

The five verdicts above are a **projection** of those values for declaration and review. Map them:

| Verdict (declaration) | Harness decision value(s) (enforcement) |
|---|---|
| `allow` | `allow` |
| `deny` | `deny` |
| `require_approval` | `approval_required` (or `require_stronger_auth` for high-risk) |
| `transform` | `run_as_draft_only`, `run_in_sandbox` (scoped/converted execution) |
| `log_only` | `allow` **with** `audit_policy: full_structured_event` |

`ask_user` (clarification before deciding) has no declaration-level verdict; it is a harness behavior
that precedes a verdict. When declaration and harness disagree, the harness decision values govern;
the verdict vocabulary is for human-readable declaration and audit.

## See also

- [agent-action-audit-record.md](agent-action-audit-record.md) — where the verdict is recorded.
- [tool-permission-matrix.md](../reference/tool-permission-matrix.md) — decision values + per-class defaults.
- [tool-risk-taxonomy.md](../concepts/tool-risk-taxonomy.md) — what feeds the verdict.
