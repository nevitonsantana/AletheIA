# Cycle Record — May 2026

**Date:** 2026-05-12
**Author:** Neviton Santana

Registro do ciclo de maio/2026. Trabalho executado com Claude Code diretamente nos repositórios.

---

## What was delivered this cycle

### AletheIA (`nevitonsantana/AletheIA`)

| PR | What it resolved |
|---|---|
| [#120](https://github.com/nevitonsantana/AletheIA/pull/120) | Declared `tsx`, `typescript`, `@types/node` as devDependencies; committed `pnpm-lock.yaml`; added `tsconfig.json`; introduced `.github/workflows/ci.yml` with Quality Gate aggregator; fixed latent type error in `engine/governance.ts` |
| [#123](https://github.com/nevitonsantana/AletheIA/pull/123) | Updated all references from `adaptative-skills` to `adaptive-skills` |

Branch protection on `main`: `Quality Gate (aggregator)` is a required check. No PR merges without CI green.

### Adaptive Skills (`nevitonsantana/adaptive-skills`)

| PR | What it resolved |
|---|---|
| [#21](https://github.com/nevitonsantana/adaptive-skills/pull/21) | Introduced `.github/workflows/ci.yml` with 6 jobs (validate-skills, validate-evolution, projection-status, projection-dry-run, projection-check, quality-gate) |
| [#23](https://github.com/nevitonsantana/adaptive-skills/pull/23) | Repository renamed `adaptative-skills` → `adaptive-skills`; 55 files updated; CHANGELOG 0.1.2; old URLs redirect permanently |

Branch protection on `main`: `Quality Gate (aggregator)` is a required check.

---

## Open backlog

Issues registrados em cada repo como referência para os próximos ciclos.

### AletheIA

| Issue | Título | Esforço |
|---|---|---|
| [#124](https://github.com/nevitonsantana/AletheIA/issues/124) | Migrate tests to Vitest | 5–7 days |
| [#125](https://github.com/nevitonsantana/AletheIA/issues/125) | Introduce Ajv for runtime JSON Schema validation | 3–5 days |
| [#126](https://github.com/nevitonsantana/AletheIA/issues/126) | Configure Dependabot | 1h |

### Adaptive Skills

| Issue | Título | Esforço |
|---|---|---|
| [#25](https://github.com/nevitonsantana/adaptive-skills/issues/25) | Rename `projections/registry.yaml` → `registry.json` | 1–2 days |
| [#26](https://github.com/nevitonsantana/adaptive-skills/issues/26) | Configure Dependabot | 1h |

---

## How to run locally

### AletheIA

```bash
git clone https://github.com/nevitonsantana/AletheIA.git
cd AletheIA
pnpm install --frozen-lockfile
pnpm test:all          # governance check + 4 test suites
pnpm exec tsc --noEmit
```

### Adaptive Skills

```bash
git clone https://github.com/nevitonsantana/adaptive-skills.git
cd adaptive-skills
python3 scripts/validate_skills.py
python3 scripts/validate_evolution.py
python3 scripts/project_to_codex.py --all --dry-run
```

---

## Parallel workstream (not tracked in these repos)

**CBSOFT 2026 SBES Industry Track paper**
- Abstract registration: 22 May 2026
- Paper submission: 29 May 2026
- Evidence instrumentation in progress (`crisis-monitor-instrumentation/`)
- Templates: `round-evidence-template.md`, `metrics-aggregation.md`
