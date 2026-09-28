# Codex model discovery — bounded feasibility check

**Date:** 2026-09-28
**Scope:** local inspection of the installed Codex CLI, catalog metadata, and the app-server's read-only `model/list` request. No model execution, authentication changes, model switching, or repository runtime integration. Starting app-server initialized its local state runtime, so this was not a strictly zero-write OS-level probe.

## Observed

| Surface | Observation | What it establishes |
|---|---|---|
| Installed CLI | `codex-cli 0.155.1`; `codex --help` has no model-inventory command, while `codex debug models --bundled` returns nine catalog entries. | The binary ships model metadata, not proof of account or session availability. |
| Local model cache | `$CODEX_HOME/models_cache.json` contained nine entries, `fetched_at: 2026-09-28T03:51:43.152895Z`, and `client_version: 0.158.0`. Entries had metadata such as `slug`, `visibility`, and `supported_reasoning_levels`, but no per-session availability verdict. | A dated catalog snapshot exists. Its client version differs from the inspected CLI; the reason was not established. |
| Local configuration | `config.toml` declares a `model` key. Its value was not copied into this report. | A configured preference is not a discovered eligible route. |
| AletheIA | The local experiment accepts caller-declared availability and explicit allowlists; the Codex adapter document is guidance, not a live discovery implementation. | The current demo remains synthetic and cannot be relabeled as runtime discovery. |
| App-server protocol | `codex app-server generate-ts` exposes `model/list` with `includeHidden`, pagination, and a `Model` response including `hidden`, supported reasoning efforts and input modalities, but no explicit per-session availability or health field. | There is a supported-shaped read request for picker/catalog metadata, not an eligibility attestation. |
| App-server local probe | A separate app-server initialized successfully and returned seven entries from `model/list` with `includeHidden: false`, no next cursor, and no hidden entries. Only count and field names were recorded. | The visible list differs from the nine-entry bundled/cache catalog, but the reason was not established. Visibility alone does not establish authorization, quota, or successful execution. |

The catalog and cache were inspected without printing their full contents. The app-server request used the locally configured Codex environment; whether it fetched remote catalog data during initialization was not established. Cache freshness, `visibility: list`, `supported_in_api`, and inclusion in `model/list` must not be interpreted as current authorization, health, quota, or availability. No per-session eligibility verdict was verified in this check.

## Decision for this slice

**Do not feed the catalog into `recommendRoute()` as `available: true`.** Keep availability `unknown` until a read-only, session-relevant source can attest it. This report changes no routing behavior or ADR-016/ADR-017 boundary.

## Next evidence gate

Before a Codex inventory adapter is proposed, establish the `model/list` source, refresh semantics, and whether another supported read-only field or method attests account/session eligibility. Otherwise, the next experiment should use an explicitly supplied inventory labeled `declared`, not `discovered`; neither path authorizes automatic execution.
