# Context-Rot Controls

## What this is

Long agent sessions degrade. **Context rot** is the slow loss of coherence as history grows: the
agent starts to contradict itself, forget active constraints, or drift from the goal. These
controls keep a long session reviewable and restartable.

This complements — does not duplicate — the repo's continuity surfaces:
[agent-handoffs.md](agent-handoffs.md), [work-slice-pattern.md](work-slice-pattern.md), and
[slice-finalization-and-restart.md](../guides/slice-finalization-and-restart.md). Those describe how
to hand off and restart; this describes the *signals* that say it is time, and a checkpoint shape.

## Signals of context rot

- the agent contradicts a previous decision;
- the agent forgets an active constraint;
- the agent repeats a question already answered;
- the agent mixes sources or projects;
- the agent uses an old plan after the scope changed;
- the agent adds complexity without new evidence;
- the agent loses track of the main objective.

## Minimal controls

```txt
Checkpoint at each milestone.
Summarize the decision before a structural change.
Re-anchor to the contract when context grows too far.
Hand off when the task exceeds its original scope.
Start a new session when history hurts more than it helps.
```

## Checkpoint template

```yaml
context_checkpoint:
  task_id:
  current_goal:
  decisions_made:
    - decision:
      rationale:
      source_or_evidence:
  active_constraints:
    -
  open_questions:
    -
  next_action:
  stop_conditions:
    -
```

A fuller fill-in version lives in the Adaptative Skills repo (`templates/context-rot-checkpoint.md`).

## Related

- [Agent Harness Contract](../contracts/agent-harness-contract.md) — declares the envelope a long session must stay within
- [agent-handoffs.md](agent-handoffs.md), [work-slice-pattern.md](work-slice-pattern.md), [slice-finalization-and-restart.md](../guides/slice-finalization-and-restart.md)
