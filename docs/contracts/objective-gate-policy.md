# Objective Gate Policy — Loop Permission Rule

## Purpose

Define **when a loop is permitted** and what an **objective gate** is. Loops — `loop_until_done`
and `scheduled_stateful_loop` in the
[Execution Pattern Library](../concepts/execution-pattern-library.md) — are the patterns most
likely to burn budget, accumulate unread output, and act past the point where a human is watching.
This policy is the precondition list that makes them admissible, and the rule that degrades the
vehicle when the preconditions cannot be met.

This policy is docs-first and normative: it states what is required; it does not implement a gate
runner or a scheduler.

## Non-goals

- No restating of the AHC `gates` block or the autonomy taxonomy — gate placement is declared in
  the [Agent Harness Contract](agent-harness-contract.md) `gates` block, and authority is declared
  with [autonomy levels](../concepts/autonomy-levels.md); this policy references both.
- No new verdict vocabulary — when a gate fails, the resulting permission outcomes use the
  [policy verdicts](policy-verdicts.md) and the AHGE decision values.
- No runtime enforcement — the policy is honored by selection and review, and structurally by the
  schemas when they exist.

## The loop rule

A loop is permitted **only** when all of the following hold:

```yaml
loop_permission_rule:
  required:
    - objective_stop_condition      # a verifiable condition that ends the loop
    - budget                        # token, time, or iteration budget — hard limit
    - persistent_state_when_recurring   # loop_state record when the loop recurs
    - objective_gate_when_changing_artifacts  # a gate proves quality before artifacts change
    - human_review_before_irreversible_action
```

- **(a) Objective stop condition.** The loop must declare a condition that verifiably ends it
  (`rerun_logic.stop_condition` in the [Orchestration Contract](orchestration-contract.md), or the
  stop condition of the selected pattern). "Until it looks good" is not a stop condition.
- **(b) Budget.** A token, time, or iteration budget is required and is a hard limit. Budget
  semantics belong to [AHGE](agent-harness-governance-extension.md); exhaustion stops the loop —
  continuation is a policy or human decision.
- **(c) Persistent state when recurring.** A recurring loop must keep the
  [loop state](loop-state-contract.md) record.
- **(d) Objective gate when it changes artifacts.** Any loop that modifies artifacts must pass an
  objective gate before the change is accepted.
- **(e) Human review before irreversible action.** No loop may take an irreversible action without
  human review, regardless of how many gates it has passed.

## What an objective gate is

An **objective gate** is a verification that is **verifiable and machine- or rubric-checkable, and
is not the executing agent's self-assessment**. Examples: a test suite passing, a schema
validation, a typecheck, a linter, a reproduction command that no longer fails, an explicit rubric
applied by a reviewer other than the maker. "The agent says it is done" is never an objective gate.

Gate *placement* — before write, before delete, before external call, before structural change,
before final answer — is declared in the [Agent Harness Contract](agent-harness-contract.md)
`gates` block; the computational and inferential checks available are the AHC `sensors`. This
policy adds the requirement that, for loops, at least one such gate must be **objective** in the
sense above.

## Degradation rule

```txt
no objective gate available
  → no autonomous loop
  → the execution vehicle becomes human_led_workflow,
    or execution proceeds only as assisted (human-gated) execution
```

If `objective_verification_available` is `false` in the
[execution pattern selection](execution-pattern-selection.md), a loop pattern must not receive an
`approved` verdict: the selection verdict is `human_led_required` (or `rejected`), and the vehicle
degrades to `human_led_workflow` or to assisted execution where a human holds the gate. Autonomy is
earned by verification, not assumed (see
[Execution Vehicle Selection](../concepts/execution-vehicle-selection.md) and
[autonomy levels](../concepts/autonomy-levels.md)).

## Related

- [Execution Pattern Selection](execution-pattern-selection.md) — where `objective_gate_required` is declared
- [Loop State Contract](loop-state-contract.md) — precondition (c)
- [Orchestration Contract](orchestration-contract.md) — `rerun_logic.stop_condition` / `max_iterations`
- [Maker-Checker Policy](maker-checker-policy.md) — why self-assessment is not a gate
- [Agent Harness Contract](agent-harness-contract.md) — `gates` and `sensors` blocks
- [Agent Harness Governance Extension](agent-harness-governance-extension.md) — budget semantics
