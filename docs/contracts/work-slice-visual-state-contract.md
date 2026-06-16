# Work Slice Visual State Contract

> Posture: `docs_first`, `read_only_projection`. This contract defines presentation lanes and a
> derived card shape. It does not define a Work Slice lifecycle or state machine.

## Purpose

Define how a cockpit may summarize one governed Work Slice without replacing its task, decision,
execution, readiness, handoff, restart, telemetry, or learning records.

## Non-goals

- no new canonical Work Slice schema;
- no automatic transition or board mutation semantics;
- no replacement for readiness outcomes;
- no requirement that every slice pass through every lane;
- no inference of success from activity, token usage, or a runtime completion event.

## Presentation lanes

```txt
intake
framing
context_ready
planning
execution
validation
human_review
reconcile
closed
blocked
```

These lanes are a visual grouping vocabulary. A slice can skip lanes, return to an earlier lane, or
remain outside the board if the source artifacts do not support a useful projection.

## Derived state shape

```yaml
work_slice_visual_state:
  work_slice_id:
  title:
  objective:
  presentation_lane:
  lane_confidence: confirmed | inferred | conflicted | unknown
  risk_level: low | medium | high | critical | unknown
  planning_depth: lite | standard | high_assurance | unknown
  readiness_outcome: continue | tighten | review | handoff | escalate | stop | unknown
  evidence_status: none | partial | sufficient | failed | inconclusive | unknown
  human_review:
    required: true | false | unknown
    status: not_requested | pending | completed | unavailable
    reviewer_role:
    open_question:
    source_refs: []
  primary_skill:
    skill_id:
    activation_status: active | completed | unavailable | unknown
    source_refs: []
  runtime:
    runtime_id:
    session_status: active | completed | failed | stopped | unavailable | unknown
    source_refs: []
  telemetry:
    tokens:
      value:
      provenance: reported | estimated | unavailable
      source_refs: []
    cost:
      value:
      currency:
      provenance: reported | estimated | unavailable
      source_refs: []
  alerts: []
  evidence: []
  source_refs: []
  projected_at:
```

Every entry in `alerts` and `evidence` must carry its own `source_refs`.

## Lane derivation guidance

| Lane | Minimum supporting signal |
|---|---|
| `intake` | A Work Slice or candidate exists but framing is incomplete |
| `framing` | Objective, scope, risk, or non-goals are being made explicit |
| `context_ready` | Context minimum is recorded as adequate for the next step |
| `planning` | A plan, spec bundle, pattern selection, or readiness preparation is active |
| `execution` | An authoritative execution record or runtime session is active |
| `validation` | Execution output exists and required evidence is being checked |
| `human_review` | An authoritative source requires or requests human review |
| `reconcile` | Closeout, learning, documentation, or continuity reconciliation is active |
| `closed` | The authoritative slice record reports closure with required evidence |
| `blocked` | A gate, policy, missing authority, failure, or stop condition prevents progress |

Activity alone is insufficient. For example, `runtime.session_completed` does not derive `closed`;
the evidence and authoritative closure record must support that lane.

## Precedence and conflicts

1. Explicit project or AletheIA records outrank a lane inferred from low-level runtime activity.
2. A current `stop`, unresolved block, or pending mandatory human review prevents a confident
   `closed` lane.
3. Conflicting authoritative records produce `lane_confidence: conflicted` plus an alert containing
   all relevant `source_refs`.
4. If no rule is sufficiently supported, use `presentation_lane: intake` only when a candidate
   record exists; otherwise use `unknown` in projections that permit it.

## Evidence posture

- `none`: no evidence references exist;
- `partial`: some expected evidence exists, but the source requirements are incomplete;
- `sufficient`: the authoritative validation or review record says the evidence is enough;
- `failed`: required evidence records a failure;
- `inconclusive`: evidence conflicts or cannot establish the claim;
- `unknown`: the projection cannot determine the posture.

The cockpit does not promote `partial` to `sufficient` by counting artifacts.

## Alerts

A derived alert must contain:

```yaml
alert:
  alert_id:
  type:
  severity: info | warning | critical
  summary:
  suggested_review:
  source_refs: []
  resolved_at:
  resolution_ref:
```

Alerts request attention. They do not authorize, deny, close, or reopen work.

## Related

- [Work Slice Pattern](../concepts/work-slice-pattern.md)
- [Readiness Gates Spec](readiness-gates-spec.md)
- [Slice Telemetry Model](slice-telemetry-model.md)
- [Visual Operations Event Model](visual-operations-event-model.md)
- [Visual Operations Human Review Source Mapping](../reference/visual-operations-human-review-source-mapping.md)
