import type { KnowledgeRegistry } from "./registry";
import type {
  KnowledgePackManifest,
  KnowledgeSensitivity,
  KnowledgeAuthorityLevel,
  KnowledgeRetrievalMode,
  SkillKnowledgeDependency,
  SkillKnowledgeDependencySlot,
} from "./types";

/**
 * Knowledge Governance Layer — resolver (build step 3).
 *
 * Implements the selection logic and refusal conditions from
 * docs/concepts/knowledge-resolver.md, and applies the tiers from
 * docs/contracts/source-precedence-policy.md when sources conflict.
 *
 * The resolver is a pure, deterministic function. It does not retrieve source
 * content, judge factual correctness, or perform human review. Semantic
 * *detection* of a disagreement is the job of the knowledge-conflict-resolution
 * skill at runtime; the resolver mechanically *resolves* declared conflicts via
 * precedence and escalates when precedence cannot settle them.
 *
 * Out of scope (per the implementation-prep brief): vector DB, IAM, DLP, UI,
 * embeddings, network, crypto.
 */

// ---------------------------------------------------------------------------
// Public types
// ---------------------------------------------------------------------------

export type RetrievedScope = "capsule" | "excerpt" | "metadata" | "full" | "pending_review";

export interface ResolverTask {
  id: string;
  /** Task scope tags; a pack is eligible when its `scope` intersects these. */
  scope?: string[];
  /** Triggers used to evaluate a slot's `required_when` (defaults to `scope`). */
  triggers?: string[];
  /** Sensitivity ceiling granted to this task/agent. */
  maxSensitivity?: KnowledgeSensitivity;
  /** Agent id, matched against each pack's `allowed_agents`. */
  agentId?: string;
  /** Task conditions matched against each pack's `human_review_required_for`. */
  humanReviewConditions?: string[];
}

export interface DeclaredConflict {
  /** Two dependency-slot keys whose selected sources disagree. */
  between: [string, string];
  topic: string;
  conflictId?: string;
}

export interface ResolverOptions {
  declaredConflicts?: DeclaredConflict[];
}

export interface SatisfiedBy {
  source_id: string;
  source_version: string;
  retrieved_scope: RetrievedScope;
  retrieval_mode_applied: KnowledgeRetrievalMode;
}

export interface SlotResolution {
  required: boolean;
  required_when_matched?: boolean;
  satisfied_by: SatisfiedBy | null;
  fallback_applied?: string;
  candidates_considered: number;
}

export interface ConflictResolution {
  conflict_id?: string;
  between: [string, string];
  topic: string;
  resolved_by: "source_precedence_policy" | "escalation";
  prevailing_source: string | null;
  suppressed_sources: string[];
  human_review_required: boolean;
  human_review_reason?: string;
}

export interface AuditEntry {
  source_id: string;
  source_version: string;
  retrieved_scope: RetrievedScope;
  sensitivity: KnowledgeSensitivity;
  authority_level: KnowledgeAuthorityLevel;
}

export interface RefusalNote {
  slot: string;
  reason: "required_source_missing" | "restricted_not_authorized";
  fallback: string;
}

export interface ResolverResult {
  task_id: string;
  skill: string;
  skill_version: string;
  status: "resolved" | "refused";
  knowledge_dependencies_resolution: Record<string, SlotResolution>;
  restrictions_active: string[];
  conflicts_detected: ConflictResolution[];
  gaps: string[];
  human_review: { required: boolean; reasons: string[] };
  refusals: RefusalNote[];
  audit_log_entries_to_write: AuditEntry[];
}

// ---------------------------------------------------------------------------
// Precedence (source-precedence-policy.md)
// ---------------------------------------------------------------------------

const AUTHORITY_RANK: Record<KnowledgeAuthorityLevel, number> = {
  mandatory: 8,
  normative: 7,
  procedural: 6,
  strategic: 5,
  interpretive: 4,
  evidence_proxy: 3,
  evidential: 2,
  comparative: 1,
  contextual: 0,
};

const SENSITIVITY_RANK: Record<KnowledgeSensitivity, number> = {
  public: 0,
  internal: 1,
  confidential: 2,
  restricted: 3,
  regulated: 4,
};

