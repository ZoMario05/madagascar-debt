"""Shared helpers for the fetchers."""
import json, os, urllib.request, urllib.parse, ssl

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAW = os.path.join(ROOT, "data", "raw")
UA = "MadagascarDebtDatabase/0.2 (open data project; +https://github.com/)"


def get(url, binary=False, timeout=60, insecure=False):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    ctx = ssl._create_unverified_context() if insecure else None
    with urllib.request.urlopen(req, timeout=timeout, context=ctx) as r:
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
