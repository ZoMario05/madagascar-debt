"""Turn the master dataset + official figures into the compact JSON the website reads.
Run: python3 build_site_data.py <raw_dir> <out_dir>  -> <out_dir>/site_data.json"""
import csv, json, sys, datetime as dt, collections, re

RAW, OUT = sys.argv[1], sys.argv[2]
loans = list(csv.DictReader(open(f"{OUT}/master_loans.csv")))
sched = list(csv.DictReader(open(f"{OUT}/repayment_schedule_estimated.csv")))
ids = {r["creditor"]: r for r in csv.DictReader(open(f"{RAW}/wb_ids_creditors.csv"))}
news = list(csv.DictReader(open(f"{RAW}/news.csv")))[:24]
OFFICIAL = json.load(open(f"{RAW}/official.json"))  # Treasury bulletin figures; totals refreshed by fetch_bsd.py
ASOF = json.load(open(f"{RAW}/asof.json")) if __import__("os").path.exists(f"{RAW}/asof.json") else {}

# ---- lenders: key, names, type, HQ coordinates, outstanding (best source) ----
L = [  # key, EN, FR, short, type, hq EN, hq FR, lat, lng, outstanding $m, basis
 ("IDA","World Bank (IDA)","Banque mondiale (IDA)","World Bank","Multilateral","Washington, DC","Washington",38.899,-77.043,None,"wb"),
 ("IMF","International Monetary Fund","Fonds monétaire international","IMF","Multilateral","Washington, DC","Washington",38.899,-77.043,None,"imf"),
 ("AFDB","African Development Bank Group","Groupe de la Banque africaine de développement","AfDB","Multilateral","Abidjan","Abidjan",5.36,-4.0,633,"ids"),
 ("EIB","European Investment Bank","Banque européenne d'investissement","EIB","Multilateral","Luxembourg","Luxembourg",49.6,6.1,274,"ids"),
 ("IFAD","IFAD","FIDA","IFAD","Multilateral","Rome","Rome",41.9,12.5,208,"ids"),
 ("OFID","OPEC Fund (OFID)","Fonds OPEP (OFID)","OPEC Fund","Multilateral","Vienna","Vienne",48.2,16.4,61,"ids"),
 ("BADEA","Arab Bank for Economic Development in Africa","Banque arabe pour le développement économique en Afrique","BADEA","Multilateral","Khartoum","Khartoum",15.5,32.5,52,"ids"),
 ("TDB","Trade and Development Bank","Banque de commerce et de développement (TDB)","TDB","Multilateral","Bujumbura","Bujumbura",-3.4,29.4,18,"ids"),
 ("CN","China (Export-Import Bank)","Chine (Exim Bank)","China","Bilateral","Beijing","Pékin",39.9,116.4,317,"ids"),
 ("FR","France (AFD, French Treasury)","France (AFD, Trésor français)","France","Bilateral","Paris","Paris",48.9,2.3,259,"ids"),
 ("JP","Japan (JICA)","Japon (JICA)","Japan","Bilateral","Tokyo","Tokyo",35.7,139.7,187,"ids"),
 ("DZ","Algeria","Algérie","Algeria","Bilateral","Algiers","Alger",36.75,3.06,74,"ids"),
 ("KR","Korea (Exim Bank / EDCF)","Corée (Exim Bank / EDCF)","Korea","Bilateral","Seoul","Séoul",37.6,127.0,36,"ids"),
 ("SA","Saudi Fund for Development","Fonds saoudien de développement","Saudi Fund","Bilateral","Riyadh","Riyad",24.7,46.7,29,"ids"),
 ("KW","Kuwait Fund","Fonds koweïtien","Kuwait Fund","Bilateral","Kuwait City","Koweït",29.4,48.0,20,"ids"),
 ("AE","Abu Dhabi Fund for Development","Fonds d'Abou Dabi pour le développement","Abu Dhabi Fund","Bilateral","Abu Dhabi","Abou Dabi",24.4,54.4,7,"ids"),
 ("RU","Russian Federation","Russie","Russia","Bilateral","Moscow","Moscou",55.75,37.6,9,"ids"),
 ("IN","India (Exim Bank)","Inde (Exim Bank)","India","Bilateral","Mumbai","Bombay",19.1,72.9,7,"ids"),
 ("NL","Netherlands","Pays-Bas","Netherlands","Bilateral","The Hague","La Haye",52.1,4.3,7,"ids"),
 ("BE","Belgium (FINEXPO)","Belgique (FINEXPO)","Belgium","Bilateral","Brussels","Bruxelles",50.85,4.35,6,"ids"),
 ("DE","Germany","Allemagne","Germany","Bilateral","Berlin","Berlin",52.5,13.4,3,"ids"),
 ("AO","Angola","Angola","Angola","Bilateral","Luanda","Luanda",-8.8,13.2,3,"ids"),
 ("ES","Spain","Espagne","Spain","Bilateral","Madrid","Madrid",40.4,-3.7,1,"ids"),
 ("SG","Société Générale","Société Générale","Société Générale","Commercial","Paris (La Défense)","Paris (La Défense)",48.892,2.239,100,"sdmt"),
]
def key_of(r):
    i = r["loan_id"]
    for k, pat in [("IDA","-IDA"),("IMF","-IMF-"),("AFDB","-AFDB-"),("EIB","-EIB-"),("IFAD","-IFAD-"),("OFID","-OFID-"),("BADEA","-BADEA-"),
                   ("CN","-CN-"),("JP","-JP-"),("KR","-KR-"),("SA","-SA-"),("KW","-KW-"),("AE","-AE-"),("BE","-BE-"),("SG","-COM-")]:
        if pat in i: return k
    if r["lender_country"] == "France": return "FR"
    return "OTHER"

