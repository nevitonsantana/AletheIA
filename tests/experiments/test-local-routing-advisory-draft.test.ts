import fs from "node:fs";
import { describe, expect, it } from "vitest";
import { prepareAdvisoryDraft, type AdvisoryDraftInput } from "../../engine/experiments/local-routing-advisory-draft";
import type { LocalRoutingInput } from "../../engine/experiments/local-deterministic-routing";
import { SchemaValidationError } from "../../engine/validation";

function draft(): AdvisoryDraftInput {
  const input = JSON.parse(fs.readFileSync("examples/local-deterministic-routing/task-analysis.json", "utf8")) as LocalRoutingInput;
  input.inventory_origin = "caller_declaration";
  return {
    version: "local-routing-advisory-draft/v1", task_reference: "local-work-slice-1", input,
    window: { observed_at_ms: 100, evaluated_at_ms: 105, max_age_ms: 10 },
    claims: [
      ...input.providers.map((p) => ({ kind: "provider_availability" as const, subject_id: p.id, source_reference: "manual-check-1" })),
      ...input.routes.flatMap((r) => [
        { kind: "route_availability" as const, subject_id: r.id, source_reference: "manual-check-1" },
        ...r.capabilities.map((c) => ({ kind: "route_capability" as const, subject_id: r.id, capability_id: c, source_reference: "capability-note-1" })),
      ]),
    ],
  };
}

describe("local advisory draft", () => {
  it("preserves evidence and returns an advisory-only recommendation without mutating input", () => {
    const declared = draft();
    const before = structuredClone(declared);
    const result = prepareAdvisoryDraft(declared);
    expect(result.status).toBe("draft_requires_human_review");
    expect(result.declaration).toEqual(before);
    expect(declared).toEqual(before);
    expect(result.recommendation.selected_route_id).toBe("fictional-sparrow");
    expect(result.recommendation.alternative_route_ids).toEqual(["fictional-otter"]);
    expect(prepareAdvisoryDraft(declared)).toEqual(result);
  });

  it("fails closed on stale or undated availability", () => {
    const declared = draft();
    declared.window.evaluated_at_ms = 111;
    expect(prepareAdvisoryDraft(declared).recommendation.outcome).toBe("no_eligible_route");
    declared.window.observed_at_ms = null;
    expect(prepareAdvisoryDraft(declared).freshness.status).toBe("undated");
    expect(prepareAdvisoryDraft(declared).recommendation.outcome).toBe("no_eligible_route");
  });

  it("rejects missing, duplicated, dangling or malformed provenance", () => {
    const missing = draft(); missing.claims.pop();
    expect(() => prepareAdvisoryDraft(missing)).toThrow(/every declared/);
    const duplicate = draft(); duplicate.claims.push(duplicate.claims[0]);
    expect(() => prepareAdvisoryDraft(duplicate)).toThrow(/duplicate claim/);
    const dangling = draft(); dangling.claims[0].subject_id = "absent";
    expect(() => prepareAdvisoryDraft(dangling)).toThrow(/does not match/);
    const blank = draft(); blank.claims[0].source_reference = "  ";
    expect(() => prepareAdvisoryDraft(blank)).toThrow(SchemaValidationError);
    const extra = draft(); extra.claims[0].capability_id = "analysis";
    expect(() => prepareAdvisoryDraft(extra)).toThrow(/required only/);
  });

  it("rejects synthetic origin and invalid base routing input", () => {
    const synthetic = draft(); synthetic.input.inventory_origin = "synthetic_fixture";
    expect(() => prepareAdvisoryDraft(synthetic)).toThrow(/caller_declaration/);
    const invalid = draft(); invalid.input.preference = ["absent"];
    expect(() => prepareAdvisoryDraft(invalid)).toThrow(/unknown route/);
  });
});
