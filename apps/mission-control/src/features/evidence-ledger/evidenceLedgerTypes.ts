export type EvidenceFilter = "all" | "attention" | "stable" | "unavailable";
export type EvidenceTone = "critical" | "review" | "stable" | "info";
export type EvidenceOrigin = "reported" | "estimated" | "unavailable";
export type EvidenceLaneId = "review" | "validation" | "reconcile" | "closed";

export type EvidenceSource = {
  name: string;
  type: string;
  origin: EvidenceOrigin;
};

export type EvidenceTrace = {
  time: string;
  description: string;
};

export type EvidenceRecord = {
  id: string;
  reference: string;
  laneId: EvidenceLaneId;
  filterStatus: Exclude<EvidenceFilter, "all">;
  tone: EvidenceTone;
  label: string;
  title: string;
  cardSummary: string;
  sourceRefs: string[];
  inspector: {
    kicker: string;
    summary: string;
    lane: string;
    status: string;
    confidence: "Low" | "Medium" | "High" | "Unknown";
    sources: EvidenceSource[];
    trace: EvidenceTrace[];
    boundary: string;
  };
};

export type EvidenceLane = {
  id: EvidenceLaneId;
  label: string;
  tone: EvidenceTone;
  emptyMessage: string;
};
