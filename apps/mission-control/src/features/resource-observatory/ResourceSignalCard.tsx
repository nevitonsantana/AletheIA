import type { ResourceSignal } from "./resourceSignalFixtures";

type ResourceSignalCardProps = {
  signal: ResourceSignal;
  selected: boolean;
  onInspect: (signal: ResourceSignal, trigger: HTMLButtonElement) => void;
};

export function ResourceSignalCard({ signal, selected, onInspect }: ResourceSignalCardProps) {
  return (
    <button
      className={`signal-card tone-${signal.tone}${selected ? " selected" : ""}`}
      type="button"
      aria-label={`Inspect ${signal.label} provenance`}
      aria-pressed={selected}
      onClick={(event) => onInspect(signal, event.currentTarget)}
    >
      <span className="signal-label">{signal.label}</span>
      <strong className={`signal-value ${signal.tone}`}>{signal.value}</strong>
      <span className="signal-note">{signal.note}</span>
      <span className="signal-source-line"><span className={`source-origin ${signal.origin}`}>{signal.origin}</span><span className="source-ref">{signal.sourceRef}</span></span>
    </button>
  );
}
