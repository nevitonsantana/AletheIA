# S63 — Blume non-Visual-Operations example source-link handling

Date: 2026-07-15

## Goal

Handle the remaining S57 source-coverage category before any official documentation publishing decision: links from the Blume `docs/` corpus to repository-level `examples/` artifacts outside the `docs/` source tree, excluding Visual Operations examples already handled by S60.

## What changed

- Converted Markdown navigation links from `docs/` pages to repository-level `examples/` artifacts into explicit GitHub source links.
- Kept plain path text and command examples unchanged where they are operational instructions rather than reader navigation links.

## Why this is the smallest safe step

S57 keeps examples as source/evidence material unless deliberately curated into the official docs site. This slice preserves source ownership, avoids moving examples into Blume, and removes example broken-link findings without publishing by accident.

## Non-goals

- No GitHub Pages or official documentation deployment.
- No Blume source expansion or routing automation.
- No example migration into `docs/`.
- No changes to assets.
- No S18, Runtime 2.0, collectors, dashboards, scanners, enforcement, schemas or Adaptive Skills behavior changes.

## Validation expectation

`pnpm run docs:validate` should no longer report broken links for repository-level `examples/` references converted by this slice. If validation still fails, remaining failures should belong to categories outside this slice.


## Observed validation

- Before this slice: `pnpm run docs:validate` reported 17 broken-link errors, all under non-Visual-Operations `examples/` references.
- After this slice: `pnpm run docs:validate` exits successfully with no broken-link errors.
- Blume still reports `BLUME_ASSETS_UNCHECKED` for 39 asset links because no `public/` directory is configured; this is an asset-check coverage warning, not a broken-link failure.
