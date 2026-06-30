# Loop Readiness Review Checklist

Use this checklist before accepting `loop_until_done` or `scheduled_stateful_loop` as the execution topology for a Work Slice.

## Checklist

- [ ] The Work Slice and execution pattern selection are identified.
- [ ] The proposed loop purpose is narrow and does not create a new lifecycle.
- [ ] The stop condition is objective and externally verifiable.
- [ ] A hard budget exists: iterations, time, token/cost or all applicable limits.
- [ ] An objective gate exists before any artifact-changing acceptance.
- [ ] Recurring or scheduled loops have a `loop_state` reference.
- [ ] Review capacity is explicit: reviewer, cadence, max unreviewed iterations and escalation owner.
- [ ] Drift signals and stop/rescope conditions are declared.
- [ ] Sensitive or irreversible actions require human review.
- [ ] Evidence refs and source refs support the verdict.
- [ ] Missing evidence is marked `unavailable`, not guessed.

## Reviewer note

A loop that cannot be reviewed is not ready. Reduce the loop, add a human checkpoint, or degrade to human-led execution.
