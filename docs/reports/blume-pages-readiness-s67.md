# S67 — Blume GitHub Pages readiness implementation

Date: 2026-07-15

## Goal

Implement the smallest safe GitHub Pages readiness slice after S66 selected GitHub Pages as the intended future host.

## What changed

- Configured the Blume docs build for the GitHub Pages project site path.
- Added a manual-only GitHub Pages workflow.
- Documented the smoke test required after any manual deployment.

## Publication boundary

This slice does not publish automatically. The workflow only runs through `workflow_dispatch`, so merging the PR does not deploy the site.

Running the workflow is a separate human action and should happen only after review.

## Build configuration

The Blume config now declares:

- `deployment.site`: `https://nevitonsantana.github.io`
- `deployment.base`: `/AletheIA`

This matches the intended project Pages URL:

```text
https://nevitonsantana.github.io/AletheIA/
```

## Manual workflow

The workflow is `.github/workflows/docs-pages.yml`.

It performs:

1. checkout;
2. Node 22 and pnpm setup;
3. `actions/configure-pages`;
4. pnpm install with frozen lockfile;
5. `pnpm run docs:validate`;
6. `pnpm run docs:build`;
7. upload `apps/docs/dist` as the Pages artifact;
8. deploy via `actions/deploy-pages`.

The workflow uses current official Pages action majors verified during the slice: `actions/configure-pages@v6`, `actions/upload-pages-artifact@v5` and `actions/deploy-pages@v5`.

The trigger is manual-only:

```yaml
on:
  workflow_dispatch:
```

## Required smoke test after manual deployment

After a manual workflow run, verify:

- `https://nevitonsantana.github.io/AletheIA/` loads.
- A representative internal route loads, for example `/AletheIA/concepts/overview`.
- Optimized `_astro` image assets load on pages that include diagrams.
- `https://nevitonsantana.github.io/AletheIA/llms.txt` exists.
- `https://nevitonsantana.github.io/AletheIA/robots.txt` points to the expected sitemap.
- Search opens and returns at least one known result.
- The site presents itself as the Blume documentation shell over existing Markdown, not as generated docs or runtime behavior.

## Rollback

If the deployed site is wrong, disable GitHub Pages or revert the workflow/config PR. The canonical Markdown docs remain the source of truth.

## Non-goals

- No automatic deployment on merge.
- No repository Pages settings change performed by this slice.
- No custom domain.
- No generated documentation pipeline.
- No changes to AletheIA runtime behavior.
- No S18, Runtime 2.0, collectors, dashboards, scanners, enforcement, schemas or Adaptive Skills behavior changes.

## Validation expectation

`pnpm run docs:validate` and `pnpm run docs:build` should pass locally before any manual deployment.
