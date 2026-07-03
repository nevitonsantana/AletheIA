import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const root = path.resolve(__dirname, "../..");
const reviewPath = path.join(root, "examples/backlog-readiness/s33-v05-readiness-review.json");

interface S33Review {
  review_id: string;
  source_refs: Record<string, string>;
  current_cycle: {
    delivered_slices: string[];
  };
  blocked_or_deferred_tracks: Record<string, { status: string }>;
  decision: {
    next_slice: string;
    posture: string;
  };
  guardrails: Record<string, boolean>;
}

const readReview = (): S33Review => JSON.parse(fs.readFileSync(reviewPath, "utf8")) as S33Review;

describe("S33 backlog v0.5 readiness review", () => {
  it("records a next-cycle decision after S27-S32 closure", () => {
    const review = readReview();

    expect(review.review_id).toBe("s33-v05-readiness-review-2026-07-03");
    expect(review.current_cycle.delivered_slices).toEqual(["S27", "S28", "S29", "S30", "S31", "S32"]);
    expect(review.decision).toMatchObject({
      next_slice: "S34 domain governance usage review",
      posture: "observe_existing_guidance_before_expansion",
    });
  });

  it("keeps blocked and deferred tracks blocked", () => {
    const review = readReview();

    expect(review.blocked_or_deferred_tracks.s18_comparative_work_metrics.status).toBe("blocked");
    expect(review.blocked_or_deferred_tracks.runtime_2_0_implementation.status).toBe("deferred");
    expect(review.blocked_or_deferred_tracks.observatory_expansion.status).toBe("deferred");

    expect(review.guardrails).toMatchObject({
      activated_s18: false,
      authorized_runtime_2_0_implementation: false,
      created_collector: false,
      created_dashboard: false,
      created_schema: false,
      created_policy_engine: false,
      created_domain_pack_enforcement: false,
      created_new_domain_pack: false,
      changed_adaptive_skills: false,
    });
  });

  it("uses existing source references and is indexed in planning surfaces", () => {
    const review = readReview();

    for (const ref of Object.values(review.source_refs)) {
      expect(fs.existsSync(path.join(root, ref)), `${ref} should resolve`).toBe(true);
    }

    const examplesIndex = fs.readFileSync(path.join(root, "examples/README.md"), "utf8");
    const reviewIndex = fs.readFileSync(path.join(root, "examples/backlog-readiness/README.md"), "utf8");
    const backlog = fs.readFileSync(
      path.join(root, "docs/roadmaps/evolution-backlog-aletheia-adaptive-skills.md"),
      "utf8",
    );
    const systemState = fs.readFileSync(path.join(root, "SYSTEM_STATE.md"), "utf8");

    expect(examplesIndex).toContain("backlog-readiness/");
    expect(reviewIndex).toContain("s33-v05-readiness-review.json");
    expect(backlog).toContain("### S33 — Backlog v0.5 readiness review");
    expect(backlog).toContain("delivered` by AletheIA PR #327");
    expect(systemState).toContain("S33 Backlog v0.5 readiness review");
  });
});
