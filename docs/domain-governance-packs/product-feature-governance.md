# Product Feature Governance Pack

> A feature is not a deliverable. A feature is a **value bet that consumes permanent
> complexity** until it proves it deserves to exist.

This domain governance pack defines how AletheIA governs the evaluation of new
features, opportunities, and existing features — by value, revenue lever, permanent
cost, reversibility, metrics, and sunset criteria. It is **docs-first**,
**vendor-agnostic**, and meant to be driven by agents and humans alike.

It governs the contract and gates. The *capabilities* that produce the analysis live
as flat skills in the Adaptive Skills repo. The *strategic lens* (a 4-layers value
framework, or any equivalent) is supplied as a **knowledge pack**, never hard-coded
here — see [How the strategic lens plugs in](#how-the-strategic-lens-plugs-in).

## What problem this pack solves

- Backlogs grow from political pressure, one-off requests, or tech enthusiasm, with no
  sufficient value filter.
- Features get prioritized by apparent desire but rarely pay the cognitive, technical,
  operational, and support cost they add.
- Opportunity trees organize opportunities but seldom connect each one to an explicit
  revenue, margin, retention, or strategic-defense lever.
- Roadmaps accept complexity with no visible complexity budget and no sunset criterion.

## The three layers of the pack

| Layer | Responsibility | Artifacts |
| --- | --- | --- |
| **Strategic lens** (knowledge pack) | Provide the value lens: existence, growth, sustainment, organization. | Resolved via the `strategic_framework` knowledge slot. |
| **AletheIA** | Define the contract, gates, obligations, and depth of evaluation. | [Feature Value Governance Contract](../../schemas/feature-value-governance-contract.schema.json), [readiness gates](../../policies/feature-readiness-gates.md), decision record. |
| **Adaptive Skills** | Execute the contextual analyses and rituals. | `feature-value-governance` (orchestrator), `revenue-lever-mapping`, `opportunity-tree-alignment`, `feature-complexity-audit`, `sunset-decision`. |

## Artifacts in this repo

- **Contract schema** — [`schemas/feature-value-governance-contract.schema.json`](../../schemas/feature-value-governance-contract.schema.json):
  the minimum fields a feature must declare to advance.
- **Readiness gates** — [`policies/feature-readiness-gates.md`](../../policies/feature-readiness-gates.md):
  the seven gates and the default Build / Test / Discovery / Park / Kill / Sunset decisions.
- **Worked examples** — [`examples/feature-governance/`](../../examples/feature-governance/):
  `build`, `test`, `kill`, and `sunset` decision records against the contract.
- **Runtime governance pack** — [`policies/feature-value-governance.v1.json`](../../policies/feature-value-governance.v1.json):
  the seven gates and born-measurable obligations encoded as engine-evaluable rules
  (`before_execute` and `before_finalize` hooks), so the policy is *enforced* by the
  AletheIA engine, not only documented. Loaded via `loadGovernancePack` and evaluated
  with `evaluateGovernance`.

## When to use the contract

- A new feature is a candidate for the roadmap.
- A relevant expansion of an existing feature.
- A stakeholder request that carries engineering or design cost.
- An opportunity derived from an opportunity tree.
- An existing feature that needs to be reviewed, simplified, or removed.

## How the strategic lens plugs in

This pack treats the strategic framework as **pluggable knowledge**, not as committed
content. Skills declare a `strategic_framework` knowledge dependency (see the
[skill-knowledge-dependency contract](../contracts/skill-knowledge-dependency-contract.md));
the [Knowledge Governance Layer](../concepts/knowledge-governance-layer.md) resolver
decides which pack — proprietary or a generic `example-4-layers` — fills it under the
active permissions.

Consequence: the four-layer value lens (existence / growth / sustainment / organization)
is referenced by *role*, never reproduced verbatim in this public pack. Proprietary
framework content stays in its own pack outside the public repos.

## Guardrails this pack enforces

- **No inflated framework.** Few mandatory fields, few documents, concrete examples.
- **Score is not truth.** Every recommendation must state its evidence *and* its
  uncertainty. The scoring matrix is an aid to a decision, never the decision.
- **Born measurable.** Every approved feature is born with a primary metric, a
  guardrail, an owner, and a review date (30/90 days).
- **High permanent cost is never silent.** A high-complexity feature approved to build
  requires an explicit scope reduction or a recorded exception approval (enforced by the
  contract schema).
- **Killing is not failure.** Park / Kill / Sunset decisions leave an auditable trace and
  a resumption or removal criterion.

## Related

- [Feature readiness gates](../../policies/feature-readiness-gates.md)
- [Knowledge Governance Layer](../concepts/knowledge-governance-layer.md)
- Adaptive Skills: `feature-value-governance`, `revenue-lever-mapping`,
  `opportunity-tree-alignment`, `feature-complexity-audit`, `sunset-decision`.
