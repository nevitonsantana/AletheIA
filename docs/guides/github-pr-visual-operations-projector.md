# GitHub PR Visual Operations Projector

## Purpose

The GitHub PR projector is a small, deterministic adapter that turns explicitly supplied pull
request evidence into:

- normalized Visual Operations events;
- one derived Work Slice visual state;
- a list of bounded follow-up slices for post-close findings;
- an optional Markdown snapshot.

It is a read-only library function. It does not call GitHub, mutate a pull request, persist records,
run a backend, or become a new source of truth.

## Public functions

```ts
import {
  projectGitHubPullRequest,
  renderGitHubPullRequestProjectionMarkdown,
} from "./engine";

const projection = projectGitHubPullRequest(input);
const markdown = renderGitHubPullRequestProjectionMarkdown(projection);
```

The input must be assembled from already authorized evidence. The projector accepts metadata,
timestamps, summaries, and source URLs; it intentionally has no field for full prompts, secrets,
restricted source bodies, or personal data beyond the explicitly supplied actor labels.

## Local CLI

The repository includes a local file adapter over the same projector:

```bash
./scripts/visual-ops-project.sh \
  --input examples/visual-operations/github-pr-195-cli-input.json \
  --json examples/visual-operations/github-pr-195-cli-output.json \
  --markdown examples/visual-operations/github-pr-195-cli-output.md
```

To verify that checked-in outputs still match their authorized input without writing files:

```bash
./scripts/visual-ops-project.sh \
  --input examples/visual-operations/github-pr-195-cli-input.json \
  --json examples/visual-operations/github-pr-195-cli-output.json \
  --markdown examples/visual-operations/github-pr-195-cli-output.md \
  --check
```

`--check` exits with code `2` when an output is missing or stale. Usage, parsing, and projection
errors exit with code `1`. Current outputs exit with code `0`.

Writes are staged in the destination directories and installed only after all output bodies have
been generated. If installation fails, previous outputs are restored. The CLI also refuses to use
the input file as an output or to point JSON and Markdown at the same path.

## CI snapshot check

The CI workflow runs:

```bash
./scripts/check-visual-ops-snapshots.sh
```

The script compiles the local CLI once and runs `--check` for an explicit list of reviewed snapshot
sets. It does not discover examples with a wildcard: adding a fixture to CI is a deliberate change
to `snapshot_sets` in the script. This prevents temporary or sensitive local files from silently
becoming governed CI inputs.

The `Visual Operations Snapshots` job is a dependency of the aggregate Quality Gate. A stale or
missing checked-in output therefore blocks the gate without rewriting the file in CI.

## Conservative derivation rules

1. A merged or authoritatively closed PR projects to the `closed` presentation lane.
2. A post-close finding creates an alert and a linked follow-up Work Slice identifier; it does not
   reopen or rewrite the historical lane.
3. Required CI checks that all passed may support `evidence_status: sufficient` only when the PR is
   merged. Before merge, the same evidence remains `partial`.
4. CI checks use `provenance: ci_observed`. Local validations supplied from PR prose use
   `provenance: author_reported` and are never promoted to CI evidence.
5. Risk, planning depth, readiness, skill activation, runtime, tokens, and cost remain `unknown` or
   `unavailable` unless a future authorized adapter supplies durable records for them.
6. Every normalized event, evidence item, alert, follow-up slice, and derived state includes source
   references.

## Input boundary

The TypeScript interface `GitHubPullRequestProjectionInput` accepts:

- repository and PR metadata;
- selected PR timeline events;
- check-run outcomes;
- review summaries;
- bounded finding summaries;
- explicitly labeled author-reported validations.

The projector validates required IDs, timestamps, and source references. It does not verify remote
URLs or infer omitted data from a PR body.

## Reproducible example

- [Input evidence](../../examples/visual-operations/github-pr-projector-input.json)
- [Projected JSON](../../examples/visual-operations/github-pr-projector-output.json)
- [Projected Markdown](../../examples/visual-operations/github-pr-projector-output.md)
- [PR #195 CLI input](../../examples/visual-operations/github-pr-195-cli-input.json)
- [PR #195 CLI JSON output](../../examples/visual-operations/github-pr-195-cli-output.json)
- [PR #195 CLI Markdown output](../../examples/visual-operations/github-pr-195-cli-output.md)
- [Field-evidence retrospective](../pilots/visual-operations-pr-193-retrospective.md)

The first example uses the durable evidence documented for PR #193. The second uses PR #195 as a
real CLI pilot. Tests regenerate the projector fixtures, while `--check` verifies the CLI outputs.

## Non-goals

- no GitHub API client or importer;
- no webhook, polling loop, event bus, database, or dashboard runtime;
- no canonical lifecycle or readiness authority;
- no automatic risk, planning-depth, skill, token, or cost inference;
- no integration with Adaptive Skills in this slice.

## Related

- [Visual Operations Event Model](../contracts/visual-operations-event-model.md)
- [Work Slice Visual State Contract](../contracts/work-slice-visual-state-contract.md)
- [Visual Operations Privacy Boundaries](../contracts/visual-ops-privacy-boundaries.md)
