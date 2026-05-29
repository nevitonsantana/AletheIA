# Walkthrough — feature-value-governance consuming example-4-layers

A generic, safe illustration of the `feature-value-governance` skill (Adaptive Skills) running in
**knowledge-aware mode** with this pack filling its `strategic_framework` slot.

It pairs with the resolver-output example
[knowledge-aware-context-pack.json](../../../knowledge-aware-context-pack.json), which shows the
slots the resolver filled (this pack + a persona + an internal accessibility guideline), the active
restrictions, and the conflict it resolved.

## Scenario

A team proposes simplifying a checkout flow by removing inline field labels. The question:
**is this feature worth doing, and is it safe to ship as proposed?**

## Skill output (illustrative)

```yaml
feature_value_analysis:
  feature: "Remove inline labels on checkout fields to simplify the flow"
  mode: knowledge_aware
  business_intent: "Reduce checkout friction to lift conversion (Layer A intent)"
  lever:
    primary: conversion
    rationale: "Fewer visual elements is hypothesized to reduce drop-off at payment (Layer B bet)"
  user_evidence:
    summary: "Persona prefers minimal visual density"
    is_assumption: false
  opportunity_alignment:
    serves: "Reduce checkout abandonment"
    aligned: true
  complexity:
    cost: low
    drivers: ["front-end only", "no backend change"]
  overreach_risk:
    compliance: none
    accessibility: likely
    privacy: none
    notes: "Removing labels collides with the internal accessibility guideline"
  verdict:
    worth_doing: conditional
    conditions:
      - "Keep explicit labels; achieve simplification without removing them"
    rationale: >
      The conversion bet is coherent across layers A–C and cheap (Layer D), but the proposed
      shape (Layer C) overreaches into accessibility. The mandatory/normative guideline outranks
      the persona, so the simplification must be redesigned rather than shipped as proposed.
  knowledge_used:
    - slot: strategic_framework
      pack: example-4-layers@1.0.0
      retrieved_scope: capsule
      restrictions: [no_verbatim, no_export, citation_required]
    - slot: personas
      pack: example-persona-casual-shopper@0.4.0
      retrieved_scope: capsule
      restrictions: [citation_required]
    - slot: accessibility_guidelines
      pack: wcag-internal@1.2.0
      retrieved_scope: excerpt
      restrictions: [citation_required]
  unsatisfied_slots:
    - slot: operating_model
      fallback: omit_silently        # not required for this task shape
  conflicts:
    - between: [example-persona-casual-shopper@0.4.0, wcag-internal@1.2.0]
      prevailing: wcag-internal@1.2.0
      reason: source_precedence_policy
```

## What this demonstrates

- The pack fills `strategic_framework` **capsule-first**; no verbatim framework text appears.
- Every consumed pack is cited as `pack_id@version`.
- The persona-vs-accessibility conflict resolves via the
  [source-precedence-policy](../../../../../docs/contracts/source-precedence-policy.md): the normative
  accessibility guideline outranks the persona, so the verdict is `conditional`, not `yes`.
- The framework is **interpretive**: it structures the value judgment but cannot override a
  higher-authority source.
