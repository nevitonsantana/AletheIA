#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$repo_root"

# Only durable, intentionally reviewed examples belong here. Adding a snapshot is an explicit
# governance choice; discovery by wildcard could silently promote temporary files into CI scope.
snapshot_sets=(
  "examples/visual-operations/github-pr-195-cli-input.json|examples/visual-operations/github-pr-195-cli-output.json|examples/visual-operations/github-pr-195-cli-output.md"
)

pnpm exec tsc -p tsconfig.visual-ops-cli.json

for snapshot_set in "${snapshot_sets[@]}"; do
  IFS='|' read -r input json_output markdown_output <<< "$snapshot_set"
  node dist/visual-ops-cli/scripts/visual-ops-project.js \
    --input "$input" \
    --json "$json_output" \
    --markdown "$markdown_output" \
    --check
done

echo "Visual Operations snapshot check passed (${#snapshot_sets[@]} set(s))."
