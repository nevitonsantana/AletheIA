import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const root = process.cwd();
const contract = fs.readFileSync(
  path.join(root, "docs/contracts/skill-catalog-governance-contract.md"),
  "utf8",
);
const contractsIndex = fs.readFileSync(path.join(root, "docs/contracts/README.md"), "utf8");

describe("S20 skill catalog governance contract", () => {
  it("preserves the cross-layer authority boundary", () => {
    expect(contract).toContain("The skill declares behavior and requirements");
    expect(contract).toContain("The model proposes use");
    expect(contract).toContain("The harness validates and");
    expect(contract).toContain("records. AletheIA defines");
    expect(contract).toContain("AletheIA defines the governance contract");
    expect(contract).toContain("No skill approves, blocks, mutates or closes a");
  });

  it("defines selection and proposal decision objects", () => {
    expect(contract).toContain("skill_selection_decision:");
    expect(contract).toContain("candidate_skills:");
    expect(contract).toContain("skill_proposal_decision:");
    expect(contract).toContain("proposed_change: new_skill | optional_module | merge | split | deprecate | reject");
  });

  it("keeps blocking narrow and metrics provenance-based", () => {
    expect(contract).toContain("Blocking is intentionally narrow");
    expect(contract).toContain("claims authority to approve, block, close or mutate a Work Slice");
    expect(contract).toContain("Every metric must declare provenance");
    expect(contract).toContain("skill success rate");
    expect(contract).toContain("Not permitted in S20");
  });

  it("is indexed and linked to existing contracts", () => {
    expect(contractsIndex).toContain("skill-catalog-governance-contract.md");
    for (const ref of [
      "capability-routing-reconciliation.md",
      "observation-governance-contract.md",
      "agent-harness-contract.md",
      "agent-harness-governance-extension.md",
      "skill-evolution-validation-contract.md",
    ]) {
      expect(contract).toContain(ref);
    }
  });
});
