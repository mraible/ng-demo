# Lists packages that only a bonus branch uses (like bootstrap or electron) and that have a newer version on npm, as a
# Markdown list. Dependabot only updates main, and merge-package-json.py keeps Angular packages in step with main.
# Usage: python3 .github/bonus/outdated.py [--remote origin]
import json, os, subprocess, sys
here = os.path.dirname(os.path.abspath(__file__))
branches = json.load(open(os.path.join(here, 'branches.json')))
remote = sys.argv[2] + '/' if sys.argv[1:2] == ['--remote'] else ''
git = lambda *a: subprocess.run(['git', '-C', here, *a], capture_output=True, text=True, check=True).stdout


def deps(rev):
    pkg = json.loads(git('show', f'{rev}:package.json'))
    return {**pkg.get('dependencies', {}), **pkg.get('devDependencies', {})}


main = deps(remote + 'main')
for branch in branches:
    for name, version in deps(remote + branch).items():
        if name in main or name.startswith('@angular/'):
            continue
        out = subprocess.run(['npm', 'view', name, 'dist-tags.latest'], capture_output=True, text=True, check=True)
        latest = out.stdout.strip()
        if latest and latest != version:
            print(f'- `{name}` on `{branch}`: {version} → {latest}')
