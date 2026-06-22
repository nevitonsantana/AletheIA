export type SignalOrigin = "reported" | "estimated" | "unavailable";
export type SignalAvailability = "available" | "unavailable";
export type SignalTone = "evidence" | "review" | "stable" | "neutral";
export type SignalGroupId = "capacity" | "efficiency" | "quality";

export type ResourceSignal = {
  id: string;
  groupId: SignalGroupId;
  label: string;
  value: string;
  note: string;
  sourceRef: string;
  origin: SignalOrigin;
  availability: SignalAvailability;
  tone: SignalTone;
  kicker: string;
  interpretation: string;
  executionContext?: Array<{
    label: string;
    value: string;
  }>;
  evidenceRefs?: string[];
};

export type ResourceSignalGroup = {
  id: SignalGroupId;
  label: string;
};
