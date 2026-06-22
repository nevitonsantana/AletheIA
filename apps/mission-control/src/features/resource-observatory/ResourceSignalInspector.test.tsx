import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ResourceSignalInspector } from "./ResourceSignalInspector";
import { resourceSignals } from "./resourceSignalFixtures";

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
});
