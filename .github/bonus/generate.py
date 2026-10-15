# Generates each bonus tutorial (MATERIAL.adoc, AUTH0.adoc, ...) from its template in this directory by expanding
# these placeholders with code from the tutorial's branch:
#   @@show REV PATH@@, @@diff A B PATH@@, @@lines REV PATH :: START_REGEX :: END_REGEX@@, and @@include FILE@@
# REV is a branch name with an optional ~N suffix (bootstrap, bootstrap~1, and so on), where each commit on the branch
# is one tutorial step. Use BRANCH~N, where N is the branch's number of commits, to refer to main.
# Usage: python3 .github/bonus/generate.py [--remote origin] [branch ...] (default: all branches in branches.json)
import json, os, re, subprocess, sys
here = os.path.dirname(os.path.abspath(__file__))
repo = os.path.abspath(os.path.join(here, '..', '..'))
branches = json.load(open(os.path.join(here, 'branches.json')))
args = sys.argv[1:]
remote = ''
if args[:1] == ['--remote']:
    remote, args = args[1] + '/', args[2:]
git = lambda *a: subprocess.run(['git', '-C', repo, *a], capture_output=True, text=True, check=True).stdout

def ref(rev):
    name = re.split(r'[~^]', rev)[0]
    return remote + rev if name in branches or name == 'main' else rev

def lines(rev, path, start, end):
    src = git('show', f'{ref(rev)}:{path}')
    m = re.search(start, src, re.M)
    if not m: sys.exit(f'start not found: {start} in {rev}:{path}')
    s = src.rfind('\n', 0, m.start()) + 1
    e = re.search(end, src[m.start():], re.M)
    if not e: sys.exit(f'end not found: {end} in {rev}:{path}')
    return src[s:m.start() + e.end()].rstrip('\n')

def expand(m):
    body = m.group(1)
    if body.startswith('include'):
        return open(os.path.join(here, body.split(' ')[1])).read().rstrip('\n')
    if body.startswith('lines'):
        head, start, end = body.split(' :: ')
        _, rev, path = head.split(' ')
        return lines(rev, path, start, end)
    kind, *a = body.split(' ')
    if kind == 'show':
        return git('show', f'{ref(a[0])}:{a[1]}').rstrip('\n')
    d = git('diff', ref(a[0]), ref(a[1]), '--', a[2])
    return re.sub(r'^index .*\n', '', d, flags=re.M).rstrip('\n')

for branch in args or branches:
    doc = branches[branch]['doc']
    tmpl = os.path.join(here, doc + '.tmpl')
    text = re.sub(r'@@((?:show|diff|lines|include) (?:[^@]|@(?!@))+)@@', expand, open(tmpl).read())
    open(os.path.join(repo, doc), 'w').write(text)
    print('wrote', doc)
