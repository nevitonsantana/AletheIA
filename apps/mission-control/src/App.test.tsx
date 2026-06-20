import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";
import { App } from "./App";

function renderApp(initialPath = "/") {
  return render(<MemoryRouter initialEntries={[initialPath]}><App /></MemoryRouter>);
}

describe("Mission Control shared shell", () => {
  beforeEach(() => window.sessionStorage.clear());

  it("renders Evidence Ledger inside the read-only shared shell", () => {
    renderApp();
    expect(screen.getByRole("main", { name: "AletheIA Mission Control" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "AletheIA Mission Control" })).toBeInTheDocument();
    expect(screen.getByText("Work slices by review posture")).toBeInTheDocument();
    expect(screen.getByText("Source records remain authoritative")).toBeInTheDocument();
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("navigates to Resource Observatory without replacing the shell", async () => {
    const user = userEvent.setup();
    renderApp();
    const shell = screen.getByRole("main", { name: "AletheIA Mission Control" });
    await user.click(screen.getByRole("link", { name: "Resource observatory" }));
    expect(screen.getByText("Operational signals as sourced context")).toBeInTheDocument();
    expect(screen.getByRole("main", { name: "AletheIA Mission Control" })).toBe(shell);
  });

  it("persists expanded navigation across route changes", async () => {
    const user = userEvent.setup();
    const { unmount } = renderApp();
    const toggle = screen.getByRole("button", { name: "Expand menu" });
    await user.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(window.sessionStorage.getItem("aletheia-mission-control-nav-expanded")).toBe("true");
    await user.click(screen.getByRole("link", { name: "Resource observatory" }));
    expect(screen.getByRole("button", { name: "Collapse menu" })).toHaveAttribute("aria-expanded", "true");

    unmount();
    renderApp("/resource-observatory");
    expect(screen.getByRole("button", { name: "Collapse menu" })).toHaveAttribute("aria-expanded", "true");
  });

  it("keeps collapsed destinations labelled and keyboard operable", async () => {
    const user = userEvent.setup();
    renderApp();
    expect(screen.getByRole("link", { name: "Evidence ledger" })).toHaveAttribute("data-tooltip", "Evidence ledger");
    expect(screen.getByRole("link", { name: "Resource observatory" })).toHaveAttribute("data-tooltip", "Resource observatory");
    await user.tab();
    expect(screen.getByRole("button", { name: "Expand menu" })).toHaveFocus();
    await user.keyboard("{Enter}");
    expect(screen.getByRole("button", { name: "Collapse menu" })).toHaveAttribute("aria-expanded", "true");
  });
});
