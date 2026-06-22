import { describe, expect, it } from "vitest";
import executionRecordJson from "../../../../examples/visual-operations/adaptive-skills-feature-planning-dogfood-record.json";
import {
  adaptAdaptiveSkillExecutionRecord,
  type AdaptiveSkillExecutionRecord,
} from "./adaptiveSkillExecutionRecordAdapter";

const executionRecord = executionRecordJson as AdaptiveSkillExecutionRecord;

describe("Adaptive Skills execution record adapter", () => {
  it("maps a durable skill activation into a sourced Observatory signal", () => {
    expect(adaptAdaptiveSkillExecutionRecord(executionRecord)).toMatchObject({
      id: "skill-usage",
      groupId: "quality",
      value: "feature-planning",
      sourceRef: "as-exec-2026-06-22-mission-control-001",
      origin: "reported",
      availability: "available",
      tone: "stable",
      executionContext: [
        { label: "Mode", value: "workflow/extended" },
        { label: "Result", value: "usable" },
        { label: "Modules", value: "dependencies-map, risk-review, traceability-and-anti-overengineering, scope-boundaries" },
        { label: "Handoff", value: "required" },
      ],
    });
    expect(adaptAdaptiveSkillExecutionRecord(executionRecord).evidenceRefs).toContain("https://github.com/nevitonsantana/AletheIA/pull/248");
  });

  it("keeps Adaptive Skills advisory by rejecting governance authority claims", () => {
    const invalidRecord = {
      ...executionRecord,
      governance_authority: true,
    } as unknown as AdaptiveSkillExecutionRecord;

    expect(() => adaptAdaptiveSkillExecutionRecord(invalidRecord)).toThrow("cannot claim Mission Control governance authority");
  });

  it("requires durable record and canonical skill references", () => {
    const invalidRecord = {
      ...executionRecord,
      skill: { ...executionRecord.skill, source_ref: "" },
    };

    expect(() => adaptAdaptiveSkillExecutionRecord(invalidRecord)).toThrow("require durable record and skill source references");
  });
});
