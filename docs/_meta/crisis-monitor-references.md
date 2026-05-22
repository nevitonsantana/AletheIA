# Crisis Monitor references — inventory and reclassification

> **Purpose.** Track every reference to the first validation case (Crisis Monitor) across the AletheIA repo, classify each by layer (canonical / example / meta), and record the action taken in Epic 2 of the 2026-05-21 cross-repo plan.
>
> **Date.** Created 2026-05-21.
>
> **Scope.** Markdown content in `docs/`, `examples/`, `starter-pack/`, plus root files. Excludes auto-generated artifacts and `engine/` / `policies/` / `schemas/` / `scripts/` / `tests/` (out of scope per plan §4.2).
>
> **Related ADR.** [ADR-006 — Domain agnosticism](../adr/ADR-006-domain-agnosticism.md).

## Method

```
grep -rln -iE "crisis[- _]?monitor" --include="*.md" --include="*.ts" \
  --include="*.json" --include="*.yaml" --include="*.yml" --include="*.sh" .
```

Each match was classified as:

- **A — narrative dependency** (canonical doc tells the story *through* Crisis Monitor): refactor required.
- **B — concrete reference** (placeholder / data / example slot): cirurgical fix.
- **C — by design / already in example layer**: log only; no action.

## Type A — refactored in this PR

Canonical docs whose narrative was anchored on Crisis Monitor. Refactored to generic phrasing + explicit link to `docs/pilots/`.

| File | Action |
|---|---|
| `docs/concepts/overview.md` | "Alpha 2 bridge" section rewritten: Crisis Monitor named as *first validation case*, link to pilot, paths corrected to actual locations. |
| `docs/concepts/operating-overlay.md` | Two table rows generalized from "in Crisis Monitor" → "in a consumer project". One "looks like X but is Y" example generalized from `crisis-monitor-runbook` → `deployment-runbook`. |
| `docs/concepts/self-application.md` | "What recent real-world validation added" narrative now opens with "first validation case" framing + link to pilot. "See also" paths corrected. |
| `docs/concepts/project-extension-pattern.md` | "Crisis Monitor example" section rewritten as "Worked example pattern" — generic, with first-validation-case callout pointing to pilot. |
| `docs/concepts/iterative-maintenance-governance.md` | "What recent real-world evidence changed" opens with "first validation case" framing + link to pilot. |
| `docs/concepts/ai-agent-security-prompt-injection.md` | "Monitoring Content as Untrusted Input" generalized from "agentic products such as Crisis Monitor" → "agentic products that ingest external monitored content". "Crisis Monitor motivation without lock-in" renamed to "First-validation motivation without lock-in" with pilot link. |
| `docs/guides/pilot-conversion.md` | "Crisis Monitor example" section rewritten as "Worked example: first validation case" with pilot link and explicit generic framing. |
| `README.md` (root) | Block 3 of "What is in this repository" generalized. New subsection "First validation case" added with ADR-006 link and pilot/examples reference. |

## Type B — cirurgical generalization in this PR

Concrete placeholder/data references. Fixed without rewriting surrounding narrative.

| File | Action |
|---|---|
| `docs/contracts/consumer-project-overlay.md` | Mission example placeholder changed to `<consumer-product>` with link to pilot. Skill example "triage a Crisis Monitor incident" → "triage an operational incident in the consumer product". |
| `docs/contracts/runtime-adapter-contract.md` | YAML `project_id: crisis-monitor` → `project_id: example-consumer`. |
| `docs/contracts/slice-telemetry-model.md` | YAML `slice_id: cris-routing-approval-round-2` → `routing-approval-round-2`; `project_id: crisis-monitor` → `example-consumer`. |
| `docs/guides/setting-up-harnesses.md` | `sed` template substitution example changed from `Crisis Monitor` to `Acme Operations` (neutral fictional placeholder). |
| `docs/concepts/context-graph-integration.md` | "Controlled tests on the Crisis Monitor confirmed" → "Controlled tests in the first validation case (Crisis Monitor pilot — see `pilots/context-graph-decision.md`)". Data (F1=0.041, 73–97% false positives) preserved with explicit source labeling, per the user's gate decision on 2026-05-21. |
| `docs/index.md` | "I want to see real adoption evidence" section gains an explicit framing block citing ADR-006: pilots are labeled field evidence, not canonical content. Crisis Monitor pilot entries kept; description text adjusted to "first validation case". |
| `docs/pilots/README.md` | Top-of-file callout added stating pilots are labeled field evidence, not canonical content, with link to ADR-006. |

