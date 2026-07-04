import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const root = path.resolve(__dirname, "../..");
const reviewPath = path.join(root, "examples/domain-governance-usage/s39-domain-governance-evidence-sufficiency-review.json");

interface S39Review {
  review_id: string;
  work_slice_ref: string;
  source_refs: Record<string, string>;
  review_inputs: Array<{
    work_slice_ref: string;
    real_usage_evidence: boolean;
    trigger: string;
  }>;
  sufficiency_assessment: {
    real_usage_record_count: number;
    readiness_only_record_count: number;
    comparable_usage_group: boolean;
    sufficient_for_pack_refinement: boolean;
    sufficient_for_new_pack: boolean;
    sufficient_for_scanner_or_policy_engine: boolean;
    sufficient_for_runtime_enforcement: boolean;
    sufficient_for_schema_or_dashboard: boolean;
    sufficient_for_success_rate_or_security_proof: boolean;
  };
  observed_repeated_signals: Array<{ signal: string; seen_in: string[] }>;
  decision: {
    posture: string;
    domain_governance_expansion: string;
    pack_refinement: string;
  };
  non_goals_confirmed: Record<string, boolean>;
  guardrails: Record<string, boolean>;
}

const readReview = (): S39Review => JSON.parse(fs.readFileSync(reviewPath, "utf8")) as S39Review;

describe("S39 domain governance evidence sufficiency review", () => {
  it("separates real usage records from readiness-only review", () => {
    const review = readReview();

    expect(review.review_id).toBe("s39-domain-governance-evidence-sufficiency-review-2026-07-04");
    expect(review.work_slice_ref).toBe("S39");
    expect(review.review_inputs.map((input) => [input.work_slice_ref, input.real_usage_evidence])).toEqual([
      ["S36", true],
      ["S37", false],
      ["S38", true],
    ]);
    expect(review.sufficiency_assessment.real_usage_record_count).toBe(2);
    expect(review.sufficiency_assessment.readiness_only_record_count).toBe(1);
  });

  it("keeps expansion blocked because evidence is too small and heterogeneous", () => {
    const review = readReview();

    expect(review.sufficiency_assessment).toMatchObject({
      comparable_usage_group: false,
      sufficient_for_pack_refinement: false,
      sufficient_for_new_pack: false,
      sufficient_for_scanner_or_policy_engine: false,
      sufficient_for_runtime_enforcement: false,
      sufficient_for_schema_or_dashboard: false,
      sufficient_for_success_rate_or_security_proof: false,
    });
    expect(review.decision).toMatchObject({
      posture: "continue_advisory_use",
      domain_governance_expansion: "blocked",
      pack_refinement: "deferred",
    });
    expect(review.observed_repeated_signals).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          signal: "external_or_cross_boundary_content_remains_evidence_not_instruction",
          seen_in: ["S36", "S38"],
        }),
      ]),
    );
  });

  it("keeps non-goals and guardrails off", () => {
    const review = readReview();

    expect(review.non_goals_confirmed).toMatchObject({
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
      treats_s37_as_real_usage: false,
      counts_synthetic_examples: false,
      promotes_two_records_to_repeated_comparable_group: false,
      authorizes_automation: false,
      authorizes_runtime_or_policy_change: false,
    });
  });

  it("resolves source refs and indexes the sufficiency review", () => {
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

    expect(examplesIndex).toContain("suficiência S39");
    expect(reviewIndex).toContain("s39-domain-governance-evidence-sufficiency-review.json");
    expect(backlog).toContain("### S39 — Domain Governance Evidence Sufficiency Review");
    expect(backlog).toContain("Status:** `in-review`");
    expect(systemState).toContain("S39 Domain Governance Evidence Sufficiency Review is in review");
  });
});
