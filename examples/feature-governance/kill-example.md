# Example — Kill

Low value, high complexity, weak ICP fit. The contract records *why* it was killed so the
idea is not politically recycled later without new evidence.

Illustrative record against the
[Feature Value Governance Contract](../../schemas/feature-value-governance-contract.schema.json).

```yaml
feature_value_governance_contract:
  id: FVG-2026-027
  feature_name: Fully customizable dashboard widget framework
  problem_statement: >
    One enterprise prospect asked for arbitrary drag-and-drop widgets during a sales call.
    No other signal. Sales is pushing it as a deal-closer.
  target_icp: Unclear — one prospect, not a validated segment
  user_job: "Build my own dashboard" — but the underlying job is already served by presets
  value_proposition: Weakens focus; pulls product toward a generic BI tool
  opportunity_tree_node: none
  strategic_framework_ref: example-4-layers@1.2.0
  revenue_lever:
    primary: expansion
    rationale: Claimed deal-closer, but no evidence the deal depends on it
  expected_outcome: Unclear; no behavioral hypothesis survives scrutiny
  evidence_level:
    strength: assumption
    sources: ["one sales call"]
    uncertainty: >
      No evidence of demand beyond a single prospect; high chance the deal closes without
      it; strong chance it becomes a permanent maintenance sink used by almost no one.
  complexity_cost:
    level: high
    permanent_carry: [ux, qa, documentation, operations, maintenance, support]
    drivers: New layout engine, per-widget data contracts, migration surface forever
  reversibility:
    level: one_way_door
    mechanisms: []
  risk_of_not_doing: Possibly lose one deal — unverified
  primary_metric:
    name: "n/a — no credible metric defined"
  decision:
    verdict: kill
    rationale: >
      Orphan feature (no opportunity-tree node), assumption-level evidence, one-way-door
      with high permanent cost, dilutes the value proposition. Cost/value is inverted.
      Revisit only if a validated segment and a real opportunity node appear.
  owner: a.silva (Product)
  review_dates: {}
```

**Why Kill:** Problem gate is weak and ICP gate fails (one prospect ≠ a segment); the
feature is an orphan (`opportunity_tree_node: none`) with one-way-door, high permanent
cost. Recording the kill — and its resumption condition — prevents quiet recycling under
renewed sales pressure.
