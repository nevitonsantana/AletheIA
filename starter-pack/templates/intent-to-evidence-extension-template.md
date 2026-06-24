# Intent-to-Evidence Extension Template

Use only when ambiguity could change scope, risk, architecture or validation. Keep each field concise.

```yaml
intent_to_evidence:
  work_slice_id:
  proportionality: required | optional | not_needed

  intent_record:
    intent_id:
    human_owner:
    desired_outcome:
    constraints: []
    success_scenarios: []
    failure_scenarios: []
    connected_intents: []
    non_goals: []
    ambiguity_markers: []
    decisions_required_before_execution: []
    owner_confirmation:
      status: draft | confirmed | needs_review
      confirmed_by:
      evidence_ref:

  expectations_contract:
    expectations_id:
    linked_intent:
    success_conditions: []
    failure_conditions: []
    boundaries:
      must: []
      must_not: []
    acceptance_examples: []
    rejection_examples: []
    validation_methods:
      - type: test | review | screenshot | manual_check | behavior_check | metric | log
        description:
    stop_conditions: []
    human_review:
      required:
      review_focus: []

  agent_guessing_risk:
    level: low | medium | high
    holes: []
    verdict: ready | needs_clarification | stop

  evidence_to_expectation_map:
    expectations: []
    overall_verdict: pending | pass | pass_with_gaps | fail | review_required

  reconcile_against_intent:
    preserved: pending | yes | partially | no
    deviations: []
    learning_refs: []
    documentation_updates: []
```
