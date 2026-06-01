# Example — Test First

Promising value but **incomplete evidence**. The Evidence gate routes to a small,
coherent test rather than a full build. Note the high permanent cost — which is exactly
why the contract refuses a `build_now` here without a recorded exception, and a test is
the proportional move.

Illustrative record against the
[Feature Value Governance Contract](../../schemas/feature-value-governance-contract.schema.json).

```yaml
feature_value_governance_contract:
  id: FVG-2026-021
  feature_name: AI-assisted reply suggestions in the inbox
  problem_statement: >
    Support agents spend ~40% of handle time drafting routine replies. Leadership
    believes AI suggestions could cut that, but we have no direct evidence for our queues.
  target_icp: Tier-1 support agents on high-volume queues
  user_job: Send a correct, on-brand reply faster without rewriting from scratch
  value_proposition: Speed without losing the human, on-brand tone
  opportunity_tree_node: OUTCOME-efficiency/reduce-handle-time
  strategic_framework_ref: example-4-layers@1.2.0
  revenue_lever:
    primary: efficiency
    rationale: Lower handle time → lower cost-to-serve at constant quality
  expected_outcome: Median handle time drops without CSAT regression
  evidence_level:
    strength: weak
    sources: ["industry benchmarks", "one internal hack-day demo"]
    uncertainty: >
      No evidence the suggestions are accurate on OUR queues; tone and accuracy risk is
      unquantified; benchmark may not transfer.
  complexity_cost:
    level: high
    permanent_carry: [operations, qa, maintenance, security]
    drivers: New model dependency, prompt maintenance, PII review, eval harness
  reversibility:
    level: partially_reversible
    mechanisms: [flag, cohort]
  risk_of_not_doing: Sustained high handle time; competitor parity pressure
  primary_metric:
    name: Suggestion acceptance rate (edited or sent as-is)
    target: ">= 30% acceptance in the test cohort"
    baseline: "n/a"
  guardrail_metrics:
    - name: CSAT on AI-assisted replies
      must_not_exceed: "no drop vs control"
    - name: Incorrect-info escalations
      must_not_exceed: control rate
  rollout_plan: >
    2-week shadow test on one queue, suggestions visible to agents only, measure
    acceptance and CSAT against a control group before any commitment to build.
  sunset_criteria: >
    If acceptance < 15% or CSAT drops in the test, stop and Kill the build path.
  owner: m.costa (Support Ops)
  decision:
    verdict: test_first
    rationale: >
      Value is plausible but evidence is weak and permanent cost is high. A bounded test
      buys the evidence at proportional cost before committing to a one-way investment.
  review_dates:
    day_30: 2026-07-15
    day_90: 2026-09-13
```

**Why Test First:** the Lever and ICP gates pass, but the Evidence gate fails (weak) and
the Complexity gate flags high permanent cost. Building now would require an exception;
the proportional move is a small test that produces the missing evidence.
