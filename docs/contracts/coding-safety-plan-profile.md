# Coding Safety Plan Profile

## Purpose

Define the minimum planning profile for a bounded coding Work Slice before implementation starts.

This profile specializes the existing Work Slice, Intent-to-Evidence, Agent Harness and readiness-gate
contracts for code changes. It does not create a new lifecycle, runtime, command, policy engine or
autonomous coding flow.

## When to use

Use this profile for `Standard` or `High-Assurance` coding slices when the work changes source code,
configuration, tests, build behavior, schemas, permissions, runtime behavior or documentation that
could affect how a system is used.

Lite coding work may use a compact version when the change is obviously reversible, local and low risk.

## Required plan fields

A coding plan MUST declare:

```yaml
coding_safety_plan:
  slice_id: string
  planning_depth: Lite | Standard | High-Assurance
  base_state:
    branch: string
    starting_commit: string
    dirty_state: clean | tracked_changes | untracked_present | unknown
    protected_paths: []
  intent_refs:
    intent_to_evidence_ref: not_needed | string
    work_slice_ref: string
  scope:
    in_scope: []
    out_of_scope: []
    assumptions: []
    human_decisions_needed: []
  execution_boundary:
    allowed_paths: []
    blocked_paths: []
    allowed_commands: []
    blocked_actions: []
  expected_changes:
    files_or_areas: []
    behavior_change: none | docs_only | test_only | code | config | schema | runtime | unknown
    user_visible_change: yes | no | unknown
  verification:
    commands: []
    expected_results: []
    manual_checks: []
    unavailable_checks: []
  drift_control:
    drift_signals: []
    check_cadence: before_commit | before_pr | per_checkpoint | manual
    response: tighten_scope | ask_human | stop | split_slice
  rollback:
    strategy: git_revert | restore_files | feature_flag | migration_rollback | not_applicable | unavailable
    rollback_refs: []
    irreversible_risks: []
  stop_conditions: []
  human_review:
    required: true | false
    reviewer_profile: non_engineer | engineer | domain_expert | security | owner
    review_focus: []
```

## Required invariants

1. **No coding without a base state.** The plan must identify branch, starting commit and dirty-state
   posture. Untracked files may exist, but their treatment must be explicit.
2. **Scope is narrower than intent.** The plan must list both `in_scope` and `out_of_scope` so the
   implementer can detect drift.
3. **Verification names expected results.** Commands alone are insufficient; the reviewer must know
   what passing means.
4. **Rollback or stop is explicit.** If rollback is `unavailable`, a human review or stop condition
   must explain why work can safely proceed.
5. **Human merge remains human.** Passing tests, AI confidence, or an implementation agent cannot
   authorize merge or deployment.
6. **No hidden runtime expansion.** The plan cannot introduce new runtime, backend, schema, collector,
   dependency, CLI, automation or policy-engine scope unless that scope is explicitly listed and
   authorized by the Work Slice.

## Non-engineer review checklist

A non-engineer reviewer should be able to answer:

- What will change?
- What will explicitly not change?
- How will we know it worked?
- What evidence should exist before merge?
- What would make us stop or ask for help?
- How can the change be undone or contained?
- Which decisions still belong to a human?

If those answers are not visible, the slice is not ready for execution.

## Relationship to Adaptive Skills

An `implementation-planning-advisor` skill is not promoted by this contract. A future skill proposal
must prove a recurring gap not covered by existing `feature-planning`, `testing`, `debugging`,
`architecture-review`, Lean Implementation and independent validation guidance.

