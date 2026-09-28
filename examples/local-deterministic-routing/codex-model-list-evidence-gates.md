# Codex `model/list`: ten evidence gates before any inventory adapter

**Study date:** 2026-09-28. **Status:** investigation, not implementation approval.
This document separates observations from inferences. It extends the [local feasibility check](codex-discovery-feasibility-2026-09-28.md) without making a new app-server call, invoking a model, changing authentication, or connecting Codex to `recommendRoute()`.

## 1. Question and boundary

Can a read-only Codex surface produce a trustworthy list of routes eligible *now*? The study may inspect protocol and catalog behavior. ADR-017 still permits only synthetic local replay; a real adapter, model switch, or execution remains outside this exception.

## 2. Local observation

The previous local probe of `codex-cli 0.155.1` returned seven non-hidden `model/list` entries, while bundled and cached catalogs each had nine. This establishes a difference in *lists*, not why it occurred. No model identities or credentials were copied into the evidence note.

## 3. Request contract

The installed app-server-generated TypeScript contract exposes `model/list` with `limit`, an opaque `cursor`, and `includeHidden`. The upstream [protocol definition](https://github.com/openai/codex/blob/main/codex-rs/app-server-protocol/src/protocol/v2/model.rs) also defines pagination. The upstream `main` branch may differ from the installed CLI, so local generated types remain the evidence for the local binary.

## 4. Response contract

The installed `Model` type includes identity, picker visibility, supported reasoning efforts, input modalities, and service tiers. It does **not** include an explicit per-session availability, quota, health, authorization, or successful-inference verdict. Missing evidence cannot be filled by interpreting other metadata as a verdict.

## 5. Catalog source

Upstream [app-server tests](https://github.com/openai/codex/blob/main/codex-rs/app-server/tests/suite/v2/model_list.rs) exercise bundled, cached, and remote model catalogs under different test configurations. **Inference:** a `model/list` response need not imply a fresh remote fetch. The exact source chosen by the locally installed binary in the previous probe was not recorded and remains unknown.

## 6. Refresh and age

The inspected cache had a `fetched_at` timestamp, but the `model/list` response did not provide a per-entry observation time or freshness guarantee. No polling or invalidation behavior was tested. Treat a listed model as catalog metadata with unknown observation age, not as a live health check.

## 7. Visibility versus permission

`includeHidden: false` omits hidden catalog entries; the upstream tests verify hidden and visible listing behavior. Picker visibility is not an allowlist in AletheIA. A provider remains forbidden unless the caller's explicit default-deny policy permits it, independently of what Codex lists.

## 8. Capability versus task fitness

Input modalities and reasoning efforts are declared model metadata. They do not establish task quality or the experimental capability IDs (`analysis`, `testing`, `typescript`). There is no justified translation from those fields to required task capabilities yet. Such a mapping would be a new, reviewable hypothesis, not discovery fact.

## 9. Fail-closed rehearsal

The local experiment now accepts `available: "unknown"` and rejects that route or provider with an explicit reason. Its synthetic `task-unknown-availability.json` returns `no_eligible_route`. This proves only deterministic behavior for a declared input; it does not test a real Codex model.

## 10. Decision and next gate

**Do not implement a Codex inventory adapter yet.** The current evidence can support a metadata-only catalog study, but not `available: true` or automatic routing. A future adapter proposal needs: (a) an identified source and refresh rule, (b) an explicit provenance/age field in its output, (c) a supported read-only eligibility signal or else `unknown`, (d) a reviewed capability mapping, and (e) separate authorization to cross ADR-017's boundary. Until then, caller-declared synthetic inventory remains the executable study surface.
