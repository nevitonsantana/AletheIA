import type {
  ExecutionScope,
  GovernanceFacts,
  GovernancePack,
  PolicyEvaluation,
  PolicyTrace,
} from "./types";

function summarizeFacts(facts: GovernanceFacts): string[] {
  return [
    `analysis.performed=${facts.analysis.performed}`,
    `plan.exists=${facts.plan.exists}`,
    `source_of_truth.exists=${facts.source_of_truth.exists}`,
    `scope.allowed_files_defined=${facts.scope.allowed_files_defined}`,
    `scope.forbidden_files_defined=${facts.scope.forbidden_files_defined}`,
    `contracts.io_defined=${facts.contracts.io_defined}`,
    `execution.requested=${facts.execution.requested}`,
    `validation.performed=${facts.validation.performed}`,
  ];
}

export interface CreateExecutionScopeParams {
  workItemId: string;
  operation: ExecutionScope["operation"];
  allowedFiles: string[];
  forbiddenFiles: string[];
  notes?: string[];
  contractChangeDeclared?: boolean;
}

export function createExecutionScope(params: CreateExecutionScopeParams): ExecutionScope {
  return {
    id: `execution-scope-${params.workItemId}`,
    work_item_id: params.workItemId,
    operation: params.operation,
    allowed_files: params.allowedFiles,
    forbidden_files: params.forbiddenFiles,
    notes: params.notes ?? [],
    contract_change_declared: params.contractChangeDeclared ?? false,
  };
}

export interface CreatePolicyEvaluationParams {
  workItemId: string;
  pack: Pick<GovernancePack, "meta">;
  trace: PolicyTrace;
  facts: GovernanceFacts;
  now?: string;
}

export function createPolicyEvaluation({
  workItemId,
  pack,
  trace,
  facts,
  now,
}: CreatePolicyEvaluationParams): PolicyEvaluation {
  return {
    id: `policy-evaluation-${workItemId}-${trace.hook}`,
    work_item_id: workItemId,
    policy_pack: {
      name: pack.meta.name,
      version: pack.meta.version,
    },
    hook: trace.hook,
    mode: trace.mode,
    final_action: trace.final_action,
    matched_rules: trace.matched_rules,
    evaluated_rule_ids: trace.evaluated_rules,
    facts_summary: summarizeFacts(facts),
    created_at: now ?? new Date().toISOString(),
  };
}
