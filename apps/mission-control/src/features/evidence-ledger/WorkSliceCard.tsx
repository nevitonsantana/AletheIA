import type { EvidenceRecord } from "./evidenceLedgerFixtures";

type WorkSliceCardProps = {
  record: EvidenceRecord;
  selected: boolean;
  onInspect: (record: EvidenceRecord, trigger: HTMLButtonElement) => void;
};

export function WorkSliceCard({ record, selected, onInspect }: WorkSliceCardProps) {
  return (
      <button
        className={`slice-card${selected ? " selected" : ""}`}
        type="button"
        data-tone={record.tone}
        aria-pressed={selected}
        onClick={(event) => onInspect(record, event.currentTarget)}
      >
        <span className="slice-meta"><span>{record.reference}</span><span className={`chip ${record.tone}`}>{record.label}</span></span>
        <strong className="slice-title">{record.title}</strong>
        <span className="slice-copy">{record.cardSummary}</span>
        <span className="slice-footer">
          <span className="source-stack">{record.sourceRefs.map((source) => <span className="source-ref" key={source}>{source}</span>)}</span>
          <span className="card-action">Inspect</span>
        </span>
      </button>
  );
}
