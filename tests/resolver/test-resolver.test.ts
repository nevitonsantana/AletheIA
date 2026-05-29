import { describe, it, expect } from "vitest";
import {
  KnowledgeRegistry,
  resolveKnowledge,
  resolveByPrecedence,
  compareCandidates,
  precedenceTier,
} from "../../engine";
import type {
  KnowledgePackManifest,
  KnowledgeSourceType,
  KnowledgeSensitivity,
  KnowledgeAuthorityLevel,
  KnowledgeRetrievalMode,
  SkillKnowledgeDependency,
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
  version?: string;
  citation_required?: boolean;
  export_allowed?: boolean;
  full_text_exposure?: "allowed" | "forbidden" | "conditional";
  human_review_required_for?: string[];
  supersedes?: string[];
}

function makePack(o: PackOverrides): KnowledgePackManifest {
  return {
    knowledge_pack: {
      id: o.id,
      name: `Pack ${o.id}`,
      type: o.type ?? "proprietary_framework",
      owner: "test-owner",
      version: o.version ?? "1.0.0",
      sensitivity: o.sensitivity ?? "internal",
      authority_level: o.authority_level ?? "interpretive",
      scope: o.scope ?? ["general"],
      allowed_skills: o.allowed_skills,
      allowed_agents: o.allowed_agents,
      retrieval_mode: o.retrieval_mode ?? "capsule_first",
      citation_required: o.citation_required ?? true,
      full_text_exposure: o.full_text_exposure ?? "forbidden",
      export_allowed: o.export_allowed ?? false,
      human_review_required_for: o.human_review_required_for ?? [],
      expiry: { review_cycle: "quarterly", expires_on: null },
      source_location: "examples/example.md",
      source_integrity_notes: "test fixture",
      supersedes: o.supersedes,
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

describe("precedence helpers", () => {
  it("maps types to tiers (1 highest)", () => {
    expect(precedenceTier(makePack({ id: "a", type: "privacy_policy", authority_level: "mandatory" }))).toBe(1);
    expect(precedenceTier(makePack({ id: "b", type: "accessibility_guideline", authority_level: "normative" }))).toBe(1);
    expect(precedenceTier(makePack({ id: "c", type: "product_strategy", authority_level: "strategic" }))).toBe(4);
    expect(precedenceTier(makePack({ id: "d", type: "persona", authority_level: "evidence_proxy" }))).toBe(6);
    expect(precedenceTier(makePack({ id: "e", type: "stakeholder_input", authority_level: "contextual" }))).toBe(8);
  });

  it("compareCandidates prefers the higher tier", () => {
    const acc = makePack({ id: "acc", type: "accessibility_guideline", authority_level: "normative" });
    const persona = makePack({ id: "persona", type: "persona", authority_level: "evidence_proxy" });
    expect(compareCandidates(acc, persona)).toBeLessThan(0);
    expect([acc, persona].slice().sort(compareCandidates)[0].knowledge_pack.id).toBe("acc");
  });

  it("breaks ties by version recency when tier and authority match", () => {
    const older = makePack({ id: "x", version: "1.0.0" });
    const newer = makePack({ id: "y", version: "2.1.0" });
    expect(compareCandidates(newer, older)).toBeLessThan(0);
  });
});

describe("resolveByPrecedence", () => {
  it("higher tier prevails and preserves the suppressed source", () => {
    const acc = makePack({ id: "wcag", type: "accessibility_guideline", authority_level: "normative", version: "1.2.0" });
    const persona = makePack({ id: "shopper", type: "persona", authority_level: "evidence_proxy", version: "0.4.0" });
    const r = resolveByPrecedence(persona, acc, "explicit form labels");
    expect(r.resolved_by).toBe("source_precedence_policy");
    expect(r.prevailing_source).toBe("wcag@1.2.0");
    expect(r.suppressed_sources).toEqual(["shopper@0.4.0"]);
    expect(r.human_review_required).toBe(false);
  });

  it("escalates a mandatory-vs-mandatory conflict", () => {
    const privacy = makePack({ id: "privacy", type: "privacy_policy", authority_level: "mandatory" });
    const security = makePack({ id: "security", type: "security_policy", authority_level: "mandatory" });
    const r = resolveByPrecedence(privacy, security, "data retention vs audit logging");
    expect(r.resolved_by).toBe("escalation");
    expect(r.prevailing_source).toBeNull();
    expect(r.human_review_required).toBe(true);
  });
});

describe("resolveKnowledge — selection", () => {
  const registry = new KnowledgeRegistry([
    makePack({ id: "fw", type: "proprietary_framework", scope: ["feature_governance"] }),
    makePack({ id: "persona", type: "persona", scope: ["feature_governance"], authority_level: "evidence_proxy" }),
    makePack({
      id: "wcag",
      type: "accessibility_guideline",
      authority_level: "normative",
      scope: ["interface_change"],
      retrieval_mode: "excerpt_only",
    }),
  ]);

  const skillDeps = deps({
    strategic_framework: { required: true, accepted_types: ["proprietary_framework", "product_strategy"] },
    personas: { required: false, accepted_types: ["persona", "research_finding"] },
    accessibility_guidelines: {
      required_when: ["interface_change", "content_decision"],
      accepted_types: ["accessibility_guideline"],
      min_authority: "normative",
    },
  });

  it("satisfies a required slot and applies capsule_first", () => {
    const r = resolveKnowledge(
      { id: "t1", scope: ["feature_governance", "interface_change"] },
      skillDeps,
      registry,
    );
    expect(r.status).toBe("resolved");
    const fw = r.knowledge_dependencies_resolution.strategic_framework;
    expect(fw.satisfied_by?.source_id).toBe("fw");
    expect(fw.satisfied_by?.retrieved_scope).toBe("capsule");
    expect(fw.satisfied_by?.retrieval_mode_applied).toBe("capsule_first");
  });

  it("activates a required_when slot when the trigger matches", () => {
    const r = resolveKnowledge(
      { id: "t1", scope: ["feature_governance", "interface_change"] },
      skillDeps,
      registry,
    );
    const acc = r.knowledge_dependencies_resolution.accessibility_guidelines;
    expect(acc.required_when_matched).toBe(true);
    expect(acc.satisfied_by?.source_id).toBe("wcag");
    expect(acc.satisfied_by?.retrieved_scope).toBe("excerpt");
  });

  it("derives active restrictions from selected packs", () => {
    const r = resolveKnowledge({ id: "t1", scope: ["feature_governance"] }, skillDeps, registry);
    expect(r.restrictions_active).toContain("citation_required_for:fw");
    expect(r.restrictions_active).toContain("no_export_for:fw");
    expect(r.restrictions_active).toContain("no_verbatim_for:fw");
  });

  it("emits an audit entry per satisfied slot", () => {
    const r = resolveKnowledge({ id: "t1", scope: ["feature_governance"] }, skillDeps, registry);
    const ids = r.audit_log_entries_to_write.map((e) => e.source_id).sort();
    expect(ids).toContain("fw");
    expect(ids).toContain("persona");
  });
});

describe("resolveKnowledge — refusals and gaps", () => {
  it("refuses when a required source is missing (stop_and_request_source)", () => {
    const registry = new KnowledgeRegistry([makePack({ id: "persona", type: "persona" })]);
    const skillDeps = deps({
      strategic_framework: { required: true, accepted_types: ["proprietary_framework"] },
    });
    const r = resolveKnowledge({ id: "t", scope: ["general"] }, skillDeps, registry);
    expect(r.status).toBe("refused");
    expect(r.gaps).toContain("strategic_framework");
    expect(r.refusals[0]).toMatchObject({ slot: "strategic_framework", reason: "required_source_missing" });
  });

  it("continues in generic mode when fallback allows it", () => {
    const registry = new KnowledgeRegistry([]);
    const skillDeps = deps(
      { strategic_framework: { required: true, accepted_types: ["proprietary_framework"] } },
      { missing_required_source: "continue_in_generic_mode" },
    );
    const r = resolveKnowledge({ id: "t", scope: ["general"] }, skillDeps, registry);
    expect(r.status).toBe("resolved");
    expect(r.gaps).toContain("strategic_framework");
    expect(r.knowledge_dependencies_resolution.strategic_framework.fallback_applied).toBe("continue_in_generic_mode");
  });

  it("flags restricted_not_authorized when the only candidate exceeds the sensitivity ceiling", () => {
    const registry = new KnowledgeRegistry([
      makePack({ id: "secret-fw", type: "proprietary_framework", sensitivity: "restricted", scope: ["general"] }),
    ]);
    const skillDeps = deps({
      strategic_framework: { required: true, accepted_types: ["proprietary_framework"] },
    });
    const r = resolveKnowledge(
      { id: "t", scope: ["general"], maxSensitivity: "internal" },
      skillDeps,
      registry,
    );
    expect(r.status).toBe("refused");
    expect(r.refusals[0]).toMatchObject({ slot: "strategic_framework", reason: "restricted_not_authorized" });
  });

  it("treats a missing optional source as an assumption, not a refusal", () => {
    const registry = new KnowledgeRegistry([makePack({ id: "fw", type: "proprietary_framework" })]);
    const skillDeps = deps({
      strategic_framework: { required: true, accepted_types: ["proprietary_framework"] },
      personas: { required: false, accepted_types: ["persona"] },
    });
    const r = resolveKnowledge({ id: "t", scope: ["general"] }, skillDeps, registry);
    expect(r.status).toBe("resolved");
    expect(r.gaps).toContain("personas");
    expect(r.knowledge_dependencies_resolution.personas.fallback_applied).toBe("continue_with_assumption_marker");
  });

  it("respects a min_authority floor", () => {
    const registry = new KnowledgeRegistry([
      makePack({ id: "weak", type: "accessibility_guideline", authority_level: "contextual", scope: ["interface_change"] }),
    ]);
    const skillDeps = deps({
      accessibility_guidelines: {
        required: true,
        accepted_types: ["accessibility_guideline"],
        min_authority: "normative",
      },
    });
    const r = resolveKnowledge({ id: "t", scope: ["interface_change"] }, skillDeps, registry);
    expect(r.status).toBe("refused"); // weak pack is below the authority floor
  });
});

describe("resolveKnowledge — conflicts and review", () => {
  const registry = new KnowledgeRegistry([
    makePack({ id: "persona", type: "persona", authority_level: "evidence_proxy", scope: ["interface_change"], version: "0.4.0" }),
    makePack({ id: "wcag", type: "accessibility_guideline", authority_level: "normative", scope: ["interface_change"], version: "1.2.0", retrieval_mode: "excerpt_only" }),
  ]);
  const skillDeps = deps({
    personas: { required: false, accepted_types: ["persona"] },
    accessibility_guidelines: { required_when: ["interface_change"], accepted_types: ["accessibility_guideline"] },
  });

  it("resolves a declared conflict by precedence", () => {
    const r = resolveKnowledge(
      { id: "t", scope: ["interface_change"] },
      skillDeps,
      registry,
      { declaredConflicts: [{ between: ["personas", "accessibility_guidelines"], topic: "explicit form labels", conflictId: "c1" }] },
    );
    expect(r.conflicts_detected).toHaveLength(1);
    expect(r.conflicts_detected[0].prevailing_source).toBe("wcag@1.2.0");
    expect(r.conflicts_detected[0].suppressed_sources).toEqual(["persona@0.4.0"]);
  });

  it("escalates a declared conflict when the skill fallback requests it", () => {
    const escalating = deps(
      {
        personas: { required: false, accepted_types: ["persona"] },
        accessibility_guidelines: { required_when: ["interface_change"], accepted_types: ["accessibility_guideline"] },
      },
      { conflicting_sources: "escalate_to_human_review" },
    );
    const r = resolveKnowledge(
      { id: "t", scope: ["interface_change"] },
      escalating,
      registry,
      { declaredConflicts: [{ between: ["personas", "accessibility_guidelines"], topic: "labels" }] },
    );
    expect(r.conflicts_detected[0].resolved_by).toBe("escalation");
    expect(r.human_review.required).toBe(true);
  });

  it("requires human review when a selected pack's condition matches the task", () => {
    const reg = new KnowledgeRegistry([
      makePack({ id: "fw", type: "proprietary_framework", scope: ["general"], human_review_required_for: ["client_delivery"] }),
    ]);
    const sd = deps({ strategic_framework: { required: true, accepted_types: ["proprietary_framework"] } });
    const r = resolveKnowledge(
      { id: "t", scope: ["general"], humanReviewConditions: ["client_delivery"] },
      sd,
      reg,
    );
    expect(r.human_review.required).toBe(true);
    expect(r.human_review.reasons.some((x) => x.includes("client_delivery"))).toBe(true);
  });
});
