# Preset — minimal-overlay

Day-one operating overlay for a consumer project using Claude Code. A single bundle that combines:

- The required `ops/ai/` directory skeleton (per [consumer-project-overlay contract](../../../docs/contracts/consumer-project-overlay.md))
- The Claude harness shim (per [Epic 5 shim pack](../../harness-shims/claude/))
- A [`manifest.yaml`](manifest.yaml) recording the canonical source of every file

Use this preset when starting a new consumer project, or when retrofitting overlay structure onto an existing one. The preset is static and reviewable on purpose — no CLI, no generator, no magic.

For background, see:
- [operating-overlay concept](../../../docs/concepts/operating-overlay.md) — the three-layer model
- [consumer-project-overlay contract](../../../docs/contracts/consumer-project-overlay.md) — what the preset satisfies
- [setting-up-harnesses guide](../../../docs/guides/setting-up-harnesses.md) — step-by-step adoption walkthrough
- [`examples/consumer-overlay-minimal/`](../../../examples/consumer-overlay-minimal/) — a populated reference for what this preset becomes after adoption

## What's in the bundle

```
minimal-overlay/
├── README.md                       # this file (delete after adoption)
├── manifest.yaml                   # provenance + variables + checklist
├── AGENTS.md                       # harness dispatcher (≤150 lines)
├── CLAUDE.md                       # Claude-specific shim (≤30 own lines)
├── .claude/
│   ├── settings.json               # Claude Code config
│   └── rules/
│       ├── src.md                  # path-scoped rule for product source
│       ├── tests.md                # path-scoped rule for tests
│       └── ops-ai.md               # path-scoped rule for the overlay folder
└── ops/ai/
    ├── constitution/README.md      # placeholder — replace with mission/scope/stack/principles
    ├── handoffs/README.md          # placeholder — first handoff replaces it
    ├── reports/README.md           # placeholder — first closeout replaces it
    ├── policies/README.md          # placeholder — populate if non-default constraints exist
    ├── schemas/README.md           # placeholder — populate only if needed
    ├── skills/README.md            # placeholder — populate only if needed
    └── learnings/README.md         # placeholder — first learning replaces it
```

The bundle has **no template suffixes** — files are already in their adopted names. Adoption is copy + variable substitution + fill the constitution.

## Adoption (new project)

1. **Copy** the preset into the new project root:
   ```bash
   cp -R starter-pack/presets/minimal-overlay/. /path/to/new-project/
   cd /path/to/new-project
   ```
   The `.` after `minimal-overlay/` copies contents (including dotdirs) rather than the directory itself.

2. **Remove the source artifacts** that don't belong in a runtime project:
   ```bash
   rm README.md manifest.yaml
   ```
   Keep these only if you want a record of the preset version inside the project.

3. **Substitute variables.** See `manifest.yaml`'s `variables:` section for the full list. On macOS:
   ```bash
   sed -i '' \
     -e 's|{{PROJECT_NAME}}|My Project|g' \
     -e 's|{{PROJECT_ONE_LINER}}|<one sentence>|g' \
     -e 's|{{PRIMARY_STACK}}|TypeScript, Node 20|g' \
     -e 's|{{INSTALL_CMD}}|pnpm install|g' \
     -e 's|{{TEST_CMD}}|pnpm test|g' \
     -e 's|{{LINT_CMD}}|pnpm lint|g' \
     -e 's|{{BUILD_CMD}}|pnpm build|g' \
     -e 's|{{DEV_CMD}}|pnpm dev|g' \
     AGENTS.md .claude/settings.json
   ```
   Verify: `grep -r '{{' .` should return nothing.

4. **Fill the constitution.** Replace `ops/ai/constitution/README.md` with the four required files (mission, scope, stack, principles). The other placeholder READMEs can stay until real content lands.

5. **Verify** with a fresh Claude Code session — see the [§8 conformance test](../../../docs/contracts/consumer-project-overlay.md#8-conformance-test-minimum) in the contract.

Time budget: ~30 minutes of focused work for a new project, longer for legacy retrofits that need scope and principle decisions surfaced.

## Adoption (legacy project)

Same five steps, with two adjustments:

- After step 3, **don't backfill history.** No fake handoffs, closeouts, or learnings from before adoption date (per contract §6 "anti-pattern: don't backfill").
- Treat the constitution as a forcing function. If `scope.md` exposes a question the team has been avoiding, that's the constitution doing its job — answer it before opening sessions on the new overlay.

## What this preset deliberately does NOT include

- **Codex, Cursor, or other harness shims.** Only Claude. Other harnesses wait for a real adopter (ADR-004 §4 "no premature shims").
- **Product-architecture opinions.** No `src/` layout, no framework preference, no build-tool stance.
- **Pre-filled handoffs, closeouts, or learnings.** The overlay starts at adoption date.
- **A generator or CLI.** Static bundle on purpose — easier to review, version, and roll back.

## Versioning

The preset version is in `manifest.yaml` (`version:` field). When the canonical contract changes in a way that requires preset updates, bump the version and update the `provenance:` entries to match.

Consumer projects MAY pin to a specific preset version by copying `manifest.yaml` into the project and treating future updates as opt-in upgrades.
