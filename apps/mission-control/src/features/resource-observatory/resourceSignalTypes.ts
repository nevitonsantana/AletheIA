export type SignalOrigin = "reported" | "estimated" | "unavailable";
export type SignalAvailability = "available" | "unavailable";
export type SignalTone = "evidence" | "review" | "stable" | "neutral";
export type SignalGroupId = "capacity" | "efficiency" | "quality";

export type PatternContext = {
  pattern?: {
    id: string;
    label: string;
    vehicle: "skill_execution" | "subagent_execution" | "tool_sequence" | "human_led_required" | "unavailable";
    description?: string;
  } | null;
  selection?: {
    verdict: "selected" | "not_selected" | "unavailable";
    selectedBy: "aletheia" | "unavailable";
    rationale?: string;
    decisionRef?: string;
  } | null;
  compatibility: {
    status: "compatible" | "incompatible" | "unavailable";
    message?: string;
    declaredBy?: "adaptive_skills" | "project_local_skill_provider" | "runtime_native_skill_provider" | "unavailable";
    skillId?: string;
    skillVersion?: string;
    rationale?: string;
    declarationRef?: string;
  };
  controls?: {
    stopCondition?: string;
    objectiveGate?: string;
    maxIterations?: number;
    currentIterations?: number;
    budget?: {
      timeMinutes?: number;
      tokenBudget?: number;
    };
    requiredControls?: string[];
    presentControls?: string[];
    missingPreconditions?: string[];
    humanReviewBoundary?: string;
  } | null;
  outcome?: {
    result: "reinforced" | "no-change" | "proposal-created" | "escalated" | "unavailable";
    rationale?: string;
    evidenceRefs?: string[];
    proposalRef?: string;
    escalationRef?: string;
    comparableCaseCount?: number;
    showSuccessPercentage?: boolean;
  } | null;
  refs: {
    selectionRef?: string;
    compatibilityRef?: string;
    loopRunRef?: string;
    auditRefs?: string[];
  };
};

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
  patternContext?: PatternContext;
};

export type ResourceSignalGroup = {
  id: SignalGroupId;
  label: string;
};
