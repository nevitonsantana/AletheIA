# AletheIA Docs Site Spike

This package tests Blume as a static documentation shell for the existing AletheIA Markdown corpus.

## Scope

- Reads the repository documentation from `../../docs`.
- Builds a static documentation site into `apps/docs/dist`.
- Keeps generated Blume runtime files out of git via `.gitignore`.
- Does not replace the canonical Markdown docs or change AletheIA runtime behavior.

## Commands

```bash
pnpm --filter @aletheia/docs build
pnpm --filter @aletheia/docs dev
pnpm --filter @aletheia/docs validate
```

## Current findings

- `pnpm run docs:build` passes and generates a static site from the existing AletheIA docs corpus.
- Blume also generates AI-readable outputs such as `llms.txt`, `llms-full.txt`, `robots.txt`, and `agent-readability.json`.
- `pnpm run docs:validate` now exits successfully after S58–S63 repaired or source-linked the broken-link categories. S65 accepts the remaining `BLUME_ASSETS_UNCHECKED` output as a documented, non-blocking spike limitation because Blume still builds optimized static assets for docs-local images.
- The workspace root approach is not recommended because the root uses TypeScript 7 and Blume's Twoslash path expects TypeScript 5.5 or 6. Keep Blume isolated in this package.
- Build emits Google Fonts warnings when network access to `fonts.google.com` is unavailable, but the static site still builds.
- `sharp` is required for the existing documentation images.
- Local preview: `pnpm run docs:dev`, then open `http://127.0.0.1:4321/`.

## Publication gate

Do not publish this as official documentation until a separate publication-readiness decision defines the hosting target, deployment workflow, base URL and final smoke test. S65 accepts the current asset-check warning for the spike; it does not publish the site.
