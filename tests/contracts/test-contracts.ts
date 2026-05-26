import fs from "node:fs";
import path from "node:path";
import { validateAgainstSchema, SchemaValidationError } from "../../engine";

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

function readJsonFile<T>(filePath: string): T {
  return JSON.parse(fs.readFileSync(filePath, "utf-8")) as T;
}

const schemasDir = path.resolve(process.cwd(), "schemas");

const fixtures = [
  {
    name: "Task Brief",
    fixture: "examples/hello-world/task-brief.json",
    schema: "aletheia-task-brief.schema.json",
  },
  {
    name: "Context Pack",
    fixture: "examples/hello-world/context-pack.json",
    schema: "aletheia-context-pack.schema.json",
  },
  {
    name: "Execution Scope",
    fixture: "examples/governance/execution-scope.json",
    schema: "aletheia-execution-scope.schema.json",
  },
  {
    name: "Learning Record",
    fixture: "examples/learning-from-failed-validation/learning-record.json",
    schema: "aletheia-learning-record.schema.json",
  },
];

for (const { name, fixture, schema } of fixtures) {
  const data = readJsonFile<unknown>(path.resolve(process.cwd(), fixture));
  validateAgainstSchema(data, path.join(schemasDir, schema));
  console.log(`PASS: ${name} validates against ${schema}`);
}

const taskBrief = readJsonFile<Record<string, unknown>>(
  path.resolve(process.cwd(), "examples/hello-world/task-brief.json"),
);
const brokenBrief: Record<string, unknown> = { ...taskBrief };
delete brokenBrief.id;
let caught: unknown;
try {
  validateAgainstSchema(brokenBrief, path.join(schemasDir, "aletheia-task-brief.schema.json"));
} catch (error) {
  caught = error;
}
assert(caught !== undefined, "Invalid Task Brief must throw.");
assert(
  caught instanceof Error && caught.name === "SchemaValidationError",
  `Expected SchemaValidationError, got ${caught instanceof Error ? caught.name : typeof caught}: ${caught instanceof Error ? caught.message : String(caught)}`,
);
console.log("PASS: invalid Task Brief throws SchemaValidationError");

console.log("AletheIA contract tests passed.");
