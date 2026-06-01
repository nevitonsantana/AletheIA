# Feature Readiness Gates

Gates a feature must pass before it advances in the product flow. They complement the
generic [readiness-gates spec](../docs/contracts/readiness-gates-spec.md) with the
product-value dimension, and operate on the
[Feature Value Governance Contract](../schemas/feature-value-governance-contract.schema.json).

These gates **do not decide**. They force the decision to be explicit, traceable, and
proportional to risk. A passing score is never a substitute for the decision and its
recorded rationale.

## The seven gates

| Gate | Question | Rule |
| --- | --- | --- |
| **Problem** | Is there a real, relevant problem? | Mandatory for Build / Test. |
| **ICP** | Does the gain land on the right audience? | If not → Park or Discovery. |
| **Lever** | Which revenue/value mechanism moves? | No lever → does not enter the roadmap. |
| **Evidence** | How strong is the evidence? | Weak evidence → Test / Discovery. |
| **Complexity** | Is the permanent cost acceptable? | High cost → scope review **or** recorded exception. |
| **Reversibility** | Can it be tested, switched off, or removed? | No reversibility → requires a technical gate. |
| **Metrics** | Is there a primary metric and guardrails? | No metric → no broad rollout. |

Each gate maps to a contract field: `problem_statement`, `target_icp`, `revenue_lever`,
`evidence_level`, `complexity_cost`, `reversibility`, `primary_metric` /
`guardrail_metrics`.

## Default decisions

| Decision | When to use | Obligation |
| --- | --- | --- |
| **Build Now** | High value, sufficient evidence, acceptable cost, clear metric. | Ship with a rollout plan and review dates. |
| **Test First** | Promising value, incomplete evidence. | Build the smallest coherent test. |
| **Discovery First** | Problem, ICP, or lever still fragile. | Investigate before building. |
| **Park** | Plausible idea, no urgency/capacity. | Record a resumption criterion. |
| **Kill** | Low value, high complexity, or misalignment. | Record the reason; avoid political recycling. |
| **Sunset** | Existing feature without traction or with unjustifiable permanent cost. | Create a migration/removal plan. |

## Enforced obligations

These are checked by the contract schema and by the `feature-value-governance` skill:

1. **Born measurable.** A `build_now` or `test_first` verdict requires `primary_metric`,
   at least one `guardrail_metric`, an `owner`, and `review_dates` (30/90).
2. **High cost is never silent.** `complexity_cost.level: high` + `verdict: build_now`
   requires `decision.exception_approval` — an explicit scope reduction or a named
   approval of the permanent cost. (Schema-enforced.)
3. **Evidence and uncertainty together.** `evidence_level` must carry both `strength`
   and an `uncertainty` note. A high score with low evidence is a flag, not a pass.
4. **No orphan features.** `opportunity_tree_node: none` is allowed only with an explicit
   rationale; otherwise the Lever/ICP gates route to Discovery.

## Gate → decision flow (default)

```
problem? ──no──▶ Kill / Discovery
   │yes
ICP? ──no──▶ Park / Discovery
   │yes
lever? ──no──▶ not on roadmap
   │yes
evidence strong? ──no──▶ Test / Discovery
   │yes
complexity acceptable? ──no──▶ scope review OR recorded exception
   │yes
reversible? ──no──▶ technical gate first
   │yes
metric + guardrails? ──no──▶ no broad rollout
   │yes
        ▶ Build Now (with rollout + 30/90 review)
```

## Scoring matrix (decision aid, not the decision)

Weights sum to 100. Each criterion scored 0–5. **The total is an aid to a conversation,
never a verdict.** Two features with the same total can warrant opposite decisions once
evidence and uncertainty are read.

| Criterion | Weight | Scale |
| --- | --- | --- |
| Real pain | 15 | 0–5 |
| Evidence | 15 | 0–5 |
| ICP fit | 10 | 0–5 |
| Revenue/value lever | 20 | 0–5 |
| Value-proposition reinforcement | 10 | 0–5 |
| Permanent cost | 15 | 0–5 (5 = low cost) |
| Reversibility | 10 | 0–5 |
| Risk of not doing | 5 | 0–5 |

## 30/90-day review checklist

- Did the primary metric improve?
- Did any guardrail get worse?
- Did adoption come from the expected ICP?
- Did support cost increase?
- Did the feature strengthen or dilute the value proposition?
- Has the flag been removed or given an expiry date?
- Is the decision now expand, iterate, limit, or remove?
