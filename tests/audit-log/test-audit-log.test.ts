import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, it, expect } from "vitest";
import {
  KnowledgeRegistry,
  resolveKnowledge,
  buildAuditEntries,
  recordResolution,
  InMemoryAuditSink,
  FileAuditSink,
} from "../../engine";
import type {
  AuditLogEntry,
  KnowledgePackManifest,
  KnowledgeSourceType,
  SkillKnowledgeDependency,
} from "../../engine";

const FIXED_TS = "2026-05-29T12:00:00.000Z";

const ALLOWED_KEYS = new Set<keyof AuditLogEntry>([
  "entry_type",
  "task_id",
  "skill_id",
  "skill_version",
  "human_review_required",
  "decision_output",
  "timestamp",
  "agent_id",
  "user_id",
  "project_id",
  "trust_boundary",
  "resolver_version",
  "source_id",
  "source_version",
  "sensitivity",
  "authority_level",
  "retrieved_scope",
  "retrieval_mode_applied",
  "restrictions_applied",
  "human_review_reason",
  "conflict_id",
  "prevailing_source",
  "suppressed_sources",
  "fallback_applied",
  "refusal_reason",
]);

function makePack(o: {
  id: string;
  type?: KnowledgeSourceType;
  scope?: string[];
  human_review_required_for?: string[];
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
      human_review_required_for: o.human_review_required_for ?? [],
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

describe("buildAuditEntries — select", () => {
  const registry = new KnowledgeRegistry([makePack({ id: "fw", scope: ["general"] })]);
  const skillDeps = deps({ strategic_framework: { required: true, accepted_types: ["proprietary_framework"] } });

  it("emits one select entry per satisfied slot with full spec fields", () => {
    const result = resolveKnowledge({ id: "t1", scope: ["general"] }, skillDeps, registry);
    const [entry] = buildAuditEntries(result, { agent_id: "product-agent", timestamp: FIXED_TS });
    expect(entry).toMatchObject({
      entry_type: "select",
      task_id: "t1",
      skill_id: "feature-value-governance",
      skill_version: "0.1.0",
      agent_id: "product-agent",
      source_id: "fw",
      source_version: "1.0.0",
      sensitivity: "internal",
      authority_level: "interpretive",
      retrieved_scope: "capsule",
      retrieval_mode_applied: "capsule_first",
      human_review_required: false,
      timestamp: FIXED_TS,
    });
  });

  it("translates restrictions_active tokens into per-source restriction names", () => {
    const result = resolveKnowledge({ id: "t1", scope: ["general"] }, skillDeps, registry);
    const [entry] = buildAuditEntries(result, { timestamp: FIXED_TS });
    expect(entry.restrictions_applied).toEqual(["citation_required", "no_export", "no_verbatim"]);
  });

  it("never writes fields outside the audit schema (no source content)", () => {
    const result = resolveKnowledge({ id: "t1", scope: ["general"] }, skillDeps, registry);
    for (const entry of buildAuditEntries(result, { timestamp: FIXED_TS })) {
      for (const key of Object.keys(entry)) {
        expect(ALLOWED_KEYS.has(key as keyof AuditLogEntry)).toBe(true);
      }
    }
  });

  it("flags human review on the source whose condition matched the task", () => {
    const reg = new KnowledgeRegistry([
      makePack({ id: "fw", scope: ["general"], human_review_required_for: ["client_delivery"] }),
    ]);
    const result = resolveKnowledge(
      { id: "t1", scope: ["general"], humanReviewConditions: ["client_delivery"] },
      skillDeps,
      reg,
    );
    const select = buildAuditEntries(result, { timestamp: FIXED_TS }).find((e) => e.entry_type === "select");
    expect(select?.human_review_required).toBe(true);
    expect(select?.human_review_reason).toContain("client_delivery");
  });
});

describe("buildAuditEntries — conflict and refusal", () => {
  it("emits a conflict entry with prevailing and suppressed sources", () => {
    const registry = new KnowledgeRegistry([
      makePack({ id: "persona", type: "persona", scope: ["interface_change"] }),
      makePack({ id: "wcag", type: "accessibility_guideline", scope: ["interface_change"] }),
    ]);
    const skillDeps = deps({
      personas: { required: false, accepted_types: ["persona"] },
      accessibility_guidelines: { required_when: ["interface_change"], accepted_types: ["accessibility_guideline"] },
    });
    const result = resolveKnowledge(
      { id: "t", scope: ["interface_change"] },
      skillDeps,
      registry,
      { declaredConflicts: [{ between: ["personas", "accessibility_guidelines"], topic: "labels", conflictId: "c1" }] },
    );
    const conflict = buildAuditEntries(result, { timestamp: FIXED_TS }).find((e) => e.entry_type === "conflict");
    expect(conflict).toMatchObject({ conflict_id: "c1", human_review_required: false });
    expect(conflict?.prevailing_source).toBe("wcag@1.0.0");
    expect(conflict?.suppressed_sources).toEqual(["persona@1.0.0"]);
  });

  it("emits a refusal entry for a missing required source", () => {
    const registry = new KnowledgeRegistry([]);
    const skillDeps = deps({ strategic_framework: { required: true, accepted_types: ["proprietary_framework"] } });
    const result = resolveKnowledge({ id: "t", scope: ["general"] }, skillDeps, registry);
    const refusal = buildAuditEntries(result, { timestamp: FIXED_TS }).find((e) => e.entry_type === "refusal");
    expect(refusal).toBeDefined();
    expect(refusal?.refusal_reason).toContain("required_source_missing");
    expect(refusal?.fallback_applied).toBe("stop_and_request_source");
  });

  it("is deterministic for a fixed timestamp", () => {
    const registry = new KnowledgeRegistry([makePack({ id: "fw", scope: ["general"] })]);
    const skillDeps = deps({ strategic_framework: { required: true, accepted_types: ["proprietary_framework"] } });
    const result = resolveKnowledge({ id: "t", scope: ["general"] }, skillDeps, registry);
    const a = buildAuditEntries(result, { timestamp: FIXED_TS });
    const b = buildAuditEntries(result, { timestamp: FIXED_TS });
    expect(a).toEqual(b);
  });
});

describe("sinks", () => {
  const registry = new KnowledgeRegistry([makePack({ id: "fw", scope: ["general"] })]);
  const skillDeps = deps({ strategic_framework: { required: true, accepted_types: ["proprietary_framework"] } });

  it("recordResolution writes every entry to an in-memory sink", () => {
    const result = resolveKnowledge({ id: "t", scope: ["general"] }, skillDeps, registry);
    const sink = new InMemoryAuditSink();
    const written = recordResolution(result, sink, { timestamp: FIXED_TS });
    expect(sink.entries).toEqual(written);
    expect(sink.entries.length).toBeGreaterThan(0);
  });

  it("FileAuditSink appends one JSON object per line", () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "kg-audit-"));
    try {
      const file = path.join(dir, "nested", "audit.jsonl");
      const sink = new FileAuditSink(file);
      const result = resolveKnowledge({ id: "t", scope: ["general"] }, skillDeps, registry);
      const written = recordResolution(result, sink, { timestamp: FIXED_TS });
      const lines = fs.readFileSync(file, "utf-8").trim().split("\n");
      expect(lines).toHaveLength(written.length);
      expect(JSON.parse(lines[0]).entry_type).toBe("select");
    } finally {
      fs.rmSync(dir, { recursive: true, force: true });
    }
  });
});
