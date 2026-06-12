# Execution Pattern Library

## What this is

The **execution pattern library** is the agnostic catalog of execution topologies AletheIA may
select for a task. A pattern names the *shape* of execution — how work is split, routed, verified,
repeated, or decided — independent of any provider, runtime, or agent framework.

Loop is **one pattern among ten**, not the center of the system. The library exists precisely so
that recurring work, judgment work, exploration work, and one-off work each get the shape they
deserve instead of everything becoming a loop.

This is a catalog of declared options, not a runtime. Selection is governed by
[Execution Pattern Governance](execution-pattern-governance.md); the vehicle question (manual
prompt vs. agent vs. workflow vs. loop vs. human-led) is covered in
[Execution Vehicle Selection](execution-vehicle-selection.md).

## The ten patterns

| Pattern | Use when |
|---|---|
| `manual_prompt` | the task is one-off, small, reversible, and needs no orchestration |
| `single_agent` | a bounded task can be solved by one agent with sufficient context and low risk |
| `classify_and_act` | the first decision is classifying the input type and routing to the correct flow |
| `fan_out_and_synthesize` | there are many independent units and a later synthesis step |
| `adversarial_verification` | the output must be confronted against a source, contract, rubric, or evidence |
| `generate_and_filter` | quality comes from generating many alternatives and selecting rigorously |
| `tournament_compare` | plausible approaches compete and comparison is more reliable than an absolute score |
| `loop_until_done` | the volume of work is uncertain and an **objective stop condition exists** |
| `scheduled_stateful_loop` | there is recurrence, persistent state, a budget, an objective gate, and human review |
| `human_led_workflow` | the decision depends on human judgment, policy, strategy, high risk, or high ambiguity |

## Selection rules

```txt
Se é pontual e pequeno → manual_prompt ou single_agent.
Se precisa classificar antes de agir → classify_and_act.
Se há muitas unidades independentes → fan_out_and_synthesize.
Se há risco de erro factual ou contratual → adversarial_verification.
Se precisa explorar muitas alternativas → generate_and_filter.
Se há várias estratégias plausíveis → tournament_compare.
Se precisa repetir até acabar → loop_until_done, mas só com stop condition objetiva.
Se precisa rodar com recorrência → scheduled_stateful_loop, mas só com state, budget, gate e audit.
Se depende de julgamento sensível → human_led_workflow.
```

(In English: one-off and small → manual prompt or single agent; classify before acting →
classify-and-act; many independent units → fan-out-and-synthesize; factual or contractual error
risk → adversarial verification; many alternatives to explore → generate-and-filter; several
plausible strategies → tournament/compare; repeat until done → loop-until-done, but only with an
objective stop condition; recurring runs → scheduled stateful loop, but only with state, budget,
gate, and audit; sensitive judgment → human-led workflow.)

## Application examples

### Engineering

- **CI triage:** `classify_and_act` + `scheduled_stateful_loop`.
- **Dependency bump:** `loop_until_done` with a test gate.
- **Broad refactor:** `fan_out_and_synthesize` + `adversarial_verification` + human review.

### Product and research

- **100 interviews:** `fan_out_and_synthesize` + canonicalize + score + `generate_and_filter`.
- **PRD review:** `adversarial_verification`.
- **Product strategy:** `tournament_compare`, with human review.

### Governance

- **Knowledge source conflict:** `classify_and_act` + `adversarial_verification`.
- **Feature Value review:** `generate_and_filter` or `tournament_compare` — never an autonomous loop.
- **Skill evolution validation:** `adversarial_verification` + eval cases.

## Related

- [Execution Pattern Governance](execution-pattern-governance.md) — the layer that selects from this library
- [Execution Vehicle Selection](execution-vehicle-selection.md) — proportionality and verification-before-autonomy
- [Comprehension Debt](comprehension-debt.md) — required review for volume-generating patterns
- [Agent Harness Contract](agent-harness-contract.md) — every selected pattern still runs under a per-task envelope
