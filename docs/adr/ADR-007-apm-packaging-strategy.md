# ADR 007 — AletheIA APM packaging strategy

| Field | Value |
|---|---|
| Status | Accepted |
| Date | 2026-05-23 |
| Author | Neviton Santana |
| Deciders | Neviton Santana |
| Related | ADR-004 (AletheIA as operating overlay), ADR-005 (Positioning in agentic ecosystem) |
| Supersedes | — |

## 1. Context

The 2026-05-21 cross-repo plan (§5 Frente 4, Épico 4) requires packaging AletheIA as an APM package so adopters can install it via `apm install nevitonsantana/AletheIA`. The plan presumes APM can deliver the operating overlay as a one-step install. Investigation of the current APM specification (`microsoft.github.io/apm/`, fetched 2026-05-23) revealed a structural mismatch.

APM's mental model is **agent-capability primitives** — skills, prompts, instructions, agents, hooks, commands, MCP servers — hoisted into target-harness runtime directories (`.claude/`, `.cursor/`, `.opencode/`, etc.) or consolidated into a fallback `AGENTS.md`. The package types supported by `apm.yml.type` are `instructions`, `skill`, `hybrid`, `prompts`. There is no `scaffold`, `preset`, or `project-template` type.

AletheIA, in contrast, is a **project scaffold** that lands content at the consumer project root — `AGENTS.md`, `CLAUDE.md`, `.claude/rules/*.md`, `.claude/settings.json`, and a seven-directory `ops/ai/` skeleton. About 30–40% of that payload (the `ops/ai/` skeleton in particular) has no native install path under APM's model. Equally important: APM has no documented install-time lifecycle hooks (no `preinstall`/`postinstall`); `hooks` in APM are runtime callbacks (`PreToolUse`, `PostToolUse`) fired inside a harness's tool loop, not install-phase shell scripts.

Three options were considered:

- **X — Partial packaging + manual scaffold step.** Use APM for what fits natively; expose a `scripts.scaffold-overlay` that adopters run after `apm install` to materialize the scaffold at the project root.
- **Y — All-in-pack + `apm run install-overlay`.** Ship the entire overlay under `.apm/` and let `apm install` only download; require `apm run install-overlay` to materialize. Treats APM as a versioned CDN.
- **Z — Pause Épico 4, escalate.** Acknowledge that current APM does not fit, fall back to `git clone + cp -R` manual adoption, revisit when APM gains lifecycle hooks or scaffold support.

## 2. Decision

**Adopt Option X.** AletheIA ships as a single APM package (`name: aletheia`, `version: 0.1.0-alpha`, `type: hybrid`, `target: claude`) with a `packs/operating-overlay/` payload and an explicit two-step adoption flow:

```
apm install nevitonsantana/AletheIA       # step 1: download + lockfile
apm run scaffold-overlay                  # step 2: materialize at <cwd>/
```

Step 2 is implemented as a shell script (`packs/operating-overlay/scripts/scaffold-overlay.sh`) declared in `apm.yml` under `scripts:`. It copies the pack contents (minus source-only files: `README.md`, `manifest.yaml`, `scripts/`) into the current working directory. The script refuses to overwrite existing overlay artifacts unless `--force` is passed.

The `operating-overlay` pack also remains usable for **manual adoption** (plain `cp -R packs/operating-overlay/. <consumer-root>/`) for adopters who do not use APM. The pack is the source of truth for the overlay scaffold; APM is one of two delivery channels.

The mismatch between AletheIA's scaffold-at-root model and APM's runtime-primitive model is documented in this ADR, in [docs/guides/install-via-apm.md](../guides/install-via-apm.md), and in the `apm.yml` header comment. Adopters and reviewers can see the gap without inspecting code.

## 3. Consequences

**Positive:**

