import fs from "node:fs";
import path from "node:path";
import { describe, it, expect } from "vitest";
import { validateAgainstSchema, SchemaValidationError } from "../../engine";

const schemasDir = path.resolve(process.cwd(), "schemas");
const schemaPath = path.join(schemasDir, "execution-pattern-selection.schema.json");
const fixturePath = path.resolve(
  process.cwd(),
  "examples/execution-patterns/fixtures/execution-pattern-selection-ci-triage.json",
);

function loadFixture(): Record<string, unknown> {
  return JSON.parse(fs.readFileSync(fixturePath, "utf-8")) as Record<string, unknown>;
}

describe("Execution Pattern Selection (per-task declaration)", () => {
  it("validates the realistic CI triage selection against the schema", () => {
    const data = loadFixture();
    expect(() => validateAgainstSchema(data, schemaPath)).not.toThrow();
  });

  it("rejects a pattern outside the ten-pattern library", () => {
    const data = loadFixture();
    (data.recommended_pattern as Record<string, unknown>).type = "dynamic_workflow";
    expect(() => validateAgainstSchema(data, schemaPath)).toThrow(SchemaValidationError);
  });

  it("rejects a vehicle outside the five-vehicle enum", () => {
    const data = loadFixture();
    (data.recommended_vehicle as Record<string, unknown>).type = "swarm";
    expect(() => validateAgainstSchema(data, schemaPath)).toThrow(SchemaValidationError);
  });

  it("rejects a verdict outside the four selection verdicts", () => {
    const data = loadFixture();
    (data.decision as Record<string, unknown>).verdict = "allow";
    expect(() => validateAgainstSchema(data, schemaPath)).toThrow(SchemaValidationError);
  });

  it("rejects a missing pattern rationale", () => {
    const data = loadFixture();
    (data.recommended_pattern as Record<string, unknown>).rationale = "";
    expect(() => validateAgainstSchema(data, schemaPath)).toThrow(SchemaValidationError);
  });

  it("rejects a loop pattern without an objective gate (invariant 1)", () => {
    const data = loadFixture();
    (data.required_controls as Record<string, unknown>).objective_gate_required = false;
    expect(() => validateAgainstSchema(data, schemaPath)).toThrow(SchemaValidationError);
  });

  it("rejects a loop pattern without a token budget (invariant 1)", () => {
    const data = loadFixture();
    (data.required_controls as Record<string, unknown>).token_budget_required = false;
    expect(() => validateAgainstSchema(data, schemaPath)).toThrow(SchemaValidationError);
  });

  it("accepts a non-loop pattern without gate or budget controls (invariant 1 not triggered)", () => {
    const data = loadFixture();
    (data.recommended_pattern as Record<string, unknown>).type = "classify_and_act";
    (data.required_controls as Record<string, unknown>).objective_gate_required = false;
    (data.required_controls as Record<string, unknown>).token_budget_required = false;
    (data.required_controls as Record<string, unknown>).state_required = false;
    (data.required_controls as Record<string, unknown>).audit_record_required = false;
    expect(() => validateAgainstSchema(data, schemaPath)).not.toThrow();
  });

  it("rejects a scheduled stateful loop without persistent state (invariant 2)", () => {
    const data = loadFixture();
    (data.required_controls as Record<string, unknown>).state_required = false;
    expect(() => validateAgainstSchema(data, schemaPath)).toThrow(SchemaValidationError);
  });

  it("rejects a scheduled stateful loop without an audit record (invariant 2)", () => {
    const data = loadFixture();
    (data.required_controls as Record<string, unknown>).audit_record_required = false;
    expect(() => validateAgainstSchema(data, schemaPath)).toThrow(SchemaValidationError);
  });

  it("rejects an approved loop when no objective verification is available (invariant 3)", () => {
    const data = loadFixture();
    (data.task_shape as Record<string, unknown>).objective_verification_available = false;
    // verdict stays approved_with_constraints -> inadmissible for a loop without verification
    expect(() => validateAgainstSchema(data, schemaPath)).toThrow(SchemaValidationError);
  });

  it("accepts a loop without verification when the verdict degrades to human_led_required (invariant 3)", () => {
    const data = loadFixture();
    (data.task_shape as Record<string, unknown>).objective_verification_available = false;
    (data.decision as Record<string, unknown>).verdict = "human_led_required";
    expect(() => validateAgainstSchema(data, schemaPath)).not.toThrow();
  });

  it("rejects irreversible action without human review (invariant 4)", () => {
    const data = loadFixture();
    (data.risk as Record<string, unknown>).irreversible_action_possible = true;
    // human_review_required stays false -> inadmissible
    expect(() => validateAgainstSchema(data, schemaPath)).toThrow(SchemaValidationError);
  });

  it("accepts irreversible action when human review is required (invariant 4 satisfied)", () => {
    const data = loadFixture();
    (data.risk as Record<string, unknown>).irreversible_action_possible = true;
    (data.required_controls as Record<string, unknown>).human_review_required = true;
    expect(() => validateAgainstSchema(data, schemaPath)).not.toThrow();
  });
});
