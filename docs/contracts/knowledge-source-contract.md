# Knowledge Source Contract

## Goal

Define the contract that every knowledge source must satisfy to be usable by agents and skills under the [Knowledge Governance Layer](../concepts/knowledge-governance-layer.md).

This is a conceptual contract. The on-disk shape lives in [knowledge-pack-manifest](knowledge-pack-manifest.md).

---

## Required fields

| Field | Meaning |
|---|---|
| `id` | stable, kebab-case identifier, unique inside the project / org |
| `name` | human-readable name |
| `type` | one value from the source taxonomy below |
| `owner` | accountable person or team for accuracy, review, and retirement |
| `version` | semver; bump on any content or scope change |
| `sensitivity` | one of `public`, `internal`, `confidential`, `restricted`, `regulated` |
| `authority_level` | one of `mandatory`, `normative`, `procedural`, `strategic`, `interpretive`, `evidence_proxy`, `evidential`, `comparative`, `contextual` |
| `scope` | task families or domains the source is allowed to inform |
| `retrieval_mode` | default mode: `capsule_first`, `excerpt_only`, `metadata_only`, `full_source_allowed`, `human_review_required`, `blocked` |
| `citation_required` | boolean; whether outputs must cite the source |
| `full_text_exposure` | `allowed`, `forbidden`, or `conditional` |
| `export_allowed` | boolean; whether content may leave the workspace |
| `human_review_required_for` | list of conditions that force human review |
| `expiry.review_cycle` | how often the source must be re-validated |
| `source_location` | how to reach the underlying source (link, path, registry ref) |
| `source_integrity_notes` | how the source's authenticity / provenance is established |

Optional:

- `allowed_skills`, `allowed_agents` — explicit allowlists
- `prerequisite_sources` — other packs that must be present
- `supersedes` — packs this one replaces

---

## Source taxonomy

```yaml
source_types:
  compliance_policy:        { authority: mandatory,             precedence: highest }
  security_policy:          { authority: mandatory,             precedence: highest }
  privacy_policy:           { authority: mandatory,             precedence: highest }
  accessibility_guideline:  { authority: normative,             precedence: very_high }
  operating_model:          { authority: procedural,            precedence: high }
  product_strategy:         { authority: strategic,             precedence: high }
  proprietary_framework:    { authority: interpretive,          precedence: medium_high }
  design_system:            { authority: normative_or_guiding,  precedence: high }
  persona:                  { authority: evidence_proxy,        precedence: medium }
  research_finding:         { authority: evidential,            precedence: depends_on_quality }
  benchmark:                { authority: comparative,           precedence: low_medium }
  stakeholder_input:        { authority: contextual,            precedence: variable }
```

The taxonomy is intentionally small. Project extensions may *bind* their own concrete sources to these types but must not invent new top-level authority semantics in framework core.

---

## Sensitivity levels

| Level | Citation | Exposure | Export | Logs / handoffs | Human review |
|---|---|---|---|---|---|
| **public** | free under general policy | allowed | allowed | unrestricted | not required |
| **internal** | within project/org | summary only outside | discouraged | masked if cross-boundary | only if conflict |
| **confidential** | only to authorized recipients | capsule-only by default | forbidden by default | masked | required for external delivery |
| **restricted** | per explicit authorization | highly limited | forbidden | redacted | always required for use beyond reading |
| **regulated** | per legal / regulatory rules | per regulation | typically forbidden | per regulation | always required |

Higher sensitivity does **not** mean higher authority. A `regulated` persona is still a persona, not a policy.

---

## Authority semantics

- **Mandatory** sources cannot be overridden by interpretation. Conflicts route to human review or refusal, never to silent compromise.
- **Normative** sources set the default; deviations require explicit justification.
- **Procedural** sources describe how work flows; they can be adapted but not ignored.
- **Strategic** sources set direction; they constrain prioritization, not correctness.
- **Interpretive** sources help reasoning; they do not constrain compliance.
- **Evidence proxy / evidential** sources inform but do not bind.
- **Comparative / contextual** sources support, never settle.

---

## Acceptance posture

A source enters the registry only when:

1. all required fields are present and consistent
2. owner has acknowledged accountability
3. sensitivity and authority have been reviewed by someone other than the author
4. a capsule exists for any source whose default `retrieval_mode` is `capsule_first`
5. `source_integrity_notes` make the provenance auditable

A source that fails any of these is registered at *minimal* maturity (see [user-provided-knowledge](../concepts/user-provided-knowledge.md)) and is not eligible for tasks that require `governed` maturity.

---

## See also

- [knowledge-pack-manifest](knowledge-pack-manifest.md)
- [skill-knowledge-dependency-contract](skill-knowledge-dependency-contract.md)
- [source-precedence-policy](source-precedence-policy.md)
- [restricted-knowledge-usage-policy](restricted-knowledge-usage-policy.md)
