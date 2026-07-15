# S62 — Blume pack source-link handling

Date: 2026-07-15

## Goal

Handle one remaining S57 source-coverage category before any official documentation publishing decision: links from the Blume `docs/` corpus to the repository-level `packs/operating-overlay/` delivery pack.

## What changed

- Converted Markdown navigation links from `docs/` pages to `packs/operating-overlay/README.md` into explicit GitHub source links.
- Kept command examples and package-local paths unchanged where they describe installed APM or local consumer-project paths.

## Why this is the smallest safe step

S56 classified pack references as operational material outside the current Blume source tree. This slice keeps the pack as repository source material and avoids publishing it by accident as part of the official docs site.

## Non-goals

- No GitHub Pages or official documentation deployment.
- No Blume source expansion or routing automation.
- No pack migration into `docs/`.
- No changes to examples or asset strategy.
- No S18, Runtime 2.0, collectors, dashboards, scanners, enforcement, schemas or Adaptive Skills behavior changes.

## Validation expectation

`pnpm run docs:validate` is still expected to fail until the remaining example/source categories are handled. The acceptance check for this slice is narrower: reduce `packs/operating-overlay` broken-link findings without changing pack ownership.


## Observed validation

- Before this slice: `pnpm run docs:validate` reported 21 errors, including `packs/operating-overlay/README.md` references.
- After this slice: `pnpm run docs:validate` reports 17 errors and no findings matching `packs/operating-overlay`.
- Remaining errors belong to later source-coverage categories under non-Visual-Operations examples.
