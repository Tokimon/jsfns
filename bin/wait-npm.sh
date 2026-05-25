#!/usr/bin/env bash
set -euo pipefail

TAG="${1:-}"

if [ -z "$TAG" ]; then
  echo "Usage: $0 <tag>  (e.g. @jsfns/core@1.2.1)" >&2
  exit 1
fi

PKG="${TAG%@*}"
VER="${TAG##*@}"

echo "Polling npm for $PKG@$VER..."
for i in {1..60}; do
  if npm view "$PKG@$VER" version >/dev/null 2>&1; then
    echo "✓ $PKG@$VER available on npm"
    exit 0
  fi
  echo "waiting for $PKG@$VER... ($i/60)"
  sleep 5
done

echo "::error::$PKG@$VER not visible on npm after 5m" >&2
exit 1
