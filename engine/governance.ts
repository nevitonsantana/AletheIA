import type {
  FactPrimitive,
  FactValue,
  GovernanceAction,
  GovernanceFacts,
  GovernanceHook,
  GovernanceMode,
  GovernancePack,
  GovernancePredicate,
  GovernanceRule,
  PolicyTrace,
} from "./types";

const ACTION_PRIORITY: Record<GovernanceAction, number> = {
  allow: 0,
  review: 1,
  ask_human: 2,
  block: 3,
};

function getFactValue(facts: GovernanceFacts, factPath: string): FactValue | undefined {
  return factPath
    .split(".")
    .reduce<FactValue | undefined>((current, segment) => {
      if (current === undefined || current === null) {
        return undefined;
      }

      if (typeof current !== "object" || Array.isArray(current)) {
        return undefined;
      }

      return (current as Record<string, unknown>)[segment] as FactValue | undefined;
    }, facts as unknown as FactValue);
}

function evaluatePredicate(facts: GovernanceFacts, predicate: GovernancePredicate): boolean {
  const current = getFactValue(facts, predicate.fact);

  switch (predicate.op) {
    case "eq":
      return current === predicate.value;
    case "neq":
      return current !== predicate.value;
    case "gt":
      return typeof current === "number" && typeof predicate.value === "number" && current > predicate.value;
    case "gte":
      return typeof current === "number" && typeof predicate.value === "number" && current >= predicate.value;
    case "lt":
      return typeof current === "number" && typeof predicate.value === "number" && current < predicate.value;
    case "lte":
      return typeof current === "number" && typeof predicate.value === "number" && current <= predicate.value;
    case "contains":
      return Array.isArray(current) && current.includes(predicate.value as FactPrimitive);
    case "in":
      return Array.isArray(predicate.value) && predicate.value.includes(current as FactPrimitive);
    default:
      return false;
  }
}

function ruleMatches(facts: GovernanceFacts, rule: GovernanceRule): boolean {
  const allSatisfied =
    !rule.when_all || rule.when_all.every((predicate) => evaluatePredicate(facts, predicate));

  const anySatisfied =
    !rule.when_any || rule.when_any.some((predicate) => evaluatePredicate(facts, predicate));

  return allSatisfied && anySatisfied;
}

function matchedFacts(rule: GovernanceRule): string[] {
  const facts = new Set<string>();

  for (const predicate of rule.when_all ?? []) {
    facts.add(predicate.fact);
  }

  for (const predicate of rule.when_any ?? []) {
    facts.add(predicate.fact);
  }

  return [...facts];
}

function resolveFinalAction(actions: GovernanceAction[]): GovernanceAction {
  if (actions.length === 0) {
    return "allow";
  }

  return actions.reduce<GovernanceAction>((winner, current) =>
    ACTION_PRIORITY[current] > ACTION_PRIORITY[winner] ? current : winner,
  );
}

export interface EvaluateGovernanceParams {
  pack: GovernancePack;
  facts: GovernanceFacts;
  hook: GovernanceHook;
  mode?: GovernanceMode;
}

export function evaluateGovernance({
  pack,
  facts,
  hook,
  mode,
}: EvaluateGovernanceParams): PolicyTrace {
  const resolvedMode = mode ?? pack.meta.default_mode;
  const applicableRules = pack.rules.filter((rule) => rule.enabled && rule.stage === hook);

  const matchedRules = applicableRules
    .filter((rule) => ruleMatches(facts, rule))
    .map((rule) => ({
      id: rule.id,
      description: rule.description,
      action: rule.action_by_mode[resolvedMode],
      facts_used: matchedFacts(rule),
    }));

  return {
    hook,
    mode: resolvedMode,
    evaluated_rules: applicableRules.map((rule) => rule.id),
    matched_rules: matchedRules,
    final_action: resolveFinalAction(matchedRules.map((rule) => rule.action)),
  };
}

export function renderPolicyTrace(trace: PolicyTrace): string {
  const lines = [
    "[AletheIA Policy Trace]",
    `hook: ${trace.hook}`,
    `mode: ${trace.mode}`,
  ];

  if (trace.matched_rules.length === 0) {
    lines.push("matched rules: none");
  } else {
    lines.push("matched rules:");
    for (const rule of trace.matched_rules) {
      lines.push(`- ${rule.id} -> ${rule.action}`);
    }
  }

  lines.push(`final action: ${trace.final_action}`);

  return lines.join("\n");
}
