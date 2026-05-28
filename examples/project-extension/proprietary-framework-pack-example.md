# Proprietary Framework Pack — Example

## Goal

Show a generic, non-confidential example of a proprietary framework registered as a knowledge pack.

The framework below is fictional. Do not treat it as a real method, and do not reuse the name in real engagements.

---

## Pack layout

```text
knowledge-packs/
  example-4-layers/
    manifest.yaml
    capsule.md
    usage-policy.md
    version-history.md
    source-map.md
    source-link.md
    examples/
```

---

## manifest.yaml

```yaml
knowledge_pack:
  id: example-4-layers
  name: Example Strategic Framework (4 Layers)
  type: proprietary_framework
  owner: example-owner
  version: 1.0.0

  sensitivity: internal
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

  source_location: knowledge-packs/example-4-layers/source-link.md
  source_integrity_notes: |
    Authored and maintained by example-owner. Capsule reviewed each release.
    Full source is held outside the workspace and referenced by link only.
```

---

## capsule.md (excerpt)

```markdown
# Example 4-Layers — Operational Capsule

## What it is for
A framework that helps connect business intent, product bets, feature shape, and operational reality across four layers.

## When to use
- Framing a strategic feature against business objectives.
- Auditing whether a proposed feature actually serves the layer it claims.
- Aligning opportunity trees with revenue and operational levers.

## When not to use
- Small UI tweaks with no strategic component.
- Tasks already governed by a higher-authority source (compliance, security, privacy).

## Concepts (operational only)
- Layer A: business intent
- Layer B: product bet
- Layer C: feature shape
- Layer D: operational footprint

## Key questions
- Which layer does the proposed change primarily affect?
- Is the change coherent across adjacent layers?
- What would falsify the bet implied by Layer B?

## Application criteria
- Use capsule alone for analysis tasks.
- Escalate to the full source only when authorized and necessary.

## Limits
- Interpretive only. Cannot override mandatory or normative sources.
- Not a replacement for user research or compliance review.

## Expected output format
- Layer-by-layer mapping
- Stated bet and falsifier
- Conflicts with higher-authority sources, if any
```

The capsule deliberately contains no verbatim text from the underlying framework.

---

## What this example demonstrates

- A proprietary framework is registered with **owner, version, sensitivity, authority, and scope**.
- It is consumed **capsule-first**; full source is not exposed.
- It is **bound to a few skills and agents**, not globally available.
- It is **interpretive**, so any conflict with a mandatory source escalates per the [source-precedence-policy](../../docs/contracts/source-precedence-policy.md).
- The capsule is **operational**, not narrative. It tells an agent how to use the framework, not what the framework is in detail.

---

## What this example is not

- It is not a real framework.
- It is not a marketing description.
- It is not a substitute for the source owner's own documentation.
- It is not a template for moving the framework's body into AletheIA core.
