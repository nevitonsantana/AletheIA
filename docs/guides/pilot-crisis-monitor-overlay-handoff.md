# Pilot handoff — Crisis Monitor overlay adoption

> **Audience:** Crisis Monitor team. This is the brief for adopting the AletheIA operating overlay in the Crisis Monitor repo and reporting back. It is a *prescriptive guide* — what to do, in what order, with what gates. The *result* will be recorded separately under `docs/pilots/pilot-crisis-monitor-overlay-adoption.md` (created by the team or by AletheIA maintainers once the pilot reports back).

## Why this pilot

Closes Epic 7 of the AletheIA documentation-improvement plan. Epics 0–6 produced the artifacts being validated:

- The boundary decision: [ADR-004](../adr/ADR-004-aletheia-as-operating-overlay.md).
- The concept: [`concepts/operating-overlay.md`](../concepts/operating-overlay.md).
- The contract: [`contracts/consumer-project-overlay.md`](../contracts/consumer-project-overlay.md).
- The shim pack: [`starter-pack/harness-shims/claude/`](https://github.com/nevitonsantana/AletheIA/blob/main/starter-pack/harness-shims/claude/).
- The minimal overlay example bundle: [`examples/consumer-overlay-minimal/`](https://github.com/nevitonsantana/AletheIA/blob/main/examples/consumer-overlay-minimal/).
- The reference example: [`examples/consumer-overlay-minimal/`](https://github.com/nevitonsantana/AletheIA/blob/main/examples/consumer-overlay-minimal/).

This pilot is the first real-world validation. **Frictions are the expected output, not failures** — the goal is to falsify hypotheses (especially H2 from the plan: "the taxonomy covers ≥90% of docs without forcing").

## What to do (six steps)

### 1. Adopt the preset

Copy the minimal overlay example into the Crisis Monitor repo root and follow the README:

```bash
cp -R /path/to/aletheia/examples/consumer-overlay-minimal/. /path/to/crisis-monitor/
cd /path/to/crisis-monitor
rm README.md manifest.yaml   # source artifacts, not runtime
```

Use [`examples/consumer-overlay-minimal/README.md`](https://github.com/nevitonsantana/AletheIA/blob/main/examples/consumer-overlay-minimal/README.md) for the substitution steps and variable list.

### 2. Fill the constitution

Replace `ops/ai/constitution/README.md` with four files:

- `mission.md`
- `scope.md`
- `stack.md`
- `principles.md`

Crisis Monitor already has implicit answers to all four in scattered places (wiki, Slack pins, tribal knowledge). The pilot value is partially in *forcing those answers into one place*. If writing one of them surfaces a question the team has been avoiding, **stop and answer it** — that's the constitution doing its job (see [`learnings/2026-05-20-overlay-adoption-cost.md`](https://github.com/nevitonsantana/AletheIA/blob/main/examples/consumer-overlay-minimal/ops/ai/learnings/2026-05-20-overlay-adoption-cost.md) for the pattern).

### 3. Run the conformance test

From [contract §8](../contracts/consumer-project-overlay.md#8-conformance-test-minimum). Open a fresh Claude Code session in the Crisis Monitor repo root and check:

1. The agent locates `AGENTS.md` without being told.
2. The agent locates `ops/ai/constitution/` from `AGENTS.md` in ≤2 hops.
3. The agent can describe mission, scope, and stack from the constitution in its first response.
4. The agent finds the most recent handoff (or notes none exists yet) and proceeds without asking for context that should be in the constitution.

Any failure is data — record it in the log (step 6).

### 4. Test at least one handoff

Per the contract: "MUST contain at least one handoff after the first non-trivial session." Pick one real piece of work in Crisis Monitor — a bug fix, a small feature, a refactor — and do it across two sessions or two agents, with a handoff in between. The point is to stress the handoff structure with real content, not to invent ceremony.

### 5. Operate normally for ≥3 sessions

Resist the urge to over-document. The pilot tests whether the overlay *helps under normal load*. After three sessions, you should be able to answer:

- Did the constitution change what got built? How?
- Did handoffs reduce session-warmup turns? (Baseline pre-overlay: 5–10 turns. Hypothesis: ≤2.)
- Did any folder feel unused or in the way?

### 6. Write the friction log

Create `docs/pilots/pilot-crisis-monitor-overlay-adoption.md` (in the AletheIA repo, not the Crisis Monitor repo) with the structure below. Don't polish — raw observations are more useful than tidy ones.

## Friction log template

Copy this skeleton into `docs/pilots/pilot-crisis-monitor-overlay-adoption.md` when ready to write.

```markdown
# Pilot — Crisis Monitor overlay adoption

**Date range:** YYYY-MM-DD to YYYY-MM-DD
**Preset version:** minimal-overlay v1.0.0
**Sessions covered:** N
**Adopted by:** <names>

## What fit directly

What worked without adaptation. Be specific — name the folder, file, or rule.

- Example: "`AGENTS.md` template was usable with only variable substitution; no structural edits needed."

## What needed local adaptation

What needed local change, and why. The "why" matters more than the "what" — it tells us whether the change generalizes.

- Example: "`.claude/rules/tests.md` mentions hitting real Postgres in integration tests; our CI uses testcontainers. Adapted locally. *Generalizable?* No — runner choice is project-specific."

## What remained ambiguous

Where the contract or guide left a real question unanswered. These are the most valuable entries.

- Example: "Constitution `scope.md` — unclear whether to list out-of-scope items we *might* do in the future versus only those we've explicitly rejected. Defaulted to the latter."

## Observed metrics

| Signal | Pre-overlay baseline | Post-overlay observation |
|---|---|---|
| Session warmup (turns until productive work) | 5–10 | ? |
| "Where does X live?" questions per session | N | ? |
| Time to write the first closeout | — | ? |

Add other signals the team actually noticed, even if not on this list.

## Promotion candidates

Frictions or patterns that look like they would appear in *other* consumer projects, not just Crisis Monitor. These are candidates for promotion to canonical AletheIA — but per the [promotion gate](../concepts/operating-overlay.md#antifragile-patterns-how-to-avoid-drift), they wait for a second consumer project to confirm.

- Example: "If a project uses pnpm workspaces, the `INSTALL_CMD` variable doesn't capture per-workspace install nuance. Worth a learning if a second monorepo hits this."

## Verdict on the framework hypotheses

The plan defined four falsifiable hypotheses. Comment on each:

- **H1** — Three-layer boundary sustainable: *did anything force-fit into two layers?*
- **H2** — Taxonomy covers ≥90%: *did `ops/ai/` need a folder the contract doesn't define?*
- **H3** — `AGENTS.md` + `CLAUDE.md` as dispatchers work: *did the harness ignore them or demand duplication?*
- **H4** — Bootstrap stays in AletheIA: *did this adoption produce diffs <20% from the canonical preset?*
```

## Escalation rules

While the pilot is running, two things are worth interrupting for:

1. **A friction that contradicts the contract.** If the contract says X and the project genuinely needs not-X, stop and write it up immediately — don't wait for the closeout. File an issue against AletheIA tagged `epic-7-pilot`.
2. **A security or correctness gap.** The preset doesn't enforce secrets handling beyond a rule comment. If real PII or credentials end up in `ops/ai/`, treat it as a P1 — fix in Crisis Monitor first, then surface the gap to AletheIA.

Everything else can wait for the friction log.

## What not to do

- **Don't backfill history.** No fake handoffs, closeouts, or learnings dated before the adoption day. The overlay starts on adoption date (see [contract §6](../contracts/consumer-project-overlay.md#6-adopting-in-a-legacy-project-minimum-viable-path)).
- **Don't refactor the constitution mid-pilot.** Treat the first version as a baseline; revisions are evidence, not noise.
- **Don't push local Crisis Monitor adaptations upstream to AletheIA.** Promotion waits for a second consumer project (per the promotion gate).
- **Don't aim for perfection.** A 70%-done friction log written now is worth more than a 100% log written never.

## Time budget

| Phase | Estimate |
|---|---|
| Adopt preset + fill constitution | ~2 hours (one focused sitting) |
| 3 sessions of normal operation | ~2 weeks of regular work |
| Write the friction log | ~1 hour |

The pilot can run alongside other Crisis Monitor work — it does not need a dedicated sprint.

## Reporting back

The friction log lives at `docs/pilots/pilot-crisis-monitor-overlay-adoption.md` in the AletheIA repo. Once the log is committed, Epic 7 closes and the structural-improvement plan is complete. Promotion candidates from the log become input for subsequent canonical-AletheIA changes (under their own slices, not retroactive edits to the plan).
