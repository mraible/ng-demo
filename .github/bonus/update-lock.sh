#!/usr/bin/env bash
# Runs after each commit that sync-bonus-branches.yml replays onto main (git rebase --exec). package-lock.json is
# merged by keeping main's version, so this updates it to match the commit's package.json and amends the commit.
set -euo pipefail
if git diff --quiet HEAD^ HEAD -- package.json package-lock.json; then
  exit 0
fi
npm install --package-lock-only --ignore-scripts --no-audit --no-fund --loglevel=error
if ! git diff --quiet -- package-lock.json; then
  git commit --quiet --amend --no-edit --no-verify -- package-lock.json
fi
