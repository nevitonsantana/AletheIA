import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { NavIcon } from "./NavIcon";

const storageKey = "aletheia-mission-control-nav-expanded";

function readInitialExpandedState() {
  try {
    return window.sessionStorage.getItem(storageKey) === "true";
  } catch {
    return false;
  }
}

export function NavigationRail({ onExpandedChange }: { onExpandedChange: (expanded: boolean) => void }) {
  const [expanded, setExpanded] = useState(readInitialExpandedState);

  useEffect(() => {
    onExpandedChange(expanded);
    try {
      window.sessionStorage.setItem(storageKey, String(expanded));
    } catch {
      // Storage is optional UI convenience; the shell remains usable without it.
    }
  }, [expanded, onExpandedChange]);

  const toggleLabel = expanded ? "Collapse menu" : "Expand menu";

  return (
    <aside className="side-rail" aria-label="Mission Control navigation">
      <div className="rail-top">
        <div className="mark-row">
          <div className="mark" aria-hidden="true">AI</div>
          <div className="rail-brand"><strong>AletheIA</strong><span>Mission Control</span></div>
        </div>
        <button className="nav-toggle" type="button" aria-label={toggleLabel} aria-expanded={expanded} data-tooltip={toggleLabel} onClick={() => setExpanded((current) => !current)}>
          <NavIcon name="toggle" />
          <span className="rail-button-label">{toggleLabel}</span>
        </button>
      </div>

      <nav className="rail-stack" aria-label="Workspace views">
        <NavLink className={({ isActive }) => `rail-button${isActive ? " active" : ""}`} to="/" end aria-label="Evidence ledger" data-tooltip="Evidence ledger">
          <NavIcon name="evidence" /><span className="rail-button-label">Evidence ledger</span>
        </NavLink>
        <NavLink className={({ isActive }) => `rail-button${isActive ? " active" : ""}`} to="/resource-observatory" aria-label="Resource observatory" data-tooltip="Resource observatory">
          <NavIcon name="resource" /><span className="rail-button-label">Resource observatory</span>
        </NavLink>
      </nav>

      <p className="rail-boundary"><span aria-hidden="true">RO</span><span className="rail-button-label">Read-only</span></p>
    </aside>
  );
}
