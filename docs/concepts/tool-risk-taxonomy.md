# Tool Risk Taxonomy

> Posture: `docs_first`, `advisory_first`. Describes vocabulary and required behavior; implements no
> runtime, permission engine, or tool. Provider-agnostic.

## Goal

Give skills a **coarse** way to label the risk of a tool they expect to use, and connect that coarse
label to the **authoritative** fine-grained taxonomy the harness reasons over.

A skill should not have to choose among fifteen risk classes to declare "I read files and run tests."
So this document defines a four-class coarse scale for **declaration**, and maps it onto the full
taxonomy used for **enforcement**.

## Coarse classes (for skill declaration)

Used in the Adaptative Skills per-skill `harness_requirements` (`expected_tools[].risk_class`).

```yaml
tool_risk_classes:
  low:
    examples: [filesystem.read, git.diff, docs.read]
    default_policy: allow
  medium:
    examples: [shell.test, filesystem.write, issue.draft]
    default_policy: log_or_require_approval_by_context
  high:
    examples: [dependency.upgrade, migration.generate, config.modify, external_api.write]
    default_policy: require_approval
  critical:
    examples: [filesystem.delete, database.drop, secret.read, production.deploy, email.send]
    default_policy: deny_or_require_explicit_approval
```

## Authoritative taxonomy (for harness enforcement)

The harness does **not** decide on the coarse class. It uses the fifteen-class `risk_class` taxonomy
and per-class default policy defined in
[tool-permission-matrix.md](../reference/tool-permission-matrix.md) and the tool registry contract in
[agent-harness-governance-extension.md](../contracts/agent-harness-governance-extension.md). That
matrix is the source of truth. This coarse scale is a convenience for declaration, not a replacement.

### Mapping coarse → authoritative

| Coarse (declaration) | Authoritative classes (enforcement) |
|---|---|
| `low` | `read_only`, `search_only`, `compute_only`, `draft_only` |
| `medium` | `write_local`, `write_internal` |
| `high` | `write_external`, `communication`, `network_open_world`, `process_execution` |
| `critical` | `financial`, `identity_access`, `security_sensitive`, `destructive`, `privileged_admin` |

When a skill's coarse class and the matrix disagree, **the matrix wins** — the coarse label is a hint,
the matrix is policy. A coarse `medium` tool that the matrix classes as `destructive` is enforced as
`destructive`.

## Relationship to risk inference

This taxonomy classes the *tool*. [structured-risk-inference.md](structured-risk-inference.md) reasons
about the *task/decision* risk that triggers extra scrutiny. Both feed the permission decision; neither
replaces the other.

## See also

- [tool-permission-matrix.md](../reference/tool-permission-matrix.md) — authoritative classes + default policies.
- [autonomy-levels.md](autonomy-levels.md) — the orthogonal authority axis.
- [policy-verdicts.md](../contracts/policy-verdicts.md) — the outcomes a permission decision can take.
