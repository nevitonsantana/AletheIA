import { compileDecisionInput } from "./compiler";
import { renderDebugTrace } from "./debugger";
import { evaluatePolicy } from "./policy";
import {
  createDecisionRecord,
  executeDecision,
  createHandoffRecord,
  createLearningRecord,
} from "./runtime";
import type { KernelRunInput, KernelRunResult } from "./types";

export function runKernel(input: KernelRunInput): KernelRunResult {
  const compiled = compileDecisionInput({
    taskBrief: input.taskBrief,
    contextPack: input.contextPack,
    signal: input.signal,
  });

  const policyDecision = evaluatePolicy(compiled);

  const decisionRecord = createDecisionRecord(
    input.taskBrief,
    compiled,
    policyDecision,
    input.raw,
    input.now,
  );

  const executionRecord = executeDecision(decisionRecord, {
    branch: input.branch,
    worktree: input.worktree,
    now: input.now,
  });

  const handoffRecord = createHandoffRecord(input.taskBrief, executionRecord, {
    actor: input.actor,
    thread: input.thread,
    now: input.now,
  });

  const learningRecord = createLearningRecord(
    input.taskBrief,
    decisionRecord,
    executionRecord,
  );

  const debugText = renderDebugTrace({
    taskBrief: input.taskBrief,
    compiled,
    decisionRecord,
    executionRecord,
    handoffRecord,
    learningRecord,
  });

  return {
    compiled,
    decisionRecord,
    executionRecord,
    handoffRecord,
    learningRecord,
    debugText,
  };
}
