# S57 — Blume publication source map

- **Date:** 2026-07-14
- **Scope:** documentation tooling / official docs publication readiness
- **Trigger:** S56 showed that Blume validation fails primarily because the site source is `docs/` only while the docs corpus links to selected repository material outside `docs/`.
- **Posture:** publication-source decision only; no GitHub Pages workflow, no link rewrite batch, no automatic documentation generation, no dashboards, no Runtime 2.0, no S18 metrics and no Adaptive Skills mutation.

## Decision summary

The official Blume site should remain a **reader-facing documentation site**, not a full repository mirror.

AletheIA should publish source areas in tiers:

1. **Canonical site source** — content that belongs in the official docs navigation and search.
2. **Curated reference source** — selected non-`docs/` files that are useful as reader-facing references and safe to expose as documentation pages.
3. **Repository source links** — files that should stay visible as GitHub source links, not copied into the official docs site.
4. **Out of publication scope** — local, generated, operational or package internals that should not become official docs pages.

This keeps the Blume site useful without converting every repo artifact into public documentation.

## Publication source map

| Repository area | Publication tier | Default handling | Reasoning |
|---|---|---|---|
| `docs/` | Canonical site source | Keep as the primary Blume content source. | This is the existing reader-facing documentation corpus and already builds as a site. |
| `SYSTEM_STATE.md` | Curated reference source | Publish or expose as a single current-state reference page if Blume supports a deliberate source mapping; otherwise link to GitHub. | It is an important first-load index, but it should remain clearly marked as an index, not a universal source of truth. |
| `_meta/` | Repository source links | Link to GitHub unless a specific migration/history page is intentionally promoted. | Mostly repository/history metadata; not core reader docs. |
| `policies/` | Curated reference source | Include selected policy Markdown files only when linked by canonical docs; do not bulk-publish blindly. | Policies are authoritative and reader-relevant, but should appear as reference material, not navigation noise. |
| `starter-pack/templates/` | Repository source links by default; curated reference only for frequently used templates | Prefer GitHub links for templates; publish only selected templates when they are part of first-use documentation. | Templates are operational artifacts and may clutter docs if all are promoted. |
| `starter-pack/guides/` | Curated reference source | Include selected guides that support onboarding or official operating paths. | Guides can be reader-facing when they explain use, not internal mechanics. |
| `examples/` | Repository source links by default; curated examples only | Keep most examples as GitHub source links; publish only small, stable examples that explain concepts. | Examples are evidence/reference material; bulk-publishing could bloat official docs and confuse readers. |
| `packs/` | Repository source links | Do not include in Blume by default. | Pack internals are advanced/operational and should not become official docs accidentally. |
| generated build output (`apps/docs/.blume/`, `apps/docs/.blume-verify/`, `apps/docs/dist/`) | Out of publication scope | Ignore from git and docs source. | Generated artifacts are not source material. |
| `plans/` | Out of publication scope | Keep local/untracked and never publish. | Local planning scratchpad; not repository truth. |

## Link handling rules

Use the following rule before changing any broken Blume link:

1. **If the target is canonical reader documentation**, keep it inside the Blume site.
2. **If the target is an authoritative policy needed by readers**, include or map it as curated reference.
3. **If the target is an example/template/source artifact**, prefer a GitHub source link unless it is explicitly selected for publication.
4. **If the target is local, generated or operational-only**, do not publish it; remove, replace or clearly mark the reference.
5. **If the target is a route mismatch inside `docs/`**, repair the Markdown link directly.

## Immediate repair batches unlocked by this map

### S58 — Internal docs route repair

Fix links that should resolve inside the existing `docs/` source, especially closeout filename/route mismatches such as:

- `2026-06-15-visual-operations-phase-closeout.md` vs the existing `06-15-visual-operations-phase-closeout.md` route.

This is the safest first repair batch because it does not require changing source coverage.

### S59 — Root/meta and policy reference handling

Choose the first curated reference implementation path:

- either expose selected root/policy files through a deliberate Blume source mapping;
- or convert references to stable GitHub links.

### S60 — Examples/templates reference handling

Classify examples/templates into:

- reader-facing curated examples/templates;
- GitHub source links;
- references to remove or replace.

## Publication gate

Do not create a GitHub Pages workflow until one of these is true:

- `pnpm run docs:validate` passes; or
- remaining validation findings are explicitly documented as accepted exceptions with clear reason and owner.

## Non-goals preserved

This source map does **not**:

- publish the Blume site;
- create a GitHub Pages workflow;
- modify `apps/docs/blume.config.ts`;
- rewrite the link corpus;
- add documentation generation automation;
- create dashboards, collectors, scoring, ranking or documentation-health metrics;
- activate S18 or Runtime 2.0;
- mutate Adaptive Skills.
