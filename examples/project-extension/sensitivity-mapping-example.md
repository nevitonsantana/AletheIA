# Sensitivity Mapping — Example

## Goal

Show how a project extension publishes a mapping from its local sensitivity labels to the canonical framework taxonomy.

The labels below are fictional. Replace with the project's real label set in actual use.

---

## Mapping table

```yaml
sensitivity_mapping:
  project: example-acme
  authoritative_source: example-acme internal DMS labels
  last_reviewed: 2026-05-28
  reviewer: example-acme legal + example-acme privacy
  review_cycle: yearly

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

  notes: |
    Local label "private" is intentionally NOT in this table because
    example-acme deprecated it in 2025. Any legacy document still tagged
    "private" must be re-labeled before registration as a knowledge pack.
```

---

## Why this layout

- **`project`** identifies the scope of the mapping. The same label can mean different things in different projects.
- **`authoritative_source`** points at the system that owns the local labels. The mapping does not own them — it adapts them.
- **`reviewer` and `review_cycle`** make the mapping itself a versioned artifact, not a static comment.
- **`notes`** is the place to record retired labels, edge cases, and known ambiguities. Future readers reach for this first.

---

## How a pack consumes the mapping

A pack manifest stores **only the canonical value**:

```yaml
knowledge_pack:
  id: example-acme-customer-handling
  name: Customer Data Handling Procedure
  type: operating_model
  owner: example-acme-policy-owner
  version: 2.0.0

  sensitivity: confidential            # mapped from local "customer-data"
  authority_level: procedural

  # ... rest of the manifest
```

The mapping table is the audit trail for *why* `customer-data` became `confidential`. The manifest does not carry that history.

---

## Validation expectations

- Every pack in this project extension should have its `sensitivity` derived through this table.
- A pack whose source bears a label not in the table is **not eligible for registration** until the table is updated.
- A label that maps to a regulated level (`regulated`) must be reviewed by legal and privacy; the `reviewer` field records that.

---

## See also

- [sensitivity-vocabulary-mapping](../../docs/contracts/sensitivity-vocabulary-mapping.md)
- [knowledge-source-contract](../../docs/contracts/knowledge-source-contract.md)
- [knowledge-pack-manifest](../../docs/contracts/knowledge-pack-manifest.md)
