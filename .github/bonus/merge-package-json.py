# A git merge driver for package.json that sync-bonus-branches.yml uses while it rebases a bonus branch onto main.
# Dependabot bumps on main change lines next to the ones a bonus branch adds, so a line-based merge conflicts. This
# merges the JSON instead: a key changed on one side takes that side's value, and a key changed differently on both
# sides is a real conflict. Angular packages that only the branch has (like @angular/material) move to main's
# @angular/core version when main's Angular version changes and that version is published.
# Usage (as a merge driver): python3 merge-package-json.py %O %A %B, where %A is replaced with the result
import json, subprocess, sys

MISSING = object()
DEPS = ('dependencies', 'devDependencies', 'peerDependencies', 'optionalDependencies')


class Conflict(Exception):
    pass


def merge(base, ours, theirs, path=''):
    if ours == theirs:
        return ours
    if base == ours:
        return theirs
    if base == theirs:
        return ours
    if all(isinstance(v, dict) for v in (base, ours, theirs)) or (
            base is MISSING and isinstance(ours, dict) and isinstance(theirs, dict)):
        base = {} if base is MISSING else base
        result = {}
        for key in list(theirs) + [k for k in ours if k not in theirs]:
            value = merge(base.get(key, MISSING), ours.get(key, MISSING), theirs.get(key, MISSING), f'{path}/{key}')
            if value is not MISSING:
                result[key] = value
        return result
    raise Conflict(path or '/')


def deps(pkg):
    return {name: version for section in DEPS for name, version in pkg.get(section, {}).items()}


def published(name, version):
    out = subprocess.run(['npm', 'view', f'{name}@{version}', 'version'], capture_output=True, text=True)
    return out.returncode == 0 and out.stdout.strip() == version


def align_angular(base, ours, merged):
    old, new = deps(base).get('@angular/core'), deps(ours).get('@angular/core')
    if not new or old == new:
        return
    main_deps = deps(ours)
    for section in DEPS:
        for name, version in merged.get(section, {}).items():
            if name.startswith('@angular/') and name not in main_deps and version != new and published(name, new):
                print(f'{name}: {version} -> {new} to match @angular/core', file=sys.stderr)
                merged[section][name] = new


def main():
    base_file, ours_file, theirs_file = sys.argv[1:4]
    base, ours, theirs = (json.load(open(f)) for f in (base_file, ours_file, theirs_file))
    try:
        merged = merge(base, ours, theirs)
    except Conflict as e:
        print(f'package.json: both sides changed {e}', file=sys.stderr)
        return 1
    for section in DEPS:
        if section in merged:
            merged[section] = dict(sorted(merged[section].items()))
    align_angular(base, ours, merged)
    with open(ours_file, 'w') as f:
        f.write(json.dumps(merged, indent=2, ensure_ascii=False) + '\n')
    return 0


if __name__ == '__main__':
    sys.exit(main())
