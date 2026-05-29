export type TaskType = "A" | "B" | "C";
export type Severity = "S1" | "S2" | "S3" | "S4";
export type RiskLevel = "low" | "medium" | "high" | "critical";
export type DecisionAction =
  | "allow"
  | "continue"
  | "review"
  | "fallback"
  | "retry"
  | "block"
  | "ask_human";

export interface TaskBrief {
  id: string;
  title: string;
  problem: string;
  objective: string;
  classification: {
    task_type: TaskType;
    severity: Severity;
    risk: RiskLevel;
  };
  scope: {
    in: string[];
    out: string[];
  };
  constraints?: string[];
  success_criteria: string[];
  validation_plan?: string[];
  human_gate_required?: boolean;
}

export interface ContextSource {
  kind: "doc" | "file" | "memory" | "rule" | "conversation" | "external" | "repo";
  ref: string;
  why_included: string;
  priority: "required" | "recommended" | "optional";
  sensitivity?: "public" | "internal" | "restricted" | "secret";
  mutable?: boolean;
}

export interface ContextPack {
  id: string;
  task_brief_id: string;
  summary: string;
  sources: ContextSource[];
  excluded_context?: string[];
  rules_loaded?: string[];
  budget: {
    strategy: "minimal" | "balanced" | "deep";
    max_tokens: number;
    compaction_required?: boolean;
  };
}

export interface DecisionRecord {
  id: string;
  task_brief_id: string;
  input: {
    signal: string;
    raw?: unknown;
  };
  context_snapshot: {
    summary: string;
    sources_considered: string[];
    omitted_context?: string[];
  };
  interpretation: {
    summary: string;
    key_signals: string[];
    assumptions?: string[];
  };
  decision: {
    action: DecisionAction;
    target?: string;
    next_step?: string;
  };
  justification: {
    reason: string;
    policy_refs?: string[];
  };
  provenance: {
    facts: string[];
    inferences: string[];
    rules_applied: string[];
  };
  metadata: {
    confidence: number;
    risk: RiskLevel;
    trace_id: string;
    created_at: string;
  };
}

export interface ExecutionValidation {
  name: string;
  status: "pass" | "fail" | "warn" | "not_run";
  evidence_ref?: string;
}

export interface ExecutionRecord {
  id: string;
  decision_id: string;
  adapter: {
    name: string;
    mode: "mock" | "local" | "remote";
  };
  target: {
    kind: string;
    ref: string;
  };
  environment: {
    branch: string;
    worktree?: string;
    sandbox: boolean;
  };
  status: "planned" | "running" | "completed" | "failed" | "blocked" | "skipped";
  result_summary?: string;
  validations: ExecutionValidation[];
  timestamps: {
    started_at: string;
    finished_at?: string;
  };
}

export interface HandoffRecord {
  id: string;
  task_brief_id: string;
  origin: {
    actor: string;
    thread: string;
    date: string;
  };
  status: "planned" | "in_progress" | "blocked" | "ready_for_validation" | "done";
  completed: string[];
  pending: string[];
  risks: string[];
  reopen_context: {
    summary: string;
    required_files: string[];
    next_action: string;
  };
  validation_next?: string[];
}

export interface LearningRecord {
  id: string;
  source: {
    type: "session" | "handoff" | "test" | "eval" | "incident" | "review" | "runtime";
    ref: string;
  };
  learning_type:
    | "heuristic"
    | "pattern"
    | "decision"
    | "test_gap"
    | "security"
    | "quality"
    | "process"
    | "bugfix";
  title: string;
  summary: string;
  evidence: string[];
  actionability: {
    apply_to: Array<"playbook" | "checklist" | "policy" | "test" | "skill" | "doc" | "adapter">;
    recommended_change: string;
  };
  review: {
    status: "candidate" | "accepted" | "rejected" | "deferred";
    approved_by?: string;
  };
}

export interface CompiledDecisionInput {
  taskBriefId: string;
  title: string;
  signal: string;
  taskType: TaskType;
  severity: Severity;
  risk: RiskLevel;
  confidenceHint: "low" | "medium" | "high";
  contextSummary: string;
  sourceRefs: string[];
  rulesLoaded: string[];
  hasRequiredContext: boolean;
  requiresHumanGate: boolean;
  docsOnlyHint: boolean;
}

export interface PolicyDecision {
  action: DecisionAction;
  reason: string;
  policyRefs: string[];
  confidence: number;
}

export interface KernelRunInput {
  taskBrief: TaskBrief;
  contextPack: ContextPack;
  signal: string;
  raw?: unknown;
  actor?: string;
  thread?: string;
  branch?: string;
  worktree?: string;
  now?: string;
}

export interface KernelRunResult {
  compiled: CompiledDecisionInput;
  decisionRecord: DecisionRecord;
  executionRecord: ExecutionRecord;
  handoffRecord: HandoffRecord;
  learningRecord: LearningRecord;
  debugText: string;
}

export type GovernanceMode = "strict" | "balanced" | "relaxed";
export type GovernanceHook = "before_execute" | "after_execute" | "before_finalize";
export type GovernanceAction = Extract<DecisionAction, "allow" | "review" | "ask_human" | "block">;
export type FactOperator = "eq" | "neq" | "gt" | "gte" | "lt" | "lte" | "contains" | "in";
export type FactPrimitive = string | number | boolean | null;
export type FactValue = FactPrimitive | FactPrimitive[] | Record<string, unknown>;

