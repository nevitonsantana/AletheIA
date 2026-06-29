# Skill Catalog Governance Contract — Specification

## Purpose

Define how AletheIA governs skill selection, rejection, override and catalog-change proposals while
Adaptive Skills remains the method/capability library and the harness/runtime remains the execution
authority.

This contract is the AletheIA side of S20 Lean Skill Doctrine + Skill Catalog Governance.

## Core rule

The skill declares behavior and requirements. The model proposes use. The harness validates and
records. AletheIA defines the governance contract. No skill approves, blocks, mutates or closes a
Work Slice by itself.

## Authority boundary

| Surface | Owns | Must not own |
|---|---|---|
| Adaptive Skills | skill method, catalog doctrine, quality gate, capability metadata | Work Slice approval, global routing, runtime enforcement |
| Model/agent | proposed skill use, rationale, draft output | final authority, hidden routing, policy bypass |
| Harness/runtime | tool execution, permission verdicts, action records, budget enforcement | skill canon, AletheIA gates, human acceptance |
| AletheIA | selection/proposal governance, observation requirements, escalation and closure boundaries | Adaptive Skills content authorship, runtime engine implementation |
| Human reviewer | acceptance, override, merge and boundary decisions | invented telemetry or unsupported success claims |

## Scope

Applies to:

- skill selection inside a Work Slice or execution plan;
- rejection of weak-fit or overlapping skills;
- optional module activation;
- skill proposal decisions: new skill, module, merge, split, deprecate, defer or reject;
- catalog-review observations shown later in read-only Observatory surfaces.

## Non-goals

- No runtime engine.
- No automatic skill routing.
- No mutation of Adaptive Skills from AletheIA.
- No provider-specific toolchain.
- No skill ranking, success rate or optimization metric without comparable evidence.
- No blocking except narrow authority, safety or boundary violations.

## Skill selection decision object

Use this shape inside an existing Work Slice, execution audit, handoff, observation or review
record. It is not a standalone database schema.

```yaml
skill_selection_decision:
  decision_id: skill-select-<local-id>
  work_slice_id: <work-slice-or-task-id>
  task_shape: <short dominant need>
  candidate_skills:
    - skill_id: <skill-id>
      reason: <why considered>
      fit: strong | partial | weak | rejected | unavailable
      selected: true | false
      modules_selected:
        - <module-id>
      modules_rejected:
        - <module-id>
      rejection_reason: <none | weak_fit | overlap | too_heavy | not_needed | wrong_domain | unavailable>
  selected_skill:
    id: <skill-id-or-none>
    reason: <dominant-need-match>
    minimum_context: <what must be loaded>
  policy_posture: observe | advise | require | block | unavailable
  decision_owner: human | agent_proposed_human_confirmed | runtime_recorded
  evidence_refs:
    - <source-ref>
  metrics:
    candidate_count:
      value: <number-or-null>
      provenance: reported | estimated | unavailable
```

## Skill proposal decision object

Use this shape when evidence suggests the catalog itself may need to change.

```yaml
skill_proposal_decision:
  proposal_id: skill-proposal-<local-id>
  proposed_change: new_skill | optional_module | merge | split | deprecate | reject
  target_skill: <skill-id-or-null>
  source_refs:
    - <issue|pack|observation|review>
  rationale: <summary>
  decision: accept | revise | convert_to_module | merge | defer | reject
  evidence:
    recurrence: strong | partial | weak | unavailable
    distinctness: strong | partial | weak | unavailable
    proportionality: strong | partial | weak | unavailable
    verification: strong | partial | weak | unavailable
    governability: strong | partial | weak | unavailable
  boundary_check:
    declares_not_enforces: true | false | unknown
    embeds_local_content: true | false | unknown
    requires_runtime_policy: true | false | unknown
    weakens_safety_or_validation: true | false | unknown
  next_action: review | implement | defer | escalate | close
```

## Skill activation observation

A selected skill can become a compact observation when it affects a decision.

