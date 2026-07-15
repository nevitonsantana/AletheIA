# S78 — Public Language Residual Classification

## Status

Review-only. This report does not translate content and does not change runtime behavior.

## Purpose

S72 set English as the official public documentation language. S73 through S77 normalized small, clearly accidental mixed-language fragments in public reader-facing pages.

After S77, the remaining Portuguese-language matches are not equivalent to those earlier cleanup targets. They appear in documents that either preserve historical learning records or carry pilot/local communication context. They require an explicit editorial decision before translation.

## Reviewed surfaces

| Surface | Current finding | Classification | Recommendation |
|---|---|---|---|
| `docs/reference/learnings.md` | The file is largely PT-BR and records historical lessons. | Historical learning record. | Do not translate automatically. Decide whether to preserve as historical source, create an English summary, or migrate into a new bilingual/archive model. |
| `docs/guides/pilot-crisis-monitor-overlay-handoff.md` | A small template section uses PT-BR headings such as local adaptation and observed metrics. | Pilot/local adoption communication. | Do not translate inside the current cleanup loop. Review whether the guide remains public, should be archived, or should receive an English canonical rewrite. |
| `docs/roadmaps/evolution-plan.md` | PT-BR Kanban labels such as `Avançar`, `Revisar`, `Bloquear`, `Encerrar`, and `Bifurcar` remain in a visual decision mapping. | Possible intentional communication labels. | Keep untouched until a dedicated visual-language decision confirms whether labels are canonical examples, localized labels, or accidental drift. |

## Decision

No additional automatic translation is admissible from this scan.

The next safe language step is an explicit editorial policy decision for the remaining categories:

1. historical learning records;
2. pilot/local adoption guides;
3. intentional visual or localized communication labels.

## Non-goals

- Bulk translation.
- Rewriting historical evidence.
- Changing public docs language policy.
- Automatic language classification.
- Publishing automation.
- Runtime, dashboard, collector, scanner, policy-engine, S18, Runtime 2.0, or Adaptive Skills changes.

## Validation

This report is based on a targeted residual scan after S77 and records why no direct content rewrite is proposed.
