# Cognitive, Intent and Documentation Closure Extension

## Purpose

This optional extension adds a proportional understanding and documentation review to the existing Work Slice finalization flow.

It answers whether:

- the confirmed human intent remains preserved;
- decision rationale and accepted limitations remain recoverable;
- documentation affected by the change is current and non-conflicting;
- an understanding gap requires explanation or human technical review before closure.

It does not create a new lifecycle, documentation engine, policy engine, runtime, or self-certification mechanism.

## Existing authorities reused

- [Intent-to-Evidence extension](intent-to-evidence-extension.md) owns the confirmed intent, expectations and reconcile evidence.
- [Comprehension Debt](../concepts/comprehension-debt.md) defines the human-side risk of output exceeding review capacity.
- [Durable Decisions](../concepts/durable-decisions.md) preserve consequential rationale and trade-offs.
- [Slice Finalization & Restart Guidance](../guides/slice-finalization-and-restart.md) remains the canonical closure and continuity flow.
- Source documents, accepted decisions and evidence remain authoritative; this review only reports their state.

## When the extension applies

Use it when at least one is true:

- the slice changes public behavior, architecture, governance, installation, risk posture or a reusable capability;
- AI-generated output is too large or technical for the accountable reviewer to understand safely;
- intent, decisions, accepted limitations or required documentation may have drifted;
- the finalization reviewer cannot identify the evidence, consequence or rollback path;
- a documentation conflict or missing required update could mislead the next user or session.

A low-risk wording-only slice may record `not_required` with a reason and source refs. Do not make every Lite slice complete a large report.

## Minimum record

```yaml
cognitive_documentation_closure:
  work_slice_id: string
  applicability:
    status: required | not_required
    reasons: [string]
    source_refs: [string]
  intent_preservation:
    status: preserved | changed_with_confirmation | unresolved | unavailable
    intent_ref: string | null
    decision_refs: [string]
    accepted_limitations: [string]
  understanding_review:
    accountable_reviewer: string
    can_explain:
      goal: yes | partial | no | unavailable
      main_change: yes | partial | no | unavailable
      consequence: yes | partial | no | unavailable
      evidence: yes | partial | no | unavailable
      rollback_or_recovery: yes | partial | no | not_applicable | unavailable
    risk_level: low | medium | high | critical
    explanation_needed: [string]
    source_refs: [string]
  documentation_coherence:
    checked_surfaces:
      - surface: string
        status: current | stale | conflicting | missing | not_applicable | unavailable
        source_refs: [string]
        required_action: string | null
    verdict: current | update_required | conflicting | unavailable
  closure:
    verdict: proceed | add_explainable_brief | document_before_closing | human_review_required | block_closure
    rationale: string
    evidence_refs: [string]
```

## Evidence rules

1. Every intent, understanding, documentation and closure claim carries `source_refs` or `evidence_refs`.
2. Missing inspection is `unavailable`; it is never silently treated as `current`.
3. Human understanding is a review signal, not proof that implementation, security or architecture is correct.
4. A high- or critical-risk technical change cannot close from self-reported understanding alone.
5. Intent changes require renewed human confirmation through the Intent-to-Evidence contract.
6. Documentation status describes inspected surfaces only; it does not imply repository-wide health.

## Verdict rules

### `proceed`

Use when intent is preserved, required documentation is current, understanding risk is low, and technical evidence already satisfies the Work Slice closure rule.

### `add_explainable_brief`

Use when evidence is sufficient but a medium understanding gap can be resolved with a concise plain-language and technical explanation.

### `document_before_closing`

Use when a required surface is stale or missing and the gap must be corrected before closure.

### `human_review_required`

Use when understanding risk is high or critical, the accountable reviewer cannot safely assess consequence or recovery, or the decision exceeds that person's approval boundary.

### `block_closure`

Use when confirmed intent is unresolved, documentation conflicts, required evidence is missing, or a high-risk review remains incomplete.

## Boundary

This extension may explain, surface gaps and require review. It cannot certify safety, replace technical/security review, mutate documentation automatically, approve a Work Slice, or authorize execution.

