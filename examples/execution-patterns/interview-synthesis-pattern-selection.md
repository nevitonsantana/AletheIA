# Example — Interview synthesis pattern selection

A worked [Execution Pattern Selection](../../docs/contracts/execution-pattern-selection.md) for
synthesizing a large batch of research interviews (synthetic scenario: 100 anonymized transcripts)
into canonical opportunities. Many independent units plus a required synthesis — the textbook shape
for `fan_out_and_synthesize`, followed by a `generate_and_filter` stage to keep only the
opportunities that survive explicit criteria.

```yaml
execution_pattern_selection:
  task_id: interview-synthesis-batch-01
  task: synthesize 100 anonymized research interviews into a deduplicated, scored opportunity list
  work_type: research

  task_shape:
    repeated: false
    decomposable: true
    independent_units: true
    stages_depend_on_previous_output: true
    requires_judgment: medium
    objective_verification_available: false
    state_required: false

  risk:
    risk_level: low
    touches_sensitive_context: false
    external_side_effect: false
    irreversible_action_possible: false

  recommended_vehicle:
    type: orchestrated_workflow
    rationale: independent per-interview extraction stages plus a synthesis stage that depends on them

  recommended_pattern:
    type: fan_out_and_synthesize
    rationale: >
      100 independent units processed in batches, then canonicalized and scored; a downstream
      generate_and_filter stage (declared in the orchestration contract) deduplicates and keeps
      only opportunities meeting explicit filter criteria

  required_controls:
    state_required: false
    objective_gate_required: false
    maker_checker_required: false
    human_review_required: true
    token_budget_required: true
    audit_record_required: true

  decision:
    verdict: approved_with_constraints
    notes: >
      fan-out without synthesis is volume without decision — the synthesis and filter stages are
      mandatory; no objective verification exists for "good opportunity", so the final ranking is
      reviewed by a human before any roadmap use
```

## Why it is shaped this way

- **Fan-out is justified by independence** — each interview can be processed without the others;
  the dependency only appears at the synthesis stage
  (`stages_depend_on_previous_output: true`).
- **Filter criteria are explicit** — the `generate_and_filter` stage declares its criteria in the
  [orchestration contract](../../docs/contracts/orchestration-contract.md), so survivorship is
  reviewable, not vibes.
- **Human review, not an objective gate** — "this is a real opportunity" is judgment, so
  `objective_verification_available: false` and the close is human. This is why the verdict is not
  a loop: there is nothing objective to loop *until*.
- **Comprehension debt is the real risk** — 100 inputs produce volume; the
  [audit record](../../docs/contracts/execution-audit-record.md) carries the
  `comprehension_debt_review`, declaring who reads the synthesis and what fraction is verified
  against raw transcripts.
