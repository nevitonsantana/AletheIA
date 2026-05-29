import path from "node:path";
import fs from "node:fs";
import { validateAgainstSchema } from "./validation";
import type {
  GovernancePack,
  KnowledgePackManifest,
  SkillKnowledgeDependency,
} from "./types";

const SCHEMA_DIR = path.resolve(
  path.dirname(new URL(import.meta.url).pathname),
  "../schemas",
);

const GOVERNANCE_PACK_SCHEMA = path.join(
  SCHEMA_DIR,
  "aletheia-governance-pack.schema.json",
);
const KNOWLEDGE_PACK_SCHEMA = path.join(
  SCHEMA_DIR,
  "aletheia-knowledge-pack.schema.json",
);
const SKILL_KNOWLEDGE_DEPENDENCY_SCHEMA = path.join(
  SCHEMA_DIR,
  "aletheia-skill-knowledge-dependency.schema.json",
);

function readJsonFile(filePath: string, label: string): unknown {
  const resolved = path.resolve(filePath);
  if (!fs.existsSync(resolved)) {
    throw new Error(`${label} file not found: ${resolved}`);
  }
  return JSON.parse(fs.readFileSync(resolved, "utf-8"));
}

/**
 * Load and validate a GovernancePack from a JSON file.
 *
 * Throws `SchemaValidationError` if the file does not conform to the
 * governance-pack schema. Throws a standard `Error` if the file cannot
 * be read.
 */
export function loadGovernancePack(filePath: string): GovernancePack {
  const raw = readJsonFile(filePath, "Governance pack");
  return validateAgainstSchema<GovernancePack>(raw, GOVERNANCE_PACK_SCHEMA);
}

/**
 * Load and validate a knowledge-pack manifest from a JSON file.
 *
 * Throws `SchemaValidationError` if the file does not conform to the
 * knowledge-pack schema. Throws a standard `Error` if the file cannot
 * be read.
 */
export function loadKnowledgePack(filePath: string): KnowledgePackManifest {
  const raw = readJsonFile(filePath, "Knowledge pack");
  return validateAgainstSchema<KnowledgePackManifest>(raw, KNOWLEDGE_PACK_SCHEMA);
}

/**
 * Load and validate a skill knowledge-dependency manifest from a JSON file.
 *
 * Throws `SchemaValidationError` if the file does not conform to the
 * skill-knowledge-dependency schema. Throws a standard `Error` if the file
 * cannot be read.
 */
export function loadSkillKnowledgeDependency(
  filePath: string,
): SkillKnowledgeDependency {
  const raw = readJsonFile(filePath, "Skill knowledge dependency");
  return validateAgainstSchema<SkillKnowledgeDependency>(
    raw,
    SKILL_KNOWLEDGE_DEPENDENCY_SCHEMA,
  );
}
