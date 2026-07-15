# Visual Operations Usage Evidence

## Purpose

Use this guide when a maintainer, reviewer, or operator actually uses a generated Visual Operations
snapshot to support a review, handoff, closeout, or planning decision.

The goal is to capture usage evidence before expanding the Visual Operations surface. A usage record
is field evidence; it is not a new authority, lifecycle, importer, dashboard, or telemetry source.

## When to create a record

Create a usage evidence record only when all are true:

1. a generated JSON or Markdown snapshot was opened during a real review or decision;
2. the reviewer can name the question or decision it supported;
3. the record can cite source references without copying restricted content;
4. missing signals can remain `unknown` or `unavailable`.

Do not create a record just because a snapshot exists, CI passed, or a PR merged.

## Template

Copy:

```text
starter-pack/templates/visual-ops-usage-evidence-template.md
```

Recommended destination for repository-local evidence:

```text
docs/pilots/visual-operations-usage-<short-slug>.md
```

A usage record may also stay outside the repository if the review context includes private or
restricted information. In that case, store only an allowed summary or reference in AletheIA.

For AletheIA's own development loop, use the [Visual Operations AletheIA Dogfood Protocol](visual-operations-aletheia-dogfood-protocol.md)
to decide when a usage record counts as real field evidence.

## What to record

A useful record answers:

- which snapshot was used;
- which decision, question, or review it supported;
- which fields helped;
- which fields were missing, stale, misleading, or too noisy;
- whether source PRs, CI jobs, or evidence files still had to be opened;
- whether the evidence supports a future surface, such as another CI snapshot or a field-mapping
  improvement.

Do not infer planning depth, human-review requirements, skill activations, runtime sessions, tokens,
or cost unless a durable source explicitly provides them.

## Activation discipline

One usage record is not enough to justify broad infrastructure. Treat it as input to the activation
signals in the [Visual Operations phase closeout](../pilots/closeouts/06-15-visual-operations-phase-closeout.md).

Examples:

| If the usage shows... | Small next slice |
|---|---|
| A checked-in snapshot caught drift or supported review clearly | Add that specific snapshot to the explicit CI allowlist |
| A field was misleading or missing across repeated reviews | Patch projector mapping or snapshot wording |
| Manual evidence assembly repeatedly caused mistakes | Propose a bounded collector/importer with authentication and privacy guardrails |
| Reviewers could not use Markdown/JSON in a real cadence | Consider a UI prototype, but only after documenting the failed review path |

## Non-goals

- no backfilled proof from memory;
- no storage of prompts, secrets, or restricted source bodies;
- no automatic promotion from usage evidence to roadmap commitment;
- no new decision, readiness, policy, or Work Slice authority;
- no remote collection or UI work in the evidence record itself.

## Related

- [Visual Operations Cockpit Visual Model](visual-operations-cockpit-visual-model.md)
- [GitHub PR Visual Operations Projector](github-pr-visual-operations-projector.md)
- [Visual Operations phase closeout](../pilots/closeouts/06-15-visual-operations-phase-closeout.md)
- [Visual Operations Privacy Boundaries](../contracts/visual-ops-privacy-boundaries.md)
- [Visual Operations Human Review Source Mapping](../reference/visual-operations-human-review-source-mapping.md)
