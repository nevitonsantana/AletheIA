import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const root = process.cwd();
const contract = fs.readFileSync(
  path.join(root, "docs/contracts/independent-validation-hardening-contract.md"),
  "utf8",
);
const contractsIndex = fs.readFileSync(path.join(root, "docs/contracts/README.md"), "utf8");
const fixture = JSON.parse(
  fs.readFileSync(path.join(root, "examples/independent-validation/synthetic-review-case.json"), "utf8"),
) as any;

describe("S21 independent validation hardening", () => {
  it("preserves validation as a review layer, not proof or authority", () => {
    expect(contract).toContain("This contract adds the shape of the independent validation context and review record");
    expect(contract).toContain("It does not assign reviewers, run benchmarks, approve merges, deploy artifacts");
    expect(contract).toContain("not hidden actor reasoning");
    expect(contract).toContain("it may not become the source of truth");
  });

  it("requires source-backed critic context with privacy boundaries", () => {
    const context = fixture.independent_critic_context;
    expect(context.source_refs.length).toBeGreaterThan(0);
    expect(context.privacy_boundary).toEqual({
      prompt_content: "excluded",
      restricted_sources: "metadata_only",
      secrets: "excluded",
    });
    expect(context.known_gaps[0].status).toBe("unavailable");
  });

  it("does not allow clean proceed with unavailable required evidence", () => {
    const gate = fixture.evidence_to_expectation_gate;
    const missingRequiredEvidence = gate.expectations.filter(
      (item: any) => item.required && ["partially_proven", "not_proven", "unavailable"].includes(item.evidence_status),
    );

    expect(missingRequiredEvidence.length).toBeGreaterThan(0);
    expect(gate.overall_disposition).not.toBe("proceed");
    expect(fixture.validation_review_record.verdict).toBe("human_review_required");
  });

  it("requires material findings to carry source refs and visible limitations", () => {
    for (const finding of fixture.validation_review_record.findings) {
      expect(finding.source_refs.length).toBeGreaterThan(0);
      expect(finding.recommendation).toMatch(/proceed|revise|block|human_review_required|log_only/);
    }
    expect(fixture.validation_review_record.limitations.length).toBeGreaterThan(0);
  });

  it("is indexed and linked to existing validation authorities", () => {
    expect(contractsIndex).toContain("independent-validation-hardening-contract.md");
    for (const ref of [
      "intent-to-evidence-extension.md",
      "maker-checker-policy.md",
      "objective-gate-policy.md",
      "agent-harness-governance-extension.md",
    ]) {
      expect(contract).toContain(ref);
    }
  });
});
