import { describe, expect, it } from "vitest";
import debuggingDeclarationJson from "../../../../examples/execution-patterns/fixtures/skill-execution-patterns-debugging.json";
import featureValueDeclarationJson from "../../../../examples/execution-patterns/fixtures/skill-execution-patterns-feature-value.json";
import debuggingSelectionJson from "../../../../examples/execution-patterns/fixtures/execution-pattern-selection-debugging-loop.json";
import {
  projectPatternContext,
  type ExecutionPatternSelectionRecord,
  type SkillPatternCompatibilityDeclaration,
} from "./patternContextProjectionAdapter";

const debuggingDeclaration = debuggingDeclarationJson as SkillPatternCompatibilityDeclaration;
const featureValueDeclaration = featureValueDeclarationJson as SkillPatternCompatibilityDeclaration;
const debuggingSelection = debuggingSelectionJson as ExecutionPatternSelectionRecord;
const selectionRef = "examples/execution-patterns/fixtures/execution-pattern-selection-debugging-loop.json";
const debuggingCompatibilityRef = "https://github.com/nevitonsantana/adaptive-skills/blob/60de75d/examples/execution-patterns/debugging-patterns.yaml";

function loopSelection(overrides: Partial<ExecutionPatternSelectionRecord> = {}): ExecutionPatternSelectionRecord {
  return {
    ...debuggingSelection,
    ...overrides,
  };
}

describe("pattern context projection adapter", () => {
  it("projects compatible debugging context from both canonical sources", () => {
    const context = projectPatternContext({
      skillId: "debugging",
      selection: loopSelection(),
      selectionRef,
      compatibilityDeclaration: debuggingDeclaration,
      compatibilityRef: debuggingCompatibilityRef,
    });

    expect(context).toMatchObject({
      pattern: { id: "loop_until_done", vehicle: "loop" },
      selection: {
        verdict: "approved_with_constraints",
        selectedBy: "aletheia",
        decisionRef: selectionRef,
      },
      compatibility: {
        status: "compatible",
        declaredBy: "adaptive_skills",
        conditions: "Only when tests or repro commands provide objective stop condition.",
        requiredEvidence: ["failing_test", "passing_run", "iteration_count"],
        declarationRef: debuggingCompatibilityRef,
      },
    });
    expect(context.controls?.requiredControls).toEqual(expect.arrayContaining([
      "objective_gate_required",
      "max_iterations",
      "human_review_before_merge",
    ]));
  });

  it("projects a canonical incompatibility without suggesting loop use", () => {
    const context = projectPatternContext({
      skillId: "feature-value-governance",
      selection: loopSelection(),
      selectionRef,
      compatibilityDeclaration: featureValueDeclaration,
      compatibilityRef: "https://github.com/nevitonsantana/adaptive-skills/blob/60de75d/examples/execution-patterns/feature-value-governance-patterns.yaml",
    });

    expect(context.compatibility).toMatchObject({
      status: "incompatible",
      rationale: "Feature judgment does not have objective stop condition.",
    });
  });

  it("keeps absent compatibility unavailable instead of inferring it", () => {
    const context = projectPatternContext({
      skillId: "feature-planning",
      selection: loopSelection(),
      selectionRef,
    });

    expect(context.compatibility).toEqual({
      status: "unavailable",
      message: "loop candidacy not assessed",
      declaredBy: "unavailable",
      skillId: "feature-planning",
    });
  });

  it("projects explicit missing-gate and bounded-run evidence without inventing success rates", () => {
    const context = projectPatternContext({
      skillId: "debugging",
      selection: loopSelection(),
      selectionRef,
      compatibilityDeclaration: debuggingDeclaration,
      compatibilityRef: debuggingCompatibilityRef,
      loopRun: {
        sourceRef: "runtime://loop-runs/debugging-loop-s6",
        maxIterations: 3,
        currentIterations: 0,
        budget: { timeMinutes: 45, tokenBudget: 12000 },
        missingPreconditions: ["objective_gate"],
        humanReviewBoundary: "Human-led review required before continuation.",
        outcome: {
          result: "escalated",
          rationale: "The objective gate was not recorded.",
          evidenceRefs: ["audit://debugging-loop-s6/missing-gate"],
          escalationRef: "review://debugging-loop-s6",
          comparableCaseCount: 1,
        },
      },
    });

    expect(context.controls).toMatchObject({
      maxIterations: 3,
      currentIterations: 0,
      missingPreconditions: ["objective_gate"],
    });
    expect(context.outcome).toMatchObject({
      result: "escalated",
      comparableCaseCount: 1,
      showSuccessPercentage: false,
    });
    expect(context.refs.loopRunRef).toBe("runtime://loop-runs/debugging-loop-s6");
  });

  it("keeps percentages hidden without both comparable volume and objective criteria", () => {
    const context = projectPatternContext({
      skillId: "debugging",
      selection: loopSelection(),
      selectionRef,
      compatibilityDeclaration: debuggingDeclaration,
      compatibilityRef: debuggingCompatibilityRef,
      loopRun: {
        sourceRef: "runtime://loop-runs/debugging-loop-s6/sample-set",
        outcome: {
          result: "reinforced",
          rationale: "Six records exist, but no objective metric definition was attached.",
          evidenceRefs: ["audit://debugging-loop-s6/sample-set"],
          comparableCaseCount: 6,
        },
      },
    });

    expect(context.outcome?.showSuccessPercentage).toBe(false);
  });

  it("rejects mismatched declarations and missing source references", () => {
    expect(() => projectPatternContext({
      skillId: "testing",
      selection: loopSelection(),
      selectionRef,
      compatibilityDeclaration: debuggingDeclaration,
      compatibilityRef: debuggingCompatibilityRef,
    })).toThrow("must match the projected skill");

    expect(() => projectPatternContext({
      skillId: "debugging",
      selection: loopSelection(),
      selectionRef: "",
      compatibilityDeclaration: debuggingDeclaration,
      compatibilityRef: debuggingCompatibilityRef,
    })).toThrow("Pattern selection requires a durable source reference");
  });
});
