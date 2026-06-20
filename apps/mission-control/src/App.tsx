import { Navigate, Route, Routes } from "react-router-dom";
import { MissionControlShell } from "./components/MissionControlShell";
import { EvidenceLedgerView } from "./views/EvidenceLedgerView";
import { ResourceObservatoryView } from "./views/ResourceObservatoryView";

export function App() {
  return (
    <Routes>
      <Route element={<MissionControlShell />}>
        <Route index element={<EvidenceLedgerView />} />
        <Route path="resource-observatory" element={<ResourceObservatoryView />} />
      </Route>
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
}
