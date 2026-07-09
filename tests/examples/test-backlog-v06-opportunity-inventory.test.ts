import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const root = path.resolve(__dirname, "../..");
const reviewPath = path.join(root, "examples/backlog-readiness/s42-backlog-v06-opportunity-inventory.json");

interface S42Review {
  review_id: string;
  work_slice_ref: string;
  source_refs: Record<string, string>;
  candidate_inventory: Array<{ candidate: string; posture: string }>;
  decision: { next_slice: string; posture: string };
  guardrails: Record<string, boolean>;
}

const readReview = (): S42Review => JSON.parse(fs.readFileSync(reviewPath, "utf8")) as S42Review;

describe("S42 backlog v0.6 opportunity inventory", () => {
  it("uses source-backed candidates and selects one bounded reader-facing repair", () => {
    const review = readReview();

    expect(review.review_id).toBe("s42-backlog-v06-opportunity-inventory-2026-07-09");
    expect(review.work_slice_ref).toBe("S42");
    expect(review.candidate_inventory).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ candidate: "roadmap_documentation_reference_integrity", posture: "recommended" }),
        expect.objectContaining({ candidate: "future_real_domain_governance_usage_capture", posture: "wait_for_real_trigger" }),
        expect.objectContaining({ candidate: "comparative_work_metrics", posture: "blocked" }),
        expect.objectContaining({ candidate: "runtime_2_0_implementation", posture: "deferred" }),
      ]),
    );
    expect(review.decision).toMatchObject({
      next_slice: "S43 Roadmap documentation reference integrity repair",
      posture: "repair_observable_reader_blockers_before_new_capability",
    });

    for (const ref of Object.values(review.source_refs)) {
      expect(fs.existsSync(path.join(root, ref)), `${ref} should resolve`).toBe(true);
    }
  });

  it("keeps gated implementation tracks off after S42 closes", () => {
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
    });
    expect(backlog).toContain("### S42 — Backlog v0.6 opportunity inventory");
    expect(backlog).toContain("**Status:** `delivered` by AletheIA PR #348.");
    expect(systemState).toContain("S42 Backlog v0.6 opportunity inventory is delivered");
  });
});
