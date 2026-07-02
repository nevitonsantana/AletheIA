# Work Observatory — Dogfood Records

This directory contains source-backed Work Observatory projections derived from work performed on AletheIA itself.

## Record

- [`s7-bounded-debugging-work-record.json`](s7-bounded-debugging-work-record.json) derives one work observation from the accepted S7 bounded debugging pilot.
- [`s12-agent-role-reconciliation-work-record.json`](s12-agent-role-reconciliation-work-record.json) derives one work observation from the delivered S12 agent-role reconciliation pilot.

## What it answers

The record makes visible:

- which agent executed the slice;
- whether subagents participated;
- which Adaptive Skills and supporting skills were activated;
- which tools were invoked;
- which execution pattern ran and how many iterations it used;
- which objective gate passed;
- where the execution, selection, review and closure evidence live;
- which operational facts remain `unknown` or `unavailable`.

## Important boundaries

This is a read-only derived observation, not a second execution authority. The source selection, skill return, loop run, test and merge records remain authoritative.

These records deliberately do **not** provide:

- work units;
- quality or value scores;
- token or cost estimates;
- acceptance or rework claims;
- comparative rates.

Those fields require direct evidence or a mature comparison group. A merged patch proves closure; it does not automatically prove downstream acceptance, absence of rework, value or calibrated productivity.

No collector, database, schema, dashboard or runtime integration is introduced by this example.
