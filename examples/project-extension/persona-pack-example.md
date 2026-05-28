# Persona Pack — Example

## Goal

Show a generic example of a persona registered as a knowledge pack. The persona below is fictional.

---

## manifest.yaml

```yaml
knowledge_pack:
  id: example-persona-casual-shopper
  name: Example Persona — Casual Shopper
  type: persona
  owner: example-research-owner
  version: 0.4.0

  sensitivity: internal
  authority_level: evidence_proxy

  scope:
    - product_feature_decisions
    - ux_research_referencing
    - opportunity_framing

  allowed_skills:
    - feature-value-governance
    - ux-strategy
    - ux-provocation
  allowed_agents:
    - product-agent
    - design-agent

  retrieval_mode: capsule_first
  citation_required: true
  full_text_exposure: allowed
  export_allowed: true

  human_review_required_for:
    - policy_conflict

  expiry:
    review_cycle: quarterly
    expires_on: null

  source_location: knowledge-packs/example-persona-casual-shopper/full-source.md
  source_integrity_notes: |
    Derived from anonymized aggregate research, no identifying customer data.
    Underlying interviews are stored separately and not part of this pack.
```

---

## capsule.md (excerpt, generic)

```markdown
# Example Persona — Casual Shopper

## Who they are
A non-expert buyer who shops infrequently and prefers minimal cognitive load.

## What they value
- Clear pricing.
- Predictable steps.
- Low effort to recover from mistakes.

## What they avoid
- Long forms.
- Decisions with unclear consequences.
- Unfamiliar terminology.

## Useful framings
- "Would this be obvious to someone who shops once a quarter?"
- "What does the worst-case recovery look like?"

## Limits
- Evidence proxy only. Cannot override accessibility, privacy, or compliance sources.
- Should not be cited as evidence of universal behavior.
```

---

## What this example demonstrates

- A persona enters the layer as an **`evidence_proxy`** with **medium precedence**.
- It is allowed in design and product framing, not in compliance or security decisions.
- Conflicts with higher-tier sources (e.g. accessibility) lose, as shown in [source-precedence-policy](../../docs/contracts/source-precedence-policy.md).
- The pack mentions provenance explicitly so it cannot be confused with raw user data.

---

## What this example is not

- Not a real persona.
- Not derived from any real customer.
- Not an authoritative source on user behavior.
