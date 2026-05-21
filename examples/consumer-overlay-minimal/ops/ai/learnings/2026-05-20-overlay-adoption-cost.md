# Learning — overlay adoption is cheaper than the first session it pays back

## Context

Crisis Monitor adopted the AletheIA operating overlay on 2026-05-20 (see closeout in `reports/`). Total elapsed time to set up the overlay: ~2 hours of focused work by one human + Claude, plus 30 minutes of writing the principles.

## Observation

Two things showed up immediately, before we'd measured anything formally:

1. Writing `scope.md` forced a decision (90-day retrospective scope) that had been drifting for weeks. The document made the drift visible.
2. The principle "no PII in logs or prompts" surfaced an existing violation in `logger.info(event)` that we already knew about but hadn't escalated. Having a written principle turned "we should fix that someday" into "this is now a follow-up slice."

Neither of these was about the overlay's runtime value to agents. They were about the act of writing the constitution forcing latent decisions to the surface.

## Change

- We will treat constitution-writing as a recurring forcing function. When scope or principles feel fuzzy, rewriting the relevant file is a legitimate slice, not procrastination.
- We will measure agent-session warmup over the next 3–4 sessions (turns until productive work) and add a follow-up learning when the answer is clear. Hypothesis: drops from 5–10 turns to ≤2.

## Anti-change

- We will NOT preemptively write `policies/` files for problems we haven't encountered. Empty is fine until a real constraint shows up.
