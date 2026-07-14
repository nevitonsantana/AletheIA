import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const root = path.resolve(__dirname, "../..");
const reviewPath = path.join(root, "examples/backlog-readiness/s47-backlog-development-measurement-readiness.json");

interface S47Review {
  review_id: string;
  work_slice_ref: string;
  source_refs: Record<string, string>;
  user_intent: Record<string, boolean>;
  measurement_boundary: {
    allowed_descriptive_signals: string[];
    blocked_comparative_claims: string[];
  };
  minimum_future_record_shape: {
    comparative_metrics_allowed: boolean;
    comparison_group: string;
  };
  decision: { posture: string };
  guardrails: Record<string, boolean>;
}

const readReview = (): S47Review => JSON.parse(fs.readFileSync(reviewPath, "utf8")) as S47Review;

describe("S47 backlog development measurement readiness", () => {
  it("allows descriptive backlog-development signals without stopping backlog work", () => {
    const review = readReview();

    expect(review.review_id).toBe("s47-backlog-development-measurement-readiness-2026-07-13");
    expect(review.work_slice_ref).toBe("S47");
    expect(review.user_intent).toMatchObject({
      continue_backlog_development: true,
      avoid_pause_due_to_measurement_blockers: true,
      avoid_premature_comparative_metrics: true,
    });
    expect(review.measurement_boundary.allowed_descriptive_signals).toEqual(
      expect.arrayContaining([
        "work_slice_count_by_cycle",
        "pr_count_by_cycle",
        "ci_check_state_per_pr",
        "real_s28_s29_usage_capture_count",
      ]),
    );
    expect(review.decision.posture).toBe("allow_descriptive_backlog_development_measurement");
  });

  it("keeps S18-style comparative metrics blocked", () => {
    const review = readReview();

    expect(review.measurement_boundary.blocked_comparative_claims).toEqual(
      expect.arrayContaining([
        "success_rate",
        "productivity_score",
        "model_or_skill_ranking",
        "value_per_cost",
        "work_unit_efficiency",
      ]),
    );
    expect(review.minimum_future_record_shape).toMatchObject({
      comparative_metrics_allowed: false,
      comparison_group: "unavailable",
    });
    expect(review.guardrails).toMatchObject({
      activated_s18: false,
      created_dashboard: false,
      created_collector: false,
      created_schema: false,
      authorized_runtime_2_0_implementation: false,
      changed_adaptive_skills: false,
      claimed_success_rate: false,
      claimed_productivity_score: false,
      claimed_value_metric: false,
    });
  });

  it("resolves local sources and indexes S47", () => {
    const review = readReview();

    for (const ref of Object.values(review.source_refs)) {
      expect(fs.existsSync(path.join(root, ref)), `${ref} should resolve`).toBe(true);
    }

    const readinessIndex = fs.readFileSync(path.join(root, "examples/backlog-readiness/README.md"), "utf8");
    const backlog = fs.readFileSync(
      path.join(root, "docs/roadmaps/evolution-backlog-aletheia-adaptive-skills.md"),
      "utf8",
    );
    const systemState = fs.readFileSync(path.join(root, "SYSTEM_STATE.md"), "utf8");

    expect(readinessIndex).toContain("s47-backlog-development-measurement-readiness.json");
    expect(backlog).toContain("### S47 — Backlog development measurement readiness");
    expect(backlog).toContain("**Status:** `in review`.");
    expect(systemState).toContain("S47 Backlog development measurement readiness is in review");
  });
});
