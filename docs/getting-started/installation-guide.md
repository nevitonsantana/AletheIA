# AletheIA — Installation Guide

> **Two-step installation.** AletheIA requires two commands to install: `apm install` downloads the package, and `apm run scaffold-overlay` materializes the overlay in your project. Do not skip the second step — the overlay will not be present after the first command alone. See [ADR-007](../adr/ADR-007-apm-packaging-strategy.md) for the reason.

This guide walks you through installing AletheIA into a new or existing project from scratch. Estimated time: 15–30 minutes.

---

## Prerequisites

Before you start, confirm:

1. **APM is installed.** Run `apm --version`. If the command is not found, install APM first:
   - Instructions: [microsoft.github.io/apm/installation](https://microsoft.github.io/apm/installation)
   - APM requires Node.js ≥ 18. Run `node --version` to confirm.

2. **You have a project directory.** AletheIA installs into a project root. You can use an existing project or create an empty one:
   ```bash
   mkdir my-project && cd my-project
   git init
   ```

3. **You are in the project root.** Run `pwd` (macOS/Linux) or `cd` (Windows) and confirm you are at the top level of the project, not inside a subdirectory.

4. **GitHub access.** The AletheIA package resolves from `github.com/nevitonsantana/AletheIA`. The repository is public. If your network requires auth for GitHub, configure APM credentials before proceeding (`apm config set github.token <your-pat>`).

---

## Step 1 — Install the AletheIA package

From the project root:

```bash
apm install nevitonsantana/AletheIA#v0.1.0-alpha
```

What happens:

- APM resolves the package at the pinned tag `v0.1.0-alpha`.
- The package is downloaded into `apm_modules/AletheIA/`.
- A lockfile `apm.lock.yaml` is written at the project root.

**Commit the lockfile.** The lockfile pins the exact version and content hash so teammates and CI get the same bytes:

```bash
git add apm.lock.yaml
git commit -m "chore: add AletheIA apm.lock.yaml"
```

The overlay is **not yet present** in your project after this step. Proceed to step 2.

### Verify step 1

```bash
ls apm_modules/AletheIA/
```

You should see `apm.yml`, `packs/`, `docs/`, and `README.md`. If the directory is missing, the install failed — see [Troubleshooting](#troubleshooting).

---

## Step 2 — Materialize the overlay

```bash
apm run scaffold-overlay
```

What happens:

- Copies the overlay structure from `apm_modules/AletheIA/packs/operating-overlay/` into your project root.
- Skips source-only artifacts (`README.md`, `manifest.yaml`, `scripts/`).
- Refuses to overwrite existing overlay files. If you already have `AGENTS.md`, `.claude/`, or `ops/ai/`, the command will list the conflicts and stop. See [Troubleshooting](#troubleshooting).

After this step your project root contains:

```
my-project/
├── AGENTS.md                      ← cross-agent dispatcher (needs variable substitution)
├── CLAUDE.md                      ← Claude Code shim (needs variable substitution)
├── .claude/
│   ├── settings.json              ← Claude Code configuration (needs variable substitution)
│   └── rules/
│       ├── src.md
│       ├── tests.md
│       └── ops-ai.md
└── ops/ai/
    ├── constitution/README.md     ← placeholder — you will replace this in step 4
    ├── handoffs/README.md
    ├── reports/README.md
    ├── policies/README.md
    ├── schemas/README.md
    ├── skills/README.md
    └── learnings/README.md
```

### Verify step 2

```bash
ls ops/ai/
```

You should see `constitution/`, `handoffs/`, `reports/`, `policies/`, `schemas/`, `skills/`, `learnings/`. If any are missing, check the command output for error messages.

---

## Step 3 — Substitute variables

The shim files ship with `{{PLACEHOLDER}}` variables. Substitute them before opening your first session.

**macOS:**

```bash
PROJECT_NAME="My Project"
ONE_LINER="Short description of what this project does"
STACK="TypeScript, Node 20"

sed -i '' \
  -e "s|{{PROJECT_NAME}}|${PROJECT_NAME}|g" \
  -e "s|{{PROJECT_ONE_LINER}}|${ONE_LINER}|g" \
  -e "s|{{PRIMARY_STACK}}|${STACK}|g" \
  -e 's|{{INSTALL_CMD}}|pnpm install|g' \
  -e 's|{{TEST_CMD}}|pnpm test|g' \
  -e 's|{{LINT_CMD}}|pnpm lint|g' \
  -e 's|{{BUILD_CMD}}|pnpm build|g' \
  -e 's|{{DEV_CMD}}|pnpm dev|g' \
  AGENTS.md CLAUDE.md .claude/settings.json
```

**Linux:** drop the empty string after `-i`:

```bash
sed -i \
  -e "s|{{PROJECT_NAME}}|${PROJECT_NAME}|g" \
  ...
  AGENTS.md CLAUDE.md .claude/settings.json
```

**Windows (PowerShell):**

```powershell
$files = @("AGENTS.md", "CLAUDE.md", ".claude\settings.json")
foreach ($f in $files) {
  (Get-Content $f) `
    -replace '\{\{PROJECT_NAME\}\}', 'My Project' `
    -replace '\{\{PROJECT_ONE_LINER\}\}', 'Short description' `
    -replace '\{\{PRIMARY_STACK\}\}', 'TypeScript, Node 20' `
    | Set-Content $f
}
```

Adjust the values for your project. The full variable list with descriptions is in `apm_modules/AletheIA/packs/operating-overlay/manifest.yaml` under `variables:`.

### Verify step 3

```bash
grep -r '{{' AGENTS.md CLAUDE.md .claude/settings.json && echo "STILL HAS PLACEHOLDERS" || echo "OK"
```

All output should be `OK` before proceeding.

---

## Step 4 — Fill the constitution

The constitution is the document agents read first to understand what game they are playing. Without it, the overlay is installed but governance is not anchored.

Replace `ops/ai/constitution/README.md` with four files:

```
ops/ai/constitution/
├── mission.md    ← what the project exists to do, for whom (one paragraph)
├── scope.md      ← what is and is not in scope; explicit "we do not do X"
├── stack.md      ← languages, frameworks, infrastructure — one line each
└── principles.md ← 5–10 non-negotiable rules and the values they protect
```

Start minimal. A single sentence per file is better than a placeholder paragraph. You will expand these as the project evolves.

Example `mission.md`:

```markdown
This project builds an internal incident-triage dashboard for the platform team.
The primary user is the on-call engineer who needs to understand alert scope in under 2 minutes.
```

Example `principles.md`:

```markdown
1. Never silently discard an alert. Surface failures visibly.
2. Prefer an explicit stop over silent scope expansion.
3. All agent actions in production require a human review gate.
```

---

## Step 5 — Verify the installation

Open a fresh Claude Code session from the project root:

```bash
claude
```

The session should:

1. Read `AGENTS.md` on startup.
2. Acknowledge the overlay under `ops/ai/`.
3. Read the constitution before acting on any task.
4. Surface a conflict if you ask it to do something outside the declared scope.

If any of the four behaviors are missing, the overlay is not correctly installed. See the [technical reference](../guides/install-via-apm.md#step-5--verify) for the full conformance checklist.

---

## Updating AletheIA

When a new version is published:

```bash
apm update nevitonsantana/AletheIA
apm run scaffold-overlay --force
```

Before running `--force`, commit your current overlay state so you can compare and rescue any local customizations. The pack does not track adopter-side edits.

---

## Troubleshooting

**`apm: command not found`**  
APM is not installed or not on `$PATH`. Follow the APM installation guide at [microsoft.github.io/apm/installation](https://microsoft.github.io/apm/installation). Restart your shell after installation.

**`apm install` completes but `apm_modules/AletheIA/` is empty**  
Network or auth issue. If the repo requires GitHub auth, run `apm config set github.token <your-pat>` first. Run `apm install --verbose` for details.

**`apm run scaffold-overlay` says "unknown script"**  
Your APM version may not surface package-defined scripts. Invoke the script directly:

```bash
bash apm_modules/AletheIA/packs/operating-overlay/scripts/scaffold-overlay.sh
```

**`scaffold-overlay: target already contains overlay artifacts`**  
The project already has `AGENTS.md`, `.claude/`, or `ops/ai/`. Either remove those paths or pass `--force`. Always commit your current state first so nothing is lost.

**`scaffold-overlay: refusing to scaffold into the pack itself`**  
You ran the command from inside `apm_modules/AletheIA/` instead of the project root. `cd` back to the project root and retry.

**`sed: command not found` on Windows**  
PowerShell is the recommended approach on Windows (see step 3). Alternatively, use Git Bash which ships `sed`.

**Claude ignores `AGENTS.md`**  
Confirm `AGENTS.md` is at the project root (not in a subdirectory), variables are substituted (no `{{...}}` remaining), and you started the Claude Code session from the project root. See [`docs/guides/setting-up-harnesses.md`](../guides/setting-up-harnesses.md) for harness-specific debugging.

**The session reads the constitution but refuses to act on anything**  
Check `scope.md`. An overly narrow scope can cause the agent to surface a conflict for nearly every task. Start with a broader declaration and tighten it as you learn which constraints matter.

---

## What to do next

1. Run your first Work Slice: [`docs/core-operating-path.md`](../core-operating-path.md)
2. Browse what the overlay provides: [`catalog.md`](catalog.md)
3. Review the daily operations workflow: [`starter-pack/guides/daily-operations.md`](../../starter-pack/guides/daily-operations.md)
4. Read the technical reference for this install flow: [`docs/guides/install-via-apm.md`](../guides/install-via-apm.md)
