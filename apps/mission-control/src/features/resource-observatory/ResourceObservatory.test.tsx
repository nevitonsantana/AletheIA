import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";
import { App } from "../../App";

function renderObservatory() {
  return render(<MemoryRouter initialEntries={["/resource-observatory"]}><App /></MemoryRouter>);
}

describe("Resource Observatory", () => {
  beforeEach(() => window.sessionStorage.clear());

  it("renders nine sourced signals in three presentation groups", () => {
    renderObservatory();
    expect(screen.getByText("Capacity & spend")).toBeInTheDocument();
    expect(screen.getByText("Execution efficiency")).toBeInTheDocument();
    expect(screen.getByText("Quality & orchestration")).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: /provenance/ })).toHaveLength(9);
    expect(screen.getByRole("region", { name: "Observatory interpretation guide" })).toBeInTheDocument();
    expect(screen.getByText("Unavailable is neutral")).toBeInTheDocument();
    expect(screen.getByText(/cannot approve, rank, collect, or remediate/)).toBeInTheDocument();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("keeps the signal inspector positioned as a viewport sidesheet", () => {
    const css = readFileSync(resolve(process.cwd(), "src/styles.css"), "utf8");

    expect(css).toContain(".inspector { position: fixed;");
    expect(css).toContain("right: 0;");
    expect(css).toContain("transform: translateX(100%)");
    expect(css).toContain(".inspector.open { transform: translateX(0); }");
    expect(css).toContain(".resource-workspace > :not(.inspector):not(.inspector-backdrop)");
    expect(css).not.toContain(".resource-workspace > * { position: relative;");
  });

  it("represents unavailable cost telemetry without inventing a value", async () => {
    const user = userEvent.setup();
    renderObservatory();
    await user.click(screen.getByRole("button", { name: "Inspect Token cost provenance" }));
    const inspector = screen.getByRole("dialog", { name: "Token cost · unavailable" });

    expect(within(inspector).getByText("OBS-COST-∅")).toBeInTheDocument();
    expect(within(inspector).getByText(/does not invent or estimate/)).toBeInTheDocument();
    expect(within(inspector).getByText("unavailable", { selector: ".source-origin" })).toBeInTheDocument();
    expect(within(inspector).getByText(/Unavailable is neutral:/)).toBeInTheDocument();
  });

  it("keeps estimated retry context visibly distinct from reported sources", async () => {
    const user = userEvent.setup();
    renderObservatory();
    await user.click(screen.getByRole("button", { name: "Inspect Retry waste provenance" }));
    const inspector = screen.getByRole("dialog", { name: "Retry waste · 6.2%" });

    expect(within(inspector).getByText("estimated", { selector: ".source-origin" })).toBeInTheDocument();
    expect(within(inspector).getByText(/cannot replace a reported source or authorize remediation/)).toBeInTheDocument();
  });

  it("closes with Escape and returns focus without granting skill authority", async () => {
    const user = userEvent.setup();
    renderObservatory();
    const trigger = screen.getByRole("button", { name: "Inspect Skill usage provenance" });
    await user.click(trigger);
    const inspector = screen.getByRole("dialog", { name: "Skill usage · feature-planning" });

    expect(within(inspector).getByText("as-exec-2026-06-22-mission-control-001")).toBeInTheDocument();
    expect(within(inspector).getByText(/AletheIA retains gate and decision authority/)).toBeInTheDocument();
    expect(within(inspector).getByText("workflow/extended")).toBeInTheDocument();
    expect(within(inspector).getByText(/dependencies-map, risk-review/)).toBeInTheDocument();
    expect(within(inspector).getByText("required")).toBeInTheDocument();
    expect(within(inspector).getByText("https://github.com/nevitonsantana/AletheIA/pull/248")).toBeInTheDocument();
    expect(within(inspector).getByRole("heading", { name: "Pattern selection" })).toBeInTheDocument();
    expect(within(inspector).getByText(/No source-backed execution pattern selection record/)).toBeInTheDocument();
    expect(within(inspector).getByRole("heading", { name: "Skill compatibility" })).toBeInTheDocument();
    expect(within(inspector).getByText(/loop candidacy not assessed/)).toBeInTheDocument();
    expect(within(inspector).queryByText("compatible", { exact: true })).not.toBeInTheDocument();
    expect(within(inspector).getByRole("button", { name: "Close signal inspector" })).toHaveFocus();
    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
});
