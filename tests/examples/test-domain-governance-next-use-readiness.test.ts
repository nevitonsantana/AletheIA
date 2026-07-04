import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const root = path.resolve(__dirname, "../..");
const readinessPath = path.join(root, "examples/domain-governance-usage/s37-domain-governance-next-use-readiness.json");

interface S37Readiness {
  review_id: string;
  work_slice_ref: string;
  source_refs: Record<string, string>;
  readiness_status: {
    is_real_usage_evidence: boolean;
    evidence_source: string;
    repeated_real_usage_available: boolean;
    posture: string;
  };
  next_use_entry_criteria: Array<{ criterion: string; required: boolean }>;
  candidate_future_triggers: Array<{
    trigger: string;
    capture_with_s35_template: boolean;
  }>;
  non_triggers: string[];
  expansion_gate: {
    current_state: string;
    forbidden_in_s37: string[];
  };
  decision: {
    posture: string;
  };
  guardrails: Record<string, boolean>;
}

const readReadiness = (): S37Readiness => JSON.parse(fs.readFileSync(readinessPath, "utf8")) as S37Readiness;

describe("S37 domain governance next-use readiness", () => {
  it("defines next-use readiness without counting as real usage evidence", () => {
    const readiness = readReadiness();

    expect(readiness.review_id).toBe("s37-domain-governance-next-use-readiness-2026-07-04");
    expect(readiness.work_slice_ref).toBe("S37");
    expect(readiness.readiness_status).toMatchObject({
      is_real_usage_evidence: false,
      evidence_source: "readiness_review",
      repeated_real_usage_available: false,
      posture: "wait_for_real_work_slice",
    });
    expect(readiness.decision.posture).toBe("readiness_only");
    expect(readiness.non_triggers).toEqual(expect.arrayContaining(["creating a synthetic usage example"]));
  });

  it("keeps future capture gated to real source-backed work", () => {
    const readiness = readReadiness();

    expect(readiness.next_use_entry_criteria.length).toBeGreaterThanOrEqual(4);
    expect(readiness.next_use_entry_criteria.every((criterion) => criterion.required)).toBe(true);
    expect(readiness.candidate_future_triggers.map((entry) => entry.trigger)).toEqual(
      expect.arrayContaining([
        "agent_or_tool_prompt_injection_review",
        "web_api_or_auth_boundary_change",
        "dependency_or_ci_supply_chain_boundary",
        "secrets_or_tenant_data_exposure_review",
      ]),
    );
    expect(readiness.candidate_future_triggers.every((entry) => entry.capture_with_s35_template)).toBe(true);
    expect(readiness.expansion_gate).toMatchObject({
      current_state: "blocked",
    });
  });

  it("keeps expansion guardrails off and resolves source refs", () => {
    const readiness = readReadiness();

    for (const ref of Object.values(readiness.source_refs)) {
      expect(fs.existsSync(path.join(root, ref)), `${ref} should resolve`).toBe(true);
    }

    expect(readiness.expansion_gate.forbidden_in_s37).toEqual(
      expect.arrayContaining([
        "new_domain_pack",
        "scanner",
        "policy_engine",
        "runtime_enforcement",
        "dashboard",
        "schema",
        "adaptive_skills_change",
        "s18_activation",
      ]),
    );
    expect(readiness.guardrails).toMatchObject({
      created_new_domain_pack: false,
      created_scanner: false,
      created_policy_engine: false,
      created_runtime_enforcement: false,
      created_dashboard: false,
      created_schema: false,
      changed_adaptive_skills: false,
      activated_s18: false,
      claimed_real_usage: false,
      claimed_repeated_usage: false,
      claimed_success_rate: false,
      claimed_security_proof: false,
    });
  });

  it("indexes the readiness review", () => {
    const examplesIndex = fs.readFileSync(path.join(root, "examples/README.md"), "utf8");
    const reviewIndex = fs.readFileSync(path.join(root, "examples/domain-governance-usage/README.md"), "utf8");
    const backlog = fs.readFileSync(
      path.join(root, "docs/roadmaps/evolution-backlog-aletheia-adaptive-skills.md"),
      "utf8",
    );
    const systemState = fs.readFileSync(path.join(root, "SYSTEM_STATE.md"), "utf8");

    expect(examplesIndex).toContain("readiness S37");
    expect(reviewIndex).toContain("s37-domain-governance-next-use-readiness.json");
    expect(backlog).toContain("### S37 — Domain Governance Next-Use Readiness Review");
    expect(backlog).toContain("Status:** `in-review`");
    expect(systemState).toContain("S37 Domain Governance Next-Use Readiness Review is in review");
  });
});
