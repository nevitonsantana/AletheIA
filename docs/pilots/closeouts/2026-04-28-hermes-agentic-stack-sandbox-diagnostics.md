# Hermes Agent + Agentic Stack sandbox-install diagnostics — closeout

Date: 2026-04-28
Issue: #103 — Hermes Agent + Agentic Stack sandbox-install diagnostics
Boundary: controlled disposable sandbox install/diagnostics only
Sandbox root: `/private/tmp/hermes-agentic-prepilot-20260428-122636`

## 1. Objective and decision boundary

Run the next controlled pre-pilot boundary for Hermes by installing and diagnosing Hermes Agent plus Agentic Stack in a disposable sandbox outside the AletheIA repo root.

Human authorization: approved in the current Codex thread on 2026-04-28 for sandbox-only installation and diagnostics.

This closeout must not be used as proof of Hermes autonomous execution or production telemetry.

## 2. Scope and non-goals before execution

In scope:

- Create a disposable sandbox outside the main AletheIA checkout.
- Install/diagnose Hermes Agent with isolated `HOME`, `HERMES_HOME`, and `HERMES_INSTALL_DIR`.
- Install/diagnose Agentic Stack in the sandbox.
- Verify whether the `hermes` adapter exists and can generate harness files.
- Inspect generated `.agent/`, `AGENTS.md`, memory, skills, permission, or configuration files.
- Record command evidence and a readiness verdict.

Out of scope:

- No installation in the root of the main AletheIA repo.
- No productive Hermes task.
- No gateway, cron, daemon, continuous automation, or autonomy.
- No promotion of memory or skills.
- No ADR changes without a later human decision.
- No claim that Codex output is Hermes telemetry.

## 3. Pre-execution plan and validation criteria

Planned sandbox root: `/private/tmp/hermes-agentic-prepilot-*`.

Planned evidence:

- `hermes --version` and `hermes doctor` or nearest available equivalent.
- `agentic-stack --help`, adapter/status/doctor equivalents, and `agentic-stack hermes --yes` or nearest non-interactive equivalent.
- File inventory before and after adapter generation.
- Explicit inspection of generated memory/skills/config/permission files.

Acceptance criteria:

- Closeout sections 1-3 completed before execution.
- Commands and outputs recorded with enough evidence to resume or reproduce.
- Generated files/configurations listed.
- Verdict: ready for first real Hermes microtest, or blocked with reason.

## 4. Execution evidence

### Preflight

- Existing AletheIA local checkout was dirty and was not used for edits.
- PR #101 was verified merged into `main` on 2026-04-28T15:19:48Z.
- Issue #100 was verified closed/Done and explicitly pointed to a new sandbox-install boundary only after human authorization.
- New Issue #103 was created for this boundary.
- Clean repo clone for the closeout was created at `/private/tmp/hermes-agentic-prepilot-20260428-122636/AletheIA-clean`.
- Diagnostic project was created at `/private/tmp/hermes-agentic-prepilot-20260428-122636/diagnostic-project`.

### Hermes Agent install

Source command shape:

```bash
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh -o "$SANDBOX_ROOT/hermes-install.sh"
env HOME="$SANDBOX_ROOT/home" \
  HERMES_HOME="$SANDBOX_ROOT/home/.hermes" \
  HERMES_INSTALL_DIR="$SANDBOX_ROOT/home/.hermes/hermes-agent" \
  PATH="$SANDBOX_ROOT/home/.local/bin:$SANDBOX_ROOT/home/.hermes/bin:$PATH" \
  bash "$SANDBOX_ROOT/hermes-install.sh" --skip-setup
```

Result:

- Hermes Agent installed under sandbox home only: `/private/tmp/hermes-agentic-prepilot-20260428-122636/home/.hermes/hermes-agent`.
- `hermes` symlink created at `/private/tmp/hermes-agentic-prepilot-20260428-122636/home/.local/bin/hermes`.
- Setup wizard was skipped with `--skip-setup`.
- No gateway, service, cron install, daemon, or productive task was executed.
- Real `/Users/nevitonsantana/.hermes` was confirmed absent after containment.

Diagnostic output:

