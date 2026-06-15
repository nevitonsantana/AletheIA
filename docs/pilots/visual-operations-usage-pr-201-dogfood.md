# Visual Operations Usage Evidence — PR #201 Dogfood

## Identification

| Field | Value |
|---|---|
| Evidence ID | `visual-operations-usage-pr-201-dogfood` |
| Date | 2026-06-15 |
| Recorder | Codex |
| Review or decision context | Post-merge dogfood closeout for the first checked-in Visual Operations usage evidence slice |
| Snapshot used | [`examples/visual-operations/github-pr-201-dogfood-output.md`](../../examples/visual-operations/github-pr-201-dogfood-output.md) |
| Source refs | [PR #201](https://github.com/nevitonsantana/AletheIA/pull/201), [merge commit `e8488d5`](https://github.com/nevitonsantana/AletheIA/commit/e8488d5f1ab47c88b28562c290fbeafdd9bdb442), [CI run](https://github.com/nevitonsantana/AletheIA/actions/runs/27581612377) |

## Usage boundary

- What was being reviewed: whether the first checked-in dogfood usage evidence record changed the
  activation posture for Visual Operations or simply added a second measurement point.
- Who used the snapshot: Codex, acting as maintainer/operator in the AletheIA development loop.
- Decision or question the snapshot supported: decide whether two consecutive dogfood closeouts now
  justify a collector, UI, backend, CI allowlist expansion, Adaptive Skills integration, or telemetry
  surface.
- Source refs: PR #201, merge commit `e8488d5`, CI run `27581612377`, and the generated local
  snapshot files listed above.

## Snapshot utility

| Question | Answer | Source refs |
|---|---|---|
| Which fields helped the review? | `presentation_lane=closed`, `evidence_status=sufficient`, explicit CI provenance, author-reported local validation, no alerts, no follow-up slices, and unavailable runtime/token/cost fields. | [`github-pr-201-dogfood-output.md`](../../examples/visual-operations/github-pr-201-dogfood-output.md), PR #201 |
| Which fields were missing, misleading, stale, or too noisy? | `human_review=unavailable` remains the main repeated gap. Planning depth, readiness, skill, runtime, token, and cost signals remain unknown or unavailable as expected. | [`github-pr-201-dogfood-output.md`](../../examples/visual-operations/github-pr-201-dogfood-output.md) |
| Did the snapshot change a decision, shorten review, or only confirm known state? | It confirmed the slice closed cleanly and supported the decision that two consecutive dogfood records still do not activate new infrastructure. It also made the repeated human-review visibility gap easier to name. | PR #201, merge commit `e8488d5` |
| Did the reviewer need to open the source PR, CI run, or evidence file anyway? | Yes. The snapshot was sufficient for orientation and decision framing, but source PR/CI records remained authoritative and were checked before recording the evidence. | PR #201, CI run `27581612377` |

## Missing or unavailable signals

Record `unknown` or `unavailable`; do not infer values.

| Signal | Status | Why | Source refs |
|---|---|---|---|
| Planning depth | unknown | No governed planning-depth record was supplied. | [`github-pr-201-dogfood-output.md`](../../examples/visual-operations/github-pr-201-dogfood-output.md) |
| Human review requirement | unknown | Authorization and merge occurred, but no separate durable review-requirement record was projected. | PR #201 |
| Runtime session | unavailable | No authoritative runtime-session export was attached. | [`github-pr-201-dogfood-output.md`](../../examples/visual-operations/github-pr-201-dogfood-output.md) |
| Skill activation | unknown | No durable skill-activation record was supplied. | [`github-pr-201-dogfood-output.md`](../../examples/visual-operations/github-pr-201-dogfood-output.md) |
| Tokens | unavailable | No provider or harness token telemetry was supplied. | [`github-pr-201-dogfood-output.md`](../../examples/visual-operations/github-pr-201-dogfood-output.md) |
| Cost | unavailable | No governed cost record was supplied. | [`github-pr-201-dogfood-output.md`](../../examples/visual-operations/github-pr-201-dogfood-output.md) |

## Activation signal check

This record is not enough by itself to activate future infrastructure. Mark only what this usage
actually supports.

| Possible future surface | Supported by this evidence? | Reason | Source refs |
|---|---|---|---|
| Add another checked-in snapshot to CI | no | The PR #201 snapshot is another closed successful PR and does not add a distinct projection scenario for the allowlist. | [`github-pr-201-dogfood-output.md`](../../examples/visual-operations/github-pr-201-dogfood-output.md), [`scripts/check-visual-ops-snapshots.sh`](../../scripts/check-visual-ops-snapshots.sh) |
| Improve projector field mapping | unclear | Two records now show `human_review=unavailable`; this is a candidate observation, but not enough to change mapping without a durable review source. | [`github-pr-200-dogfood-output.md`](../../examples/visual-operations/github-pr-200-dogfood-output.md), [`github-pr-201-dogfood-output.md`](../../examples/visual-operations/github-pr-201-dogfood-output.md) |
| Add GitHub collection/import | no | Manual assembly has happened twice but has not yet shown repeated material error or delay. | [`github-pr-201-dogfood-input.json`](../../examples/visual-operations/github-pr-201-dogfood-input.json) |
| Add dashboard/UI | no | Markdown remained sufficient for the closeout decision. | [`github-pr-201-dogfood-output.md`](../../examples/visual-operations/github-pr-201-dogfood-output.md) |
| Add persistence/backend | no | No cross-slice query need was demonstrated; two checked-in records are sufficient for current review. | This record |
| Add Adaptive Skills integration | no | No durable non-sensitive skill-activation record was used. | This record |
| Add runtime/token/cost telemetry | no | The useful behavior remains preserving unavailable telemetry rather than inventing values. | [`github-pr-201-dogfood-output.md`](../../examples/visual-operations/github-pr-201-dogfood-output.md) |

## Outcome

- Decision supported: keep Visual Operations in dogfood measurement mode. Two consecutive dogfood
  records support static snapshot utility for closeout, but still do not justify collector, UI,
  persistence/backend, Adaptive Skills integration, telemetry, or CI allowlist expansion.
- Follow-up Work Slice, if any: none yet. If a third real usage repeats the human-review visibility
  gap, consider a bounded mapping/review-source analysis before any infrastructure work.
- Stop condition or reason to keep phase closed: repeated successful closeout utility is useful but
  remains below activation thresholds for broader surfaces.
- Source refs: PR #201, merge commit `e8488d5`, CI run `27581612377`, and generated snapshot files.

## Privacy and restrictions

- Sensitive content withheld: no prompt, secret, private source body, or personal data beyond public
  GitHub actor labels was stored.
- Metadata-only references used: PR URL, commit URL, CI job URLs, file paths, and summarized local
  validation from the PR body.
- Hashes or authorized summaries: merge commit `e8488d5f1ab47c88b28562c290fbeafdd9bdb442` and head
  SHA `349a2931cb2648ba0634233a41efec8475d44925`.
- Source refs: PR #201, CI run `27581612377`, generated JSON/Markdown snapshot files.
