# ADR 009 — Feature Value Governance Pack

| Field | Value |
|---|---|
| Status | Accepted |
| Date | 2026-06-01 |
| Author | Neviton Santana |
| Deciders | Neviton Santana |
| Related | ADR-006 (Domain agnosticism), ADR-008 (Knowledge Governance Layer) |
| Supersedes | — |

## 1. Context

Backlogs grow from political pressure, one-off requests, and tech enthusiasm. Features
get prioritized by apparent desire but rarely pay the cognitive, technical, operational,
and support cost they add. Opportunity trees organize opportunities but seldom connect
each one to an explicit revenue/value lever, and roadmaps accept complexity with no
visible budget and no sunset criterion.

The guiding principle of this pack: **a feature is not a deliverable; it is a value bet
that consumes permanent complexity until it proves it deserves to exist.**

AletheIA already had the substrate to govern this well: the [Knowledge Governance
Layer](../concepts/knowledge-governance-layer.md) (ADR-008) for pluggable, auditable
knowledge, and a governance-pack engine (`loadGovernancePack` / `evaluateGovernance`).
What it lacked was a *product-value* governance surface: a contract, readiness gates, and
the executing capabilities. Adaptive Skills already shipped a `feature-value-governance`
skill that judged feature worth — but the lever, opportunity-tree, and complexity reads
lived as inline optional modules, and there was no contract, no gates, and no sunset
capability.

## 2. Decision

1. **Split responsibilities across three layers.** AletheIA owns the **contract, gates,
   obligations, and decision records**; Adaptive Skills owns the **executing
   capabilities**; the **strategic value lens is knowledge**, resolved at runtime — not
   committed anywhere in the pack.
2. **Ship the contract as a schema** —
   [`feature-value-governance-contract.schema.json`](../../schemas/feature-value-governance-contract.schema.json) —
   that forces each feature to declare problem, ICP, lever, evidence (with uncertainty),
   permanent cost, reversibility, primary metric, owner, decision, and review dates.
3. **Make the schema enforce the guardrails, not just document them.** High permanent cost
   approved to build requires a recorded `exception_approval`; `evidence_level.uncertainty`
   is mandatory so a score can never pose as truth; a `build_now`/`test_first` verdict
   requires at least one guardrail metric and both 30/90 review dates ("born measurable").
4. **Encode the seven gates as a runtime governance pack** —
   [`policies/feature-value-governance.v1.json`](../../policies/feature-value-governance.v1.json) —
   that the existing engine evaluates at the `before_execute` and `before_finalize` hooks,
   with `strict`/`balanced`/`relaxed` actions. The policy is *enforced*, not only written.
5. **Reuse over duplication (hybrid model).** `feature-value-governance` stays the single
   orchestrator/judge; the overlapping reads become standalone, reusable, **flat** skills
   it delegates to (`revenue-lever-mapping`, `opportunity-tree-alignment`,
   `feature-complexity-audit`), plus the genuinely new `sunset-decision`. No skill
   duplicates another's lever/complexity logic.
6. **Keep the strategic lens pluggable.** The four-layer value lens (existence, growth,
   sustainment, organization) is referenced by *role* via the `strategic_framework`
   knowledge slot — a proprietary pack or the generic `example-4-layers` — and never
   reproduced in any public skill, schema, or doc. See the
   [four-layers value lens relation map](../domain-governance-packs/four-layers-value-lens.md).
7. **One canonical lever taxonomy.** acquisition · activation · retention · expansion ·
   efficiency · margin · strategic_defense — shared by the contract, the runtime pack, and
   every skill. The orchestrator was realigned to it.
8. **Killing is a first-class outcome.** Park / Kill / Sunset leave an auditable trace and
   a resumption or removal criterion; the pack must reduce feature creep without becoming
   governance theater (few mandatory fields, concrete examples).

## 3. Consequences

**Positive**
- The "born measurable" and "high cost is never silent" obligations are enforced by both
  the schema and the engine — a non-compliant feature cannot validate or pass the gates.
- Skills stay portable and vendor-agnostic; no organization's framework leaks into them.
- The orchestrator delegates rather than duplicates, keeping the surface lean.
- A feature's worth, its lever, its permanent cost, and its sunset criterion are all on
  one auditable record.

**Negative / accepted tradeoffs**
- The runtime pack's facts (`feature.*`) must be derived from a contract record by the
  caller; the pack does not parse the contract itself. Accepted: the engine's fact model
  is generic by design, and the mapping is small and explicit.
- Two registries in Adaptive Skills (`evolution/` and `projections/`) must both include
  new skills. Accepted; reconciled separately.
- Phase 5 (validation on real features) is deliberately out of this decision — the pack
  ships first, tunes against evidence later.

## 4. Alternatives considered

- **Four independent new skills as literally specified.** Rejected: duplicates the
  lever/complexity logic the orchestrator already owns; violates the no-inflation guardrail.
- **Nested skill categories (`skills/business/…`).** Rejected: the repo uses flat skills;
  category lives in frontmatter.
- **Hard-code the four-layer lens into the contract and skills.** Rejected: it is
  proprietary and must stay pluggable (ADR-006, ADR-008).
- **Document the gates only (no runtime pack).** Rejected: documentation that isn't
  enforced drifts. Encoding the gates as an engine pack makes them executable.
- **Score-as-decision.** Rejected: the scoring matrix is a conversation aid; evidence and
  uncertainty travel with every verdict.

## 5. Relationship

- Consumes the [Knowledge Governance Layer](../concepts/knowledge-governance-layer.md)
  (ADR-008) via the `strategic_framework` slot; adds no change to its contracts.
- Adds a domain governance pack overview at
  [`docs/domain-governance-packs/product-feature-governance.md`](../domain-governance-packs/product-feature-governance.md)
  and readiness gates at [`policies/feature-readiness-gates.md`](https://github.com/nevitonsantana/AletheIA/blob/main/policies/feature-readiness-gates.md).
- Pairs with the Adaptive Skills companion changes (the four flat skills, the
  `product-value-governance` domain pack, templates, and the evolved skills).
- Only adds schemas/policies/docs/tests; modifies no existing contract.

## 6. Review

Revisit this ADR when any of the following becomes true:

- Phase 5 validation on real/historical features reveals gate thresholds or the scoring
  weights need to change.
- A second domain governance pack appears and reveals shared structure worth extracting.
- The runtime pack needs facts the generic engine fact-model cannot express.
- The lever taxonomy proves insufficient for a real organization.
