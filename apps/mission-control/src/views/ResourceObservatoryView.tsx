import { useCallback, useRef, useState } from "react";
import { WorkspaceHeader } from "../components/WorkspaceHeader";
import { ResourceSignalGroup } from "../features/resource-observatory/ResourceSignalGroup";
import { ResourceSignalInspector } from "../features/resource-observatory/ResourceSignalInspector";
import { resourceSignalGroups, resourceSignals, type ResourceSignal } from "../features/resource-observatory/resourceSignalFixtures";

export function ResourceObservatoryView() {
  const [selectedSignal, setSelectedSignal] = useState<ResourceSignal | null>(null);
  const inspectorTrigger = useRef<HTMLButtonElement | null>(null);

  const closeInspector = useCallback(() => {
    setSelectedSignal(null);
    const trigger = inspectorTrigger.current;
    inspectorTrigger.current = null;
    if (trigger?.isConnected) trigger.focus();
  }, []);

  const inspectSignal = useCallback((signal: ResourceSignal, trigger: HTMLButtonElement) => {
    inspectorTrigger.current = trigger;
    setSelectedSignal(signal);
  }, []);

  return (
    <section className="workspace resource-workspace" aria-label="Resource Observatory workspace">
      <WorkspaceHeader label="Resource observatory" title="Operational signals as sourced context" description="Signals remain metadata-first, sourced, and read-only; they do not collect telemetry or authorize decisions." boundary="APOB input only · no collection · no decision authority" />
      <div className="signal-groups" aria-label="Operational signal groups">
        {resourceSignalGroups.map((group) => <ResourceSignalGroup key={group.id} group={group} signals={resourceSignals.filter((signal) => signal.groupId === group.id)} selectedId={selectedSignal?.id ?? null} onInspect={inspectSignal} />)}
      </div>
      <ResourceSignalInspector signal={selectedSignal} onClose={closeInspector} />
    </section>
  );
}
