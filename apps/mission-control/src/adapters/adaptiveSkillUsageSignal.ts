import executionRecordJson from "../../../../examples/visual-operations/adaptive-skills-feature-planning-dogfood-record.json";
import {
  adaptAdaptiveSkillExecutionRecord,
  type AdaptiveSkillExecutionRecord,
} from "./adaptiveSkillExecutionRecordAdapter";

export const adaptiveSkillUsageSignal = adaptAdaptiveSkillExecutionRecord(
  executionRecordJson as AdaptiveSkillExecutionRecord,
);
