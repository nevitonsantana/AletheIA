import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const root = path.resolve(__dirname, "../..");
const reviewPath = path.join(root, "examples/domain-governance-usage/s45-open-dependabot-trust-boundary-review.json");

interface S45Review {
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
    non_goals_confirmed: Record<string, boolean>;
  };
  reviewed_prs: Array<{ pr: number; boundary: string; observed_ci_status: string; review_outcome: string }>;
  expansion_decision: { posture: string };
  guardrails: Record<string, boolean>;
}

const readReview = (): S45Review => JSON.parse(fs.readFileSync(reviewPath, "utf8")) as S45Review;

describe("S45 open Dependabot trust-boundary review", () => {
  it("captures real S28/S29 usage evidence for open dependency PRs", () => {
    const review = readReview();

    expect(review.review_id).toBe("s45-open-dependabot-trust-boundary-review-2026-07-10");
    expect(review.work_slice_ref).toBe("S45");
    expect(review.domain_governance_usage_evidence.applicability).toMatchObject({
      pack_used: "multiple",
      trigger: "untrusted_content_and_web_build_boundary",
      evidence_source: "real_work_slice",
    });
    expect(review.domain_governance_usage_evidence.usage_observation).toMatchObject({
      helped_decision: true,
      clarified_boundary: true,
      found_gap: true,
      blocked_or_changed_work: false,
    });
    expect(review.reviewed_prs.map((entry) => entry.pr)).toEqual([343, 344, 345]);
    expect(review.reviewed_prs.map((entry) => entry.boundary)).toEqual(
      expect.arrayContaining([
        "type_and_tooling_surface",
        "web_build_tooling",
        "compiler_and_typecheck_surface",
      ]),
    );
    expect(review.reviewed_prs.every((entry) => entry.observed_ci_status === "success")).toBe(true);
    expect(review.reviewed_prs.every((entry) => entry.review_outcome.includes("merge decision remains separate"))).toBe(true);
  });

  it("keeps dependency merges, expansion and enforcement off", () => {
    const review = readReview();

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
      merged_dependency_pr: false,
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
      merged_dependency_pr: false,
    });
  });

  it("resolves local sources and indexes the review", () => {
    const review = readReview();

    for (const ref of Object.values(review.source_refs)) {
      expect(fs.existsSync(path.join(root, ref)), `${ref} should resolve`).toBe(true);
    }

    const reviewIndex = fs.readFileSync(path.join(root, "examples/domain-governance-usage/README.md"), "utf8");
    const backlog = fs.readFileSync(
      path.join(root, "docs/roadmaps/evolution-backlog-aletheia-adaptive-skills.md"),
      "utf8",
    );
    const systemState = fs.readFileSync(path.join(root, "SYSTEM_STATE.md"), "utf8");

    expect(reviewIndex).toContain("s45-open-dependabot-trust-boundary-review.json");
    expect(backlog).toContain("### S45 — Open Dependabot trust-boundary review");
    expect(backlog).toContain("**Status:** `delivered` by AletheIA PR #354.");
    expect(systemState).toContain("S45 Open Dependabot trust-boundary review is delivered");
  });
});
