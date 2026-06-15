export type GitHubCheckConclusion =
  | "success"
  | "failure"
  | "cancelled"
  | "timed_out"
  | "action_required"
  | "neutral"
  | "skipped"
  | "unknown";

export interface GitHubProjectorSourceRef {
  kind: string;
  ref: string;
}

export interface GitHubPullRequestProjectionInput {
  project_id: string;
  projected_at: string;
  repository: {
    full_name: string;
    url: string;
  };
  pull_request: {
    number: number;
    title: string;
    url: string;
    state: "open" | "closed";
    draft: boolean;
    author: string;
    created_at: string;
    merged_at?: string;
    closed_at?: string;
    head_sha: string;
    base_ref: string;
  };
  timeline?: Array<{
    id: string;
    type: "ready_for_review" | "converted_to_draft" | "merged" | "closed" | "reopened";
    created_at: string;
    actor: string;
    source_url: string;
  }>;
  checks?: Array<{
    id: string;
    name: string;
    status: "queued" | "in_progress" | "completed";
    conclusion: GitHubCheckConclusion;
    required: boolean;
    started_at?: string;
    completed_at?: string;
    source_url: string;
  }>;
  reviews?: Array<{
    id: string;
    state: "approved" | "changes_requested" | "commented" | "dismissed";
    submitted_at: string;
    actor: string;
    summary: string;
    source_url: string;
  }>;
  findings?: Array<{
    id: string;
    severity: "info" | "warning" | "critical";
    summary: string;
    created_at: string;
    source_url: string;
    requires_human_review: boolean;
    resolved_at?: string;
  }>;
  author_reported_validations?: Array<{
    id: string;
    name: string;
    status: "passed" | "failed" | "not_run";
    summary: string;
    reported_at: string;
    source_url: string;
  }>;
}

export interface VisualOperationsEvent {
  event_id: string;
  project_id: string;
  work_slice_id: string;
  timestamp: string;
  source_type: "project_record" | "external";
  event_type: string;
  actor: string;
  summary: string;
  payload_metadata: Record<string, unknown>;
  evidence_refs: string[];
  source_refs: GitHubProjectorSourceRef[];
  sensitivity: "internal";
}

export interface ProjectedEvidence {
  evidence_id: string;
  type: "ci_check" | "author_reported_validation";
  status: "passed" | "failed" | "incomplete" | "unknown";
  provenance: "ci_observed" | "author_reported";
  summary: string;
  source_refs: string[];
}

export interface ProjectedAlert {
  alert_id: string;
  type: string;
  severity: "info" | "warning" | "critical";
  summary: string;
  suggested_review: string;
  source_refs: string[];
  resolved_at: string | null;
  resolution_ref: string | null;
  follow_up_work_slice_id?: string;
}

export interface GitHubPullRequestProjection {
  projection: {
    mode: "read_only";
    projector: "github_pull_request";
    projected_at: string;
    source_refs: string[];
  };
  work_slice_visual_state: {
    work_slice_id: string;
    title: string;
    objective: "unknown";
    presentation_lane:
      | "intake"
      | "framing"
      | "validation"
      | "human_review"
      | "closed";
    lane_confidence: "confirmed" | "inferred" | "unknown";
    risk_level: "unknown";
    planning_depth: "unknown";
    readiness_outcome: "unknown";
    evidence_status: "none" | "partial" | "sufficient" | "failed" | "unknown";
    human_review: {
      required: boolean | "unknown";
      status: "pending" | "completed" | "unavailable";
      reviewer_role: "repository_reviewer" | null;
      open_question: string | null;
      source_refs: string[];
    };
    primary_skill: {
      skill_id: "unknown";
      activation_status: "unknown";
      source_refs: string[];
    };
    runtime: {
      runtime_id: "unavailable";
      session_status: "unavailable";
      source_refs: string[];
    };
    telemetry: {
      tokens: { value: null; provenance: "unavailable"; source_refs: string[] };
      cost: {
        value: null;
        currency: null;
        provenance: "unavailable";
        source_refs: string[];
      };
    };
    alerts: ProjectedAlert[];
    evidence: ProjectedEvidence[];
    source_refs: string[];
    projected_at: string;
  };
  normalized_events: VisualOperationsEvent[];
  follow_up_slices: Array<{
    work_slice_id: string;
    reason: string;
    source_refs: string[];
  }>;
}

