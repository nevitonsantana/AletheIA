import { printScenarioResult, runExampleScenario } from "../../tests/run-example";

const result = runExampleScenario({
  exampleDir: "low-confidence-review",
  signal: "Maybe turn this tentative draft into a public changelog note.",
  raw: {
    requester: "user",
    source: "low-confidence-review-script",
  },
  actor: "codex",
  thread: "aletheia-low-confidence-review",
  branch: "codex/aletheia-low-confidence-review",
  worktree: "aletheia-kernel",
  now: "2026-04-01T21:10:00Z",
});

printScenarioResult(result);
