# Orchestration Contract — Specification

## Purpose

Define the **declared shape of an orchestrated workflow**: its stages, what routes work between
stages, what scores and filters candidate outputs, what allows a rerun, what budget bounds it, what
safety policy constrains it, and what audit it must leave behind. An orchestration contract is
required whenever the [execution pattern selection](execution-pattern-selection.md) recommends the
`orchestrated_workflow` vehicle or a multi-stage pattern from the
[Execution Pattern Library](../concepts/execution-pattern-library.md).

This contract is docs-first and advisory-first: it declares a reviewable structure; it does not
implement a scheduler, router, or workflow engine.

## Non-goals

- No runtime orchestrator, scheduler, or automation — the contract is a declaration to review and
  audit, not a mechanism that executes.
- No new safety or permission vocabulary — the `safety` block references the
  [Agent Harness Contract](agent-harness-contract.md) (AHC) and the
  [Agent Harness Governance Extension](agent-harness-governance-extension.md) (AHGE); it does not
  define parallel tool, gate, or verdict taxonomies.
- No restating of AHC/AHGE/REGC field tables — stages reference the contracts that govern them.

## Declaration shape

```yaml
orchestration_contract:
  orchestration_id:
  pattern:
  purpose:
  generated_by: human | agent | mixed

  stages:
    - stage_id:
      name:
      pattern:
      input:
      output:
      skill_used:
      model_or_agent_profile:
      gate:
      evidence_required:

  routing_logic:
    description:
    deterministic: true | false
    owner:

  scoring_logic:
    description:
    formula:
    review_required: true | false

  filter_logic:
    description:
    criteria:

  rerun_logic:
    description:
    stop_condition:
    max_iterations:

  budget:
    max_tokens:
    max_runtime:
    max_parallel_agents:

  safety:
    allowed_tools:
    restricted_tools:
    approval_gates:
    sensitive_context_policy:

  audit:
    output_artifacts:
    logs_required:
    evidence_refs_required:
```

## Normative rules

1. **Every stage executes under an Agent Harness Contract.** A stage is not a free agent: its
   autonomy, allowed tools, gates, and rollback are declared in the per-task
   [Agent Harness Contract](agent-harness-contract.md), and per-action authorization remains with
   [AHGE](agent-harness-governance-extension.md). The orchestration contract names the stage; the
   AHC bounds it.
2. **The safety block reuses existing vocabulary.** `allowed_tools` and `restricted_tools` use the
   AHC tool declaration and the AHGE tool registry classes; `approval_gates` use the AHC `gates`
   block and the [policy verdicts](policy-verdicts.md); `sensitive_context_policy` defers to the
   Knowledge Governance restrictions
   ([ADR-008](../adr/ADR-008-knowledge-governance-layer.md)). No new vocabulary is introduced here.
3. **All decision logic must be documented, reviewable, and auditable.** `routing_logic`,
   `scoring_logic`, `filter_logic`, and `rerun_logic` are first-class governed declarations:
   undocumented routing, scoring, filtering, or rerun behavior is not admissible in a governed
   workflow. Whoever reviews the contract must be able to answer *why* work moved, scored, was
   discarded, or ran again.
4. **Rerun is bounded.** `rerun_logic` must declare a `stop_condition` and `max_iterations`. A rerun
   loop without both violates the [Objective Gate Policy](objective-gate-policy.md).
5. **Budgets are required.** `max_tokens`, `max_runtime`, and `max_parallel_agents` must be set;
   budget exhaustion is a stop, not a model decision (the budget semantics are AHGE's).
6. **Audit is declared up front.** The `audit` block names the artifacts, logs, and evidence
   references the workflow must leave; the record itself is the AHGE governance record, viewed
   through the [Execution Audit Record](execution-audit-record.md).
7. **Volume-generating orchestrations must declare readership.** Fan-out, generate-and-filter, and
   tournament stages produce more output than reviewers may absorb; the
   [comprehension debt](../concepts/comprehension-debt.md) declaration applies.

## Related

- [Execution Pattern Selection](execution-pattern-selection.md) — the upstream selection that demands this contract
- [Execution Pattern Library](../concepts/execution-pattern-library.md) — the patterns a stage may use
- [Agent Harness Contract](agent-harness-contract.md) — the per-task envelope every stage runs under
- [Agent Harness Governance Extension](agent-harness-governance-extension.md) — per-action authorization, budgets, traces
- [Loop State Contract](loop-state-contract.md) — required state for recurring orchestrations
- [Execution Audit Record](execution-audit-record.md) — the audit view this contract feeds