## Type C — by design or already in example layer (no action; logged)

These files were left untouched in this PR. They are either:
- Decision records that need to mention Crisis Monitor by their nature (ADRs).
- Documents already in pilots / examples / reference / roadmap layers, where Crisis Monitor naturally belongs.
- Meta tracking documents.

| File | Layer | Why no action |
|---|---|---|
| `docs/adr/ADR-001-hermes-role.md` | adr | Historical decision; mentions Crisis Monitor as context of the time. |
| `docs/adr/ADR-004-aletheia-as-operating-overlay.md` | adr | Decision uses Crisis Monitor as one of several example artifacts. |
| `docs/adr/ADR-006-domain-agnosticism.md` | adr | Topic *is* Crisis Monitor's reclassification. Mentions are by design. |
| `docs/_meta/MIGRATION.md` | meta | Documents the history of file moves; references are historical. |
| `docs/_meta/docs-inventory.md` | meta | Inventory document; will be regenerated by docs maintenance. |
| `docs/pilots/*` (7 files) | pilots | Pilots layer is the labeled-example layer. By construction. |
| `docs/reference/learnings.md` | reference | Operational reference / historical record. |
| `docs/reference/hermes-phase-minus-1-index.md` | reference | Operational reference / Hermes-specific historical record. |
| `docs/reference/hermes-phase-minus-1-operational-matrix.md` | reference | Same as above. |
| `docs/roadmaps/roadmap-alpha.md` | roadmaps | Historical roadmap entries referencing the first validation case. |
| `docs/roadmaps/evolution-plan.md` | roadmaps | Same. |
| `docs/roadmaps/resource-aware-operations-roadmap.md` | roadmaps | Same. |
| `examples/*` (multiple) | examples | Examples layer. By construction. |
| `examples/consumer-overlay-minimal/*` | examples | Minimal-overlay starter example which uses Crisis Monitor as instance. Acceptable in examples layer. |
| `examples/pilot-conversion/crisis-monitor-real-world-validation.md` | examples | Filename declares the example. By construction. |
| `examples/resource-aware-operations/*` | examples | Same. |
| `starter-pack/*` (multiple) | starter-pack | Starter-pack is delivery / template layer — references are illustrative. |
| `CHANGELOG.md` | meta | Historical change log entries are not rewritten. |

## Validation against acceptance criteria

The plan (§5, Epic 2) requires:

| Criterion | Status |
|---|---|
| No canonical doc (concepts/, contracts/, guides/) has narrative dependency on Crisis Monitor | ✅ All 8 Type-A files refactored; 6 Type-B placeholders generalized. |
| Crisis Monitor appears exclusively in pilots/, examples/, or case-studies/ | ⚠️ Crisis Monitor name still appears in canonical docs *as labeled first-validation reference with link to pilots/*. This is intentional per ADR-006 and the user's 2026-05-21 gate: preserve transparency about the first case, not erase it. |
| Each repo has a README that explains "first validation case was Crisis Monitor; others are expected" | ✅ `README.md` root has new "First validation case" subsection. |

## Anti-criteria respected

- ❌ No Crisis Monitor content was deleted — only reframed/generalized.
- ❌ No fictional second case was created to balance.
- ❌ `engine/`, `policies/`, `schemas/`, `scripts/`, `tests/` were not touched.

## Out-of-scope follow-ups

- The companion repo (Adaptive Skills) carries the parallel inventory at `docs/_meta/crisis-monitor-references.md`. Its execution is a separate PR.
- `docs/_meta/docs-inventory.md` is stale (lists paths from an earlier reorganization); regenerating it is out of scope for this PR.
- Some files in `pilots/` reference each other with `docs/foo.md` paths that may have shifted during the earlier reorganization — out of scope; will be caught by future docs-link audits.

## Revision

Reopen this inventory when:
- A new Crisis Monitor reference is added in a non-example layer (regression).
- A second consumer project produces canonical evidence that should be cited alongside Crisis Monitor in the canonical layer (positive evolution toward observable agnosticism).
