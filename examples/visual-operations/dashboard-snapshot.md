# Mission Control Snapshot — Synthetic Demo

> Static, read-only example generated conceptually from `sample-events.jsonl`. It is not a source of
> truth and does not demonstrate a runtime or dashboard generator.

## Project overview

| Signal | Value |
|---|---:|
| Active slices | 1 |
| Closed slices | 1 |
| Human review pending | 1 |
| Open alerts | 2 |

## Board

### Closed

#### `slice-docs-001` — Clarify the local validation guide

- Risk / planning: `low` / `lite`
- Readiness: `continue`
- Evidence: `sufficient`
- Skill: `ux-writing` — activation completed, no governance authority
- Runtime: `unavailable`
- Tokens / cost: `unavailable` / `unavailable`
- Source refs: `task-brief`, `execution-record`, `readiness-review`, `reconcile`

### Human review

#### `slice-auth-002` — Investigate an intermittent authorization test failure

- Risk / planning: `medium` / `standard`
- Readiness: `review`
- Evidence: `failed`
- Skill: `debugging` — active, no governance authority
- Runtime: `local-agent-harness` — session completed; slice not closed
- Tokens: `18,420` (`reported`)
- Cost: `unavailable`
- Human review: pending from `repository-maintainer`
- Restricted context: metadata-only reference; source content withheld
- Source refs: `task-brief`, `runtime-session-01`, `test-run-02`, `readiness-review`,
  `human-review-request`

## Open alerts

| Severity | Alert | Suggested review | Source refs |
|---|---|---|---|
| Critical | Missing passing validation | Do not close or merge until validation passes or scope is reframed. | `test-run-02`, `readiness-review` |
| Warning | Human review pending | Resolve the authorization-boundary question in the authoritative review record. | `human-review-request` |

## Trace excerpt — `slice-auth-002`

```txt
14:00 Work Slice created
14:08 Restricted context minimum met through metadata-only reference
14:12 debugging skill activated
14:15 local runtime session started
14:50 runtime session completed with partial result
14:55 focused validation failed
15:00 human review requested
15:02 readiness outcome recorded as review
15:03 critical validation alert raised
15:04 pending-review alert raised
```

## Reconstructibility note

The board placement and alerts above can be reconstructed from `sample-events.jsonl`:

- the docs slice reaches `closed` only after passing evidence, a `continue` readiness outcome, and a
  reconcile record;
- the authorization slice remains in `human_review` because validation failed and the readiness
  record requests review;
- runtime completion alone does not close the slice;
- token usage is shown because its provenance is `reported`; cost remains `unavailable`;
- restricted fixture content never enters the snapshot.
