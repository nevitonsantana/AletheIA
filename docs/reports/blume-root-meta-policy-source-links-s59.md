# S59 — Blume root/meta and policy source-link handling

Date: 2026-07-14

## Goal

Handle the first S57 source-coverage category before any official documentation publishing decision: repository-root, repository-meta and policy references that Blume cannot resolve as pages inside the `docs/` source tree.

## What changed

- Converted `SYSTEM_STATE.md` references from internal Blume links to GitHub source links.
- Converted `_meta/MIGRATION.md` references from internal Blume links to GitHub source links.
- Converted `policies/feature-readiness-gates.md` references from internal Blume links to GitHub source links.

## Why this is the smallest safe step

S57 classified these references as repository source or curated reference candidates, not as a reason to publish the whole repository through Blume. Linking them to GitHub source keeps canonical ownership clear while removing this validation category from the future documentation-site path.

## Non-goals

- No GitHub Pages or official documentation deployment.
- No Blume source expansion, routing automation or publishing policy change.
- No changes to examples, starter-pack templates, packs or asset strategy.
- No S18, Runtime 2.0, collectors, dashboards, scanners, enforcement, schemas or Adaptive Skills behavior changes.

## Validation expectation

`pnpm run docs:validate` is still expected to fail until the remaining S57 categories are handled. The acceptance check for this slice is narrower: no remaining validation findings for `SYSTEM_STATE.md`, `_meta/MIGRATION.md` or `policies/feature-readiness-gates.md`.

## Observed validation

- Before this slice: `pnpm run docs:validate` reported 85 errors, including 8 root/meta/policy broken-link findings.
- After this slice: `pnpm run docs:validate` reports 77 errors and no findings matching `SYSTEM_STATE.md`, `_meta/MIGRATION.md` or `policies/feature-readiness-gates.md`.
- Remaining errors belong to later source-coverage categories such as examples, starter-pack, packs and asset handling.
