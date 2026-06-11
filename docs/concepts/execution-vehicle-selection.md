# Execution Vehicle Selection

## What this is

The **execution vehicle** is the coarse answer to "what kind of thing runs this task at all":

```txt
manual_prompt | single_agent | orchestrated_workflow | loop | human_led_workflow
```

It is the first, coarse-grained cut; the **execution pattern** is the finer topology inside it. A
vehicle of `orchestrated_workflow` may resolve to `fan_out_and_synthesize`,
`adversarial_verification`, `generate_and_filter`, or `tournament_compare`; a vehicle of `loop`
resolves to `loop_until_done` or `scheduled_stateful_loop`. Both are declared in the pattern
selection — vehicle first, pattern second, each with its own rationale.

This is a declared selection, not a scheduler or runtime. The full catalog lives in the
[Execution Pattern Library](execution-pattern-library.md).

## Vehicle vs. pattern

| Concept | Granularity | Question |
|---|---|---|
| Vehicle | coarse | does this need a prompt, an agent, a workflow, a loop, or a human at the wheel? |
| Pattern | fine | inside that vehicle, which topology — routing, fan-out, verification, filtering, comparison, repetition? |

Neither one is the execution *mode* (how deep a capability runs — the Adaptative Skills repo,
`docs/execution-modes.md`) nor the *autonomy level* (how much authority —
[autonomy-levels.md](autonomy-levels.md)). See
[Execution Pattern Governance](execution-pattern-governance.md) for the three-axis distinction.

## Proportionality

The execution pattern must be **proportional to risk, cost, uncertainty, and the verification
available**. The failure modes proportionality prevents:

- one-off tasks turned into unnecessary automations;
- judgment tasks treated as technical loops;
- research workflows confused with single agents;
- adversarial verification replaced by the agent grading itself;
- fan-out without synthesis — volume without decision;
- tournaments where a checklist would do;
- loops without a stop condition burning tokens and creating risk.

A heavier vehicle is never a quality upgrade by itself; it is a cost and a risk that must be paid
for by the shape of the work.

## Verification before autonomy

**Without an objective gate, there is no autonomous loop.** If no objective verification is
available for the task — no test, no reproducible check, no contract to confront — the only
admissible vehicles are an assisted workflow or human judgment (`human_led_workflow`). Autonomy is
earned by verifiability, not by confidence.

This rule is what keeps `loop` from becoming the default: `loop_until_done` requires a verifiable
stop condition, and `scheduled_stateful_loop` additionally requires persistent state, a budget, an
objective gate, an audit record, and human review before any irreversible action.

## Related

- [Execution Pattern Governance](execution-pattern-governance.md) — where selection sits in the layer chain
- [Execution Pattern Library](execution-pattern-library.md) — the ten patterns and selection rules
- [Comprehension Debt](comprehension-debt.md) — the review obligation that volume-generating vehicles incur
- [Agent Harness Contract](agent-harness-contract.md) — the per-task envelope declared after the vehicle and pattern
