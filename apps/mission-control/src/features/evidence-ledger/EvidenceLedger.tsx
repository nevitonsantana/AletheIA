import type { EvidenceFilter, EvidenceRecord } from "./evidenceLedgerFixtures";
import { evidenceLanes, evidenceRecords } from "./evidenceLedgerFixtures";
import { WorkSliceCard } from "./WorkSliceCard";

type EvidenceLedgerProps = {
  filter: EvidenceFilter;
  selectedId: string | null;
  onInspect: (record: EvidenceRecord, trigger: HTMLButtonElement) => void;
};

export function EvidenceLedger({ filter, selectedId, onInspect }: EvidenceLedgerProps) {
  const visibleRecords = filter === "all" ? evidenceRecords : evidenceRecords.filter((record) => record.filterStatus === filter);

  return (
    <section className="ledger-shell" aria-label="Work Slice evidence board">
      <div className="ledger-toolbar">
        <div className="ledger-title"><span>Ledger confidence</span><span className="progress-track" aria-hidden="true"><span /></span><span className="utility">42%</span></div>
        <span className="utility">Derived review posture · source records authoritative</span>
      </div>
      <div className="board-scroll">
        <div className="board-grid">
          {evidenceLanes.map((lane) => {
            const records = visibleRecords.filter((record) => record.laneId === lane.id);
            return (
              <section className={`lane${records.length === 0 ? " is-empty" : ""}`} aria-label={`${lane.label} lane`} key={lane.id}>
                <header className="lane-head"><span className="lane-name"><span className={`state-dot ${lane.tone}`} />{lane.label}</span><span className="lane-count">{records.length}</span></header>
                {records.length > 0 ? <div className="slice-list">{records.map((record) => <WorkSliceCard key={record.id} record={record} selected={selectedId === record.id} onInspect={onInspect} />)}</div> : <p className="empty-lane">{lane.emptyMessage}</p>}
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
}
