import fs from "node:fs";
import path from "node:path";

import {
  createLearningFromPolicyEvaluation,
  runBeforeFinalizeHook,
} from "../../engine";
import type { GovernanceFacts, GovernancePack, LearningRecord } from "../../engine";

function readJsonFile<T>(filePath: string): T {
  return JSON.parse(fs.readFileSync(filePath, "utf-8")) as T;
}

const baseDir = path.resolve(process.cwd(), "examples/learning-from-failed-validation");
const pack = readJsonFile<GovernancePack>(
  path.resolve(process.cwd(), "policies/aletheia-development-governance.v1.json"),
);
const facts = readJsonFile<GovernanceFacts>(path.join(baseDir, "facts.json"));
const expectedLearning = readJsonFile<LearningRecord>(path.join(baseDir, "learning-record.json"));

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

console.log("--- policy evaluation ---");
console.log(JSON.stringify(hookResult.policy_evaluation, null, 2));
console.log("\n--- learning record ---");
console.log(JSON.stringify(learningRecord, null, 2));
console.log("\n--- expected learning record (reference) ---");
console.log(JSON.stringify(expectedLearning, null, 2));
