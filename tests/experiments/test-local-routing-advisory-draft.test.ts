import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync, spawnSync } from "node:child_process";
import { describe, expect, it } from "vitest";
import { prepareAdvisoryDraft, recordAdvisoryReview, type AdvisoryDraftInput, type AdvisoryHumanReview } from "../../engine/experiments/local-routing-advisory-draft";
import type { LocalRoutingInput } from "../../engine/experiments/local-deterministic-routing";
import { SchemaValidationError } from "../../engine/validation";

function draft(): AdvisoryDraftInput {
  const input = JSON.parse(fs.readFileSync("examples/local-deterministic-routing/task-analysis.json", "utf8")) as LocalRoutingInput;
  input.inventory_origin = "caller_declaration";
  return {
    version: "local-routing-advisory-draft/v2", task_reference: "local-work-slice-1", input,
    decision_references: {
      task_requirements: "task-note-1", request_permission: "policy-note-1",
      provider_permission: "provider-policy-note-1", preference_order: "preference-note-1",
      inventory_observation: "manual-check-1",
    },
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

  it("requires source references for the task, permissions, preference and inventory observation", () => {
    const fields = ["task_requirements", "request_permission", "provider_permission", "preference_order", "inventory_observation"] as const;
    for (const field of fields) {
      const missing = draft();
      delete (missing.decision_references as Partial<typeof missing.decision_references>)[field];
      expect(() => prepareAdvisoryDraft(missing)).toThrow(SchemaValidationError);
      const blank = draft(); blank.decision_references[field] = " \t ";
      expect(() => prepareAdvisoryDraft(blank)).toThrow(SchemaValidationError);
    }
    const oldVersion = draft() as unknown as { version: string };
    oldVersion.version = "local-routing-advisory-draft/v1";
    expect(() => prepareAdvisoryDraft(oldVersion)).toThrow(SchemaValidationError);
  });

  it("rejects synthetic origin and invalid base routing input", () => {
    const synthetic = draft(); synthetic.input.inventory_origin = "synthetic_fixture";
    expect(() => prepareAdvisoryDraft(synthetic)).toThrow(/caller_declaration/);
    const invalid = draft(); invalid.input.preference = ["absent"];
    expect(() => prepareAdvisoryDraft(invalid)).toThrow(/unknown route/);
  });
});

const review = (): AdvisoryHumanReview => ({
  version: "local-routing-advisory-review/v1",
  reviewer_reference: "reviewer-local-1",
  reviewed_at_ms: 106,
  disposition: "accept_suggestion",
  rationale: "Only the advisory suggestion is accepted for discussion.",
});

describe("local advisory human review", () => {
  it("records accept, reject and defer without changing inputs or executing a route", () => {
    const declaration = draft();
    const human = review();
    const declarationBefore = structuredClone(declaration);
    const reviewBefore = structuredClone(human);
    for (const disposition of ["accept_suggestion", "reject_suggestion", "defer"] as const) {
      const response = { ...human, disposition };
      const result = recordAdvisoryReview(declaration, response);
      expect(result.status).toBe("human_review_recorded_no_execution");
      expect(result.review.disposition).toBe(disposition);
      expect(result.review_time_draft.recommendation.selected_route_id).toBe("fictional-sparrow");
      expect(recordAdvisoryReview(declaration, response)).toEqual(result);
    }
    expect(declaration).toEqual(declarationBefore);
    expect(human).toEqual(reviewBefore);
  });

  it("recalculates freshness at review time and blocks acceptance of a stale suggestion", () => {
    const declaration = draft();
    const human = review();
    human.reviewed_at_ms = 111;
    expect(() => recordAdvisoryReview(declaration, human)).toThrow(/no eligible suggestion/);
    human.disposition = "defer";
    const result = recordAdvisoryReview(declaration, human);
    expect(result.original_draft.recommendation.outcome).toBe("recommended");
    expect(result.review_time_draft.freshness.status).toBe("stale");
    expect(result.review_time_draft.recommendation.outcome).toBe("no_eligible_route");
  });

  it("rejects acceptance with no eligible route and malformed or retroactive review", () => {
    const declaration = draft();
    declaration.input.provider_policy.allowed_provider_ids = [];
    expect(() => recordAdvisoryReview(declaration, review())).toThrow(/no eligible suggestion/);
    const blank = review(); blank.rationale = "  ";
    expect(() => recordAdvisoryReview(draft(), blank)).toThrow(SchemaValidationError);
    const early = review(); early.reviewed_at_ms = 104;
    expect(() => recordAdvisoryReview(draft(), early)).toThrow(/cannot precede/);
    const unsafe = review(); unsafe.reviewed_at_ms = Number.MAX_SAFE_INTEGER + 1;
    expect(() => recordAdvisoryReview(draft(), unsafe)).toThrow(/safe integer/);
  });
});

describe("local advisory command", () => {
  it("reads explicit files, emits a minimal summary and does not write a pilot record", () => {
    execFileSync("pnpm", ["exec", "tsc", "-p", "tsconfig.routing-advisory.json"]);
    const compiled = "dist/routing-advisory";
    fs.mkdirSync(path.join(compiled, "schemas"), { recursive: true });
    for (const name of ["local-deterministic-routing-input", "local-routing-advisory-draft", "local-routing-advisory-review"]) {
      fs.copyFileSync(path.join("schemas", `${name}.schema.json`), path.join(compiled, "schemas", `${name}.schema.json`));
    }
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "aletheia-advisory-"));
    try {
      const declaration = path.join(dir, "declaration.json");
      const human = path.join(dir, "review.json");
      fs.writeFileSync(declaration, JSON.stringify(draft()));
      fs.writeFileSync(human, JSON.stringify(review()));
      const command = path.join(compiled, "scripts/routing-advisory.js");
      const pending = JSON.parse(execFileSync("node", [command, declaration], { encoding: "utf8" })) as Record<string, unknown>;
      expect(pending).toMatchObject({ local_advisory_only: true, no_execution: true, outcome: "recommended", human_disposition: "pending" });
      expect(JSON.stringify(pending)).not.toContain("manual-check-1");
      const accepted = JSON.parse(execFileSync("node", [command, declaration, human], { encoding: "utf8" })) as Record<string, unknown>;
      expect(accepted).toMatchObject({ selected_route_id: "fictional-sparrow", human_disposition: "accept_suggestion" });
      expect(fs.readdirSync(dir).sort()).toEqual(["declaration.json", "review.json"]);
      const malformed = path.join(dir, "invalid.json");
      fs.writeFileSync(malformed, '{"secret":"do-not-print",');
      const failed = spawnSync("node", [command, malformed], { encoding: "utf8" });
      expect(failed.status).toBe(1);
      expect(failed.stderr).not.toContain("do-not-print");
    } finally {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  });
});
