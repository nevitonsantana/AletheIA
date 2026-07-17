# AletheIA — FAQ

Answers to common questions from teams adopting AletheIA for the first time.

---

## General

**What exactly is AletheIA?**  
AletheIA is an operating overlay — a governance layer you add to a project that shapes how AI-assisted work is scoped, decided, validated, handed off, and learned from. It is not an agent runtime, not a bundle of specialist agents, and not a product framework. See [`overview.md`](overview.md) for the full description.

**Does AletheIA replace BMAD, SDD, or my current method?**  
No. AletheIA is complementary to squad methods like BMAD or SDD. It adds the operating loop those methods do not provide: explicit scope, governance gates, handoffs between sessions, and durable learnings. Use AletheIA alongside your existing method, not instead of it. See [ADR-005](../adr/ADR-005-positioning-in-agentic-ecosystem.md) for the full positioning.

**Does AletheIA require a specific agent or runtime?**  
No. AletheIA is runtime-agnostic. The core overlay (`ops/ai/`, `AGENTS.md`, constitution) works with any agent that reads `AGENTS.md`. Harness-specific shims (`.claude/`, `CLAUDE.md`) are optional adapters for specific runtimes. Currently Claude Code is the primary supported harness; others are planned.

**How is AletheIA different from Adaptive Skills?**  
AletheIA governs the work — it decides scope, gates, handoffs, and validation. Adaptive Skills provides specialist capabilities that execute within that governance. They are designed to be used together: AletheIA decides the flow, skills shape what gets done. See [ADR-005](../adr/ADR-005-positioning-in-agentic-ecosystem.md) for the layer model.

**The README mentions Crisis Monitor. Is AletheIA only for that domain?**  
No. Crisis Monitor was the first project that validated AletheIA, preserved under `docs/pilots/` as a case study. AletheIA is domain-agnostic — it has been applied to software engineering, design work, and data analysis. See [ADR-006](../adr/ADR-006-domain-agnosticism.md).

**What does "v0.1.0-alpha" mean?**  
The APM package is in alpha. The core framework (AletheIA 1.0) is stable — the vocabulary, operating loop, and governance patterns are production-ready. The alpha tag applies to the APM packaging layer specifically, which may change as APM evolves. Do not use `--force` updates in production without reviewing the diff first.

---

## Installation

**Why does installation require two commands?**  
APM does not support install-time hooks for materializing project scaffolds. `apm install` downloads the package; `apm run scaffold-overlay` copies it into your project. This is a known limitation of the current APM spec, documented in [ADR-007](../adr/ADR-007-apm-packaging-strategy.md).

