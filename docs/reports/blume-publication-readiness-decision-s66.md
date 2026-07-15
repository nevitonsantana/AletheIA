# S66 — Blume publication-readiness decision

Date: 2026-07-15

## Goal

Decide the next publication-readiness boundary for the Blume documentation spike after S65 accepted the remaining asset-check warning as non-blocking for the spike.

## Decision

Use GitHub Pages as the intended future hosting target for the AletheIA Blume documentation shell, but do not publish in this slice.

This decision is intentionally narrow: it defines the next implementation boundary and the evidence required before publication. It does not create a Pages workflow, change Blume config, change repository settings, or deploy the site.

## Intended publication target

- **Hosting target:** GitHub Pages for `nevitonsantana/AletheIA`.
- **Expected public base URL:** `https://nevitonsantana.github.io/AletheIA/`.
- **Expected base path:** `/AletheIA/` for repository Pages unless the repository later uses a custom domain.
- **Published source:** the Blume static build output from `apps/docs`, generated from the existing `docs/` Markdown corpus.

## Required before publishing

A separate implementation slice must explicitly handle:

1. Blume/Astro deployment settings for the selected base URL and base path.
2. GitHub Actions or equivalent workflow to build the docs package and publish the static output.
3. A final smoke test against the deployed URL, including:
   - home page loads;
   - representative internal docs route loads;
   - optimized `_astro` image assets load;
   - search/AI-readable files exist if expected;
   - links remain source-backed and do not imply generated or runtime behavior.
4. A clear rollback path, such as disabling Pages or reverting the publishing workflow.

## Why this is not publication yet

Publication changes the repo's public surface. Even though validation and build now pass for the spike, publishing should remain a separate, reviewable action because it introduces:

- a public URL and base-path contract;
- deployment automation;
- GitHub Pages repository settings or workflow permissions;
- user expectations that the Blume shell is official documentation.

## Current validation baseline

The current spike is ready for a publication implementation decision because:

- `pnpm run docs:validate` exits successfully with only the accepted `BLUME_ASSETS_UNCHECKED` warning;
- `pnpm run docs:build` exits successfully;
- S58–S63 cleared broken-link/source-coverage categories;
- S65 documented the remaining asset warning as accepted for the spike.

## Non-goals

- No GitHub Pages workflow.
- No repository Pages settings change.
- No deployment.
- No Blume config change.
- No generated documentation pipeline.
- No changes to AletheIA runtime behavior.
- No S18, Runtime 2.0, collectors, dashboards, scanners, enforcement, schemas or Adaptive Skills behavior changes.

## Next safe slice

If this decision is accepted, the next slice can be a focused GitHub Pages implementation plan or draft publishing workflow, with deployment still gated by validation and review.
