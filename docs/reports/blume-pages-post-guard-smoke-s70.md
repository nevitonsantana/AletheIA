# S70 — Blume Pages post-guard smoke test

Date: 2026-07-15

## Goal

Record the manual GitHub Pages publication after S69 added the Blume output guard for duplicate first headings, internal Markdown links and raw Markdown artifacts.

## What happened

After explicit human approval, the manual workflow `.github/workflows/docs-pages.yml` was run from `main` after PR #405 closed S69.

The workflow completed successfully and deployed the corrected Blume artifact to GitHub Pages.

## Deployment evidence

- **Workflow:** Docs Pages Manual Publish
- **Successful run:** <https://github.com/nevitonsantana/AletheIA/actions/runs/29391565432>
- **Published URL:** <https://nevitonsantana.github.io/AletheIA/>
- **Source branch:** `main`
- **Publishing posture:** human-triggered manual workflow, not automatic-on-merge

## Smoke test results

| Check | Result | Evidence |
|---|---:|---|
| Home page loads | pass | `https://nevitonsantana.github.io/AletheIA/` was fetched successfully after deployment. |
| README page loads | pass | `https://nevitonsantana.github.io/AletheIA/README/` was fetched successfully after deployment. |
| Representative internal route loads | pass | `https://nevitonsantana.github.io/AletheIA/concepts/architecture/` returned HTTP 200. |
| Duplicate first headings absent in sampled routes | pass | Home, README and architecture samples each had one first-level heading. |
| Internal raw Markdown links absent in sampled routes | pass | Sampled `.md`/`.mdx` links were GitHub source-of-truth links only; no sampled internal raw Markdown links remained. |
| Raw Markdown route does not open as published document | pass | `https://nevitonsantana.github.io/AletheIA/docs/concepts/architecture.md` returned HTTP 404. |

## Interpretation

The post-S69 public artifact reflects the intended publication boundary: user-facing documentation routes render as HTML pages, while source-file references stay explicit GitHub links instead of pretending to be Blume pages.

This is evidence for publication hygiene only. It does not create automatic publishing, generated documentation authority, dashboards, collectors, metrics, runtime behavior, policy enforcement or Adaptive Skills mutation.

## Follow-up boundary

Automatic publishing on merge remains blocked pending a separate explicit decision. Future docs changes should continue through normal PR review and manual publication when needed.

## Non-goals

- No automatic deployment on merge.
- No custom domain.
- No generated documentation pipeline.
- No changes to AletheIA runtime behavior.
- No S18, Runtime 2.0, collectors, dashboards, scanners, enforcement, schemas or Adaptive Skills behavior changes.
