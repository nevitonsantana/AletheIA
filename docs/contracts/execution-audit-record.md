# Execution Audit Record — Extension View

## Purpose

Define the **pattern-level audit fields** an executed task must leave behind: the pattern that was
selected, the vehicle it ran in, the skill and tool used, the gate that verified it, the evidence
it produced, what it cost, where its state lives, and the decision that closed it. These fields are
declared as an **extension view over the AHGE governance record** — the per-action record defined
by the [Agent Harness Governance Extension](agent-harness-governance-extension.md) and structured
by [`schemas/agent-harness-governance-record.schema.json`](../../schemas/agent-harness-governance-record.schema.json).

The AHGE record remains the **record authority**: it already captures, per action, the tool name,
risk and side-effect class, permission decision, decision authority, budget profile, and stop
reason. This view does **not** create a parallel record. It aggregates and references those
per-action entries at the level of the *executed pattern*, so a reviewer can answer "which topology
ran, under which gate, at what cost, and with what outcome" without re-reading every action line.
Field names here are chosen not to collide with the schema's per-action fields (`action_id`,
`tool_name`, `permission_decision`, `budget_profile`, `stop_reason`, …); where they overlap in
meaning, the view field is a reference into the record, never a restatement.

This document is docs-first and normative: it declares a reviewable shape; it does not implement a
logger, store, or reporting pipeline.

## Non-goals

- No runtime — no audit logger, collector, or reporting mechanism is implemented here.
- No parallel record — the AHGE governance record is the single audit authority; this view points
  into it via `governance_record_refs` and adds pattern-level fields only.
- No new verdict vocabulary — outcomes referenced here use the existing
  [policy verdicts](policy-verdicts.md), the AHGE decision values, and the selection verdicts of
  the [execution pattern selection](execution-pattern-selection.md).

## Declaration shape

```yaml
execution_audit_extension:
  execution_id:
  task_id:

  pattern_selected:            # from execution_pattern_selection.recommended_pattern.type
  vehicle:                     # from execution_pattern_selection.recommended_vehicle.type
  selection_verdict_ref:       # the selection declaration this execution ran under

  skill_used:
  tool_used:                   # references tool_name entries in the AHGE record

  gate:
    gate_type:                 # objective gate, checker, or human review
    gate_result:

  evidence_refs:
    - <evidence-reference>

  cost:
    tokens_used:
    runtime:
    iterations:

  loop_state_ref:              # loop_state record, when the pattern is a loop
  governance_record_refs:      # the AHGE per-action record entries this view aggregates
    - <record-reference>

  decision:                    # the outcome that closed the execution
```

## Normative rules

1. **The AHGE record is authoritative.** Every claim in the extension view must be resolvable to
   per-action entries in the AHGE governance record via `governance_record_refs`. A view entry that
   points at nothing is not auditable and is not admissible.
2. **The selection is part of the audit.** `pattern_selected`, `vehicle`, and
   `selection_verdict_ref` must match the [execution pattern selection](execution-pattern-selection.md)
   declaration that approved the topology. An execution whose audited pattern differs from its
   selected pattern is a governance finding, not a footnote.
3. **Gates leave evidence.** `gate.gate_result` and `evidence_refs` must be filled whenever the
   selection declared `objective_gate_required`, `maker_checker_required`, or
   `human_review_required` — a gate without a recorded result is a claim, not a check (see
   [Objective Gate Policy](objective-gate-policy.md) and
   [Maker-Checker Policy](maker-checker-policy.md)).
4. **Cost is recorded, not estimated.** `cost` reflects what the execution actually consumed; the
   budget semantics and exhaustion handling belong to
   [AHGE](agent-harness-governance-extension.md).
5. **Loops point at their state.** When the executed pattern is `loop_until_done` or
   `scheduled_stateful_loop`, `loop_state_ref` must point at the
   [loop state](loop-state-contract.md) record.
6. **Knowledge Governance restricts what may be audited.** Evidence references and view fields must
   respect the [restricted knowledge usage policy](restricted-knowledge-usage-policy.md); restricted
   content is referenced, never copied into the audit surface.

## Comprehension debt review

Volume-generating patterns — fan-out, generate-and-filter, tournament, and recurring loops — can
produce more artifacts than reviewers absorb. The audit surface therefore includes a periodic
**comprehension debt review** per execution or recurring pattern; the concept is defined in
[concepts/comprehension-debt.md](../concepts/comprehension-debt.md).

```yaml
comprehension_debt_review:
  execution_id:
  pattern:
  period:
  artifacts_generated:
  artifacts_reviewed_by_human:
  accepted_change_rate:
  unread_artifact_risk: low | medium | high
  reviewer_capacity:
  debt_signals:
    - repeated_confusion
    - unknown_generated_area
    - fragile_gate
    - high_output_volume
  decision: continue | reduce_scope | pause | retire
```

The review `decision` is binding on the pattern, not on a single run: `reduce_scope`, `pause`, or
`retire` feeds back into the next [execution pattern selection](execution-pattern-selection.md) —
a pattern whose output is not being read has lost the proportionality that justified it.

## Related

- [Agent Harness Governance Extension](agent-harness-governance-extension.md) — the record authority this view extends
- [Execution Pattern Selection](execution-pattern-selection.md) — the upstream selection audited here
- [Orchestration Contract](orchestration-contract.md) — the `audit` block that feeds this view
- [Loop State Contract](loop-state-contract.md) — `loop_state_ref` target
- [Objective Gate Policy](objective-gate-policy.md) / [Maker-Checker Policy](maker-checker-policy.md) — the gates whose results are recorded
- [Comprehension Debt](../concepts/comprehension-debt.md) — the concept behind the periodic review
- [agent-action-audit-record.md](agent-action-audit-record.md) — the existing per-action audit surface
