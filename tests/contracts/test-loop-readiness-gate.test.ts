import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const root = process.cwd();
const contract = fs.readFileSync(path.join(root, "docs/contracts/loop-readiness-gate.md"), "utf8");
const contractsIndex = fs.readFileSync(path.join(root, "docs/contracts/README.md"), "utf8");
const fixture = JSON.parse(
  fs.readFileSync(path.join(root, "examples/governed-loops/s23-loop-readiness-synthetic.json"), "utf8"),
) as any;

describe("S23 Loop Readiness Gate", () => {
  it("stays a readiness surface, not a loop runtime", () => {
    expect(contract).toContain("It does not create a scheduler, runtime, policy engine");
    expect(contract).toContain("The gate is not a scheduler");
    expect(contract).toContain("does not cause execution");
  });

  it("requires objective gate and verifiable stop condition", () => {
    const gate = fixture.loop_readiness_gate;
    expect(gate.objective_gate.required).toBe(true);
    expect(gate.objective_gate.gate_ref).not.toMatch(/pending|unavailable/);
    expect(gate.objective_stop_condition.condition).not.toMatch(/looks good|until done/i);
    expect(contract).toContain("No objective gate, no autonomous loop");
  });

  it("requires review capacity and drift controls", () => {
    const gate = fixture.loop_readiness_gate;
    expect(gate.review_capacity.reviewer_ref).toBeTruthy();
    expect(gate.review_capacity.max_unreviewed_iterations).toBeLessThanOrEqual(1);
    expect(gate.review_capacity.escalation_owner).toBeTruthy();
    expect(gate.drift_controls.stop_on).toContain("scope_change");
    expect(gate.drift_controls.rescope_requires_human).toBe(true);
  });

  it("keeps recurring state mandatory only when recurrence requires it", () => {
    const gate = fixture.loop_readiness_gate;
    expect(gate.recurrence.kind).toBe("single_session");
    expect(gate.state).toEqual({ required: false, loop_state_ref: "not_needed" });
    expect(contract).toContain("Recurring loops require persistent state");
  });

  it("is source-backed and indexed with related loop authorities", () => {
    const gate = fixture.loop_readiness_gate;
    expect(gate.source_refs).toEqual(
      expect.arrayContaining([
        "objective-gate-policy",
        "loop-state-contract",
        "maker-checker-policy",
        "independent-validation-hardening-contract",
      ]),
    );
    expect(contractsIndex).toContain("loop-readiness-gate.md");
    for (const ref of [
      "execution-pattern-selection.md",
      "objective-gate-policy.md",
      "loop-state-contract.md",
      "maker-checker-policy.md",
      "independent-validation-hardening-contract.md",
    ]) {
      expect(contract).toContain(ref);
    }
  });
});
