# Fails if a pinned package@x.y.z in README.adoc doesn't match the version in package.json. With --fix, it updates
# README.adoc instead. Dependabot only updates package.json, so sync-bonus-branches.yml runs this with --fix after
# every push to main and commits the result.
# Packages that aren't in package.json, like netlify-cli, aren't checked.
# Usage: python3 .github/check-versions.py [--fix]
import json, os, re, sys
repo = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
pkg = json.load(open(os.path.join(repo, 'package.json')))
versions = {**pkg.get('dependencies', {}), **pkg.get('devDependencies', {})}
fix = sys.argv[1:] == ['--fix']
readme = os.path.join(repo, 'README.adoc')
lines = open(readme).read().split('\n')
stale = 0


def pin(n, m):
    global stale
    name, version = m.groups()
    if name not in versions or versions[name] == version:
        return m.group(0)
    print(f'README.adoc:{n}: {name}@{version} should be {name}@{versions[name]} to match package.json')
    stale += 1
    return f'{name}@{versions[name]}'


for i, line in enumerate(lines):
    lines[i] = re.sub(r'(@?[a-z0-9][a-z0-9._/-]*)@(\d+\.\d+\.\d+)', lambda m: pin(i + 1, m), line)
if fix:
    open(readme, 'w').write('\n'.join(lines))
sys.exit(1 if stale and not fix else 0)
