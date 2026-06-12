# Example — CI triage pattern selection

A worked [Execution Pattern Selection](../../docs/contracts/execution-pattern-selection.md) for
recurring CI failure triage: classify each new failure, route it, and keep state across runs.
Recurring, objectively verifiable work — so a loop is admissible, but only with the full set of
loop controls from the [Objective Gate Policy](../../docs/contracts/objective-gate-policy.md).

```yaml
execution_pattern_selection:
  task_id: ci-triage-2026-w23
  task: triage new CI failures, classify by failure type, route to owner or fix queue
  work_type: engineering

  task_shape:
    repeated: true
    decomposable: true
    independent_units: true
    stages_depend_on_previous_output: false
    requires_judgment: low
    objective_verification_available: true
    state_required: true

  risk:
    risk_level: medium
    touches_sensitive_context: false
    external_side_effect: false
    irreversible_action_possible: false

  recommended_vehicle:
    type: loop
    rationale: recurring work with uncertain volume per run; each run is bounded and restartable

  recommended_pattern:
    type: scheduled_stateful_loop
    rationale: >
      recurrence plus persistent triage state; each run opens with a classify_and_act stage
      (declared in the orchestration contract) that types the failure before routing it
  required_controls:
    state_required: true
    objective_gate_required: true
    maker_checker_required: false
    human_review_required: false
    token_budget_required: true
    audit_record_required: true

  decision:
    verdict: approved_with_constraints
    notes: >
      approved while the stop condition holds: a run ends when the new-failure queue is empty or
      the budget is reached; loop state follows the loop-state contract; any action beyond
      classification and routing (e.g. closing issues) escalates to human review
```

## Why it is shaped this way

- **`scheduled_stateful_loop`, not `loop_until_done`** — the work recurs on a schedule, so it
  needs persistent [loop state](../../docs/contracts/loop-state-contract.md) (what was triaged,
  what escalated), not just a one-shot stop condition.
- **`classify_and_act` inside the loop** — each run starts by classifying the failure type before
  routing, the composition recommended for triage in the
  [pattern library](../../docs/concepts/execution-pattern-library.md).
- **Objective gate available** — "queue empty or budget reached" is verifiable, which is what makes
  an autonomous loop admissible at all (no objective gate → no autonomous loop).
- **`approved_with_constraints`** — routing is low-judgment and reversible; anything irreversible
  is out of the declared shape and forces re-selection.
