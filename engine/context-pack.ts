import path from "node:path";
import { validateAgainstSchema } from "./validation";
import type { ResolverResult } from "./resolver";

/**
 * Knowledge Governance Layer — context-pack assembly (build step 4).
 *
 * Serializes a {@link ResolverResult} into a knowledge-aware context pack that
 * conforms to schemas/aletheia-knowledge-aware-context-pack.schema.json and
 * matches examples/project-extension/knowledge-aware-context-pack.json.
 *
 * Pure serialization + schema validation. No I/O beyond reading the schema, no
 * content retrieval, no network. The resolver already computes the resolution;
 * this step gives it a stable, validated on-the-wire shape with the task /
 * agent / skill envelope.
 */

const CONTEXT_PACK_SCHEMA = path.resolve(
  path.dirname(new URL(import.meta.url).pathname),
  "../schemas/aletheia-knowledge-aware-context-pack.schema.json",
);

const DEFAULT_CONTEXT_PACK_VERSION = "0.1.0";

export interface ContextPackEnvelope {
  task?: {
    purpose?: string;
    audience?: string;
    risk_class?: string;
    scope_tags?: string[];
  };
  agent?: {
    id: string;
    trust_boundary?: string;
  };
  /** Override the skill mode; defaults to `knowledge_aware` when any slot was satisfied. */
  mode?: "knowledge_aware" | "generic";
  contextPackVersion?: string;
}

export interface KnowledgeAwareContextPack {
  context_pack_version: string;
  status: ResolverResult["status"];
  task: {
    id: string;
    purpose?: string;
    audience?: string;
    risk_class?: string;
    scope_tags?: string[];
  };
  agent?: {
    id: string;
    trust_boundary?: string;
  };
  skill: {
    id: string;
    version: string;
    mode: "knowledge_aware" | "generic";
  };
  knowledge_dependencies_resolution: ResolverResult["knowledge_dependencies_resolution"];
  restrictions_active: string[];
  conflicts_detected: ResolverResult["conflicts_detected"];
  gaps: string[];
  human_review: ResolverResult["human_review"];
  refusals: ResolverResult["refusals"];
  audit_log_entries_to_write: ResolverResult["audit_log_entries_to_write"];
}

function pruneUndefined<T extends Record<string, unknown>>(obj: T): T {
  for (const key of Object.keys(obj)) {
    if (obj[key] === undefined) delete obj[key];
  }
  return obj;
}

/**
 * Build a knowledge-aware context pack from a resolver result and an optional
 * task / agent / skill envelope. The pack's `skill.mode` defaults to
 * `knowledge_aware` when at least one dependency slot was satisfied, otherwise
 * `generic`.
 */
export function assembleContextPack(
  result: ResolverResult,
  envelope: ContextPackEnvelope = {},
): KnowledgeAwareContextPack {
  const anySatisfied = Object.values(result.knowledge_dependencies_resolution).some(
    (slot) => slot.satisfied_by !== null,
  );
  const mode = envelope.mode ?? (anySatisfied ? "knowledge_aware" : "generic");

  const pack: KnowledgeAwareContextPack = {
    context_pack_version: envelope.contextPackVersion ?? DEFAULT_CONTEXT_PACK_VERSION,
    status: result.status,
    task: pruneUndefined({
      id: result.task_id,
      purpose: envelope.task?.purpose,
      audience: envelope.task?.audience,
      risk_class: envelope.task?.risk_class,
      scope_tags: envelope.task?.scope_tags,
    }),
    skill: {
      id: result.skill,
      version: result.skill_version,
      mode,
    },
    knowledge_dependencies_resolution: result.knowledge_dependencies_resolution,
    restrictions_active: result.restrictions_active,
    conflicts_detected: result.conflicts_detected,
    gaps: result.gaps,
    human_review: result.human_review,
    refusals: result.refusals,
    audit_log_entries_to_write: result.audit_log_entries_to_write,
  };

  if (envelope.agent) {
    pack.agent = pruneUndefined({
      id: envelope.agent.id,
      trust_boundary: envelope.agent.trust_boundary,
    });
  }

  return pack;
}

/**
 * Validate a knowledge-aware context pack against the schema.
 * @throws SchemaValidationError if the pack does not conform.
 */
export function validateContextPack(pack: unknown): KnowledgeAwareContextPack {
  return validateAgainstSchema<KnowledgeAwareContextPack>(pack, CONTEXT_PACK_SCHEMA);
}

/** Assemble and validate in one step. */
export function buildContextPack(
  result: ResolverResult,
  envelope: ContextPackEnvelope = {},
): KnowledgeAwareContextPack {
  return validateContextPack(assembleContextPack(result, envelope));
}
