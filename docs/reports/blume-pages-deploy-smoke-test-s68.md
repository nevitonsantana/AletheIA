# S68 — Blume GitHub Pages deploy smoke test

Date: 2026-07-15

## Goal

Record the first manual GitHub Pages deployment and S67 smoke-test evidence for the AletheIA Blume documentation shell.

## What happened

After explicit human approval, the manual workflow `.github/workflows/docs-pages.yml` was run from `main`.

The first run failed because GitHub Pages was not yet enabled for the repository with `build_type: workflow`.

GitHub Pages was then enabled for `nevitonsantana/AletheIA` with workflow-based publishing. The workflow was run again and completed successfully.

## Deployment evidence

- **Workflow:** Docs Pages Manual Publish
- **Successful run:** <https://github.com/nevitonsantana/AletheIA/actions/runs/29390178825>
- **Published URL:** <https://nevitonsantana.github.io/AletheIA/>
- **Pages mode:** workflow-based GitHub Pages publishing
- **Publishing posture:** human-triggered manual workflow, not automatic-on-merge

## Smoke test results

| Check | Result | Evidence |
|---|---:|---|
| Home page loads | pass | `https://nevitonsantana.github.io/AletheIA/` returned HTTP 200. |
| Representative internal route loads | pass | `https://nevitonsantana.github.io/AletheIA/concepts/overview/` returned HTTP 200 and title `AletheIA Overview - AletheIA Docs`. |
| Extensionless internal route redirects safely | pass | `https://nevitonsantana.github.io/AletheIA/concepts/overview` returned HTTP 301 to the trailing-slash route. |
| Optimized image asset loads | pass | `/_astro/aletheia-adaptive-skills-territory-map...webp` returned HTTP 200 with `content-type: image/webp`. |
| `llms.txt` exists | pass | `https://nevitonsantana.github.io/AletheIA/llms.txt` returned HTTP 200. |
| `robots.txt` points to sitemap | pass | `robots.txt` contains `Sitemap: https://nevitonsantana.github.io/AletheIA/sitemap.xml`. |
| `sitemap.xml` exists | pass | `https://nevitonsantana.github.io/AletheIA/sitemap.xml` returned HTTP 200. |
| Search index exists | pass | `https://nevitonsantana.github.io/AletheIA/blume-search.json` returned HTTP 200. |
| Agent readability manifest exists | pass | `https://nevitonsantana.github.io/AletheIA/agent-readability.json` returned HTTP 200. |

## Interpretation

The Blume documentation shell is now publicly reachable through GitHub Pages and passed the S67 smoke-test checklist.

The canonical source of truth remains the repository Markdown corpus. The published site is a static documentation shell over that corpus, not generated docs, runtime behavior, dashboards, collectors, metrics, policy enforcement or Adaptive Skills mutation.

## Follow-up boundary

Future changes to the published documentation surface should remain small and reviewable:

- content changes should still land through normal PRs;
- the manual Pages workflow can be rerun after reviewed changes when needed;
- automatic publishing on merge remains a separate decision and is not enabled by this slice.

## Non-goals

- No automatic deployment on merge.
- No custom domain.
- No generated documentation pipeline.
- No changes to AletheIA runtime behavior.
- No S18, Runtime 2.0, collectors, dashboards, scanners, enforcement, schemas or Adaptive Skills behavior changes.
