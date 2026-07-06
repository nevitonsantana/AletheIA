import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const root = path.resolve(__dirname, "../..");
const reviewPath = path.join(root, "examples/backlog-readiness/s40-backlog-v05-framing-review.json");

interface S40Review {
  review_id: string;
  work_slice_ref: string;
  source_refs: Record<string, string>;
  completed_cycle: {
    delivered_slices: string[];
    real_s28_s29_usage_records: string[];
    readiness_only_records: string[];
  };
  blocked_or_deferred_tracks: Record<string, { status: string }>;
  candidate_next_tracks: Array<{ candidate: string; posture: string }>;
  decision: { next_slice: string; posture: string };
  guardrails: Record<string, boolean>;
}

const readReview = (): S40Review => JSON.parse(fs.readFileSync(reviewPath, "utf8")) as S40Review;

describe("S40 backlog v0.5 framing review", () => {
  it("closes the S34-S39 usage cycle without promoting domain governance expansion", () => {
    const review = readReview();

    expect(review.review_id).toBe("s40-backlog-v05-framing-review-2026-07-04");
    expect(review.work_slice_ref).toBe("S40");
    expect(review.completed_cycle.delivered_slices).toEqual(["S34", "S35", "S36", "S37", "S38", "S39"]);
    expect(review.completed_cycle.real_s28_s29_usage_records).toEqual(["S36", "S38"]);
    expect(review.completed_cycle.readiness_only_records).toEqual(["S37"]);

    expect(review.blocked_or_deferred_tracks.domain_governance_expansion.status).toBe("blocked");
    expect(review.blocked_or_deferred_tracks.s18_comparative_work_metrics.status).toBe("blocked");
    expect(review.blocked_or_deferred_tracks.runtime_2_0_implementation.status).toBe("deferred");
  });

  it("selects documentation coherence as the next safe backlog candidate", () => {
    const review = readReview();

    expect(review.candidate_next_tracks).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          candidate: "documentation_and_first_use_coherence_review",
          posture: "recommended",
        }),
        expect.objectContaining({
          candidate: "future_real_domain_governance_usage_capture",
          posture: "wait_for_real_trigger",
        }),
      ]),
    );
    expect(review.decision).toMatchObject({
      next_slice: "S41 documentation and first-use coherence review",
      posture: "advance_clarity_before_new_capability",
    });
  });

  it("keeps implementation guardrails off and resolves source refs", () => {
    const review = readReview();

    expect(review.guardrails).toMatchObject({
      activated_s18: false,
      authorized_runtime_2_0_implementation: false,
      created_collector: false,
      created_dashboard: false,
      created_scanner: false,
      created_schema: false,
      created_policy_engine: false,
      created_domain_pack_enforcement: false,
      created_new_domain_pack: false,
      changed_adaptive_skills: false,
      counts_synthetic_examples_as_real_evidence: false,
      treats_templates_as_usage_evidence: false,
    });

    for (const ref of Object.values(review.source_refs)) {
      expect(fs.existsSync(path.join(root, ref)), `${ref} should resolve`).toBe(true);
    }
  });

  it("indexes the S40 framing review in planning surfaces", () => {
    const examplesIndex = fs.readFileSync(path.join(root, "examples/README.md"), "utf8");
    const reviewIndex = fs.readFileSync(path.join(root, "examples/backlog-readiness/README.md"), "utf8");
    const backlog = fs.readFileSync(
      path.join(root, "docs/roadmaps/evolution-backlog-aletheia-adaptive-skills.md"),
      "utf8",
    );
    const systemState = fs.readFileSync(path.join(root, "SYSTEM_STATE.md"), "utf8");

    expect(examplesIndex).toContain("framing S40");
    expect(reviewIndex).toContain("s40-backlog-v05-framing-review.json");
    expect(backlog).toContain("### S40 — Backlog v0.5 framing review");
    expect(backlog).toContain("Status:** `delivered` by AletheIA PR #341");
    expect(systemState).toContain("S40 Backlog v0.5 framing review is delivered");
    expect(systemState).toContain("Active:** none");
  });
});