/** Lower number = higher precedence. */
export function precedenceTier(pack: KnowledgePackManifest): number {
  const kp = pack.knowledge_pack;
  switch (kp.type) {
    case "compliance_policy":
    case "security_policy":
    case "privacy_policy":
      return 1;
    case "accessibility_guideline":
      return kp.authority_level === "normative" || kp.authority_level === "mandatory" ? 1 : 5;
    case "operating_model":
      return kp.authority_level === "mandatory" ? 2 : 3;
    case "product_strategy":
      return 4;
    case "proprietary_framework":
    case "design_system":
      return 5;
    case "persona":
    case "research_finding":
      return 6;
    case "benchmark":
      return 7;
    case "stakeholder_input":
      return 8;
    default:
      return 9;
  }
}

function parseSemver(v: string): [number, number, number] {
  const parts = v.split(".").map((n) => Number.parseInt(n, 10));
  return [parts[0] || 0, parts[1] || 0, parts[2] || 0];
}

/** >0 if a is newer than b. */
function compareSemver(a: string, b: string): number {
  const [aMaj, aMin, aPat] = parseSemver(a);
  const [bMaj, bMin, bPat] = parseSemver(b);
  return aMaj - bMaj || aMin - bMin || aPat - bPat;
}

/**
 * Rank two candidates for the SAME dependency slot. Negative => a is preferred.
 * Tie-break order (source-precedence-policy.md): tier → authority → scope
 * specificity → version recency → supersedes.
 */
export function compareCandidates(a: KnowledgePackManifest, b: KnowledgePackManifest): number {
  const tier = precedenceTier(a) - precedenceTier(b);
  if (tier !== 0) return tier;

  const authority = AUTHORITY_RANK[b.knowledge_pack.authority_level] - AUTHORITY_RANK[a.knowledge_pack.authority_level];
  if (authority !== 0) return authority;

  const specificity = a.knowledge_pack.scope.length - b.knowledge_pack.scope.length;
  if (specificity !== 0) return specificity;

  const recency = compareSemver(b.knowledge_pack.version, a.knowledge_pack.version);
  if (recency !== 0) return recency;

  if (a.knowledge_pack.supersedes?.includes(b.knowledge_pack.id)) return -1;
  if (b.knowledge_pack.supersedes?.includes(a.knowledge_pack.id)) return 1;

  return 0;
}

function ref(pack: KnowledgePackManifest): string {
  return `${pack.knowledge_pack.id}@${pack.knowledge_pack.version}`;
}

/**
 * Resolve a conflict between two sources via precedence. Escalates to human
 * review when both are `mandatory`, or when precedence and tie-breakers cannot
 * settle which source prevails.
 */
export function resolveByPrecedence(
  a: KnowledgePackManifest,
  b: KnowledgePackManifest,
  topic: string,
  conflictId?: string,
): ConflictResolution {
  const cmp = compareCandidates(a, b);
  const bothMandatory =
    a.knowledge_pack.authority_level === "mandatory" &&
    b.knowledge_pack.authority_level === "mandatory";

  if (bothMandatory || cmp === 0) {
    return {
      conflict_id: conflictId,
      between: [ref(a), ref(b)],
      topic,
      resolved_by: "escalation",
      prevailing_source: null,
      suppressed_sources: [],
      human_review_required: true,
      human_review_reason: bothMandatory
        ? "mandatory-vs-mandatory conflict cannot be auto-resolved"
        : "precedence tie could not be broken",
    };
  }

  const prevailing = cmp < 0 ? a : b;
  const suppressed = cmp < 0 ? b : a;
  return {
    conflict_id: conflictId,
    between: [ref(a), ref(b)],
    topic,
    resolved_by: "source_precedence_policy",
    prevailing_source: ref(prevailing),
    suppressed_sources: [ref(suppressed)],
    human_review_required: false,
  };
}

// ---------------------------------------------------------------------------
// Retrieval scope
// ---------------------------------------------------------------------------

