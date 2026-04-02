import fs from "node:fs";
import path from "node:path";

import {
  createLearningFromPolicyEvaluation,
  runBeforeFinalizeHook,
} from "../../engine";
import type { GovernanceFacts, GovernancePack, LearningRecord } from "../../engine";

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

function readJsonFile<T>(filePath: string): T {
  return JSON.parse(fs.readFileSync(filePath, "utf-8")) as T;
}

const baseDir = path.resolve(process.cwd(), "examples/learning-from-failed-validation");
const pack = readJsonFile<GovernancePack>(
  path.resolve(process.cwd(), "policies/aletheia-development-governance.v1.json"),
);
const facts = readJsonFile<GovernanceFacts>(path.join(baseDir, "facts.json"));
const expected = readJsonFile<LearningRecord>(path.join(baseDir, "learning-record.json"));

const hookResult = runBeforeFinalizeHook({
  workItemId: "aletheia-learning-failed-validation",
  pack,
  facts,
  mode: "strict",
  now: "2026-04-01T23:20:00Z",
});

assert(hookResult.policy_trace.final_action === "block", "Learning scenario should block before finalize.");
assert(
  hookResult.policy_trace.matched_rules.some((rule) => rule.id === "validation.required"),
  "Learning scenario should match validation.required.",
);

const learningRecord = createLearningFromPolicyEvaluation({
  workItemId: "aletheia-learning-failed-validation",
  policyEvaluation: hookResult.policy_evaluation,
  facts,
});

assert(learningRecord.learning_type === expected.learning_type, "Learning type drifted.");
assert(learningRecord.review.status === expected.review.status, "Learning review status drifted.");
assert(
  learningRecord.actionability.recommended_change === expected.actionability.recommended_change,
  "Learning recommended change drifted.",
);
assert(
  learningRecord.evidence.includes("rule:validation.required"),
  "Learning evidence should preserve the blocking rule.",
);

console.log("AletheIA learning tests passed.");
