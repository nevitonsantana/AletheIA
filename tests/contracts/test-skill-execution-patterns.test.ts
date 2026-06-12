import fs from "node:fs";
import path from "node:path";
import { describe, it, expect } from "vitest";
import { validateAgainstSchema, SchemaValidationError } from "../../engine";

const schemasDir = path.resolve(process.cwd(), "schemas");
const schemaPath = path.join(schemasDir, "skill-execution-patterns.schema.json");
const fixturesDir = path.resolve(process.cwd(), "examples/execution-patterns/fixtures");

function loadFixture(name: string): Record<string, unknown> {
  return JSON.parse(
    fs.readFileSync(path.join(fixturesDir, name), "utf-8"),
  ) as Record<string, unknown>;
}

describe("Skill Execution Patterns (per-skill compatibility declaration)", () => {
  it("validates the debugging skill declaration (operational, loop-compatible)", () => {
    const data = loadFixture("skill-execution-patterns-debugging.json");
    expect(() => validateAgainstSchema(data, schemaPath)).not.toThrow();
  });

  it("validates the feature-value-governance declaration (judgment skill, loops incompatible)", () => {
    const data = loadFixture("skill-execution-patterns-feature-value.json");
    expect(() => validateAgainstSchema(data, schemaPath)).not.toThrow();
  });

  it("rejects a compatible pattern outside the ten-pattern library", () => {
    const data = loadFixture("skill-execution-patterns-debugging.json");
    (data.compatible_patterns as Array<Record<string, unknown>>)[0].pattern = "ultra_loop";
    expect(() => validateAgainstSchema(data, schemaPath)).toThrow(SchemaValidationError);
  });

  it("rejects a compatible pattern with no required controls", () => {
    const data = loadFixture("skill-execution-patterns-debugging.json");
    (data.compatible_patterns as Array<Record<string, unknown>>)[0].required_controls = [];
    expect(() => validateAgainstSchema(data, schemaPath)).toThrow(SchemaValidationError);
  });

  it("rejects an incompatible pattern without a rationale", () => {
    const data = loadFixture("skill-execution-patterns-feature-value.json");
    delete (data.incompatible_patterns as Array<Record<string, unknown>>)[0].rationale;
    expect(() => validateAgainstSchema(data, schemaPath)).toThrow(SchemaValidationError);
  });

  it("rejects loop compatibility without the objective_gate_missing escalation trigger (invariant 1)", () => {
    const data = loadFixture("skill-execution-patterns-debugging.json");
    data.escalation_triggers = ["touches_sensitive_area", "judgment_required"];
    // debugging declares loop_until_done compatibility -> the escape hatch is mandatory
    expect(() => validateAgainstSchema(data, schemaPath)).toThrow(SchemaValidationError);
  });

  it("accepts a loop-free declaration without the objective_gate_missing trigger (invariant 1 not triggered)", () => {
    const data = loadFixture("skill-execution-patterns-feature-value.json");
    data.escalation_triggers = ["judgment_required", "comprehension_debt_risk"];
    // no loop pattern among compatible_patterns -> trigger not structurally required
    expect(() => validateAgainstSchema(data, schemaPath)).not.toThrow();
  });

  it("rejects an evidence map keyed by a non-library pattern", () => {
    const data = loadFixture("skill-execution-patterns-debugging.json");
    (data.required_evidence_by_pattern as Record<string, unknown>).dynamic_workflow = {
      evidence: ["anything"],
    };
    expect(() => validateAgainstSchema(data, schemaPath)).toThrow(SchemaValidationError);
  });

  it("rejects an audit block missing log_pattern", () => {
    const data = loadFixture("skill-execution-patterns-debugging.json");
    delete (data.audit_requirements as Record<string, unknown>).log_pattern;
    expect(() => validateAgainstSchema(data, schemaPath)).toThrow(SchemaValidationError);
  });
});
