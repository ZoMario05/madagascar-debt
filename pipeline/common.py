"""Shared helpers for the fetchers."""
import json, os, urllib.request, urllib.parse, ssl, http.cookiejar

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAW = os.path.join(ROOT, "data", "raw")
UA = "MadagascarDebtDatabase/0.2 (open data project; +https://github.com/)"


_JAR = http.cookiejar.CookieJar()


def get(url, binary=False, timeout=60, insecure=False, referer=None):
    """GET with a shared cookie jar (some sites only serve files to a visitor who opened the page first)."""
    ctx = ssl._create_unverified_context() if insecure else ssl.create_default_context()
    opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(_JAR), urllib.request.HTTPSHandler(context=ctx))
    headers = {"User-Agent": "Mozilla/5.0 (X11; Linux x86_64) " + UA, "Accept": "*/*", "Accept-Language": "fr,en;q=0.8"}
    if referer:
        headers["Referer"] = referer
    with opener.open(urllib.request.Request(url, headers=headers), timeout=timeout) as r:
        data = r.read()
    return data if binary else data.decode("utf-8", "replace")


def update_asof(**kw):
    p = os.path.join(RAW, "asof.json")
    d = json.load(open(p)) if os.path.exists(p) else {}
    d.update(kw)
    json.dump(d, open(p, "w"), indent=1)


def write_csv(name, header, rows):
    import csv
    with open(os.path.join(RAW, name), "w", newline="") as f:
        w = csv.writer(f); w.writerow(header); w.writerows(rows)
