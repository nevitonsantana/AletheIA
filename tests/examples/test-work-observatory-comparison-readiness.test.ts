import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

type ComparisonReadinessReview = {
  review_kind: string;
  decision: { s18_status: string; comparison_eligible: boolean; reason: string };
  records_reviewed: Array<{ work_record_ref: string; comparison_group: string }>;
  comparison_blockers: Array<{ blocker: string }>;
  minimum_unlock_conditions: string[];
  non_goals: string[];
  source_refs: string[];
};

const root = process.cwd();
const reviewPath = path.resolve(root, "examples/work-observatory/comparison-readiness-review.json");
const review = JSON.parse(fs.readFileSync(reviewPath, "utf-8")) as ComparisonReadinessReview;

describe("Work Observatory comparison readiness review", () => {
  it("keeps S18 blocked even with five total heterogeneous records", () => {
    expect(review.review_kind).toBe("work_observatory_comparison_readiness_review");
    expect(review.records_reviewed).toHaveLength(5);
    expect(review.decision).toEqual(
      expect.objectContaining({
        s18_status: "blocked",
        comparison_eligible: false,
      }),
    );
    expect(review.decision.reason).toContain("do not share one reviewed stable comparison group");
  });

  it("requires one stable comparison group before future metrics", () => {
    expect(new Set(review.records_reviewed.map(({ comparison_group }) => comparison_group))).toEqual(
      new Set(["unavailable"]),
    );
    expect(review.comparison_blockers.map(({ blocker }) => blocker)).toEqual([
      "comparison_group_unavailable",
      "mixed_task_types",
      "unsupported_outcomes",
    ]);
    expect(review.minimum_unlock_conditions).toContain(
      "At least five records must share one reviewed stable comparison_group.",
    );
  });

  it("does not introduce scoring, ranking, collectors or runtime work", () => {
    expect(review.non_goals).toEqual(
      expect.arrayContaining([
        "activate S18",
        "create comparative metrics",
        "rank people, skills or agents",
        "invent work units, quality scores or value scores",
        "create a collector, dashboard, schema, runtime or backend",
      ]),
    );
  });

  it("keeps every local source ref resolvable", () => {
    for (const ref of review.source_refs.filter((sourceRef) => !sourceRef.startsWith("https://"))) {
      expect(fs.existsSync(path.resolve(root, ref)), `${ref} should resolve`).toBe(true);
    }

    for (const { work_record_ref } of review.records_reviewed) {
      expect(fs.existsSync(path.resolve(root, work_record_ref)), `${work_record_ref} should resolve`).toBe(true);
    }
  });
});