def iso(s):
    return dt.date.fromisoformat(s) if s else None

def grant_element(rate, fee, grace, mat, disc=0.05):
    """IMF-style grant element: 1 - PV(service)/face. Principal in equal annual instalments after grace."""
    if mat is None or grace is None or mat <= 0: return None
    mat, grace = int(round(mat)), int(round(min(grace, mat - 1)))
    n = max(1, mat - grace); out = 1.0; pv = 0.0
    for y in range(1, mat + 1):
        p = 1.0 / n if y > grace else 0.0
        pv += (out * (rate + fee) + p) / (1 + disc) ** y
        out -= p
    return round((1 - pv) * 100, 1)

SUW = {"MDG-IDA80050": (1.22, .25), "MDG-IDA80170": (1.22, .25), "MDG-IDA80300": (1.22, .25)}  # BSD n°41 table 10
out_loans = []
for r in loans:
    k = key_of(r)
    signed = iso(r["date_signed"]); fr, lr = iso(r["first_repayment"]), iso(r["last_repayment"])
    rate = fee = grace = mat = None; rate_src = ""
    txt = r["interest_or_charge_rate"]
    if k == "IDA":
        sc = re.match(r"([\d.]+)% service charge", txt)
        if r["loan_id"] in SUW: rate, fee = SUW[r["loan_id"]]; rate_src = "BSD n°41"
        elif sc: rate, fee = 0.0, float(sc.group(1)); rate_src = "World Bank"
        if signed and fr and lr:
            grace = (fr - signed).days / 365.25; mat = (lr - signed).days / 365.25
            if rate is None and mat >= 30: rate, fee = 0.0, 0.0; rate_src = "World Bank (IDA classic terms, 0%)"
    elif k == "IMF":
        g = re.search(r"Grace ([\d.]+) yrs, maturity ([\d.]+) yrs", r["notes"])
        if g: grace, mat = float(g.group(1)), float(g.group(2))
        rate, fee = (0.0, 0.0) if "0%" in txt else (None, None)
        if "RSF" in r["loan_id"]: rate, fee = None, None
        rate_src = "IMF"
    else:
        m = re.search(r"([\d.]+)% interest", txt); f = re.search(r"([\d.]+)% fee", txt)
        y = re.search(r"(\d+) yrs, (\d+) yrs grace", txt)
        est = re.match(r"([\d.]+)% \(estimated\)", txt)
        if m: rate = float(m.group(1)); fee = float(f.group(1)) if f else 0.0; rate_src = "BSD n°41"
        if est: rate, fee, rate_src = float(est.group(1)), 0.0, "AidData estimate"
        if y: mat, grace = float(y.group(1)), float(y.group(2))
        if r["loan_id"] == "MDG-JP-2017-01": rate, fee, rate_src = 0.01, 0.0, "BSD n°38"
        if r["loan_id"] == "MDG-CN-2019-01": grace, mat = 5.8, 35.8
    ge = grant_element((rate or 0) / 100, (fee or 0) / 100, grace, mat) if rate is not None and mat else None
    known = sum([bool(r["amount_original_usd"]), rate is not None, mat is not None, bool(r["outstanding_usd"]), bool(r["date_signed"])])
    out_loans.append({
        "id": r["loan_id"], "k": k, "p": r["project_name"], "s": r["sector"], "d": r["date_signed"], "cur": r["currency"],
        "amt": round(float(r["amount_original_usd"]) / 1e6, 2) if r["amount_original_usd"] else None,
        "out": round(float(r["outstanding_usd"]) / 1e6, 2) if r["outstanding_usd"] else None,
        "und": round(float(r["undisbursed_usd"]) / 1e6, 2) if r["undisbursed_usd"] else None,
        "rate": rate, "fee": fee, "rsrc": rate_src, "grace": round(grace, 1) if grace is not None else None,
        "mat": round(mat, 1) if mat is not None else None, "fr": r["first_repayment"], "lr": r["last_repayment"],
        "ge": ge, "st": r["status"], "conf": r["confidence"], "src": r["source_urls"], "note": r["notes"], "pub": known,
        "type": r["lender_type"]})

