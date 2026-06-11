# Comprehension Debt

## What this is

**Comprehension debt** is the gap between what an execution pattern *generates* and what any human
actually *reads, understands, and stands behind*. Volume-generating patterns — fan-out, generate-
and-filter, tournaments, loops — can produce diffs, drafts, and artifacts faster than reviewers can
absorb them. Unread output is not value; it is deferred risk.

This is a review discipline, not a runtime control. It is the governance counterweight that makes
the volume-generating patterns in the
[Execution Pattern Library](execution-pattern-library.md) admissible at all.

## What every volume-generating pattern must declare

Any pattern that generates output volume must declare, before it runs:

- who reads the diffs or outputs;
- what percentage must be reviewed;
- which gate proves quality;
- when to pause the workflow;
- when to reduce scope;
- when to require human review.

If none of these can be answered, the pattern is generating debt by design and should be rejected
or downgraded at selection time (see
[Execution Vehicle Selection](execution-vehicle-selection.md)).

## Comprehension debt is not context rot

These are related but distinct failure modes, and they require different controls.
**[Context rot](context-rot-controls.md)** is degradation *inside one agent session*: as history
grows, the agent contradicts itself, forgets constraints, or drifts from the goal — the agent's
working memory decays. **Comprehension debt** is degradation *on the human side of the system*:
the agents may be perfectly coherent while producing more artifacts than any reviewer reads, so
human understanding of the generated work decays. Context rot is fixed with checkpoints, re-anchoring,
and session restarts; comprehension debt is fixed with declared readership, review percentages,
quality gates, and the discipline to pause or reduce scope. A workflow can have zero context rot
and still be drowning in comprehension debt.

## Review shape

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

## Related

- [Execution Pattern Governance](execution-pattern-governance.md) — the layer that demands this declaration
- [Execution Pattern Library](execution-pattern-library.md) — which patterns generate volume
- [Context-Rot Controls](context-rot-controls.md) — the in-session counterpart failure mode
- [Agent Harness Contract](agent-harness-contract.md) — the per-task envelope the reviewed work runs under
