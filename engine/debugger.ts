import type {
  CompiledDecisionInput,
  DecisionRecord,
  ExecutionRecord,
  HandoffRecord,
  LearningRecord,
  TaskBrief,
} from "./types";

export interface DebugTraceInput {
  taskBrief: TaskBrief;
  compiled: CompiledDecisionInput;
  decisionRecord: DecisionRecord;
  executionRecord: ExecutionRecord;
  handoffRecord: HandoffRecord;
  learningRecord: LearningRecord;
}

export function renderDebugTrace(input: DebugTraceInput): string {
  return [
    "[AletheIA Debug Trace]",
    `task: ${input.taskBrief.title}`,
    `signal: ${input.compiled.signal}`,
    `classification: ${input.compiled.taskType} / ${input.compiled.severity} / ${input.compiled.risk}`,
    `confidence hint: ${input.compiled.confidenceHint}`,
    `context: ${input.compiled.sourceRefs.join(", ")}`,
    `decision: ${input.decisionRecord.decision.action}`,
    `reason: ${input.decisionRecord.justification.reason}`,
    `execution: ${input.executionRecord.status}`,
    `handoff: ${input.handoffRecord.status}`,
    `learning: ${input.learningRecord.title}`,
  ].join("\n");
}
