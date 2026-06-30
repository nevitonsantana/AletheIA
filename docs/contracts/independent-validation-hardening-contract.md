# Independent Validation Hardening Contract

## Purpose

Define the minimum record for proportional independent validation when a Work Slice needs more than maker self-assessment. This contract strengthens validation without making LLM review proof, creating a new lifecycle, or requiring critic review for every low-risk task.

## Boundary

Independent validation is a review layer over existing AletheIA authorities:

- Intent and expectations remain governed by the [Intent-to-Evidence Work Slice Extension](intent-to-evidence-extension.md).
- Separate verifier requirements remain governed by the [Maker-Checker Policy](maker-checker-policy.md).
- Objective gates remain governed by the [Objective Gate Policy](objective-gate-policy.md).
- Harness evidence and action records remain governed by [AHGE](agent-harness-governance-extension.md), [AHC](agent-harness-contract.md), [Execution Audit Record](execution-audit-record.md) and [Agent Action Audit Record](agent-action-audit-record.md).

This contract adds the shape of the independent validation context and review record. It does not assign reviewers, run benchmarks, approve merges, deploy artifacts, expose hidden chain-of-thought, or replace human review.

## When to use

Use independent validation when one or more of these conditions are present:

```yaml
independent_validation_recommended_when:
  - governance_error_risk
  - contractual_error_risk
  - human_intent_may_be_misread
  - evidence_coverage_is_partial
  - maker_checker_mandatory_when_applies
  - high_cost_or_high_rework_consequence
```

Independent validation is optional for low-risk, low-impact work when an objective gate is sufficient and no maker-checker trigger applies.

## Critic context

A critic receives artifact and evidence context, not hidden actor reasoning. The minimum context is:

```yaml
independent_critic_context:
  context_id:
  work_slice_ref:
  artifact_refs: []
  intent_ref: not_needed | string
  expectations_ref: not_needed | string
  evidence_refs: []
  source_refs: []
  known_constraints: []
  known_gaps: []
  review_focus: []
  privacy_boundary:
    prompt_content: excluded | summarized | authorized_excerpt
    restricted_sources: metadata_only | not_present
    secrets: excluded
```

Required rules:

- `source_refs` must identify the source records used to form the review context.
- `known_gaps` must stay visible; unavailable evidence is represented as `unavailable`, not invented.
- Hidden chain-of-thought, private prompts, secrets and restricted source content must not be transferred to the critic.
- The critic may inspect artifacts, expectations, evidence and permitted summaries; it may not become the source of truth.

## Evidence-to-expectation gate

A clean proceed verdict is invalid while a required expectation remains unproven.

```yaml
evidence_to_expectation_gate:
  gate_id:
  expectations:
    - expectation_ref:
      required: true
      evidence_status: proven | partially_proven | not_proven | not_applicable | unavailable
      evidence_refs: []
      gap_reason:
      disposition: proceed | proceed_with_gap | revise | block | human_review_required
  overall_disposition: proceed | proceed_with_gap | revise | block | human_review_required
```

Disposition rules:

- `proceed` requires every required expectation to be `proven` or `not_applicable` with a source-backed reason.
- `proceed_with_gap` requires explicit accepted limitations and reviewer or human sign-off reference.
- `revise` means the maker should change the artifact before closure.
- `block` means the slice must not close or advance until the blocking gap is resolved.
- `human_review_required` means the critic cannot resolve the risk or authority boundary.

## Validation review record

```yaml
validation_review_record:
  review_id:
  work_slice_ref:
  reviewer:
    independence: independent_critic | separate_agent | separate_human | mixed
    reviewer_ref:
    relationship_to_maker: none | separate_role | separate_team | unknown
  critic_context_ref:
  evidence_gate_ref:
  findings:
    - finding_id:
      severity: low | medium | high | critical
      claim:
      expectation_refs: []
      evidence_refs: []
      source_refs: []
      recommendation: proceed | revise | block | human_review_required | log_only
  verdict: proceed | proceed_with_gap | revise | block | human_review_required
  confidence: low | medium | high
  limitations: []
  human_review_ref: not_required | pending | string
  audit_refs: []
```

A validation review record is not valid when:

- it has no `source_refs` for a finding;
- it reports `proceed` while a required expectation is `not_proven`, `partially_proven` without accepted limitation, or `unavailable`;
- it treats an LLM critic as proof or final authority;
- it hides the review limitations.

## Blind-review checklist

Before accepting a validation review, confirm:

1. The reviewer is not the maker, or the lack of independence is explicitly marked `unknown` and cannot satisfy maker-checker requirements.
2. The critic saw the artifact, expectations and permitted evidence, not hidden chain-of-thought.
3. Each important finding points to `source_refs` and `evidence_refs` when available.
4. Required expectations with missing evidence cannot produce `proceed`.
5. Human review remains required for sensitive, irreversible or critical decisions.
6. The record states limitations and unavailable evidence neutrally.

## Observatory projection

Read-only observability may show the existence, disposition, confidence, missing evidence and source references of independent validation. It must not show private prompts, hidden reasoning, secrets or restricted source content.

## Related

- [Intent-to-Evidence Work Slice Extension](intent-to-evidence-extension.md)
- [Maker-Checker Policy](maker-checker-policy.md)
- [Objective Gate Policy](objective-gate-policy.md)
- [Agent Harness Contract](agent-harness-contract.md)
- [Agent Harness Governance Extension](agent-harness-governance-extension.md)
- [Execution Audit Record](execution-audit-record.md)
