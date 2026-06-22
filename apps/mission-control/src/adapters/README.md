# Mission Control projection adapters

Adapters translate existing, read-only Visual Operations outputs into UI input.
They are formatting boundaries, not data sources or domain authorities.

The current checkpoint:

- accepts `GitHubPullRequestProjection` records already produced by the existing
  projector;
- rejects any projection whose mode is not `read_only`;
- preserves historical closure when a later alert creates review follow-up;
- exposes absent references as `unavailable` rather than inventing provenance;
- maps the versioned PR #201 and PR #207 snapshots into Evidence Ledger records.
- maps a durable `feature-planning` execution record from Adaptive Skills into
  the Resource Observatory while rejecting any governance-authority claim.

It does not fetch, collect, mutate, persist, authorize, or recalculate source state.
Additional projector types and live delivery are separate future slices.
