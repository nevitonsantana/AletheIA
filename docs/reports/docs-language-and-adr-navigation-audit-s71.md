# S71 — Docs language and ADR navigation audit

Date: 2026-07-15

## Goal

Respond to the public documentation review that found two reader-facing issues:

1. Some documentation pages mix English and Portuguese.
2. The ADR group is not positioned clearly enough, and ADR-003 can appear out of the expected ADR sequence in the generated navigation.

## Scope

This slice is intentionally small and safe:

- add explicit Blume navigation metadata for the top-level docs groups;
- add explicit Blume navigation metadata for the ADR group and ADR page order;
- record a language-coherence audit snapshot;
- avoid bulk translation in this slice.

## ADR navigation result

The generated documentation now has source-backed ordering metadata:

- top-level docs navigation puts `Architecture Decision Records` before the broad concept/reference groupings;
- the ADR group label is explicit, instead of relying on the folder name `adr`;
- ADR children are explicitly ordered from ADR-001 through ADR-016, with ADR-003 between ADR-002 and ADR-004.

## Language audit snapshot

A lightweight text scan found Portuguese-like terms in a limited set of docs, while most public docs and ADRs are primarily English.

Representative files that need human language review before any translation PR:

| Area | File | Initial observation |
|---|---|---|
| Concepts | `docs/concepts/governance.md` | Contains Portuguese-like governance terms in an otherwise English documentation set. |
| Concepts | `docs/concepts/quality.md` | Contains Portuguese-like terms and should be checked for final language direction. |
| Pilots | `docs/pilots/context-graph-decision.md` | Contains mixed-language decision/evidence vocabulary. |
| Pilots | `docs/pilots/dev-handoff-2026-05.md` | Contains handoff wording that may need normalization. |
| Reference | `docs/reference/launch-kit.md` | Contains Portuguese-like operational wording. |
| Reference | `docs/reference/learnings.md` | Contains Portuguese-like learning/governance wording. |
| Roadmaps | `docs/roadmaps/knowledge-governance-implementation-prep.md` | Contains mixed-language planning terms. |
| Legacy/meta | `docs/_meta/**` | Several legacy/meta files contain Portuguese-like terms; these may not need public-reader translation. |

## Recommended language decision

Do not translate everything automatically.

Recommended next slice:

1. choose the official public-doc language for AletheIA docs;
2. classify pages as `public docs`, `historical evidence`, or `legacy/meta`;
3. translate or normalize only the public-doc pages first;
4. preserve evidence records and historical closeouts unless a reviewer explicitly approves rewriting them.

## Validation

Validation for this slice should confirm that Blume accepts the `meta.ts` navigation files and that the postprocess/audit guard still passes.

## Non-goals

- No bulk translation.
- No rewriting of ADR decisions.
- No automatic language detector or classifier.
- No dashboards, collectors, scanners, policy engines or publishing automation.
- No S18, Runtime 2.0, enforcement, schemas or Adaptive Skills mutation.
