import path from "node:path";
import fs from "node:fs";
import { validateAgainstSchema } from "./validation";
import type { GovernancePack } from "./types";

const GOVERNANCE_PACK_SCHEMA = path.resolve(
  path.dirname(new URL(import.meta.url).pathname),
  "../schemas/aletheia-governance-pack.schema.json",
);

/**
 * Load and validate a GovernancePack from a JSON file.
 *
 * Throws `SchemaValidationError` if the file does not conform to the
 * governance-pack schema. Throws a standard `Error` if the file cannot
 * be read.
 */
export function loadGovernancePack(filePath: string): GovernancePack {
  const resolved = path.resolve(filePath);
  if (!fs.existsSync(resolved)) {
    throw new Error(`Governance pack file not found: ${resolved}`);
  }
  const raw: unknown = JSON.parse(fs.readFileSync(resolved, "utf-8"));
  return validateAgainstSchema<GovernancePack>(raw, GOVERNANCE_PACK_SCHEMA);
}
