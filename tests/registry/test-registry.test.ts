import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, it, expect } from "vitest";
import {
  KnowledgeRegistry,
  isEligible,
  loadKnowledgeRegistry,
  SchemaValidationError,
} from "../../engine";
import type {
  KnowledgePackManifest,
  KnowledgeSourceType,
  KnowledgeSensitivity,
  KnowledgeAuthorityLevel,
  KnowledgeRetrievalMode,
} from "../../engine";

interface PackOverrides {
  id: string;
  type?: KnowledgeSourceType;
  sensitivity?: KnowledgeSensitivity;
  authority_level?: KnowledgeAuthorityLevel;
  scope?: string[];
  allowed_skills?: string[];
  allowed_agents?: string[];
  retrieval_mode?: KnowledgeRetrievalMode;
}

function makePack(overrides: PackOverrides): KnowledgePackManifest {
  return {
    knowledge_pack: {
      id: overrides.id,
      name: `Pack ${overrides.id}`,
      type: overrides.type ?? "proprietary_framework",
      owner: "test-owner",
      version: "1.0.0",
      sensitivity: overrides.sensitivity ?? "internal",
      authority_level: overrides.authority_level ?? "interpretive",
      scope: overrides.scope ?? ["general"],
      allowed_skills: overrides.allowed_skills,
      allowed_agents: overrides.allowed_agents,
      retrieval_mode: overrides.retrieval_mode ?? "capsule_first",
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

describe("KnowledgeRegistry — construction", () => {
  it("lists all registered packs", () => {
    const reg = new KnowledgeRegistry([makePack({ id: "a" }), makePack({ id: "b" })]);
    expect(reg.list().map((p) => p.knowledge_pack.id).sort()).toEqual(["a", "b"]);
  });

  it("returns a defensive copy from list()", () => {
    const reg = new KnowledgeRegistry([makePack({ id: "a" })]);
    reg.list().pop();
    expect(reg.list()).toHaveLength(1);
  });

  it("throws on duplicate pack id", () => {
    expect(() => new KnowledgeRegistry([makePack({ id: "dup" }), makePack({ id: "dup" })])).toThrow(
      /Duplicate knowledge pack id/,
    );
  });

  it("get() returns a pack by id or undefined", () => {
    const reg = new KnowledgeRegistry([makePack({ id: "a" })]);
    expect(reg.get("a")?.knowledge_pack.id).toBe("a");
    expect(reg.get("missing")).toBeUndefined();
  });

  it("byType() filters by source type", () => {
    const reg = new KnowledgeRegistry([
      makePack({ id: "fw", type: "proprietary_framework" }),
      makePack({ id: "persona", type: "persona" }),
    ]);
    expect(reg.byType("persona").map((p) => p.knowledge_pack.id)).toEqual(["persona"]);
  });
});

describe("KnowledgeRegistry — eligibility", () => {
  it("an empty query matches every pack", () => {
    const reg = new KnowledgeRegistry([makePack({ id: "a" }), makePack({ id: "b" })]);
    expect(reg.eligible()).toHaveLength(2);
  });

  it("filters by allowed_skills allowlist", () => {
    const reg = new KnowledgeRegistry([
      makePack({ id: "scoped", allowed_skills: ["skill-x"] }),
      makePack({ id: "open" }), // no allowlist → unrestricted
    ]);
    const ids = reg.eligible({ skill: "skill-y" }).map((p) => p.knowledge_pack.id);
    expect(ids).toEqual(["open"]);
    const ids2 = reg.eligible({ skill: "skill-x" }).map((p) => p.knowledge_pack.id).sort();
    expect(ids2).toEqual(["open", "scoped"]);
  });

  it("filters by allowed_agents allowlist", () => {
    const reg = new KnowledgeRegistry([makePack({ id: "scoped", allowed_agents: ["agent-x"] })]);
    expect(reg.eligible({ agent: "agent-y" })).toHaveLength(0);
    expect(reg.eligible({ agent: "agent-x" })).toHaveLength(1);
  });

  it("filters by scope intersection", () => {
    const reg = new KnowledgeRegistry([
      makePack({ id: "ui", scope: ["interface_change", "content_decision"] }),
      makePack({ id: "roadmap", scope: ["roadmap_decision"] }),
    ]);
    const ids = reg.eligible({ scope: ["interface_change"] }).map((p) => p.knowledge_pack.id);
    expect(ids).toEqual(["ui"]);
  });

  it("filters by sensitivity ceiling", () => {
    const reg = new KnowledgeRegistry([
      makePack({ id: "pub", sensitivity: "public" }),
      makePack({ id: "int", sensitivity: "internal" }),
      makePack({ id: "reg", sensitivity: "regulated" }),
    ]);
    const ids = reg.eligible({ maxSensitivity: "internal" }).map((p) => p.knowledge_pack.id).sort();
    expect(ids).toEqual(["int", "pub"]);
  });

  it("combines filters conjunctively", () => {
    const reg = new KnowledgeRegistry([
      makePack({
        id: "match",
        allowed_skills: ["s1"],
        scope: ["interface_change"],
        sensitivity: "internal",
      }),
      makePack({
        id: "wrong-sensitivity",
        allowed_skills: ["s1"],
        scope: ["interface_change"],
        sensitivity: "restricted",
      }),
    ]);
    const ids = reg
      .eligible({ skill: "s1", scope: ["interface_change"], maxSensitivity: "confidential" })
      .map((p) => p.knowledge_pack.id);
    expect(ids).toEqual(["match"]);
  });

  it("isEligible is exposed as a standalone predicate", () => {
    const pack = makePack({ id: "a", sensitivity: "restricted" });
    expect(isEligible(pack, { maxSensitivity: "internal" })).toBe(false);
    expect(isEligible(pack, { maxSensitivity: "restricted" })).toBe(true);
  });
});

describe("loadKnowledgeRegistry — file-backed", () => {
  it("loads and validates every knowledge pack in a directory", () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "kg-registry-"));
    try {
      const repoPack = path.resolve(
        process.cwd(),
        "examples/project-extension/knowledge-pack.example.json",
      );
      fs.copyFileSync(repoPack, path.join(dir, "pack-a.json"));
      const reg = loadKnowledgeRegistry(dir);
      expect(reg.list()).toHaveLength(1);
      expect(reg.get("example-accessibility-guideline")).toBeDefined();
    } finally {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  });

  it("throws SchemaValidationError when a file is not a valid knowledge pack", () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "kg-registry-bad-"));
    try {
      fs.writeFileSync(path.join(dir, "bad.json"), JSON.stringify({ not: "a pack" }));
      expect(() => loadKnowledgeRegistry(dir)).toThrow(SchemaValidationError);
    } finally {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  });

  it("throws when the directory does not exist", () => {
    expect(() => loadKnowledgeRegistry("/nonexistent/kg/dir")).toThrow(/not found/);
  });
});