```yaml
source:
  type: skill_catalog_review
  name: <skill-id-or-review-id>
summary: <decision-relevant result>
evidence_items:
  - kind: skill_distinctness_check
    ref: <source-ref>
  - kind: proportionality_check
    ref: <source-ref>
  - kind: boundary_check
    ref: <source-ref>
decision_support:
  relevance: supports_skill_selection | supports_skill_catalog_decision | warns_against_selection
  escalation_required: true | false
```

Observation records must follow the [Observation Governance Contract](observation-governance-contract.md):
source refs are required; missing metrics remain `unknown` or `unavailable`.

## Skill overlap and sprawl signals

AletheIA-compatible reviews may report these signals:

- `too_many_candidate_skills`
- `repeated_weak_fit_selection`
- `optional_module_used_without_trigger`
- `skill_selected_because_available`
- `overlapping_skill_boundaries`
- `sidecar_added_without_reuse`
- `core_moves_exceed_limit`
- `skill_embeds_local_content`
- `skill_claims_enforcement_authority`
- `missing_when_not_to_use`
- `missing_verification`
- `no_evidence_of_recurrence`

Signals are prompts for review, not automatic decisions.

## Governance postures

| Posture | Meaning | Allowed behavior |
|---|---|---|
| `observe` | record selection and output only | no warning or gate |
| `advise` | warn about weak fit, overlap or context excess | reviewer may continue with rationale |
| `require` | require a quality-gate or proposal record before catalog change | cannot merge catalog change without the record |
| `block` | stop only for boundary/safety violations | requires human review and correction |
| `unavailable` | evidence is absent | do not infer fit, metric or result |

Blocking is intentionally narrow.

## Narrow blocking conditions

AletheIA may require a stop/review when a skill or proposal:

- claims authority to approve, block, close or mutate a Work Slice;
- embeds secrets, restricted content or local project state;
- requires destructive action without a harness gate;
- declares runtime enforcement inside `SKILL.md`;
- removes validation, evidence, security, accessibility or data-integrity requirements to reduce complexity;
- creates a hidden routing, scoring or optimization engine.

## Override policy

A human reviewer may override an `advise` or `require` posture only by recording:

- the reason for override;
- evidence refs;
- known risk;
- follow-up owner or explicit no-follow-up rationale.

A `block` posture requires correction or explicit governance escalation; it is not bypassed by model
confidence.

## Metrics with provenance

Permitted early metrics:

- candidate skill count;
- selected skill id;
- rejected skill ids and reasons;
- module count;
- unavailable evidence count.

Every metric must declare provenance: `reported`, `estimated` or `unavailable`.

Not permitted in S20:

- skill success rate;
- capability ranking;
- productivity score;
- automatic optimization recommendation;
- value-per-skill or cost-savings claim.

## Validation rules

A governed skill catalog decision is valid only when:

1. selected and rejected skills have reasons;
2. metrics have provenance;
3. weak evidence is represented as `weak`, `unknown` or `unavailable`;
4. blocking posture is limited to boundary/safety violations;
5. Adaptive Skills remains the source for doctrine and skill content;
6. AletheIA does not mutate the skill catalog directly.

## Relationship to Adaptive Skills

The Adaptive Skills S20 artifacts define the catalog-side doctrine and quality gate. AletheIA uses
those outputs as source refs; it does not copy the doctrine or become the skill authoring system.

Related Adaptive Skills surfaces:

- `docs/skill-design-principles/lean-skill-doctrine.md`
- `docs/skill-catalog-governance.md`
- `templates/skill-quality-gate.md`

## Related contracts

- [Capability Routing Reconciliation](capability-routing-reconciliation.md)
- [Observation Governance Contract](observation-governance-contract.md)
- [Agent Harness Contract](agent-harness-contract.md)
- [Agent Harness Governance Extension](agent-harness-governance-extension.md)
- [Agent Action Audit Record](agent-action-audit-record.md)
- [Skill Evolution Validation Contract](skill-evolution-validation-contract.md)
- [Skill Knowledge Dependency Contract](skill-knowledge-dependency-contract.md)
