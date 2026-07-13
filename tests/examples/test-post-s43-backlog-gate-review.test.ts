import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const root = path.resolve(__dirname, "../..");
const reviewPath = path.join(root, "examples/backlog-readiness/s44-post-s43-backlog-gate-review.json");

interface S44Review {
  review_id: string;
  work_slice_ref: string;
  source_refs: Record<string, string>;
  current_inputs: Record<string, string | number | boolean>;
  candidate_gate_review: Array<{ candidate: string; posture: string }>;
  decision: { posture: string; next_admissible_trigger: string };
  guardrails: Record<string, boolean>;
}

const readReview = (): S44Review => JSON.parse(fs.readFileSync(reviewPath, "utf8")) as S44Review;

describe("S44 post-S43 backlog gate review", () => {
  it("records a pause decision from source-backed gates", () => {
    const review = readReview();

    expect(review.review_id).toBe("s44-post-s43-backlog-gate-review-2026-07-09");
    expect(review.work_slice_ref).toBe("S44");
    expect(review.current_inputs).toMatchObject({
      main_synchronized_after_pr_351: true,
      system_active_state: "none",
      open_github_issues_observed: 0,
      plans_directory_status: "local_untracked",
    });
    expect(review.candidate_gate_review).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ candidate: "future_real_domain_governance_usage_capture", posture: "wait_for_real_trigger" }),
        expect.objectContaining({ candidate: "comparative_work_metrics", posture: "blocked" }),
        expect.objectContaining({ candidate: "runtime_2_0_implementation", posture: "deferred" }),
        expect.objectContaining({ candidate: "documentation_reference_repair_followup", posture: "closed" }),
      ]),
    );
    expect(review.decision).toMatchObject({
      posture: "pause_until_real_trigger",
    });
    expect(review.decision.next_admissible_trigger).toContain("S28/S29-relevant");

    for (const ref of Object.values(review.source_refs)) {
      expect(fs.existsSync(path.join(root, ref)), `${ref} should resolve`).toBe(true);
    }
  });

  it("keeps implementation authority off after the gate review", () => {
    const review = readReview();
    const backlog = fs.readFileSync(
      path.join(root, "docs/roadmaps/evolution-backlog-aletheia-adaptive-skills.md"),
      "utf8",
    );
    const systemState = fs.readFileSync(path.join(root, "SYSTEM_STATE.md"), "utf8");

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
    expect(backlog).toContain("### S44 — Post-S43 backlog gate review");
    expect(backlog).toContain("**Status:** `delivered` by AletheIA PR #352.");
    expect(systemState).toContain("S44 Post-S43 backlog gate review is delivered");
  });
});
