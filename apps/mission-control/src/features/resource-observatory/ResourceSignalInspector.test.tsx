import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ResourceSignalInspector } from "./ResourceSignalInspector";
import { resourceSignals } from "./resourceSignalFixtures";
import debuggingDeclarationJson from "../../../../../examples/execution-patterns/fixtures/skill-execution-patterns-debugging.json";
import debuggingSelectionJson from "../../../../../examples/execution-patterns/fixtures/execution-pattern-selection-debugging-loop.json";
import {
  projectPatternContext,
  type ExecutionPatternSelectionRecord,
  type SkillPatternCompatibilityDeclaration,
} from "../../adapters/patternContextProjectionAdapter";

const skillSignal = resourceSignals.find((signal) => signal.id === "skill-usage");

if (!skillSignal) throw new Error("Skill usage fixture is required for inspector tests");

describe("ResourceSignalInspector pattern context", () => {
  it("describes missing governed context without inferring a pattern", () => {
    const { patternContext: _patternContext, ...signalWithoutPatternContext } = skillSignal;
    render(<ResourceSignalInspector signal={signalWithoutPatternContext} onClose={vi.fn()} />);

    const inspector = screen.getByRole("dialog");
    expect(within(inspector).getByText("No governed pattern context is available for this skill usage.")).toBeInTheDocument();
    expect(within(inspector).queryByText("loop_until_done")).not.toBeInTheDocument();
  });

  it("keeps a missing objective gate local to loop controls", () => {
    render(
      <ResourceSignalInspector
        signal={{
          ...skillSignal,
          patternContext: {
            ...skillSignal.patternContext!,
            controls: {
              maxIterations: 3,
              currentIterations: 0,
              requiredControls: ["objective_gate", "explicit_budget"],
              missingPreconditions: ["objective_gate"],
              humanReviewBoundary: "human-led review required before continuation",
            },
          },
        }}
        onClose={vi.fn()}
      />,
    );

    const controls = screen.getByRole("heading", { name: "Loop controls" }).closest("section");
    expect(controls).not.toBeNull();
    expect(within(controls!).getByText("Loop cannot be approved:")).toBeInTheDocument();
    expect(within(controls!).getByText(/objective gate missing/)).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /run loop|approve loop/i })).not.toBeInTheDocument();
  });

  it("keeps an unreported iteration count unavailable", () => {
    render(
      <ResourceSignalInspector
        signal={{
          ...skillSignal,
          patternContext: {
            ...skillSignal.patternContext!,
            controls: {
              maxIterations: undefined,
              currentIterations: undefined,
              requiredControls: ["objective_gate", "explicit_budget"],
              missingPreconditions: [],
              humanReviewBoundary: "Merge requires human review.",
            },
          },
        }}
        onClose={vi.fn()}
      />,
    );

    const controls = screen.getByRole("heading", { name: "Loop controls" }).closest("section");
    expect(controls).not.toBeNull();
    expect(within(controls!).getByText("unavailable / unavailable")).toBeInTheDocument();
    expect(within(controls!).queryByText("0 / unavailable")).not.toBeInTheDocument();
  });

  it("renders source-backed compatibility, controls and outcome without adding authority actions", () => {
    const patternContext = projectPatternContext({
      skillId: "debugging",
      selection: debuggingSelectionJson as ExecutionPatternSelectionRecord,
      selectionRef: "examples/execution-patterns/fixtures/execution-pattern-selection-debugging-loop.json",
      compatibilityDeclaration: debuggingDeclarationJson as SkillPatternCompatibilityDeclaration,
      compatibilityRef: "https://github.com/nevitonsantana/adaptive-skills/blob/60de75d/examples/execution-patterns/debugging-patterns.yaml",
      loopRun: {
        sourceRef: "runtime://loop-runs/debugging-loop-s6",
        stopCondition: "Focused test passes.",
        objectiveGate: "pnpm test -- focused-debugging-spec",
        maxIterations: 3,
        currentIterations: 2,
        budget: { timeMinutes: 45, tokenBudget: 12000 },
        presentControls: ["objective_gate_required", "token_budget_required", "human_review_required"],
        missingPreconditions: [],
        humanReviewBoundary: "Merge requires human review.",
        outcome: {
          result: "reinforced",
          rationale: "Objective evidence supported the declared compatibility.",
          evidenceRefs: ["test://debugging-loop-s6/passing-run"],
          comparableCaseCount: 1,
        },
      },
    });

    render(<ResourceSignalInspector signal={{ ...skillSignal, value: "debugging", patternContext }} onClose={vi.fn()} />);

    const inspector = screen.getByRole("dialog");
    expect(within(inspector).getByText("loop_until_done")).toBeInTheDocument();
    expect(within(inspector).getByText("compatible")).toBeInTheDocument();
    expect(within(inspector).getByText(/Only when tests or repro commands/)).toBeInTheDocument();
    expect(within(inspector).getByText("45 min")).toBeInTheDocument();
    expect(within(inspector).getByRole("heading", { name: "Outcome & learning" })).toBeInTheDocument();
    expect(within(inspector).getByText("reinforced")).toBeInTheDocument();
    expect(within(inspector).getByText("hidden")).toBeInTheDocument();
    expect(within(inspector).getAllByText(/execution-pattern-selection-debugging-loop.json/).length).toBeGreaterThan(0);
    expect(within(inspector).getAllByText(/debugging-patterns.yaml/).length).toBeGreaterThan(0);
    expect(within(inspector).queryByRole("button", { name: /run loop|approve loop/i })).not.toBeInTheDocument();
  });
});
