import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

type WorkRecord = {
  record_kind: string;
  work_record_id: string;
  execution: {
    agents: Array<{ agent_id: string; role: string }>;
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

const recordsDir = path.resolve(process.cwd(), "examples/work-observatory");
const records = fs
  .readdirSync(recordsDir)
  .filter((fileName) => fileName.endsWith("-work-record.json"))
  .map((fileName) => ({
    fileName,
    record: JSON.parse(fs.readFileSync(path.join(recordsDir, fileName), "utf-8")) as WorkRecord,
  }));

const s7Record = records.find(({ fileName }) => fileName === "s7-bounded-debugging-work-record.json")?.record;
const s12Record = records.find(({ fileName }) => fileName === "s12-agent-role-reconciliation-work-record.json")?.record;
const s25Record = records.find(({ fileName }) => fileName === "s25-human-expertise-learning-work-record.json")?.record;
const s21Record = records.find(({ fileName }) => fileName === "s21-independent-validation-work-record.json")?.record;

describe("Work Observatory dogfood records", () => {
  it("keeps every record a metadata-only derived projection with resolvable local source refs", () => {
    expect(records.map(({ fileName }) => fileName).sort()).toEqual([
      "s12-agent-role-reconciliation-work-record.json",
      "s21-independent-validation-work-record.json",
      "s25-human-expertise-learning-work-record.json",
      "s7-bounded-debugging-work-record.json",
    ]);

    for (const { record } of records) {
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
    }
  });

  it("keeps unsupported work metrics unavailable and review outcomes unknown", () => {
    for (const { record } of records) {
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
    }
  });

  it("traces the S7 executor, skills and tools without inventing subagents", () => {
    expect(s7Record).toBeDefined();
    expect(s7Record?.execution.agents).toEqual([{ agent_id: "codex", role: "executor" }]);
    expect(s7Record?.execution.subagents).toEqual([]);
    expect(s7Record?.execution.skills.map(({ skill_id }) => skill_id)).toEqual([
      "debugging",
      "frontend-testing-debugging",
    ]);
    expect(s7Record?.execution.tools).toEqual(["exec_command", "apply_patch", "in_app_browser"]);
    expect(s7Record?.execution.iterations).toBe(1);
  });

  it("traces the S12 role reconciliation as a docs-first governance slice", () => {
    expect(s12Record).toBeDefined();
    expect(s12Record?.work_record_id).toBe("work-record-2026-07-02-s12-agent-role-001");
    expect(s12Record?.execution.agents).toEqual([
      { agent_id: "codex", role: "executor", role_projection: "software_engineer" },
    ]);
    expect(s12Record?.execution.subagents).toEqual([]);
    expect(s12Record?.execution.skills).toEqual([]);
    expect(s12Record?.execution.tools).toEqual(["exec_command", "apply_patch"]);
  });
});


// S25 stays source-backed: it records learning evidence, not automatic self-evolution.
describe("S25 Work Observatory dogfood record", () => {
  it("traces human expertise and evidence learning without unlocking automation", () => {
    expect(s25Record).toBeDefined();
    expect(s25Record?.work_record_id).toBe("work-record-2026-07-02-s25-human-expertise-001");
    expect(s25Record?.execution.subagents).toEqual([]);
    expect(s25Record?.execution.skills).toEqual([]);
    expect(s25Record?.execution.tools).toEqual(["exec_command", "apply_patch"]);
    expect(s25Record?.comparison.eligible).toBe(false);
  });
});


// S21 records independent validation hardening without treating critic review as proof.
describe("S21 Work Observatory dogfood record", () => {
  it("traces independent validation hardening without unlocking comparison", () => {
    expect(s21Record).toBeDefined();
    expect(s21Record?.work_record_id).toBe("work-record-2026-07-02-s21-independent-validation-001");
    expect(s21Record?.execution.subagents).toEqual([]);
    expect(s21Record?.execution.skills).toEqual([]);
    expect(s21Record?.execution.tools).toEqual(["exec_command", "apply_patch"]);
    expect(s21Record?.comparison.eligible).toBe(false);
  });
});
