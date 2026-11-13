"""Draws the Trosa icon (favicon, phone icon) from the real Madagascar coastline
used by the globe (Natural Earth 1:50m, in site/globe_chunk.js).
Run by hand only when the logo changes:  python pipeline/make_icons.py
Needs rsvg-convert and Pillow. The results are saved in site/static/ and copied
to the published site by assemble_site.py."""
import json, math, re, subprocess, io, os
from PIL import Image

src = open('site/globe_chunk.js').read()
MADA = json.loads(re.search(r'const MADA=(\[\[.*?\]\]);', src, re.S).group(1))
kx = math.cos(math.radians(-18.9))            # true proportions at Madagascar's latitude
P = [(lon * kx, -lat) for lon, lat in MADA]
xs, ys = [p[0] for p in P], [p[1] for p in P]
cx, cy = (min(xs) + max(xs)) / 2, (min(ys) + max(ys)) / 2
rmax = max(math.hypot(x - cx, y - cy) for x, y in P)

def path(S, fill_r):
    """island centred in an S x S square, farthest point at fill_r * S from the centre"""
    k = fill_r * S / rmax
    return ''.join(f"{'L' if i else 'M'}{S/2 + (x-cx)*k:.2f} {S/2 + (y-cy)*k:.2f}" for i, (x, y) in enumerate(P)) + 'Z'

def svg(S=512, fill_r=0.40, glow=1.0, bold=False, bg=False):
    """bg=False: the island and its glow only, on a transparent background"""
    d = path(S, fill_r)
    b1, b2 = S * 0.014 * glow, S * 0.045 * glow
    stops = ('<stop offset="0" stop-color="#d9ffe9"/><stop offset=".4" stop-color="#7df7b3"/><stop offset="1" stop-color="#2fd07a"/>'
             if bold else
             '<stop offset="0" stop-color="#eafff3"/><stop offset=".35" stop-color="#8dffbf"/><stop offset=".75" stop-color="#3ddc84"/><stop offset="1" stop-color="#17a35a"/>')
    back = f'<rect width="{S}" height="{S}" fill="#070a0d"/>' if bg else ''
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {S} {S}" width="{S}" height="{S}">
<defs>
<radialGradient id="lg" cx="56%" cy="42%" r="62%">{stops}</radialGradient>
<filter id="g1" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="{b1:.2f}"/></filter>
<filter id="g2" x="-90%" y="-90%" width="280%" height="280%"><feGaussianBlur stdDeviation="{b2:.2f}"/></filter>
</defs>
{back}<path d="{d}" fill="#3ddc84" opacity=".6" filter="url(#g2)"/>
<path d="{d}" fill="#3ddc84" opacity=".9" filter="url(#g1)"/>
<path d="{d}" fill="url(#lg)" stroke="#2bbf70" stroke-width="{S*0.004:.2f}" stroke-linejoin="round"/>
</svg>'''

def png(s, size):
    out = subprocess.run(['rsvg-convert', '-w', str(size), '-h', str(size)], input=s.encode(), capture_output=True, check=True).stdout
    return Image.open(io.BytesIO(out)).convert('RGBA')

out = 'site/static'; os.makedirs(out, exist_ok=True)
big = svg(fill_r=0.43)                                   # glow version, for 96 px and up
small = svg(fill_r=0.49, glow=0.6, bold=True)            # island fills the square at tiny sizes
open(f'{out}/favicon.svg', 'w').write(svg(S=64, fill_r=0.49, glow=0.6, bold=True))
for n, s in [(48, small), (96, big), (144, big)]: png(s, n).save(f'{out}/favicon-{n}x{n}.png')
for n in (192, 512): png(big, n).save(f'{out}/icon-{n}.png')
png(svg(bg=True), 180).save(f'{out}/apple-touch-icon.png')  # phones need a solid background here
ico = [png(small, n) for n in (48, 32, 16)]
ico[0].save(f'{out}/favicon.ico', sizes=[(48, 48), (32, 32), (16, 16)], append_images=ico[1:])
json.dump({"name": "Trosa", "short_name": "Trosa", "start_url": "/", "display": "browser",
           "background_color": "#070a0d", "theme_color": "#070a0d",
           "icons": [{"src": "/icon-192.png", "sizes": "192x192", "type": "image/png"},
                     {"src": "/icon-512.png", "sizes": "512x512", "type": "image/png"}]},
          open(f'{out}/site.webmanifest', 'w'), indent=1)
print('icons written to', out)
