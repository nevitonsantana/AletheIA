# S65 — Blume asset-check warning decision

Date: 2026-07-15

## Goal

Decide whether the remaining Blume `BLUME_ASSETS_UNCHECKED` validation warning must block the next documentation-readiness step.

## Decision

Accept `BLUME_ASSETS_UNCHECKED` as a documented, non-blocking limitation for the current Blume spike.

This does **not** mean the documentation site is published. It means the remaining warning is no longer treated as a broken-link or build-readiness blocker, because the current build proves the tracked in-site images are emitted as optimized static assets.

## Evidence

`pnpm run docs:validate` exits successfully and reports only:

```text
BLUME_ASSETS_UNCHECKED 39 asset link(s) not checked: no public/ directory found.
```

`pnpm run docs:build` also exits successfully. The build emits optimized image assets for the tracked docs images used inside the Blume content tree:

```text
apps/docs/dist/_astro/aletheia-adaptive-skills-territory-map.C7Cjg1Ge_jVxcM.webp
apps/docs/dist/_astro/infografico_execution_pattern_governance_aletheia_adaptative_skills.D7PwnH2D_FIVPX.webp
```

Rendered HTML references those optimized assets from the corresponding pages:

- `/concepts/ecosystem-territory-map/`
- `/concepts/execution-pattern-governance/`

## Interpretation

The warning exists because this spike does not define `apps/docs/public/`. That is acceptable for the current source model:

- Blume reads the documentation corpus from `../../docs`.
- The image references that matter to rendered docs pages are processed into static `_astro` assets during build.
- There is no deliberate public asset namespace yet.

Adding `apps/docs/public/` now would create a new publication convention. That should only happen if a future official publishing test proves that public, unprocessed assets are needed.

## Publication gate update

The next safe step may move from validation cleanup to publication-readiness planning, but official publishing still requires a separate explicit decision for:

- hosting target and base URL;
- deployment workflow;
- final smoke test of rendered pages and optimized image URLs;
- acceptance that this is a documentation shell over existing Markdown, not generated docs or runtime behavior.

## Non-goals

- No GitHub Pages publishing.
- No Blume config change.
- No `apps/docs/public/` creation.
- No asset copying, relocation or URL rewrite.
- No automatic documentation generation.
- No S18, Runtime 2.0, collectors, dashboards, scanners, enforcement, schemas or Adaptive Skills behavior changes.

## Validation expectation

`pnpm run docs:validate` should continue to exit successfully with only the accepted `BLUME_ASSETS_UNCHECKED` warning. `pnpm run docs:build` should continue to emit optimized image assets for docs-local image references.