export interface GovernanceFacts {
  work_item: {
    behavior_count: number;
    output_defined: boolean;
  };
  analysis: {
    performed: boolean;
  };
  plan: {
    exists: boolean;
  };
  source_of_truth: {
    exists: boolean;
    updated: boolean;
  };
  scope: {
    allowed_files_defined: boolean;
    forbidden_files_defined: boolean;
    operation_type_defined: boolean;
  };
  contracts: {
    io_defined: boolean;
    change_declared: boolean;
  };
  execution: {
    requested: boolean;
    modifies_undeclared_files: boolean;
    expands_scope: boolean;
    changes_contract: boolean;
    deviates_from_plan: boolean;
    exposes_secrets: boolean;
    missing_authoritative_validation: boolean;
    critical_action_without_confirmation: boolean;
    introduces_tight_coupling: boolean;
  };
  validation: {
    performed: boolean;
    spec_alignment_ok: boolean;
    regression_checked: boolean;
  };
}

export interface GovernancePredicate {
  fact: string;
  op: FactOperator;
  value: FactPrimitive | FactPrimitive[];
}

export interface GovernanceRule {
  id: string;
  stage: GovernanceHook;
  description: string;
  enabled: boolean;
  when_all?: GovernancePredicate[];
  when_any?: GovernancePredicate[];
  action_by_mode: Record<GovernanceMode, GovernanceAction>;
}

export interface GovernanceHookDefinition {
  id: GovernanceHook;
  description: string;
}

export interface GovernancePack {
  meta: {
    name: string;
    version: string;
    domain: string;
    status: string;
    default_mode: GovernanceMode;
  };
  vocabulary?: Record<string, string>;
  hooks: GovernanceHookDefinition[];
  facts_model: Record<string, string>;
  rules: GovernanceRule[];
}

export interface PolicyTraceMatch {
  id: string;
  description: string;
  action: GovernanceAction;
  facts_used: string[];
}

export interface PolicyTrace {
  hook: GovernanceHook;
  mode: GovernanceMode;
  evaluated_rules: string[];
  matched_rules: PolicyTraceMatch[];
  final_action: GovernanceAction;
}

export interface ExecutionScope {
  id: string;
  work_item_id: string;
  operation: "create" | "update" | "refactor" | "delete" | "analyze";
  allowed_files: string[];
  forbidden_files: string[];
  notes?: string[];
  contract_change_declared: boolean;
}

export interface PolicyEvaluation {
  id: string;
  work_item_id: string;
  policy_pack: {
    name: string;
    version: string;
  };
  hook: GovernanceHook;
  mode: GovernanceMode;
  final_action: GovernanceAction;
  matched_rules: PolicyTraceMatch[];
  evaluated_rule_ids: string[];
  facts_summary: string[];
  created_at: string;
}

export interface GovernanceHookRunResult {
  hook: GovernanceHook;
  execution_scope?: ExecutionScope;
  policy_trace: PolicyTrace;
  policy_evaluation: PolicyEvaluation;
}

export type KnowledgeSourceType =
  | "compliance_policy"
  | "security_policy"
  | "privacy_policy"
  | "accessibility_guideline"
  | "operating_model"
  | "product_strategy"
  | "proprietary_framework"
  | "design_system"
  | "persona"
  | "research_finding"
  | "benchmark"
  | "stakeholder_input";

export type KnowledgeSensitivity =
  | "public"
  | "internal"
  | "confidential"
  | "restricted"
  | "regulated";

export type KnowledgeAuthorityLevel =
  | "mandatory"
  | "normative"
  | "procedural"
  | "strategic"
  | "interpretive"
  | "evidence_proxy"
  | "evidential"
  | "comparative"
  | "contextual";

export type KnowledgeRetrievalMode =
  | "capsule_first"
  | "excerpt_only"
  | "metadata_only"
  | "full_source_allowed"
  | "human_review_required"
  | "blocked";

export interface KnowledgePackManifest {
  knowledge_pack: {
    id: string;
    name: string;
    type: KnowledgeSourceType;
    owner: string;
    version: string;
    sensitivity: KnowledgeSensitivity;
    authority_level: KnowledgeAuthorityLevel;
    scope: string[];
    allowed_skills?: string[];
    allowed_agents?: string[];
    retrieval_mode: KnowledgeRetrievalMode;
    citation_required: boolean;
    full_text_exposure: "allowed" | "forbidden" | "conditional";
    export_allowed: boolean;
    human_review_required_for: string[];
    expiry: {
      review_cycle: "weekly" | "monthly" | "quarterly" | "yearly";
      expires_on: string | null;
    };
    source_location: string;
    source_integrity_notes: string;
    prerequisite_sources?: string[];
    supersedes?: string[];
    tags?: string[];
  };
}

export type SkillDependencyAcceptedType =
  | KnowledgeSourceType
  | "business_design_framework";

export interface SkillKnowledgeDependencySlot {
  required?: boolean;
  required_when?: string[];
  accepted_types: SkillDependencyAcceptedType[];
  min_authority?: KnowledgeAuthorityLevel;
  preferred_retrieval_mode?: KnowledgeRetrievalMode;
  notes?: string;
}

export interface SkillKnowledgeDependency {
  skill: string;
  version: string;
  knowledge_dependencies: Record<string, SkillKnowledgeDependencySlot>;
  fallback_behavior: {
    missing_required_source:
      | "stop_and_request_source"
      | "continue_in_generic_mode"
      | "abort";
    missing_optional_source: "continue_with_assumption_marker" | "omit_silently";
    restricted_source:
      | "request_authorized_context_pack"
      | "downgrade_to_capsule"
      | "refuse";
    conflicting_sources:
      | "apply_source_precedence_policy"
      | "escalate_to_human_review";
  };
  output_requirements?: {
    cite_satisfying_packs?: boolean;
    cite_unsatisfied_slots?: boolean;
    list_active_restrictions?: boolean;
    list_conflicts_and_resolutions?: boolean;
  };
}
