import fs from "node:fs";
import path from "node:path";
import { describe, it, expect } from "vitest";
import { validateAgainstSchema, SchemaValidationError } from "../../engine";

const schemasDir = path.resolve(process.cwd(), "schemas");
const schemaPath = path.join(schemasDir, "agent-harness-contract.schema.json");
const fixturePath = path.resolve(
  process.cwd(),
  "examples/resource-aware-operations/fixtures/agent-harness-contract-debugging.json",
);

function loadFixture(): Record<string, unknown> {
  return JSON.parse(fs.readFileSync(fixturePath, "utf-8")) as Record<string, unknown>;
}

describe("Agent Harness Contract (per-task declaration)", () => {
  it("validates the realistic Codex debugging contract against the schema", () => {
    const data = loadFixture();
    expect(() => validateAgainstSchema(data, schemaPath)).not.toThrow();
  });

  it("rejects an autonomy_level outside the four-value taxonomy", () => {
    const data = loadFixture();
    data.autonomy_level = "fully_autonomous";
    expect(() => validateAgainstSchema(data, schemaPath)).toThrow(SchemaValidationError);
  });

  it("rejects a medium-risk write contract with no before_write gate (invariant 1)", () => {
    const data = loadFixture();
    (data.gates as Record<string, unknown>).before_write = false;
    // task is medium risk and includes a write/execute tool -> gate is mandatory
    expect(() => validateAgainstSchema(data, schemaPath)).toThrow(SchemaValidationError);
  });

  it("accepts a low-risk write contract without a before_write gate (invariant 1 not triggered)", () => {
    const data = loadFixture();
    (data.task_boundary as Record<string, unknown>).risk_level = "low";
    (data.gates as Record<string, unknown>).before_write = false;
    expect(() => validateAgainstSchema(data, schemaPath)).not.toThrow();
  });

  it("rejects a hard_to_reverse task without rollback.required (invariant 2)", () => {
    const data = loadFixture();
    (data.task_boundary as Record<string, unknown>).reversibility = "hard_to_reverse";
    (data.rollback as Record<string, unknown>).required = false;
    expect(() => validateAgainstSchema(data, schemaPath)).toThrow(SchemaValidationError);
  });

  it("rejects a hard_to_reverse task without human_review.required (invariant 2)", () => {
    const data = loadFixture();
    (data.task_boundary as Record<string, unknown>).reversibility = "hard_to_reverse";
    (data.rollback as Record<string, unknown>).required = true;
    (data.human_review as Record<string, unknown>).required = false;
    expect(() => validateAgainstSchema(data, schemaPath)).toThrow(SchemaValidationError);
  });

  it("rejects autonomous_within_bounds with empty blocked_actions (invariant 3)", () => {
    const data = loadFixture();
    data.autonomy_level = "autonomous_within_bounds";
    data.blocked_actions = [];
    expect(() => validateAgainstSchema(data, schemaPath)).toThrow(SchemaValidationError);
  });

  it("accepts autonomous_within_bounds with blocked_actions and rollback (invariant 3 satisfied)", () => {
    const data = loadFixture();
    data.autonomy_level = "autonomous_within_bounds";
    data.blocked_actions = ["delete_files"];
    (data.rollback as Record<string, unknown>).required = true;
    expect(() => validateAgainstSchema(data, schemaPath)).not.toThrow();
  });

  it("rejects a reviewer_role outside the canonical set", () => {
    const data = loadFixture();
    (data.human_review as Record<string, unknown>).reviewer_role = "marketing";
    expect(() => validateAgainstSchema(data, schemaPath)).toThrow(SchemaValidationError);
  });

  it("rejects a retrieval_mode outside the canonical set", () => {
    const data = loadFixture();
    (data.context_policy as Record<string, unknown>).retrieval_mode = "full_text";
    expect(() => validateAgainstSchema(data, schemaPath)).toThrow(SchemaValidationError);
  });

  it("accepts a minimal observe read-only contract with no gates fired", () => {
    const data = loadFixture();
    data.autonomy_level = "observe";
    data.allowed_tools = [{ name: "file_read", permission: "read" }];
    data.blocked_actions = [];
    data.gates = {
      before_write: false,
      before_delete: false,
      before_external_call: false,
      before_structural_change: false,
      before_final_answer: false,
    };
    expect(() => validateAgainstSchema(data, schemaPath)).not.toThrow();
  });
});
