import type { CompiledDecisionInput, PolicyDecision } from "./types";

export function evaluatePolicy(input: CompiledDecisionInput): PolicyDecision {
  if (!input.hasRequiredContext) {
    return {
      action: "block",
      reason: "Missing required context for safe execution.",
      policyRefs: ["required-context"],
      confidence: 0.2,
    };
  }

  if (input.requiresHumanGate) {
    return {
      action: "ask_human",
      reason: "Human gate is required by task severity or critical risk.",
      policyRefs: ["human-gate-required"],
      confidence: 0.55,
    };
  }

  if (input.confidenceHint === "low") {
    return {
      action: "review",
      reason: "Low-confidence interpretation should be reviewed before execution.",
      policyRefs: ["low-confidence-review"],
      confidence: 0.45,
    };
  }

  if (input.risk === "high") {
    return {
      action: "review",
      reason: "High-risk tasks must be reviewed before execution.",
      policyRefs: ["high-risk-review"],
      confidence: 0.7,
    };
  }

  if (input.taskType === "C" || input.severity === "S3") {
    return {
      action: "review",
      reason: "Structural tasks require a stricter validation path.",
      policyRefs: ["structural-task-review"],
      confidence: 0.72,
    };
  }

  if (input.taskType === "A" && input.risk === "low" && input.docsOnlyHint) {
    return {
      action: "allow",
      reason: "Low-risk local documentation change can follow the lightweight path.",
      policyRefs: ["lightweight-docs-flow", "quality-over-speed"],
      confidence: 0.95,
    };
  }

  if (input.risk === "medium" || input.taskType === "B") {
    return {
      action: "review",
      reason: "Cross-front or medium-risk work should be reviewed before proceeding.",
      policyRefs: ["cross-front-review"],
      confidence: 0.78,
    };
  }

  return {
    action: "continue",
    reason: "The task may proceed with standard validation.",
    policyRefs: ["standard-validation-path"],
    confidence: 0.85,
  };
}
