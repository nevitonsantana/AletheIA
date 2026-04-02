import type { CompiledDecisionInput, ContextPack, TaskBrief } from "./types";

export interface CompileInputParams {
  taskBrief: TaskBrief;
  contextPack: ContextPack;
  signal: string;
}

function hasDocsHint(values: string[]): boolean {
  return values.some((value) => /readme|doc|documentation/i.test(value));
}

function hasRuntimeHint(values: string[]): boolean {
  return values.some((value) => /code|behavior|architecture|runtime|database|migration/i.test(value));
}

function hasLowConfidenceHint(values: string[]): boolean {
  return values.some((value) =>
    /unclear|ambiguous|partial|incomplete|uncertain|hypothesis|draft|estimate|unknown|tentative/i.test(
      value,
    ),
  );
}

export function compileDecisionInput({
  taskBrief,
  contextPack,
  signal,
}: CompileInputParams): CompiledDecisionInput {
  const hasRequiredContext = contextPack.sources.some(
    (source) => source.priority === "required",
  );

  const docsOnlyHint = hasDocsHint(taskBrief.scope.in) && !hasRuntimeHint(taskBrief.scope.in);
  const confidenceHint = hasLowConfidenceHint([
    signal,
    taskBrief.problem,
    taskBrief.objective,
    contextPack.summary,
    ...(taskBrief.constraints ?? []),
    ...(contextPack.excluded_context ?? []),
  ])
    ? "low"
    : docsOnlyHint
      ? "high"
      : "medium";

  const requiresHumanGate =
    taskBrief.human_gate_required === true ||
    taskBrief.classification.severity === "S4" ||
    taskBrief.classification.risk === "critical";

  return {
    taskBriefId: taskBrief.id,
    title: taskBrief.title,
    signal,
    taskType: taskBrief.classification.task_type,
    severity: taskBrief.classification.severity,
    risk: taskBrief.classification.risk,
    confidenceHint,
    contextSummary: contextPack.summary,
    sourceRefs: contextPack.sources.map((source) => source.ref),
    rulesLoaded: contextPack.rules_loaded ?? [],
    hasRequiredContext,
    requiresHumanGate,
    docsOnlyHint,
  };
}
