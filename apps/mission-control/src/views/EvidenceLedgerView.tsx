import { WorkspaceHeader } from "../components/WorkspaceHeader";

export function EvidenceLedgerView() {
  return (
    <section className="workspace" aria-labelledby="evidence-title">
      <WorkspaceHeader label="Evidence ledger" title="Work slices by review posture" description="A compact operational surface for derived state, supporting sources, and explicit evidence gaps." boundary="Presentation state only · no lifecycle mutation" />
      <section className="route-placeholder" aria-label="Evidence Ledger implementation status">
        <p>Shared shell checkpoint</p>
        <strong id="evidence-title">Evidence records remain in the accepted static reference.</strong>
        <span>Cards, filters, and the evidence inspector enter in the next bounded slice.</span>
      </section>
    </section>
  );
}
