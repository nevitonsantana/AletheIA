# Skill Knowledge Dependency Contract

## Goal

Define how a skill declares the knowledge it needs **without** pointing at a specific source.

A skill declares *types* of knowledge. The [knowledge resolver](../concepts/knowledge-resolver.md) decides which concrete pack — if any — satisfies the dependency under the active permissions and policies.

---

## Principles

1. A skill states **what kind** of knowledge it needs, not **which document**.
2. A skill never embeds proprietary content. Procedure goes in the skill; content lives in a knowledge pack.
3. A skill must declare what it does when a dependency cannot be satisfied (`fallback_behavior`).
4. A skill must operate in **generic mode** when no governed source is available, unless the dependency is `required` and the skill has chosen `stop_and_request_source`.

---

## Schema (conceptual)

```yaml
skill: <skill-id>
version: <semver>

knowledge_dependencies:
  <dependency-key>:
    required: true | false                # default false
    required_when:                         # optional; conditional requirement
      - <task-trigger>
    accepted_types:                        # source types that can satisfy this
      - <source_type>
    min_authority: <authority_level>       # optional floor
    preferred_retrieval_mode: <mode>       # optional hint to resolver
    notes: <free text>                     # optional

fallback_behavior:
  missing_required_source: stop_and_request_source | continue_in_generic_mode | abort
  missing_optional_source: continue_with_assumption_marker | omit_silently
  restricted_source: request_authorized_context_pack | downgrade_to_capsule | refuse
  conflicting_sources: apply_source_precedence_policy | escalate_to_human_review
```

`dependency-key` is a skill-meaningful slot name (e.g. `strategic_framework`, `personas`, `accessibility_guidelines`). It is not a source id.

---

## Required vs. optional vs. conditional

- **required: true** — the skill cannot produce its expected output without this knowledge type. The resolver must satisfy it or the fallback fires.
- **required: false** — the skill produces useful output without it; if present, output improves.
- **required_when** — required only when listed task triggers match. Useful for accessibility, privacy, or compliance dependencies that activate by task shape.

---

## Worked example

```yaml
skill: feature-value-governance
version: 0.1.0

knowledge_dependencies:
  strategic_framework:
    required: true
    accepted_types:
      - proprietary_framework
      - product_strategy
      - business_design_framework
    min_authority: interpretive

  personas:
    required: false
    accepted_types:
      - persona
      - research_finding

  accessibility_guidelines:
    required_when:
      - interface_change
      - content_decision
      - navigation_decision
      - customer_facing_experience
    accepted_types:
      - accessibility_guideline
    min_authority: normative

  operating_model:
    required_when:
      - roadmap_decision
      - prioritization_decision
      - governance_decision
    accepted_types:
      - operating_model

fallback_behavior:
  missing_required_source: stop_and_request_source
  missing_optional_source: continue_with_assumption_marker
  restricted_source: request_authorized_context_pack
  conflicting_sources: apply_source_precedence_policy
```

---

## Output expectations

A knowledge-aware skill must surface, in its output:

- which knowledge slots were satisfied and by which pack `id@version`
- which slots were unsatisfied and how the fallback was applied
- which restrictions were active (e.g. capsule-only, no verbatim, no export)
- any conflicts detected and how precedence resolved them

This makes the audit trail (see [knowledge-audit-log-spec](knowledge-audit-log-spec.md)) reconstructable from the skill output alone.

---

## What a skill must not do

- declare a specific source `id` as a dependency (breaks portability and governance)
- carry a copy of source content inside `skill.md` or its templates
- bypass `fallback_behavior` by improvising context from the agent's prior memory
- assume that a missing optional source is equivalent to "the source agrees with me"

---

## See also

- [knowledge-pack-manifest](knowledge-pack-manifest.md)
- [knowledge-resolver](../concepts/knowledge-resolver.md)
- [source-precedence-policy](source-precedence-policy.md)
