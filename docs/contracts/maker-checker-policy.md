# Maker-Checker Policy — When a Separate Verifier Is Required

## Purpose

Define **when a separate verifier (checker) is required** in addition to the agent or human that
produced the work (the maker). This is the policy behind the `adversarial_verification` pattern in
the [Execution Pattern Library](../concepts/execution-pattern-library.md) and behind the
`maker_checker_required` control in the
[execution pattern selection](execution-pattern-selection.md).

The rationale is **self-preferential bias**: an agent evaluating its own output systematically
prefers it. The maker must not be the checker — verification by the producer is self-assessment,
and self-assessment is not a gate (see [Objective Gate Policy](objective-gate-policy.md)).

## Non-goals

- No new verdict vocabulary — checker outcomes map onto the existing
  [policy verdicts](policy-verdicts.md) and the AHGE decision values
  ([agent-harness-governance-extension.md](agent-harness-governance-extension.md)); this policy
  does not redefine them.
- No runtime reviewer assignment or enforcement — the policy states when a checker is required;
  who reviews is declared in the [Agent Harness Contract](agent-harness-contract.md)
  `human_review` block and the AHC `sensors`.
- No replacement of human review — a checker agent complements, and never substitutes for, the
  human review that risk or irreversibility demands.

## When a separate checker is mandatory

`adversarial_verification` — a verifier distinct from the maker — is **required** when any of the
following holds:

```yaml
maker_checker_mandatory_when:
  - factual_error_risk          # output asserts facts a wrong answer would propagate
  - contractual_error_risk      # output feeds a commitment, contract, or published claim
  - governance_error_risk       # output changes a governed artifact, policy, or record
  - touches_sensitive_context   # restricted or sensitive context is involved
  - irreversible_side_effect_possible
```

When none of these hold and an objective gate exists, a checker is recommended but not mandatory;
the objective gate may carry the verification alone.

## The critical-task rule

**Never use another agent as the ONLY gate on a critical task.** A critical task — `risk_level:
critical`, irreversible side effects possible, or sensitive context involved — requires an
**objective gate and/or human review in addition to** any agent checker. An agent checker is itself
a model subject to error and bias; on a critical task it is one layer of verification, never the
last one.

```txt
critical task
  → agent checker alone: NOT sufficient
  → required: objective gate and/or human review, in addition to the checker
```

## Mapping checker outcomes onto existing verdicts

A checker produces a recommendation; the outcome is expressed in the **existing** vocabulary — the
five [policy verdicts](policy-verdicts.md) (`allow | deny | require_approval | transform |
log_only`) at declaration level, projecting onto the AHGE harness decision values at enforcement
level. Reference mapping (the verdict documents remain authoritative):

| Checker outcome | Declared verdict |
|---|---|
| work verified, no objection | `allow` |
| defect found, must not proceed | `deny` |
| acceptable only with human sign-off | `require_approval` |
| acceptable only after reduction, masking, or rescoping | `transform` |
| acceptable, but traceability required | `log_only` |

The checker's finding and the resulting verdict are recorded in the audit surface (see
[Execution Audit Record](execution-audit-record.md) and
[agent-action-audit-record.md](agent-action-audit-record.md)); a verification that leaves no
record is a claim, not a check.

## Related

- [Objective Gate Policy](objective-gate-policy.md) — why self-assessment is never a gate
- [Execution Pattern Selection](execution-pattern-selection.md) — `maker_checker_required` control
- [Execution Pattern Library](../concepts/execution-pattern-library.md) — `adversarial_verification`
- [Policy Verdicts](policy-verdicts.md) — the verdict vocabulary reused here
- [Agent Harness Contract](agent-harness-contract.md) — `human_review` and `sensors`
- [Agent Harness Governance Extension](agent-harness-governance-extension.md) — enforcement decision values
