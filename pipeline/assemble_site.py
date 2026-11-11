import os, sys
t = open('site/template.html').read(); g = open('site/globe_chunk.js').read()
d = open('data/out/site_data.json').read().replace('</', '<\\/')
# Safety: never publish a broken page. Stop the build if a source is missing or the page would be incomplete.
for name, txt, marker in [('site/template.html', t, '/*__GLOBE__*/'), ('site/template.html', t, '/*__DATA__*/null')]:
    if marker not in txt:
        sys.exit(f'build stopped: {name} is empty or missing {marker}')
if len(g) < 5000 or len(d) < 5000:
    sys.exit('build stopped: globe script or site data looks empty')
out = t.replace('/*__GLOBE__*/', g).replace('/*__DATA__*/null', d)
if len(out) < 100_000 or '<title>' not in out:
    sys.exit(f'build stopped: page too small ({len(out)} bytes)')
os.makedirs('public', exist_ok=True); open('public/index.html', 'w').write(out)
