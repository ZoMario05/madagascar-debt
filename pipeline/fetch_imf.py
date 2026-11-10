"""IMF: Madagascar's Financial Position in the Fund (memberKey 620) + SDR/US$ rate.
Writes data/raw/imf.csv, imf_projected.csv, sdr_usd.txt."""
import re, html, datetime as dt
from common import get, write_csv, update_asof, RAW

URL = "https://www.imf.org/external/np/fin/tad/exfin2.aspx?memberKey1=620&date1key=2099-12-31"
SDR = "https://www.imf.org/external/np/fin/data/rms_sdrv.aspx"


def text(url):
    t = re.sub(r"<[^>]+>", "\t", get(url))
    return re.sub(r"[ \t\r]*\n[ \t\r\n]*", "\n", re.sub(r"\t+", "\t", html.unescape(t)))


def main():
    t = text(URL)
    asof = re.search(r"as of (\w+ \d{1,2}, \d{4})", t).group(1)
    asof = dt.datetime.strptime(asof, "%B %d, %Y").date().isoformat()
    sec4 = t[t.index("IV. Outstanding"):t.index("V. Latest")]
    out = {m.group(1): float(m.group(2)) for m in re.finditer(r"(ECF|RCF|RSF|EFF|SCF|RFI)\s+(?:Arrangements|Loans|Purchases)?\s*\t?\s*([\d.,]+)", sec4)}
    sec5 = t[t.index("V. Latest"):t.index("VI.")]
    arr = [m.groups() for m in re.finditer(r"\n\s*(ECF|RSF|EFF|SCF)\s*\t\s*(\w{3} \d{2}, \d{4})\s*\t\s*(\w{3} \d{2}, \d{4})\s*\t\s*([\d.,]+)\s*\t\s*([\d.,]+)", sec5)]
    rcf = [m.groups() for m in re.finditer(r"\n\s*(RCF|RFI)\s*\t\s*(\w{3} \d{2}, \d{4})\s*\t\s*(\w{3} \d{2}, \d{4})\s*\t\s*([\d.,]+)\s*\t\s*([\d.,]+)", sec5)]
    d = lambda s: dt.datetime.strptime(s, "%b %d, %Y").date().isoformat()
    f = lambda s: float(s.replace(",", ""))
    rows, src = [], URL
    latest = {}
    for typ, a, e, app, drawn in arr:
        latest.setdefault(typ, (a, e, app, drawn))           # the page lists the newest arrangement first
    for typ, (a, e, app, drawn) in latest.items():
        name = {"ECF": "Extended Credit Facility (ECF)", "RSF": "Resilience and Sustainability Facility (RSF)"}.get(typ, typ)
        o = min(f(drawn), out.get(typ, 0))
        rows.append([f"MDG-IMF-{a[:4]}-{typ}", name, d(a), d(e), app, drawn, round(o, 2),
                     "latest arrangement", "0%" if typ == "ECF" else "SDR rate + margin (variable)",
                     5.5 if typ == "ECF" else 10.5, 10 if typ == "ECF" else 20, src])
        if typ == "ECF" and out.get("ECF", 0) - o > 0.01:
            rows.append(["MDG-IMF-OLD-ECF", "Extended Credit Facility (ECF) - earlier arrangements", "", "", "", "",
                         round(out["ECF"] - o, 2), "ECF total minus latest arrangement", "0%", 5.5, 10, src])
    if out.get("RCF"):
        first = min(d(x[1]) for x in rcf) if rcf else ""
        rows.append([f"MDG-IMF-{first[:4] or 'X'}-RCF", "Rapid Credit Facility (RCF)", first, "", sum(f(x[3]) for x in rcf),
                     sum(f(x[4]) for x in rcf), out["RCF"], "exact (RCF total)", "0%", 5.5, 10, src])
    write_csv("imf.csv", ["loan_id", "facility", "date_approved", "expiry_or_drawn", "approved_sdr_m", "drawn_sdr_m", "outstanding_sdr_m",
                          "outstanding_note", "interest", "grace_years", "maturity_years", "source_url"], rows)
    sec6 = t[t.index("VI."):t.index("VII.")]
    yrs = re.findall(r"\b(20\d\d)\b", sec6)[:5]
    pr = re.search(r"Principal\s*\t?\s*([\d.\t ]+)", sec6).group(1).split()
    write_csv("imf_projected.csv", ["year", "principal_sdr_m"], [[y, p] for y, p in zip(yrs, pr) if int(y) > dt.date.today().year])
    s = text(SDR)
    rate = re.search(r"SDR1 = US\$\s*\t?\s*([\d.]+)", s).group(1)
    open(f"{RAW}/sdr_usd.txt", "w").write(rate)
    update_asof(imf=asof)
    print(f"IMF {asof}: {out} | SDR1 = US${rate}")


if __name__ == "__main__":
    main()
