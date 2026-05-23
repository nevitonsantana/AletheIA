#!/usr/bin/env bash
# scaffold-overlay — materialize the operating-overlay pack into the current
# working directory (the consumer project root).
#
# Invoked by:  apm run scaffold-overlay
# Standalone:  bash apm_modules/AletheIA/packs/operating-overlay/scripts/scaffold-overlay.sh
#
# Design notes
# - Idempotent for the common case: refuses to overwrite an existing AGENTS.md
#   or ops/ai/ unless --force is passed. Adopters can opt into overwrite.
# - Copies are content-only (the trailing `/.` in cp -R) so dotdirs like
#   .claude/ come along. Does not copy the pack README, manifest, or this
#   scripts/ dir — those are source artifacts, not runtime ones.
# - No variable substitution here. Adopters substitute {{VARS}} after copy;
#   see docs/guides/install-via-apm.md.

set -euo pipefail

force=0
for arg in "$@"; do
  case "$arg" in
    --force) force=1 ;;
    -h|--help)
      sed -n '2,16p' "$0" | sed 's|^# \?||'
      exit 0
      ;;
    *) echo "scaffold-overlay: unknown arg: $arg" >&2; exit 2 ;;
  esac
done

# Locate the pack root (this script lives at <pack>/scripts/scaffold-overlay.sh).
script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
pack_dir="$(cd "$script_dir/.." && pwd)"
target_dir="$(pwd)"

if [[ "$target_dir" == "$pack_dir" ]]; then
  echo "scaffold-overlay: refusing to scaffold into the pack itself." >&2
  echo "Run this from the consumer project root, not inside the AletheIA repo." >&2
  exit 3
fi

# Pre-flight: warn on collisions unless --force.
collisions=()
for path in AGENTS.md CLAUDE.md .claude ops/ai; do
  if [[ -e "$target_dir/$path" ]]; then
    collisions+=("$path")
  fi
done

if [[ ${#collisions[@]} -gt 0 && $force -eq 0 ]]; then
  echo "scaffold-overlay: target already contains overlay artifacts:" >&2
  printf '  - %s\n' "${collisions[@]}" >&2
  echo "Re-run with --force to overwrite, or remove them manually first." >&2
  exit 4
fi

# Build a temp staging dir mirroring the pack minus source-only artifacts,
# then rsync (or cp) into the target. Using a staging step lets us exclude
# README.md / manifest.yaml / scripts/ cleanly without rm-ing in the target.
staging="$(mktemp -d)"
trap 'rm -rf "$staging"' EXIT

cp -R "$pack_dir/." "$staging/"
rm -f "$staging/README.md" "$staging/manifest.yaml"
rm -rf "$staging/scripts"

# Final copy. The `/.` includes dotdirs.
cp -R "$staging/." "$target_dir/"

cat <<EOF
scaffold-overlay: overlay materialized at $target_dir

Next steps:
  1. Substitute variables: grep -rl '{{' . | xargs sed -i.bak ...
     (see docs/guides/install-via-apm.md for the full one-liner)
  2. Replace ops/ai/constitution/README.md with mission.md, scope.md,
     stack.md, principles.md.
  3. Verify in a fresh Claude Code session per the §8 conformance test
     in docs/contracts/consumer-project-overlay.md.

Pack manifest (provenance + variables + checklist):
  $pack_dir/manifest.yaml
EOF
