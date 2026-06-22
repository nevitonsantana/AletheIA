import { useEffect, useRef } from "react";
import type { ResourceSignal } from "./resourceSignalFixtures";

type ResourceSignalInspectorProps = {
  signal: ResourceSignal | null;
  onClose: () => void;
};

export function ResourceSignalInspector({ signal, onClose }: ResourceSignalInspectorProps) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!signal) return;
    closeRef.current?.focus();
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [signal, onClose]);

  return (
    <>
      <button className={`inspector-backdrop${signal ? " open" : ""}`} type="button" aria-label="Close signal inspector" tabIndex={signal ? 0 : -1} onClick={onClose} />
      <aside className={`inspector signal-inspector${signal ? " open" : ""}`} role="dialog" aria-modal="true" aria-labelledby="signal-inspector-title" aria-hidden={!signal}>
        {signal ? (
          <>
            <header className="inspector-header">
              <div className="inspector-title-row">
                <div><p className="inspector-kicker">{signal.kicker}</p><h2 className="inspector-title" id="signal-inspector-title">{signal.label} · {signal.value}</h2></div>
                <button ref={closeRef} className="sheet-close" type="button" aria-label="Close signal inspector" onClick={onClose}>×</button>
              </div>
              <p className="inspector-copy">{signal.note}</p>
            </header>
            <div className="inspector-body">
              <section className="inspector-section">
                <h3>Source record</h3>
                <dl className="signal-detail-list">
                  <div><dt>Reference</dt><dd>{signal.sourceRef}</dd></div>
                  <div><dt>Origin</dt><dd><span className={`source-origin ${signal.origin}`}>{signal.origin}</span></dd></div>
                  <div><dt>Availability</dt><dd>{signal.availability}</dd></div>
                </dl>
              </section>
              <section className="inspector-section">
                <h3>Interpretation</h3>
                <p className="signal-interpretation">{signal.interpretation}</p>
              </section>
              {signal.executionContext?.length ? (
                <section className="inspector-section">
                  <h3>Execution context</h3>
                  <dl className="signal-detail-list">
                    {signal.executionContext.map((detail) => <div key={detail.label}><dt>{detail.label}</dt><dd>{detail.value}</dd></div>)}
                  </dl>
                </section>
              ) : null}
              {signal.evidenceRefs?.length ? (
                <section className="inspector-section">
                  <h3>Evidence refs</h3>
                  <div className="source-list">
                    {signal.evidenceRefs.map((sourceRef) => (
                      <div className="source-item" key={sourceRef}>
                        <span className="source-main"><span className="source-name" title={sourceRef}>{sourceRef}</span><span className="source-type">Execution evidence</span></span>
                        <span className="source-origin reported">reported</span>
                      </div>
                    ))}
                  </div>
                </section>
              ) : null}
              <section className="inspector-section">
                <h3>Boundary</h3>
                <p className="boundary-note">The Resource Observatory displays sourced metadata only. Source records remain authoritative; this interface does not collect, calculate, govern, or execute.</p>
              </section>
            </div>
          </>
        ) : null}
      </aside>
    </>
  );
}