- Épico 4 is deliverable inside the plan's anti-criteria: no custom CLI (the `scripts:` field is APM-native), no marketplace publish, no premature shims.
- `apm install` still pays for itself: it resolves the package from GitHub, pins the ref in `apm.lock.yaml`, and gives adopters a versioned, hash-verified payload — even when the materialization step is manual.
- The two-step flow is reversible. If APM gains `postinstall` hooks or scaffold-at-root support, `apm run scaffold-overlay` becomes an internal call instead of a user-visible step, with no change to the pack contents.
- The pack continues to serve manual adopters, so AletheIA does not bind itself to APM availability.

**Negative:**

- Adoption is two commands instead of one. Documentation must be explicit about this; a beta-tester who runs `apm install` and stops will see no overlay materialize and may report it as broken. Mitigated by `apm.yml.scripts.start` printing a pointer to the install guide.
- Hypothesis **H2** of the cross-repo plan ("APM acelera adoção sem custo de manutenção excessivo") is partially falsified: APM accelerates *versioning, distribution, and resolution*, but does not (today) accelerate *materialization* of project scaffolds. The remaining manual step is small but real, and must be tracked across the soft launch (Épico 8) to determine if it is a fricção significativa.
- If APM evolves its package-type taxonomy and AletheIA later wants to conform to a future `scaffold` or `template` type, this ADR will be superseded by an ADR-008 that migrates the layout.

**Accepted tradeoffs:**

- Choosing X over Y because Y hides the materialization step inside `apm run`, which contradicts adopter expectation that `apm install` is the install step. Honesty about the two-step nature is better than hiding it.
- Choosing X over Z because Z removes APM from the picture entirely, which abandons distribution benefits already in reach (lockfile, hash-pinning, GitHub-as-registry). The gap is real but not large enough to justify dropping APM.

## 4. Alternatives considered

- **Option Y — all-in-pack + apm run.** Rejected because `apm install` would visibly succeed without materializing anything, surprising the adopter. Better to surface the two-step flow than disguise it.
- **Option Z — pause and escalate.** Rejected because Épico 4 has downstream dependencies (Épicos 5, 6, 8) and pausing would cascade. The structural mismatch is worth documenting (this ADR), not worth blocking on.
- **Multiple packs (`overlay-instructions` + `overlay-scaffold`).** Rejected. The consumer-project-overlay contract (`docs/contracts/consumer-project-overlay.md`) treats the overlay as one bundle; splitting it would violate the contract and complicate the manifest's provenance model.
- **Upstream issue requesting APM lifecycle hooks.** Not rejected — recommended as a parallel action, but not blocking on Épico 4. The upstream timeline is unknown.

## 5. Relationship

- **ADR-004** establishes AletheIA as an operating overlay. This ADR specifies *how* that overlay reaches consumer projects via APM.
- **ADR-005** positions AletheIA as a consumer of APM in the ecosystem map. This ADR honors that position by using APM nativ ely where possible and not building a custom CLI as escape valve.
- **`docs/contracts/consumer-project-overlay.md`** is the normative contract this pack satisfies. The APM packaging does not change the contract; it adds a delivery channel.
- **`docs/guides/install-via-apm.md`** is the adopter-facing companion to this ADR.
- **2026-05-21 cross-repo plan, Épico 5** (Adaptive Skills as APM package) is the sibling effort. Adaptive Skills will face a different mismatch (its primitives map more cleanly to APM `skill` type) and likely use a different layout. This ADR does not constrain that decision.

## 6. Review

Reopen this decision when any of the following occurs:

- APM publishes a documented mechanism for install-time hooks (`postinstall`, lifecycle scripts, scaffold-at-root delivery). At that point, the two-step flow should become a one-step flow with the script moving from user-invoked to internal.
- A soft-launch adopter (Épico 8) reports the two-step flow as a significant fricção, or fails to complete adoption because of it.
- APM introduces a `scaffold`, `template`, or `preset` `type` value that AletheIA could conform to without changing the pack contents.
- The Adaptive Skills APM packaging (Épico 5) settles on a layout that suggests a different convention for AletheIA.
