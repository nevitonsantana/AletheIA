# S84 — Restart Package Portability Compatibility Review

## Status

Review-only compatibility slice. It does not change a template, schema, composer, runtime adapter, Adaptive Skills, or the minimum Restart Package contract.

## Decision

- **Verdict:** `refine`
- **Canonical artifact count:** `0`
- **Canonical continuity artifact:** Restart Package
- **Residual gap:** bounded portability metadata is not represented explicitly enough for a receiving runtime or trust boundary.
- **Authorized follow-up:** S85 may test one **pilot-only optional `Portability Check` block** against the current Restart Package. It is not an adopted template section.

## Requirement-to-contract matrix

| Portability concern | Existing contract or field | Coverage verdict | Residual needed for a pilot |
|---|---|---|---|
| Compact continuation without transcript replay | Restart Package, handoff guidance, restart bootstrap prompt | `absorbed_by_existing_contract` | None |
| Source and destination runtime | `Open New Execution Surface`, handoff cross-boundary reason | `refine` | Explicit source and destination runtime identifiers |
| Commit and verification freshness | `Validation Status`, `Last Boundary Summary`, `Reload Required Before Acting` | `refine` | Frozen commit and checked-at moment |
| Invalidation | `Known Constraints`, `Claims Requiring Verification Before Reuse`, reload instructions | `refine` | Named invalidation triggers |
| Allowed sensitivity | Context Pack/resolver sensitivity controls; `Known Constraints` | `refine` | Allowed receiving sensitivity, without inferring missing state |
| Redactions and blocked references | `Context Intentionally Discarded`, governing-context references | `refine` | Explicit redactions or blocked references |
| Destination semantics that cannot be carried | `Technical Review Still Required`, open questions and risks | `refine` | Explicit unavailable destination semantics |

## Duplication review

The proposed pack's state object, schema, composer and runtime adapter duplicate or exceed existing AletheIA continuity and runtime boundaries. They remain rejected. The review does not create a new portability lifecycle: the candidate is metadata associated with the existing Restart Package at a real runtime or trust boundary.

## Pilot-only optional profile

Use only for S85, only beside a real Restart Package, and only when a runtime or trust boundary actually changes:

```md
### Portability Check (pilot only)
- **Source runtime / destination runtime:**
- **Frozen commit / checked at:**
- **Invalidation triggers:**
- **Allowed receiving sensitivity:**
- **Redactions or blocked references:**
- **Unavailable destination semantics:**
```

Missing values remain `unavailable`; receiving sessions must not infer them. This profile does not authorize mutation, transcript replay, schema/template adoption, automation, Adaptive Skills changes, or cross-runtime work.

## Gate

S85 is admissible only as a read-only Codex-to-Codex comparison of the current Restart Package and this pilot-only profile. S86 must reject the profile unless the real pilot shows zero critical loss and measurable improvement over the current artifact. S87-S89 remain deferred.

## Validation basis

- S83 intake: `examples/reference-intake/s83-portable-continuity-intake.yaml`
- Restart Package template: `starter-pack/templates/slice-finalization-review-template.md`
- Restart bootstrap: `starter-pack/templates/restart-bootstrap-prompt-template.md`
- Handoff and context boundaries: `starter-pack/templates/agent-handoff-template.md`, `docs/guides/slice-finalization-and-restart.md`, `docs/contracts/runtime-adapter-contract.md`, and Context Pack/resolver contracts.
