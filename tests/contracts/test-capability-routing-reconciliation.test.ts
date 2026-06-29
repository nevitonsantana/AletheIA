import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const root = process.cwd();
const contract = fs.readFileSync(
  path.join(root, "docs/contracts/capability-routing-reconciliation.md"),
  "utf8",
);
const contractsIndex = fs.readFileSync(path.join(root, "docs/contracts/README.md"), "utf8");

describe("S10 capability routing reconciliation", () => {
  it("defines one canonical mapping without adding execution authority", () => {
    for (const term of [
      "Capability",
      "Skill",
      "Tool",
      "Agent",
      "Subagent",
      "Execution vehicle",
      "Execution pattern",
      "AHC",
      "AHGE",
      "Resource Observatory",
    ]) {
      expect(contract).toContain(term);
    }

    expect(contract).toContain("does not implement a routing engine");
    expect(contract).toContain("The Observatory is read-only");
    expect(contract).toContain("Unavailable is neutral");
  });

  it("preserves existing authority boundaries", () => {
    expect(contract).toContain("AletheIA decides macro posture; Adaptive Skills declares capability fit");
    expect(contract).toContain("The runtime/harness executes and records");
    expect(contract).toContain("Every selected agent or subagent runs inside an AHC");
    expect(contract).toContain("No duplicate lifecycle");
  });

  it("includes four worked decisions and links existing contracts", () => {
    for (const heading of [
      "### 1. Low-risk documentation correction",
      "### 2. Debugging with objective gate",
      "### 3. Design-system-aware review",
      "### 4. Multi-agent governance review",
    ]) {
      expect(contract).toContain(heading);
    }

    for (const ref of [
      "execution-vehicle-selection.md",
      "execution-pattern-selection.md",
      "orchestration-contract.md",
      "agent-harness-contract.md",
      "agent-harness-governance-extension.md",
      "agent-action-audit-record.md",
      "execution-audit-record.md",
      "observation-governance-contract.md",
      "visual-operations-event-model.md",
    ]) {
      expect(contract).toContain(ref);
    }
  });

  it("is indexed with the contracts", () => {
    expect(contractsIndex).toContain("capability-routing-reconciliation.md");
  });
});
