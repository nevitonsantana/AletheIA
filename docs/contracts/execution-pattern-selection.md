# Execution Pattern Selection — Specification

## Purpose

Define the **per-task pattern selection declaration**: before any execution starts, a task must
declare its shape, its risk, the recommended [execution vehicle](../concepts/execution-vehicle-selection.md),
the recommended [execution pattern](../concepts/execution-pattern-library.md), the controls the
selection requires, and an explicit selection verdict. The conceptual background — why topology is
selected, and how it differs from depth and authority — is in
[concepts/execution-pattern-governance.md](../concepts/execution-pattern-governance.md).

This declaration is filled **before execution** and sits **upstream of the
[Agent Harness Contract](agent-harness-contract.md)** ([ADR-013](../adr/ADR-013-agent-harness-contract.md)):
first the topology of execution is selected, then the per-task envelope (autonomy, tools, gates) is
declared, then the harness ([AHGE](agent-harness-governance-extension.md)) authorizes per action.
Selection must happen before the skill executes.

## Non-goals

- No runtime, scheduler, router, or policy engine — this is a declaration to be reviewed, not a
  mechanism that executes.
- No restating of AHC envelope fields, AHGE permission logic, or REGC effort logic — the selection
  references them; the layers stay separate.
- No new autonomy or verdict vocabulary beyond the four selection verdicts declared here. Authority
  is declared with [autonomy levels](../concepts/autonomy-levels.md); enforcement outcomes use the
  [policy verdicts](policy-verdicts.md).

## Declaration shape

```yaml
execution_pattern_selection:
  task_id:
  task:
  work_type: engineering | product | research | design | governance | communication | operations

  task_shape:
    repeated: true | false
    decomposable: true | false
    independent_units: true | false
    stages_depend_on_previous_output: true | false
    requires_judgment: low | medium | high
    objective_verification_available: true | false
    state_required: true | false

  risk:
    risk_level: low | medium | high | critical
    touches_sensitive_context: true | false
    external_side_effect: true | false
    irreversible_action_possible: true | false

  recommended_vehicle:
    type: manual_prompt | single_agent | orchestrated_workflow | loop | human_led_workflow
    rationale:

  recommended_pattern:
    type: manual_prompt | single_agent | classify_and_act | fan_out_and_synthesize | adversarial_verification | generate_and_filter | tournament_compare | loop_until_done | scheduled_stateful_loop | human_led_workflow
    rationale:

  required_controls:
    state_required: true | false
    objective_gate_required: true | false
    maker_checker_required: true | false
    human_review_required: true | false
    token_budget_required: true | false
    audit_record_required: true | false

  decision:
    verdict: approved | approved_with_constraints | rejected | human_led_required
    notes:
```

## Normative rules

1. **Selection precedes execution.** The declaration must exist and carry a verdict before the
   task's Agent Harness Contract is filled and before any skill runs.
2. **A rationale is required.** Both `recommended_vehicle.rationale` and
   `recommended_pattern.rationale` must state why this topology is proportional to the task shape
   and risk — proportionality, not capability, justifies the choice.
3. **Loop patterns inherit the loop rule.** If `recommended_pattern.type` is `loop_until_done` or
   `scheduled_stateful_loop`, the selection must satisfy the
   [Objective Gate Policy](objective-gate-policy.md): objective stop condition, budget, persistent
   state when recurring, objective gate when artifacts change, and human review before irreversible
   action. Without an objective gate, the verdict must be `rejected` or `human_led_required`.
4. **No verification, no autonomy.** If `task_shape.objective_verification_available` is `false`,
   autonomous loop vehicles are not admissible; the vehicle degrades toward `human_led_workflow`
   (see [Execution Vehicle Selection](../concepts/execution-vehicle-selection.md)).
5. **Irreversibility requires human review.** If `risk.irreversible_action_possible` is `true`,
   `required_controls.human_review_required` must be `true`.
6. **The verdict is a selection verdict, not a permission verdict.** `approved |
   approved_with_constraints | rejected | human_led_required` decides whether this *topology* may be
   used. Per-action permission outcomes remain the AHGE harness decision values and the
   [policy verdicts](policy-verdicts.md) projection — this declaration does not replace them.

## Relationship to the layer chain

```txt
request → task assessment → execution pattern selection (this declaration)
  → orchestration contract (when orchestrated)
  → agent harness contract (per-task envelope)
  → skills → harness authorization (AHGE) → gates → audit → human review
```

The selection consumes the REGC effort and risk classification
([runtime-effort-governance-contract.md](runtime-effort-governance-contract.md)); it does not
re-decide effort. Each selected topology executes under an
[Agent Harness Contract](agent-harness-contract.md); per-action authorization and the governance
record stay with the [Agent Harness Governance Extension](agent-harness-governance-extension.md).

## Related

- [Execution Pattern Governance](../concepts/execution-pattern-governance.md) — concept and three-axis distinction
- [Execution Pattern Library](../concepts/execution-pattern-library.md) — the ten patterns and selection rules
- [Execution Vehicle Selection](../concepts/execution-vehicle-selection.md) — vehicle vs pattern, proportionality
- [Orchestration Contract](orchestration-contract.md) — required when the vehicle is `orchestrated_workflow`
- [Objective Gate Policy](objective-gate-policy.md) — the loop permission rule
- [Maker-Checker Policy](maker-checker-policy.md) — when `maker_checker_required` is `true`
- [Execution Audit Record](execution-audit-record.md) — how the selection is audited
