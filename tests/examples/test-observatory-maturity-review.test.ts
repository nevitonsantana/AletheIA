import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const root = path.resolve(__dirname, "../..");
const reviewPath = path.join(root, "examples/observatory-maturity/s32-observatory-maturity-review.json");

interface S32Review {
  review_id: string;
  source_refs: Record<string, string>;
  surfaces_reviewed: Array<{
    surface: string;
    expansion_decision: string;
  }>;
  activation_gate_review: Record<string, { threshold_met: boolean; reason: string }>;
  decision: {
    posture: string;
    s18_status: string;
  };
  unavailable_inputs: string[];
  guardrails: Record<string, boolean>;
}

const readReview = (): S32Review => JSON.parse(fs.readFileSync(reviewPath, "utf8")) as S32Review;

describe("S32 Observatory maturity review", () => {
  it("records a no-build maturity decision across Observatory surfaces", () => {
    const review = readReview();

    expect(review.review_id).toBe("s32-observatory-maturity-review-2026-07-02");
    expect(review.surfaces_reviewed.map(({ surface }) => surface)).toEqual([
      "Visual Operations / Mission Control",
      "Resource Observatory",
      "Work Observatory",
      "Documentation continuity projection",
    ]);
    expect(review.surfaces_reviewed.every(({ expansion_decision }) => ["do_not_expand", "defer"].includes(expansion_decision))).toBe(true);
    expect(review.decision.posture).toBe("no_build_refine_when_needed");
    expect(review.decision.s18_status).toBe("deferred");
    expect(review.unavailable_inputs).toContain("stable comparison_group");
    expect(review.unavailable_inputs).toContain("authoritative runtime token/cost telemetry");
  });

  it("keeps all activation gates unmet and forbids scope expansion", () => {
    const review = readReview();

    for (const gate of Object.values(review.activation_gate_review)) {
      expect(gate.threshold_met).toBe(false);
      expect(gate.reason).not.toHaveLength(0);
    }

    expect(review.guardrails).toMatchObject({
      created_collector: false,
      created_dashboard: false,
      created_schema: false,
      created_runtime_telemetry: false,
      created_importer: false,
      created_visual_feature: false,
      created_people_scoring: false,
      created_ranking: false,
      created_automatic_documentation_health_inference: false,
      activated_s18: false,
    });
  });

  it("uses existing source references and is indexed in planning surfaces", () => {
    const review = readReview();

    for (const ref of Object.values(review.source_refs)) {
      expect(fs.existsSync(path.join(root, ref)), `${ref} should resolve`).toBe(true);
    }

    const examplesIndex = fs.readFileSync(path.join(root, "examples/README.md"), "utf8");
    const reviewIndex = fs.readFileSync(path.join(root, "examples/observatory-maturity/README.md"), "utf8");
    const backlog = fs.readFileSync(
      path.join(root, "docs/roadmaps/evolution-backlog-aletheia-adaptive-skills.md"),
      "utf8",
    );
    const systemState = fs.readFileSync(path.join(root, "SYSTEM_STATE.md"), "utf8");

    expect(examplesIndex).toContain("revisão S32 da maturidade");
    expect(reviewIndex).toContain("s32-observatory-maturity-review.json");
    expect(backlog).toContain("### S32 — Observatory maturity review");
    expect(backlog).toContain("delivered` by AletheIA PR #324");
    expect(systemState).toContain("S32 Observatory maturity review");
  });
});
