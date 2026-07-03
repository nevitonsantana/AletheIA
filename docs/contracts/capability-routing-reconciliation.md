# Capability Routing Reconciliation — Contract

## Purpose

Define the canonical mapping between capability, skill, tool, agent, subagent, execution vehicle,
execution pattern, Agent Harness Contract (AHC) and audit evidence for S10.

This document prevents the Resource Observatory and future routing work from inventing a second
vocabulary. It explains what each surface may declare, who owns it, and which evidence proves it was
used.

## Boundary

This is a docs-first reconciliation. It does not implement a routing engine, scheduler, backend,
collector, schema, policy engine, automatic provider selector, or Adaptive Skills authority over
AletheIA gates.

## Canonical mapping

| Term | Question answered | Primary owner | May declare | Must not declare | Evidence surface |
|---|---|---|---|---|---|
| Capability | What reusable operational unit fits the task? | Adaptive Skills capability metadata | fit, modes, risk hints, expected evidence, escalation hints | final gate, approval, global route, automatic execution | capability metadata, execution record, observation record |
| Skill | What method guides the work? | Adaptive Skills `skills/` | method, triggers, core moves, when not to use, required outputs | tool permission, approval, lifecycle state, AletheIA decision | skill activation, agent action audit, observation record |
| Tool | What performs a concrete operation? | Harness/runtime tool registry | input/output contract, side-effect class, risk class, result | task intent, governance decision, closure authority | AHGE tool result, agent action audit record |
| Agent | Who/what performs the task under a contract? | Consumer runtime under AletheIA governance | role, objective, autonomy, allowed skills/tools through AHC | permission outside AHC/AHGE, source authority, final acceptance | AHC, AHGE trace, execution audit record |
| Subagent | Which delegated bounded role handles a stage or review? | Orchestration contract + AHC | delegated objective, input, output, evidence and handoff | independent lifecycle, hidden routing, ungated side effects | orchestration audit, AHC per stage, handoff record |
| Execution vehicle | What kind of thing runs the task? | AletheIA execution-pattern governance | `manual_prompt`, `single_agent`, `orchestrated_workflow`, `loop`, `human_led_workflow` | exact skill, provider, tool result, approval | execution-pattern selection record |
| Execution pattern | Which topology is used inside the vehicle? | AletheIA execution-pattern governance | fan-out, verification, filtering, comparison, loop shape, rationale | tool permissions, skill canon changes, hidden scorer | execution-pattern selection and execution audit record |
| AHC | What envelope bounds one agent or stage? | AletheIA / consumer governance | autonomy, allowed/blocked skills and tools, gates, context, rollback, review | per-action allow/deny result, effort decision, source precedence | AHC instance, AHGE per-action records |
| AHGE | What happened at action level? | Harness/runtime honoring AletheIA | permission verdicts, tool exposure, budgets, tool result, action trace | task strategy, skill canon, final human acceptance | agent action audit record, execution audit record |
| Resource Observatory | What can be seen after the fact? | AletheIA visual/read-only projection | source-backed activation, usage, unavailable/unknown fields, references | route, execute, approve, rank or optimize by itself | visual events, resource signals, work records |

## Normative rules

1. **AletheIA decides macro posture; Adaptive Skills declares capability fit.** A capability hint can
   recommend a method or depth, but it cannot approve a Work Slice, close a gate, or own global
   routing.
2. **The runtime/harness executes and records.** Tools run in the consumer runtime or harness. Skills
   guide the method; they do not execute tools by themselves.
3. **Every selected agent or subagent runs inside an AHC.** Delegation is only admissible when the
   role, boundary, allowed tools/skills, evidence and handoff are declared.
4. **Routing is a reviewed declaration, not hidden behavior.** If work moves to a capability, agent,
   subagent or tool, the reason must be visible in an existing record.
5. **The Observatory is read-only.** It can show selected skills, tools, agents, subagents, patterns,
   outcomes and missing data, but it cannot route, execute, score, approve or optimize.
6. **Unavailable is neutral.** Missing capability, tool, cost, token, duration or outcome evidence is
   represented as `unknown` or `unavailable`, never inferred.
7. **No duplicate lifecycle.** Derived lanes, activated skills, agent roles and execution patterns do
   not create a second Work Slice lifecycle.
8. **No metric without comparable evidence.** Usage counts may be shown when recorded, but success
   rate, learning, repetition or optimization claims require comparable source-backed records.

## Minimum routing decision record

Use this shape inside an existing Work Slice, execution audit record, observation record or handoff.
It is not a new standalone schema.

