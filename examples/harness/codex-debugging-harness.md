# Example — Codex debugging harness

A worked [Agent Harness Contract](../../docs/contracts/agent-harness-contract.md) for a Codex
debugging task: reproduce, isolate, and propose a fix for a bug. Medium risk, reversible, so the
agent may act but every write passes a gate, and a failing test must exist before an edit.

```yaml
agent_harness_contract:
  task_id: debug-issue-001
  agent_id: codex
  autonomy_level: act_with_approval
  task_boundary:
    objective: reproduce, isolate and propose a fix for a bug
    non_goals:
      - large refactor
      - dependency migration
      - production config changes
    risk_level: medium
    reversibility: reversible
  allowed_skills:
    - debugging
    - testing
  allowed_tools:
    - name: file_read
      permission: read
    - name: test_runner
      permission: execute
    - name: file_edit
      permission: write
      constraints:
        - only after repro path is documented
  gates:
    before_write: true
    before_structural_change: true
  sensors:
    computational:
      - failing_test
      - regression_test
    inferential:
      - debugging_review
  rollback:
    required: true
    strategy: git_diff
```

## Why it is shaped this way

- **`act_with_approval`** — the bug fix may commit, but each write passes a gate
  (`gates.before_write: true`), satisfying the "no unguarded write above low risk" invariant.
- **Sensor before judgment** — `failing_test` / `regression_test` (computational) run before the
  `debugging_review` (inferential) is consulted.
- **`file_edit` constraint** — an edit is only allowed *after* the reproduction path is documented,
  keeping the fix evidence-led.
- **Rollback** — `git_diff` makes the change reversible, consistent with `reversibility: reversible`.