function assertIsoDate(value: string, field: string): void {
  if (Number.isNaN(Date.parse(value))) {
    throw new Error(`${field} must be an ISO-8601 timestamp`);
  }
}

function assertSource(value: string, field: string): void {
  if (!value.trim()) {
    throw new Error(`${field} must contain a source reference`);
  }
}

function assertPresent(value: string, field: string): void {
  if (!value.trim()) throw new Error(`${field} is required`);
}

function stableId(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function event(
  input: GitHubPullRequestProjectionInput,
  suffix: string,
  timestamp: string,
  eventType: string,
  actor: string,
  summary: string,
  sourceRef: GitHubProjectorSourceRef,
  payloadMetadata: Record<string, unknown> = {},
  evidenceRefs: string[] = [],
): VisualOperationsEvent {
  return {
    event_id: `evt-github-pr-${input.pull_request.number}-${stableId(suffix)}`,
    project_id: input.project_id,
    work_slice_id: `github-pr-${input.pull_request.number}`,
    timestamp,
    source_type: "external",
    event_type: eventType,
    actor,
    summary,
    payload_metadata: payloadMetadata,
    evidence_refs: evidenceRefs,
    source_refs: [sourceRef],
    sensitivity: "internal",
  };
}

function evidenceStatus(
  input: GitHubPullRequestProjectionInput,
): GitHubPullRequestProjection["work_slice_visual_state"]["evidence_status"] {
  const checks = input.checks ?? [];
  const reportedValidations = input.author_reported_validations ?? [];
  if (
    checks.some((check) => check.conclusion === "failure" || check.conclusion === "timed_out") ||
    reportedValidations.some((validation) => validation.status === "failed")
  ) {
    return "failed";
  }

  const required = checks.filter((check) => check.required);
  const requiredPassed =
    required.length > 0 &&
    required.every((check) => check.status === "completed" && check.conclusion === "success");
  if (requiredPassed && Boolean(input.pull_request.merged_at)) return "sufficient";
  if (checks.length > 0 || (input.author_reported_validations?.length ?? 0) > 0) return "partial";
  return "none";
}

function deriveLane(
  input: GitHubPullRequestProjectionInput,
  hasPendingReview: boolean,
): Pick<
  GitHubPullRequestProjection["work_slice_visual_state"],
  "presentation_lane" | "lane_confidence"
> {
  if (input.pull_request.merged_at || (input.pull_request.state === "closed" && input.pull_request.closed_at)) {
    return { presentation_lane: "closed", lane_confidence: "confirmed" };
  }
  if (hasPendingReview) return { presentation_lane: "human_review", lane_confidence: "confirmed" };
  if ((input.checks?.length ?? 0) > 0) {
    return { presentation_lane: "validation", lane_confidence: "inferred" };
  }
  if (input.pull_request.draft) return { presentation_lane: "framing", lane_confidence: "inferred" };
  return { presentation_lane: "intake", lane_confidence: "inferred" };
}

export function projectGitHubPullRequest(
  input: GitHubPullRequestProjectionInput,
): GitHubPullRequestProjection {
  if (!input.project_id.trim()) throw new Error("project_id is required");
  if (!Number.isInteger(input.pull_request.number) || input.pull_request.number < 1) {
    throw new Error("pull_request.number must be a positive integer");
  }
  assertIsoDate(input.projected_at, "projected_at");
  assertIsoDate(input.pull_request.created_at, "pull_request.created_at");
  if (input.pull_request.merged_at) {
    assertIsoDate(input.pull_request.merged_at, "pull_request.merged_at");
  }
  if (input.pull_request.closed_at) {
    assertIsoDate(input.pull_request.closed_at, "pull_request.closed_at");
  }
  assertPresent(input.repository.full_name, "repository.full_name");
  assertPresent(input.pull_request.title, "pull_request.title");
  assertPresent(input.pull_request.author, "pull_request.author");
  assertPresent(input.pull_request.head_sha, "pull_request.head_sha");
  assertPresent(input.pull_request.base_ref, "pull_request.base_ref");
  assertSource(input.repository.url, "repository.url");
  assertSource(input.pull_request.url, "pull_request.url");

  const events: VisualOperationsEvent[] = [
    event(
      input,
      "created",
      input.pull_request.created_at,
      "work_slice.created",
      input.pull_request.author,
      `GitHub pull request #${input.pull_request.number} was opened.`,
      { kind: "github_pull_request", ref: input.pull_request.url },
      {
        repository: input.repository.full_name,
        base_ref: input.pull_request.base_ref,
        head_sha: input.pull_request.head_sha,
        draft: input.pull_request.draft,
      },
    ),
  ];

  for (const item of input.timeline ?? []) {
    assertIsoDate(item.created_at, `timeline.${item.id}.created_at`);
    assertSource(item.source_url, `timeline.${item.id}.source_url`);
    const eventType =
      item.type === "merged" || item.type === "closed"
        ? "reconcile.created"
        : "work_slice.state_observed";
    events.push(
      event(
        input,
        `timeline-${item.id}`,
        item.created_at,
        eventType,
        item.actor,
        `GitHub recorded pull request event: ${item.type}.`,
        { kind: "github_timeline_event", ref: item.source_url },
        { github_event_type: item.type },
      ),
    );
  }

  const timelineTypes = new Set((input.timeline ?? []).map((item) => item.type));
  if (input.pull_request.merged_at && !timelineTypes.has("merged")) {
    events.push(
      event(
        input,
        "metadata-merged",
        input.pull_request.merged_at,
        "reconcile.created",
        "github",
        "GitHub pull request metadata reports that the change was merged.",
        { kind: "github_pull_request", ref: input.pull_request.url },
        { github_event_type: "merged" },
      ),
    );
  }
  if (input.pull_request.closed_at && !timelineTypes.has("closed")) {
    events.push(
      event(
        input,
        "metadata-closed",
        input.pull_request.closed_at,
        "reconcile.created",
        "github",
        "GitHub pull request metadata reports that the change was closed.",
        { kind: "github_pull_request", ref: input.pull_request.url },
        { github_event_type: "closed" },
      ),
    );
  }

  const evidence: ProjectedEvidence[] = [];
  const alerts: ProjectedAlert[] = [];

  for (const check of input.checks ?? []) {
    assertSource(check.source_url, `checks.${check.id}.source_url`);
    const timestamp = check.completed_at ?? check.started_at ?? input.projected_at;
    assertIsoDate(timestamp, `checks.${check.id}.timestamp`);
    const status: ProjectedEvidence["status"] =
      check.status !== "completed"
        ? "incomplete"
        : check.conclusion === "success"
          ? "passed"
          : check.conclusion === "failure" || check.conclusion === "timed_out"
            ? "failed"
            : "unknown";
    evidence.push({
      evidence_id: `evidence-check-${stableId(check.id)}`,
      type: "ci_check",
      status,
      provenance: "ci_observed",
      summary: `${check.name}: ${check.status}/${check.conclusion}.`,
      source_refs: [check.source_url],
    });
    events.push(
      event(
        input,
        `check-${check.id}`,
        timestamp,
        status === "passed" ? "validation.passed" : status === "failed" ? "validation.failed" : "evidence.added",
        "github-actions",
        `GitHub check ${check.name} reported ${check.conclusion}.`,
        { kind: "github_check", ref: check.source_url },
        { check_name: check.name, conclusion: check.conclusion, required: check.required },
        [check.source_url],
      ),
    );
    if (status === "failed" && check.required) {
      alerts.push({
        alert_id: `alert-check-${stableId(check.id)}`,
        type: "required_validation_failed",
        severity: "critical",
        summary: `Required check ${check.name} failed.`,
        suggested_review: "Review the authoritative check result before continuing or merging.",
        source_refs: [check.source_url],
        resolved_at: null,
        resolution_ref: null,
      });
    }
  }

  for (const validation of input.author_reported_validations ?? []) {
    assertIsoDate(
      validation.reported_at,
      `author_reported_validations.${validation.id}.reported_at`,
    );
    assertSource(validation.source_url, `author_reported_validations.${validation.id}.source_url`);
    evidence.push({
      evidence_id: `evidence-author-${stableId(validation.id)}`,
      type: "author_reported_validation",
      status:
        validation.status === "passed"
          ? "passed"
          : validation.status === "failed"
            ? "failed"
            : "incomplete",
      provenance: "author_reported",
      summary: validation.summary,
      source_refs: [validation.source_url],
    });
    events.push(
      event(
        input,
        `author-validation-${validation.id}`,
        validation.reported_at,
        "evidence.added",
        input.pull_request.author,
        validation.summary,
        { kind: "github_pull_request_report", ref: validation.source_url },
        {
          validation_name: validation.name,
          validation_status: validation.status,
          provenance: "author_reported",
        },
        [validation.source_url],
      ),
    );
  }

  const closeTimestamp = input.pull_request.merged_at ?? input.pull_request.closed_at;
  const preCloseReviews = (input.reviews ?? []).filter(
    (review) => !closeTimestamp || Date.parse(review.submitted_at) <= Date.parse(closeTimestamp),
  );
  const requestedChanges = preCloseReviews.filter((review) => review.state === "changes_requested");
  const approvedReviews = preCloseReviews.filter((review) => review.state === "approved");

  for (const review of input.reviews ?? []) {
    assertIsoDate(review.submitted_at, `reviews.${review.id}.submitted_at`);
    assertSource(review.source_url, `reviews.${review.id}.source_url`);
    events.push(
      event(
        input,
        `review-${review.id}`,
        review.submitted_at,
        review.state === "changes_requested" ? "human_review.requested" : "human_review.completed",
        review.actor,
        review.summary,
        { kind: "github_review", ref: review.source_url },
        { review_state: review.state },
      ),
    );
  }

  if (requestedChanges.length > 0) {
    alerts.push({
      alert_id: "alert-review-changes-requested",
      type: "human_review_pending",
      severity: "warning",
      summary: "A GitHub review requested changes before closure.",
      suggested_review: "Resolve the authoritative review or record why it no longer blocks the slice.",
      source_refs: requestedChanges.map((review) => review.source_url),
      resolved_at: null,
      resolution_ref: null,
    });
  }

  const followUps: GitHubPullRequestProjection["follow_up_slices"] = [];
  for (const finding of input.findings ?? []) {
    assertIsoDate(finding.created_at, `findings.${finding.id}.created_at`);
    assertSource(finding.source_url, `findings.${finding.id}.source_url`);
    const postClose = Boolean(closeTimestamp && Date.parse(finding.created_at) > Date.parse(closeTimestamp));
    const followUpId = postClose
      ? `github-pr-${input.pull_request.number}-follow-up-${stableId(finding.id)}`
      : undefined;
    if (followUpId) {
      followUps.push({
        work_slice_id: followUpId,
        reason: finding.summary,
        source_refs: [finding.source_url],
      });
    }
    alerts.push({
      alert_id: `alert-finding-${stableId(finding.id)}`,
      type: postClose ? "post_close_finding" : "review_finding",
      severity: finding.severity,
      summary: finding.summary,
      suggested_review: postClose
        ? "Track this finding in the linked follow-up slice; do not rewrite the closed historical lane."
        : "Review the finding against the authoritative pull request evidence.",
      source_refs: [finding.source_url],
      resolved_at: finding.resolved_at ?? null,
      resolution_ref: null,
      ...(followUpId ? { follow_up_work_slice_id: followUpId } : {}),
    });
    events.push(
      event(
        input,
        `finding-${finding.id}`,
        finding.created_at,
        "alert.raised",
        "github-review",
        finding.summary,
        { kind: "github_finding", ref: finding.source_url },
        {
          severity: finding.severity,
          requires_human_review: finding.requires_human_review,
          post_close: postClose,
          follow_up_work_slice_id: followUpId,
        },
      ),
    );
  }

  const preCloseReviewFindings = (input.findings ?? []).filter(
    (finding) =>
      finding.requires_human_review &&
      !finding.resolved_at &&
      (!closeTimestamp || Date.parse(finding.created_at) <= Date.parse(closeTimestamp)),
  );
  const hasPendingReview = requestedChanges.length > 0 || preCloseReviewFindings.length > 0;
  const lane = deriveLane(input, hasPendingReview);
  const reviewRefs = [
    ...requestedChanges.map((review) => review.source_url),
    ...approvedReviews.map((review) => review.source_url),
    ...preCloseReviewFindings.map((finding) => finding.source_url),
  ];
  const sourceRefs = [
    input.repository.url,
    input.pull_request.url,
    ...(input.timeline ?? []).map((item) => item.source_url),
    ...(input.checks ?? []).map((check) => check.source_url),
    ...(input.reviews ?? []).map((review) => review.source_url),
    ...(input.findings ?? []).map((finding) => finding.source_url),
  ];

  return {
    projection: {
      mode: "read_only",
      projector: "github_pull_request",
      projected_at: input.projected_at,
      source_refs: [input.pull_request.url],
    },
    work_slice_visual_state: {
      work_slice_id: `github-pr-${input.pull_request.number}`,
      title: input.pull_request.title,
      objective: "unknown",
      ...lane,
      risk_level: "unknown",
      planning_depth: "unknown",
      readiness_outcome: "unknown",
      evidence_status: evidenceStatus(input),
      human_review: {
        required: hasPendingReview ? true : "unknown",
        status: hasPendingReview ? "pending" : approvedReviews.length > 0 ? "completed" : "unavailable",
        reviewer_role: reviewRefs.length > 0 ? "repository_reviewer" : null,
        open_question: hasPendingReview
          ? (requestedChanges[0]?.summary ?? preCloseReviewFindings[0]?.summary ?? null)
          : null,
        source_refs: reviewRefs,
      },
      primary_skill: { skill_id: "unknown", activation_status: "unknown", source_refs: [] },
      runtime: { runtime_id: "unavailable", session_status: "unavailable", source_refs: [] },
      telemetry: {
        tokens: { value: null, provenance: "unavailable", source_refs: [] },
        cost: { value: null, currency: null, provenance: "unavailable", source_refs: [] },
      },
      alerts,
      evidence,
      source_refs: [...new Set(sourceRefs)],
      projected_at: input.projected_at,
    },
    normalized_events: events.sort(
      (left, right) => left.timestamp.localeCompare(right.timestamp) || left.event_id.localeCompare(right.event_id),
    ),
    follow_up_slices: followUps,
  };
}

export function renderGitHubPullRequestProjectionMarkdown(
  projection: GitHubPullRequestProjection,
): string {
  const escapeCell = (value: string): string => value.replaceAll("|", "\\|").replaceAll("\n", " ");
  const state = projection.work_slice_visual_state;
  const evidenceRows = state.evidence.length
    ? state.evidence
        .map(
          (item) =>
            `| ${escapeCell(item.summary)} | ${item.status} | ${item.provenance} | ${item.source_refs.join(", ")} |`,
        )
        .join("\n")
    : "| No evidence supplied | unknown | unavailable | — |";
  const alertRows = state.alerts.length
    ? state.alerts
        .map(
          (item) =>
            `| ${item.severity} | ${item.type} | ${escapeCell(item.summary)} | ${item.source_refs.join(", ")} |`,
        )
        .join("\n")
    : "| info | none | No projected alerts. | — |";
  const followUpRows = projection.follow_up_slices.length
    ? projection.follow_up_slices
        .map(
          (item) =>
            `| ${item.work_slice_id} | ${escapeCell(item.reason)} | ${item.source_refs.join(", ")} |`,
        )
        .join("\n")
    : "| none | No follow-up slice projected. | — |";

  return `# Visual Operations Snapshot — ${state.work_slice_id}

> Read-only projection generated at ${state.projected_at}. Source records remain authoritative.

## State

| Field | Value |
|---|---|
| Title | ${escapeCell(state.title)} |
| Presentation lane | ${state.presentation_lane} (${state.lane_confidence}) |
| Evidence status | ${state.evidence_status} |
| Risk | ${state.risk_level} |
| Planning depth | ${state.planning_depth} |
| Readiness outcome | ${state.readiness_outcome} |
| Human review | ${state.human_review.status} |
| Runtime | ${state.runtime.session_status} |
| Tokens | ${state.telemetry.tokens.provenance} |
| Cost | ${state.telemetry.cost.provenance} |

## Evidence

| Evidence | Status | Provenance | Source refs |
|---|---|---|---|
${evidenceRows}

## Alerts

| Severity | Type | Summary | Source refs |
|---|---|---|---|
${alertRows}

## Follow-up slices

| Work Slice | Reason | Source refs |
|---|---|---|
${followUpRows}
`;
}
