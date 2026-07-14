# S56 — Blume validation and source-coverage triage

- **Date:** 2026-07-14
- **Scope:** documentation tooling / Blume publication readiness
- **Trigger:** S55 proved that Blume can build the existing `docs/` corpus, but `pnpm run docs:validate` still blocks official publishing.
- **Posture:** source-backed triage only; no GitHub Pages publishing, automatic documentation generation, dashboards, collectors, Runtime 2.0, S18 metrics or Adaptive Skills mutation.

## Summary

`pnpm run docs:validate` currently fails because the Blume shell is configured to read `../../docs` only, while the AletheIA documentation corpus intentionally links to repository material outside `docs/`.

This means the main issue is **source coverage**, not a runtime failure:

- `pnpm run docs:build` can generate the static site.
- `pnpm run docs:validate` rejects links that point outside the configured Blume source tree.
- Official publishing should remain blocked until these targets are either included in the docs site, intentionally converted to repository links, or explicitly accepted as non-site references.

## Validation evidence

Command:

```bash
pnpm run docs:validate
```

Observed result:

- `98 error(s)`
- `BLUME_BROKEN_LINK` entries for Markdown links whose targets are not pages in the Blume site.
- `BLUME_ASSETS_UNCHECKED` for `88 asset link(s)` because no Blume `public/` directory is configured.

## Main finding categories

| Category | Example targets | Interpretation | Recommended handling |
|---|---|---|---|
| Repository-root references | `../SYSTEM_STATE.md`, `_meta/MIGRATION.md` | Canonical files exist outside `docs/`. | Decide whether to include selected root/meta files in the docs site or rewrite them as GitHub repository links. |
| Policy references | `../../policies/feature-readiness-gates.md` | Policy docs are canonical but outside the current Blume source. | Add a deliberate publication mapping for `policies/` or keep as repository links. |
| Starter-pack references | `../../starter-pack/templates/...`, `../../starter-pack/guides/...` | Templates/guides are operational artifacts, not currently part of site source. | Publish selected templates as reference pages only if useful to readers; otherwise link to GitHub. |
| Examples references | `../../examples/...` | Examples are evidence/reference material outside `docs/`. | Add curated examples to Blume source coverage or keep as GitHub links to avoid bloating official docs. |
| Packs references | `../../packs/operating-overlay/README.md` | Pack material is outside docs and may be more operational than reader-facing. | Treat as optional/advanced reference; avoid publishing by accident. |
| Closeout route mismatches | `2026-06-15-visual-operations-phase-closeout.md` | Some links do not resolve as Blume routes even inside docs. | Fix as normal Markdown route/link cleanup. |
| Asset coverage | `BLUME_ASSETS_UNCHECKED` | Blume cannot check assets without a configured public asset source. | Configure/copy only the required public assets if publishing proceeds. |

## Decision for this slice

Do not solve all 98 findings in one broad rewrite.

The safer next step is a narrow **publication-source map** before changing many links:

1. Define which repository areas belong in the official Blume site:
   - `docs/` only
   - `docs/` plus selected `policies/`
   - `docs/` plus selected `examples/`
   - `docs/` plus selected `starter-pack/` templates
2. Define which areas should remain GitHub source links rather than site pages.
3. Only then repair links/routes in small batches.

## Non-goals preserved

This triage does **not**:

- publish the Blume site;
- create GitHub Pages workflow;
- rewrite the documentation corpus automatically;
- introduce documentation generators;
- change AletheIA runtime behavior;
- change Adaptive Skills behavior;
- create dashboards, collectors, scoring or ranking;
- activate S18 or Runtime 2.0.

## Recommended next slices

1. **S57 — Blume publication-source map**
   - Decide which non-`docs/` directories should be part of the official documentation site.
   - Output: small source-map policy for Blume publication.

2. **S58 — Blume link repair batch 1**
   - Fix only one category after S57, preferably route mismatches inside `docs/` or explicit GitHub links for root/meta files.

3. **S59 — GitHub Pages readiness review**
   - Only after validation is clean or remaining exceptions are explicitly accepted.

## Validation note: preview server and isolated builds

During this triage, `pnpm run docs:build` was blocked locally because an existing Blume dev server was already running at `localhost:4321`. Blume correctly refused to build into the same `.blume` runtime while the preview server was active.

Safe verification command used instead:

```bash
ASTRO_TELEMETRY_DISABLED=1 pnpm --filter @aletheia/docs exec blume build --isolated
```

Observed result:

- isolated build passed;
- output was written to `apps/docs/.blume-verify/dist`;
- 220 pages were built after adding this S56 report;
- Google Fonts fetch warnings remained non-blocking in this restricted environment.
