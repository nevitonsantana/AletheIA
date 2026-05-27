import fs from "node:fs";
import path from "node:path";
import { describe, it, expect } from "vitest";

import {
  createLearningFromPolicyEvaluation,
  runBeforeFinalizeHook,
} from "../../engine";
import type { GovernanceFacts, GovernancePack, LearningRecord } from "../../engine";

function readJsonFile<T>(filePath: string): T {
  return JSON.parse(fs.readFileSync(filePath, "utf-8")) as T;
}

describe("Learning record — failed validation scenario", () => {
  const baseDir = path.resolve(process.cwd(), "examples/learning-from-failed-validation");
  const pack = readJsonFile<GovernancePack>(
    path.resolve(process.cwd(), "policies/aletheia-development-governance.v1.json"),
  );
  const facts = readJsonFile<GovernanceFacts>(path.join(baseDir, "facts.json"));
  const expected = readJsonFile<LearningRecord>(path.join(baseDir, "learning-record.json"));

  it("before_finalize hook blocks when validation was not performed", () => {
    const hookResult = runBeforeFinalizeHook({
      workItemId: "aletheia-learning-failed-validation",
      pack,
      facts,
      mode: "strict",
      now: "2026-04-01T23:20:00Z",
    });
    expect(hookResult.policy_trace.final_action).toBe("block");
    expect(hookResult.policy_trace.matched_rules.some((r) => r.id === "validation.required")).toBe(true);
  });

  it("learning record matches expected shape and preserves blocking rule evidence", () => {
    const hookResult = runBeforeFinalizeHook({
      workItemId: "aletheia-learning-failed-validation",
      pack,
      facts,
      mode: "strict",
      now: "2026-04-01T23:20:00Z",
    });
    const learningRecord = createLearningFromPolicyEvaluation({
      workItemId: "aletheia-learning-failed-validation",
      policyEvaluation: hookResult.policy_evaluation,
      facts,
    });

    expect(learningRecord.learning_type).toBe(expected.learning_type);
    expect(learningRecord.review.status).toBe(expected.review.status);
    expect(learningRecord.actionability.recommended_change).toBe(
      expected.actionability.recommended_change,
    );
    expect(learningRecord.evidence).toContain("rule:validation.required");
  });
});
