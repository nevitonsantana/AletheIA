#!/usr/bin/env bash
set -euo pipefail

repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$repo_root"

pnpm exec tsc -p tsconfig.visual-ops-cli.json
exec node dist/visual-ops-cli/scripts/visual-ops-project.js "$@"
