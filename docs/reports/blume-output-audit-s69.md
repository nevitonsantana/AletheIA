# S69 — Blume docs output audit and postprocess guard

Date: 2026-07-15

## Goal

Prevent the published Blume documentation artifact from showing duplicate first titles or exposing internal Markdown files/routes as the reader-facing documentation surface.

## Trigger

After S68 published the first GitHub Pages shell, review of the public site showed two reader-facing risks:

1. pages rendered duplicate first headings because Blume adds a page heading and the source Markdown also starts with `# ...`;
2. the built `dist` artifact included raw `.md`/`.mdx` files and generated internal links that pointed to Markdown filenames.

## Baseline measurement

Before the guard, the local Blume output contained:

| Finding | Count | Impact |
|---|---:|---|
| Raw Markdown artifacts in `apps/docs/dist` | 462 | Public artifact could serve Markdown files directly. |
| Internal HTML links to `.md`/`.mdx` | 1128 | Reader clicks could navigate to raw/broken Markdown routes instead of Blume pages. |
| Broken internal links after Markdown-only cleanup | 130 | Links to schemas, policies, scripts or root routes could still fail in the static Pages artifact if not resolved. |
| Pages with duplicate first `<h1>` text | 231 | Pages showed the title twice at the top. |

## Change

S69 adds a deterministic post-build guard for the Blume output:

- `scripts/postprocess-blume-docs.mjs` removes the generated duplicate first heading when the following Markdown heading has the same text and a stable anchor;
- rewrites internal `.md`/`.mdx` links to route-style links that resolve from the generated `index.html` page location;
- rewrites repository-source links outside the Blume docs corpus, such as schemas, policies, scripts or engine files, to GitHub source-of-truth links when those files exist in the repository but not in `dist`;
- removes raw `.md`/`.mdx` files from `apps/docs/dist`;
- `scripts/audit-blume-docs-output.mjs` fails if any of those problems remain.

The root `docs:build` path now runs the postprocess and audit, so the manual Pages workflow cannot upload the unguarded artifact if the audit fails.

## Validation result

After the guard, the local output audit reported:

| Check | Result |
|---|---:|
| Raw Markdown artifacts | 0 |
| Internal links to `.md`/`.mdx` | 0 |
| Broken internal links | 0 |
| Duplicate first headings | 0 |

Command evidence:

```bash
pnpm run docs:build
pnpm --filter @aletheia/docs run audit
```

`docs:build` still emits the existing local sandbox font/DNS warnings when Google Fonts metadata cannot be fetched, but exits successfully and completes the postprocess/audit.

## Non-goals

- No source Markdown rewrite across the corpus.
- No automatic publishing on merge.
- No custom domain.
- No documentation generation pipeline beyond the existing Blume build plus postprocess guard.
- No S18, Runtime 2.0, dashboards, collectors, scanners, enforcement, schemas or Adaptive Skills behavior changes.
