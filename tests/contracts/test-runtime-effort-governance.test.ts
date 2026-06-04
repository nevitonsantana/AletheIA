import fs from "node:fs";
import path from "node:path";
import { describe, it, expect } from "vitest";
import { validateAgainstSchema, SchemaValidationError } from "../../engine";

const schemasDir = path.resolve(process.cwd(), "schemas");
const schemaPath = path.join(schemasDir, "runtime-effort-governance-contract.schema.json");
const fixturePath = path.resolve(
  process.cwd(),
  "examples/resource-aware-operations/fixtures/standard-slice.json",
);

function loadFixture(): Record<string, unknown> {
  return JSON.parse(fs.readFileSync(fixturePath, "utf-8")) as Record<string, unknown>;
}

describe("Runtime Effort Governance Record", () => {
  it("validates a realistic Standard -> High-Assurance record against the schema", () => {
    const data = loadFixture();
    expect(() => validateAgainstSchema(data, schemaPath)).not.toThrow();
  });

  it("accepts a minimal Lite record with no escalation and a sufficiency stop", () => {
    const data = loadFixture();
    data.task_type = "edit";
    data.classification = {
      reversibility: "high",
      blast_radius: "local",
      uncertainty: "low",
      risk_of_error: "low",
      context_need: "none",
      tool_need: "none",
    };
    data.initial_effort = "lite";
    data.final_effort = "lite";
    data.escalation_count = 0;
    data.escalation_reasons = [];
    data.stop_reason = "sufficient_quality_reached";
    data.human_checkpoint_triggered = false;
    expect(() => validateAgainstSchema(data, schemaPath)).not.toThrow();
  });

  it("rejects an escalation reason outside the defined signal catalog", () => {
    const data = loadFixture();
    data.escalation_reasons = ["systemic_blast_radius_detected"];
    expect(() => validateAgainstSchema(data, schemaPath)).toThrow(SchemaValidationError);
  });

  it("rejects a task_type outside the contract vocabulary", () => {
    const data = loadFixture();
    data.task_type = "deploy";
    expect(() => validateAgainstSchema(data, schemaPath)).toThrow(SchemaValidationError);
  });

  it("rejects a zero escalation_count that still lists reasons (escalation honesty)", () => {
    const data = loadFixture();
    data.escalation_count = 0;
    // escalation_reasons still carries one entry
    expect(() => validateAgainstSchema(data, schemaPath)).toThrow(SchemaValidationError);
  });

  it("rejects an escalation with a non-zero count but no recorded reason", () => {
    const data = loadFixture();
    data.escalation_count = 1;
    data.escalation_reasons = [];
    expect(() => validateAgainstSchema(data, schemaPath)).toThrow(SchemaValidationError);
  });

  it("rejects a count higher than the number of recorded reasons (exact match)", () => {
    const data = loadFixture();
    data.escalation_count = 2;
    data.escalation_reasons = ["multi_file_dependency_detected"];
    expect(() => validateAgainstSchema(data, schemaPath)).toThrow(SchemaValidationError);
  });

  it("rejects a count lower than the number of recorded reasons (exact match)", () => {
    const data = loadFixture();
    data.escalation_count = 1;
    data.escalation_reasons = ["multi_file_dependency_detected", "low_confidence"];
    expect(() => validateAgainstSchema(data, schemaPath)).toThrow(SchemaValidationError);
  });

  it("accepts a record where escalation_count equals the reason total", () => {
    const data = loadFixture();
    data.escalation_count = 2;
    data.escalation_reasons = ["multi_file_dependency_detected", "low_confidence"];
    expect(() => validateAgainstSchema(data, schemaPath)).not.toThrow();
  });

  it("rejects a breached quality floor that stops for ordinary sufficiency (never silent)", () => {
    const data = loadFixture();
    data.quality_floor_maintained = false;
    data.human_checkpoint_triggered = false;
    data.stop_reason = "sufficient_quality_reached";
    expect(() => validateAgainstSchema(data, schemaPath)).toThrow(SchemaValidationError);
  });

  it("accepts a breached quality floor when the slice stops for human authority", () => {
    const data = loadFixture();
    data.quality_floor_maintained = false;
    data.human_checkpoint_triggered = true;
    data.stop_reason = "human_decision_required";
    expect(() => validateAgainstSchema(data, schemaPath)).not.toThrow();
  });

  it("rejects a triggered human checkpoint that stops for sufficiency (checkpoint coherence)", () => {
    const data = loadFixture();
    data.human_checkpoint_triggered = true;
    data.stop_reason = "sufficient_quality_reached";
    expect(() => validateAgainstSchema(data, schemaPath)).toThrow(SchemaValidationError);
  });

  it("rejects an intent outside the canonical intent set", () => {
    const data = loadFixture();
    (data.user_intent as Record<string, unknown>).priority = ["accuracy"];
    expect(() => validateAgainstSchema(data, schemaPath)).toThrow(SchemaValidationError);
  });

  it("rejects a record missing quality_floor_maintained", () => {
    const data = loadFixture();
    delete data.quality_floor_maintained;
    expect(() => validateAgainstSchema(data, schemaPath)).toThrow(SchemaValidationError);
  });
});
