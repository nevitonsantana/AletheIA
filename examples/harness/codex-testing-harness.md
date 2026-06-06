# Example — Codex testing harness

A worked [Agent Harness Contract](../../docs/contracts/agent-harness-contract.md) for a Codex
testing task: add the minimum reliable proof for a behavior change. Low risk and reversible, so the
harness is light — a write gate and a final-answer gate, with computational sensors.

```yaml
agent_harness_contract:
  task_id: test-change-001
  agent_id: codex
  autonomy_level: act_with_approval
  task_boundary:
    objective: add minimum reliable proof for a behavior change
    non_goals:
      - rewrite test architecture
      - add broad test suite without risk rationale
    risk_level: low
    reversibility: reversible
  allowed_skills:
    - testing
  gates:
    before_write: true
    before_final_answer: true
  sensors:
    computational:
      - test_suite
      - coverage_delta
    inferential:
      - testing_review
```

## Why it is shaped this way

- **Proportional control** — low risk and reversible, so the harness stays light: no rollback
  section is mandated (the invariant only forces rollback for `hard_to_reverse` tasks), but writes
  and the final answer still pass a gate.
- **Minimum reliable proof** — the `non_goals` keep the agent from inflating the test suite without
  a risk rationale, matching the framework's anti-overengineering posture.
- **Sensor before judgment** — `test_suite` / `coverage_delta` (computational) precede the
  `testing_review` (inferential).
