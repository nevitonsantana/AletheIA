import fs from "node:fs";
import path from "node:path";

import {
  createExecutionScope,
  runBeforeExecuteHook,
  runAfterExecuteHook,
  runBeforeFinalizeHook,
} from "../../engine";
import type { GovernanceFacts, GovernancePack } from "../../engine";
import { runExampleScenario } from "../run-example";

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

function readJsonFile<T>(filePath: string): T {
  return JSON.parse(fs.readFileSync(filePath, "utf-8")) as T;
}

const pack = readJsonFile<GovernancePack>(
  path.resolve(process.cwd(), "policies/aletheia-development-governance.v1.json"),
);

const beforeFacts = readJsonFile<{ facts: GovernanceFacts }>(
  path.resolve(process.cwd(), "examples/governance/allow-before-execute.json"),
).facts;

const finalizeFacts = readJsonFile<{ facts: GovernanceFacts }>(
  path.resolve(process.cwd(), "examples/governance/allow-before-execute.json"),
).facts;

const executionScope = createExecutionScope({
  workItemId: "aletheia-e2e-demo",
  operation: "update",
  allowedFiles: ["README.md", "docs/ARCHITECTURE.md"],
  forbiddenFiles: ["src/components/landing/"],
  notes: ["Minimal end-to-end proof across kernel and governance."],
});

const beforeResult = runBeforeExecuteHook({
  workItemId: "aletheia-e2e-demo",
  pack,
  facts: beforeFacts,
  executionScope,
  mode: "strict",
  now: "2026-04-01T23:00:00Z",
});

assert(beforeResult.policy_trace.final_action === "allow", "E2E before_execute should allow.");

const kernelResult = runExampleScenario({
  exampleDir: "hello-world",
  signal: "Update the README title to make it clearer",
  actor: "codex",
  thread: "aletheia-e2e",
  branch: "codex/aletheia-e2e",
  worktree: "aletheia-kernel",
  now: "2026-04-01T23:01:00Z",
});

assert(kernelResult.decisionRecord.decision.action === "allow", "E2E kernel path should allow.");
assert(kernelResult.executionRecord.status === "completed", "E2E kernel execution should complete.");

const afterFacts: GovernanceFacts = {
  ...beforeFacts,
  execution: {
    ...beforeFacts.execution,
    requested: true,
    modifies_undeclared_files: false,
    expands_scope: false,
    changes_contract: false,
    deviates_from_plan: false,
  },
};

const afterResult = runAfterExecuteHook({
  workItemId: "aletheia-e2e-demo",
  pack,
  facts: afterFacts,
  executionScope,
  mode: "strict",
  now: "2026-04-01T23:02:00Z",
});

assert(afterResult.policy_trace.final_action === "allow", "E2E after_execute should allow.");

const finalizeResult = runBeforeFinalizeHook({
  workItemId: "aletheia-e2e-demo",
  pack,
  facts: {
    ...finalizeFacts,
    validation: {
      performed: true,
      spec_alignment_ok: true,
      regression_checked: true,
    },
  },
  mode: "strict",
  now: "2026-04-01T23:03:00Z",
});

assert(finalizeResult.policy_trace.final_action === "allow", "E2E before_finalize should allow.");

console.log("AletheIA E2E test passed.");
