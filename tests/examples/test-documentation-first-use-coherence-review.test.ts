import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const root = path.resolve(__dirname, "../..");
const reviewPath = path.join(root, "examples/backlog-readiness/s41-documentation-first-use-coherence-review.json");

interface S41Review {
  review_id: string;
  work_slice_ref: string;
  source_refs: Record<string, string>;
  findings: Array<{ id: string; severity: string; resolution: string }>;
  decision: { posture: string };
  guardrails: Record<string, boolean>;
}

const readReview = (): S41Review => JSON.parse(fs.readFileSync(reviewPath, "utf8")) as S41Review;

describe("S41 documentation and first-use coherence review", () => {
  it("keeps the review bounded and source-backed", () => {
    const review = readReview();

    expect(review.review_id).toBe("s41-documentation-first-use-coherence-review-2026-07-09");
    expect(review.work_slice_ref).toBe("S41");
    expect(review.decision.posture).toBe("correct_bounded_reader_blockers");
    expect(review.findings).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: "S41-F1", severity: "reader-blocking" }),
        expect.objectContaining({ id: "S41-F2", severity: "clarity" }),
      ]),
    );

    for (const ref of Object.values(review.source_refs)) {
      expect(fs.existsSync(path.join(root, ref)), `${ref} should resolve`).toBe(true);
    }
  });

  it("removes stale README paths from the reviewed routes", () => {
    const readme = fs.readFileSync(path.join(root, "README.md"), "utf8");

    expect(readme).toContain("docs/guides/core-operating-path.md");
    expect(readme).toContain("docs/concepts/canonical-vocabulary.md");
    expect(readme).toContain("docs/contracts/runtime-adapter-contract.md");
    expect(readme).not.toContain("`docs/core-operating-path.md`");
    expect(readme).not.toContain("`docs/canonical-vocabulary.md`");
    expect(readme).not.toContain("`docs/runtime-adapter-contract.md`");
  });

  it("keeps implementation guardrails off after S41 closes", () => {
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
    expect(backlog).toContain("### S41 — Documentation and first-use coherence review");
    expect(backlog).toContain("**Status:** `delivered` by AletheIA PR #346.");
    expect(systemState).toContain("S41 Documentation and first-use coherence review is delivered");
  });
});
