import path from "node:path";
import { describe, it, expect } from "vitest";
import { loadGovernancePack, evaluateGovernance, type GovernanceFacts } from "../../engine";

const packPath = path.resolve(process.cwd(), "policies/feature-value-governance.v1.json");

// A clean build_now feature that passes every gate.
function approvableFeature(): GovernanceFacts {
  return {
    feature: {
      verdict: "build_now",
      problem_defined: true,
      icp_defined: true,
      lever_defined: true,
      evidence_strength: "strong",
      evidence_uncertainty_stated: true,
      complexity_level: "low",
      exception_approved: false,
      reversibility_level: "reversible",
      opportunity_node_present: true,
      has_primary_metric: true,
      guardrail_count: 2,
      has_review_dates: true,
    },
  } as unknown as GovernanceFacts;
}

describe("Feature Value Governance Pack (runtime enforcement)", () => {
  it("loads and validates as a governance pack", () => {
    const pack = loadGovernancePack(packPath);
    expect(pack.meta.name).toBe("Feature Value Governance Pack");
    expect(pack.rules.length).toBeGreaterThan(0);
  });

  it("allows a clean build_now at both hooks", () => {
    const pack = loadGovernancePack(packPath);
    const facts = approvableFeature();
    expect(evaluateGovernance({ pack, facts, hook: "before_execute" }).final_action).toBe("allow");
    expect(evaluateGovernance({ pack, facts, hook: "before_finalize" }).final_action).toBe("allow");
  });

  it("blocks a high-cost build with no exception (strict)", () => {
    const pack = loadGovernancePack(packPath);
    const facts = approvableFeature();
    (facts.feature as Record<string, unknown>).complexity_level = "high";
    const trace = evaluateGovernance({ pack, facts, hook: "before_execute" });
    expect(trace.final_action).toBe("block");
    expect(trace.matched_rules.map((r) => r.id)).toContain("gate.high_cost_needs_exception");
  });

  it("clears the high-cost block once an exception is approved", () => {
    const pack = loadGovernancePack(packPath);
    const facts = approvableFeature();
    (facts.feature as Record<string, unknown>).complexity_level = "high";
    (facts.feature as Record<string, unknown>).exception_approved = true;
    expect(evaluateGovernance({ pack, facts, hook: "before_execute" }).final_action).toBe("allow");
  });

  it("blocks a build_now on weak evidence in strict, softens to review in balanced", () => {
    const pack = loadGovernancePack(packPath);
    const facts = approvableFeature();
    (facts.feature as Record<string, unknown>).evidence_strength = "weak";
    expect(
      evaluateGovernance({ pack, facts, hook: "before_execute", mode: "strict" }).final_action,
    ).toBe("block");
    expect(
      evaluateGovernance({ pack, facts, hook: "before_execute", mode: "balanced" }).final_action,
    ).toBe("review");
  });

  it("requires a human gate for a one-way-door build", () => {
    const pack = loadGovernancePack(packPath);
    const facts = approvableFeature();
    (facts.feature as Record<string, unknown>).reversibility_level = "one_way_door";
    expect(evaluateGovernance({ pack, facts, hook: "before_execute" }).final_action).toBe("ask_human");
  });

  it("blocks finalize when the feature is not born measurable", () => {
    const pack = loadGovernancePack(packPath);
    const facts = approvableFeature();
    (facts.feature as Record<string, unknown>).has_primary_metric = false;
    (facts.feature as Record<string, unknown>).guardrail_count = 0;
    (facts.feature as Record<string, unknown>).has_review_dates = false;
    const trace = evaluateGovernance({ pack, facts, hook: "before_finalize" });
    expect(trace.final_action).toBe("block");
    expect(trace.matched_rules.map((r) => r.id)).toEqual(
      expect.arrayContaining([
        "measurable.primary_metric_required",
        "measurable.guardrails_required",
        "measurable.review_dates_required",
      ]),
    );
  });

  it("leaves kill/park verdicts unconstrained by build gates", () => {
    const pack = loadGovernancePack(packPath);
    const facts = approvableFeature();
    (facts.feature as Record<string, unknown>).verdict = "kill";
    (facts.feature as Record<string, unknown>).problem_defined = false;
    (facts.feature as Record<string, unknown>).has_primary_metric = false;
    (facts.feature as Record<string, unknown>).guardrail_count = 0;
    expect(evaluateGovernance({ pack, facts, hook: "before_execute" }).final_action).toBe("allow");
    expect(evaluateGovernance({ pack, facts, hook: "before_finalize" }).final_action).toBe("allow");
  });
});
