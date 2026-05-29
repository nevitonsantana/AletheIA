import fs from "node:fs";
import path from "node:path";
import { loadKnowledgePack } from "./loader";
import type {
  KnowledgePackManifest,
  KnowledgeSensitivity,
  KnowledgeSourceType,
} from "./types";

/**
 * Knowledge Governance Layer — registry (build step 2).
 *
 * A catalogue over a set of already-loaded knowledge-pack manifests that
 * answers eligibility queries. This is a pure, deterministic data structure:
 * it does not retrieve content, evaluate authority, resolve conflicts, or
 * apply retrieval modes — those are the resolver's job (build step 3).
 *
 * Scope (per docs/roadmaps/knowledge-governance-implementation-prep.md):
 * filter by `allowed_skills`, `allowed_agents`, scope, and sensitivity ceiling.
 * No DB, no IAM, no network. File-backing is a thin helper over the loader.
 */

/** Canonical sensitivity ordering (low → high). */
const SENSITIVITY_ORDER: Record<KnowledgeSensitivity, number> = {
  public: 0,
  internal: 1,
  confidential: 2,
  restricted: 3,
  regulated: 4,
};

export interface EligibilityQuery {
  /** Skill id; matched against a pack's `allowed_skills` allowlist. */
  skill?: string;
  /** Agent id; matched against a pack's `allowed_agents` allowlist. */
  agent?: string;
  /** Task scope tags; a pack is eligible if its `scope` intersects these. */
  scope?: string[];
  /** Sensitivity ceiling; packs above this level are excluded. */
  maxSensitivity?: KnowledgeSensitivity;
  /** Restrict to a single source type. */
  type?: KnowledgeSourceType;
}

/**
 * Decide whether a single pack satisfies an eligibility query.
 *
 * Allowlist semantics: an absent or empty `allowed_skills` / `allowed_agents`
 * means the pack is unrestricted on that axis. A non-empty allowlist excludes
 * any actor not named in it. Omitting a query field disables that filter.
 */
export function isEligible(
  pack: KnowledgePackManifest,
  query: EligibilityQuery = {},
): boolean {
  const kp = pack.knowledge_pack;

  if (query.type && kp.type !== query.type) {
    return false;
  }

  if (query.skill && kp.allowed_skills && kp.allowed_skills.length > 0) {
    if (!kp.allowed_skills.includes(query.skill)) {
      return false;
    }
  }

  if (query.agent && kp.allowed_agents && kp.allowed_agents.length > 0) {
    if (!kp.allowed_agents.includes(query.agent)) {
      return false;
    }
  }

  if (query.scope && query.scope.length > 0) {
    const intersects = query.scope.some((tag) => kp.scope.includes(tag));
    if (!intersects) {
      return false;
    }
  }

  if (query.maxSensitivity) {
    if (SENSITIVITY_ORDER[kp.sensitivity] > SENSITIVITY_ORDER[query.maxSensitivity]) {
      return false;
    }
  }

  return true;
}

export class KnowledgeRegistry {
  private readonly packs: KnowledgePackManifest[];

  /**
   * @throws Error if two packs share the same `id`.
   */
  constructor(packs: KnowledgePackManifest[] = []) {
    const seen = new Set<string>();
    for (const pack of packs) {
      const id = pack.knowledge_pack.id;
      if (seen.has(id)) {
        throw new Error(`Duplicate knowledge pack id in registry: ${id}`);
      }
      seen.add(id);
    }
    this.packs = [...packs];
  }

  /** All registered packs (defensive copy). */
  list(): KnowledgePackManifest[] {
    return [...this.packs];
  }

  /** A single pack by id, or undefined. */
  get(id: string): KnowledgePackManifest | undefined {
    return this.packs.find((pack) => pack.knowledge_pack.id === id);
  }

  /** All packs of a given source type. */
  byType(type: KnowledgeSourceType): KnowledgePackManifest[] {
    return this.packs.filter((pack) => pack.knowledge_pack.type === type);
  }

  /** All packs that satisfy the eligibility query. */
  eligible(query: EligibilityQuery = {}): KnowledgePackManifest[] {
    return this.packs.filter((pack) => isEligible(pack, query));
  }
}

/**
 * Build a registry from every `*.json` knowledge-pack manifest in a directory.
 * Each file is schema-validated by the loader; a malformed manifest throws.
 *
 * @throws Error if the directory does not exist.
 * @throws SchemaValidationError if any manifest is invalid.
 */
export function loadKnowledgeRegistry(dir: string): KnowledgeRegistry {
  const resolved = path.resolve(dir);
  if (!fs.existsSync(resolved)) {
    throw new Error(`Knowledge registry directory not found: ${resolved}`);
  }
  const packs = fs
    .readdirSync(resolved)
    .filter((file) => file.endsWith(".json"))
    .sort()
    .map((file) => loadKnowledgePack(path.join(resolved, file)));
  return new KnowledgeRegistry(packs);
}
