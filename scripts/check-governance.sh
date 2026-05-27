#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

failures=0

pass() {
  printf 'PASS: %s\n' "$1"
}

fail() {
  printf 'FAIL: %s\n' "$1" >&2
  failures=$((failures + 1))
}

check_file() {
  local path="$1"
  if [[ -f "$path" ]]; then
    pass "required file present -> $path"
  else
    fail "required file missing -> $path"
  fi
}

check_dir() {
  local path="$1"
  if [[ -d "$path" ]]; then
    pass "required directory present -> $path"
  else
    fail "required directory missing -> $path"
  fi
}

check_text() {
  local file="$1"
  local pattern="$2"
  local label="$3"
  if grep -q "$pattern" "$file"; then
    pass "$label"
  else
    fail "$label"
  fi
}

echo "== AletheIA governance baseline check =="

for dir in engine schemas policies examples tests starter-pack docs scripts; do
  check_dir "$dir"
done

for file in \
  README.md \
  docs/concepts/overview.md \
  docs/concepts/governance.md \
  docs/concepts/quality.md \
  docs/roadmaps/roadmap-alpha.md \
  docs/reference/token-policy.md \
  policies/aletheia-development-governance.v1.json \
  scripts/check-governance.sh \
  package.json
do
  check_file "$file"
done

check_text "README.md" "token-policy.md" "README links token policy in reading order"
check_text "docs/concepts/governance.md" "token-policy.md" "governance doc references token policy"
check_text "docs/roadmaps/roadmap-alpha.md" "token policy" "roadmap includes token policy"
check_text "package.json" "vitest" "package uses vitest as test runner"
check_text "package.json" "test:coverage" "package exposes coverage script"

if grep -R -n -E "__PLACEHOLDER__|YOUR_PROJECT|TODO_RELEASE" \
  README.md docs policies starter-pack 2>/dev/null >/tmp/aletheia-governance-placeholders.txt; then
  fail "unexpected release placeholders found (see /tmp/aletheia-governance-placeholders.txt)"
else
  pass "no release placeholder markers found in key public surfaces"
fi

echo
if [[ "$failures" -gt 0 ]]; then
  printf 'Governance baseline failed with %s issue(s).\n' "$failures" >&2
  exit 1
fi

echo "Governance baseline passed."
