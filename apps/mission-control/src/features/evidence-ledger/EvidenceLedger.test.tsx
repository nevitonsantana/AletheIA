import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it } from "vitest";
import { App } from "../../App";

function renderLedger() {
  return render(<MemoryRouter initialEntries={["/"]}><App /></MemoryRouter>);
}

describe("Evidence Ledger", () => {
  beforeEach(() => window.sessionStorage.clear());

  it("renders seven source-backed fixture cards across derived lanes", () => {
    renderLedger();
    expect(screen.getByText("7 visible · All")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Critical risk signal/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Resolve missing telemetry/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Dogfood evidence record/ })).toBeInTheDocument();
    expect(screen.getByLabelText("Review prompts lane")).toBeInTheDocument();
    expect(screen.getByLabelText("Closed stable lane")).toBeInTheDocument();
  });

  it("filters presentation records without mutating lane authority", async () => {
    const user = userEvent.setup();
    renderLedger();

    await user.click(screen.getByRole("button", { name: "Needs attention" }));
    expect(screen.getByText("2 visible · Needs attention")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Critical risk signal/ })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /Policy update impact check/ })).not.toBeInTheDocument();
    expect(screen.getByText("No closed slices match this filter. Filtering does not reopen or mutate work.")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Unavailable" }));
    expect(screen.getByText("1 visible · Unavailable")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Resolve missing telemetry/ })).toBeInTheDocument();
  });

  it("opens sourced detail, closes with Escape, and returns focus to its card", async () => {
    const user = userEvent.setup();
    renderLedger();
    const trigger = screen.getByRole("button", { name: /Critical risk signal/ });

    await user.click(trigger);
    const inspector = screen.getByRole("dialog", { name: "Critical risk signal" });
    const closeButton = within(inspector).getByRole("button", { name: "Close evidence inspector" });
    expect(closeButton).toHaveFocus();
    expect(within(inspector).getByText("SRC-2147")).toBeInTheDocument();
    expect(within(inspector).getByText(/does not authorize decisions/)).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("keeps unavailable provenance neutral and does not invent estimates", async () => {
    const user = userEvent.setup();
    renderLedger();
    await user.click(screen.getByRole("button", { name: /Resolve missing telemetry/ }));
    const inspector = screen.getByRole("dialog", { name: "Resolve missing telemetry" });

    expect(within(inspector).getByText("Telemetry unavailable")).toBeInTheDocument();
    expect(within(inspector).getByText("Unknown")).toBeInTheDocument();
    expect(within(inspector).getByText("unavailable", { selector: ".source-origin" })).toBeInTheDocument();
    expect(within(inspector).getByText(/No estimates generated/)).toBeInTheDocument();
  });
});
