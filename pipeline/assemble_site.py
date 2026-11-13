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
# logo files (favicon, phone icon): made once by make_icons.py, copied as they are
import shutil
for f in os.listdir('site/static'):
    shutil.copy(os.path.join('site/static', f), os.path.join('public', f))
# help search engines find the site and the open-data files
import datetime
today = datetime.date.today().isoformat()
open('public/robots.txt', 'w').write('User-agent: *\nAllow: /\nSitemap: https://trosamg.org/sitemap.xml\n')
urls = ['', 'trosa_prets.csv', 'trosa_echeancier.csv', 'trosa_donnees.json', 'trosa_base.xlsx']
open('public/sitemap.xml', 'w').write('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    + ''.join(f'  <url><loc>https://trosamg.org/{u}</loc><lastmod>{today}</lastmod></url>\n' for u in urls) + '</urlset>\n')
