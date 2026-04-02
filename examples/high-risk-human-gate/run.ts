import { printScenarioResult, runExampleScenario } from "../../tests/run-example";

const result = runExampleScenario({
  exampleDir: "high-risk-human-gate",
  signal: "Apply an organization-wide execution policy change for all agent workflows.",
  raw: {
    requester: "user",
    source: "high-risk-human-gate-script",
  },
  actor: "codex",
  thread: "aletheia-high-risk-human-gate",
  branch: "codex/aletheia-high-risk-human-gate",
  worktree: "aletheia-kernel",
  now: "2026-04-01T21:12:00Z",
});

printScenarioResult(result);
