# S58 — Blume internal docs route repair

- **Date:** 2026-07-14
- **Scope:** documentation tooling / Blume validation
- **Trigger:** S57 defined the publication-source map and recommended a first repair batch limited to internal `docs/` routes.
- **Posture:** narrow link repair only; no GitHub Pages publishing, no Blume config change, no source-coverage expansion, no automatic documentation generation, no dashboards, no Runtime 2.0, no S18 metrics and no Adaptive Skills mutation.

## Summary

This slice repairs only links that should resolve inside the existing `docs/` Blume source.

The changes focus on two internal route patterns:

1. Directory links that Blume does not resolve as site pages, such as `../pilots/` or `closeouts/`.
2. Closeout file links where Blume generates routes without the leading year segment, such as `06-15-visual-operations-phase-closeout.md` instead of `2026-06-15-visual-operations-phase-closeout.md`.

## Files repaired

- `docs/adr/ADR-006-domain-agnosticism.md`
- `docs/guides/pilot-crisis-monitor-overlay-handoff.md`
- `docs/guides/visual-operations-aletheia-dogfood-protocol.md`
- `docs/guides/visual-operations-usage-evidence.md`
- `docs/index.md`
- `docs/pilots/README.md`
- `docs/pilots/closeouts/README.md`

## Validation evidence

Before this slice, S56 recorded:

```text
98 error(s)
```

After the first directory-link repair batch:

```text
92 error(s)
```

After the closeout route repair batch:

```text
85 error(s)
```

The remaining findings are intentionally outside this slice. They primarily point to source areas classified by S57 as curated references, GitHub source links, or out-of-publication scope:

- `_meta/`
- `policies/`
- `starter-pack/`
- `examples/`
- `packs/`
- assets requiring a Blume public asset strategy

## Decision

S58 stops here. It should not expand into source-coverage or GitHub-link conversion.

The next safe slice should handle one S57 category at a time, preferably root/meta and policy reference handling before examples/templates.

## Non-goals preserved

This repair does **not**:

- publish the Blume site;
- create a GitHub Pages workflow;
- modify `apps/docs/blume.config.ts`;
- include non-`docs/` directories in Blume;
- rewrite examples/templates/packs references;
- add documentation generation automation;
- create dashboards, collectors, scoring, ranking or documentation-health metrics;
- activate S18 or Runtime 2.0;
- mutate Adaptive Skills.
