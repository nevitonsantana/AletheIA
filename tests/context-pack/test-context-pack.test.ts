import fs from "node:fs";
import path from "node:path";
import { describe, it, expect } from "vitest";
import {
  KnowledgeRegistry,
  resolveKnowledge,
  assembleContextPack,
  validateContextPack,
  buildContextPack,
  SchemaValidationError,
} from "../../engine";
import type {
  KnowledgePackManifest,
  KnowledgeSourceType,
  SkillKnowledgeDependency,
} from "../../engine";

function makePack(o: {
  id: string;
  type?: KnowledgeSourceType;
  scope?: string[];
}): KnowledgePackManifest {
  return {
    knowledge_pack: {
      id: o.id,
      name: `Pack ${o.id}`,
      type: o.type ?? "proprietary_framework",
      owner: "test-owner",
      version: "1.0.0",
      sensitivity: "internal",
      authority_level: "interpretive",
      scope: o.scope ?? ["general"],
      retrieval_mode: "capsule_first",
      citation_required: true,
      full_text_exposure: "forbidden",
      export_allowed: false,
      human_review_required_for: [],
      expiry: { review_cycle: "quarterly", expires_on: null },
      source_location: "examples/example.md",
      source_integrity_notes: "test fixture",
    },
  };
}

function deps(
  knowledge_dependencies: SkillKnowledgeDependency["knowledge_dependencies"],
  fallbackOverrides: Partial<SkillKnowledgeDependency["fallback_behavior"]> = {},
): SkillKnowledgeDependency {
  return {
    skill: "feature-value-governance",
    version: "0.1.0",
    knowledge_dependencies,
    fallback_behavior: {
      missing_required_source: "stop_and_request_source",
      missing_optional_source: "continue_with_assumption_marker",
      restricted_source: "request_authorized_context_pack",
      conflicting_sources: "apply_source_precedence_policy",
      ...fallbackOverrides,
    },
  };
}

describe("knowledge-aware context pack — schema", () => {
  it("the committed example validates against the schema", () => {
    const example = JSON.parse(
      fs.readFileSync(
        path.resolve(process.cwd(), "examples/project-extension/knowledge-aware-context-pack.json"),
        "utf-8",
      ),
    );
    expect(() => validateContextPack(example)).not.toThrow();
  });

  it("rejects a malformed pack", () => {
    expect(() => validateContextPack({ context_pack_version: "0.1.0" })).toThrow(SchemaValidationError);
  });
});

describe("assembleContextPack", () => {
  const registry = new KnowledgeRegistry([makePack({ id: "fw", scope: ["general"] })]);
  const skillDeps = deps({
    strategic_framework: { required: true, accepted_types: ["proprietary_framework"] },
  });

  it("maps resolver fields into the pack envelope", () => {
    const result = resolveKnowledge({ id: "t1", scope: ["general"] }, skillDeps, registry);
    const pack = assembleContextPack(result, {
      task: { purpose: "decide", scope_tags: ["general"] },
      agent: { id: "product-agent", trust_boundary: "project-internal" },
    });
    expect(pack.task.id).toBe("t1");
    expect(pack.task.purpose).toBe("decide");
    expect(pack.skill).toEqual({ id: "feature-value-governance", version: "0.1.0", mode: "knowledge_aware" });
    expect(pack.agent).toEqual({ id: "product-agent", trust_boundary: "project-internal" });
    expect(pack.status).toBe("resolved");
  });

  it("defaults skill mode to generic when nothing was satisfied", () => {
    const emptyReg = new KnowledgeRegistry([]);
    const result = resolveKnowledge(
      { id: "t2", scope: ["general"] },
      deps(
        { strategic_framework: { required: true, accepted_types: ["proprietary_framework"] } },
        { missing_required_source: "continue_in_generic_mode" },
      ),
      emptyReg,
    );
    const pack = assembleContextPack(result);
    expect(pack.skill.mode).toBe("generic");
  });

  it("omits the agent block when no agent is provided", () => {
    const result = resolveKnowledge({ id: "t3", scope: ["general"] }, skillDeps, registry);
    const pack = assembleContextPack(result);
    expect(pack.agent).toBeUndefined();
  });

  it("does not emit undefined task fields", () => {
    const result = resolveKnowledge({ id: "t4", scope: ["general"] }, skillDeps, registry);
    const pack = assembleContextPack(result);
    expect(Object.prototype.hasOwnProperty.call(pack.task, "purpose")).toBe(false);
  });
});

describe("buildContextPack — assemble + validate roundtrip", () => {
  it("produces a schema-valid pack for a resolved task", () => {
    const registry = new KnowledgeRegistry([
      makePack({ id: "fw", scope: ["feature_governance"] }),
      makePack({ id: "persona", type: "persona", scope: ["feature_governance"] }),
    ]);
    const skillDeps = deps({
      strategic_framework: { required: true, accepted_types: ["proprietary_framework"] },
      personas: { required: false, accepted_types: ["persona"] },
    });
    const result = resolveKnowledge({ id: "t", scope: ["feature_governance"] }, skillDeps, registry);
    expect(() =>
      buildContextPack(result, { task: { scope_tags: ["feature_governance"] }, agent: { id: "a" } }),
    ).not.toThrow();
  });

  it("produces a schema-valid pack for a refused task", () => {
    const registry = new KnowledgeRegistry([]);
    const skillDeps = deps({
      strategic_framework: { required: true, accepted_types: ["proprietary_framework"] },
    });
    const result = resolveKnowledge({ id: "t", scope: ["general"] }, skillDeps, registry);
    const pack = buildContextPack(result);
    expect(pack.status).toBe("refused");
    expect(pack.refusals.length).toBeGreaterThan(0);
    expect(pack.gaps).toContain("strategic_framework");
  });
});
