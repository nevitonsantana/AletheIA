# Hermes first real microtest — blocked provider/auth attempt

Date: 2026-04-29
Issue: #105 — Hermes first real microtest contract
Status: blocked before real task execution
Sandbox root: `/private/tmp/hermes-real-microtest-20260429-094612`

## 1. Approved contract

The human approved the first real Hermes microtest with:

1. provider/auth: `hermes auth / OpenAI Codex auth se disponível no sandbox`;
2. disposable sandbox: yes;
3. task: generate `microtest-output.md` according to the merged contract;
4. `.agent` visible: yes, only the sandbox-generated Agentic Stack `.agent/`;
5. success/stop criteria: approved.

Execution was started only after this approval.

## 2. Sandbox setup evidence

A fresh sandbox was created at:

`/private/tmp/hermes-real-microtest-20260429-094612`

Setup performed inside the sandbox:

- Hermes Agent installed with isolated `HOME`, `HERMES_HOME`, and `HERMES_INSTALL_DIR`.
- Agentic Stack cloned into the sandbox.
- Agentic Stack `hermes` adapter installed into `/private/tmp/hermes-real-microtest-20260429-094612/project`.
- The project contains sandbox-generated `AGENTS.md` and `.agent/`.
- Real user-level `/Users/nevitonsantana/.hermes` was absent before setup and after the blocked attempt.

Hermes version evidence:

```text
Hermes Agent v0.11.0 (2026.4.23)
Project: /private/tmp/hermes-real-microtest-20260429-094612/home/.hermes/hermes-agent
Python: 3.11.14
OpenAI SDK: 2.32.0
```

Hermes doctor evidence:

```text
Auth Providers
  ⚠ Nous Portal auth (not logged in)
  ⚠ OpenAI Codex auth (not logged in)
    → No Codex credentials stored. Run `hermes auth` to authenticate.
  ⚠ Google Gemini OAuth (not logged in)
  ✓ codex CLI
```

## 3. Provider/auth attempt

The approved provider/auth route was checked in the sandbox.

`hermes auth status openai-codex` returned:

```text
openai-codex: logged out (No Codex credentials stored. Run `hermes auth` to authenticate.)
```

`hermes login --provider openai-codex --no-browser --timeout 15` returned:

```text
The 'hermes login' command has been removed.
Use 'hermes auth' to manage credentials,
'hermes model' to select a provider, or 'hermes setup' for full setup.
```

`hermes auth add openai-codex --type oauth --no-browser --timeout 15` produced no usable login output and did not complete promptly. It was stopped under the approved stop criteria because provider/auth was not available in a usable non-interactive sandbox state.

## 4. Task execution result

The real Hermes task was **not executed**.

`microtest-output.md` was **not created**.

Reason: OpenAI Codex auth was not available inside the sandbox, and the approved contract required stopping if the provider/auth path was unavailable or required a non-approved step.

## 5. File and boundary checks

- `.agent/` was generated only in the sandbox project.
- No memory or skill was promoted into AletheIA.
- No gateway, cron, daemon, service, or autonomy was activated.
- Real `/Users/nevitonsantana/.hermes` was confirmed absent after the blocked attempt.
- The main local AletheIA checkout was not used for the microtest and remained in its pre-existing dirty state on an unrelated branch.

## 6. Verdict

Blocked before real Hermes task execution.

The install + adapter setup succeeded, but the first real Hermes microtest could not run because the approved provider/auth route was not usable in the sandbox:

- OpenAI Codex auth was detected as logged out by Hermes.
- `hermes login` is removed in Hermes v0.11.0.
- `hermes auth add openai-codex --type oauth --no-browser` did not produce a usable non-interactive authorization result.

This is not Hermes telemetry and not a successful real-task run.

## 7. Next decision needed

Choose one of these next provider/auth paths:

1. Run an interactive Hermes auth flow manually and then resume the microtest.
2. Approve a temporary OpenRouter key stored only in the sandbox `.env`.
3. Approve a local OpenAI-compatible endpoint for the microtest.
4. Choose another explicit provider/auth route supported by Hermes.

Until then, Issue #105 remains blocked.
