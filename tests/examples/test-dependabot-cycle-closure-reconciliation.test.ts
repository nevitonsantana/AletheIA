import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const root = path.resolve(__dirname, "../..");
const reviewPath = path.join(root, "examples/domain-governance-usage/s46-dependabot-cycle-closure-reconciliation.json");

interface S46Review {
  review_id: string;
  work_slice_ref: string;
  source_refs: Record<string, string>;
  merged_dependency_prs: Array<{ pr: number; dependency: string; merge_commit: string }>;
  documentation_review: {
    readme: { needs_update: boolean };
    core_documentation: { needs_update: boolean; updated_refs: string[] };
    changelog: { needs_update: boolean; updated_refs: string[] };
  };
  decision: { posture: string };
  guardrails: Record<string, boolean>;
}

const readReview = (): S46Review => JSON.parse(fs.readFileSync(reviewPath, "utf8")) as S46Review;

describe("S46 Dependabot cycle closure reconciliation", () => {
  it("records the completed dependency cycle and documentation review", () => {
    const review = readReview();

    expect(review.review_id).toBe("s46-dependabot-cycle-closure-reconciliation-2026-07-13");
    expect(review.work_slice_ref).toBe("S46");
    expect(review.merged_dependency_prs.map((entry) => entry.pr)).toEqual([343, 344, 345]);
    expect(review.merged_dependency_prs.map((entry) => entry.dependency)).toEqual([
      "@types/node 26.1.0 -> 26.1.1",
      "vite 8.1.2 -> 8.1.4",
      "typescript 6.0.3 -> 7.0.2",
    ]);
    expect(review.merged_dependency_prs.every((entry) => /^[0-9a-f]{40}$/.test(entry.merge_commit))).toBe(true);
    expect(review.documentation_review.readme.needs_update).toBe(false);
    expect(review.documentation_review.core_documentation).toMatchObject({
      needs_update: true,
    });
    expect(review.documentation_review.core_documentation.updated_refs).toEqual(
      expect.arrayContaining([
        "SYSTEM_STATE.md",
        "docs/roadmaps/evolution-backlog-aletheia-adaptive-skills.md",
        "examples/domain-governance-usage/README.md",
      ]),
    );
    expect(review.documentation_review.changelog).toMatchObject({
      needs_update: true,
    });
    expect(review.documentation_review.changelog.updated_refs).toContain("CHANGELOG.md");
  });

  it("keeps implementation expansion off", () => {
    const review = readReview();

    expect(review.decision.posture).toBe("documentation_state_reconciled");
    expect(review.guardrails).toMatchObject({
      changed_dependencies: false,
      created_new_domain_pack: false,
      created_scanner: false,
      created_policy_engine: false,
      created_runtime_enforcement: false,
      created_dashboard: false,
      created_schema: false,
      changed_adaptive_skills: false,
      activated_s18: false,
      authorized_runtime_2_0_implementation: false,
      claimed_success_rate: false,
      claimed_security_proof: false,
    });
  });

  it("resolves local sources and indexes S46", () => {
    const review = readReview();

    for (const ref of Object.values(review.source_refs)) {
      expect(fs.existsSync(path.join(root, ref)), `${ref} should resolve`).toBe(true);
    }

    const usageIndex = fs.readFileSync(path.join(root, "examples/domain-governance-usage/README.md"), "utf8");
    const backlog = fs.readFileSync(
      path.join(root, "docs/roadmaps/evolution-backlog-aletheia-adaptive-skills.md"),
      "utf8",
    );
    const systemState = fs.readFileSync(path.join(root, "SYSTEM_STATE.md"), "utf8");
    const changelog = fs.readFileSync(path.join(root, "CHANGELOG.md"), "utf8");

    expect(usageIndex).toContain("s46-dependabot-cycle-closure-reconciliation.json");
    expect(backlog).toContain("### S46 — Dependabot cycle closure reconciliation");
    expect(backlog).toContain("**Status:** `delivered` by AletheIA PR #356.");
    expect(systemState).toContain("S46 Dependabot cycle closure reconciliation is delivered");
    expect(changelog).toContain("reconcile the completed Dependabot maintenance cycle");
  });
});
