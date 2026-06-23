import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const recordPath = path.resolve(
  process.cwd(),
  "examples/work-observatory/s7-bounded-debugging-work-record.json",
);

const record = JSON.parse(fs.readFileSync(recordPath, "utf-8")) as {
  record_kind: string;
  execution: {
    agents: Array<{ agent_id: string }>;
    subagents: unknown[];
    skills: Array<{ skill_id: string }>;
    tools: string[];
    iterations: number;
  };
  timing: { duration_seconds: { availability: string; value: number | null } };
  outcome: { accepted: boolean | "unknown"; rework_required: boolean | "unknown" };
  work: { work_units: string; quality_score: string; value_score: string };
  comparison: { eligible: boolean };
  authority: { mode: string; source_records_remain_authoritative: boolean };
  privacy: { metadata_only: boolean; stores_prompts: boolean };
  source_refs: string[];
};

describe("S14 Work Observatory dogfood record", () => {
  it("traces the actual executor, skills and tools without inventing subagents", () => {
    expect(record.execution.agents).toEqual([{ agent_id: "codex", role: "executor" }]);
    expect(record.execution.subagents).toEqual([]);
    expect(record.execution.skills.map(({ skill_id }) => skill_id)).toEqual([
      "debugging",
      "frontend-testing-debugging",
    ]);
    expect(record.execution.tools).toEqual(["exec_command", "apply_patch", "in_app_browser"]);
    expect(record.execution.iterations).toBe(1);
  });

  it("keeps unsupported work metrics unavailable and review outcomes unknown", () => {
    expect(record.timing.duration_seconds).toEqual(
      expect.objectContaining({ availability: "unavailable", value: null }),
    );
    expect(record.outcome.accepted).toBe("unknown");
    expect(record.outcome.rework_required).toBe("unknown");
    expect(record.work).toEqual({
      work_units: "unavailable",
      quality_score: "unavailable",
      value_score: "unavailable",
    });
    expect(record.comparison.eligible).toBe(false);
  });

  it("remains a metadata-only derived projection with resolvable local source refs", () => {
    expect(record.record_kind).toBe("derived_work_observation");
    expect(record.authority).toEqual(
      expect.objectContaining({
        mode: "read_only_derived_projection",
        source_records_remain_authoritative: true,
      }),
    );
    expect(record.privacy).toEqual(expect.objectContaining({ metadata_only: true, stores_prompts: false }));

    for (const ref of record.source_refs.filter((sourceRef) => !sourceRef.startsWith("https://"))) {
      expect(fs.existsSync(path.resolve(process.cwd(), ref)), `${ref} should resolve`).toBe(true);
    }
  });
});
