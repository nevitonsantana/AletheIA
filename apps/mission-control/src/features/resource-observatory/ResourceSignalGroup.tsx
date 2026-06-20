import { ResourceSignalCard } from "./ResourceSignalCard";
import type { ResourceSignal, ResourceSignalGroup as SignalGroup } from "./resourceSignalFixtures";

type ResourceSignalGroupProps = {
  group: SignalGroup;
  signals: ResourceSignal[];
  selectedId: string | null;
  onInspect: (signal: ResourceSignal, trigger: HTMLButtonElement) => void;
};

export function ResourceSignalGroup({ group, signals, selectedId, onInspect }: ResourceSignalGroupProps) {
  const titleId = `signal-group-${group.id}`;
  return (
    <section className="signal-group" aria-labelledby={titleId}>
      <header className="signal-group-header"><h3 id={titleId}>{group.label}</h3><p>{signals.length} sourced signals</p></header>
      <div className="signal-grid">{signals.map((signal) => <ResourceSignalCard key={signal.id} signal={signal} selected={selectedId === signal.id} onInspect={onInspect} />)}</div>
    </section>
  );
}
