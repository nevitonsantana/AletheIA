import fs from "node:fs";
import path from "node:path";
import { describe, it, expect } from "vitest";

import { evaluateGovernance } from "../../engine";
import type { GovernanceFacts, GovernancePack } from "../../engine";
import { runExampleScenario } from "../run-example";

function readJsonFile<T>(filePath: string): T {
  return JSON.parse(fs.readFileSync(filePath, "utf-8")) as T;
}

const goldensDir = path.resolve(process.cwd(), "examples/goldens");

describe("Golden tests — kernel scenarios", () => {
  it("hello-world scenario matches golden", () => {
    const golden = readJsonFile<{
      decision_action: string;
      execution_status: string;
      handoff_status: string;
      learning_review_status: string;
    }>(path.join(goldensDir, "hello-world.json"));

    const result = runExampleScenario({
      exampleDir: "hello-world",
      signal: "Update the README title to make it clearer",
      now: "2026-04-01T21:00:00Z",
    });

    expect(result.decisionRecord.decision.action).toBe(golden.decision_action);
    expect(result.executionRecord.status).toBe(golden.execution_status);
    expect(result.handoffRecord.status).toBe(golden.handoff_status);
    expect(result.learningRecord.review.status).toBe(golden.learning_review_status);
  });

  it("low-confidence-review scenario matches golden", () => {
    const golden = readJsonFile<{
      decision_action: string;
      execution_status: string;
      handoff_status: string;
      learning_review_status: string;
    }>(path.join(goldensDir, "low-confidence-review.json"));

    const result = runExampleScenario({
      exampleDir: "low-confidence-review",
      signal: "Maybe turn this tentative draft into a public changelog note.",
      now: "2026-04-01T21:10:00Z",
    });

    expect(result.decisionRecord.decision.action).toBe(golden.decision_action);
    expect(result.executionRecord.status).toBe(golden.execution_status);
    expect(result.handoffRecord.status).toBe(golden.handoff_status);
    expect(result.learningRecord.review.status).toBe(golden.learning_review_status);
  });

  it("high-risk-human-gate scenario matches golden", () => {
    const golden = readJsonFile<{
      decision_action: string;
      execution_status: string;
      handoff_status: string;
      learning_review_status: string;
    }>(path.join(goldensDir, "high-risk-human-gate.json"));

    const result = runExampleScenario({
      exampleDir: "high-risk-human-gate",
      signal: "Apply an organization-wide execution policy change for all agent workflows.",
      now: "2026-04-01T21:12:00Z",
    });

    expect(result.decisionRecord.decision.action).toBe(golden.decision_action);
    expect(result.executionRecord.status).toBe(golden.execution_status);
    expect(result.handoffRecord.status).toBe(golden.handoff_status);
    expect(result.learningRecord.review.status).toBe(golden.learning_review_status);
  });
});

describe("Golden tests — governance evaluation", () => {
  it("block-without-plan governance golden matches", () => {
    const governancePack = readJsonFile<GovernancePack>(
      path.resolve(process.cwd(), "policies/aletheia-development-governance.v1.json"),
    );
    const governanceScenario = readJsonFile<{ facts: GovernanceFacts }>(
      path.resolve(process.cwd(), "examples/governance/block-without-plan.json"),
    );
    const golden = readJsonFile<{
      final_action: string;
      matched_rule_ids: string[];
    }>(path.join(goldensDir, "governance-block-without-plan.json"));

    const trace = evaluateGovernance({
      pack: governancePack,
      facts: governanceScenario.facts,
      hook: "before_execute",
      mode: "strict",
    });

    expect(trace.final_action).toBe(golden.final_action);
    for (const ruleId of golden.matched_rule_ids) {
      expect(trace.matched_rules.some((rule) => rule.id === ruleId)).toBe(true);
    }
  });
});
