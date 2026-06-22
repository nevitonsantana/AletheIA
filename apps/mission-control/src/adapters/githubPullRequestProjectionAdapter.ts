import type { GitHubPullRequestProjection } from "../../../../engine/visual-operations-projector";
import type { EvidenceLaneId, EvidenceRecord, EvidenceTone } from "../features/evidence-ledger/evidenceLedgerTypes";

type VisualState = GitHubPullRequestProjection["work_slice_visual_state"];

function unique(values: string[]): string[] {
  return [...new Set(values.filter((value) => value.trim()))];
}

function sourceType(sourceRef: string): string {
  if (/\/pull\/\d+/.test(sourceRef)) return "Pull request";
  if (/\/actions\/runs\//.test(sourceRef)) return "Check run";
  if (/github\.com\/[^/]+\/[^/]+\/?$/.test(sourceRef)) return "Repository";
  return "Projection source";
}

function compactSourceRef(sourceRef: string): string {
  const pullRequest = sourceRef.match(/\/pull\/(\d+)/);
  if (pullRequest) return `PR #${pullRequest[1]}`;
  const job = sourceRef.match(/\/job\/(\d+)/);
  if (job) return `CI ${job[1]}`;
  const run = sourceRef.match(/\/runs\/(\d+)/);
  if (run) return `CI ${run[1]}`;
  try {
    return new URL(sourceRef).hostname;
  } catch {
    return sourceRef;
  }
}

function hasActiveReviewPrompt(state: VisualState): boolean {
  return state.human_review.status === "pending" || state.evidence_status === "failed" || state.alerts.some(
    (alert) => !alert.resolved_at && (alert.severity === "critical" || alert.severity === "warning"),
  );
}

function presentation(state: VisualState): {
  laneId: EvidenceLaneId;
  tone: EvidenceTone;
  filterStatus: EvidenceRecord["filterStatus"];
  label: string;
} {
  if (state.presentation_lane === "closed") {
    const needsAttention = hasActiveReviewPrompt(state);
    return { laneId: "closed", tone: needsAttention ? "review" : "stable", filterStatus: needsAttention ? "attention" : "stable", label: needsAttention ? "Follow-up" : "Closed" };
  }
  if (hasActiveReviewPrompt(state)) {
    return { laneId: "review", tone: state.evidence_status === "failed" ? "critical" : "review", filterStatus: "attention", label: state.evidence_status === "failed" ? "Failed" : "Human review" };
  }
  if (state.presentation_lane === "validation" || state.evidence_status === "partial" || state.evidence_status === "sufficient") {
    return { laneId: "validation", tone: "stable", filterStatus: "stable", label: "Validation" };
  }
  return { laneId: "reconcile", tone: "info", filterStatus: "unavailable", label: "Source gap" };
}

function confidence(state: VisualState): EvidenceRecord["inspector"]["confidence"] {
  if (state.lane_confidence === "confirmed") return "High";
  if (state.lane_confidence === "inferred") return "Medium";
  return "Unknown";
}

function cardSummary(state: VisualState): string {
  const activeAlert = state.alerts.find((alert) => !alert.resolved_at);
  if (activeAlert) return activeAlert.summary;
  const failedEvidence = state.evidence.find((item) => item.status === "failed");
  if (failedEvidence) return failedEvidence.summary;
  const latestEvidence = state.evidence.at(-1);
  if (latestEvidence) return latestEvidence.summary;
  return "No evidence summary is available in the projection.";
}

function statusLabel(state: VisualState): string {
  if (state.presentation_lane === "closed") return `Closed · ${state.evidence_status} evidence`;
  if (state.human_review.status === "pending") return "Pending human review";
  if (state.evidence_status === "failed") return "Validation failed";
  return `${state.presentation_lane} · ${state.evidence_status} evidence`;
}

export function adaptGitHubPullRequestProjection(projection: GitHubPullRequestProjection): EvidenceRecord {
  if (projection.projection.mode !== "read_only") {
    throw new Error("Mission Control accepts read-only projections only");
  }

  const state = projection.work_slice_visual_state;
  const display = presentation(state);
  const sourceRefs = unique([...projection.projection.source_refs, ...state.source_refs]);
  const prioritizedRefs = [...sourceRefs].sort((left, right) => {
    const rank = (value: string) => (/\/pull\/\d+/.test(value) ? 0 : /\/actions\/runs\//.test(value) ? 1 : 2);
    return rank(left) - rank(right);
  });
  const visibleRefs = prioritizedRefs.length > 0 ? prioritizedRefs.slice(0, 2).map(compactSourceRef) : ["unavailable"];
  const inspectorSources = prioritizedRefs.length > 0
    ? prioritizedRefs.slice(0, 6).map((sourceRef) => ({ name: sourceRef, type: sourceType(sourceRef), origin: "reported" as const }))
    : [{ name: "Source reference unavailable", type: "Projection source", origin: "unavailable" as const }];
  const latestEvents = projection.normalized_events.slice(-3);

  return {
    id: state.work_slice_id,
    reference: state.work_slice_id,
    ...display,
    title: state.title,
    cardSummary: cardSummary(state),
    sourceRefs: visibleRefs,
    inspector: {
      kicker: `${display.label} · ${state.lane_confidence}`,
      summary: `Read-only ${projection.projection.projector} projection generated at ${state.projected_at}.`,
      lane: display.laneId === "closed" ? "Closed stable" : display.laneId === "review" ? "Review prompts" : display.laneId === "validation" ? "Validation" : "Reconcile",
      status: statusLabel(state),
      confidence: confidence(state),
      sources: inspectorSources,
      trace: latestEvents.map((item) => ({ time: item.timestamp, description: item.summary })),
      boundary: state.presentation_lane === "closed"
        ? "Closed is a historical presentation posture derived from authoritative records. Alerts create follow-up context; they do not rewrite closure."
        : "This adapter formats existing projection data for review. It does not authorize, mutate, collect, or persist source state.",
    },
  };
}
