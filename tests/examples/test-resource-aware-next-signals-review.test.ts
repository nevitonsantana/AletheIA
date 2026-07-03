import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const root = path.resolve(__dirname, "../..");
const reviewPath = path.join(root, "examples/resource-aware-operations/s31-next-signals-review.json");

interface S31NextSignalsReview {
  review_id: string;
  source_refs: Record<string, string>;
  records_reviewed: Array<{
    ref: string;
    comparison_group: string;
    threshold_posture: string;
  }>;
  healthy_signal_review: Record<string, { fired: boolean; reason: string }>;
  threshold_decision: {
    decision: string;
    s18_status: string;
    required_before_reopen: string[];
  };
  unavailable_inputs: string[];
  guardrails: Record<string, boolean>;
}

const readJson = (filePath: string): S31NextSignalsReview =>
  JSON.parse(fs.readFileSync(filePath, "utf8")) as S31NextSignalsReview;

describe("S31 resource-aware next-signals review", () => {
  it("keeps 1.2 stable and S18 deferred because current records are heterogeneous", () => {
    const review = readJson(reviewPath);

    expect(review.review_id).toBe("s31-resource-aware-next-signals-2026-07-02");
    expect(review.records_reviewed).toHaveLength(5);
    expect(new Set(review.records_reviewed.map(({ comparison_group }) => comparison_group))).toEqual(
      new Set(["unavailable"]),
    );
    expect(new Set(review.records_reviewed.map(({ threshold_posture }) => threshold_posture))).toEqual(
      new Set(["input_not_threshold"]),
    );

    for (const signal of Object.values(review.healthy_signal_review)) {
      expect(signal.fired).toBe(false);
      expect(signal.reason).not.toHaveLength(0);
    }

    expect(review.threshold_decision.decision).toBe("keep_1_2_stable");
    expect(review.threshold_decision.s18_status).toBe("deferred");
    expect(review.threshold_decision.required_before_reopen).toContain(
      "at least five reviewed records in one stable comparison_group before S18 comparative work metrics",
    );
    expect(review.unavailable_inputs).toContain("stable comparison_group");
    expect(review.unavailable_inputs).toContain("benchmark-ready baseline");
  });

  it("references existing source records and forbids scope expansion", () => {
    const review = readJson(reviewPath);

    for (const ref of Object.values(review.source_refs)) {
      expect(fs.existsSync(path.join(root, ref)), `${ref} should resolve`).toBe(true);
    }

    for (const record of review.records_reviewed) {
      expect(fs.existsSync(path.join(root, record.ref)), `${record.ref} should resolve`).toBe(true);
    }

    expect(review.guardrails).toMatchObject({
      activated_s18: false,
      created_benchmark: false,
      created_dashboard: false,
      created_runtime_collection: false,
      created_auto_routing: false,
      created_learning_layer_behavior: false,
      ranked_vendors_or_models: false,
    });
  });

  it("is indexed and reflected in planning surfaces", () => {
    const examplesIndex = fs.readFileSync(path.join(root, "examples/README.md"), "utf8");
    const resourceIndex = fs.readFileSync(path.join(root, "examples/resource-aware-operations/README.md"), "utf8");
    const backlog = fs.readFileSync(
      path.join(root, "docs/roadmaps/evolution-backlog-aletheia-adaptive-skills.md"),
      "utf8",
    );
    const systemState = fs.readFileSync(path.join(root, "SYSTEM_STATE.md"), "utf8");

    expect(examplesIndex).toContain("revisão S31 de next-signals");
    expect(resourceIndex).toContain("s31-next-signals-review.json");
    expect(backlog).toContain("### S31 — Resource-aware next-signals review");
    expect(backlog).toContain("delivered` by AletheIA PR #322");
    expect(systemState).toContain("S31 Resource-aware next-signals review is delivered");
    expect(systemState).toContain("S32 Observatory maturity review");
  });
});
