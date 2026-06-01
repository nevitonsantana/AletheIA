# Example — Sunset

An **existing** feature without traction and with an unjustifiable permanent cost. The
verdict is `sunset` with a migration/removal plan — not a silent deprecation.

Illustrative record against the
[Feature Value Governance Contract](../../schemas/feature-value-governance-contract.schema.json).
Produced by the `sunset-decision` skill and recorded here for audit.

```yaml
feature_value_governance_contract:
  id: FVG-2026-031
  feature_name: Legacy XML import (v1 endpoint)
  problem_statement: >
    Built three years ago for a migration wave that ended. Now used by < 0.5% of accounts
    but carries an outsized maintenance and security burden.
  target_icp: A handful of legacy accounts; no new adoption in 18 months
  user_job: Import data from a format we no longer recommend
  value_proposition: Neutral-to-negative; keeps a fragile path alive
  opportunity_tree_node: none
  strategic_framework_ref: example-4-layers@1.2.0
  revenue_lever:
    primary: margin
    rationale: Removing it lowers TCO and shrinks the security surface
  expected_outcome: Lower maintenance cost and attack surface with negligible churn risk
  evidence_level:
    strength: strong
    sources: ["usage telemetry: 11 active accounts", "2 security findings in 12 months", "on-call load data"]
    uncertainty: >
      Two of the 11 accounts are strategic; migration friction for them is not yet sized.
  complexity_cost:
    level: high
    permanent_carry: [security, maintenance, operations, qa]
    drivers: Unmaintained parser, recurring CVEs, blocks a platform upgrade
  reversibility:
    level: partially_reversible
    mechanisms: [migration_plan]
  risk_of_not_doing: Ongoing security exposure and blocked platform upgrade
  primary_metric:
    name: Accounts migrated off the v1 endpoint
    target: "100% of active accounts migrated before shutdown"
    baseline: "11 active accounts"
  guardrail_metrics:
    - name: Involuntary churn from sunsetting
      must_not_exceed: "0 strategic accounts"
  rollout_plan: >
    1) Announce 90-day deprecation. 2) Provide v2 import + assisted migration for the 2
    strategic accounts. 3) Read-only grace period. 4) Decommission endpoint.
  sunset_criteria: >
    Trigger already met: usage < 1% AND permanent cost (security + upgrade block) exceeds
    value. Proceed to removal once active accounts are migrated.
  owner: r.lima (Platform)
  decision:
    verdict: sunset
    rationale: >
      Low traction, high and rising permanent cost, no live opportunity. Remove with a
      migration plan that protects the two strategic accounts.
    exception_approval: >
      n/a — this is a removal, not a high-cost build. Strategic-account migration plan
      signed off by Platform lead.
  review_dates:
    day_30: 2026-07-01
    day_90: 2026-08-30
```

**Why Sunset:** an existing feature where the Complexity gate (high, rising cost) and the
Lever gate (margin via removal) point the same way, and traction is near zero. The
obligation is a migration/removal plan with a churn guardrail — not a quiet kill.
