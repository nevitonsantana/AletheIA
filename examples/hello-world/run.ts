import { printScenarioResult, runExampleScenario } from "../../tests/run-example";

const result = runExampleScenario({
  exampleDir: "hello-world",
  signal: "Update the README title to make it clearer",
  raw: {
    requester: "user",
    source: "hello-world-script",
  },
  actor: "codex",
  thread: "aletheia-hello-world",
  branch: "codex/aletheia-hello-world",
  worktree: "aletheia-kernel",
  now: "2026-04-01T21:00:00Z",
});

printScenarioResult(result);
