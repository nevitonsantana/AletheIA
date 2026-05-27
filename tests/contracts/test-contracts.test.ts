import fs from "node:fs";
import path from "node:path";
import { describe, it, expect } from "vitest";
import { validateAgainstSchema, SchemaValidationError } from "../../engine";

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

describe("Contract validation", () => {
  for (const { name, fixture, schema } of fixtures) {
    it(`validates ${name} against ${schema}`, () => {
      const data = readJsonFile<unknown>(path.resolve(process.cwd(), fixture));
      expect(() => validateAgainstSchema(data, path.join(schemasDir, schema))).not.toThrow();
    });
  }

  it("throws SchemaValidationError for an invalid Task Brief (missing id)", () => {
    const taskBrief = readJsonFile<Record<string, unknown>>(
      path.resolve(process.cwd(), "examples/hello-world/task-brief.json"),
    );
    const brokenBrief: Record<string, unknown> = { ...taskBrief };
    delete brokenBrief.id;

    expect(() =>
      validateAgainstSchema(brokenBrief, path.join(schemasDir, "aletheia-task-brief.schema.json")),
    ).toThrow(SchemaValidationError);
  });
});
