# ADR-003 — Slice Record and Closeout Relationship

## Status

Accepted

## Context

The AletheIA evolution plan calls for operational compression before adding more framework surface.
A future `slice-record-template.md` may help first-time users run one practical Work Slice, but AletheIA already has closeout-oriented templates and records, especially:

- `starter-pack/templates/slice-finalization-review-template.md`
- `starter-pack/templates/hermes-closeout-template.md`
- versioned closeouts under `docs/aletheia/closeouts/`
- Hermes-specific policy in `docs/adr/ADR-001-hermes-role.md`

Adding a new slice record without defining its relationship to closeout artifacts would create silent duplication.

## Decision

A future `slice-record-template.md` should **contain** closeout and restart information.
It must not replace existing closeout templates and must not compete with them as a parallel closure system.

The intended relationship is:

- the slice record is the lightweight first-use operating record for a Work Slice;
- closeout/restart is a required section inside that record;
- specialized closeout templates remain valid when the slice needs a formal, runtime-specific, high-assurance, or audit-heavy closure artifact;
- if a specialized closeout is used, the slice record should link to it instead of duplicating every field.

## Consequences

This preserves AletheIA's existing closeout discipline while allowing a smaller first-use path later.
It also prevents P0 from adding a competing template before the core operating path has been tested.

## Deferred decisions

The following decisions are intentionally not made in P0:

- whether a future closeout standalone template should become a compatibility stub;
- whether any existing closeout template should be renamed or retired;
- whether closeout sections should keep layer labels such as `Layer 1 / Layer 2 / Layer 3` or use purely functional labels in first-use material.

Those decisions belong in P0.5 or P1 after the core operating path has been tested against real use.
