import fs from "node:fs";
import path from "node:path";
import type { ResolverResult } from "./resolver";

/**
 * Knowledge Governance Layer — audit-log writer (build step 5).
 *
 * Emits audit entries per docs/contracts/knowledge-audit-log-spec.md from a
 * resolver result: one `select` entry per satisfied dependency slot, one
 * `conflict` entry per resolved conflict, and one `refusal` entry per refusal.
 *
 * INVARIANT: an audit entry carries identifiers, versions, scope, restrictions,
 * and decisions — never source content. The {@link AuditLogEntry} shape has no
 * field for excerpts, so restricted text cannot be logged by construction. Do
 * not widen it to carry source text. (Per restricted-knowledge-usage-policy.md
 * and docs/security/logs-and-handoffs-policy.md.)
 *
 * Out of scope (per the implementation-prep brief): DLP/secret scanning,
 * retention enforcement, network sinks, encryption. The file sink is a thin,
 * append-only reference implementation.
 */

export type AuditEntryType = "select" | "conflict" | "refusal";

export interface AuditLogEntry {
  entry_type: AuditEntryType;
  task_id: string;
  skill_id: string;
  skill_version: string;
  human_review_required: boolean;
  decision_output: string;
  timestamp: string;

  agent_id?: string;
  user_id?: string;
  project_id?: string;
  trust_boundary?: string;
  resolver_version?: string;

  source_id?: string;
  source_version?: string;
  sensitivity?: string;
  authority_level?: string;
  retrieved_scope?: string;
  retrieval_mode_applied?: string;
  restrictions_applied?: string[];

  human_review_reason?: string;

  conflict_id?: string;
  prevailing_source?: string | null;
  suppressed_sources?: string[];

  fallback_applied?: string;
  refusal_reason?: string;
}

export interface AuditContext {
  agent_id?: string;
  user_id?: string;
  project_id?: string;
  trust_boundary?: string;
  resolver_version?: string;
  /** Injectable for deterministic output; defaults to now (ISO 8601 UTC). */
  timestamp?: string;
}

export interface AuditSink {
  write(entry: AuditLogEntry): void;
}

/** Collects entries in memory; useful for tests and review-before-flush. */
export class InMemoryAuditSink implements AuditSink {
  readonly entries: AuditLogEntry[] = [];
  write(entry: AuditLogEntry): void {
    this.entries.push(entry);
  }
}

/** Append-only JSON Lines sink. One JSON entry per line. */
export class FileAuditSink implements AuditSink {
  constructor(private readonly filePath: string) {
    const dir = path.dirname(path.resolve(filePath));
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }
  write(entry: AuditLogEntry): void {
    fs.appendFileSync(this.filePath, `${JSON.stringify(entry)}\n`, "utf-8");
  }
}

const RESTRICTION_PREFIX: Record<string, string> = {
  citation_required_for: "citation_required",
  no_export_for: "no_export",
  no_verbatim_for: "no_verbatim",
};

/** Map `citation_required_for:<id>` tokens for one source to bare restriction names. */
function restrictionsForSource(active: string[], sourceId: string): string[] {
  const out: string[] = [];
  for (const token of active) {
    const idx = token.lastIndexOf(":");
    if (idx === -1) continue;
    const prefix = token.slice(0, idx);
    const id = token.slice(idx + 1);
    if (id === sourceId && RESTRICTION_PREFIX[prefix]) {
      out.push(RESTRICTION_PREFIX[prefix]);
    }
  }
  return out.sort();
}

function reviewReasonsForSource(reasons: string[], sourceId: string): string[] {
  return reasons.filter((r) => r.includes(`:${sourceId}`));
}

function pruneUndefined<T extends Record<string, unknown>>(obj: T): T {
  for (const key of Object.keys(obj)) {
    if (obj[key] === undefined) delete obj[key];
  }
  return obj;
}

/**
 * Build spec-compliant audit entries from a resolver result. Pure: deterministic
 * given a fixed `timestamp` in context.
 */
export function buildAuditEntries(
  result: ResolverResult,
  context: AuditContext = {},
): AuditLogEntry[] {
  const timestamp = context.timestamp ?? new Date().toISOString();
  const base = pruneUndefined({
    task_id: result.task_id,
    skill_id: result.skill,
    skill_version: result.skill_version,
    agent_id: context.agent_id,
    user_id: context.user_id,
    project_id: context.project_id,
    trust_boundary: context.trust_boundary,
    resolver_version: context.resolver_version,
    timestamp,
  });

  const entries: AuditLogEntry[] = [];

  // select entries — one per satisfied slot
  const auditBySource = new Map(
    result.audit_log_entries_to_write.map((e) => [e.source_id, e]),
  );
  for (const [slot, res] of Object.entries(result.knowledge_dependencies_resolution)) {
    const sat = res.satisfied_by;
    if (!sat) continue;
    const meta = auditBySource.get(sat.source_id);
    const reviewReasons = reviewReasonsForSource(result.human_review.reasons, sat.source_id);
    entries.push(
      pruneUndefined({
        ...base,
        entry_type: "select",
        source_id: sat.source_id,
        source_version: sat.source_version,
        sensitivity: meta?.sensitivity,
        authority_level: meta?.authority_level,
        retrieved_scope: sat.retrieved_scope,
        retrieval_mode_applied: sat.retrieval_mode_applied,
        restrictions_applied: restrictionsForSource(result.restrictions_active, sat.source_id),
        human_review_required: reviewReasons.length > 0,
        human_review_reason: reviewReasons.length > 0 ? reviewReasons.join("; ") : undefined,
        decision_output: `Selected ${sat.source_id}@${sat.source_version} for slot "${slot}" (${sat.retrieved_scope}).`,
      }) as AuditLogEntry,
    );
  }

  // conflict entries
  for (const conflict of result.conflicts_detected) {
    entries.push(
      pruneUndefined({
        ...base,
        entry_type: "conflict",
        conflict_id: conflict.conflict_id,
        prevailing_source: conflict.prevailing_source,
        suppressed_sources: conflict.suppressed_sources,
        human_review_required: conflict.human_review_required,
        human_review_reason: conflict.human_review_reason,
        decision_output: `Conflict on "${conflict.topic}" resolved_by ${conflict.resolved_by}${
          conflict.prevailing_source ? `; prevailing ${conflict.prevailing_source}` : "; escalated"
        }.`,
      }) as AuditLogEntry,
    );
  }

  // refusal entries
  for (const refusal of result.refusals) {
    entries.push(
      pruneUndefined({
        ...base,
        entry_type: "refusal",
        human_review_required: false,
        fallback_applied: refusal.fallback,
        refusal_reason: `${refusal.reason} for slot "${refusal.slot}"; fallback ${refusal.fallback}.`,
        decision_output: `Refused slot "${refusal.slot}" (${refusal.reason}).`,
      }) as AuditLogEntry,
    );
  }

  return entries;
}

/**
 * Build audit entries from a resolver result and write each to the sink.
 * Returns the entries written.
 */
export function recordResolution(
  result: ResolverResult,
  sink: AuditSink,
  context: AuditContext = {},
): AuditLogEntry[] {
  const entries = buildAuditEntries(result, context);
  for (const entry of entries) {
    sink.write(entry);
  }
  return entries;
}
