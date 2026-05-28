# Internal Policy Pack — Example

## Goal

Show a generic example of an internal policy registered as a knowledge pack. The policy below is fictional. Do not reuse phrasings as if they were a real corporate document.

---

## manifest.yaml

```yaml
knowledge_pack:
  id: example-internal-data-handling
  name: Example Internal Data Handling Policy
  type: operating_model            # corporate procedural authority
  owner: example-policy-owner
  version: 2.1.0

  sensitivity: confidential
  authority_level: procedural

  scope:
    - data_processing_decisions
    - vendor_review
    - product_features_touching_customer_data

  allowed_skills:
    - restricted-context-check
    - knowledge-conflict-resolution
    - feature-value-governance
  allowed_agents:
    - product-agent
    - business-design-agent

  retrieval_mode: excerpt_only
  citation_required: true
  full_text_exposure: conditional
  export_allowed: false

  human_review_required_for:
    - external_publication
    - client_delivery
    - policy_conflict
    - vendor_onboarding

  expiry:
    review_cycle: yearly
    expires_on: 2027-05-28

  source_location: internal-policy-repo://policies/data-handling
  source_integrity_notes: |
    Authoritative copy held in the internal policy repository. Pack mirrors
    metadata and capsule only. Excerpts are pulled on demand under access control.
```

---

## capsule.md (excerpt, generic)

```markdown
# Example Internal Data Handling — Capsule

## Purpose
Set procedural rules for how features handle, store, and share data classified as internal or confidential.

## When this policy is in scope
- A feature touches customer data, vendor data, or internal operational data.
- A change alters retention, sharing, or export behavior.
- A vendor is being evaluated for access to data in scope.

## Operating rules (summarized)
- Minimize data captured to what the feature demonstrably needs.
- Default retention to the shortest period acceptable for the use case.
- Sharing across trust boundaries requires named justification and review.

## Limits
- Procedural, not legal. Defers to compliance and privacy policy where they apply.
- Does not authorize new categories of data collection.

## Expected output when this policy is consulted
- Which provisions of the policy apply.
- Where the proposed change is aligned.
- Where the proposed change requires escalation.
```

---

## What this example demonstrates

- An internal policy enters the layer as a **confidential, procedural** source.
- It uses **`excerpt_only`** retrieval — agents may pull narrow excerpts under access control, never the full text.
- `full_text_exposure: conditional` means exposure is decided per task by the resolver, not by the skill.
- The pack is bound to a small set of governance skills, not to general production skills.
- Any conflict with a `mandatory` source (compliance, security, privacy) escalates per the [source-precedence-policy](../../docs/contracts/source-precedence-policy.md).

---

## What this example is not

- It is not a real corporate policy.
- It is not a redistribution template.
- It is not a substitute for the policy's authoritative copy in the internal policy repository.