```text
$ hermes --version
Hermes Agent v0.11.0 (2026.4.23)
Project: /private/tmp/hermes-agentic-prepilot-20260428-122636/home/.hermes/hermes-agent
Python: 3.11.14
OpenAI SDK: 2.32.0
Up to date

$ hermes doctor
Hermes Doctor
- Python Environment: Python 3.11.14, virtual environment active
- Required Packages: OpenAI SDK, Rich, python-dotenv, PyYAML, HTTPX present
- Configuration Files: ~/.hermes/.env exists, ~/.hermes/config.yaml exists, config version v22
- Directory Structure: ~/.hermes/cron, sessions, logs, skills, memories, SOUL.md present
- External Tools: git, ripgrep, Node.js, agent-browser present; docker optional not found
- Tool Availability: core tools available; several provider/platform tools missing expected API tokens
- Found 1 issue: run `hermes setup` to configure missing API keys for full tool access
```

Additional check:

```text
$ hermes config check
Config version: 22 ✓
Optional provider/API variables are unset unless provided later by a human-approved setup step.
```

### Agentic Stack install and Hermes adapter

The global `agentic-stack` brew path was not used. The repo was cloned into the sandbox and its local dispatcher was used:

```bash
git clone https://github.com/codejunkie99/agentic-stack.git "$SANDBOX_ROOT/agentic-stack-src"
"$SANDBOX_ROOT/agentic-stack-src/install.sh" status "$SANDBOX_ROOT/diagnostic-project"
"$SANDBOX_ROOT/agentic-stack-src/install.sh" doctor "$SANDBOX_ROOT/diagnostic-project"
"$SANDBOX_ROOT/agentic-stack-src/install.sh" hermes "$SANDBOX_ROOT/diagnostic-project" --yes
"$SANDBOX_ROOT/agentic-stack-src/install.sh" status "$SANDBOX_ROOT/diagnostic-project"
"$SANDBOX_ROOT/agentic-stack-src/install.sh" doctor "$SANDBOX_ROOT/diagnostic-project"
```

Pre-install status:

```text
no install.json at .../diagnostic-project/.agent/install.json
nothing to audit. install an adapter with: ./install.sh <adapter-name>
```

Adapter availability:

```text
adapters: _shared, antigravity, claude-code, codex, cursor, hermes, openclaw, opencode, pi, standalone-python, windsurf
```

Post-install status:

```text
project:  /private/tmp/hermes-agentic-prepilot-20260428-122636/diagnostic-project
brain:    .agent/  (9 skills, 4 episodic, 1 lessons)
version:  agentic-stack 0.12.0
updated:  2026-04-28T15:31:51Z

adapters installed (1):
  • hermes
```

Post-install doctor:

```text
auditing 1 installed adapter(s) in .../diagnostic-project
✓ hermes             green
summary: 1 adapter(s), all green or yellow
```

## 5. Generated files and configuration inventory

### Hermes Agent sandbox home

Generated under `/private/tmp/hermes-agentic-prepilot-20260428-122636/home`:

- `.local/bin/hermes` -> symlink to sandbox venv entrypoint.
- `.hermes/config.yaml` — default Hermes config; default model entry is `anthropic/claude-opus-4.6`; provider is `auto`; terminal backend defaults to local execution with `cwd: "."`.
- `.hermes/.env` — template only; provider/API keys remain unset in this sandbox run.
- `.hermes/SOUL.md` — default persona template.
- `.hermes/cron/`, `.hermes/sessions/`, `.hermes/logs/`, `.hermes/memories/`, `.hermes/pairing/`, `.hermes/hooks/`.
- `.hermes/hermes-agent/` — cloned Hermes Agent source plus venv, node dependencies, web/TUI/gateway code, tests, scripts, and bundled skills source.
- `.hermes/skills/` — 83 bundled skills synced by the Hermes installer, grouped into 24 top-level category directories.
- `Library/Caches/ms-playwright/` and `Library/Caches/camoufox/` — browser automation assets downloaded under the sandbox home.
- `.npm/` and `.cache/uv/` — package caches under the sandbox home.

Important: these Hermes skills/memory files were generated only inside the disposable sandbox and were not promoted into AletheIA, Codex, or user-level skill stores.

### Agentic Stack diagnostic project

Generated under `/private/tmp/hermes-agentic-prepilot-20260428-122636/diagnostic-project`:

