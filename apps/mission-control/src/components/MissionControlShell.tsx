import { useCallback, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { NavigationRail } from "./NavigationRail";

export function MissionControlShell() {
  const [navExpanded, setNavExpanded] = useState(false);
  const location = useLocation();
  const searchLabel = location.pathname === "/resource-observatory"
    ? "Search signals, source refs, traces"
    : "Search work slices, source refs, traces";
  const handleExpandedChange = useCallback((expanded: boolean) => setNavExpanded(expanded), []);

  return (
    <main className={`mission-shell${navExpanded ? " nav-expanded" : ""}`} aria-label="AletheIA Mission Control">
      <NavigationRail onExpandedChange={handleExpandedChange} />
      <section className="app-frame">
        <header className="topbar">
          <div className="product-title"><h1>AletheIA Mission Control</h1><span className="mode-label">Read-only projection</span></div>
          <div className="search-box" aria-label="Search unavailable in shell implementation"><span aria-hidden="true">⌕</span><span>{searchLabel}</span></div>
          <div className="authority"><strong>Source records remain authoritative</strong>Versioned snapshots · synthetic fixtures</div>
        </header>
        <Outlet />
      </section>
    </main>
  );
}
