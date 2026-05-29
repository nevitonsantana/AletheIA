import fs from "node:fs";
import path from "node:path";
import { describe, it, expect } from "vitest";
import {
  validateAgainstSchema,
  SchemaValidationError,
  loadGovernancePack,
  loadKnowledgePack,
  loadSkillKnowledgeDependency,
} from "../../engine";

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
  {
    name: "Governance Pack",
    fixture: "policies/aletheia-development-governance.v1.json",
    schema: "aletheia-governance-pack.schema.json",
  },
  {
    name: "Knowledge Pack",
    fixture: "examples/project-extension/knowledge-pack.example.json",
    schema: "aletheia-knowledge-pack.schema.json",
  },
  {
    name: "Skill Knowledge Dependency",
    fixture: "examples/project-extension/skill-knowledge-dependency.example.json",
    schema: "aletheia-skill-knowledge-dependency.schema.json",
  },
];

describe("Contract validation", () => {
  for (const { name, fixture, schema } of fixtures) {
    it(`validates ${name} against ${schema}`, () => {
      const data = readJsonFile<unknown>(path.resolve(process.cwd(), fixture));
      expect(() => validateAgainstSchema(data, path.join(schemasDir, schema))).not.toThrow();
    });
  }

  it("loadGovernancePack validates and returns a valid pack", () => {
    const pack = loadGovernancePack(
      path.resolve(process.cwd(), "policies/aletheia-development-governance.v1.json"),
    );
    expect(pack.meta.name).toBeTruthy();
    expect(Array.isArray(pack.rules)).toBe(true);
  });

  it("loadGovernancePack throws SchemaValidationError for a malformed pack", () => {
    expect(() =>
      loadGovernancePack(path.resolve(process.cwd(), "examples/hello-world/task-brief.json")),
    ).toThrow(SchemaValidationError);
  });

  it("loadKnowledgePack validates and returns a valid manifest", () => {
    const pack = loadKnowledgePack(
      path.resolve(process.cwd(), "examples/project-extension/knowledge-pack.example.json"),
    );
    expect(pack.knowledge_pack.id).toBeTruthy();
    expect(Array.isArray(pack.knowledge_pack.scope)).toBe(true);
  });

  it("loadKnowledgePack throws SchemaValidationError for a malformed manifest", () => {
    expect(() =>
      loadKnowledgePack(path.resolve(process.cwd(), "examples/hello-world/task-brief.json")),
    ).toThrow(SchemaValidationError);
  });

  it("loadSkillKnowledgeDependency validates and returns a valid manifest", () => {
    const dep = loadSkillKnowledgeDependency(
      path.resolve(
        process.cwd(),
        "examples/project-extension/skill-knowledge-dependency.example.json",
      ),
    );
    expect(dep.skill).toBeTruthy();
    expect(Object.keys(dep.knowledge_dependencies).length).toBeGreaterThan(0);
  });

  it("loadSkillKnowledgeDependency throws SchemaValidationError for a malformed manifest", () => {
    expect(() =>
      loadSkillKnowledgeDependency(
        path.resolve(process.cwd(), "examples/hello-world/task-brief.json"),
      ),
    ).toThrow(SchemaValidationError);
  });

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
