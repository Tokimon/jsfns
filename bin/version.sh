#!/usr/bin/env bash
set -euo pipefail

STATUS=".changeset/status.json"

pnpm changeset status --output="$STATUS"

TAGS=$(node -p "
  require('./$STATUS').releases
    .filter(r => r.type !== 'none')
    .map(r => r.name + '@' + r.newVersion)
    .join(' ')
")

rm "$STATUS"

if [ -z "$TAGS" ]; then
  echo "No releases to publish" >&2
  exit 1
fi

pnpm changeset version

git add .
git commit -m "Release $TAGS"

pnpm changeset tag

git push origin HEAD
git push origin $TAGS
