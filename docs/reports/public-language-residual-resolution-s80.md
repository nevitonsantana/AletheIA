# S80 — Public Language Residual Resolution

## Status

Editorial resolution slice. This report records the explicit decisions applied after S78 classified the remaining Portuguese-language surfaces.

## Purpose

S72 established English as AletheIA's public documentation language. S78 blocked automatic translation and required explicit editorial decisions for three remaining categories:

1. historical learning records;
2. pilot/local adoption guide fragments;
3. intentional visual or localized communication labels.

S80 resolves those categories without bulk translation, publishing automation, automatic language classification, runtime behavior changes or Adaptive Skills mutation.

## Decisions applied

| Surface | S78 classification | S80 decision | Change |
|---|---|---|---|
| `docs/reference/learnings.md` | Historical learning record | Rewrite the public reference page in English while preserving the lesson identifiers, meaning and references. | The page now uses English headings and English lesson summaries for the historical lessons. |
| `docs/guides/pilot-crisis-monitor-overlay-handoff.md` | Pilot/local adoption communication | Keep the guide public and normalize the residual PT-BR template headings to English. | The friction-log headings now read as English public documentation. |
| `docs/roadmaps/evolution-plan.md` | Possible intentional communication labels | Treat the PT-BR Kanban labels as historical/localized examples, not canonical public labels. | The mapping now leads with English canonical visual labels and preserves PT-BR labels in a dedicated historical/localized column. |

## Boundary

This slice intentionally does not:

- translate every historical artifact in the repository;
- change the public documentation language policy;
- add automatic language detection;
- rewrite governance decisions or roadmap semantics;
- publish documentation automatically;
- create dashboards, collectors, scanners, policy engines, S18 metrics, Runtime 2.0 behavior or Adaptive Skills mutation.

## Validation target

The public documentation should now have an explicit English-first treatment for the S78 residuals. Remaining PT-BR terms in the touched visual-label mapping are preserved as labeled historical/localized examples, not accidental public-language drift.
