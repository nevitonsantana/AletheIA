import fs from "node:fs";
import path from "node:path";
import { describe, it, expect } from "vitest";
import { validateAgainstSchema, SchemaValidationError } from "../../engine";

const schemasDir = path.resolve(process.cwd(), "schemas");
const schemaPath = path.join(schemasDir, "feature-value-governance-contract.schema.json");
const fixturePath = path.resolve(
  process.cwd(),
  "examples/feature-governance/fixtures/build.json",
);

function loadFixture(): Record<string, unknown> {
  return JSON.parse(fs.readFileSync(fixturePath, "utf-8")) as Record<string, unknown>;
}

describe("Feature Value Governance Contract", () => {
  it("validates a realistic Build Now record against the schema", () => {
    const data = loadFixture();
    expect(() => validateAgainstSchema(data, schemaPath)).not.toThrow();
  });

  it("rejects a high-cost build with no exception_approval (guardrail fires)", () => {
    const data = loadFixture();
    (data.complexity_cost as Record<string, unknown>).level = "high";
    // decision.verdict is already build_now and carries no exception_approval
    expect(() => validateAgainstSchema(data, schemaPath)).toThrow(SchemaValidationError);
  });

  it("accepts a high-cost build once exception_approval is recorded", () => {
    const data = loadFixture();
    (data.complexity_cost as Record<string, unknown>).level = "high";
    (data.decision as Record<string, unknown>).exception_approval =
      "Scope reduced to single-format export; permanent cost approved by Platform lead.";
    expect(() => validateAgainstSchema(data, schemaPath)).not.toThrow();
  });

  it("rejects evidence_level without an uncertainty statement (score is not truth)", () => {
    const data = loadFixture();
    delete (data.evidence_level as Record<string, unknown>).uncertainty;
    expect(() => validateAgainstSchema(data, schemaPath)).toThrow(SchemaValidationError);
  });

  it("rejects a record missing the primary metric (born measurable)", () => {
    const data = loadFixture();
    delete data.primary_metric;
    expect(() => validateAgainstSchema(data, schemaPath)).toThrow(SchemaValidationError);
  });

  it("rejects a lever outside the canonical taxonomy", () => {
    const data = loadFixture();
    (data.revenue_lever as Record<string, unknown>).primary = "conversion";
    expect(() => validateAgainstSchema(data, schemaPath)).toThrow(SchemaValidationError);
  });

  it("rejects a build_now record with no guardrail metric (born measurable)", () => {
    const data = loadFixture();
    delete data.guardrail_metrics;
    expect(() => validateAgainstSchema(data, schemaPath)).toThrow(SchemaValidationError);
  });

  it("rejects a build_now record with an empty guardrail list", () => {
    const data = loadFixture();
    data.guardrail_metrics = [];
    expect(() => validateAgainstSchema(data, schemaPath)).toThrow(SchemaValidationError);
  });

  it("rejects a build_now record missing a 30/90 review date", () => {
    const data = loadFixture();
    delete (data.review_dates as Record<string, unknown>).day_90;
    expect(() => validateAgainstSchema(data, schemaPath)).toThrow(SchemaValidationError);
  });

  it("allows a kill verdict without guardrails or review dates", () => {
    const data = loadFixture();
    (data.decision as Record<string, unknown>).verdict = "kill";
    delete data.guardrail_metrics;
    data.review_dates = {};
    expect(() => validateAgainstSchema(data, schemaPath)).not.toThrow();
  });
});
