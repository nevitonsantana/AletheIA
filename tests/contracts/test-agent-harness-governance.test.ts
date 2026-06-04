import fs from "node:fs";
import path from "node:path";
import { describe, it, expect } from "vitest";
import { validateAgainstSchema, SchemaValidationError } from "../../engine";

const schemasDir = path.resolve(process.cwd(), "schemas");
const schemaPath = path.join(schemasDir, "agent-harness-governance-record.schema.json");
const fixturePath = path.resolve(
  process.cwd(),
  "examples/resource-aware-operations/fixtures/harness-action.json",
);

function loadFixture(): Record<string, unknown> {
  return JSON.parse(fs.readFileSync(fixturePath, "utf-8")) as Record<string, unknown>;
}

describe("Agent Harness Governance Record", () => {
  it("validates a realistic approved external-commitment record against the schema", () => {
    const data = loadFixture();
    expect(() => validateAgainstSchema(data, schemaPath)).not.toThrow();
  });

  it("accepts a read-only action allowed by the harness", () => {
    const data = loadFixture();
    data.tool_name = "search_service_registry";
    data.risk_class = "read_only";
    data.side_effect_class = "none";
    data.resource_scope = "project";
    data.permission_decision = "allow";
    data.decision_authority = "harness";
    data.side_effect_committed = false;
    expect(() => validateAgainstSchema(data, schemaPath)).not.toThrow();
  });

  it("rejects a permission_decision outside the defined decision set", () => {
    const data = loadFixture();
    data.permission_decision = "auto_approve";
    expect(() => validateAgainstSchema(data, schemaPath)).toThrow(SchemaValidationError);
  });

  it("rejects the model authorizing its own action (decision_authority must be harness or human)", () => {
    const data = loadFixture();
    data.decision_authority = "model";
    expect(() => validateAgainstSchema(data, schemaPath)).toThrow(SchemaValidationError);
  });

  it("rejects a mutation committed in planning mode", () => {
    const data = loadFixture();
    data.mode = "planning";
    data.side_effect_class = "destructive_change";
    data.risk_class = "destructive";
    // planning must deny + not commit; this record still commits
    expect(() => validateAgainstSchema(data, schemaPath)).toThrow(SchemaValidationError);
  });

  it("accepts a planning-mode mutation that is denied and not committed", () => {
    const data = loadFixture();
    data.mode = "planning";
    data.tool_name = "delete_record";
    data.risk_class = "destructive";
    data.side_effect_class = "destructive_change";
    data.permission_decision = "deny";
    data.decision_authority = "harness";
    data.side_effect_committed = false;
    data.observation_status = "denied";
    data.stop_reason = "denied_by_policy";
    expect(() => validateAgainstSchema(data, schemaPath)).not.toThrow();
  });

  it("rejects a committed side effect without an authorizing decision", () => {
    const data = loadFixture();
    data.permission_decision = "approval_required";
    // still committed = true
    expect(() => validateAgainstSchema(data, schemaPath)).toThrow(SchemaValidationError);
  });

  it("rejects a denied decision that still commits a side effect", () => {
    const data = loadFixture();
    data.permission_decision = "deny";
    data.observation_status = "denied";
    // side_effect_committed still true
    expect(() => validateAgainstSchema(data, schemaPath)).toThrow(SchemaValidationError);
  });

  it("rejects a committed financial action authorized by the harness alone (needs human)", () => {
    const data = loadFixture();
    data.tool_name = "issue_refund";
    data.risk_class = "financial";
    data.side_effect_class = "financial_transfer";
    data.decision_authority = "harness";
    // committed = true, allow
    expect(() => validateAgainstSchema(data, schemaPath)).toThrow(SchemaValidationError);
  });

  it("accepts a committed financial action authorized by a human", () => {
    const data = loadFixture();
    data.tool_name = "issue_refund";
    data.risk_class = "financial";
    data.side_effect_class = "financial_transfer";
    data.decision_authority = "human";
    expect(() => validateAgainstSchema(data, schemaPath)).not.toThrow();
  });

  it("rejects a denied observation that does not carry a deny decision", () => {
    const data = loadFixture();
    data.observation_status = "denied";
    data.side_effect_committed = false;
    data.permission_decision = "allow";
    expect(() => validateAgainstSchema(data, schemaPath)).toThrow(SchemaValidationError);
  });

  it("accepts an approval_required observation that pauses without committing", () => {
    const data = loadFixture();
    data.permission_decision = "approval_required";
    data.decision_authority = "harness";
    data.side_effect_committed = false;
    data.observation_status = "approval_required";
    data.stop_reason = "approval_pending";
    expect(() => validateAgainstSchema(data, schemaPath)).not.toThrow();
  });

  it("rejects an approval_required observation that committed a side effect", () => {
    const data = loadFixture();
    data.observation_status = "approval_required";
    data.permission_decision = "approval_required";
    // side_effect_committed still true
    expect(() => validateAgainstSchema(data, schemaPath)).toThrow(SchemaValidationError);
  });

  it("accepts a budget-exceeded abort that names the exhausted budget", () => {
    const data = loadFixture();
    data.observation_status = "aborted";
    data.permission_decision = "allow";
    data.side_effect_committed = false;
    data.stop_reason = "budget_exceeded";
    data.budget_exceeded = "max_tool_calls";
    expect(() => validateAgainstSchema(data, schemaPath)).not.toThrow();
  });

  it("rejects a named exhausted budget without a budget_exceeded stop_reason", () => {
    const data = loadFixture();
    data.budget_exceeded = "max_tool_calls";
    data.stop_reason = "completed";
    expect(() => validateAgainstSchema(data, schemaPath)).toThrow(SchemaValidationError);
  });

  it("rejects a record missing decision_authority", () => {
    const data = loadFixture();
    delete data.decision_authority;
    expect(() => validateAgainstSchema(data, schemaPath)).toThrow(SchemaValidationError);
  });
});
