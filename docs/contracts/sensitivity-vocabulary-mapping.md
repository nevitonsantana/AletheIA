# Sensitivity Vocabulary Mapping

## Goal

Lock the **canonical sensitivity vocabulary** for the Knowledge Governance Layer and specify how project extensions map their local labels to it.

The taxonomy is part of framework core. Local labels are project-extension concern. This document settles which is which and how the boundary is held.

---

## Canonical taxonomy

The framework recognizes **exactly five** sensitivity levels:

| Level | Meaning |
|---|---|
| `public` | Free to use, cite, export. No exposure controls beyond general policy. |
| `internal` | In-scope for the project or organization. Summary-only outside that boundary. |
| `confidential` | Restricted to authorized people, agents, and skills. Capsule-only by default. |
| `restricted` | Highly controlled. Limited exposure, no export, audit always required. |
| `regulated` | Subject to legal, regulatory, or contractual constraints. Behavior follows the regulation. |

These five values are the *only* admissible values of `sensitivity` in a [knowledge pack manifest](knowledge-pack-manifest.md). The [JSON Schema](../../schemas/aletheia-knowledge-pack.schema.json) enforces them.

Effects per level are spelled out in [knowledge-source-contract](knowledge-source-contract.md) and [restricted-knowledge-usage-policy](restricted-knowledge-usage-policy.md).

---

## Why these five

- **Two levels would not be enough.** A binary `public | internal` cannot distinguish "use within the org" from "use only with authorization" from "subject to regulation". Decisions stop being safe.
- **Seven or more would be too many.** Each level needs a distinct behavioral consequence (citation, exposure, export, logs, review). Adding levels without distinct consequences invites label drift.
- **The boundaries are behavioral, not bureaucratic.** Each step up tightens at least one of: who can consult, what may be cited, what may be exposed, what is logged, when review is required.

The vocabulary is intentionally orthogonal to `authority_level`. A `regulated` persona is still a persona; a `public` framework can still be `mandatory`.

---

## Mapping discipline for project extensions

Many projects already classify documents using local labels — `private`, `secret`, `top secret`, `pii`, `client-only`, regulatory tags, internal labels carried over from a DMS. These labels do **not** enter the framework taxonomy. They map to it.

### Rules

1. **The manifest stores only canonical values.** A pack's `sensitivity` field is one of the five canonical levels. Local labels never appear there.
2. **The mapping is written down.** Every project extension that uses local labels publishes a mapping table in its project-extension layer (typically `examples/project-extension/<project>/sensitivity-mapping.md` or the equivalent in the consumer overlay).
3. **The mapping is monotonic.** If a label maps to `confidential` in one task family, it cannot map to `internal` in another. If finer distinction is needed, refine the label upstream, not the mapping.
4. **When in doubt, escalate one level.** A `private` document with no further context maps to `confidential`, not `internal`.
5. **Regulated labels always map to `regulated`.** Anything tied to a named regulation (privacy law, sectoral rule, contractual data clause) maps to `regulated` regardless of local convention.

### A worked mapping

A project using its own labels might publish:

```yaml
sensitivity_mapping:
  project: example-acme
  authoritative_source: example-acme internal DMS labels
  mapping:
    public-website:        public
    public-docs:           public
    internal-only:         internal
    employee-confidential: confidential
    customer-data:         confidential
    secret:                restricted
    top-secret:            restricted
    gdpr-personal-data:    regulated
    hipaa-phi:             regulated
  review_cycle: yearly
  reviewer: example-acme legal + example-acme privacy
```

The pack manifest then carries the canonical value:

```yaml
knowledge_pack:
  id: example-acme-customer-handling
  sensitivity: confidential          # mapped from local "customer-data"
  # ...
```

The mapping table is owned by the project extension, not by the framework.

---

## What this resolves

- **`private` vs `internal`.** Some projects use `private` to mean "inside the org" and some use it to mean "inside the team". The first maps to `internal`; the second maps to `confidential`. The mapping table forces the project to declare which.
- **Mixed regulatory labels.** Anything regulatory maps to `regulated` regardless of local naming. The local label is preserved in the mapping table for traceability; the manifest uses `regulated`.
- **DMS legacy labels.** Labels inherited from a document management system rarely match the framework one-to-one. The mapping table is the integration point; it does not require renaming source labels.

---

## What this does not change

- The [retrieval modes](knowledge-pack-manifest.md) (`capsule_first | excerpt_only | …`) and the [authority taxonomy](knowledge-source-contract.md) remain independent vocabularies.
- The [source precedence policy](source-precedence-policy.md) is unaffected; precedence is over authority, not sensitivity.
- The [restricted-knowledge-usage-policy](restricted-knowledge-usage-policy.md) keeps the per-level behavior table as the single source of truth for what each level allows or forbids.

---

## Validation expectations

- A manifest whose `sensitivity` is not one of the five canonical values is rejected by the schema and is not eligible for any maturity above `minimal`.
- A project extension that uses local labels without publishing a mapping table SHOULD be flagged in review.
- A mapping that places a regulated label below `regulated` MUST be rejected in review.

---

## See also

- [knowledge-source-contract](knowledge-source-contract.md)
- [knowledge-pack-manifest](knowledge-pack-manifest.md)
- [restricted-knowledge-usage-policy](restricted-knowledge-usage-policy.md)
- Example: [project-extension/sensitivity-mapping-example.md](https://github.com/nevitonsantana/AletheIA/blob/main/examples/project-extension/sensitivity-mapping-example.md)
