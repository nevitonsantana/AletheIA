import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const root = path.resolve(__dirname, "../..");
const reviewPath = path.join(root, "examples/backlog-readiness/s43-roadmap-reference-integrity-review.json");
const roadmaps = [
  "docs/roadmaps/enterprise-readiness-roadmap.md",
  "docs/roadmaps/resource-aware-operations-roadmap.md",
];

interface S43Review {
  review_id: string;
  work_slice_ref: string;
  source_refs: Record<string, string>;
  resolution: Record<string, { paths_checked: number; unresolved_before: number; unresolved_after: number }>;
  scope_boundary: Record<string, boolean | string[]>;
  guardrails: Record<string, boolean>;
}

const readReview = (): S43Review => JSON.parse(fs.readFileSync(reviewPath, "utf8")) as S43Review;

const inlineDocPaths = (roadmap: string): string[] => {
  const source = fs.readFileSync(path.join(root, roadmap), "utf8");
  return [...new Set([...source.matchAll(/`(docs\/[^`]+?\.md)`/g)].map((match) => match[1]))];
};

describe("S43 roadmap documentation reference integrity repair", () => {
  it("resolves every reviewed internal documentation path", () => {
    const review = readReview();

    expect(review.review_id).toBe("s43-roadmap-reference-integrity-review-2026-07-09");
    expect(review.work_slice_ref).toBe("S43");
    expect(review.resolution.enterprise_readiness_roadmap).toMatchObject({
      paths_checked: 11,
      unresolved_before: 11,
      unresolved_after: 0,
    });
    expect(review.resolution.resource_aware_operations_roadmap).toMatchObject({
      paths_checked: 29,
      unresolved_before: 21,
      unresolved_after: 0,
    });

    for (const roadmap of roadmaps) {
      for (const docPath of inlineDocPaths(roadmap)) {
        expect(fs.existsSync(path.join(root, docPath)), `${roadmap}: ${docPath} should resolve`).toBe(true);
      }
    }
    for (const ref of Object.values(review.source_refs)) {
      expect(fs.existsSync(path.join(root, ref)), `${ref} should resolve`).toBe(true);
    }
  });

  it("keeps S43 bounded after the repair closes", () => {
    const review = readReview();
    const backlog = fs.readFileSync(
      path.join(root, "docs/roadmaps/evolution-backlog-aletheia-adaptive-skills.md"),
      "utf8",
    );
    const systemState = fs.readFileSync(path.join(root, "SYSTEM_STATE.md"), "utf8");

    expect(review.scope_boundary).toMatchObject({
      not_a_repository_wide_link_audit: true,
      created_link_scanner: false,
      created_documentation_generator: false,
      changed_runtime_or_adaptive_skills: false,
    });
    expect(review.guardrails).toMatchObject({
      activated_s18: false,
      authorized_runtime_2_0_implementation: false,
      created_scanner: false,
      created_schema: false,
      created_policy_engine: false,
      changed_adaptive_skills: false,
    });
    expect(backlog).toContain("### S43 — Roadmap documentation reference integrity repair");
    expect(backlog).toContain("**Status:** `delivered` by AletheIA PR #350.");
    expect(systemState).toContain("S43 Roadmap documentation reference integrity repair is delivered");
  });
});
