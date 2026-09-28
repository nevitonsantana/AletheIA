# Codex model discovery — bounded feasibility check

**Date:** 2026-09-28
**Scope:** local, read-only inspection of the installed Codex CLI and catalog metadata. No provider calls, authentication changes, model switching, or repository runtime integration.

## Observed

| Surface | Observation | What it establishes |
|---|---|---|
| Installed CLI | `codex-cli 0.155.1`; `codex --help` has no model-inventory command, while `codex debug models --bundled` returns nine catalog entries. | The binary ships model metadata, not proof of account or session availability. |
| Local model cache | `$CODEX_HOME/models_cache.json` contained nine entries, `fetched_at: 2026-09-28T03:51:43.152895Z`, and `client_version: 0.158.0`. Entries had metadata such as `slug`, `visibility`, and `supported_reasoning_levels`, but no per-session availability verdict. | A dated catalog snapshot exists. Its client version differs from the inspected CLI; the reason was not established. |
| Local configuration | `config.toml` declares a `model` key. Its value was not copied into this report. | A configured preference is not a discovered eligible route. |
| AletheIA | The local experiment accepts caller-declared availability and explicit allowlists; the Codex adapter document is guidance, not a live discovery implementation. | The current demo remains synthetic and cannot be relabeled as runtime discovery. |

The catalog and cache were inspected without printing their full contents or contacting a provider. Cache freshness, `visibility: list`, and `supported_in_api` must not be interpreted as current authorization, health, or availability. No authenticated, per-session model listing was verified in this check.

## Decision for this slice

**Do not feed the catalog into `recommendRoute()` as `available: true`.** Keep availability `unknown` until a read-only, session-relevant source can attest it. This report changes no routing behavior or ADR-016/ADR-017 boundary.

## Next evidence gate

Before a Codex inventory adapter is proposed, verify whether a supported read-only app-server or CLI surface exposes the current account/session's usable models, its provenance and refresh semantics. If it does not, the next experiment should use an explicitly supplied inventory labeled `declared`, not `discovered`; neither path authorizes automatic execution.
