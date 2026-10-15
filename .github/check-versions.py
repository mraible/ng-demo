# Fails if a pinned package@x.y.z in README.adoc doesn't match the version in package.json, so a dependency
# bump (from Dependabot or anyone else) also updates the tutorial's install commands.
# Packages that aren't in package.json, like netlify-cli, aren't checked.
# Usage: python3 .github/check-versions.py
import json, os, re, sys
repo = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
pkg = json.load(open(os.path.join(repo, 'package.json')))
versions = {**pkg.get('dependencies', {}), **pkg.get('devDependencies', {})}
stale = 0
for n, line in enumerate(open(os.path.join(repo, 'README.adoc')), 1):
    for name, version in re.findall(r'(@?[a-z0-9][a-z0-9._/-]*)@(\d+\.\d+\.\d+)', line):
        if name in versions and versions[name] != version:
            print(f'README.adoc:{n}: {name}@{version} should be {name}@{versions[name]} to match package.json')
            stale += 1
sys.exit(1 if stale else 0)
