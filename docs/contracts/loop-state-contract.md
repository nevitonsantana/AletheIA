# Loop State Contract — Specification

## Purpose

Define the **persistent state a recurring loop must keep** so that a `scheduled_stateful_loop` —
and any `loop_until_done` that recurs — remains resumable, auditable, and honest about what is
done, what is in progress, what was escalated, and what risks remain open. State is one of the loop
preconditions in the [Objective Gate Policy](objective-gate-policy.md): a recurring loop without
persistent state is not admissible.

This contract is docs-first: it declares the shape of the state record; it does not implement a
store, a scheduler, or a state machine.

## Non-goals

- No runtime state store, scheduler, or persistence mechanism — the shape is a declaration; where
  and how it is stored is a project decision governed elsewhere.
- No restating of loop permission rules — the conditions under which a loop may run at all are in
  the [Objective Gate Policy](objective-gate-policy.md); this contract only defines what the state
  must contain once a loop is permitted.
- No parallel audit record — evidence references in the state point into the audit surface defined
  by the [Execution Audit Record](execution-audit-record.md).

## Declaration shape

```yaml
loop_state:
  loop_id:
  last_run:
  current_goal:
  completed:
    - item:
      evidence:
  in_progress:
    - item:
      next_action:
  escalated:
    - item:
      reason:
      owner:
  lessons_learned:
    - date:
      note:
  stop_conditions_met:
    - condition:
      evidence:
  unresolved_risks:
    - risk:
      mitigation:
  next_action:
```

## Normative rules

1. **Recurring loops must persist state.** Any loop that runs more than once across sessions or
   schedules must maintain this record; without it, each run re-discovers context, repeats work, and
   loses escalations.
2. **Completion claims require evidence.** Every `completed[]` item and every
   `stop_conditions_met[]` entry must carry an `evidence` reference. A loop must not mark its own
   work done on self-assessment alone (see [Maker-Checker Policy](maker-checker-policy.md)).
3. **Escalations must name an owner.** Every `escalated[]` item must carry a `reason` and an
   `owner`; an escalation without a human or role accountable for it is not an escalation.
4. **Open risk is recorded, not hidden.** `unresolved_risks[]` must list what the loop knows is
   unhandled, with its current `mitigation`; an empty risk list is a claim that must survive review.
5. **Knowledge Governance restricts what may be persisted.** The
   [Knowledge Governance Layer](../adr/ADR-008-knowledge-governance-layer.md) governs source
   authority, sensitivity, and restrictions. **No restricted context may be persisted in loop state
   or logs**: state entries, evidence references, and lessons learned must respect the
   [restricted knowledge usage policy](restricted-knowledge-usage-policy.md) and the sensitivity
   rules of the [knowledge source contract](knowledge-source-contract.md). Persisting restricted
   content into a long-lived state record is a governance violation, not a convenience.

## Related

- [Objective Gate Policy](objective-gate-policy.md) — when a loop is permitted at all
- [Execution Pattern Selection](execution-pattern-selection.md) — where `state_required` is declared
- [Execution Pattern Library](../concepts/execution-pattern-library.md) — `loop_until_done` and `scheduled_stateful_loop`
- [Orchestration Contract](orchestration-contract.md) — `rerun_logic` for orchestrated reruns
- [Execution Audit Record](execution-audit-record.md) — where loop evidence is audited
- [ADR-008 — Knowledge Governance Layer](../adr/ADR-008-knowledge-governance-layer.md) — persistence restrictions
