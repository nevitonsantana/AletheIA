import { evaluateGovernance } from "./governance";
import { createPolicyEvaluation } from "./governance-artifacts";
import type {
  ExecutionScope,
  GovernanceFacts,
  GovernanceHook,
  GovernanceHookRunResult,
  GovernanceMode,
  GovernancePack,
} from "./types";

export interface RunGovernanceHookParams {
  workItemId: string;
  pack: GovernancePack;
  facts: GovernanceFacts;
  hook: GovernanceHook;
  mode?: GovernanceMode;
  executionScope?: ExecutionScope;
  now?: string;
}

export function runGovernanceHook({
  workItemId,
  pack,
  facts,
  hook,
  mode,
  executionScope,
  now,
}: RunGovernanceHookParams): GovernanceHookRunResult {
  const policyTrace = evaluateGovernance({
    pack,
    facts,
    hook,
    mode,
  });

  const policyEvaluation = createPolicyEvaluation({
    workItemId,
    pack,
    trace: policyTrace,
    facts,
    now,
  });

  return {
    hook,
    execution_scope: executionScope,
    policy_trace: policyTrace,
    policy_evaluation: policyEvaluation,
  };
}

export function runBeforeExecuteHook(
  params: Omit<RunGovernanceHookParams, "hook">,
): GovernanceHookRunResult {
  return runGovernanceHook({
    ...params,
    hook: "before_execute",
  });
}

export function runAfterExecuteHook(
  params: Omit<RunGovernanceHookParams, "hook">,
): GovernanceHookRunResult {
  return runGovernanceHook({
    ...params,
    hook: "after_execute",
  });
}

export function runBeforeFinalizeHook(
  params: Omit<RunGovernanceHookParams, "hook">,
) : GovernanceHookRunResult {
  return runGovernanceHook({
    ...params,
    hook: "before_finalize",
  });
}