```yaml
routing_decision:
  decision_id: route-<local-id>
  task_ref: <work-slice-or-task-id>
  selected_vehicle: manual_prompt | single_agent | orchestrated_workflow | loop | human_led_workflow
  selected_pattern: <execution-pattern-id-or-unavailable>
  selected_capabilities:
    - capability_id: <capability-or-unavailable>
      source_ref: <capability-metadata-or-skill-ref>
      rationale: <why this fit was selected>
      confidence: high | medium | low | unknown
  selected_skills:
    - skill_id: <skill-id>
      activation_reason: <why the method was used>
      source_ref: <skill-or-provider-ref>
  selected_agents:
    - agent_id: <agent-or-runtime-role>
      role: <role-name>
      ahc_ref: <agent-harness-contract-ref>
  selected_subagents:
    - subagent_id: <subagent-id-or-none>
      delegated_objective: <bounded objective>
      ahc_ref: <stage-ahc-ref>
  selected_tools:
    - tool_name: <tool-name>
      purpose: <why invoked>
      ahge_ref: <action-record-or-unavailable>
  decision_owner: human | agent_proposed_human_confirmed | runtime_recorded
  non_goals:
    - <what this routing decision must not imply>
  evidence_refs:
    - <source-ref>
```

## Worked decisions

### 1. Low-risk documentation correction

- **Vehicle:** `single_agent`
- **Pattern:** `standard` / no orchestration
- **Capability/skill:** documentation or `domain-language-alignment` style guidance when available
- **Tools:** filesystem read/write, focused tests, `git diff --check`
- **AHC posture:** `act_with_approval` if writing; human review before merge
- **Observable evidence:** selected skill, changed files, validation output, PR review
- **Do not infer:** success rate, broad documentation health or skill superiority

### 2. Debugging with objective gate

- **Vehicle:** `loop`
- **Pattern:** `bounded_debugging` / `loop_until_done`
- **Capability/skill:** `debugging`
- **Tools:** failing test or reproducible command, edit tool, test runner
- **AHC posture:** bounded write access, max iterations, rollback via git diff
- **Observable evidence:** iteration count, objective gate, tool results, final validation
- **Do not infer:** indefinite autonomy or future rerun permission

### 3. Design-system-aware review

- **Vehicle:** `single_agent` or `orchestrated_workflow` if separate reviewer is justified
- **Pattern:** `review_against_source` or bounded maker-checker
- **Capability/skill:** future Pulso-aware capability plus product/design review method
- **Tools:** source registry lookup, local docs/components inspection, optional screenshot/browser check
- **AHC posture:** read-only or draft-only unless a bounded implementation slice is approved
- **Observable evidence:** loaded design-system source refs, compliance notes, exceptions, review owner
- **Do not infer:** global design-system compliance or automatic remediation

### 4. Multi-agent governance review

- **Vehicle:** `orchestrated_workflow`
- **Pattern:** `adversarial_verification` or maker-checker
- **Capability/skill:** implementation method plus QA/Governance Reviewer role
- **Tools:** validation commands, source inspection, audit/checklist tools
- **AHC posture:** each agent/subagent has its own AHC; checker cannot silently approve itself
- **Observable evidence:** stage outputs, reviewer findings, gate result, handoff or reconcile record
- **Do not infer:** second authority catalog or reusable approval without current evidence

## Observatory projection

The Resource Observatory may display these fields when source-backed:

- selected vehicle and pattern;
- activated capabilities and skills;
- agent/subagent roles;
- invoked tools and permission verdicts;
- evidence refs and unavailable fields;
- outcome, human review and next safe step.

It must not display ranked skills, automatic recommendations, value scores or loop optimization until
comparable evidence exists and the backlog explicitly unlocks that projection.

## Related contracts

- [Execution Vehicle Selection](../concepts/execution-vehicle-selection.md)
- [Execution Pattern Selection](execution-pattern-selection.md)
- [Orchestration Contract](orchestration-contract.md)
- [Agent Harness Contract](agent-harness-contract.md)
- [Agent Harness Governance Extension](agent-harness-governance-extension.md)
- [Agent Action Audit Record](agent-action-audit-record.md)
- [Execution Audit Record](execution-audit-record.md)
- [Observation Governance Contract](observation-governance-contract.md)
- [Visual Operations Event Model](visual-operations-event-model.md)
- [Adaptive Skills capability model](https://github.com/nevitonsantana/adaptive-skills/blob/main/docs/capability-model.md)
