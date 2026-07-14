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

- `pnpm run docs:build` passes and generates 219 static pages from the existing AletheIA docs corpus.
- Blume also generates AI-readable outputs such as `llms.txt`, `llms-full.txt`, `robots.txt`, and `agent-readability.json`.
- `pnpm run docs:validate` currently fails with 98 broken-link/source-coverage findings. Most are links from `docs/` to repository files outside the configured docs source, such as `SYSTEM_STATE.md`, `examples/`, `starter-pack/`, and closeout filenames that do not map cleanly to Blume routes.
- The workspace root approach is not recommended because the root uses TypeScript 7 and Blume's Twoslash path expects TypeScript 5.5 or 6. Keep Blume isolated in this package.
- Build emits Google Fonts warnings when network access to `fonts.google.com` is unavailable, but the static site still builds.
- `sharp` is required for the existing documentation images.
- Local preview: `pnpm run docs:dev`, then open `http://127.0.0.1:4321/`.

## Publication gate

Do not publish this as official documentation until the source coverage and link validation gaps are resolved or explicitly accepted.
