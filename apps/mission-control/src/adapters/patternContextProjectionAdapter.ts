import type { PatternContext } from "../features/resource-observatory/resourceSignalTypes";

export type ExecutionPatternSelectionRecord = {
  task_id: string;
  recommended_vehicle: {
    type: "manual_prompt" | "single_agent" | "orchestrated_workflow" | "loop" | "human_led_workflow";
    rationale: string;
  };
  recommended_pattern: {
    type: string;
    rationale: string;
  };
  required_controls: Record<string, boolean>;
  decision: {
    verdict: "approved" | "approved_with_constraints" | "rejected" | "human_led_required";
    notes?: string;
  };
};

export type SkillPatternCompatibilityDeclaration = {
  skill_id: string;
  version: string;
  compatible_patterns: Array<{
    pattern: string;
    conditions: string;
    required_controls: string[];
  }>;
  incompatible_patterns: Array<{
    pattern: string;
    rationale: string;
  }>;
  required_evidence_by_pattern?: Record<string, { evidence: string[] }>;
};

export type LoopRunProjectionRecord = {
  sourceRef: string;
  stopCondition?: string;
  objectiveGate?: string;
  maxIterations?: number;
  currentIterations?: number;
  budget?: {
    timeMinutes?: number;
    tokenBudget?: number;
  };
  presentControls?: string[];
  missingPreconditions?: string[];
  humanReviewBoundary?: string;
  outcome?: {
    result: "reinforced" | "no-change" | "proposal-created" | "escalated";
    rationale: string;
    evidenceRefs: string[];
    proposalRef?: string;
    escalationRef?: string;
    comparableCaseCount: number;
    objectiveSuccessCriteriaRef?: string;
  };
};

type ProjectionInput = {
  skillId: string;
  selection: ExecutionPatternSelectionRecord;
  selectionRef: string;
  compatibilityDeclaration?: SkillPatternCompatibilityDeclaration | null;
  compatibilityRef?: string;
  loopRun?: LoopRunProjectionRecord | null;
};

function requireRef(value: string | undefined, label: string) {
  if (!value?.trim()) throw new Error(`${label} requires a durable source reference`);
  return value;
}

function requiredSelectionControls(controls: Record<string, boolean>) {
  return Object.entries(controls)
    .filter(([, required]) => required)
    .map(([control]) => control);
}

export function projectPatternContext({
  skillId,
  selection,
  selectionRef,
  compatibilityDeclaration,
  compatibilityRef,
  loopRun,
}: ProjectionInput): PatternContext {
  const durableSelectionRef = requireRef(selectionRef, "Pattern selection");
  const patternId = selection.recommended_pattern.type;
  const compatiblePattern = compatibilityDeclaration?.compatible_patterns.find((item) => item.pattern === patternId);
  const incompatiblePattern = compatibilityDeclaration?.incompatible_patterns.find((item) => item.pattern === patternId);

  if (compatibilityDeclaration && compatibilityDeclaration.skill_id !== skillId) {
    throw new Error("Pattern compatibility declaration must match the projected skill");
  }

  let compatibility: PatternContext["compatibility"];
  let durableCompatibilityRef: string | undefined;

  if (!compatibilityDeclaration) {
    compatibility = {
      status: "unavailable",
      message: "loop candidacy not assessed",
      declaredBy: "unavailable",
      skillId,
    };
  } else {
    durableCompatibilityRef = requireRef(compatibilityRef, "Pattern compatibility");
    if (compatiblePattern) {
      compatibility = {
        status: "compatible",
        declaredBy: "adaptive_skills",
        skillId,
        skillVersion: compatibilityDeclaration.version,
        conditions: compatiblePattern.conditions,
        requiredEvidence: compatibilityDeclaration.required_evidence_by_pattern?.[patternId]?.evidence,
        declarationRef: durableCompatibilityRef,
      };
    } else if (incompatiblePattern) {
      compatibility = {
        status: "incompatible",
        declaredBy: "adaptive_skills",
        skillId,
        skillVersion: compatibilityDeclaration.version,
        rationale: incompatiblePattern.rationale,
        declarationRef: durableCompatibilityRef,
      };
    } else {
      compatibility = {
        status: "unavailable",
        message: "loop candidacy not assessed",
        declaredBy: "adaptive_skills",
        skillId,
        skillVersion: compatibilityDeclaration.version,
        declarationRef: durableCompatibilityRef,
      };
    }
  }

  const requiredControls = [
    ...requiredSelectionControls(selection.required_controls),
    ...(compatiblePattern?.required_controls ?? []),
  ].filter((control, index, all) => all.indexOf(control) === index);

  return {
    pattern: {
      id: patternId,
      vehicle: selection.recommended_vehicle.type,
      description: selection.recommended_pattern.rationale,
    },
    selection: {
      verdict: selection.decision.verdict,
      selectedBy: "aletheia",
      rationale: selection.decision.notes ?? selection.recommended_pattern.rationale,
      decisionRef: durableSelectionRef,
    },
    compatibility,
    controls: requiredControls.length || loopRun ? {
      stopCondition: loopRun?.stopCondition,
      objectiveGate: loopRun?.objectiveGate,
      maxIterations: loopRun?.maxIterations,
      currentIterations: loopRun?.currentIterations,
      budget: loopRun?.budget,
      requiredControls,
      presentControls: loopRun?.presentControls,
      missingPreconditions: loopRun?.missingPreconditions,
      humanReviewBoundary: loopRun?.humanReviewBoundary,
    } : null,
    outcome: loopRun?.outcome ? {
      ...loopRun.outcome,
      showSuccessPercentage: loopRun.outcome.comparableCaseCount >= 5 && Boolean(loopRun.outcome.objectiveSuccessCriteriaRef),
    } : null,
    refs: {
      selectionRef: durableSelectionRef,
      compatibilityRef: durableCompatibilityRef,
      loopRunRef: loopRun?.sourceRef,
      auditRefs: loopRun?.outcome?.evidenceRefs,
    },
  };
}
