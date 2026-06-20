import { WorkspaceHeader } from "../components/WorkspaceHeader";

export function ResourceObservatoryView() {
  return (
    <section className="workspace" aria-labelledby="resource-title">
      <WorkspaceHeader label="Resource observatory" title="Operational signals as sourced context" description="Signals remain metadata-first, sourced, and read-only; they do not collect telemetry or authorize decisions." boundary="APOB input only · no collection · no decision authority" />
      <section className="route-placeholder" aria-label="Resource Observatory implementation status">
        <p>Shared shell checkpoint</p>
        <strong id="resource-title">Operational signals remain in the accepted static reference.</strong>
        <span>Signal groups, provenance, and the inspector enter in a later bounded slice.</span>
      </section>
    </section>
  );
}
