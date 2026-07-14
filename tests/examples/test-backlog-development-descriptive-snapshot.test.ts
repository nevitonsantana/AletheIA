import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const root = path.resolve(__dirname, "../..");
const snapshotPath = path.join(root, "examples/backlog-readiness/s48-backlog-development-descriptive-snapshot.json");

interface S48Snapshot {
  record_id: string;
  review_id: string;
  work_slice_ref: string;
  source_refs: Record<string, string>;
  cycle_scope: {
    included_work_slices: string[];
    cycle_kind: string;
  };
  descriptive_events: {
    work_slices_reviewed: number;
    prs_opened: number;
    prs_merged: number;
    status_only_closures: number;
    dependency_maintenance_prs_reconciled: number;
    real_s28_s29_usage_captures: number;
    ci_final_state: string;
    open_pr_count_at_review_time: number;
    open_issue_count_at_review_time: number;
  };
  measurement_boundary: {
    comparison_group: string;
    comparative_metrics_allowed: boolean;
    descriptive_only: boolean;
    blocked_derivations: string[];
  };
  decision: { posture: string };
  guardrails: Record<string, boolean>;
}

const readSnapshot = (): S48Snapshot => JSON.parse(fs.readFileSync(snapshotPath, "utf8")) as S48Snapshot;

describe("S48 backlog development descriptive snapshot", () => {
  it("records descriptive counters for S40-S47", () => {
    const snapshot = readSnapshot();

    expect(snapshot.record_id).toBe("BDM-20260714-001");
    expect(snapshot.review_id).toBe("s48-backlog-development-descriptive-snapshot-2026-07-14");
    expect(snapshot.work_slice_ref).toBe("S48");
    expect(snapshot.cycle_scope).toMatchObject({
      cycle_kind: "readiness_review",
    });
    expect(snapshot.cycle_scope.included_work_slices).toEqual([
      "S40",
      "S41",
      "S42",
      "S43",
      "S44",
      "S45",
      "S46",
      "S47",
    ]);
    expect(snapshot.descriptive_events).toMatchObject({
      work_slices_reviewed: 8,
      prs_opened: 16,
      prs_merged: 16,
      status_only_closures: 8,
      dependency_maintenance_prs_reconciled: 3,
      real_s28_s29_usage_captures: 1,
      ci_final_state: "success",
      open_pr_count_at_review_time: 0,
      open_issue_count_at_review_time: 0,
    });
  });

  it("does not allow S18-style comparative metrics", () => {
    const snapshot = readSnapshot();

    expect(snapshot.measurement_boundary).toMatchObject({
      comparison_group: "unavailable",
      comparative_metrics_allowed: false,
      descriptive_only: true,
    });
    expect(snapshot.measurement_boundary.blocked_derivations).toEqual(
      expect.arrayContaining([
        "success_rate",
        "productivity_score",
        "model_or_skill_ranking",
        "value_per_cost",
        "work_unit_efficiency",
      ]),
    );
    expect(snapshot.decision.posture).toBe("descriptive_snapshot_recorded");
    expect(snapshot.guardrails).toMatchObject({
      activated_s18: false,
      created_dashboard: false,
      created_collector: false,
      created_schema: false,
      authorized_runtime_2_0_implementation: false,
      changed_adaptive_skills: false,
      claimed_success_rate: false,
      claimed_productivity_score: false,
      claimed_value_metric: false,
    });
  });

  it("resolves local sources and indexes S48", () => {
    const snapshot = readSnapshot();

    for (const ref of Object.values(snapshot.source_refs)) {
      expect(fs.existsSync(path.join(root, ref)), `${ref} should resolve`).toBe(true);
    }

    const readinessIndex = fs.readFileSync(path.join(root, "examples/backlog-readiness/README.md"), "utf8");
    const backlog = fs.readFileSync(
      path.join(root, "docs/roadmaps/evolution-backlog-aletheia-adaptive-skills.md"),
      "utf8",
    );
    const systemState = fs.readFileSync(path.join(root, "SYSTEM_STATE.md"), "utf8");

    expect(readinessIndex).toContain("s48-backlog-development-descriptive-snapshot.json");
    expect(backlog).toContain("### S48 — Backlog development descriptive snapshot");
    expect(backlog).toContain("**Status:** `in review`.");
    expect(systemState).toContain("S48 Backlog development descriptive snapshot is in review");
  });
});
