# Installing AletheIA via APM

> **Canonical reader guide:** the maintained installation journey now lives at [Install AletheIA](/getting-started/installation-guide/). This page remains the package-level technical reference shipped with the APM payload.

This guide is for adopters using [APM (Microsoft Agentic Package Manager)](https://microsoft.github.io/apm/) as their package manager. If you do not use APM, skip this guide and follow the manual flow in [`packs/operating-overlay/README.md`](https://github.com/nevitonsantana/AletheIA/blob/main/packs/operating-overlay/README.md).

> **Two-step adoption.** APM today has no install-time hook for delivering project scaffolds to the consumer root. AletheIA accommodates this with an explicit second step — see [ADR-007](../adr/ADR-007-apm-packaging-strategy.md) for the rationale.

## Prerequisites

- APM installed and on `$PATH`. Verify with `apm --version`.
- A GitHub account with access to `nevitonsantana/AletheIA` (the repo is public, but APM may require auth for resolution behind some configurations).
- An empty or near-empty directory for the consumer project. Existing overlay artifacts will not be overwritten without `--force`.

## Step 1 — Install the package

From inside the consumer project root:

```bash
apm install nevitonsantana/AletheIA#v1.0.0-apm --target claude
```

What this does:

- Resolves the package from GitHub at the pinned tag.
- Downloads the payload into `apm_modules/AletheIA/`.
- Writes `apm.lock.yaml` pinning the version and content hash for reproducibility. **Commit `apm.lock.yaml`** so teammates and CI get the same bytes.

What this does **not** do: materialize the overlay at the project root. That is step 2.

If `apm` reports `policy: warn` for fetch failures and you want a stricter posture, set `policy.fetch_failure_default: block` in your project's `apm.yml` before installing.

## Step 2 — Materialize the overlay

```bash
apm run scaffold-overlay
```

What this does:

- Copies the contents of `apm_modules/AletheIA/packs/operating-overlay/` into the current working directory.
- Excludes source-only artifacts (`README.md`, `manifest.yaml`, `scripts/`).
- Refuses to overwrite if `AGENTS.md`, `CLAUDE.md`, `.claude/`, or `ops/ai/` already exist. Pass `--force` to overwrite.

After this step, the consumer project root contains:

```
<consumer-root>/
├── AGENTS.md                      ← variables to substitute
├── CLAUDE.md
├── .claude/
│   ├── settings.json              ← variables to substitute
│   └── rules/
│       ├── src.md
│       ├── tests.md
│       └── ops-ai.md
└── ops/ai/
    ├── constitution/README.md     ← replace with mission/scope/stack/principles
    ├── handoffs/README.md
    ├── reports/README.md
    ├── policies/README.md
    ├── schemas/README.md
    ├── skills/README.md
    └── learnings/README.md
```

## Step 3 — Substitute variables

The shim files ship with `{{VARS}}` placeholders. Substitute them before opening the first session. On macOS:

```bash
sed -i '' \
  -e 's|{{PROJECT_NAME}}|My Project|g' \
  -e 's|{{PROJECT_ONE_LINER}}|Short one-sentence description|g' \
  -e 's|{{PRIMARY_STACK}}|TypeScript, Node 20|g' \
  -e 's|{{INSTALL_CMD}}|pnpm install|g' \
  -e 's|{{TEST_CMD}}|pnpm test|g' \
  -e 's|{{LINT_CMD}}|pnpm lint|g' \
  -e 's|{{BUILD_CMD}}|pnpm build|g' \
  -e 's|{{DEV_CMD}}|pnpm dev|g' \
  AGENTS.md CLAUDE.md .claude/settings.json
```

On Linux, drop the empty string after `-i`. Verify completeness:

```bash
grep -r '{{' . && echo "STILL HAS PLACEHOLDERS" || echo "OK"
```

The full variable list with descriptions lives in `apm_modules/AletheIA/packs/operating-overlay/manifest.yaml` under `variables:`.

## Step 4 — Fill the constitution

Replace `ops/ai/constitution/README.md` with four files:

- `mission.md` — what the project exists to do, for whom.
- `scope.md` — what is and is not in scope; the questions the team has decided not to ask.
- `stack.md` — primary languages, frameworks, infrastructure, and the why behind them.
- `principles.md` — non-negotiable rules and the values they protect.

The other placeholder READMEs (`handoffs/`, `reports/`, `policies/`, `learnings/`) can stay as placeholders until real content lands.

## Step 5 — Verify

Open a fresh Claude Code session in the project root and run the conformance test from [`docs/contracts/consumer-project-overlay.md` §8](../contracts/consumer-project-overlay.md#8-conformance-test-minimum). The session should:

1. Read `AGENTS.md` first.
2. Find the overlay under `ops/ai/`.
3. Read the constitution before acting.
4. Refuse to act outside scope without surfacing the conflict.

If any of those four behaviors are missing, the overlay is not correctly installed — see Troubleshooting below.

## Updates

When AletheIA publishes a new tag (e.g. `v0.2.0`):

```bash
apm update nevitonsantana/AletheIA
apm run scaffold-overlay --force        # overwrite existing scaffold
```

Before running `--force`, commit your current overlay state so you can diff and rescue any local customizations. The pack does not track adopter-side edits; that is your project's responsibility.

## Troubleshooting

**`apm: command not found`** — Install APM first; see [microsoft.github.io/apm/installation](https://microsoft.github.io/apm/).

**`apm install` succeeds but `apm run scaffold-overlay` says "unknown script"** — Confirm `apm_modules/AletheIA/apm.yml` exists. If it does, your APM version may not surface dependency-defined scripts via `apm run`. Workaround: invoke the script directly:

```bash
bash apm_modules/AletheIA/packs/operating-overlay/scripts/scaffold-overlay.sh
```

**`scaffold-overlay: target already contains overlay artifacts`** — Expected behavior on non-empty projects. Either remove the listed paths or pass `--force`. Always commit first.

**`scaffold-overlay: refusing to scaffold into the pack itself`** — You ran the script from inside the AletheIA repo. Run it from the consumer project root.

**Claude session ignores `AGENTS.md`** — Confirm the file exists at the project root (not in a subdirectory), that variables are substituted (no `{{...}}` left), and that you started the session from the project root, not a subdir. See [`docs/guides/setting-up-harnesses.md`](setting-up-harnesses.md) for harness-specific debugging.

## Related

- [ADR-007](../adr/ADR-007-apm-packaging-strategy.md) — why two-step adoption.
- [`packs/operating-overlay/README.md`](https://github.com/nevitonsantana/AletheIA/blob/main/packs/operating-overlay/README.md) — manual adoption path.
- [`docs/contracts/consumer-project-overlay.md`](../contracts/consumer-project-overlay.md) — the contract this scaffold satisfies.
- [`docs/guides/setting-up-harnesses.md`](setting-up-harnesses.md) — per-harness setup details.
