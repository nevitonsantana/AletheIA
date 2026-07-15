# Visual Operations Usage Evidence — PR #207 Dogfood

## Identification

| Field | Value |
|---|---|
| Evidence ID | `visual-operations-usage-pr-207-dogfood` |
| Date | 2026-06-16 |
| Recorder | Codex |
| Review or decision context | Post-merge dogfood closeout for the Visual Operations human-review source mapping slice |
| Snapshot used | [`examples/visual-operations/github-pr-207-dogfood-output.md`](https://github.com/nevitonsantana/AletheIA/blob/main/examples/visual-operations/github-pr-207-dogfood-output.md) |
| Source refs | [PR #207](https://github.com/nevitonsantana/AletheIA/pull/207), [merge commit `39f76cf`](https://github.com/nevitonsantana/AletheIA/commit/39f76cf4afc774f8f45fbc439f2b71331c0b4a8f), [CI run](https://github.com/nevitonsantana/AletheIA/actions/runs/27626141953) |

## Usage boundary

- What was being reviewed: whether the human-review source mapping clarified the repeated
  `human_review=unavailable` signal without introducing new infrastructure or a false authority.
- Who used the snapshot: Codex, acting as maintainer/operator in the AletheIA development loop.
- Decision or question the snapshot supported: decide whether the new mapping changed activation
  posture for collector, UI, backend, telemetry, Adaptive Skills integration, or schema work.
- Source refs: PR #207, merge commit `39f76cf`, CI run `27626141953`, and the generated local
  snapshot files listed above.

## Snapshot utility

| Question | Answer | Source refs |
|---|---|---|
| Which fields helped the review? | `presentation_lane=closed`, `evidence_status=sufficient`, CI provenance, author-reported local validation, no alerts, no follow-up slices, and explicit unavailable runtime/token/cost fields. | [`github-pr-207-dogfood-output.md`](https://github.com/nevitonsantana/AletheIA/blob/main/examples/visual-operations/github-pr-207-dogfood-output.md), PR #207 |
| Which fields were missing, misleading, stale, or too noisy? | `human_review=unavailable` remains visible, but PR #207 explains why this is correct when no durable review record is supplied. Planning depth, readiness, runtime, token, and cost signals remain unknown or unavailable as expected. | [`github-pr-207-dogfood-output.md`](https://github.com/nevitonsantana/AletheIA/blob/main/examples/visual-operations/github-pr-207-dogfood-output.md), [`visual-operations-human-review-source-mapping.md`](../reference/visual-operations-human-review-source-mapping.md) |
| Did the snapshot change a decision, shorten review, or only confirm known state? | It confirmed that the mapping slice closed cleanly and that the dogfood loop should continue measuring before activating UI, collector, backend, or telemetry work. | PR #207, merge commit `39f76cf` |
| Did the reviewer need to open the source PR, CI run, or evidence file anyway? | Yes. The snapshot was sufficient for orientation and design framing, but the source PR/CI records remained authoritative and were checked before recording the evidence. | PR #207, CI run `27626141953` |

## Missing or unavailable signals

Record `unknown` or `unavailable`; do not infer values.

| Signal | Status | Why | Source refs |
|---|---|---|---|
| Planning depth | unknown | No governed planning-depth record was supplied. | [`github-pr-207-dogfood-output.md`](https://github.com/nevitonsantana/AletheIA/blob/main/examples/visual-operations/github-pr-207-dogfood-output.md) |
| Human review requirement | unknown | Merge authorization and green checks existed, but no separate durable review-requirement or review-completion record was supplied. PR #207 documents that this must remain unknown/unavailable. | PR #207, [`visual-operations-human-review-source-mapping.md`](../reference/visual-operations-human-review-source-mapping.md) |
| Runtime session | unavailable | No authoritative runtime-session export was attached. | [`github-pr-207-dogfood-output.md`](https://github.com/nevitonsantana/AletheIA/blob/main/examples/visual-operations/github-pr-207-dogfood-output.md) |
| Skill activation | unknown | No durable skill-activation record was supplied. | [`github-pr-207-dogfood-output.md`](https://github.com/nevitonsantana/AletheIA/blob/main/examples/visual-operations/github-pr-207-dogfood-output.md) |
| Tokens | unavailable | No provider or harness token telemetry was supplied. | [`github-pr-207-dogfood-output.md`](https://github.com/nevitonsantana/AletheIA/blob/main/examples/visual-operations/github-pr-207-dogfood-output.md) |
| Cost | unavailable | No governed cost record was supplied. | [`github-pr-207-dogfood-output.md`](https://github.com/nevitonsantana/AletheIA/blob/main/examples/visual-operations/github-pr-207-dogfood-output.md) |

## Activation signal check

This record is not enough by itself to activate future infrastructure. Mark only what this usage
actually supports.

| Possible future surface | Supported by this evidence? | Reason | Source refs |
|---|---|---|---|
| Add another checked-in snapshot to CI | no | The PR #207 snapshot is another closed successful PR and does not add a distinct projection scenario for the allowlist. | [`github-pr-207-dogfood-output.md`](https://github.com/nevitonsantana/AletheIA/blob/main/examples/visual-operations/github-pr-207-dogfood-output.md), [`scripts/check-visual-ops-snapshots.sh`](../../scripts/check-visual-ops-snapshots.sh) |
| Improve projector field mapping | no | The mapping clarified source rules, but the projected state remains correct with no supplied review record. | [`visual-operations-human-review-source-mapping.md`](../reference/visual-operations-human-review-source-mapping.md) |
| Add GitHub collection/import | unclear | Manual assembly has now happened across multiple dogfood records, but this slice did not demonstrate material delay or repeated error that justifies a collector yet. | [`github-pr-207-dogfood-input.json`](https://github.com/nevitonsantana/AletheIA/blob/main/examples/visual-operations/github-pr-207-dogfood-input.json) |
| Add dashboard/UI | no | Markdown remained sufficient for closeout and design framing. A visual model can be prepared next, but no UI implementation is justified by this record alone. | [`github-pr-207-dogfood-output.md`](https://github.com/nevitonsantana/AletheIA/blob/main/examples/visual-operations/github-pr-207-dogfood-output.md) |
| Add persistence/backend | no | No cross-slice query need was demonstrated; checked-in records are sufficient for current review. | This record |
| Add Adaptive Skills integration | no | No durable non-sensitive skill-activation record was used. | This record |
| Add runtime/token/cost telemetry | no | The useful behavior remains preserving unavailable telemetry rather than inventing values. | [`github-pr-207-dogfood-output.md`](https://github.com/nevitonsantana/AletheIA/blob/main/examples/visual-operations/github-pr-207-dogfood-output.md) |

## Design implication

For the future cockpit, this evidence says the visual layer needs an explicit design treatment for
missing authority. A card should not look failed or incomplete just because it says `unavailable`;
it should communicate that the system is refusing to claim evidence it does not have.

The useful visual distinction is:

- **Known positive**: there is durable evidence and the card can show completion.
- **Known pending**: there is durable evidence that review is required or blocked.
- **Unknown/unavailable**: the source did not provide enough evidence, so the UI should avoid
  implying either success or failure.

## Outcome

- Decision supported: keep Visual Operations in dogfood measurement mode. PR #207 resolved the
  semantic ambiguity around `human_review`, but it did not activate collector, UI, persistence,
  Adaptive Skills integration, telemetry, or schema work.
- Follow-up Work Slice, if any: prepare a docs-first visual model for the cockpit cards/lanes/alerts
  using the dogfood evidence, without implementing UI yet.
- Stop condition or reason to keep phase open: the vocabulary is clearer, but more visual framing is
  needed before a real dashboard can be designed safely.
- Source refs: PR #207, merge commit `39f76cf`, CI run `27626141953`, generated JSON/Markdown
  snapshot files, and the human-review source mapping.

## Privacy and restrictions

- Sensitive content withheld: no prompt, secret, private source body, or personal data beyond public
  GitHub actor labels was stored.
- Metadata-only references used: PR URL, commit URL, CI job URLs, file paths, and summarized local
  validation from the PR body.
- Hashes or authorized summaries: merge commit `39f76cf4afc774f8f45fbc439f2b71331c0b4a8f` and head
  SHA `efd7357bdb5bb6481410a0db6a5cc8534c330115`.
- Source refs: PR #207, CI run `27626141953`, generated JSON/Markdown snapshot files.
