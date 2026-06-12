# Example — Feature value review pattern selection

A worked [Execution Pattern Selection](../../docs/contracts/execution-pattern-selection.md) for a
feature value review (does this feature deserve investment?). The important part of this example is
the **negative space**: feature judgment has no objective stop condition, so loop patterns are
explicitly inadmissible — the selection rejects them instead of letting "automate the roadmap"
happen by default.

```yaml
execution_pattern_selection:
  task_id: feature-value-review-export-api
  task: decide whether a proposed feature deserves investment, against value levers and complexity cost
  work_type: governance

  task_shape:
    repeated: false
    decomposable: true
    independent_units: false
    stages_depend_on_previous_output: true
    requires_judgment: high
    objective_verification_available: false
    state_required: false

  risk:
    risk_level: high
    touches_sensitive_context: false
    external_side_effect: false
    irreversible_action_possible: true

  recommended_vehicle:
    type: orchestrated_workflow
    rationale: alternatives are generated and filtered in declared stages, with a human final decision

  recommended_pattern:
    type: generate_and_filter
    rationale: >
      quality comes from generating multiple build/park/sunset alternatives and filtering them by
      explicit criteria (value lever, evidence, complexity cost); tournament_compare is the
      fallback when surviving options are close enough that comparison beats absolute scoring

  required_controls:
    state_required: false
    objective_gate_required: false
    maker_checker_required: true
    human_review_required: true
    token_budget_required: false
    audit_record_required: true

  decision:
    verdict: approved_with_constraints
    notes: >
      loop_until_done is inadmissible — feature judgment does not have an objective stop
      condition; scheduled_stateful_loop is inadmissible — a recurring automated roadmap action
      would create governance risk; the investment decision itself is human
```

## Why it is shaped this way

- **`generate_and_filter`, with `tournament_compare` as fallback** — value comes from explicit
  alternatives and explicit filter criteria; when two finalists are close, head-to-head comparison
  is more reliable than an absolute score.
- **Loops are rejected by rationale, not omission** — the notes record *why*
  `loop_until_done` ("no objective stop condition") and `scheduled_stateful_loop` ("recurring
  automated roadmap action would create governance risk") are out, so the rejection is auditable.
- **`irreversible_action_possible: true` → human review** — committing investment is not
  reversible by `git diff`; per the selection rules, human review becomes mandatory.
- **Maker-checker on the filter** — the filter criteria and the surviving set are checked by a
  reviewer that did not generate the alternatives, per the
  [Maker-Checker Policy](../../docs/contracts/maker-checker-policy.md).
