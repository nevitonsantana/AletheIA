import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const root = process.cwd();
const fixtureDir = path.join(root, "examples/work-slices/cognitive-documentation-closure");
const contract = fs.readFileSync(
  path.join(root, "docs/contracts/cognitive-documentation-closure-extension.md"),
  "utf8",
);

function load(name: string) {
  return JSON.parse(fs.readFileSync(path.join(fixtureDir, name), "utf8"))
    .cognitive_documentation_closure as Record<string, any>;
}

describe("S16 cognitive and documentation closure extension", () => {
  it("allows a source-backed low-risk documentation closure", () => {
    const review = load("low-risk-docs.json");

    expect(review.intent_preservation.status).toBe("preserved");
    expect(review.documentation_coherence.verdict).toBe("current");
    expect(review.closure.verdict).toBe("proceed");
    expect(review.closure.evidence_refs.length).toBeGreaterThan(0);
  });

  it("requires stale documentation to be fixed before closure", () => {
    const review = load("stale-documentation.json");
    const stale = review.documentation_coherence.checked_surfaces.find(
      (surface: { status: string }) => surface.status === "stale",
    );

    expect(stale.source_refs.length).toBeGreaterThan(0);
    expect(stale.required_action).toBeTruthy();
    expect(review.closure.verdict).toBe("document_before_closing");
  });

  it("never lets understanding self-certify a high-risk change", () => {
    const review = load("high-risk-human-review.json");

    expect(review.understanding_review.risk_level).toBe("high");
    expect(review.closure.verdict).toBe("human_review_required");
    expect(contract).toContain("cannot close from self-reported understanding alone");
    expect(contract).toContain("cannot certify safety");
  });

  it("preserves unknown documentation as unavailable", () => {
    const review = load("high-risk-human-review.json");
    const unavailable = review.documentation_coherence.checked_surfaces.find(
      (surface: { status: string }) => surface.status === "unavailable",
    );

    expect(unavailable).toBeTruthy();
    expect(unavailable.source_refs).toEqual(["unavailable:security-review-record"]);
    expect(review.documentation_coherence.verdict).toBe("unavailable");
    expect(contract).toContain("Missing inspection is `unavailable`");
  });

  it("closes the real pilot only with accepted merge evidence", () => {
    const review = load("s16-real-pilot.json");

    expect(review.intent_preservation.status).toBe("preserved");
    expect(review.documentation_coherence.verdict).toBe("current");
    expect(review.closure.verdict).toBe("proceed");
    expect(review.closure.evidence_refs).toContain("AletheIA#270@fb6faba");
  });
});
