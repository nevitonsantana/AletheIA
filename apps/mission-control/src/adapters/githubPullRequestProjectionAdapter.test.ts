import { describe, expect, it } from "vitest";
import pr207ProjectionJson from "../../../../examples/visual-operations/github-pr-207-dogfood-output.json";
import type { GitHubPullRequestProjection } from "../../../../engine/visual-operations-projector";
import { adaptGitHubPullRequestProjection } from "./githubPullRequestProjectionAdapter";

const pr207Projection = pr207ProjectionJson as GitHubPullRequestProjection;

function projectionWith(
  state: Partial<GitHubPullRequestProjection["work_slice_visual_state"]>,
): GitHubPullRequestProjection {
  return {
    ...pr207Projection,
    work_slice_visual_state: {
      ...pr207Projection.work_slice_visual_state,
      ...state,
    },
  };
}

describe("GitHub pull request projection adapter", () => {
  it("maps a versioned closed projection without losing its sources or trace", () => {
    const record = adaptGitHubPullRequestProjection(pr207Projection);

    expect(record).toMatchObject({
      id: "github-pr-207",
      laneId: "closed",
      filterStatus: "stable",
      label: "Closed",
      title: "docs(visual-ops): map human review sources",
      sourceRefs: ["PR #207", "CI 81688153415"],
      inspector: {
        confidence: "High",
        status: "Closed · sufficient evidence",
      },
    });
    expect(record.inspector.sources.some((source) => source.name.endsWith("/pull/207"))).toBe(true);
    expect(record.inspector.trace).toHaveLength(3);
    expect(record.inspector.trace.at(-1)?.description).toContain("merged");
  });

  it("keeps historical closure while exposing unresolved alerts as follow-up", () => {
    const record = adaptGitHubPullRequestProjection(projectionWith({
      alerts: [{
        alert_id: "alert-post-close",
        type: "post_close_review",
        severity: "warning",
        summary: "A later source requires review.",
        suggested_review: "Inspect the later source.",
        source_refs: ["https://github.com/nevitonsantana/AletheIA/pull/207"],
        resolved_at: null,
        resolution_ref: null,
      }],
    }));

    expect(record).toMatchObject({ laneId: "closed", filterStatus: "attention", label: "Follow-up" });
    expect(record.cardSummary).toBe("A later source requires review.");
  });

  it("routes pending human review to review prompts", () => {
    const record = adaptGitHubPullRequestProjection(projectionWith({
      presentation_lane: "validation",
      human_review: {
        required: true,
        status: "pending",
        reviewer_role: "repository_reviewer",
        open_question: "Can closure be trusted?",
        source_refs: ["https://github.com/nevitonsantana/AletheIA/pull/207"],
      },
    }));

    expect(record).toMatchObject({ laneId: "review", filterStatus: "attention", label: "Human review" });
  });

  it("shows missing source data as unavailable instead of inventing provenance", () => {
    const projection = projectionWith({
      presentation_lane: "intake",
      lane_confidence: "unknown",
      evidence_status: "unknown",
      evidence: [],
      source_refs: [],
    });
    projection.projection = { ...projection.projection, source_refs: [] };

    const record = adaptGitHubPullRequestProjection(projection);

    expect(record).toMatchObject({
      laneId: "reconcile",
      filterStatus: "unavailable",
      sourceRefs: ["unavailable"],
      inspector: { confidence: "Unknown" },
    });
    expect(record.inspector.sources).toEqual([{
      name: "Source reference unavailable",
      type: "Projection source",
      origin: "unavailable",
    }]);
  });

  it("rejects projections that are not read-only", () => {
    const projection = {
      ...pr207Projection,
      projection: { ...pr207Projection.projection, mode: "write" },
    } as unknown as GitHubPullRequestProjection;

    expect(() => adaptGitHubPullRequestProjection(projection)).toThrow("read-only projections only");
  });
});
