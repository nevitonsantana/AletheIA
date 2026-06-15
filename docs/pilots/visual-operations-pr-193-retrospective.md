# Visual Operations Retrospective — PR #193

## Goal

Test whether the docs-first Visual Operations vocabulary can reconstruct one real AletheIA Work
Slice from durable repository and GitHub evidence, while leaving unavailable signals explicit.

The subject is [PR #193 — `docs: add visual operations projection`](https://github.com/nevitonsantana/AletheIA/pull/193),
the change that introduced the first Visual Operations contracts, templates, and synthetic example.

This report is field evidence, not a new contract.

## Test boundary

The reconstruction used only durable sources available from the repository or GitHub:

- commit [`40c5393`](https://github.com/nevitonsantana/AletheIA/commit/40c53937aae9ac587660b7974dbcb848c328a16b);
- PR #193 metadata, description, timeline, reviews, and review threads;
- GitHub Actions run [`27522883401`](https://github.com/nevitonsantana/AletheIA/actions/runs/27522883401);
- merge commit [`88fc7b2`](https://github.com/nevitonsantana/AletheIA/commit/88fc7b24924cd92f7b6a41951b3514cca28c7298);
- the merged Visual Operations contracts and synthetic example.

Private conversation content, local runtime traces, and provider telemetry were intentionally not
copied into this report.

## Reconstructed timeline

| Time (UTC) | Normalized observation | Durable source |
|---|---|---|
| 03:50:43 | The implementation commit was created. | commit `40c5393` |
| 03:51:39 | PR #193 was opened as a draft. | PR metadata |
| 03:51:42 | The pull-request CI run started. | Actions run `27522883401` |
| 03:51:46 | Governance validation passed. | Governance Check job |
| 03:51:47 | Lockfile synchronization check passed. | Lockfile sync job |
| 03:52:03 | TypeScript no-emit validation passed. | Install & TypeScript Build job |
| 03:52:26 | Vitest passed. | Tests job |
| 03:52:37 | The aggregate quality gate passed. | Quality Gate job |
| 03:54:05 | The PR was marked ready for review. | PR timeline `ready_for_review` event |
| 03:57:36 | The PR was merged and closed. | PR timeline `merged` and `closed` events |
| 03:58:11 | Automated review recorded a P2 sensitivity-vocabulary finding. | Codex review thread |

The last event is important: a Work Slice can be closed while a later review still produces a valid
follow-up signal. `closed` therefore cannot mean “no future findings”; it means the authoritative
change boundary was closed.

## Projected Work Slice state

| Field | Reconstructed value | Confidence and source |
|---|---|---|
| Work Slice ID | `github-pr-193` | Local reconstruction identifier; no canonical slice ID was recorded in the PR |
| Title | `docs: add visual operations projection` | Confirmed by PR metadata |
| Presentation lane | `closed` | Confirmed by merged and closed timeline events |
| Lane confidence | `confirmed` | Durable GitHub state |
| Risk level | `unknown` | No explicit risk record was linked from the PR |
| Planning depth | `unknown` | No explicit planning-depth record was linked from the PR |
| Readiness outcome | `unknown` | CI passed and merge occurred, but no readiness-review artifact recorded a canonical outcome |
| Evidence status | `sufficient` | Inferred from five passing required checks plus accepted merge |
| Human review required | `unknown` | No durable source declared the requirement |
| Human review status | `unavailable` | GitHub recorded no review before merge; authorization outside GitHub was not exported |
| Primary skill | `unknown` | No durable skill-activation record was attached to the PR |
| Runtime | `unavailable` | Local execution runtime was not present in GitHub evidence |
| Tokens | `unavailable` | No governed provider or runtime telemetry source |
| Cost | `unavailable` | No governed cost source |

This is a successful use of `unknown` and `unavailable`, not an incomplete report. The projection
remains honest because it does not infer planning depth, skill usage, human-review semantics, tokens,
or cost from the fact that the PR merged.

## Evidence reconstruction

The slice has durable evidence for:

- governance baseline passing;
- lockfile consistency;
- TypeScript no-emit validation;
- the Vitest CI job passing; the PR description separately reports 173 tests in 17 test files;
- aggregate quality gate passing;
- exact head SHA protected at merge;
- merge and close events on `main`.

The PR description also records local structural checks for JSON, JSONL, YAML, Markdown links,
scenario assertions, and dashboard reconstruction. Those claims are durable as PR prose, but they do
not have separate GitHub check runs. A cockpit should distinguish **CI-observed evidence** from
**author-reported validation** rather than flattening them into one confidence level.

## Comparison with the synthetic example

| Behavior | Synthetic example | PR #193 retrospective | Result |
|---|---|---|---|
| State derived from source references | Explicit synthetic refs | Git commit, PR, timeline, Actions, and review refs | Reinforced |
| Missing token and cost telemetry | Demonstrated as `unavailable` | Both signals unavailable in real GitHub evidence | Reinforced |
| Skill activation is not governance | Explicit activation with no authority | No durable activation record; left `unknown` | Reinforced |
| Runtime completion does not close a slice | Explicit in the synthetic trace | Closure came from merge/close events, not runtime activity | Reinforced |
| Human review visibility | Pending review is explicit | Requirement and authorization were not durable in GitHub | Friction found |
| Restricted or regulated classification | Restricted metadata example | Review found `regulated` missing from the event envelope | Contract drift found |
| Post-close finding | Not represented | Automated P2 review arrived 35 seconds after merge | New operational signal |

## Findings

### 1. The projection vocabulary is usable without an importer

The PR could be reconstructed manually from durable sources using the existing event envelope and
presentation-lane semantics. This is enough evidence to keep the model; no redesign is justified.

### 2. Source availability is the main constraint

GitHub exposes change, CI, readiness-for-review, merge, close, and review events well. It does not
prove planning depth, skill activation, local runtime, token/cost telemetry, or the rationale behind
human authorization unless those are deliberately attached as durable records.

### 3. Evidence needs provenance categories

The distinction between CI-observed checks and author-reported local checks mattered in this real
slice. The current contracts already require `source_refs`; a future projection may additionally
label evidence provenance without changing the underlying authority.

### 4. Canonical sensitivity drift was detected

The merged event envelope listed `public | internal | confidential | restricted | unknown`, while
the canonical taxonomy includes `regulated`. The automated review correctly flagged that a projector
would otherwise downgrade regulated data. This follow-up restores `regulated` in the event contract
and starter template.

### 5. Closed slices may still receive follow-up alerts

The automated review was submitted after merge. The finding belongs to a new corrective Work Slice;
it should not rewrite the historical lane of PR #193. A cockpit should keep the original slice
`closed` while exposing the linked post-close finding or follow-up slice.

## Verdict

**Result mode: reinforced with one bounded correction.**

The docs-first Visual Operations model was sufficient to reconstruct the real slice without
fabricating missing data. The pilot found one concrete vocabulary defect (`regulated`) and one
operational limitation: GitHub-only evidence cannot make local planning, skill, runtime, telemetry,
or human-authorization context visible unless those signals are deliberately persisted.

## Recommended next step

Do not build the static UI yet.

The next useful implementation slice is a **small Markdown/JSON projector** for GitHub PR evidence
that:

1. consumes explicitly supplied PR metadata, timeline, checks, and review records;
2. emits a normalized event file and one derived Work Slice snapshot;
3. preserves `unknown` and `unavailable` values;
4. distinguishes CI-observed evidence from author-reported validation;
5. links post-close findings to a follow-up slice instead of reopening history.

Adaptive Skills integration remains separate until a real durable skill-activation record exists to
consume.

## Validation of this report

- Timeline timestamps were taken from GitHub PR, timeline, and Actions records.
- CI claims were checked against the individual completed jobs.
- Review state was checked at thread level.
- The sensitivity correction matches the canonical five-level vocabulary in
  [Sensitivity Vocabulary Mapping](../contracts/sensitivity-vocabulary-mapping.md).
- No private prompt, runtime trace, token count, cost, or restricted source content was published.