IDS_NAME = {"AFDB": "African Development Bank (incl. ADF)", "EIB": "European Investment Bank", "IFAD": "IFAD", "OFID": "OPEC Fund",
            "BADEA": "BADEA", "TDB": "Trade & Development Bank (TDB)", "CN": "China", "FR": "France", "JP": "Japan", "DZ": "Algeria",
            "KR": "Korea", "SA": "Saudi Arabia", "KW": "Kuwait", "AE": "United Arab Emirates", "RU": "Russian Federation", "IN": "India",
            "NL": "Netherlands", "BE": "Belgium", "DE": "Germany", "AO": "Angola", "ES": "Spain"}
lenders = []
for (k, en, fr_, short, typ, hen, hfr, lat, lng, outv, basis) in L:
    if basis == "ids":  # always the latest World Bank debt statistics, never a typed-in number
        row = ids.get(IDS_NAME.get(k, ""))
        outv = float(row["outstanding_usd_m_end2024"]) if row else None
    my = [x for x in out_loans if x["k"] == k]
    if k == "IDA": outv = round(sum(x["out"] or 0 for x in my), 1)
    if k == "IMF": outv = round(sum(x["out"] or 0 for x in my), 1)
    lenders.append({"k": k, "n": [en, fr_], "s": short, "type": typ, "hq": [hen, hfr], "lat": lat, "lng": lng,
                    "out": outv, "basis": basis, "nloans": len(my),
                    "signed": round(sum(x["amt"] or 0 for x in my), 1)})

lenders = [l for l in lenders if l["out"] or l["nloans"]]  # creditors no longer owed anything drop off the globe
years = list(range(2027, 2041))
sch = {"years": years, "IDA": [0] * len(years), "IMF": [0] * len(years)}
for r in sched:
    y = int(r["year"])
    if y in years: sch[r["creditor"]][years.index(y)] = round(float(r["principal_due_usd"]) / 1e6, 1)

data = {
    "asof": {"wb": ASOF.get("wb", "2026-10-31"), "imf": ASOF.get("imf", "2026-10-31"), "ids": ASOF.get("ids", "2024-12-31"), "bsd": ASOF.get("bsd", "2026-06-30"), "built": dt.date.today().isoformat()},
    "official": OFFICIAL,
    "lenders": lenders, "loans": out_loans, "schedule": sch, "news": news,
}
json.dump(data, open(f"{OUT}/site_data.json", "w"), ensure_ascii=False, separators=(",", ":"))
ge_known = [x for x in out_loans if x["ge"] is not None]
print("lenders", len(lenders), "loans", len(out_loans), "with grant element", len(ge_known),
      "| IDA out", lenders[0]["out"], "IMF out", lenders[1]["out"])
print("GE examples", [(x["id"], x["rate"], x["fee"], x["grace"], x["mat"], x["ge"]) for x in ge_known[:3] + ge_known[-6:]])
print(collections.Counter(x["k"] for x in out_loans))
