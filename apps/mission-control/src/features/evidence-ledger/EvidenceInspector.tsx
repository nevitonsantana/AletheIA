import { useEffect, useRef } from "react";
import type { EvidenceRecord } from "./evidenceLedgerFixtures";

type EvidenceInspectorProps = {
  record: EvidenceRecord | null;
  onClose: () => void;
};

export function EvidenceInspector({ record, onClose }: EvidenceInspectorProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!record) return;
    closeRef.current?.focus();
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [record, onClose]);

  return (
    <>
      <button className={`inspector-backdrop${record ? " open" : ""}`} type="button" aria-label="Close evidence inspector" tabIndex={record ? 0 : -1} onClick={onClose} />
      <aside className={`inspector${record ? " open" : ""}`} role="dialog" aria-modal="true" aria-labelledby="inspector-title" aria-hidden={!record}>
        {record ? (
          <>
            <header className="inspector-header">
              <div className="inspector-title-row">
                <div><p className="inspector-kicker">{record.inspector.kicker}</p><h2 className="inspector-title" id="inspector-title">{record.title}</h2></div>
                <button ref={closeRef} className="sheet-close" type="button" aria-label="Close evidence inspector" onClick={onClose}>×</button>
              </div>
              <p className="inspector-copy">{record.inspector.summary}</p>
            </header>
            <div className="inspector-body">
              <section className="inspector-section is-primary">
                <h3>Source refs</h3>
                <div className="source-list">
                  {record.inspector.sources.map((source) => (
                    <div className="source-item" key={`${source.name}-${source.type}`}>
                      <span className="source-main"><span className="source-name">{source.name}</span><span className="source-type">{source.type}</span></span>
                      <span className={`source-origin ${source.origin}`}>{source.origin}</span>
                    </div>
                  ))}
                </div>
                <p className="source-ledger-note">References identify where the posture came from; origin labels describe availability, not authority.</p>
              </section>
              <section className="inspector-section is-state">
                <h3>State posture</h3>
                <div className="state-summary">
                  <div className="state-cell"><span>Lane</span><strong>{record.inspector.lane}</strong></div>
                  <div className="state-cell"><span>Status</span><strong>{record.inspector.status}</strong></div>
                  <div className="state-cell"><span>Confidence</span><strong>{record.inspector.confidence}</strong></div>
                </div>
              </section>
              <section className="inspector-section">
                <h3>Trace context</h3>
                <div className="trace-list">
                  {record.inspector.trace.map((trace) => <div className="trace-item" key={`${trace.time}-${trace.description}`}><span className="trace-time">{trace.time}</span><span>{trace.description}</span></div>)}
                </div>
              </section>
              <section className="inspector-section">
                <h3>Boundary</h3>
                <p className="boundary-note">{record.inspector.boundary}</p>
              </section>
            </div>
          </>
        ) : null}
      </aside>
    </>
  );
}
