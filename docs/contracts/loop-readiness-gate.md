# Loop Readiness Gate — Governed Loop Engineering Addendum

## Purpose

Define the minimum readiness record before a Work Slice may use a loop-shaped execution pattern. This gate reconciles existing loop authorities into one review surface: [Execution Pattern Selection](execution-pattern-selection.md), [Objective Gate Policy](objective-gate-policy.md), [Loop State Contract](loop-state-contract.md), [Maker-Checker Policy](maker-checker-policy.md) and [Independent Validation Hardening](independent-validation-hardening-contract.md).

The gate is docs-first. It does not create a scheduler, runtime, policy engine, autonomous agent, queue, database, collector or new lifecycle.

## Boundary

The Loop Readiness Gate answers one question: **is this loop topology admissible for this slice?**

It does not:

- execute the loop;
- schedule future runs;
- authorize tool calls;
- approve merge/deploy/release;
- replace AHGE, AHC, objective gates, maker-checker, human review or loop state.

## Minimum record

```yaml
loop_readiness_gate:
  gate_id:
  work_slice_ref:
  execution_pattern_selection_ref:
  proposed_pattern: loop_until_done | scheduled_stateful_loop
  loop_purpose:
  recurrence:
    kind: single_session | recurring | scheduled
    max_iterations:
    max_runtime:
    budget_ref:
  objective_stop_condition:
    condition:
    verification_method:
    evidence_ref:
  objective_gate:
    required: true
    gate_ref:
    gate_type: test | schema | lint | typecheck | reproduction | rubric | independent_review | human_review
  state:
    required: true | false
    loop_state_ref: not_needed | pending | string
  review_capacity:
    reviewer_ref:
    cadence:
    max_unreviewed_iterations:
    escalation_owner:
  drift_controls:
    drift_signals: []
    stop_on: []
    rescope_requires_human: true
  safety_controls:
    irreversible_action: true | false
    sensitive_context: true | false
    human_review_ref: not_required | pending | string
  evidence_refs: []
  source_refs: []
  verdict: ready | ready_with_constraints | not_ready | human_led_required
  constraints: []
```

## Normative rules

1. **No objective gate, no autonomous loop.** If an objective gate is unavailable, the verdict must be `human_led_required` or `not_ready`.
2. **No open-ended stop condition.** The stop condition must be externally verifiable. “Until it looks good” is invalid.
3. **Recurring loops require persistent state.** If `recurrence.kind` is `recurring` or `scheduled`, `state.required` must be `true` and `loop_state_ref` must not be `not_needed`.
4. **Review capacity is part of readiness.** A loop is not ready when no reviewer, cadence, maximum unreviewed iterations or escalation owner is declared.
5. **Drift is a stop signal, not a normal loop output.** Scope drift, repeated failed gates, rising risk, repeated unavailable evidence or reviewer overload must stop or rescope the loop.
6. **Human review remains required for sensitive or irreversible actions.** No loop may make or finalize irreversible/sensitive changes without a human review reference.
7. **Evidence and source references are mandatory.** The readiness gate must point to the records that justify its verdict. Missing telemetry or unavailable evidence is represented as `unavailable`, never invented.
8. **The gate is not a scheduler.** A `ready` verdict says the topology is admissible; it does not cause execution.

## Verdict semantics

| Verdict | Meaning |
|---|---|
| `ready` | All required readiness conditions are present and source-backed. |
| `ready_with_constraints` | The loop may proceed only under explicit constraints such as lower iteration cap or human checkpoint. |
| `not_ready` | Required loop preconditions are missing; do not use loop topology. |
| `human_led_required` | The work may continue only as human-led or human-gated execution. |

## Related

- [Execution Pattern Selection](execution-pattern-selection.md)
- [Objective Gate Policy](objective-gate-policy.md)
- [Loop State Contract](loop-state-contract.md)
- [Maker-Checker Policy](maker-checker-policy.md)
- [Independent Validation Hardening Contract](independent-validation-hardening-contract.md)
- [Agent Harness Contract](agent-harness-contract.md)
- [Agent Harness Governance Extension](agent-harness-governance-extension.md)
