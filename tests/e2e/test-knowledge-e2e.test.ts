import fs from "node:fs";
import path from "node:path";
import { describe, it, expect } from "vitest";
import {
  loadKnowledgeRegistry,
  loadSkillKnowledgeDependency,
  resolveKnowledge,
  assembleContextPack,
  validateContextPack,
  buildAuditEntries,
  InMemoryAuditSink,
  recordResolution,
} from "../../engine";
import type { ResolverTask } from "../../engine";

function readJson<T>(p: string): T {
  return JSON.parse(fs.readFileSync(path.resolve(process.cwd(), p), "utf-8")) as T;
}

const E2E_DIR = "examples/project-extension/e2e";
const GOLDEN = "examples/goldens/knowledge-resolution.json";
const TRACE = "examples/project-extension/resolver-trace.example.json";
const FIXED_TS = "2026-05-29T12:00:00.000Z";

/** Run the full registry -> resolver -> context-pack -> audit pipeline. */
function runPipeline() {
  const registry = loadKnowledgeRegistry(path.resolve(process.cwd(), E2E_DIR, "packs"));
  const skillDeps = loadSkillKnowledgeDependency(
    path.resolve(process.cwd(), E2E_DIR, "skill-knowledge-dependency.json"),
  );
  const task: ResolverTask = {
    id: "task_2026-05-29_feat-001",
    scope: ["feature_governance", "customer_facing_experience", "interface_change"],
    maxSensitivity: "internal",
    agentId: "product-agent",
    humanReviewConditions: ["external_publication"],
  };
  const result = resolveKnowledge(task, skillDeps, registry, {
    declaredConflicts: [
      {
        between: ["personas", "accessibility_guidelines"],
        topic: "explicit form labels on checkout fields",
        conflictId: "conflict_2026-05-29_001",
      },
    ],
  });
  const context_pack = assembleContextPack(result, {
    task: {
      purpose: "Decide whether the proposed checkout simplification should ship as-is.",
      audience: "internal_review",
      risk_class: "medium",
      scope_tags: ["feature_governance", "customer_facing_experience", "interface_change"],
    },
    agent: { id: "product-agent", trust_boundary: "project-acme-internal" },
  });
  const audit_entries = buildAuditEntries(result, {
    agent_id: "product-agent",
    project_id: "project-acme",
    trust_boundary: "project-acme-internal",
    resolver_version: "0.1.0",
    timestamp: FIXED_TS,
  });
  return { result, context_pack, audit_entries };
}

describe("Knowledge Governance Layer — end-to-end golden", () => {
  const golden = readJson<{ context_pack: unknown; audit_entries: unknown[] }>(GOLDEN);

  it("produces the golden context pack", () => {
    const { context_pack } = runPipeline();
    expect(context_pack).toEqual(golden.context_pack);
  });

  it("produces the golden audit trail", () => {
    const { audit_entries } = runPipeline();
    expect(audit_entries).toEqual(golden.audit_entries);
  });

  it("the produced context pack is schema-valid", () => {
    const { context_pack } = runPipeline();
    expect(() => validateContextPack(context_pack)).not.toThrow();
  });

  it("recordResolution writes exactly the golden entries to a sink", () => {
    const { result } = runPipeline();
    const sink = new InMemoryAuditSink();
    recordResolution(result, sink, {
      agent_id: "product-agent",
      project_id: "project-acme",
      trust_boundary: "project-acme-internal",
      resolver_version: "0.1.0",
      timestamp: FIXED_TS,
    });
    expect(sink.entries).toEqual(golden.audit_entries);
  });

  it("every e2e pack's source_location resolves to a real provenance file", () => {
    const registry = loadKnowledgeRegistry(path.resolve(process.cwd(), E2E_DIR, "packs"));
    for (const pack of registry.list()) {
      const loc = pack.knowledge_pack.source_location;
      expect(
        fs.existsSync(path.resolve(process.cwd(), loc)),
        `source_location for ${pack.knowledge_pack.id} does not resolve: ${loc}`,
      ).toBe(true);
    }
  });

  it("no audit entry leaks restricted source content", () => {
    const { audit_entries } = runPipeline();
    const blob = JSON.stringify(audit_entries);
    // entries carry ids/versions/scope/decisions only — never a source_location or notes
    expect(blob).not.toContain("source_location");
    expect(blob).not.toContain("source_integrity_notes");
  });

  it("the committed resolver-trace example matches the golden (no drift)", () => {
    const trace = readJson<{ context_pack: unknown; audit_entries: unknown[] }>(TRACE);
    expect(trace.context_pack).toEqual(golden.context_pack);
    expect(trace.audit_entries).toEqual(golden.audit_entries);
  });
});
