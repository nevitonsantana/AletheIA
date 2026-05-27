import fs from "node:fs";
import path from "node:path";
import { describe, it, expect } from "vitest";

import {
  createExecutionScope,
  runBeforeExecuteHook,
  runAfterExecuteHook,
  runBeforeFinalizeHook,
} from "../../engine";
import type { GovernanceFacts, GovernancePack } from "../../engine";
import { runExampleScenario } from "../run-example";

function readJsonFile<T>(filePath: string): T {
  return JSON.parse(fs.readFileSync(filePath, "utf-8")) as T;
}

describe("E2E — governance hooks + kernel path", () => {
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

  it("before_execute hook allows", () => {
    const result = runBeforeExecuteHook({
      workItemId: "aletheia-e2e-demo",
      pack,
      facts: beforeFacts,
      executionScope,
      mode: "strict",
      now: "2026-04-01T23:00:00Z",
    });
    expect(result.policy_trace.final_action).toBe("allow");
  });

  it("kernel path allows and completes", () => {
    const result = runExampleScenario({
      exampleDir: "hello-world",
      signal: "Update the README title to make it clearer",
      actor: "codex",
      thread: "aletheia-e2e",
      branch: "codex/aletheia-e2e",
      worktree: "aletheia-kernel",
      now: "2026-04-01T23:01:00Z",
    });
    expect(result.decisionRecord.decision.action).toBe("allow");
    expect(result.executionRecord.status).toBe("completed");
  });

  it("after_execute hook allows", () => {
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
    const result = runAfterExecuteHook({
      workItemId: "aletheia-e2e-demo",
      pack,
      facts: afterFacts,
      executionScope,
      mode: "strict",
      now: "2026-04-01T23:02:00Z",
    });
    expect(result.policy_trace.final_action).toBe("allow");
  });

  it("before_finalize hook allows when validation is complete", () => {
    const result = runBeforeFinalizeHook({
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
    expect(result.policy_trace.final_action).toBe("allow");
  });
});
