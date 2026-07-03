# Agent Role Contract Reconciliation

## Purpose

Define how project-facing professional roles, such as Software Engineer or QA/Governance Reviewer,
map onto AletheIA's portable agent-role catalog without creating a second authority model.

This contract satisfies the S12 pilot boundary: make authority, allowed capabilities/tools,
evidence, stop rules and handoff behavior explicit for one real Work Slice shape.

## Boundary

This is a role reconciliation contract. It is not:

- a second role catalog;
- a seven-agent orchestration suite;
- a provider-specific agent file;
- an automatic router;
- a runtime, scheduler, backend or policy engine;
- authority to approve gates, merge code, mutate skills or close Work Slices.

## Canonical mapping

Professional role names are local projections over portable AletheIA roles.

| Professional projection | Portable role | Primary purpose | Must not imply |
|---|---|---|---|
| `software_engineer` | `implementer` | Execute a bounded code/docs/config slice after scope is clear | Architecture authority, merge authority or validation self-approval |
| `qa_governance_reviewer` | `reviewer` | Challenge semantic risk, evidence gaps, contract drift and governance fit | Final human acceptance, broad redesign or implementation ownership |

The portable role remains canonical. The professional projection helps a human understand the stance
used in a specific Work Slice.

## Minimum role plan record

Use this shape inside a Work Slice, execution plan, orchestration contract, AHC, handoff or closure
record. It is not a standalone lifecycle.

```yaml
agent_role_plan:
  plan_id: role-plan-001
  work_slice_ref: string
  professional_projection: software_engineer | qa_governance_reviewer
  portable_role: implementer | reviewer
  runtime_or_provider: codex | claude_code | qwen | human | other | unavailable
  authority:
    autonomy_level: observe | advise | act_with_approval | autonomous_within_bounds
    may_modify_artifacts: true | false
    may_approve_gate: false
    may_merge_or_deploy: false
  allowed_capabilities: []
  allowed_skills: []
  allowed_tools: []
  blocked_actions: []
  required_inputs: []
  expected_outputs: []
  evidence_required: []
  stop_rules: []
  handoff:
    target_role: implementer | reviewer | validator | orchestrator | human_owner | none
    trigger: string
    handoff_refs: []
  source_refs: []
```

## Normative rules

1. **Portable role is canonical.** Professional labels are projections; they do not redefine the role.
2. **Every role plan declares authority.** Autonomy, modification rights, gate approval and merge/deploy
   authority must be visible.
3. **No self-approval.** A Software Engineer / implementer may produce evidence, but cannot be the only
   approval source for a review-required slice.
4. **QA/Governance Reviewer is critique authority, not final acceptance.** The reviewer can recommend
   proceed, revise, stop or escalate; final acceptance remains with the human owner and existing gates.
5. **Skills and tools are allowed inputs, not role definitions.** A selected skill or tool does not
   turn into a role, agent, authority or lifecycle state.
6. **Handoff must preserve proof expectation.** If work moves between roles or runtimes, the handoff
   carries remaining evidence expectations and unresolved stop conditions.
7. **Unavailable stays unavailable.** Missing provider, tool, skill, time, token or outcome data must be
   represented as `unavailable` or `unknown`, not inferred from the role name.

## Acceptance for S12

The S12 pilot is acceptable when:

- `software_engineer` maps to `implementer` with bounded execution authority;
- `qa_governance_reviewer` maps to `reviewer` with critique/review authority;
- both role plans declare allowed capabilities/tools, evidence, stop rules and handoff behavior;
- the example uses one real Work Slice shape without creating a multi-agent suite;
- provider/runtime references remain mappings, not canonical role definitions.

