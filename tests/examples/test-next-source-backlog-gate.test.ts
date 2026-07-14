import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const root = path.resolve(__dirname, "../..");
const gatePath = path.join(root, "examples/backlog-readiness/s49-next-source-gate.json");

interface S49Gate {
  record_id: string;
  review_id: string;
  work_slice_ref: string;
  source_refs: Record<string, string>;
  current_posture: {
    active_work_slice_before_s49: string;
    open_prs_at_review_time: number;
    open_issues_at_review_time: number;
    backlog_end_marker_before_s49: string;
    s18_status: string;
  };
  admissible_next_sources: Array<{
    source_kind: string;
    entry_criteria: string;
    required_handling: string;
  }>;
  non_triggers: string[];
  decision: { posture: string; next_safe_step: string };
  guardrails: Record<string, boolean>;
}

const readGate = (): S49Gate => JSON.parse(fs.readFileSync(gatePath, "utf8")) as S49Gate;

describe("S49 next-source backlog gate", () => {
  it("defines admissible sources without reopening blocked tracks", () => {
    const gate = readGate();

    expect(gate.record_id).toBe("BRG-20260714-001");
    expect(gate.review_id).toBe("s49-next-source-gate-2026-07-14");
    expect(gate.work_slice_ref).toBe("S49");
    expect(gate.current_posture).toMatchObject({
      active_work_slice_before_s49: "none",
      open_prs_at_review_time: 0,
      open_issues_at_review_time: 0,
      backlog_end_marker_before_s49: "S48",
      s18_status: "deferred",
    });

    expect(gate.admissible_next_sources.map((source) => source.source_kind)).toEqual([
      "real_work_slice",
      "dependency_or_tooling_pr",
      "source_backed_documentation_gap",
      "new_external_reference_pack",
      "future_backlog_development_cycle",
    ]);
    expect(gate.decision.posture).toBe("next_source_gate_defined");
  });

  it("keeps planning and templates from counting as real evidence", () => {
    const gate = readGate();

    expect(gate.non_triggers).toEqual(
      expect.arrayContaining([
        "a desire to keep moving without a concrete source",
        "synthetic examples or templates by themselves",
        "planning-only records counted as real S28/S29 usage",
      ]),
    );
    expect(gate.guardrails).toMatchObject({
      activated_s18: false,
      created_dashboard: false,
      created_collector: false,
      created_schema: false,
      authorized_runtime_2_0_implementation: false,
      changed_adaptive_skills: false,
      created_new_domain_pack: false,
      claimed_real_usage_evidence: false,
      claimed_success_rate: false,
      claimed_productivity_score: false,
    });
  });

  it("is indexed by local documentation", () => {
    const gate = readGate();

    for (const ref of Object.values(gate.source_refs)) {
      expect(fs.existsSync(path.join(root, ref)), `${ref} should resolve`).toBe(true);
    }

    const readinessIndex = fs.readFileSync(path.join(root, "examples/backlog-readiness/README.md"), "utf8");
    const backlog = fs.readFileSync(
      path.join(root, "docs/roadmaps/evolution-backlog-aletheia-adaptive-skills.md"),
      "utf8",
    );
    const systemState = fs.readFileSync(path.join(root, "SYSTEM_STATE.md"), "utf8");

    expect(readinessIndex).toContain("s49-next-source-gate.json");
    expect(backlog).toContain("### S49 — Next-source backlog gate");
    expect(backlog).toContain("**Status:** `in review`.");
    expect(systemState).toContain("S49 Next-source backlog gate is in review");
  });
});