- `AGENTS.md` — Hermes adapter file pointing Hermes to `.agent/`.
- `.agent/AGENTS.md` — portable brain map.
- `.agent/install.json` — records Agentic Stack version `0.12.0`, adapter `hermes`, and written file `AGENTS.md`.
- `.agent/memory/personal/PREFERENCES.md` — generated defaults from onboarding with `--yes`.
- `.agent/memory/.features.json` — beta features off by default (`memory_search_fts: false`, `tldraw: false`).
- `.agent/memory/semantic/LESSONS.md`, `DECISIONS.md`, `DOMAIN_KNOWLEDGE.md`, `lessons.jsonl`.
- `.agent/memory/episodic/AGENT_LEARNINGS.jsonl`.
- `.agent/memory/working/WORKSPACE.md`.
- `.agent/protocols/permissions.md`, `delegation.md`, `hook_patterns.json`, and tool schemas.
- `.agent/skills/` — 9 portable skills (`data-flywheel`, `data-layer`, `debug-investigator`, `deploy-checklist`, `design-md`, `git-proxy`, `memory-manager`, `skillforge`, `tldraw`).
- `.agent/tools/` — memory/learning helper scripts such as `recall.py`, `learn.py`, `memory_reflect.py`, `graduate.py`, and review helpers.

Hermes adapter manifest:

```json
{
  "name": "hermes",
  "description": "Hermes Agent (Nous Research) — AGENTS.md workspace context. agentskills.io-compatible.",
  "files": [
    {
      "src": "AGENTS.md",
      "dst": "AGENTS.md",
      "merge_policy": "merge_or_alert"
    }
  ]
}
```

## 6. Risks, blocked items, and safeguards

### Safeguards that held

- Main AletheIA checkout was not used for installation.
- Closeout sections 1-3 were completed before the install commands.
- Hermes setup wizard was skipped.
- Gateway/service/cron install was not invoked.
- No productive Hermes task was run.
- No memory or skill was promoted outside the sandbox.
- Real `/Users/nevitonsantana/.hermes` was absent after containment.

### Incident contained during diagnostics

A first Hermes installer attempt downloaded the installer into the sandbox but executed it without exporting isolated `HOME`, `HERMES_HOME`, and `HERMES_INSTALL_DIR` on the installer process itself. It began creating `/Users/nevitonsantana/.hermes/hermes-agent`.

Containment:

- The process was interrupted.
- The unintended real-home install was moved to `/private/tmp/hermes-agentic-prepilot-20260428-122636/quarantine/dot-hermes-unintended-home-install`.
- `/Users/nevitonsantana/.hermes` was confirmed absent afterward.
- The successful install was rerun with the correct `env HOME=... HERMES_HOME=... HERMES_INSTALL_DIR=...` wrapper.

Learning: for Hermes, isolating only preflight commands is insufficient; the installer execution itself must be wrapped with the sandbox environment.

### Remaining blockers

- `hermes doctor` reports one setup issue: missing API/provider configuration for full tool access.
- Several optional tools are unavailable without tokens or system dependencies (`OPENROUTER_API_KEY`, Discord token, web/search API keys, Docker, etc.).
- Hermes default config uses local terminal execution with `cwd: "."`; a real microtest needs an explicit safe working directory and command boundary.
- Agentic Stack creates portable memory and skills by design; they are acceptable for sandbox inspection but should not be promoted to the real AletheIA repo without a separate human decision.

## 7. Verdict

Installation diagnostics succeeded, but the system is **blocked for the first real Hermes microtest** until a human makes the next provider/runtime decision.

Reason:

- Hermes Agent v0.11.0 installs and `hermes doctor` runs in the sandbox.
- Agentic Stack installs the `hermes` adapter and `doctor` reports it green.
- However, Hermes has not been configured with an approved provider/API/auth path for a real task, and no safe microtest command/workdir contract has been approved.

Operational verdict:

- Ready for review of sandbox artifacts and configuration surface.
- Not yet ready to run a real Hermes microtest.
- Next boundary should be a separately approved microtest with explicit provider/auth choice, safe working directory, no memory/skill promotion, and no gateway/autonomy.

## 8. Next step and human decision needed

Recommended next step:

1. Keep this sandbox diagnostic evidence as non-telemetry setup proof.
2. Decide whether to approve a first real Hermes microtest.
3. If approved, define the microtest contract before execution:
   - provider/auth path (`hermes auth`, local endpoint, OpenRouter, Nous Portal, etc.);
   - safe disposable working directory;
   - exact allowed command/task;
   - whether built-in Hermes skills and Agentic Stack `.agent/` should be visible;
   - explicit prohibition on memory/skill promotion and gateway/cron/autonomy.

Decision humana necessária:

- Choose provider/auth route for the first real Hermes microtest.
- Approve or reject use of Agentic Stack-generated `.agent/` as context in the real microtest.
- Confirm whether to keep this as a one-off diagnostic closeout or create a follow-up ADR only after the first real microtest result.
