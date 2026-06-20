import { useCallback, useRef, useState } from "react";
import { WorkspaceHeader } from "../components/WorkspaceHeader";
import { EvidenceInspector } from "../features/evidence-ledger/EvidenceInspector";
import { EvidenceLedger } from "../features/evidence-ledger/EvidenceLedger";
import { evidenceRecords, type EvidenceFilter, type EvidenceRecord } from "../features/evidence-ledger/evidenceLedgerFixtures";

const filters: Array<{ value: EvidenceFilter; label: string }> = [
  { value: "all", label: "All" },
  { value: "attention", label: "Needs attention" },
  { value: "stable", label: "Stable" },
  { value: "unavailable", label: "Unavailable" },
];

export function EvidenceLedgerView() {
  const [filter, setFilter] = useState<EvidenceFilter>("all");
  const [selectedRecord, setSelectedRecord] = useState<EvidenceRecord | null>(null);
  const inspectorTrigger = useRef<HTMLButtonElement | null>(null);

  const closeInspector = useCallback(() => {
    setSelectedRecord(null);
    const trigger = inspectorTrigger.current;
    inspectorTrigger.current = null;
    if (trigger?.isConnected) trigger.focus();
  }, []);

  const inspectRecord = useCallback((record: EvidenceRecord, trigger: HTMLButtonElement) => {
    inspectorTrigger.current = trigger;
    setSelectedRecord(record);
  }, []);

  const changeFilter = (nextFilter: EvidenceFilter) => {
    if (selectedRecord) closeInspector();
    setFilter(nextFilter);
  };

  const visibleCount = filter === "all" ? evidenceRecords.length : evidenceRecords.filter((record) => record.filterStatus === filter).length;
  const activeFilterLabel = filters.find((item) => item.value === filter)?.label ?? "All";

  return (
    <section className="workspace evidence-workspace" aria-label="Evidence Ledger workspace">
      <WorkspaceHeader label="Evidence ledger" title="Work slices by review posture" description="A compact operational surface for derived state, supporting sources, and explicit evidence gaps." boundary="Presentation state only · no lifecycle mutation" />
      <section className="ledger-controls" aria-label="Evidence Ledger filters">
        <div className="filters">
          {filters.map((item) => <button className="filter-button" type="button" aria-pressed={filter === item.value} onClick={() => changeFilter(item.value)} key={item.value}>{item.label}</button>)}
        </div>
        <span className="filter-summary" aria-live="polite">{visibleCount} visible · {activeFilterLabel}</span>
      </section>
      <section className="metrics-row" aria-label="Derived posture summary">
        <div className="metric"><span>Needs review</span><strong className="metric-review">2</strong></div>
        <div className="metric"><span>Critical prompt</span><strong className="metric-critical">1</strong></div>
        <div className="metric"><span>Source gaps</span><strong className="metric-info">3</strong></div>
        <div className="metric"><span>Closed stable</span><strong className="metric-stable">2</strong></div>
      </section>
      <EvidenceLedger filter={filter} selectedId={selectedRecord?.id ?? null} onInspect={inspectRecord} />
      <EvidenceInspector record={selectedRecord} onClose={closeInspector} />
    </section>
  );
}
