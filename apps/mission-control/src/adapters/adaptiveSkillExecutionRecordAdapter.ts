import type { ResourceSignal } from "../features/resource-observatory/resourceSignalTypes";

export type AdaptiveSkillExecutionRecord = {
  record_id: string;
  recorded_at: string;
  consumer_project: string;
  work_slice_id: string;
  skill: {
    skill_id: string;
    version: string;
    source_ref: string;
  };
  mode: string;
  context: string;
  modules_activated: string[];
  trigger_matches: string[];
  result: string;
  handoff_required: boolean;
  failure_type: string | null;
  improvement_note: string;
  evidence_refs: string[];
  attribution_guess: string;
  result_mode: string;
  governance_authority: false;
};

export function adaptAdaptiveSkillExecutionRecord(record: AdaptiveSkillExecutionRecord): ResourceSignal {
  if (record.governance_authority !== false) {
    throw new Error("Adaptive Skills records cannot claim Mission Control governance authority");
  }
  if (!record.record_id.trim() || !record.skill.skill_id.trim() || !record.skill.source_ref.trim()) {
    throw new Error("Adaptive Skills records require durable record and skill source references");
  }

  const shortRevision = record.skill.source_ref.match(/\/blob\/([a-f0-9]{7,40})\//)?.[1]?.slice(0, 8) ?? "versioned";

  return {
    id: "skill-usage",
    groupId: "quality",
    label: "Skill usage",
    value: record.skill.skill_id,
    note: `${record.skill.skill_id} produced a ${record.result} execution record for this Observatory slice.`,
    sourceRef: record.record_id,
    origin: "reported",
    availability: "available",
    tone: "stable",
    kicker: `Adaptive Skills · ${record.result}`,
    interpretation: `Execution record references ${record.skill.skill_id}@${record.skill.version} (${shortRevision}). The activation is trace evidence only; AletheIA retains gate and decision authority.`,
  };
}
