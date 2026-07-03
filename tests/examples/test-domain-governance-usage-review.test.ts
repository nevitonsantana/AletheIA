import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const root = path.resolve(__dirname, "../..");
const reviewPath = path.join(root, "examples/domain-governance-usage/s34-domain-governance-usage-review.json");

interface S34Review {
  review_id: string;
  source_refs: Record<string, string>;
  packs_reviewed: Array<{
    pack: string;
    usage_posture: string;
    observed_gaps: Array<{ status: string }>;
  }>;
  usage_decision: {
    posture: string;
  };
  deferred_items: Record<string, { status: string }>;
  guardrails: Record<string, boolean>;
}

const readReview = (): S34Review => JSON.parse(fs.readFileSync(reviewPath, "utf8")) as S34Review;

describe("S34 domain governance usage review", () => {
  it("reviews delivered domain packs as advisory guidance before expansion", () => {
    const review = readReview();

    expect(review.review_id).toBe("s34-domain-governance-usage-review-2026-07-03");
    expect(review.packs_reviewed.map(({ pack }) => pack)).toEqual([
      "AI Agent Security & Prompt Injection",
      "Web App Security & Trust Boundaries",
    ]);
    expect(review.packs_reviewed.every(({ usage_posture }) => usage_posture === "usable_as_advisory_guidance")).toBe(true);
    expect(review.usage_decision.posture).toBe("adopt_for_manual_review_before_expansion");
  });

  it("preserves unavailable gaps and defers enforcement/new-pack expansion", () => {
    const review = readReview();

    for (const pack of review.packs_reviewed) {
      expect(pack.observed_gaps.some(({ status }) => status === "unavailable")).toBe(true);
    }

    expect(review.deferred_items).toMatchObject({
      new_domain_pack: { status: "deferred" },
      domain_pack_enforcement: { status: "deferred" },
      scanner_or_policy_engine: { status: "deferred" },
      automatic_classification: { status: "deferred" },
    });

    expect(review.guardrails).toMatchObject({
      created_new_domain_pack: false,
      created_scanner: false,
      created_policy_engine: false,
      created_runtime_enforcement: false,
      created_dashboard: false,
      created_schema: false,
      changed_framework_core_authority: false,
      changed_adaptive_skills: false,
      activated_s18: false,
      authorized_runtime_2_0_implementation: false,
    });
  });

  it("uses existing source references and is indexed in planning surfaces", () => {
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

    expect(examplesIndex).toContain("domain-governance-usage/");
    expect(reviewIndex).toContain("s34-domain-governance-usage-review.json");
    expect(backlog).toContain("### S34 — Domain Governance Usage Review");
    expect(backlog).toContain("delivered` by AletheIA PR #329");
    expect(systemState).toContain("S34 Domain Governance Usage Review");
  });
});
