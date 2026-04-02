import fs from "node:fs";
import path from "node:path";

import { evaluateGovernance } from "../../engine";
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

const goldensDir = path.resolve(process.cwd(), "examples/goldens");

const helloGolden = readJsonFile<{
  decision_action: string;
  execution_status: string;
  handoff_status: string;
  learning_review_status: string;
}>(path.join(goldensDir, "hello-world.json"));

const helloResult = runExampleScenario({
  exampleDir: "hello-world",
  signal: "Update the README title to make it clearer",
  now: "2026-04-01T21:00:00Z",
});

assert(helloResult.decisionRecord.decision.action === helloGolden.decision_action, "hello-world decision action drifted.");
assert(helloResult.executionRecord.status === helloGolden.execution_status, "hello-world execution status drifted.");
assert(helloResult.handoffRecord.status === helloGolden.handoff_status, "hello-world handoff status drifted.");
assert(helloResult.learningRecord.review.status === helloGolden.learning_review_status, "hello-world learning review drifted.");

const lowConfidenceGolden = readJsonFile<{
  decision_action: string;
  execution_status: string;
  handoff_status: string;
  learning_review_status: string;
}>(path.join(goldensDir, "low-confidence-review.json"));

const lowConfidenceResult = runExampleScenario({
  exampleDir: "low-confidence-review",
  signal: "Maybe turn this tentative draft into a public changelog note.",
  now: "2026-04-01T21:10:00Z",
});

assert(lowConfidenceResult.decisionRecord.decision.action === lowConfidenceGolden.decision_action, "low-confidence decision action drifted.");
assert(lowConfidenceResult.executionRecord.status === lowConfidenceGolden.execution_status, "low-confidence execution status drifted.");
assert(lowConfidenceResult.handoffRecord.status === lowConfidenceGolden.handoff_status, "low-confidence handoff status drifted.");
assert(lowConfidenceResult.learningRecord.review.status === lowConfidenceGolden.learning_review_status, "low-confidence learning review drifted.");

const humanGateGolden = readJsonFile<{
  decision_action: string;
  execution_status: string;
  handoff_status: string;
  learning_review_status: string;
}>(path.join(goldensDir, "high-risk-human-gate.json"));

const humanGateResult = runExampleScenario({
  exampleDir: "high-risk-human-gate",
  signal: "Apply an organization-wide execution policy change for all agent workflows.",
  now: "2026-04-01T21:12:00Z",
});

assert(humanGateResult.decisionRecord.decision.action === humanGateGolden.decision_action, "human-gate decision action drifted.");
assert(humanGateResult.executionRecord.status === humanGateGolden.execution_status, "human-gate execution status drifted.");
assert(humanGateResult.handoffRecord.status === humanGateGolden.handoff_status, "human-gate handoff status drifted.");
assert(humanGateResult.learningRecord.review.status === humanGateGolden.learning_review_status, "human-gate learning review drifted.");

const governancePack = readJsonFile<GovernancePack>(
  path.resolve(process.cwd(), "policies/aletheia-development-governance.v1.json"),
);
const governanceScenario = readJsonFile<{ facts: GovernanceFacts }>(
  path.resolve(process.cwd(), "examples/governance/block-without-plan.json"),
);
const governanceGolden = readJsonFile<{
  final_action: string;
  matched_rule_ids: string[];
}>(path.join(goldensDir, "governance-block-without-plan.json"));

const governanceTrace = evaluateGovernance({
  pack: governancePack,
  facts: governanceScenario.facts,
  hook: "before_execute",
  mode: "strict",
});

assert(governanceTrace.final_action === governanceGolden.final_action, "governance final action drifted.");
for (const ruleId of governanceGolden.matched_rule_ids) {
  assert(
    governanceTrace.matched_rules.some((rule) => rule.id === ruleId),
    `Expected governance rule ${ruleId} to remain matched.`,
  );
}

console.log("AletheIA golden tests passed.");
