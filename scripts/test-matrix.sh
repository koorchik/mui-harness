#!/usr/bin/env bash
# Runs the test suite against every supported @mui/material major.
# Installs each major with --no-save so package.json and package-lock.json are untouched,
# then restores the locked versions at the end (also on failure or Ctrl-C).
set -euo pipefail

cd "$(dirname "$0")/.."

MAJORS="${MUI_MAJORS:-6 7 9}"
status=0

restore() {
  echo
  echo "=== restoring locked versions ==="
  npm ci --no-audit --no-fund >/dev/null
}
trap restore EXIT

for major in $MAJORS; do
  echo
  echo "=== @mui/material@$major ==="
  npm install --no-save --no-audit --no-fund "@mui/material@$major" "@mui/icons-material@$major" >/dev/null
  echo "installed $(node -p "require('@mui/material/package.json').version")"
  if ! npx vitest run; then
    echo "!!! tests failed on @mui/material@$major"
    status=1
  fi
done

exit $status