const SCOPE_BY_MODE: Record<KnowledgeRetrievalMode, RetrievedScope | null> = {
  capsule_first: "capsule",
  excerpt_only: "excerpt",
  metadata_only: "metadata",
  full_source_allowed: "full",
  human_review_required: "pending_review",
  blocked: null,
};

/** Exposure ranking (higher = more content revealed). */
const EXPOSURE_RANK: Record<KnowledgeRetrievalMode, number> = {
  metadata_only: 0,
  capsule_first: 1,
  excerpt_only: 2,
  full_source_allowed: 3,
  human_review_required: -1,
  blocked: -2,
};

/**
 * The applied mode is the more restrictive (lower exposure) of the pack default
 * and the slot's preferred mode — a slot may tighten exposure, never loosen it.
 * `human_review_required` and `blocked` are gates, not scopes, and are never
 * overridden by a preference.
 */
function applyRetrievalMode(
  packMode: KnowledgeRetrievalMode,
  preferred?: KnowledgeRetrievalMode,
): KnowledgeRetrievalMode {
  if (packMode === "human_review_required" || packMode === "blocked") return packMode;
  if (!preferred || preferred === "human_review_required" || preferred === "blocked") return packMode;
  return EXPOSURE_RANK[preferred] < EXPOSURE_RANK[packMode] ? preferred : packMode;
}

// ---------------------------------------------------------------------------
// Resolver
// ---------------------------------------------------------------------------

function isRequired(slot: SkillKnowledgeDependencySlot, triggers: string[]): {
  required: boolean;
  requiredWhenMatched?: boolean;
} {
  if (slot.required) return { required: true };
  if (slot.required_when && slot.required_when.length > 0) {
    const matched = slot.required_when.some((t) => triggers.includes(t));
    return { required: matched, requiredWhenMatched: matched };
  }
  return { required: false };
}

/**
 * Resolve the knowledge dependencies of a skill against a registry for a task.
 *
 * Returns a knowledge-aware context pack (see
 * examples/project-extension/knowledge-aware-context-pack.json) with the
 * per-slot resolution, active restrictions, resolved conflicts, gaps, required
 * human review, refusals, and the audit entries to write.
 */
