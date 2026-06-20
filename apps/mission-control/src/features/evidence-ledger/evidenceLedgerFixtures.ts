export type EvidenceFilter = "all" | "attention" | "stable" | "unavailable";
export type EvidenceTone = "critical" | "review" | "stable" | "info";
export type EvidenceOrigin = "reported" | "estimated" | "unavailable";
export type EvidenceLaneId = "review" | "validation" | "reconcile" | "closed";

export type EvidenceSource = {
  name: string;
  type: string;
  origin: EvidenceOrigin;
};

export type EvidenceTrace = {
  time: string;
  description: string;
};

export type EvidenceRecord = {
  id: string;
  reference: string;
  laneId: EvidenceLaneId;
  filterStatus: Exclude<EvidenceFilter, "all">;
  tone: EvidenceTone;
  label: string;
  title: string;
  cardSummary: string;
  sourceRefs: string[];
  inspector: {
    kicker: string;
    summary: string;
    lane: string;
    status: string;
    confidence: "Low" | "Medium" | "High" | "Unknown";
    sources: EvidenceSource[];
    trace: EvidenceTrace[];
    boundary: string;
  };
};

export type EvidenceLane = {
  id: EvidenceLaneId;
  label: string;
  tone: EvidenceTone;
  emptyMessage: string;
};

export const evidenceLanes: EvidenceLane[] = [
  { id: "review", label: "Review prompts", tone: "critical", emptyMessage: "No review prompts match this filter. Absence is a filtered view, not source truth." },
  { id: "validation", label: "Validation", tone: "review", emptyMessage: "No validation slices match this filter. Source records remain unchanged." },
  { id: "reconcile", label: "Reconcile", tone: "info", emptyMessage: "No reconcile slices match this filter. Unknown and unavailable states stay neutral." },
  { id: "closed", label: "Closed stable", tone: "stable", emptyMessage: "No closed slices match this filter. Filtering does not reopen or mutate work." },
];

