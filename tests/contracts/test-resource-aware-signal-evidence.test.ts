import fs from "node:fs";
import path from "node:path";
import { describe, it, expect } from "vitest";
import { validateAgainstSchema, SchemaValidationError } from "../../engine";

const schemasDir = path.resolve(process.cwd(), "schemas");
const schemaPath = path.join(schemasDir, "resource-aware-signal-evidence.schema.json");
const fixturePath = path.resolve(
  process.cwd(),
  "examples/resource-aware-operations/fixtures/signal-evidence-review.json",
);

function loadFixture(): Record<string, unknown> {
  return JSON.parse(fs.readFileSync(fixturePath, "utf-8")) as Record<string, unknown>;
}

describe("Resource-Aware Signal Evidence Record", () => {
  it("validates a realistic cross-project record-and-wait review against the schema", () => {
    const data = loadFixture();
    expect(() => validateAgainstSchema(data, schemaPath)).not.toThrow();
  });

  it("rejects a signal outside the four-signal catalog", () => {
    const data = loadFixture();
    data.signal = "context_drag_detected";
    expect(() => validateAgainstSchema(data, schemaPath)).toThrow(SchemaValidationError);
  });

  it("rejects a single-slice review (anecdote is never a threshold)", () => {
    const data = loadFixture();
    data.slice_ids = ["slice-2026-06-02-001"];
    expect(() => validateAgainstSchema(data, schemaPath)).toThrow(SchemaValidationError);
  });

  it("rejects a decision outside the contract vocabulary", () => {
    const data = loadFixture();
    data.decision = "reopen_now";
    expect(() => validateAgainstSchema(data, schemaPath)).toThrow(SchemaValidationError);
  });

  it("rejects a reopen recommendation that is not cross-project (reopen restraint)", () => {
    const data = loadFixture();
    data.decision = "recommend_reopen_1_3";
    data.signal_is_cross_project = false;
    data.project_count = 1;
    expect(() => validateAgainstSchema(data, schemaPath)).toThrow(SchemaValidationError);
  });

  it("rejects a reopen recommendation resting on a single project (project_count must be >= 2)", () => {
    const data = loadFixture();
    data.decision = "recommend_reopen_1_3";
    data.signal_is_cross_project = true;
    data.project_count = 1;
    expect(() => validateAgainstSchema(data, schemaPath)).toThrow(SchemaValidationError);
  });

  it("accepts a valid reopen recommendation with cross-project signal and >=2 projects", () => {
    const data = loadFixture();
    data.decision = "recommend_reopen_1_3";
    data.signal_is_cross_project = true;
    data.project_count = 2;
    expect(() => validateAgainstSchema(data, schemaPath)).not.toThrow();
  });

  it("rejects a cross-project flag that spans only one project (coherence)", () => {
    const data = loadFixture();
    data.signal_is_cross_project = true;
    data.project_count = 1;
    expect(() => validateAgainstSchema(data, schemaPath)).toThrow(SchemaValidationError);
  });

  it("rejects a record missing decision_rationale", () => {
    const data = loadFixture();
    delete data.decision_rationale;
    expect(() => validateAgainstSchema(data, schemaPath)).toThrow(SchemaValidationError);
  });

  it("rejects duplicate slice_ids (each gathered slice must be distinct)", () => {
    const data = loadFixture();
    data.slice_ids = ["slice-2026-06-02-001", "slice-2026-06-02-001"];
    expect(() => validateAgainstSchema(data, schemaPath)).toThrow(SchemaValidationError);
  });
});
