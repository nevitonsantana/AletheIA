# Knowledge Pack Manifest

## Goal

Specify the conceptual YAML manifest that represents a knowledge pack on disk. A pack is the unit registered in the [knowledge registry](../concepts/knowledge-governance-layer.md) and resolved by the [knowledge resolver](../concepts/knowledge-resolver.md).

This is a documental contract. There is no runtime parser yet.

---

## Pack directory layout (recommended)

```text
knowledge-packs/
  <pack-id>/
    manifest.yaml
    capsule.md
    usage-policy.md
    version-history.md
    source-map.md
    full-source.md          # OR source-link.md, depending on policy
    examples/
```

Files beyond `manifest.yaml` and `capsule.md` are optional but recommended.

---

## Manifest schema (conceptual)

```yaml
knowledge_pack:
  # Identity
  id: <kebab-case-id>                 # required, unique within project/org
  name: <human-readable>              # required
  type: <source_type>                 # required; see knowledge-source-contract
  owner: <person-or-team>             # required
  version: <semver>                   # required

  # Classification
  sensitivity: public | internal | confidential | restricted | regulated   # required
  authority_level: mandatory | normative | procedural | strategic | interpretive | evidence_proxy | evidential | comparative | contextual   # required

  # Use
  scope:                              # required; task families the source informs
    - <scope-tag>
  allowed_skills:                     # optional allowlist; empty = governed by scope only
    - <skill-id>
  allowed_agents:                     # optional allowlist
    - <agent-id>

  # Retrieval
  retrieval_mode: capsule_first | excerpt_only | metadata_only | full_source_allowed | human_review_required | blocked   # required
  citation_required: true | false     # required
  full_text_exposure: allowed | forbidden | conditional   # required
  export_allowed: true | false        # required

  # Review
  human_review_required_for:          # required list (may be empty)
    - external_publication
    - client_delivery
    - policy_conflict
  expiry:
    review_cycle: weekly | monthly | quarterly | yearly   # required
    expires_on: <ISO date or null>    # required

  # Provenance
  source_location: <link | path | registry-ref>   # required
  source_integrity_notes: |           # required, free text
    How authenticity and provenance are established for this source.

  # Optional
  prerequisite_sources: []
  supersedes: []
  tags: []
```

---

## Worked example (generic)

```yaml
knowledge_pack:
  id: example-4-layers
  name: Example Strategic Framework
  type: proprietary_framework
  owner: example-owner
  version: 1.0.0

  sensitivity: internal             # local label "private" maps to internal per sensitivity-vocabulary-mapping
  authority_level: interpretive

  scope:
    - business_design
    - product_strategy
    - feature_governance

  allowed_skills:
    - strategic-value-analysis
    - feature-value-governance
    - opportunity-tree-alignment
  allowed_agents:
    - product-agent
    - business-design-agent
    - design-agent

  retrieval_mode: capsule_first
  citation_required: true
  full_text_exposure: forbidden
  export_allowed: false

  human_review_required_for:
    - external_publication
    - client_delivery
    - policy_conflict

  expiry:
    review_cycle: quarterly
    expires_on: null

  source_location: knowledge-packs/example-4-layers/full-source.md
  source_integrity_notes: |
    Maintained by the example-owner. Changes tracked in version-history.md.
    Capsule reviewed alongside every minor version bump.
```

> Note: the sensitivity vocabulary in this manifest uses the framework taxonomy (`public | internal | confidential | restricted | regulated`). If a project uses local labels (e.g. `private`), it maps them explicitly in its project extension — see [sensitivity-vocabulary-mapping](sensitivity-vocabulary-mapping.md) and [the mapping example](https://github.com/nevitonsantana/AletheIA/blob/main/examples/project-extension/sensitivity-mapping-example.md).

---

## Validation rules (documental)

A manifest is *well-formed* when:

- all required fields are present
- `type` is a known source type
- `sensitivity` and `authority_level` use the defined vocabularies
- `retrieval_mode` is one of the six defined modes
- if `retrieval_mode: capsule_first`, a `capsule.md` exists
- if `full_text_exposure: forbidden`, no examples include verbatim source text
- if `sensitivity` is `restricted` or `regulated`, `human_review_required_for` is not empty
- `expiry.review_cycle` is set even when `expires_on` is null

A manifest that fails validation is registered at *minimal* maturity only.

---

## See also

- [knowledge-source-contract](knowledge-source-contract.md)
- [skill-knowledge-dependency-contract](skill-knowledge-dependency-contract.md)
- [restricted-knowledge-usage-policy](restricted-knowledge-usage-policy.md)
- [knowledge-audit-log-spec](knowledge-audit-log-spec.md)