export const evidenceRecords: EvidenceRecord[] = [
  {
    id: "human-review",
    reference: "WS-2026-0616-001",
    laneId: "review",
    filterStatus: "attention",
    tone: "critical",
    label: "Human review",
    title: "Critical risk signal",
    cardSummary: "Threshold breach detected. Human confirmation is required before trusting closure.",
    sourceRefs: ["SRC-2147", "PR-2.1"],
    inspector: {
      kicker: "Human review · confirmed",
      summary: "A source says human review is required before trusting closure. This is a review prompt, not an automated decision.",
      lane: "Review prompts",
      status: "Pending human review",
      confidence: "Low",
      sources: [
        { name: "SRC-2147", type: "Risk source", origin: "reported" },
        { name: "Risk Policy PR-2.1", type: "Policy reference", origin: "reported" },
        { name: "Rule R-7", type: "Rule reference", origin: "reported" },
      ],
      trace: [
        { time: "10:18", description: "Risk threshold breach normalized into visual event." },
        { time: "10:22", description: "Human review source required before closure posture can be trusted." },
      ],
      boundary: "Do not move this slice to closed without a resolving review source. The cockpit explains evidence; it does not authorize decisions.",
    },
  },
  {
    id: "conflict",
    reference: "WS-2026-0616-002",
    laneId: "review",
    filterStatus: "attention",
    tone: "review",
    label: "Conflict",
    title: "Model output mismatch",
    cardSummary: "Validation sources disagree with the policy baseline and risk thresholds.",
    sourceRefs: ["SRC-2149", "Eval 3.2"],
    inspector: {
      kicker: "Validation · conflicted",
      summary: "Validation sources disagree. The ledger preserves both source refs instead of choosing the convenient truth.",
      lane: "Review prompts",
      status: "Conflicted validation",
      confidence: "Medium",
      sources: [
        { name: "SRC-2149", type: "Validation source", origin: "reported" },
        { name: "Eval Report v3.2", type: "Evaluation output", origin: "reported" },
        { name: "Policy M-1.4", type: "Policy baseline", origin: "reported" },
      ],
      trace: [
        { time: "10:05", description: "Evaluation output diverged from policy baseline." },
        { time: "10:11", description: "Conflict surfaced as review posture, not an automated decision." },
      ],
      boundary: "Conflicted confidence is stronger than the lane label itself. Reconcile before treating this as stable.",
    },
  },
  {
    id: "validated",
    reference: "WS-2026-0615-006",
    laneId: "validation",
    filterStatus: "stable",
    tone: "stable",
    label: "Validated",
    title: "Policy update impact check",
    cardSummary: "Evidence supports the validation posture for this static example.",
    sourceRefs: ["SRC-2120", "Eval 3.1"],
    inspector: {
      kicker: "Validation · stable",
      summary: "Evidence supports the validation posture for this static example.",
      lane: "Validation",
      status: "Validated",
      confidence: "High",
      sources: [
        { name: "SRC-2120", type: "Evidence source", origin: "reported" },
        { name: "Eval v3.1", type: "Evaluation output", origin: "reported" },
      ],
      trace: [
        { time: "08:52", description: "Evaluation source attached." },
        { time: "08:58", description: "Policy impact check remained inside expected bounds." },
      ],
      boundary: "Stable still links to source refs for verification. Stability is derived, not authoritative.",
    },
  },
  {
    id: "skill",
    reference: "WS-2026-0615-004",
    laneId: "validation",
    filterStatus: "stable",
    tone: "stable",
    label: "Skill traced",
    title: "Adaptive skill activation",
    cardSummary: "Skill activation is visible as trace context, without gate or decision authority.",
    sourceRefs: ["ACT-552", "Trace"],
    inspector: {
      kicker: "Skill activation · traced",
      summary: "Skill activation is visible as trace context, without gate or decision authority.",
      lane: "Validation",
      status: "Activation tracked",
      confidence: "High",
      sources: [
        { name: "ACT-552", type: "Activation record", origin: "reported" },
        { name: "Trace Event", type: "Trace normalization", origin: "reported" },
        { name: "Skill Registry", type: "Registry reference", origin: "reported" },
      ],
      trace: [
        { time: "08:31", description: "Skill activation normalized into trace context." },
        { time: "08:35", description: "No readiness gate was changed by the activation." },
      ],
      boundary: "Skills appear as activations. They do not approve gates, close slices, or override source records.",
    },
  },
  {
    id: "telemetry",
    reference: "WS-2026-0616-003",
    laneId: "reconcile",
    filterStatus: "unavailable",
    tone: "info",
    label: "Unavailable",
    title: "Resolve missing telemetry",
    cardSummary: "Runtime, token, and cost records were not exported for this docs-only slice.",
    sourceRefs: ["Telemetry", "R-556"],
    inspector: {
      kicker: "Reconcile · unavailable",
      summary: "Optional runtime, token, or cost telemetry was not exported. This is a neutral source gap, not a failed slice.",
      lane: "Reconcile",
      status: "Telemetry unavailable",
      confidence: "Unknown",
      sources: [
        { name: "Telemetry Spec", type: "Expected source", origin: "unavailable" },
        { name: "Closeout R-556", type: "Reconcile rule", origin: "reported" },
      ],
      trace: [
        { time: "09:42", description: "Token and cost fields marked unavailable." },
        { time: "09:44", description: "No estimates generated because source origin is missing." },
      ],
      boundary: "Do not invent estimates just to complete the card. Use unavailable until a durable source exists.",
    },
  },
  {
    id: "closed-207",
    reference: "PR #207",
    laneId: "closed",
    filterStatus: "stable",
    tone: "stable",
    label: "Closed",
    title: "Human-review source mapping",
    cardSummary: "Source supports closure; review source remains represented as unavailable.",
    sourceRefs: ["PR #207", "39f76cf"],
    inspector: {
      kicker: "Closed · confirmed",
      summary: "Source records support closure while human_review remains unavailable because no durable review source was supplied.",
      lane: "Closed stable",
      status: "Closed derived posture",
      confidence: "High",
      sources: [
        { name: "PR #207", type: "Pull request", origin: "reported" },
        { name: "CI 27626141953", type: "Check run", origin: "reported" },
        { name: "Merge 39f76cf", type: "Merge ref", origin: "reported" },
      ],
      trace: [
        { time: "2026-06-16", description: "PR merged after governance and test checks." },
        { time: "2026-06-16", description: "Review source absence preserved as unavailable metadata." },
      ],
      boundary: "Closed is a presentation posture derived from sources, not a new authority.",
    },
  },
  {
    id: "closed-201",
    reference: "PR #201",
    laneId: "closed",
    filterStatus: "stable",
    tone: "stable",
    label: "Closed",
    title: "Dogfood evidence record",
    cardSummary: "Snapshot evidence supports closeout; human review absence remains visible.",
    sourceRefs: ["Dogfood", "Snapshot"],
    inspector: {
      kicker: "Closed · confirmed",
      summary: "Snapshot evidence supports closeout. Human review unavailable remains visible as honest absence of source authority.",
      lane: "Closed stable",
      status: "Closed derived posture",
      confidence: "High",
      sources: [
        { name: "PR #201", type: "Pull request", origin: "reported" },
        { name: "Dogfood snapshot", type: "Snapshot", origin: "reported" },
        { name: "Human review", type: "Review source", origin: "unavailable" },
      ],
      trace: [
        { time: "2026-06-15", description: "Dogfood snapshot recorded." },
        { time: "2026-06-15", description: "Closeout posture reconstructed from source refs." },
      ],
      boundary: "Unavailable is not failure; it is absence of authoritative source.",
    },
  },
];
