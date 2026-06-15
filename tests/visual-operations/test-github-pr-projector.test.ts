import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  projectGitHubPullRequest,
  renderGitHubPullRequestProjectionMarkdown,
  type GitHubPullRequestProjectionInput,
} from "../../engine";

function inputFixture(): GitHubPullRequestProjectionInput {
  return {
    project_id: "aletheia",
    projected_at: "2026-06-15T04:00:00Z",
    repository: {
      full_name: "nevitonsantana/AletheIA",
      url: "https://github.com/nevitonsantana/AletheIA",
    },
    pull_request: {
      number: 193,
      title: "docs: add visual operations projection",
      url: "https://github.com/nevitonsantana/AletheIA/pull/193",
      state: "closed",
      draft: false,
      author: "nevitonsantana",
      created_at: "2026-06-15T03:51:39Z",
      merged_at: "2026-06-15T03:57:36Z",
      closed_at: "2026-06-15T03:57:36Z",
      head_sha: "40c53937aae9ac587660b7974dbcb848c328a16b",
      base_ref: "main",
    },
    timeline: [
      {
        id: "ready",
        type: "ready_for_review",
        created_at: "2026-06-15T03:54:05Z",
        actor: "nevitonsantana",
        source_url: "https://github.com/nevitonsantana/AletheIA/pull/193#event-ready",
      },
      {
        id: "merged",
        type: "merged",
        created_at: "2026-06-15T03:57:36Z",
        actor: "nevitonsantana",
        source_url: "https://github.com/nevitonsantana/AletheIA/pull/193#event-merged",
      },
    ],
    checks: [
      {
        id: "governance",
        name: "Governance Check",
        status: "completed",
        conclusion: "success",
        required: true,
        completed_at: "2026-06-15T03:51:46Z",
        source_url: "https://github.com/nevitonsantana/AletheIA/actions/runs/27522883401/job/governance",
      },
      {
        id: "tests",
        name: "Tests (Vitest)",
        status: "completed",
        conclusion: "success",
        required: true,
        completed_at: "2026-06-15T03:52:26Z",
        source_url: "https://github.com/nevitonsantana/AletheIA/actions/runs/27522883401/job/tests",
      },
    ],
    findings: [
      {
        id: "regulated-sensitivity",
        severity: "warning",
        summary: "The event sensitivity vocabulary omitted the canonical regulated value.",
        created_at: "2026-06-15T03:58:11Z",
        source_url: "https://github.com/nevitonsantana/AletheIA/pull/193#discussion-regulated",
        requires_human_review: true,
      },
    ],
    author_reported_validations: [
      {
        id: "jsonl-validation",
        name: "JSONL validation",
        status: "passed",
        summary: "The PR description reports that every JSONL line parsed successfully.",
        reported_at: "2026-06-15T03:54:05Z",
        source_url: "https://github.com/nevitonsantana/AletheIA/pull/193",
      },
    ],
  };
}

