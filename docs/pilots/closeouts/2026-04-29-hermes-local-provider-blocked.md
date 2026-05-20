# Hermes first real microtest — local provider blocked

Date: 2026-04-29
Issue: #105 — Hermes first real microtest contract
Status: blocked before real task execution
Probe root: `/private/tmp/hermes-real-microtest-local-provider-20260429-100104`

## 1. Context

After the approved first real Hermes microtest stopped on unavailable OpenAI Codex auth, the next safest no-secret provider route was attempted: discover a local OpenAI-compatible endpoint.

This path avoids committing secrets, avoids external API keys, and does not require interactive OAuth.

## 2. What was tested

A fresh probe root was created at:

`/private/tmp/hermes-real-microtest-local-provider-20260429-100104`

The following localhost endpoints were checked:

- `http://127.0.0.1:1234/v1/models` — common LM Studio default.
- `http://127.0.0.1:11434/v1/models` — Ollama OpenAI-compatible endpoint when enabled.
- `http://127.0.0.1:8000/v1/models` — common vLLM/local server default.
- `http://127.0.0.1:8080/v1/models` — common local API port.
- `http://127.0.0.1:3000/v1/models` — common local app/API port.
- `http://127.0.0.1:5000/v1/models` — common Flask/local API port.
- `http://127.0.0.1:11434/api/tags` — Ollama native endpoint.

## 3. Evidence

All tested local endpoints failed to connect:

```text
port 1234 /v1/models -> Failed to connect
port 11434 /v1/models -> Failed to connect
port 8000 /v1/models -> Failed to connect
port 8080 /v1/models -> Failed to connect
port 3000 /v1/models -> Failed to connect
port 5000 /v1/models -> Failed to connect
port 11434 /api/tags -> Failed to connect
```

Raw log:

`/private/tmp/hermes-real-microtest-local-provider-20260429-100104/logs/00-local-endpoint-probes.log`

## 4. Task execution result

The real Hermes task was **not executed**.

Reason: no approved provider/auth route was available. The local OpenAI-compatible provider route had no running endpoint.

## 5. Boundary checks

- No Hermes task command was run in this local-provider attempt.
- No provider key was used.
- No gateway, cron, daemon, service, or autonomy was activated.
- No memory or skill was promoted.
- No repo root install was performed.

## 6. Verdict

Blocked.

The first real Hermes microtest still cannot proceed until a usable provider/auth route exists.

## 7. Next decision needed

Choose one:

1. Start a local OpenAI-compatible server and provide its base URL/model for the sandbox.
2. Approve a temporary OpenRouter key stored only in the sandbox `.env`.
3. Complete Hermes OpenAI Codex auth interactively and then resume.
4. Choose another explicit Hermes-supported provider/auth route.

Issue #105 should remain open until one of these routes enables the contracted `microtest-output.md` task or the microtest is explicitly archived.
