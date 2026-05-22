# Setting up harnesses

How to wire a consumer project to a harness (currently: Claude Code) so the harness reads the AletheIA operating overlay correctly. Five steps; ~15 minutes.

For the **what** and **why**, see:
- [operating-overlay](../concepts/operating-overlay.md) — three-layer model.
- [consumer-project-overlay](../contracts/consumer-project-overlay.md) — normative spec for the overlay surface.
- [`examples/consumer-overlay-minimal/`](../../examples/consumer-overlay-minimal/) — fully populated reference instantiation.

This guide assumes you already have at least a draft overlay (`ops/ai/` with the four constitution files) or are about to write one alongside the shim setup.

## Step 1 — Copy the Claude shim pack

From the AletheIA repo root, copy the shim directory into your consumer project root:

```bash
cp -R starter-pack/harness-shims/claude/. /path/to/consumer-project/
```

The `.` after `claude/` is intentional — it copies the directory's *contents* (including the dotfile `.claude/`) into the destination, not the `claude/` directory itself.

After the copy, your project root should contain:

```
consumer-project/
├── AGENTS.md.template
├── CLAUDE.md.template
├── README.md                 (the shim pack's own — delete after reading)
└── .claude/
    ├── settings.json.template
    └── rules/
        ├── src.md
        ├── tests.md
        └── ops-ai.md
```

## Step 2 — Rename templates

Strip the `.template` suffix on the three template files:

```bash
cd /path/to/consumer-project
mv AGENTS.md.template AGENTS.md
mv CLAUDE.md.template CLAUDE.md
mv .claude/settings.json.template .claude/settings.json
rm README.md   # the shim pack's README; not for the consumer repo
```

The path-scoped rules in `.claude/rules/` are not templated — they're starter content, edit in place.

## Step 3 — Substitute variables

Three variables in `AGENTS.md`, six in `.claude/settings.json`. List them:

```bash
grep -rh '{{' AGENTS.md .claude/settings.json | sort -u
```

You'll see:

```
{{BUILD_CMD}}
{{DEV_CMD}}
{{INSTALL_CMD}}
{{LINT_CMD}}
{{PRIMARY_STACK}}
{{PROJECT_NAME}}
{{PROJECT_ONE_LINER}}
{{TEST_CMD}}
```

Substitute with `sed` (one pass per variable). On macOS use `sed -i ''`; on GNU/Linux use `sed -i`:

```bash
# macOS
sed -i '' \
  -e 's|{{PROJECT_NAME}}|Acme Operations|g' \
  -e 's|{{PROJECT_ONE_LINER}}|Acme Operations surfaces emerging operational incidents in under 5 minutes|g' \
  -e 's|{{PRIMARY_STACK}}|TypeScript, Node 20, Postgres|g' \
  -e 's|{{INSTALL_CMD}}|pnpm install|g' \
  -e 's|{{TEST_CMD}}|pnpm test|g' \
  -e 's|{{LINT_CMD}}|pnpm lint|g' \
  -e 's|{{BUILD_CMD}}|pnpm build|g' \
  -e 's|{{DEV_CMD}}|pnpm dev|g' \
  AGENTS.md .claude/settings.json
```

Re-run the `grep` from above to confirm no `{{...}}` markers remain.

## Step 4 — Adapt the path-scoped rules

The three rules in `.claude/rules/` ship with reasonable defaults. Open each and:

- `src.md` — confirm the path matches your project's source path (rename the file if your code lives in `app/`, `lib/`, etc.). Adjust docstring conventions for your language.
- `tests.md` — confirm the test runner mention matches your stack. If you mock at the DB boundary by policy, edit accordingly.
- `ops-ai.md` — usually unchanged; the rules here are normative across all consumers.

Delete the `> Adapt to this project's…` notes once you've adapted.

## Step 5 — Verify with a fresh session

From the consumer project root, open a new Claude Code session and check the conformance test from the contract ([§8](../contracts/consumer-project-overlay.md#8-conformance-test-minimum)):

1. The agent locates `AGENTS.md` without being told.
2. The agent locates `ops/ai/constitution/` from `AGENTS.md` in ≤2 hops.
3. The agent can describe mission, scope, and stack from the constitution in its first response.
4. The agent finds the most recent handoff (or notes none exists yet) and proceeds without asking for context that should be in the constitution.

If any of those fail, the gap is usually:

- A missing constitution file → fill it.
- `AGENTS.md` linking to a path that doesn't exist → fix the link.
- The agent ignoring `AGENTS.md` → confirm the file is at the project root, not in a subdirectory.

## When to update the shims

Re-copy the shim pack when:

- A new template variable is added in canonical AletheIA.
- A new path-scoped rule is promoted from a consumer project to the canonical pack.
- A new harness (Codex, Cursor) is added — at which point its directory will appear alongside `claude/`.

Day-to-day edits to your project's `AGENTS.md`, `CLAUDE.md`, and rules are expected and local — don't push those back upstream unless they generalize.

## Other harnesses

Codex and Cursor shims are not yet packaged. See [ADR-004 §4](../adr/ADR-004-aletheia-as-operating-overlay.md) on the "no premature shims" position — a harness gets a shim pack when a real project adopts it.