describe("GitHub pull request Visual Operations projector", () => {
  it("projects a merged PR without fabricating unavailable signals", () => {
    const result = projectGitHubPullRequest(inputFixture());
    const state = result.work_slice_visual_state;

    expect(state.presentation_lane).toBe("closed");
    expect(state.lane_confidence).toBe("confirmed");
    expect(state.evidence_status).toBe("sufficient");
    expect(state.risk_level).toBe("unknown");
    expect(state.planning_depth).toBe("unknown");
    expect(state.primary_skill.activation_status).toBe("unknown");
    expect(state.runtime.session_status).toBe("unavailable");
    expect(state.telemetry.tokens.provenance).toBe("unavailable");
    expect(state.telemetry.cost.provenance).toBe("unavailable");
  });

  it("distinguishes CI-observed evidence from author-reported validation", () => {
    const evidence = projectGitHubPullRequest(inputFixture()).work_slice_visual_state.evidence;

    expect(evidence.filter((item) => item.provenance === "ci_observed")).toHaveLength(2);
    expect(evidence.filter((item) => item.provenance === "author_reported")).toHaveLength(1);
    expect(evidence.every((item) => item.source_refs.length > 0)).toBe(true);
  });

  it("links post-close findings to a follow-up slice without reopening history", () => {
    const result = projectGitHubPullRequest(inputFixture());

    expect(result.work_slice_visual_state.presentation_lane).toBe("closed");
    expect(result.follow_up_slices).toEqual([
      expect.objectContaining({
        work_slice_id: "github-pr-193-follow-up-regulated-sensitivity",
      }),
    ]);
    expect(result.work_slice_visual_state.alerts).toEqual([
      expect.objectContaining({
        type: "post_close_finding",
        follow_up_work_slice_id: "github-pr-193-follow-up-regulated-sensitivity",
      }),
    ]);
  });

  it("orders normalized events by source timestamp and preserves source refs", () => {
    const events = projectGitHubPullRequest(inputFixture()).normalized_events;
    const timestamps = events.map((item) => item.timestamp);

    expect(timestamps).toEqual([...timestamps].sort());
    expect(events.every((item) => item.source_refs.length > 0)).toBe(true);
    expect(events.find((item) => item.event_type === "alert.raised")?.payload_metadata).toMatchObject({
      post_close: true,
    });
  });

  it("projects required check failure conservatively", () => {
    const input = inputFixture();
    input.pull_request.state = "open";
    delete input.pull_request.merged_at;
    delete input.pull_request.closed_at;
    input.findings = [];
    input.checks![0].conclusion = "failure";

    const result = projectGitHubPullRequest(input);

    expect(result.work_slice_visual_state.presentation_lane).toBe("validation");
    expect(result.work_slice_visual_state.evidence_status).toBe("failed");
    expect(result.work_slice_visual_state.alerts[0]).toMatchObject({
      type: "required_validation_failed",
      severity: "critical",
    });
  });

  it("keeps author-reported validation provenance while preserving a reported failure", () => {
    const input = inputFixture();
    input.author_reported_validations![0].status = "failed";

    const state = projectGitHubPullRequest(input).work_slice_visual_state;

    expect(state.evidence_status).toBe("failed");
    expect(
      state.evidence.find((item) => item.type === "author_reported_validation"),
    ).toMatchObject({ status: "failed", provenance: "author_reported" });
  });

  it("projects an open change request into human review", () => {
    const input = inputFixture();
    input.pull_request.state = "open";
    delete input.pull_request.merged_at;
    delete input.pull_request.closed_at;
    input.findings = [];
    input.reviews = [
      {
        id: "review-1",
        state: "changes_requested",
        submitted_at: "2026-06-15T03:56:00Z",
        actor: "maintainer",
        summary: "Confirm the source-reference boundary before merge.",
        source_url: "https://github.com/nevitonsantana/AletheIA/pull/193#review-1",
      },
    ];

    const result = projectGitHubPullRequest(input);

    expect(result.work_slice_visual_state.presentation_lane).toBe("human_review");
    expect(result.work_slice_visual_state.human_review).toMatchObject({
      required: true,
      status: "pending",
      open_question: "Confirm the source-reference boundary before merge.",
    });
  });

  it("does not infer that an approved review was mandatory", () => {
    const input = inputFixture();
    input.reviews = [
      {
        id: "review-approved",
        state: "approved",
        submitted_at: "2026-06-15T03:56:00Z",
        actor: "maintainer",
        summary: "The change is approved.",
        source_url: "https://github.com/nevitonsantana/AletheIA/pull/193#review-approved",
      },
    ];

    const review = projectGitHubPullRequest(input).work_slice_visual_state.human_review;

    expect(review.required).toBe("unknown");
    expect(review.status).toBe("completed");
  });

  it("emits merge and close events from PR metadata when timeline items are absent", () => {
    const input = inputFixture();
    input.timeline = [];

    const events = projectGitHubPullRequest(input).normalized_events;

    expect(events).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ event_id: "evt-github-pr-193-metadata-merged" }),
        expect.objectContaining({ event_id: "evt-github-pr-193-metadata-closed" }),
      ]),
    );
  });

  it("renders the projection as a source-backed Markdown snapshot", () => {
    const markdown = renderGitHubPullRequestProjectionMarkdown(
      projectGitHubPullRequest(inputFixture()),
    );

    expect(markdown).toContain("Presentation lane | closed (confirmed)");
    expect(markdown).toContain("ci_observed");
    expect(markdown).toContain("author_reported");
    expect(markdown).toContain("github-pr-193-follow-up-regulated-sensitivity");
  });

  it("rejects input that cannot provide a resolvable PR source", () => {
    const input = inputFixture();
    input.pull_request.url = "";

    expect(() => projectGitHubPullRequest(input)).toThrow(
      "pull_request.url must contain a source reference",
    );
  });

  it("reconstructs the checked-in JSON and Markdown example", () => {
    const exampleDir = path.resolve(process.cwd(), "examples/visual-operations");
    const input = JSON.parse(
      fs.readFileSync(path.join(exampleDir, "github-pr-projector-input.json"), "utf8"),
    ) as GitHubPullRequestProjectionInput;
    const expectedJson = JSON.parse(
      fs.readFileSync(path.join(exampleDir, "github-pr-projector-output.json"), "utf8"),
    ) as unknown;
    const expectedMarkdown = fs.readFileSync(
      path.join(exampleDir, "github-pr-projector-output.md"),
      "utf8",
    );

    const result = projectGitHubPullRequest(input);

    expect(result).toEqual(expectedJson);
    expect(renderGitHubPullRequestProjectionMarkdown(result)).toBe(expectedMarkdown);
  });
});
