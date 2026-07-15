# S61 — Blume starter-pack source-link handling

Date: 2026-07-15

## Goal

Handle one remaining S57 source-coverage category before any official documentation publishing decision: links from the Blume `docs/` corpus to starter-pack templates, guides and harness shims outside the `docs/` source tree.

## What changed

- Converted Markdown navigation links from `docs/` pages to `starter-pack/` artifacts into explicit GitHub source links.
- Kept plain path text and command examples unchanged where they are operational instructions rather than reader navigation links.

## Why this is the smallest safe step

S57 treats starter-pack templates as repository source links by default, with only selected guides as future curated references if useful. This slice avoids broad publishing decisions by preserving starter-pack ownership and removing the current broken-link category from Blume validation.

## Non-goals

- No GitHub Pages or official documentation deployment.
- No Blume source expansion or routing automation.
- No starter-pack migration into `docs/`.
- No changes to packs, non-starter examples or asset strategy.
- No S18, Runtime 2.0, collectors, dashboards, scanners, enforcement, schemas or Adaptive Skills behavior changes.

## Validation expectation

`pnpm run docs:validate` is still expected to fail until the remaining source-coverage categories are handled. The acceptance check for this slice is narrower: reduce starter-pack broken-link findings without changing source ownership.


## Observed validation

- Before this slice: `pnpm run docs:validate` reported 31 errors, including starter-pack guides, templates and harness-shim references.
- After this slice: `pnpm run docs:validate` reports 21 errors and no findings matching `starter-pack/`.
- Remaining errors belong to later source-coverage categories such as packs and non-Visual-Operations examples.
