"""News about Madagascar's debt from Google News RSS (French and English), filtered by keywords,
merged with data/raw/news.csv (kept items are never lost; newest 60 kept).
Titles are stored as published; the site shows the title in its own language feed."""
import csv, os, re, html, datetime as dt, email.utils, urllib.parse
import xml.etree.ElementTree as ET
from common import get, RAW

QUERIES = [
    ("fr", "Madagascar dette publique"), ("fr", "Madagascar accord de prêt ratification"),
    ("fr", "Madagascar FMI facilité élargie de crédit"), ("fr", "Madagascar Banque mondiale financement prêt"),
    ("fr", "Madagascar BAD prêt"), ("fr", "Madagascar Exim Bank Chine prêt"),
    ("en", "Madagascar debt"), ("en", "Madagascar loan World Bank IMF"),
]
MUST = re.compile(r"dette|prêt|pret|emprunt|financement|FMI|Banque mondiale|BAD|AFD|crédit|debt|loan|IMF|World Bank|AfDB|credit|bond|arrears|arriérés", re.I)
FEED = "https://news.google.com/rss/search?q={q}+when:30d&hl={hl}&gl=MG&ceid=MG:{hl}"


def main():
    path = f"{RAW}/news.csv"
    old = list(csv.DictReader(open(path))) if os.path.exists(path) else []
    seen = {r["url"] for r in old} | {r["title_fr"] for r in old} | {r["title_en"] for r in old}
    new = []
    for lang, q in QUERIES:
        try:
            xml = get(FEED.format(q=urllib.parse.quote(q), hl=lang))
        except Exception as e:
            print("skip", q, e); continue
        for it in ET.fromstring(xml).iter("item"):
            title = html.unescape(it.findtext("title") or "")
            src = it.findtext("source") or ""
            title = re.sub(r"\s+-\s+" + re.escape(src) + r"$", "", title) if src else title
            url = it.findtext("link") or ""
            if not MUST.search(title) or "Madagascar" not in title + q or url in seen or title in seen:
                continue
            d = email.utils.parsedate_to_datetime(it.findtext("pubDate")).date().isoformat()
            seen |= {url, title}
            new.append({"date": d, "source": src, "title_fr": title if lang == "fr" else "", "title_en": title if lang == "en" else "", "url": url})
    for r in new:  # one title per item; the other language falls back to the original
        r["title_fr"] = r["title_fr"] or r["title_en"]; r["title_en"] = r["title_en"] or r["title_fr"]
    rows = sorted(old + new, key=lambda r: r["date"], reverse=True)[:60]
    with open(path, "w", newline="") as f:
        w = csv.DictWriter(f, fieldnames=["date", "source", "title_fr", "title_en", "url"]); w.writeheader(); w.writerows(rows)
    print(f"news: {len(new)} new, {len(rows)} kept")


if __name__ == "__main__":
    main()
