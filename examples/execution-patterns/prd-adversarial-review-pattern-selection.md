# Example — PRD adversarial review pattern selection

A worked [Execution Pattern Selection](../../docs/contracts/execution-pattern-selection.md) for
reviewing a product requirements document against evidence and constraints. The failure mode to
prevent is factual or contractual error surviving self-review — so the pattern is
`adversarial_verification`: a checker that did not write the PRD confronts it, under the
[Maker-Checker Policy](../../docs/contracts/maker-checker-policy.md).

```yaml
execution_pattern_selection:
  task_id: prd-review-checkout-v2
  task: review a PRD against research evidence, value contract, and platform constraints
  work_type: product

  task_shape:
    repeated: false
    decomposable: false
    independent_units: false
    stages_depend_on_previous_output: true
    requires_judgment: high
    objective_verification_available: false
    state_required: false

  risk:
    risk_level: high
    touches_sensitive_context: false
    external_side_effect: false
    irreversible_action_possible: false

  recommended_vehicle:
    type: orchestrated_workflow
    rationale: maker and checker are separate stages with declared inputs, rubric, and evidence

  recommended_pattern:
    type: adversarial_verification
    rationale: >
      the output must be confronted against source, contract, and rubric by a verifier that is not
      the author; self-review systematically under-reports its own gaps

  required_controls:
    state_required: false
    objective_gate_required: false
    maker_checker_required: true
    human_review_required: true
    token_budget_required: false
    audit_record_required: true

  decision:
    verdict: approved
    notes: >
      checker findings are mapped to the rubric and attached as evidence; the final accept/reject
      on the PRD stays human — the checker informs the decision, it does not make it
```

## Why it is shaped this way

- **The maker is not the checker** — the review stage runs with a different agent profile and a
  declared rubric, per the maker-checker policy's self-preferential-bias rationale.
- **The checker is not the only gate** — `requires_judgment: high` plus `risk_level: high` keeps
  `human_review_required: true`; an agent checker alone never closes a critical judgment task.
- **No loop** — there is no objective stop condition for "the PRD is good"; iterating
  maker → checker → maker without a human in the cycle would just launder self-review through a
  second agent.
- **Audit carries the rubric** — findings reference rubric items in the
  [audit record](../../docs/contracts/execution-audit-record.md), so the review is reviewable.