**Can I install AletheIA without APM?**  
Yes. The manual adoption path copies the pack directly without APM. See [`packs/operating-overlay/README.md`](https://github.com/nevitonsantana/AletheIA/blob/main/packs/operating-overlay/README.md) for the manual steps.

**I ran `apm install` but `apm_modules/AletheIA/` is empty. What happened?**  
This is usually a network or auth issue. Run `apm install --verbose` for details. If you are behind a corporate proxy or require GitHub auth, configure APM credentials first: `apm config set github.token <your-pat>`.

**`apm run scaffold-overlay` says the script is unknown.**  
Your APM version may not surface package-defined scripts. Use the direct path instead:

```bash
bash apm_modules/AletheIA/packs/operating-overlay/scripts/scaffold-overlay.sh
```

**I already have `.claude/` and `AGENTS.md` in my project. Will the scaffold overwrite them?**  
No. `scaffold-overlay` refuses to overwrite existing overlay artifacts. If you want to replace your current setup with the AletheIA scaffold, remove those files first, then run the command. Always commit your current state before doing so.

**Do I need to re-run the install on every machine?**  
Yes. `apm install` is per-machine. However, you should commit `apm.lock.yaml` to the repository so teammates and CI get the exact same package version. Teammates run `apm install` (without the tag) to restore from the lockfile.

---

## Security and credentials

**Does AletheIA read my credentials, tokens, or environment variables?**  
No. The overlay reads `AGENTS.md`, the constitution, and working folders. It does not read environment files, `.env`, or anything outside `ops/ai/` unless you explicitly point the constitution at those locations (which you should not do — credentials do not belong in the overlay).

**Is it safe to commit `AGENTS.md` and `CLAUDE.md` to a public repository?**  
Yes, as long as you do not put credentials or sensitive internal information in them. The shim files contain project metadata (name, description, stack) and overlay configuration — nothing sensitive by design.

**What if an agent reads `ops/ai/policies/` and that folder contains internal rules?**  
Policies are instructions for the agent, not secrets. They describe constraints (e.g., "require a human review gate before production deploys") — similar to a CONTRIBUTING.md. Treat them as you would any project documentation.

**Can the overlay be used to give agents broad access to my system?**  
AletheIA shapes behavior through instructions, not enforcement. The overlay cannot grant permissions the harness does not already have. Permission management is done in `.claude/settings.json` and the harness's own configuration.

---

## Environment

**Does AletheIA work on Windows?**  
Yes. The core overlay (markdown files and directory structure) is platform-agnostic. Use your platform's text-editing tools to replace the generated variables (see [Install AletheIA](/getting-started/installation-guide/#install-with-apm)). APM itself supports Windows.

**Does it work in CI/CD pipelines?**  
The overlay files are part of your repository and are available in CI. Running a Claude Code session in CI is a separate question — AletheIA does not add or remove CI constraints. If your pipeline uses a Claude Code step, the overlay will be loaded automatically if the repository includes it.

**What Node.js version does APM require?**  
Node.js ≥ 18. Run `node --version` to check. AletheIA itself has no Node.js dependency — this is an APM requirement.

**Can I use AletheIA without Claude Code?**  
Yes. `AGENTS.md` and `ops/ai/` work with any conformant harness. The `.claude/` shim is only needed for Claude Code. If you use a different harness, you may need a harness-specific adapter — see [`docs/concepts/adapter-taxonomy.md`](../concepts/adapter-taxonomy.md).

---

## Common errors

**The agent ignores the constitution and acts outside scope.**  
First, confirm the constitution is non-empty and variables are substituted (no `{{...}}`). Then check that `AGENTS.md` correctly references the constitution path. If both look correct, the harness may not be reading `AGENTS.md` on startup — see the harness debugging guide at [`docs/guides/setting-up-harnesses.md`](../guides/setting-up-harnesses.md).

**The agent refuses to do almost anything, citing scope conflicts.**  
Your `scope.md` is probably too narrow. A scope declaration that lists only one specific task will block everything else. Broaden `scope.md` to reflect the project's actual domain, then list explicit exclusions for what you genuinely do not want agents touching.

**The session ended without a handoff and I lost context.**  
This is a discipline gap, not a bug. To recover, reconstruct context from the last report in `ops/ai/reports/` and the last handoff in `ops/ai/handoffs/`. Going forward, always ask for a handoff before ending a long session.

**The agent creates handoffs and reports but does not use learnings.**  
Learnings are passive — the agent reads them if `AGENTS.md` includes the learnings folder in the reading order, but using them requires referencing them explicitly in new sessions. Add a line to `CLAUDE.md` or `AGENTS.md` instructing agents to read learnings before starting work.

**`grep -r '{{' ...` still shows placeholders after substitution.**  
The substitution command may have missed some files or you may have used the wrong variable list. Run `grep -r '{{' AGENTS.md CLAUDE.md .claude/settings.json` to find remaining placeholders. The full variable list is in `apm_modules/AletheIA/packs/operating-overlay/manifest.yaml`.

---

## Working as a team

**How do multiple people use the same AletheIA overlay?**  
The overlay files are part of the repository. Everyone on the team works from the same constitution, policies, and accumulated handoffs and learnings. Each person runs their own agent sessions; handoffs in `ops/ai/handoffs/` connect sessions across people.

**Should handoffs be committed to the repository?**  
Yes. Handoffs and learnings are shared operational context. Commit them as you would any other project document. Reports should be committed on closeout.

**Who owns the constitution?**  
The constitution is a team document. The tech lead or project owner typically authors it, but anyone can propose changes. Treat changes to the constitution with the same weight as changes to a team charter — they affect how all agents on the project behave.

**Can two people run agent sessions simultaneously?**  
Yes, but with caution. Two parallel sessions that touch the same files will produce merge conflicts in the normal way. The overlay does not prevent this — coordination is a team responsibility. For high-risk parallel work, assign separate scopes to each session and use policies to separate the domains.

**What happens when a new team member joins?**  
They clone the repository, run `apm install` (which restores from `apm.lock.yaml`), read the constitution and the most recent handoff, and they are ready. The accumulated handoffs and learnings serve as an operational history.

---

## OS-specific notes

| Topic | macOS | Linux | Windows |
|---|---|---|---|
| Variable substitution | `sed -i '' -e ...` (empty string after `-i`) | `sed -i -e ...` (no empty string) | PowerShell `(Get-Content ...) -replace ... \| Set-Content` |
| APM installation | Homebrew or npm: `npm install -g @microsoft/apm` | npm: `npm install -g @microsoft/apm` | npm or winget |
| Shell | zsh (default in macOS 10.15+) | bash | PowerShell or Command Prompt |
| Line endings | LF | LF | CRLF by default — configure `git config core.autocrlf input` to avoid diff noise in markdown |
| Path separator | `/` | `/` | `\` in native Windows paths; use `/` in APM commands and scripts |

For harness-specific OS differences (Claude Code installation, permissions, etc.), see [`docs/guides/setting-up-harnesses.md`](../guides/setting-up-harnesses.md).