export function resolveKnowledge(
  task: ResolverTask,
  skillDeps: SkillKnowledgeDependency,
  registry: KnowledgeRegistry,
  options: ResolverOptions = {},
): ResolverResult {
  const triggers = task.triggers ?? task.scope ?? [];
  const fallback = skillDeps.fallback_behavior;

  const resolution: Record<string, SlotResolution> = {};
  const restrictions = new Set<string>();
  const gaps: string[] = [];
  const refusals: RefusalNote[] = [];
  const reviewReasons = new Set<string>();
  const auditEntries: AuditEntry[] = [];
  const selectedBySlot: Record<string, KnowledgePackManifest> = {};

  const eligibleBase = registry.eligible({
    skill: skillDeps.skill,
    agent: task.agentId,
    scope: task.scope,
    maxSensitivity: task.maxSensitivity,
  });

  for (const [slotKey, slot] of Object.entries(skillDeps.knowledge_dependencies)) {
    const { required, requiredWhenMatched } = isRequired(slot, triggers);
    const accepted = new Set<string>(slot.accepted_types);

    const typeMatched = registry
      .list()
      .filter((p) => accepted.has(p.knowledge_pack.type));

    const minFloor = slot.min_authority ? AUTHORITY_RANK[slot.min_authority] : -1;
    const candidates = eligibleBase
      .filter((p) => accepted.has(p.knowledge_pack.type))
      .filter((p) => p.knowledge_pack.retrieval_mode !== "blocked")
      .filter((p) => AUTHORITY_RANK[p.knowledge_pack.authority_level] >= minFloor);

    if (candidates.length === 0) {
      // Was a type-matching source dropped only because its sensitivity exceeded
      // the task ceiling? Then this is a "restricted, not authorized" situation.
      const restrictedNotAuthorized =
        task.maxSensitivity !== undefined &&
        typeMatched.some(
          (p) =>
            SENSITIVITY_RANK[p.knowledge_pack.sensitivity] > SENSITIVITY_RANK[task.maxSensitivity!],
        );

      let fallbackApplied: string;
      if (required) {
        fallbackApplied = restrictedNotAuthorized
          ? fallback.restricted_source
          : fallback.missing_required_source;
        const reason = restrictedNotAuthorized ? "restricted_not_authorized" : "required_source_missing";
        refusals.push({ slot: slotKey, reason, fallback: fallbackApplied });
      } else {
        fallbackApplied = fallback.missing_optional_source;
      }

      gaps.push(slotKey);
      resolution[slotKey] = {
        required,
        ...(requiredWhenMatched !== undefined ? { required_when_matched: requiredWhenMatched } : {}),
        satisfied_by: null,
        fallback_applied: fallbackApplied,
        candidates_considered: 0,
      };
      continue;
    }

    const ranked = [...candidates].sort(compareCandidates);
    const selected = ranked[0];
    const kp = selected.knowledge_pack;
    selectedBySlot[slotKey] = selected;

    const appliedMode = applyRetrievalMode(kp.retrieval_mode, slot.preferred_retrieval_mode);
    const scope = SCOPE_BY_MODE[appliedMode] ?? "capsule";

    resolution[slotKey] = {
      required,
      ...(requiredWhenMatched !== undefined ? { required_when_matched: requiredWhenMatched } : {}),
      satisfied_by: {
        source_id: kp.id,
        source_version: kp.version,
        retrieved_scope: scope,
        retrieval_mode_applied: appliedMode,
      },
      candidates_considered: candidates.length,
    };

    if (kp.citation_required) restrictions.add(`citation_required_for:${kp.id}`);
    if (!kp.export_allowed) restrictions.add(`no_export_for:${kp.id}`);
    if (kp.full_text_exposure === "forbidden") restrictions.add(`no_verbatim_for:${kp.id}`);

    if (appliedMode === "human_review_required") {
      reviewReasons.add(`retrieval_mode_human_review:${kp.id}`);
    }
    if (task.humanReviewConditions) {
      const hit = kp.human_review_required_for.filter((c) => task.humanReviewConditions!.includes(c));
      for (const c of hit) reviewReasons.add(`source_condition:${kp.id}:${c}`);
    }

    auditEntries.push({
      source_id: kp.id,
      source_version: kp.version,
      retrieved_scope: scope,
      sensitivity: kp.sensitivity,
      authority_level: kp.authority_level,
    });
  }

  // Conflicts: resolve any declared conflict between two selected slots.
  const conflicts: ConflictResolution[] = [];
  for (const declared of options.declaredConflicts ?? []) {
    const [slotA, slotB] = declared.between;
    const packA = selectedBySlot[slotA];
    const packB = selectedBySlot[slotB];
    if (!packA || !packB) continue; // a side was unsatisfied; nothing to resolve

    if (fallback.conflicting_sources === "escalate_to_human_review") {
      conflicts.push({
        conflict_id: declared.conflictId,
        between: [ref(packA), ref(packB)],
        topic: declared.topic,
        resolved_by: "escalation",
        prevailing_source: null,
        suppressed_sources: [],
        human_review_required: true,
        human_review_reason: "skill fallback_behavior requests escalation for conflicting sources",
      });
      reviewReasons.add(`conflict_escalated:${declared.topic}`);
      continue;
    }

    const resolved = resolveByPrecedence(packA, packB, declared.topic, declared.conflictId);
    conflicts.push(resolved);
    if (resolved.human_review_required) {
      reviewReasons.add(`conflict_unresolved:${declared.topic}`);
    }
  }

  const status: ResolverResult["status"] = refusals.some((r) =>
    ["stop_and_request_source", "abort", "refuse", "request_authorized_context_pack"].includes(
      r.fallback,
    ),
  )
    ? "refused"
    : "resolved";

  return {
    task_id: task.id,
    skill: skillDeps.skill,
    skill_version: skillDeps.version,
    status,
    knowledge_dependencies_resolution: resolution,
    restrictions_active: [...restrictions].sort(),
    conflicts_detected: conflicts,
    gaps,
    human_review: { required: reviewReasons.size > 0, reasons: [...reviewReasons].sort() },
    refusals,
    audit_log_entries_to_write: auditEntries,
  };
}
