# Four-Layer Value Lens — Relation Map

How the four-layer value lens (existence, growth, sustainment, organization) relates to
the Feature Value Governance Pack — **by role, not by content**.

> **Pluggable, never committed.** The four-layer framework is proprietary. This document
> maps how *a* four-layer lens plugs into the pack; it does **not** reproduce the
> framework's content. The lens is resolved at runtime through the `strategic_framework`
> knowledge slot — a proprietary pack, or the generic `example-4-layers` — per the
> [Knowledge Governance Layer](../concepts/knowledge-governance-layer.md) and
> [ADR-009](../adr/ADR-009-feature-value-governance-pack.md).

## Where the lens enters

```
strategic_framework slot ──resolved by──▶ Knowledge Governance Layer
        │                                         │
        │  (proprietary pack OR example-4-layers) │
        ▼                                         ▼
feature-value-governance ─────────────▶ business_intent anchored to the lens
revenue-lever-mapping    ─────────────▶ lever read through the lens
opportunity-tree-alignment ───────────▶ opportunities weighed by the lens
business-design          ─────────────▶ "value-layer lens" optional module
```

No skill names the framework. Each declares the slot *type*; the resolver decides which
pack fills it under the active permissions. In generic mode (no pack), skills apply the
four layers by name and mark the reasoning as an inference.

## Layer → pack-element relation

This is a *relation map* — how each layer's concern surfaces in the pack's artifacts. The
specific criteria of any given framework live in its pack, not here.

| Layer (role) | Question it asks | Where it surfaces in the pack |
| --- | --- | --- |
| **Existence** | Should this exist at all? | Problem, ICP, and Lever gates; `problem_statement`, `target_icp`, `revenue_lever`. |
| **Growth** | Does it move a value lever? | Lever and Evidence gates; `revenue_lever`, `primary_metric`, `evidence_level`. |
| **Sustainment** | Can we carry it over time? | Complexity and Reversibility gates; `complexity_cost`, `reversibility`, `sunset_criteria`; the `sunset-decision` skill. |
| **Organization** | Who owns it and how is it measured? | Metrics gate and born-measurable obligation; `owner`, `guardrail_metrics`, `review_dates`. |

## How modes behave

- **Knowledge-aware mode** — a pack fills `strategic_framework`. Skills anchor business
  intent and the value claim to the resolved capsule and cite it as `pack_id@version`.
- **Generic mode** — no pack resolves. Skills apply the four layers by name as a general
  lens, mark the output `mode: generic`, and fabricate no citations.

## Non-negotiables

- The four-layer framework's content is **never** copied into a public skill, schema,
  example, or this document.
- Skills depend on the slot *type* (`proprietary_framework` / `product_strategy` /
  `business_design_framework`), never a specific pack id.
- A missing required slot triggers loud fallback (`stop_and_request_source`), not silent
  generic substitution.

## See also

- [Product Feature Governance pack overview](./product-feature-governance.md)
- [Feature readiness gates](../../policies/feature-readiness-gates.md)
- [Knowledge Governance Layer](../concepts/knowledge-governance-layer.md)
- [ADR-009 — Feature Value Governance Pack](../adr/ADR-009-feature-value-governance-pack.md)
