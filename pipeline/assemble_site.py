import sys
t=open('site/template.html').read(); g=open('site/globe_chunk.js').read(); d=open('data/out/site_data.json').read().replace('</','<\\/')
__import__('os').makedirs('public',exist_ok=True); open('public/index.html','w').write(t.replace('/*__GLOBE__*/',g).replace('/*__DATA__*/null',d))
