import type {
  CompiledDecisionInput,
  DecisionRecord,
  ExecutionRecord,
  HandoffRecord,
  KernelRunInput,
  LearningRecord,
  PolicyDecision,
  TaskBrief,
} from "./types";

function makeTimestamp(now?: string): string {
  return now ?? new Date().toISOString();
}

function buildTraceId(taskBriefId: string): string {
  return `trace-${taskBriefId}`;
}

export function createDecisionRecord(
  taskBrief: TaskBrief,
  compiled: CompiledDecisionInput,
  policyDecision: PolicyDecision,
  raw?: unknown,
  now?: string,
): DecisionRecord {
  const createdAt = makeTimestamp(now);

  return {
    id: `decision-${taskBrief.id}`,
    task_brief_id: taskBrief.id,
    input: {
      signal: compiled.signal,
      raw,
    },
    context_snapshot: {
      summary: compiled.contextSummary,
      sources_considered: compiled.sourceRefs,
      omitted_context: [],
    },
    interpretation: {
      summary:
        compiled.confidenceHint === "low"
          ? "This task is partially framed and needs review because the current interpretation confidence is low."
          : compiled.docsOnlyHint
            ? "This is a small, low-risk documentation task."
            : "This task requires a structured decision before execution.",
      key_signals: [
        `task_type:${compiled.taskType}`,
        `severity:${compiled.severity}`,
        `risk:${compiled.risk}`,
      ],
      assumptions:
        compiled.confidenceHint === "low"
          ? ["Available inputs are useful but still ambiguous for direct execution."]
          : compiled.docsOnlyHint
            ? ["Requester wants clarity, not behavioral change."]
            : ["Available context is sufficient for a first deterministic pass."],
    },
    decision: {
      action: policyDecision.action,
      target: taskBrief.title,
      next_step:
        policyDecision.action === "allow" || policyDecision.action === "continue"
          ? "Execute the change with proportional validation."
          : "Stop and route through review or human gate.",
    },
    justification: {
      reason: policyDecision.reason,
      policy_refs: policyDecision.policyRefs,
    },
    provenance: {
      facts: [
        `Signal: ${compiled.signal}`,
        `Sources considered: ${compiled.sourceRefs.join(", ")}`,
      ],
      inferences: [
        compiled.confidenceHint === "low"
          ? "The task remains ambiguous enough to require review before execution."
          : compiled.docsOnlyHint
            ? "The task behaves like a lightweight docs-only change."
            : "The task requires standard structured handling.",
      ],
      rules_applied: policyDecision.policyRefs,
    },
    metadata: {
      confidence: policyDecision.confidence,
      risk: compiled.risk,
      trace_id: buildTraceId(taskBrief.id),
      created_at: createdAt,
    },
  };
}

export function executeDecision(
  decisionRecord: DecisionRecord,
  input: Pick<KernelRunInput, "branch" | "worktree" | "now">,
): ExecutionRecord {
  const startedAt = makeTimestamp(input.now);
  const isExecutable =
    decisionRecord.decision.action === "allow" || decisionRecord.decision.action === "continue";

  return {
    id: `execution-${decisionRecord.id}`,
    decision_id: decisionRecord.id,
    adapter: {
      name: "aletheia-mock-runtime",
      mode: "mock",
    },
    target: {
      kind: "task",
      ref: decisionRecord.decision.target ?? decisionRecord.task_brief_id,
    },
    environment: {
      branch: input.branch ?? "codex/aletheia-hello-world",
      worktree: input.worktree ?? "aletheia-kernel",
      sandbox: true,
    },
    status: isExecutable ? "completed" : "blocked",
    result_summary: isExecutable
      ? "Mock execution completed successfully."
      : "Execution blocked by policy before mutation.",
    validations: isExecutable
      ? [
          {
            name: "policy-check",
            status: "pass",
            evidence_ref: "decision approved by deterministic policy",
          },
          {
            name: "mock-runtime-check",
            status: "pass",
            evidence_ref: "runtime returned deterministic completion",
          },
        ]
      : [
          {
            name: "policy-check",
            status: "warn",
            evidence_ref: "execution stopped before mutation",
          },
        ],
    timestamps: {
      started_at: startedAt,
      finished_at: startedAt,
    },
  };
}

export function createHandoffRecord(
  taskBrief: TaskBrief,
  executionRecord: ExecutionRecord,
  input: Pick<KernelRunInput, "actor" | "thread" | "now">,
): HandoffRecord {
  const done = executionRecord.status === "completed";

  return {
    id: `handoff-${taskBrief.id}`,
    task_brief_id: taskBrief.id,
    origin: {
      actor: input.actor ?? "codex",
      thread: input.thread ?? "aletheia-kernel-thread",
      date: makeTimestamp(input.now),
    },
    status: done ? "done" : "ready_for_validation",
    completed: [
      "Task was framed with a Task Brief.",
      "Context was constrained by a Context Pack.",
      "Decision was recorded before execution.",
    ],
    pending: done
      ? ["Reuse the same kernel path for the next scenario."]
      : ["Escalate through review or human gate before proceeding."],
    risks: done
      ? ["Future examples should remain provider-agnostic."]
      : ["The task is blocked until additional review happens."],
    reopen_context: {
      summary: "This record shows the smallest deterministic AletheIA kernel path.",
      required_files: [
        "docs/architecture/aletheia-core-contracts.md",
        "docs/architecture/aletheia-decision-kernel.md",
      ],
      next_action: done
        ? "Create the next scenario with stricter policy conditions."
        : "Review the blocked decision and decide whether to proceed.",
    },
    validation_next: done
      ? ["Inspect generated records for clarity."]
      : ["Confirm the appropriate review path."],
  };
}

export function createLearningRecord(
  taskBrief: TaskBrief,
  decisionRecord: DecisionRecord,
  executionRecord: ExecutionRecord,
): LearningRecord {
  return {
    id: `learning-${taskBrief.id}`,
    source: {
      type: "runtime",
      ref: executionRecord.id,
    },
    learning_type: "pattern",
    title: "A small deterministic kernel is enough to prove the framework loop",
    summary:
      executionRecord.status === "completed"
        ? "The contracts and kernel are already sufficient to explain a small low-risk task from start to learning."
        : "The kernel can stop unsafe work before execution and still generate useful records.",
    evidence: [
      `Decision action: ${decisionRecord.decision.action}`,
      `Execution status: ${executionRecord.status}`,
      `Trace id: ${decisionRecord.metadata.trace_id}`,
    ],
    actionability: {
      apply_to: ["doc", "test", "playbook"],
      recommended_change:
        "Keep the deterministic kernel small and use it as the reference path for future scenarios and tests.",
    },
    review: {
      status: "accepted",
      approved_by: "framework-designer",
    },
  };
}
