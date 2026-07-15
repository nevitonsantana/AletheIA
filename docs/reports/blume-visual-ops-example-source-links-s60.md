# S60 — Blume Visual Operations example source-link handling

Date: 2026-07-15

## Goal

Handle one remaining S57 source-coverage category before any official documentation publishing decision: links from the Blume `docs/` corpus to Visual Operations example files under repository-level `examples/visual-operations/`.

## What changed

- Converted Markdown links from `docs/` pages to `examples/visual-operations/` files into explicit GitHub source links.
- Kept command examples and plain path text unchanged where they are instructional paths rather than reader navigation.

## Why this is the smallest safe step

S57 keeps examples as repository source links by default, not as published Blume pages. This preserves the examples as checked-in evidence/source material without expanding the documentation site source tree or treating examples as official docs pages.

## Non-goals

- No GitHub Pages or official documentation deployment.
- No Blume source expansion or routing automation.
- No example migration into `docs/`.
- No changes to starter-pack templates, packs, non-Visual-Operations examples or asset strategy.
- No S18, Runtime 2.0, collectors, dashboards, scanners, enforcement, schemas or Adaptive Skills behavior changes.

## Validation expectation

`pnpm run docs:validate` is still expected to fail until the remaining source-coverage categories are handled. The acceptance check for this slice is narrower: reduce Visual Operations example broken-link findings without changing source ownership.


## Observed validation

- Before this slice: `pnpm run docs:validate` reported 77 errors, with Visual Operations examples as the largest remaining category.
- After this slice: `pnpm run docs:validate` reports 31 errors and no findings matching `examples/visual-operations`.
- Remaining errors belong to later source-coverage categories such as starter-pack templates/guides, packs and non-Visual-Operations examples.
