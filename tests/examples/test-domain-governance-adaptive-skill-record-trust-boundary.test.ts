import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const root = path.resolve(__dirname, "../..");
const reviewPath = path.join(root, "examples/domain-governance-usage/s38-adaptive-skill-record-trust-boundary-review.json");

interface S38Review {
  review_id: string;
  work_slice_ref: string;
  source_refs: Record<string, string>;
  domain_governance_usage_evidence: {
    applicability: {
      pack_used: string;
      trigger: string;
      evidence_source: string;
    };
    usage_observation: {
      helped_decision: boolean;
      clarified_boundary: boolean;
      found_gap: boolean;
      blocked_or_changed_work: boolean;
    };
    gaps: Array<{ gap: string; status: string; source_refs: string[] }>;
    non_goals_confirmed: Record<string, boolean>;
  };
  reviewed_boundary: {
    boundary_name: string;
    authority_posture: string;
    added_regression: string;
  };
  expansion_decision: {
    posture: string;
  };
  guardrails: Record<string, boolean>;
}

const readReview = (): S38Review => JSON.parse(fs.readFileSync(reviewPath, "utf8")) as S38Review;

describe("S38 Adaptive Skill record trust-boundary review", () => {
  it("records real S28/S29 usage for the Mission Control adapter boundary", () => {
    const review = readReview();

    expect(review.review_id).toBe("s38-adaptive-skill-record-trust-boundary-review-2026-07-04");
    expect(review.work_slice_ref).toBe("S38");
    expect(review.domain_governance_usage_evidence.applicability).toMatchObject({
      pack_used: "multiple",
      trigger: "untrusted_content_and_web_trust_boundary",
      evidence_source: "real_work_slice",
    });
    expect(review.domain_governance_usage_evidence.usage_observation).toMatchObject({
      helped_decision: true,
      clarified_boundary: true,
      found_gap: true,
      blocked_or_changed_work: true,
    });
    expect(review.reviewed_boundary.boundary_name).toContain("Adaptive Skills execution record");
    expect(review.reviewed_boundary.authority_posture).toContain("AletheIA retains gate and decision authority");
  });

  it("captures the local regression gap as resolved without expanding governance", () => {
    const review = readReview();

    expect(review.domain_governance_usage_evidence.gaps).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          status: "resolved",
          source_refs: ["apps/mission-control/src/adapters/adaptiveSkillExecutionRecordAdapter.test.ts"],
        }),
      ]),
    );
    expect(review.expansion_decision.posture).toBe("no_expansion");
    expect(review.domain_governance_usage_evidence.non_goals_confirmed).toMatchObject({
      created_new_domain_pack: false,
      created_scanner: false,
      created_policy_engine: false,
      created_runtime_enforcement: false,
      created_dashboard: false,
      created_schema: false,
      changed_adaptive_skills: false,
      activated_s18: false,
      claimed_success_rate: false,
      claimed_security_proof: false,
    });
    expect(review.guardrails).toMatchObject({
      created_new_domain_pack: false,
      created_scanner: false,
      created_policy_engine: false,
      created_runtime_enforcement: false,
      created_dashboard: false,
      created_schema: false,
      changed_adaptive_skills: false,
      activated_s18: false,
      claimed_success_rate: false,
      claimed_security_proof: false,
    });
  });

  it("resolves source refs and indexes the review", () => {
    const review = readReview();

    for (const ref of Object.values(review.source_refs)) {
      expect(fs.existsSync(path.join(root, ref)), `${ref} should resolve`).toBe(true);
    }

    const examplesIndex = fs.readFileSync(path.join(root, "examples/README.md"), "utf8");
    const reviewIndex = fs.readFileSync(path.join(root, "examples/domain-governance-usage/README.md"), "utf8");
    const backlog = fs.readFileSync(
      path.join(root, "docs/roadmaps/evolution-backlog-aletheia-adaptive-skills.md"),
      "utf8",
    );
    const systemState = fs.readFileSync(path.join(root, "SYSTEM_STATE.md"), "utf8");

    expect(examplesIndex).toContain("evidência S38");
    expect(reviewIndex).toContain("s38-adaptive-skill-record-trust-boundary-review.json");
    expect(backlog).toContain("### S38 — Adaptive Skill Record Trust-Boundary Review");
    expect(backlog).toContain("Status:** `delivered` by AletheIA PR #337");
    expect(systemState).toContain("S38 Adaptive Skill Record Trust-Boundary Review is delivered");
  });
});
