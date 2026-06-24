import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const root = process.cwd();
const examplesDir = path.join(root, "examples/work-slices/intent-to-evidence");
const contract = fs.readFileSync(path.join(root, "docs/contracts/intent-to-evidence-extension.md"), "utf-8");

function load(name: string) {
  return JSON.parse(fs.readFileSync(path.join(examplesDir, name), "utf-8")) as Record<string, any>;
}

describe("S8 Intent-to-Evidence minimum extension", () => {
  it("keeps intent human-confirmed and separate from implementation", () => {
    for (const fixture of [load("synthetic-product-change.json"), load("s8-real-pilot.json")]) {
      expect(fixture.intent_record.owner_confirmation.status).toBe("confirmed");
      expect(fixture.intent_record.owner_confirmation.confirmed_by).not.toMatch(/agent|codex/i);
      expect(fixture.intent_record.desired_outcome).not.toMatch(/implement with|use react|create class/i);
    }
  });

  it("requires observable expectations and stops high guessing risk", () => {
    const fixture = load("s8-real-pilot.json");
    expect(fixture.expectations_contract.success_conditions.length).toBeGreaterThan(0);
    expect(fixture.expectations_contract.failure_conditions.length).toBeGreaterThan(0);
    expect(fixture.expectations_contract.validation_methods.length).toBeGreaterThan(0);

    expect(contract).toContain("A `ready` verdict is invalid when risk is `high`");
    expect(fixture.agent_guessing_risk).toEqual({ level: "low", holes: [], verdict: "ready" });
  });

  it("closes only with source-backed cross-repository evidence", () => {
    const fixture = load("s8-real-pilot.json");
    const adaptiveExpectation = fixture.evidence_to_expectation_map.expectations.find(
      (item: { expectation: string }) => item.expectation.includes("Adaptive Skills"),
    );

    expect(adaptiveExpectation.status).toBe("proven");
    expect(adaptiveExpectation.evidence).toEqual([
      { type: "merge", reference: "adaptive-skills#70@59c0f41" },
    ]);
    expect(fixture.evidence_to_expectation_map.overall_verdict).toBe("proven");
    expect(fixture.reconcile_against_intent.preserved).toBe("yes");
    expect(fixture.reconcile_against_intent.learning_refs).toContain("AletheIA#268@2575e07");
  });
});
