# Execution Pattern Governance

## What this is

**Execution Pattern Governance** is the layer where AletheIA decides *which shape of execution* a
task deserves before anything runs. AletheIA must not decide only *which* agent or skill to use: it
must decide **which execution pattern is proportional to the work type, the risk, the cost, the
context, and the verification available**.

It is a **selection discipline**, not a runtime, scheduler, orchestrator, or policy engine. It is
docs-first and provider-agnostic: external references may inspire it, but the internal language
stays vendor-neutral.

![Infographic: AletheIA at the center as the decision layer, surrounded by Knowledge Governance, Adaptative Skills, Agent Harness, Enforcement, and Audit. At the lower center, Execution Pattern Selection lists the options manual prompt, single agent, classify-and-act, fan-out-and-synthesize, adversarial verification, generate-and-filter, tournament, loop until done, scheduled stateful loop, and human-led workflow. A flow at the base shows request, pattern selection, orchestration contract, skill compatibility, harness controls, objective gate, loop state, audit, and human review.](assets/infografico_execution_pattern_governance_aletheia_adaptative_skills.png)

## Where it sits

Pattern selection sits **upstream of the per-task envelope**: first AletheIA picks the topology of
execution, then the task declares its [Agent Harness Contract](agent-harness-contract.md) (AHC,
[ADR-013](../adr/ADR-013-agent-harness-contract.md)) and the rest of the chain applies.

```txt
User request
  ↓
AletheIA Task Assessment
  ↓
Execution Pattern Selection
  ↓
Orchestration Contract
  ↓
Adaptative Skills
  ↓
Agent Harness
  ↓
Policy / Enforcement Gates
  ↓
Objective Verification + Loop State + Audit
  ↓
Human Review / Final Decision
```

## Responsibilities per layer

| Layer | Responsibility |
|---|---|
| AletheIA | Assesses task type, risk, uncertainty, recurrence, and verifiability; selects the execution pattern; defines the orchestration contract; defines gates, autonomy, and human review; records the decision |
| Adaptative Skills | Declares reusable capabilities; declares compatibility with execution patterns; declares the evidence each pattern requires; declares incompatibilities, escalation triggers, and handoff |
| Knowledge Governance Layer | Defines authorized sources, retrieval mode, precedence, and restrictions; prevents misuse of context in state, logs, and outputs |
| Agent Harness | Controls tools, worktree, permissions, sandbox, commands, logs, and rollback |
| Enforcement | Applies allow, deny, require approval, transform, or log only (the existing [AHGE](../contracts/agent-harness-governance-extension.md) verdict vocabulary — reused, not redefined) |
| Audit / Observability | Records selected pattern, skill used, tool used, gate, evidence, cost, state, and decision |

## Three axes, not one

Pattern selection introduces a third axis. The three are orthogonal and must not be conflated:

| Axis | Question it answers | Authority |
|---|---|---|
| **Execution pattern** | *which shape* — the topology of execution (single agent? fan-out? loop? tournament?) | this layer |
| **Execution mode** | *how deep* — how deep a capability runs (basic / extended / high-risk / multi-agent) | the Adaptative Skills repo (`docs/execution-modes.md`) |
| **Autonomy level** | *how much authority* — `observe` / `advise` / `act_with_approval` / `autonomous_within_bounds` | [autonomy-levels.md](autonomy-levels.md), carried by the AHC |

Every document in this layer that mentions patterns must keep this distinction. Choosing
`fan_out_and_synthesize` (topology) says nothing about how deep each unit runs (mode) or what each
unit is allowed to do (autonomy) — those are declared on their own axes.

## Principles

1. **Agnosticism.** External references may inspire, but internal language remains vendor-neutral.
2. **Proportionality.** The execution pattern must be proportional to risk, cost, uncertainty, and
   the verification available.
3. **Verification before autonomy.** Without an objective gate, there is no autonomous loop — only
   an assisted workflow or human judgment.
4. **Orchestration is a governable artifact.** If there is routing, scoring, filtering, rerun, or
   comparison logic, it must be documented, reviewable, and auditable.
5. **Skills do not execute policy.** Adaptative Skills declares compatibility, evidence, and
   limits; harness and enforcement apply the limits.

## Related

- [Execution Pattern Library](execution-pattern-library.md) — the ten patterns and the selection rules
- [Execution Vehicle Selection](execution-vehicle-selection.md) — vehicle vs. pattern, proportionality
- [Comprehension Debt](comprehension-debt.md) — the cost of generating more than anyone reads
- [Agent Harness Contract](agent-harness-contract.md) — the per-task envelope downstream of pattern selection
- [ADR-013](../adr/ADR-013-agent-harness-contract.md) — the AHC reconciliation decision this layer composes with
