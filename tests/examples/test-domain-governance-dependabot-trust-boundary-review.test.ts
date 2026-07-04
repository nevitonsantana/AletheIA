import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const root = path.resolve(__dirname, "../..");
const reviewPath = path.join(root, "examples/domain-governance-usage/s36-dependabot-trust-boundary-review.json");

interface S36Review {
  review_id: string;
  work_slice_ref: string;
  source_refs: Record<string, string>;
  domain_governance_usage_evidence: {
    applicability: {
      pack_used: string;
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
  reviewed_prs: Array<{ pr: number; boundary: string }>;
  expansion_decision: {
    posture: string;
  };
  guardrails: Record<string, boolean>;
}

const readReview = (): S36Review => JSON.parse(fs.readFileSync(reviewPath, "utf8")) as S36Review;

describe("S36 Dependabot trust-boundary usage review", () => {
  it("records real S28/S29 usage evidence from the dependency PR cycle", () => {
    const review = readReview();

    expect(review.review_id).toBe("s36-dependabot-trust-boundary-review-2026-07-04");
    expect(review.work_slice_ref).toBe("S36");
    expect(review.domain_governance_usage_evidence.applicability).toMatchObject({
      pack_used: "multiple",
      evidence_source: "real_work_slice",
    });
    expect(review.domain_governance_usage_evidence.usage_observation).toMatchObject({
      helped_decision: true,
      clarified_boundary: true,
      found_gap: true,
      blocked_or_changed_work: false,
    });
    expect(review.reviewed_prs.map((entry) => entry.pr)).toEqual([273, 293, 292, 291, 290]);
    expect(review.reviewed_prs.map((entry) => entry.boundary)).toEqual(
      expect.arrayContaining([
        "ci_action_supply_chain",
        "web_build_tooling",
        "client_routing_dependency",
        "react_build_plugin",
        "type_and_tooling_surface",
      ]),
    );
  });

  it("keeps expansion, enforcement and metric claims off", () => {
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

  it("resolves local source refs and indexes the review", () => {
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

    expect(examplesIndex).toContain("evidência S36");
    expect(reviewIndex).toContain("s36-dependabot-trust-boundary-review.json");
    expect(backlog).toContain("### S36 — Dependabot Trust-Boundary Usage Review");
    expect(backlog).toContain("Status:** `in-review`");
    expect(systemState).toContain("S36 Dependabot Trust-Boundary Usage Review is in review");
  });
});
