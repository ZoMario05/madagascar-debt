"""Madagascar Treasury: Bulletin Statistique de la Dette (quarterly).
Finds the newest bulletin, downloads it, reads the official totals (tables 5 and 7) and the
loans signed this year (table 10). The full project list (tables 13-14) changes layout between
issues, so it is saved as text for a human check before official_bsd_loans.csv is edited.
Writes: data/raw/bsd/<n>.pdf, <n>.txt, official_bsd_totals.csv, official.json (totals only), REVIEW_BSD.md"""
import os, re, json
from common import get, RAW, update_asof

SITE = "http://www.tresorpublic.mg"
LIST = SITE + "/?page_id=214&content=temp&type=bsd"
PDF = SITE + "/tresorpublic/download.php?path=wp-content/themes/tresor-public/statik-content/tresor-public/temp/statistique/bsd/&file={n:03d}.pdf"


def num(s):
    return float(s.replace(" ", "").replace(" ", "").replace(",", "."))


def main():
    page = get(LIST, insecure=True)
    found = sorted({int(n) for n in re.findall(r"file=(\d{3})\.pdf", page)})
    latest = found[-1]
    print("BSD issues listed:", found[-5:])
    state = json.load(open(f"{RAW}/asof.json"))
    if latest <= state.get("bsd_number", 0):
        print(f"BSD: no new bulletin (latest n°{latest})"); return
    os.makedirs(f"{RAW}/bsd", exist_ok=True)
    pdf = get(PDF.format(n=latest), binary=True, insecure=True, referer=LIST)
    if not pdf.startswith(b"%PDF"):
        # the server sometimes answers with an HTML page (redirect or protection); keep the previous data
        print(f"BSD n°{latest}: server did not return a PDF ({pdf[:120]!r}); keeping previous figures")
        open(os.path.join(os.path.dirname(RAW), "..", "REVIEW_BSD.md"), "w").write(
            f"# Nouveau bulletin du Trésor n°{latest} disponible\n\nLe téléchargement automatique a échoué. "
            f"Téléchargez-le à la main : {PDF.format(n=latest)}\npuis déposez-le dans data/raw/bsd/{latest:03d}.pdf et relancez le workflow.\n")
        local = f"{RAW}/bsd/{latest:03d}.pdf"
        if not os.path.exists(local):
            return
        pdf = open(local, "rb").read()
    open(f"{RAW}/bsd/{latest:03d}.pdf", "wb").write(pdf)
    import pdfplumber, io
    with pdfplumber.open(io.BytesIO(pdf)) as doc:
        pages = [p.extract_text() or "" for p in doc.pages]
    txt = "\n\n=== PAGE ===\n".join(pages)
    open(f"{RAW}/bsd/{latest:03d}.txt", "w").write(txt)

    # Table 7: outstanding by creditor group, end of quarter (last column) + US$ lines
    t7 = txt[txt.index("Tableau 7"):txt.index("Tableau 8")]
    def last_two(label):
        m = re.search(label + r"[^\n]*", t7)
        nums = re.findall(r"-?\d[\d ]*,\d", m.group(0)) if m else []
        return [num(x) for x in nums]
    multi, multi_usd = last_two(r"Créanciers multilatéraux"), None
    lines = t7.split("\n")
    def usd_after(label):
        for i, l in enumerate(lines):
            if l.startswith(label):
                for k in lines[i + 1:i + 3]:
                    if "Millions USD" in k:
                        return num(re.findall(r"-?\d[\d ]*,\d", k)[-1])
    off = json.load(open(f"{RAW}/official.json"))
    total = re.findall(r"TOTAL\s+([\d ,]+)", t7)
    off["multi_usd"] = usd_after("Créanciers multilatéraux") or off["multi_usd"]
    off["bil_usd"] = usd_after("Créanciers bilatéraux") or off["bil_usd"]
    off["priv_usd"] = usd_after("Créditeurs privés") or off["priv_usd"]
    tot_usd = [l for l in lines if "Millions USD" in l][-1]
    off["ext_usd"] = num(re.findall(r"-?\d[\d ]*,\d", tot_usd)[-1])
    m = re.search(r"TOTAL\s+([\d ]+,\d)\s+.*?([\d ]+,\d)\s*$", t7, re.M)
    if m:
        off["ext_mga"] = num(m.group(2))
    off["mga_per_usd"] = round(off["ext_mga"] * 1e9 / (off["ext_usd"] * 1e6), 1)
    json.dump(off, open(f"{RAW}/official.json", "w"), ensure_ascii=False, indent=1)
    period = re.search(r"à fin (\w+) (\d{4})", txt)
    months = {"Mars": "03-31", "Juin": "06-30", "Septembre": "09-30", "Décembre": "12-31"}
    asof = f"{period.group(2)}-{months.get(period.group(1).capitalize(), '12-31')}" if period else ""
    update_asof(bsd=asof, bsd_number=latest)
    open(os.path.join(os.path.dirname(RAW), "..", "REVIEW_BSD.md"), "w").write(
        f"# New Treasury bulletin n°{latest} ({asof})\n\nTotals were updated automatically in data/raw/official.json: "
        f"external debt US${off['ext_usd']:,}m, multilateral {off['multi_usd']}, bilateral {off['bil_usd']}, private {off['priv_usd']}.\n\n"
        "To do by hand (15 minutes):\n1. Open data/raw/bsd/%03d.txt, tables 1-3 (ratios, cost and risk) and update the other numbers in official.json.\n"
        "2. Table 10 (loans signed this year) and tables 13-14 (project list): add new loans to data/raw/official_bsd_loans.csv.\n"
        "3. Commit: the site rebuilds automatically.\n" % latest)
    print(f"BSD n°{latest} ({asof}): external debt US${off['ext_usd']}m — review file written")


if __name__ == "__main__":
    main()
