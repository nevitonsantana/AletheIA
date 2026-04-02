import fs from "node:fs";
import path from "node:path";

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

function readJsonFile<T>(filePath: string): T {
  return JSON.parse(fs.readFileSync(filePath, "utf-8")) as T;
}

const taskBrief = readJsonFile<Record<string, unknown>>(
  path.resolve(process.cwd(), "examples/hello-world/task-brief.json"),
);
const contextPack = readJsonFile<Record<string, unknown>>(
  path.resolve(process.cwd(), "examples/hello-world/context-pack.json"),
);
const executionScope = readJsonFile<Record<string, unknown>>(
  path.resolve(process.cwd(), "examples/governance/execution-scope.json"),
);
const learningRecord = readJsonFile<Record<string, unknown>>(
  path.resolve(process.cwd(), "examples/learning-from-failed-validation/learning-record.json"),
);

assert(typeof taskBrief.id === "string", "Task Brief must expose an id.");
assert(typeof taskBrief.title === "string", "Task Brief must expose a title.");
assert(typeof contextPack.summary === "string", "Context Pack must expose a summary.");
assert(Array.isArray(contextPack.sources), "Context Pack must expose sources.");
assert(typeof executionScope.id === "string", "Execution Scope must expose an id.");
assert(Array.isArray(executionScope.allowed_files), "Execution Scope must expose allowed_files.");
assert(Array.isArray(executionScope.forbidden_files), "Execution Scope must expose forbidden_files.");
assert(typeof learningRecord.learning_type === "string", "Learning Record must expose a learning_type.");
assert(typeof learningRecord.summary === "string", "Learning Record must expose a summary.");

console.log("AletheIA contract tests passed.");
