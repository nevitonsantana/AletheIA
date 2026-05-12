# Dev Handoff — May 2026

**Date:** 2026-05-12  
**From:** Neviton Santana (founder / design-engineer)  
**To:** Development team  
**Context:** Founder shifts focus to strategy and CBSOFT paper. Team picks up technical backlog.

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

## Open backlog for the team

Issues were created in each repo (links below). Priority order:

### AletheIA — next three slices

1. **[Migrate tests to Vitest](https://github.com/nevitonsantana/AletheIA/issues)** — current test suites are ad-hoc `tsx` scripts. Migration to Vitest gives watch mode, coverage thresholds, and standard reporting. Estimated: 5–7 days. Unblocked.

2. **[Introduce Ajv for runtime JSON Schema validation](https://github.com/nevitonsantana/AletheIA/issues)** — `engine/` currently trusts schema shape at the TypeScript level only. Adding Ajv validates governance packs at runtime before execution. Estimated: 3–5 days. Depends on Vitest migration being merged first (or can run in parallel if tests stay in place).

3. **[Configure Dependabot](https://github.com/nevitonsantana/AletheIA/issues)** — automatic PRs for `npm` and `github-actions` dependency updates. One config file. Estimated: 1 hour. Unblocked.

### Adaptive Skills — next two slices

4. **[Rename `projections/registry.yaml` → `registry.json`](https://github.com/nevitonsantana/adaptive-skills/issues)** — consistency with JSON-first posture; enables future Ajv validation of the registry. Requires updating `project_to_codex.py`, `report_projection_status.py`, and `validate_evolution.py`. Estimated: 1–2 days. Unblocked.

5. **[Add Dependabot config](https://github.com/nevitonsantana/adaptive-skills/issues)** — automatic PRs for `github-actions` updates. Estimated: 1 hour. Unblocked.

---

## How to work in these repos

### AletheIA

```bash
git clone https://github.com/nevitonsantana/AletheIA.git
cd AletheIA
pnpm install --frozen-lockfile
pnpm test:all          # governance check + 4 test suites
pnpm exec tsc --noEmit # type check
```

Every PR runs the CI automatically. The `Quality Gate (aggregator)` job must be green before merge.

Decision Record is required for any change to `engine/`, `schemas/`, `policies/`, or `governance`. See `CONTRIBUTING.md`.

### Adaptive Skills

```bash
git clone https://github.com/nevitonsantana/adaptive-skills.git
cd adaptive-skills
python3 scripts/validate_skills.py
python3 scripts/validate_evolution.py
python3 scripts/project_to_codex.py --all --dry-run
```

Every PR runs the CI automatically. New skills require all 11 sections in the SKILL.md template. See `CONTRIBUTING.md`.

---

## What the founder is working on (not the team's concern)

- **CBSOFT 2026 SBES Industry Track paper** — abstract registration deadline: 22 May 2026; paper submission: 29 May 2026.
  - Paper covers the AletheIA + Adaptive Skills pilot in Crisis Monitor.
  - Evidence instrumentation (retroactive) is in progress.
  - Template: `crisis-monitor-instrumentation/round-evidence-template.md` (private materials).
- **Strategy and ecosystem positioning** — macro decisions about AletheIA's direction and external partnerships.

The team should not block on the paper. The technical backlog above is fully independent of it.

---

## Contacts and ownership

| Area | Owner |
|---|---|
| AletheIA engine, governance, schemas | @nevitonsantana (strategic) + team (execution) |
| Adaptive Skills skill library | @nevitonsantana (review gate) + team (new skills) |
| CI, branch protection, Dependabot | Team |
| CBSOFT paper and Crisis Monitor evidence | @nevitonsantana only |
