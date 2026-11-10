"""IMF: Madagascar's Financial Position in the Fund (memberKey 620) + SDR/US$ rate.
Writes data/raw/imf.csv, imf_projected.csv, sdr_usd.txt."""
import re, html, datetime as dt
from common import get, write_csv, update_asof, RAW

URL = "https://www.imf.org/external/np/fin/tad/exfin2.aspx?memberKey1=620&date1key=2099-12-31"
SDR = "https://www.imf.org/external/np/fin/data/rms_sdrv.aspx"


def text(url):
    h = get(url)
    h = re.sub(r"(?is)<(script|style)[^>]*>.*?</\1>", "", h)
    t = html.unescape(re.sub(r"<[^>]+>", "\t", h)).replace("\xa0", " ")
    t = re.sub(r"[ ]+", " ", t)
    t = re.sub(r"[ \t]*\t[ \t]*", "\t", t)
    t = re.sub(r"\t+", "\t", t)
    return re.sub(r"[ \t\r]*\n[ \t\r\n]*", "\n", t)


def parse(t):
    asof = re.search(r"as of (\w+ \d{1,2}, \d{4})", t).group(1)
    asof = dt.datetime.strptime(asof, "%B %d, %Y").date().isoformat()
    sec = lambda a, b: t[re.search(a, t).start():re.search(b, t).start()]
    s4, s5, s6 = sec(r"IV\.\s*Outstanding", r"V\.\s*Latest"), sec(r"V\.\s*Latest", r"VI\.\s*Overdue"), sec(r"VI\.\s*Overdue", r"VII\.")
    f = lambda s: float(s.replace(",", ""))
    out = {m.group(1): f(m.group(2)) for m in re.finditer(r"(ECF|RCF|RSF|EFF|SCF|RFI|SBA) (?:Arrangements|Loans|Purchases)\t([\d.,]+)", s4)}
    split = s5.find("Outright")
    row = r"(ECF|RSF|EFF|SCF|SBA|RCF|RFI)\t(\w{3} \d{2}, \d{4})\t(\w{3} \d{2}, \d{4})\t([\d.,]+)\t([\d.,]+)"
    arr = re.findall(row, s5[:split] if split > 0 else s5)
    rcf = re.findall(row, s5[split:]) if split > 0 else []
    yrs = re.findall(r"\t(20\d\d)", s6)[:5]
    pr = re.search(r"Principal\t([\d.,\t-]+?)\tCharges", s6).group(1).split("\t")
    return asof, out, arr, rcf, list(zip(yrs, pr))


def main():
    asof, out, arr, rcf, proj = parse(text(URL))
    d = lambda s: dt.datetime.strptime(s, "%b %d, %Y").date().isoformat()
    f = lambda s: float(s.replace(",", ""))
    rows, src, latest = [], URL, {}
    for typ, a, e, app, drawn in arr:
        latest.setdefault(typ, (a, e, app, drawn))           # the page lists the newest arrangement first
    for typ, (a, e, app, drawn) in latest.items():
        name = {"ECF": "Extended Credit Facility (ECF)", "RSF": "Resilience and Sustainability Facility (RSF)"}.get(typ, typ)
        o = min(f(drawn), out.get(typ, 0))
        rows.append([f"MDG-IMF-{d(a)[:4]}-{typ}", name, d(a), d(e), app, drawn, round(o, 2),
                     "exact" if abs(o - out.get(typ, 0)) < 0.01 else "latest arrangement",
                     "0%" if typ == "ECF" else "SDR rate + margin (variable)",
                     5.5 if typ == "ECF" else 10.5, 10 if typ == "ECF" else 20, src])
        if typ == "ECF" and out.get("ECF", 0) - o > 0.01:
            rows.append(["MDG-IMF-OLD-ECF", "Extended Credit Facility (ECF) - earlier arrangements", "", "", "", "",
                         round(out["ECF"] - o, 2), "ECF total minus latest arrangement", "0%", 5.5, 10, src])
    if out.get("RCF"):
        first = min(d(x[1]) for x in rcf) if rcf else ""
        rows.append([f"MDG-IMF-{first[:4] or 'X'}-RCF", "Rapid Credit Facility (RCF)", first, "", round(sum(f(x[3]) for x in rcf), 2),
                     round(sum(f(x[4]) for x in rcf), 2), out["RCF"], "exact (RCF total)", "0%", 5.5, 10, src])
    write_csv("imf.csv", ["loan_id", "facility", "date_approved", "expiry_or_drawn", "approved_sdr_m", "drawn_sdr_m", "outstanding_sdr_m",
                          "outstanding_note", "interest", "grace_years", "maturity_years", "source_url"], rows)
    write_csv("imf_projected.csv", ["year", "principal_sdr_m"], [[y, p] for y, p in proj if int(y) > dt.date.today().year])
    rate = re.search(r"SDR1 = US\$\s*\t?\s*([\d.]+)", text(SDR)).group(1)
    open(f"{RAW}/sdr_usd.txt", "w").write(rate)
    update_asof(imf=asof)
    print(f"IMF {asof}: {out} | SDR1 = US${rate}")


if __name__ == "__main__":
    main()
