# S64 — Blume asset-check warning readiness review

Date: 2026-07-15

## Goal

Review the remaining Blume validation warning after S63 cleared the broken-link categories, without publishing the documentation site or changing the asset strategy by accident.

## Current validation state

`pnpm run docs:validate` exits successfully and reports only:

```text
BLUME_ASSETS_UNCHECKED 39 asset link(s) not checked: no public/ directory found.
```

This means the remaining issue is not a broken documentation route. It is an asset-publication coverage warning: Blume cannot verify asset links against a `public/` directory because this spike currently has no `apps/docs/public/` source.

## Source observations

Tracked image references in the current docs corpus are narrow and local:

- `README.md` references `docs/assets/aletheia-architecture-flow.svg` and `docs/assets/aletheia-core-framework.svg`.
- `docs/concepts/ecosystem-territory-map.md` references `../assets/aletheia-adaptive-skills-territory-map.png`.
- `docs/concepts/execution-pattern-governance.md` references `assets/infografico_execution_pattern_governance_aletheia_adaptative_skills.png`.

Tracked source image files exist under:

- `docs/assets/`
- `docs/concepts/assets/`

There is no tracked `apps/docs/public/` directory.

## Decision for this slice

Do not create a public asset pipeline in this slice.

The correct next decision is a separate asset-publication strategy, because there are at least two valid paths:

1. **Keep assets inside the docs content tree** if Blume already copies them correctly during build and treat `BLUME_ASSETS_UNCHECKED` as an accepted publication warning.
2. **Add a deliberate `apps/docs/public/` asset source** only if Blume requires it for stable published asset URLs.

Both paths are publication decisions, not validation cleanup. They should not be mixed into the status review.

## Publication gate

Official publishing remains blocked until one of these is true:

- the asset-check warning is resolved by a deliberate public asset mapping; or
- the warning is explicitly accepted as a documented limitation with owner and rationale.

## Non-goals

- No GitHub Pages or official documentation deployment.
- No Blume config change.
- No generated docs or automatic documentation pipeline.
- No asset copying, relocation or URL rewrite.
- No S18, Runtime 2.0, collectors, dashboards, scanners, enforcement, schemas or Adaptive Skills behavior changes.

## Validation expectation

`pnpm run docs:validate` should continue to exit successfully with only the known `BLUME_ASSETS_UNCHECKED` warning.
