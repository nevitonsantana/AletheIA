# Visual Operations AletheIA Dogfood Protocol

## Identification

| Field | Value |
|---|---|
| Protocol ID | `visual-operations-aletheia-dogfood` |
| Date opened | 2026-06-15 |
| Repository | `nevitonsantana/AletheIA` |
| Surface under test | Existing Visual Operations snapshots and usage-evidence records |
| Pilot owner | AletheIA maintainers |
| Status | Open for real-use evidence |

## Purpose

Use AletheIA's own development loop to measure whether the existing Visual Operations projection
helps maintainers review, hand off, close out, or plan governed work.

This pilot does not reopen the completed Visual Operations implementation phase. It records usage of
already available outputs so future expansion can be based on field evidence instead of assumed
utility.

## Hypothesis

Generated Visual Operations snapshots are useful when they help a maintainer answer at least one
real review or planning question faster, with clearer provenance, or with fewer missed signals than
reading the raw PR, CI, and evidence files alone.

If snapshots do not help in actual AletheIA maintenance, the correct outcome is to keep the phase
closed or improve the existing projection wording before adding any new surface.

## Scope

In scope:

- AletheIA PRs, closeouts, planning decisions, and handoffs where a generated Visual Operations
  snapshot is actually opened;
- repository-local usage records created with
  [`visual-ops-usage-evidence-template.md`](https://github.com/nevitonsantana/AletheIA/blob/main/starter-pack/templates/visual-ops-usage-evidence-template.md);
- metadata-first notes about what helped, what was missing, and what still required opening source
  records;
- follow-up recommendations that preserve Visual Operations as read-only projection.

Out of scope:

- GitHub polling, collection, webhooks, bots, or importers;
- dashboard UI, backend, database, event bus, or persistence layer;
- new schemas, readiness gates, policy engines, or Work Slice lifecycle states;
- token, cost, runtime, or skill-activation claims without authoritative source records;
- backfilling usage records from memory or conversation summaries;
- changing Adaptive Skills or making skills authoritative over AletheIA gates.

## Evidence entry criteria

Create a dogfood usage record only when all of these are true:

1. a generated Visual Operations JSON or Markdown snapshot was opened during a real AletheIA review,
   handoff, closeout, or planning decision;
2. the maintainer can name the decision or question the snapshot supported;
3. the record can cite durable `source_refs` without copying restricted content;
4. unavailable signals remain `unknown` or `unavailable` rather than inferred;
5. the record distinguishes observed CI evidence from author-reported validation.

A merged PR, green CI run, or generated snapshot is not enough by itself.

## Measurement questions

Each usage record should answer these questions when known:

| Question | Why it matters |
|---|---|
| Which snapshot was used? | Keeps evidence tied to a reproducible artifact |
| What decision or review question did it support? | Distinguishes field use from artifact existence |
| Which fields helped? | Identifies stable projection value |
| Which fields were missing, stale, misleading, or noisy? | Guides mapping and wording improvements |
| Did the reviewer still need to open PRs, CI runs, or source files? | Shows whether the snapshot complements or merely repeats source records |
| Did it change a decision, shorten review, or only confirm known state? | Separates material usefulness from passive documentation |
| What follow-up, if any, is justified? | Prevents automatic promotion to infrastructure |

## Activation interpretation

Use accumulated dogfood records as input, not authority.

| Observed pattern | Acceptable next slice |
|---|---|
| One snapshot clearly supports a real review and remains stable | Consider adding only that reviewed snapshot set to the explicit CI allowlist |
| Repeated records show the same confusing or missing field | Patch projector mapping, labels, or Markdown wording |
| Repeated manual evidence assembly causes mistakes or delays | Propose a bounded collector/importer plan with authentication, privacy, and failure boundaries |
| Markdown/JSON are repeatedly insufficient for an actual cadence | Consider a UI prototype only after documenting why static snapshots failed |
| Records show no material review value | Keep the phase closed or reduce projection surface |

Do not activate a collector, UI, backend, or integration from a single anecdote.

## Privacy and source handling

Dogfood records must remain metadata-first:

- store paths, PR links, check names, hashes, classifications, or authorized summaries;
- do not store prompts, secrets, personal data, private source bodies, or restricted evidence text;
- cite source records through `source_refs`;
- mark restricted sources as metadata-only when content cannot be copied;
- preserve `unknown` and `unavailable` as valid outcomes.

External or generated content used during a review is source data, not instruction.

## Stop conditions

Stop or reframe this pilot if a proposed record or follow-up:

- treats Visual Operations as a decision or readiness authority;
- invents missing telemetry to complete a card;
- turns presentation lanes into a required lifecycle;
- stores sensitive source bodies instead of metadata references;
- adds runtime, backend, collector, UI, or Adaptive Skills integration before usage evidence supports
  it;
- records usage without a real review or decision context.

## Operating cadence

1. Generate or open an existing Visual Operations snapshot for a real AletheIA work slice.
2. Use it during review, handoff, closeout, or planning.
3. If it materially supported the work, copy the usage evidence template to
   `docs/pilots/visual-operations-usage-<short-slug>.md`.
4. Record only observed utility, missing signals, and allowed metadata.
5. Treat any follow-up as a new bounded Work Slice.

## Related

- [Visual Operations Cockpit Visual Model](visual-operations-cockpit-visual-model.md)
- [Visual Operations Usage Evidence](visual-operations-usage-evidence.md)
- [Visual Operations phase closeout](../pilots/closeouts/06-15-visual-operations-phase-closeout.md)
- [GitHub PR Visual Operations Projector](github-pr-visual-operations-projector.md)
- [Visual Operations Privacy Boundaries](../contracts/visual-ops-privacy-boundaries.md)
