import type { GovernanceFacts, LearningRecord, PolicyEvaluation } from "./types";

export interface CreateLearningFromPolicyEvaluationParams {
  workItemId: string;
  policyEvaluation: PolicyEvaluation;
  facts: GovernanceFacts;
  title?: string;
  summary?: string;
  sourceRef?: string;
  approvedBy?: string;
}

function inferLearningType(facts: GovernanceFacts): LearningRecord["learning_type"] {
  if (!facts.validation.performed || !facts.validation.regression_checked) {
    return "test_gap";
  }

  if (!facts.source_of_truth.updated) {
    return "process";
  }

  return "quality";
}

function buildSummary(facts: GovernanceFacts, policyEvaluation: PolicyEvaluation): string {
  if (!facts.validation.performed) {
    return "The task was blocked before finalization because mandatory validation did not happen, so the framework should add or reinforce a validation step before closure.";
  }

  if (!facts.validation.regression_checked) {
    return "The task was blocked because regression coverage was still missing, so the framework should add a repeatable regression check before closure.";
  }

  if (!facts.source_of_truth.updated) {
    return "The task was blocked because the source-of-truth artifact was not updated, so the framework should add a governance checkpoint for documentation alignment.";
  }

  return `The task produced a ${policyEvaluation.final_action} decision that should be captured as a reusable quality learning.`;
}

function buildRecommendedChange(facts: GovernanceFacts): string {
  if (!facts.validation.performed) {
    return "Create or enforce a mandatory validation step before allowing task finalization.";
  }

  if (!facts.validation.regression_checked) {
    return "Add a deterministic regression check to the closure checklist for similar changes.";
  }

  if (!facts.source_of_truth.updated) {
    return "Update the source-of-truth artifact as part of the task closure flow.";
  }

  return "Capture this quality signal in the playbook and closure checklist.";
}

export function createLearningFromPolicyEvaluation({
  workItemId,
  policyEvaluation,
  facts,
  title,
  summary,
  sourceRef,
  approvedBy,
}: CreateLearningFromPolicyEvaluationParams): LearningRecord {
  const learningType = inferLearningType(facts);

  return {
    id: `learning-${workItemId}-${policyEvaluation.hook}`,
    source: {
      type: "review",
      ref: sourceRef ?? policyEvaluation.id,
    },
    learning_type: learningType,
    title: title ?? "Failed validation should become reusable learning",
    summary: summary ?? buildSummary(facts, policyEvaluation),
    evidence: [
      `hook:${policyEvaluation.hook}`,
      `final_action:${policyEvaluation.final_action}`,
      ...policyEvaluation.matched_rules.map((rule) => `rule:${rule.id}`),
      ...policyEvaluation.facts_summary,
    ],
    actionability: {
      apply_to:
        learningType === "test_gap"
          ? ["test", "checklist", "playbook"]
          : learningType === "process"
            ? ["doc", "checklist", "playbook"]
            : ["playbook", "checklist"],
      recommended_change: buildRecommendedChange(facts),
    },
    review: {
      status: "accepted",
      approved_by: approvedBy ?? "framework-designer",
    },
  };
}
